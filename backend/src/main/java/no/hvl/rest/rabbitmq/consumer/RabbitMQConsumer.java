package no.hvl.rest.rabbitmq.consumer;

import no.hvl.rest.components.Poll;
import no.hvl.rest.components.Vote;
import no.hvl.rest.metrics.AppMetrics;
import no.hvl.rest.metrics.PollActivity;
import no.hvl.rest.metrics.VoteActivity;
import no.hvl.rest.mongodb.AppMetricsRepo;
import no.hvl.rest.mongodb.PollActivityRepo;
import no.hvl.rest.mongodb.VoteActivityRepo;
import no.hvl.rest.rabbitmq.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RabbitMQConsumer {

    private final Map<UUID, Integer> pollVoteCount = new ConcurrentHashMap<>();

    @Autowired
    private VoteActivityRepo voteActivityRepo;

    @Autowired
    private PollActivityRepo pollActivityRepo;

    @Autowired
    private AppMetricsRepo applicationMetricsRepository;

    @RabbitListener(queues = RabbitMQConfig.POLLS_QUEUE)
    public void consumePoll(Poll poll) {
        // Process poll object

        System.out.println("Received Poll: " + poll.toString() + " at " + LocalDateTime.now());

        // Update ApplicationMetrics
        AppMetrics appMetrics = applicationMetricsRepository.findById("app_metrics")
                .orElse(new AppMetrics());
        appMetrics.setTotalUsers(appMetrics.getTotalUsers() + 1);
        appMetrics.setTotalPolls(appMetrics.getTotalPolls() + 1);
        appMetrics.setLastUpdated(System.currentTimeMillis());
        applicationMetricsRepository.save(appMetrics);

        // Log poll creation activity
        PollActivity activity = new PollActivity(poll.getPollCreator(), poll.getPollID().toString(),
                poll.getVoteOptions(), System.currentTimeMillis());
        //pollActivityRepo.save(activity);
    }

    @RabbitListener(queues = RabbitMQConfig.VOTES_QUEUE)
    public void consumeVote(Vote vote) {
        // Process vote object
        System.out.println("Received Vote: " + vote.toString());

        // Update vote count
        pollVoteCount.merge(vote.getPollID(), 1, Integer::sum);

        // Log user activity
        VoteActivity activity = new VoteActivity(vote.getVoter(), vote.getPollID().toString(),
                vote.getVoteOption(), System.currentTimeMillis());
        voteActivityRepo.save(activity);

        // Update ApplicationMetrics
        AppMetrics appMetrics = applicationMetricsRepository.findById("app_metrics")
                .orElse(new AppMetrics());
        appMetrics.setLastUpdated(System.currentTimeMillis());
        appMetrics.setTotalVotes(appMetrics.getTotalVotes() + 1);
        applicationMetricsRepository.save(appMetrics);

        System.out.println("Vote count updated for Poll ID " + vote.getPollID() + ": " + pollVoteCount.get(vote.getPollID()));
    }

    public Map<UUID, Integer> getPollVoteCount() {
        return pollVoteCount;
    }
}

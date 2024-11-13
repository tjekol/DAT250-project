package no.hvl.rest.kafka.Consumer;

import no.hvl.rest.components.Poll;
import no.hvl.rest.components.Vote;
import no.hvl.rest.components.VoteOption;
import no.hvl.rest.metrics.AppMetrics;


import no.hvl.rest.metrics.PollActivity;
import no.hvl.rest.metrics.VoteActivity;
import no.hvl.rest.mongodb.AppMetricsRepo;
import no.hvl.rest.mongodb.PollActivityRepo;
import no.hvl.rest.mongodb.VoteActivityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class MessageConsumer {

    private final Map<UUID, Integer> pollVoteCount = new ConcurrentHashMap<>();

    @Autowired
    private VoteActivityRepo voteActivityRepo;

    @Autowired
    private PollActivityRepo PollActivityRepo;

    @Autowired
    private AppMetricsRepo applicationMetricsRepository;

    @KafkaListener(topics = "polls", groupId = "my-group-id")
    public void consumePoll(Poll poll) {
        // Process poll object
        System.out.println("Received Poll: " + poll.toString());


        // Update ApplicationMetrics
        AppMetrics appMetrics = applicationMetricsRepository.findById("app_metrics")
                .orElse(new AppMetrics());
        appMetrics.setTotalUsers(appMetrics.getTotalUsers() + 1);
        appMetrics.setTotalPolls(appMetrics.getTotalPolls() + 1);
        appMetrics.setLastUpdated(System.currentTimeMillis());
        applicationMetricsRepository.save(appMetrics);

        // Log poll creation activity
        PollActivity activity = new PollActivity(poll.getPollCreator(),  poll.getPollID().toString(),poll.getVoteOptions(), System.currentTimeMillis());
        PollActivityRepo.save(activity);
    }

    @KafkaListener(topics = "votes", groupId = "my-group-id")
    public void consumeVote(Vote vote) {
        // Process vote object
        System.out.println("Received Vote: " + vote.toString());

        // Update vote count
        pollVoteCount.merge(vote.getPollID(), 1, Integer::sum);

        // Update PollMetrics
        String pollId = vote.getPollID().toString();
        Integer voteoption = vote.getVoteOption();
        // Log user activity
        VoteActivity activity = new VoteActivity(vote.getVoter(), pollId, voteoption ,System.currentTimeMillis());
        voteActivityRepo.save(activity);

        // Update ApplicationMetrics
        AppMetrics appMetrics = applicationMetricsRepository.findById("app_metrics")
                .orElse(new AppMetrics());
        appMetrics.setLastUpdated(System.currentTimeMillis());
        appMetrics.setTotalVotes(appMetrics.getTotalVotes() + 1);
        applicationMetricsRepository.save(appMetrics);

        System.out.println("Vote count updated for Poll ID " + pollId + ": " + pollVoteCount.get(vote.getPollID()));
    }

    public Map<UUID, Integer> getPollVoteCount() {
        return pollVoteCount;
    }
}

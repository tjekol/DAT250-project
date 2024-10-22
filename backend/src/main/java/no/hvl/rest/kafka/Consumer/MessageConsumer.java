package no.hvl.rest.kafka.Consumer;

import no.hvl.rest.components.Poll;
import no.hvl.rest.components.Vote;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;


@Component
public class MessageConsumer {
    private final Map<UUID, Integer> pollVoteCount = new ConcurrentHashMap<>();
    @KafkaListener(topics = "polls", groupId = "my-group-id")
    public void consumePoll(Poll poll) {
        // Process poll object
        System.out.println("Received Poll: " + poll);
        // Implement logic to update insights
    }

    @KafkaListener(topics = "votes", groupId = "my-group-id")
    public void consumeVote(Vote vote) {
        // Process vote object
        System.out.println("Received Vote: " + vote);
        pollVoteCount.merge(vote.getPollID(), 1, Integer::sum);
        System.out.println("Vote count updated for Poll ID " + vote.getPollID() + ": " + pollVoteCount.get(vote.getPollID()));
    }

    public Map<UUID, Integer> getPollVoteCount() {
        return pollVoteCount;
    }
}
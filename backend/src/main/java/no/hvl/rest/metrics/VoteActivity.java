package no.hvl.rest.metrics;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "VoteActivity")
public class VoteActivity {

    @Id
    private String id;
    private final String username;
    private final String pollId;
    private final long timestamp;

    private final Integer voteoption;

    public VoteActivity(String username, String pollId, long voteoption, long timestamp) {
        this.username = username;
        this.pollId = pollId;
        this.timestamp = timestamp;
        this.voteoption = voteoption;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }
    public long getTimestamp() {
        return timestamp;
    }


    public String getPollId() {
        return pollId;
    }

    public long getVoteOption() {
        return voteoption;
    }

    public String toString() {
        return "UserActivity{" +
                "id='" + getId() + '\'' +
                ", username='" + getUsername() + '\'' +
                ", pollId='" + getPollId() + '\'' +
                ", timestamp=" + getTimestamp() +
                '}';
    }




// Constructors, getters, and setters
}

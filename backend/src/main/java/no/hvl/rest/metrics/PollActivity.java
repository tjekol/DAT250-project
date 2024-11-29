package no.hvl.rest.metrics;

import no.hvl.rest.components.VoteOption;
import org.apache.kafka.common.protocol.types.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;
import java.util.UUID;

@Document(collection = "PollActivity")
public class PollActivity {

        private String id;
        private final String username;
        private final String pollId;
        private final long timestamp;
        private final String question;
        private final Set<VoteOption> voteOptions;

        public PollActivity(String username, String pollId, String question , Set<VoteOption> voteOptions, long timestamp) {
            this.username = username;
            this.pollId = pollId;
            this.question= question;
            this.timestamp = timestamp;
            this.voteOptions = voteOptions;
        }

        public Set<VoteOption> getVoteOptions() {
            return voteOptions;
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

        public String toString() {
            return "UserActivity{" +
                    "id='" + getId() + '\'' +
                    ", username='" + getUsername() + '\'' +
                    ", pollId='" + getPollId() + '\'' +
                    ", timestamp=" + getTimestamp() +
                    '}';
        }
}

package no.hvl.rest.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.lang.NonNull;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonIgnore private UUID id;
    private UUID pollID;
    private String username; // user who cast a vote
    private long voteOption;
    @JsonIgnore private Instant publishedAt;

    @ManyToOne
    @JsonIgnore private User user;

    public Vote(
            @JsonProperty("pollID") UUID pollID,
            @JsonProperty("username") String username,
            @JsonProperty("voteOption") int voteOption
    ) {
        this.pollID = pollID;
        this.username = username;
        this.voteOption = voteOption;
        this.publishedAt = Instant.now();
    }

    public Vote() {}

    public UUID getId() {
        if (id != null) {
            return id;
        } else {
            throw new IllegalStateException("Vote ID not set");
        }
    }

    public UUID getPollID() {
        return pollID;
    }

    //** username of user who voted **//
    public String getVoterUsername() {
        if (username == null) {
            return "";
        }
        return username;
    }

    public void setVoterUsername(String voter) {
        this.username = voter;
    }

    @NonNull
    public void setUser(User user) {
        this.user = user;
        user.getVotes().add(this);
    }

    public User getUser() {
        return user;
    }

    public Instant getPublishedAt() {
        return publishedAt;
    }

    public long getVoteOption() {
        return voteOption;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vote vote = (Vote) o;
        return voteOption == vote.voteOption && Objects.equals(id, vote.id) && Objects.equals(pollID, vote.pollID) && Objects.equals(username, vote.username) && Objects.equals(publishedAt, vote.publishedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, pollID, username, voteOption, publishedAt);
    }

    @Override
    public String toString() {
        return String.format(
                "Vote[id=%s, pollID='%s', username='%s', vo='%d', publishedAt='%s', user='%s']",
                id.toString(), pollID.toString(), username, voteOption, publishedAt.toString(), user.toString());
    }
}

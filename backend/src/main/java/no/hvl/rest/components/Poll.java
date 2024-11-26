package no.hvl.rest.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.lang.NonNull;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
public class Poll  {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonIgnore
    private UUID id;
    private String username; // username to user who created poll
    private String question;
    private Instant publishedAt;
    private Instant validUntil;
    private boolean isPublic;

    @ManyToOne
    @JsonIgnore private User user;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<VoteOption> voteOptions = new HashSet<>();

    public Poll(
            @JsonProperty("username") String username,
            @JsonProperty("question") String question,
            @JsonProperty("validUntil") Instant validUntil,
            @JsonProperty("isPublic") boolean isPublic,
            @JsonProperty("voteOptions") Set<VoteOption> voteOptions
    ) {
        this.username = username;
        this.question = question;
        this.publishedAt = Instant.now();
        this.validUntil = validUntil;
        this.isPublic = isPublic;
        this.voteOptions = voteOptions != null ? voteOptions : new HashSet<>();
    }

    public Poll() {};

    public void setID() {
        this.id = UUID.randomUUID();
    }

    public UUID getPollID() {
        if (id != null) {
            return id;
        } else {
            throw new IllegalStateException("Poll ID not set");
        }
    }

    public void setPollUsername(String username) {
        this.username = username;
    }

    public String getPollCreator() {
        return username;
    }

    @NonNull
    public void setPollCreator(User user) {
        this.user = user;
        user.getPolls().add(this);
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Instant getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(Instant publishedAt) {
        this.publishedAt = publishedAt;
    }

    public Instant getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(Instant validUntil) {
        this.validUntil = validUntil;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublicity(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public Set<VoteOption> getVoteOptions() {
        return voteOptions;
    }

    // based on id
    public VoteOption getVoteOption(Long id) {
        for (VoteOption voteOption : voteOptions) {
            if (voteOption.getId().equals(id)) {
                return voteOption;
            }
        }
        return null;
    }

    public void addVoteOption(VoteOption vo) {
        voteOptions.add(vo);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Poll poll = (Poll) o;
        return isPublic == poll.isPublic && Objects.equals(id, poll.id) && Objects.equals(username, poll.username) && Objects.equals(question, poll.question) && Objects.equals(publishedAt, poll.publishedAt) && Objects.equals(validUntil, poll.validUntil) && Objects.equals(voteOptions, poll.voteOptions);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, question, publishedAt, validUntil, isPublic, voteOptions);
    }



    public void setVoteOptions(Set<VoteOption> voteOptions) {
        this.voteOptions = voteOptions;

    @Override
    public String toString() {
        return String.format(
                "Poll[id=%s, username='%s', question='%s', publishedAt='%s', validUntil='%s', isPublic='%s']",
                id.toString(), username, question, publishedAt.toString(), validUntil.toString(), isPublic);

    }
}


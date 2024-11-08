package no.hvl.rest.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.lang.NonNull;

import java.util.Objects;

@Entity
public class VoteOption {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int votes;
    private String caption;
    private int presentationOrder;
    @ManyToOne
    @JsonIgnore private Poll poll;

    public VoteOption(
            @JsonProperty("caption") String caption,
            @JsonProperty("presentationOrder") int presentationOrder
    ) {
        this.votes = 0;
        this.caption = caption;
        this.presentationOrder = presentationOrder;
    }

    public VoteOption() {};

    public Long getId() {
        return id;
    }

    public int getVotes() {
        return votes;
    }

    public void addVote() {
        votes ++;
    }

    public void removeVote() {
        if (votes > 0) votes --;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption){
        this.caption = caption;
    }

    public int getPresentationOrder() {
        return presentationOrder;
    }

    public void setPresentationOrder(int presentationOrder) {
        this.presentationOrder = presentationOrder;
    }

    @NonNull
    public void setOwningPoll(Poll poll) {
        this.poll = poll;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VoteOption that = (VoteOption) o;
        return presentationOrder == that.presentationOrder && Objects.equals(votes, that.votes) && Objects.equals(caption, that.caption);
    }

    @Override
    public int hashCode() {
        return Objects.hash(votes, caption, presentationOrder);
    }
}

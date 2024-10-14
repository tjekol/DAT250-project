package no.hvl.rest.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class VoteOption {
    private int votes;
    private String caption;
    private int presentationOrder;

    public VoteOption(
            @JsonProperty("caption") String caption,
            @JsonProperty("presentationOrder") int presentationOrder
    ) {
        this.votes = 0;
        this.caption = caption;
        this.presentationOrder = presentationOrder;
    }

    public VoteOption() {};

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

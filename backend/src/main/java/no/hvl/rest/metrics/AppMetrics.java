package no.hvl.rest.metrics;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "AppMetrics")
public class AppMetrics {

    @Id
    private String id;
    private int totalUsers;
    private int totalPolls;

    private int totalVotes;
    private long lastUpdated;

    // Default constructor
    public AppMetrics() {
        this.id = "app_metrics";
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(int totalUsers) {
        this.totalUsers = totalUsers;
    }

    public int getTotalPolls() {
        return totalPolls;
    }

    public void setTotalPolls(int totalPolls) {
        this.totalPolls = totalPolls;
    }

    public long getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(long lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public int getTotalVotes() {
        return totalVotes;
    }

    public void setTotalVotes(int totalVotes) {
        this.totalVotes = totalVotes;
    }
}

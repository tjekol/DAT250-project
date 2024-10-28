package no.hvl.rest.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "_user")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String username; // unique, and used as id
    private String password;
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.MERGE, orphanRemoval = true)
    @JsonIgnore  private Set<Poll> polls = new HashSet<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.MERGE, orphanRemoval = true)
    @JsonIgnore private Set<Vote> votes = new HashSet<>();

    public User(
            @JsonProperty("username") String username,
            @JsonProperty("password") String password,
            @JsonProperty("email") String email
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public User() {};

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Poll> getPolls() {
        return polls;
    }

    public Set<Vote> getVotes() {
        return votes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password, email);
    }

    @Override
    public String toString() {
        return String.format(
                "_User[id=%d, username='%s', password='%s', email='%s']",
                id, username, password, email);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}


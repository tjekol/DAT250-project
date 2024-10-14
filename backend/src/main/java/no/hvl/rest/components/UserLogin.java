package no.hvl.rest.components;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserLogin {
    private String username; // unique, and used as id
    private String password;

    public UserLogin(
            @JsonProperty String username,
            @JsonProperty String password)
    {
        this.username = username;
        this.password = password;
    }

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
}

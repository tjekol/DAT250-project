package no.hvl.rest.controllers;

import no.hvl.rest.PollManager;
import no.hvl.rest.components.User;
import no.hvl.rest.components.UserLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Set;

@RestController
//@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final PollManager manager;

    public UserController(@Autowired PollManager manager) {
        this.manager = manager;
    };

    @GetMapping("/users")
    public ResponseEntity<Set<User>> getUsers() {
        return ResponseEntity.ok(manager.getUsers());
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        if (manager.userExists(username)) {
            User user = manager.getUserByUsername(username);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/users")
    // TODO more based status response
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        if (manager.createUser(newUser)) {
            return ResponseEntity.created(URI.create("/" + newUser.getUsername())).body(newUser);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(newUser);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserLogin> login(@RequestBody UserLogin user) {
        if (manager.login(user.getUsername(), user.getPassword())) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

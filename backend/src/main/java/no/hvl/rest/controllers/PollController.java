package no.hvl.rest.controllers;

import no.hvl.rest.PollManager;
import no.hvl.rest.components.Poll;
import no.hvl.rest.components.Vote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.util.Set;
import java.util.UUID;

@RestController
//@RequestMapping("/polls")
@CrossOrigin
public class PollController {

    private final PollManager manager;

    public PollController(@Autowired PollManager manager){
        this.manager = manager;
    };

    @GetMapping("/polls")
    public ResponseEntity<Set<Poll>> getPolls() {
        return ResponseEntity.ok().body(manager.getPolls());
    }

    @GetMapping("/polls/{id}")
    public ResponseEntity<Poll> getPoll(@PathVariable UUID id) {
        if (manager.pollExists(id)) {
            Poll poll = manager.getPollByID(id);
            return ResponseEntity.ok().body(poll);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/polls")
    public ResponseEntity<Poll> createPoll(@RequestBody Poll poll) {
        if (manager.createPoll(poll, poll.getPollCreator())) {
            String pollID = poll.getPollID().toString();
            return ResponseEntity.created(URI.create("/"+pollID)).body(poll);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/polls/{id}")
    public ResponseEntity<HttpStatus> deletePoll(@PathVariable UUID id) {
        if (manager.deletePoll(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/polls")
    public ResponseEntity<HttpStatus> deleteAllPolls() {
        if (manager.deleteAllPolls()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).build();
        }
    }
}

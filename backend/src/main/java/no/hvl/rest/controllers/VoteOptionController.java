package no.hvl.rest.controllers;

import no.hvl.rest.PollManager;
import no.hvl.rest.components.VoteOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin
public class VoteOptionController {

    private final PollManager manager;

    public VoteOptionController(@Autowired PollManager manager) {
        this.manager = manager;
    };

    @GetMapping("/voteops")
    public ResponseEntity<Iterable<VoteOption>> getVotes() {
        return ResponseEntity.ok().body(manager.getVoteOptions());
    }

    @GetMapping("/voteops/{id}")
    public ResponseEntity<Iterable<VoteOption>> changeVote(@PathVariable UUID id) {
        return ResponseEntity.ok().body(manager.getVoteOptions(id));
    }
}

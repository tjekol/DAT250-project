package no.hvl.rest.controllers;

import no.hvl.rest.PollManager;
import no.hvl.rest.components.Vote;
import no.hvl.rest.kafka.Producer.MessageProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
//@RequestMapping("/votes")
@CrossOrigin
public class VoteController {

    private final PollManager manager;
    private final MessageProducer messageProducer;
    @Autowired
    public VoteController(PollManager manager, MessageProducer messageProducer) {
        this.manager = manager;
        this.messageProducer = messageProducer;
    };

    @GetMapping("/votes")
    public ResponseEntity<Iterable<Vote>> getVotes() {
        return ResponseEntity.ok().body(manager.getVotes());
    }

    @PostMapping("/votes")
    public ResponseEntity<Vote> castVote(@RequestBody Vote vote) {
        if (manager.castVote(vote)) {
            messageProducer.sendMessage("votes", vote);
            return ResponseEntity.created(URI.create("/"+vote.getUsername()+"/"+vote.getPollID())).body(vote);

        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/votes/{id}/{username}")
    public ResponseEntity<Vote> changeVote(@PathVariable String id, @PathVariable String username, @RequestBody Vote newVote) {
        if (manager.castVote(newVote)) {
            return ResponseEntity.ok().body(newVote);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

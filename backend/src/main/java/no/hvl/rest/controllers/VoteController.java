package no.hvl.rest.controllers;

import no.hvl.rest.PollManager;
import no.hvl.rest.components.Vote;
import no.hvl.rest.rabbitmq.producer.RabbitMQProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Set;

@RestController
//@RequestMapping("/votes")
@CrossOrigin
public class VoteController {

    private final PollManager manager;
    private final RabbitMQProducer rabbitMQProducer;
    @Autowired
    public VoteController(PollManager manager, RabbitMQProducer rabbitMQProducer) {
        this.manager = manager;
        this.rabbitMQProducer = rabbitMQProducer;
    };

    @GetMapping("/votes")
    public ResponseEntity<Set<Vote>> getVotes() {
        return ResponseEntity.ok().body(manager.getVotes());
    }

    @PostMapping("/votes")
    public ResponseEntity<Vote> castVote(@RequestBody Vote vote) {
        if (manager.castVote(vote)) {
            rabbitMQProducer.sendVote(vote);
            return ResponseEntity.created(URI.create("/"+vote.getVoter()+"/"+vote.getPollID())).body(vote);
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

package no.hvl.rest.controllers;
import java.time.LocalDateTime;
import no.hvl.rest.PollManager;
import no.hvl.rest.components.Poll;
import no.hvl.rest.components.Vote;
import no.hvl.rest.components.VoteOption;
import no.hvl.rest.kafka.Producer.MessageProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@RestController
//@RequestMapping("/polls")
@CrossOrigin
public class PollController {

    private final PollManager manager;
    private final MessageProducer messageProducer;

    @Autowired
    public PollController( PollManager manager,MessageProducer messageProducer) {
        this.manager = manager;
        this.messageProducer = messageProducer;
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
            messageProducer.sendMessage("polls", poll);
            return ResponseEntity.created(URI.create("/"+pollID)).body(poll);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/polls/bulk")
    public ResponseEntity<String> sendBulkPolls(@RequestParam int count) {
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Sending " + count + " bulk polls at " + now);
        for (int i = 0; i < count; i++) {
            Poll poll = new Poll();
            poll.setQuestion("Bulk Poll " + i);
            poll.setPollCreator("Bulk Poll Creator");
            poll.setValidUntil(null);
            poll.setVoteOptions(new HashSet<>());
            poll.addVoteOption(new VoteOption("Option 1",0));
            poll.addVoteOption(new VoteOption("Option 2",0));
            poll.addVoteOption(new VoteOption("Option 3",0));
            messageProducer.sendMessage("polls", poll);
        }
        return ResponseEntity.ok("Bulk polls sent.");
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

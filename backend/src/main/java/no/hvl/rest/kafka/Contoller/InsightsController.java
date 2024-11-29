package no.hvl.rest.kafka.Contoller;


import no.hvl.rest.kafka.Consumer.MessageConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin
public class InsightsController {

    private final MessageConsumer messageConsumer;

    @Autowired
    public InsightsController(MessageConsumer messageConsumer) {
        this.messageConsumer = messageConsumer;
    }

    @GetMapping("/insights/voteCounts")
    public Map<UUID, Integer> getPollVoteCounts() {
        return messageConsumer.getPollVoteCount();
    }
}

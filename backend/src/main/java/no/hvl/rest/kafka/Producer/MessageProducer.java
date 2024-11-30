package no.hvl.rest.kafka.Producer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@Component
@EnableAsync
public class MessageProducer {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Async
    public void sendMessage(String topic, Object message) {
        kafkaTemplate.send(topic, message);
        System.out.println("Message: " +message);
    }
}

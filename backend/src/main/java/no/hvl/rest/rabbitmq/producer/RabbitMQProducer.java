package no.hvl.rest.rabbitmq.producer;

import no.hvl.rest.components.Poll;
import no.hvl.rest.components.Vote;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import no.hvl.rest.rabbitmq.config.RabbitMQConfig;

@Service
public class RabbitMQProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendPoll(Poll poll) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, RabbitMQConfig.POLLS_QUEUE, poll);
    }

    public void sendVote(Vote vote) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, RabbitMQConfig.VOTES_QUEUE, vote);
    }
}

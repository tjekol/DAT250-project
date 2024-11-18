package no.hvl.rest.rabbitmq.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.listener.RabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // Define queue names
    public static final String POLLS_QUEUE = "polls";
    public static final String VOTES_QUEUE = "votes";
    public static final String EXCHANGE = "app-exchange";

    // Declare queues
    @Bean
    public Queue pollsQueue() {
        return new Queue(POLLS_QUEUE, true);
    }

    @Bean
    public Queue votesQueue() {
        return new Queue(VOTES_QUEUE, true);
    }

    // Declare exchange
    @Bean
    public TopicExchange appExchange() {
        return new TopicExchange(EXCHANGE);
    }

    // Bind queues to exchange with routing keys
    @Bean
    public Binding pollsBinding(Queue pollsQueue, TopicExchange appExchange) {
        return BindingBuilder.bind(pollsQueue).to(appExchange).with("polls");
    }

    @Bean
    public Binding votesBinding(Queue votesQueue, TopicExchange appExchange) {
        return BindingBuilder.bind(votesQueue).to(appExchange).with("votes");
    }

    // Configure Jackson2JsonMessageConverter
    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // Configure RabbitTemplate to use Jackson2JsonMessageConverter
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
                                         Jackson2JsonMessageConverter jackson2JsonMessageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter);
        return rabbitTemplate;
    }

    // Configure Listener Container Factory to use Jackson2JsonMessageConverter
    @Bean
    public RabbitListenerContainerFactory<?> rabbitListenerContainerFactory(ConnectionFactory connectionFactory,
                                                                            Jackson2JsonMessageConverter jackson2JsonMessageConverter) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(jackson2JsonMessageConverter);
        return factory;
    }

}

package no.hvl.rest;

import no.hvl.rest.components.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@RestController
public class WebServer {

    private static final Logger log = LoggerFactory.getLogger(WebServer.class);

    public static void main(String[] args) {
        SpringApplication.run(WebServer.class, args);
    }

    /*@GetMapping("/")
    public String welcome() {
        return String.format("Welcome to my Poll App!");
    }
    */

    @Bean
    public CommandLineRunner demo(UserRepository userRepo, PollRepository pollRepo, VoteOptionRepository voteOptionRepo) {
        return (args) -> {
            VoteOption vo1 = new VoteOption("cat", 0);
            VoteOption vo2 = new VoteOption("dog", 1);
            Set<VoteOption> vos = new HashSet<>();
            vos.add(vo1);
            vos.add(vo2);
            Poll poll = new Poll("eple", "Cat or Dog", Instant.now().plusSeconds(3600), true, vos);
            User eple = new User("eple", "pass1", "eple@gmail.com");
            //poll.addUser(eple);

            voteOptionRepo.save(vo1);
            voteOptionRepo.save(vo2);
            pollRepo.save(poll);
            userRepo.save(eple);
            userRepo.save(new User("ananas", "pass2", "ananas@gmail.com"));
            userRepo.save(new User("tjekol", "pass", "tjekol@gmail.com"));

            // fetch all customers
            log.info("Customers found with findAll():");
            log.info("-------------------------------");
            userRepo.findAll().forEach(customer -> {
                log.info(customer.toString());
            });
            log.info("");

            // fetch an individual customer by ID
            User user = userRepo.findById(1L);
            log.info("Customer found with findById(1L):");
            log.info("--------------------------------");
            log.info(user.toString());
            log.info("");

            // fetch customers by last name
            log.info("Customer found with findByLastName('Bauer'):");
            log.info("--------------------------------------------");
            userRepo.findByUsername("Jack").forEach(bauer -> {
                log.info(bauer.toString());
            });
            log.info("");
        };
    }
}
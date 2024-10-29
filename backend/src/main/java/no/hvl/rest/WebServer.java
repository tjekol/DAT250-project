package no.hvl.rest;

import no.hvl.rest.components.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;

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
    public CommandLineRunner demo(UserRepository userRepo, PollRepository pollRepo, VoteRepository voteRepo) {
        return (args) -> {
            /*
            User eple = new User("eple", "pass1", "eple@gmail.com");
            User ananas = new User("ananas", "pass2", "ananas@gmail.com");

            VoteOption vo1 = new VoteOption("cat", 0);
            VoteOption vo2 = new VoteOption("dog", 1);
            Set<VoteOption> vos = new HashSet<>();

            Poll poll = new Poll(eple.getUsername(), "Cat or Dog", Instant.now().plusSeconds(3600), true, vos);
            vos.add(vo1);
            vos.add(vo2);
            vo1.setOwningPoll(poll);
            vo2.setOwningPoll(poll);
            poll.setPollCreator(eple);

            Vote vote = new Vote(poll.getPollID(), ananas.getUsername(), 0);
            vote.setVoterUser(ananas);

            userRepo.save(eple);
            userRepo.save(ananas);
            pollRepo.save(poll);
            voteRepo.save(vote);

            log.info("Users found with findAll():");
            log.info("-------------------------------");
            userRepo.findAll().forEach(user -> {
                log.info(user.toString());
            });
            log.info("");

            log.info("Polls found with findAll():");
            log.info("-------------------------------");
            pollRepo.findAll().forEach(p -> {
                log.info(p.toString());
            });
            log.info("");

            User user = userRepo.findById(1L);
            log.info("Customer found with findById(1L):");
            log.info("--------------------------------");
            log.info(user.toString());
            log.info("");

            log.info("Customer found with findByLastName('eple'):");
            log.info("--------------------------------------------");
            userRepo.findByUsername("eple").forEach(bauer -> {
                log.info(bauer.toString());
            });
            log.info("");

            log.info("Poll with owner('eple'):");
            log.info("--------------------------------------------");
            pollRepo.findByUsername("eple").forEach(bauer -> {
                log.info(bauer.toString());
            });
            log.info("");

            log.info("Votes found with findAll():");
            log.info("--------------------------------------------");
            voteRepo.findAll().forEach(bauer -> {
                log.info(bauer.toString());
            });
            log.info("");
             */
        };
    }
}
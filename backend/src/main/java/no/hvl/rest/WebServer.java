package no.hvl.rest;

import no.hvl.rest.components.User;
import no.hvl.rest.components.UserRepository;
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
    public CommandLineRunner demo(UserRepository repository) {
        return (args) -> {
            repository.save(new User("eple", "pass1", "eple@gmail.com"));
            repository.save(new User("ananas", "pass2", "ananas@gmail.com"));
            repository.save(new User("tjekol", "pass", "tjekol@gmail.com"));

            // fetch all customers
            log.info("Customers found with findAll():");
            log.info("-------------------------------");
            repository.findAll().forEach(customer -> {
                log.info(customer.toString());
            });
            log.info("");

            // fetch an individual customer by ID
            User user = repository.findById(1L);
            log.info("Customer found with findById(1L):");
            log.info("--------------------------------");
            log.info(user.toString());
            log.info("");

            // fetch customers by last name
            log.info("Customer found with findByLastName('Bauer'):");
            log.info("--------------------------------------------");
            repository.findByUsername("Jack").forEach(bauer -> {
                log.info(bauer.toString());
            });
            log.info("");
        };
    }
}
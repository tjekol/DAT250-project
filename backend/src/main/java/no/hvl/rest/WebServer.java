package no.hvl.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class WebServer {

    public static void main(String[] args) {
        SpringApplication.run(WebServer.class, args);
    }

    /*@GetMapping("/")
    public String welcome() {
        return String.format("Welcome to my Poll App!");
    }
    */
}
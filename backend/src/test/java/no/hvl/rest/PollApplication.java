package no.hvl.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import no.hvl.rest.components.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PollApplication {

    @Autowired
    private TestRestTemplate restTemplate;

    private static final String USERS_ENDPOINT = "/users";
    private static final String POLLS_ENDPOINT = "/polls";
    private static final String VOTES_ENDPOINT = "/votes";
    private static final String VOTEOPS_ENDPOINT = "/voteops";

    private final User user1 = new User();
    private final User user2 = new User();

    @BeforeEach
    public void setup() {
        user1.setUsername("eple");
        user1.setPassword("pass1");
        user1.setEmail(user1.getUsername() + "@email.com");

        user2.setUsername("ananas");
        user2.setPassword("pass2");
        user2.setEmail(user2.getUsername() + "@email.com");

    }

    @Test
    public void testServerConnection() throws Exception {
        ResponseEntity<String> response = restTemplate.getForEntity("/", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUsers() throws Exception {
        restTemplate.delete(USERS_ENDPOINT);

        ResponseEntity<String> response = restTemplate.getForEntity(USERS_ENDPOINT, String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, parseJsonArrayLength(response.getBody()));

        createUser(user1);
        createUser(user2);
        response = restTemplate.getForEntity(USERS_ENDPOINT, String.class);
        assertTrue(response.getBody().contains(user1.getUsername()));
        assertTrue(response.getBody().contains(user2.getUsername()));
        assertEquals(2, parseJsonArrayLength(response.getBody()));
    }

    /*@Test
    public void testPolls() throws Exception {
        restTemplate.delete(POLLS_ENDPOINT);

        ResponseEntity<String> response = restTemplate.getForEntity(POLLS_ENDPOINT, String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, parseJsonArrayLength(response.getBody()));

        VoteOption vo1 = new VoteOption();
        vo1.setId(0);
        vo1.setCaption("Taco");
        vo1.setPresentationOrder(0);

        VoteOption vo2 = new VoteOption();
        vo2.setId(1);
        vo2.setCaption("Pizza");
        vo2.setPresentationOrder(1);

        Poll poll = new Poll();
        poll.setID();
        poll.setPollUsername(user1.getUsername());
        poll.setPollCreator(user1);
        poll.setPublicity(false);
        poll.setQuestion("Taco or Pizza?");
        poll.setPublishedAt(Instant.now());
        poll.setValidUntil(Instant.now().plusMillis(3600));

        vo1.setOwningPoll(poll);
        vo2.setOwningPoll(poll);

        poll.addVoteOption(vo1);
        poll.addVoteOption(vo2);

        ResponseEntity<Poll> res = restTemplate.postForEntity(POLLS_ENDPOINT, poll, Poll.class);
        System.out.println(res.getStatusCode());
        response = restTemplate.getForEntity(POLLS_ENDPOINT, String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        System.out.println(response.getBody());
        assertEquals(1, parseJsonArrayLength(response.getBody()));
    }
     */

    private void createUser(User user) {
        restTemplate.postForEntity(USERS_ENDPOINT, user, User.class);
    }

    private int parseJsonArrayLength(String responseBody) throws JsonProcessingException {
        return new ObjectMapper().readTree(responseBody).size();
    }
}

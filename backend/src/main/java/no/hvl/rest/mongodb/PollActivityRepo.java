package no.hvl.rest.mongodb;

import no.hvl.rest.metrics.PollActivity;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface PollActivityRepo extends MongoRepository<PollActivity, String> {
}

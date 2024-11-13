package no.hvl.rest.mongodb;
import no.hvl.rest.metrics.VoteActivity;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface VoteActivityRepo extends MongoRepository<VoteActivity, String>{


}

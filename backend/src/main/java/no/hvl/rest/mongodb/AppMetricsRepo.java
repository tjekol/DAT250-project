package no.hvl.rest.mongodb;
import no.hvl.rest.metrics.AppMetrics;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppMetricsRepo extends MongoRepository<AppMetrics, String>{
}

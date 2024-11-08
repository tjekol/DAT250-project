package no.hvl.rest.components;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;


public interface VoteRepository extends CrudRepository<Vote, Long> {
    List<Vote> findByUsername(String username);

    List<Vote> findByPollID(UUID pollID);

    List<Vote> findByPollIDAndUsername(UUID pollID, String username);

    Vote findById(long id);
}

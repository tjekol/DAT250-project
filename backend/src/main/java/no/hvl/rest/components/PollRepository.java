package no.hvl.rest.components;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface PollRepository extends CrudRepository<Poll, Long> {
    List<Poll> findByUsername(String username);

    Poll findById(UUID id);
}

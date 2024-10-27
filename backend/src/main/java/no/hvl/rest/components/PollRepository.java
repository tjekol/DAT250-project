package no.hvl.rest.components;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PollRepository extends CrudRepository<Poll, Long> {
    List<Poll> findByUsername(String username);

    Poll findById(long pId);
}

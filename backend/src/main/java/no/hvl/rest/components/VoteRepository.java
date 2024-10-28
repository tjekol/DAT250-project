package no.hvl.rest.components;

import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface VoteRepository extends CrudRepository<Vote, Long> {
    List<Vote> findByUsername(String username);

    Vote findById(long id);
}

package no.hvl.rest.components;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VoteOptionRepository extends CrudRepository<VoteOption, Long> {
    // List<VoteOption> findByUsername(String username);

    VoteOption findById(long id);
}

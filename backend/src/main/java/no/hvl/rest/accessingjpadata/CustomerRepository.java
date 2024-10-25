package no.hvl.rest.accessingjpadata;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<Customer, Long> {
    List<Customer> findByUsername(String username);

    Customer findById(long id);
}

package com.devcamp.fullpizza365api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.fullpizza365api.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}

package com.devcamp.fullpizza365api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.fullpizza365api.model.Drink;

public interface DrinkRepository extends JpaRepository<Drink, Integer> {

}

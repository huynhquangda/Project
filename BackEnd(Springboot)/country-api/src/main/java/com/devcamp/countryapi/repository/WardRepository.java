package com.devcamp.countryapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.countryapi.model.Ward;

public interface WardRepository extends JpaRepository<Ward, Integer> {

}

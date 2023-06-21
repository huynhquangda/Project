package com.devcamp.countryapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.countryapi.model.District;

public interface DistrictRepository extends JpaRepository<District, Integer> {
    District findById(int id);
}

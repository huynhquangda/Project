package com.devcamp.countryapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.countryapi.model.Province;

public interface ProvinceRepository extends JpaRepository<Province, Integer> {
    Province findById(int id);
}

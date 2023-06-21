package com.devcamp.countryapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.countryapi.model.District;

import com.devcamp.countryapi.model.Ward;
import com.devcamp.countryapi.repository.DistrictRepository;

@CrossOrigin
@RestController
@RequestMapping("/")
public class DistrictController {
    @Autowired
    DistrictRepository districtRepository;

    @GetMapping("/district")
    public ResponseEntity<List<District>> getAllDistrict() {
        try {
            List<District> districts = new ArrayList<District>();
            districtRepository.findAll().forEach(districts::add);
            return new ResponseEntity<>(districts, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/districtId")
    public ResponseEntity<Set<Ward>> getWardByProvinceId(
            @RequestParam(required = true, name = "districtId") int districtId) {
        try {
            District district = districtRepository.findById(districtId);
            if (district != null) {
                return new ResponseEntity<>(district.getWard(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

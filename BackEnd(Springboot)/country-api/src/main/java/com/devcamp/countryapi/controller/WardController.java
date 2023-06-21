package com.devcamp.countryapi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.countryapi.model.Ward;
import com.devcamp.countryapi.repository.WardRepository;

@CrossOrigin
@RestController
@RequestMapping("/")
public class WardController {
    @Autowired
    WardRepository wardRepository;

    @GetMapping("/ward")
    public ResponseEntity<List<Ward>> getAllWard() {
        try {
            List<Ward> wards = new ArrayList<Ward>();
            wardRepository.findAll().forEach(wards::add);
            return new ResponseEntity<>(wards, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}

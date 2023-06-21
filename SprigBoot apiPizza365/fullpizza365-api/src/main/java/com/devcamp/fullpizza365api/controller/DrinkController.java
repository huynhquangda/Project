package com.devcamp.fullpizza365api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.fullpizza365api.model.Drink;
import com.devcamp.fullpizza365api.repository.DrinkRepository;

@CrossOrigin
@RestController
@RequestMapping("/")

public class DrinkController {
    @Autowired
    DrinkRepository drinkRepository;

    @GetMapping("/drinks")
    public ResponseEntity<List<Drink>> getAllDrink() {
        try {
            List<Drink> drinks = new ArrayList<Drink>();
            drinkRepository.findAll().forEach(drinks::add);
            return new ResponseEntity<>(drinks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

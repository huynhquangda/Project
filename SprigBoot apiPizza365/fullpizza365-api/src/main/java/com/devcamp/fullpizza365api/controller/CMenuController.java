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

import com.devcamp.fullpizza365api.model.CMenu;
import com.devcamp.fullpizza365api.repository.CMenuRepository;

@CrossOrigin
@RestController
@RequestMapping("/")
public class CMenuController {
    @Autowired
    CMenuRepository cMenuRepository;

    @GetMapping("/menus")
    public ResponseEntity<List<CMenu>> getAllMenu() {
        try {
            List<CMenu> cMenus = new ArrayList<CMenu>();
            cMenuRepository.findAll().forEach(cMenus::add);
            return new ResponseEntity<>(cMenus, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

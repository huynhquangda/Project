package com.devcamp.countryapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.countryapi.model.District;
import com.devcamp.countryapi.model.Province;
import com.devcamp.countryapi.repository.ProvinceRepository;

@CrossOrigin
@RestController
@RequestMapping("/")

public class ProvinceController {
    @Autowired
    ProvinceRepository provinceRepository;

    @GetMapping("/province")
    public ResponseEntity<List<Province>> getAllProvince() {
        try {
            List<Province> provinces = new ArrayList<Province>();
            provinceRepository.findAll().forEach(provinces::add);
            return new ResponseEntity<>(provinces, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/province5")
    public ResponseEntity<List<Province>> getFiveVoucher(
            @RequestParam(value = "page", defaultValue = "1") String page,
            @RequestParam(value = "size", defaultValue = "5") String size) {
        try {
            PageRequest pageWithFiveElements = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
            List<Province> list = new ArrayList<Province>();
            provinceRepository.findAll(pageWithFiveElements).forEach(list::add);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/provinceId")
    public ResponseEntity<Set<District>> getDistrictByProvinceId(
            @RequestParam(required = true, name = "provinceId") int provinceId) {
        try {
            Province province = provinceRepository.findById(provinceId);
            if (province != null) {
                return new ResponseEntity<>(province.getDistrict(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

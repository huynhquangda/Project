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

import com.devcamp.fullpizza365api.model.Voucher;
import com.devcamp.fullpizza365api.repository.VoucherRepository;

@CrossOrigin
@RestController
@RequestMapping("/")
public class VoucherController {
    @Autowired
    VoucherRepository voucherRepository;

    @GetMapping("/vouchers")
    public ResponseEntity<List<Voucher>> getAllVoucher() {
        try {
            List<Voucher> vouchers = new ArrayList<Voucher>();
            voucherRepository.findAll().forEach(vouchers::add);
            return new ResponseEntity<>(vouchers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

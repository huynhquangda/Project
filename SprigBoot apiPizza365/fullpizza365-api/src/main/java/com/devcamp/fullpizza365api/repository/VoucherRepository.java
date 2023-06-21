package com.devcamp.fullpizza365api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.fullpizza365api.model.Voucher;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {

}

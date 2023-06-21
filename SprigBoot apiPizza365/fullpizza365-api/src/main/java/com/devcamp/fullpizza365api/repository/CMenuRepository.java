package com.devcamp.fullpizza365api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.fullpizza365api.model.CMenu;

public interface CMenuRepository extends JpaRepository<CMenu, Integer> {

}

package com.devcamp.fullpizza365api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "menus")
public class CMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String size;
    @Column(name = "duong_kinh")
    private String duongKinh;
    @Column(name = "suon_nuong")
    private String suonNuong;
    private String salad;
    @Column(name = "nuoc_ngot")
    private int nuocNgot;
    private long gia;

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getDuongKinh() {
        return duongKinh;
    }

    public void setDuongKinh(String duongKinh) {
        this.duongKinh = duongKinh;
    }

    public String getSuonNuong() {
        return suonNuong;
    }

    public void setSuonNuong(String suonNuong) {
        this.suonNuong = suonNuong;
    }

    public String getSalad() {
        return salad;
    }

    public void setSalad(String salad) {
        this.salad = salad;
    }

    public int getNuocNgot() {
        return nuocNgot;
    }

    public void setNuocNgot(int nuocNgot) {
        this.nuocNgot = nuocNgot;
    }

    public long getGia() {
        return gia;
    }

    public void setGia(long gia) {
        this.gia = gia;
    }

    public CMenu(String size, String duongKinh, String suonNuong, String salad, int nuocNgot, long gia) {
        this.size = size;
        this.duongKinh = duongKinh;
        this.suonNuong = suonNuong;
        this.salad = salad;
        this.nuocNgot = nuocNgot;
        this.gia = gia;
    }

    public CMenu() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}

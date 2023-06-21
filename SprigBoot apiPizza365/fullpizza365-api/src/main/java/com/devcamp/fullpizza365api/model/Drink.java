package com.devcamp.fullpizza365api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "drinks")
public class Drink {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "ma_nuoc_uong")
    private String maNuocUong;
    @Column(name = "ten_nuoc_uong")
    private String tenNuocUong;
    @Column(name = "ngay_tao")
    private String ngayTao;
    @Column(name = "ngay_cap_nhat")
    private String ngayCapNhat;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMaNuocUong() {
        return maNuocUong;
    }

    public void setMaNuocUong(String maNuocUong) {
        this.maNuocUong = maNuocUong;
    }

    public String getTenNuocUong() {
        return tenNuocUong;
    }

    public void setTenNuocUong(String tenNuocUong) {
        this.tenNuocUong = tenNuocUong;
    }

    public String getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(String ngayTao) {
        this.ngayTao = ngayTao;
    }

    public String getNgayCapNhat() {
        return ngayCapNhat;
    }

    public void setNgayCapNhat(String ngayCapNhat) {
        this.ngayCapNhat = ngayCapNhat;
    }

    public Drink(int id, String maNuocUong, String tenNuocUong, String ngayTao, String ngayCapNhat) {
        this.id = id;
        this.maNuocUong = maNuocUong;
        this.tenNuocUong = tenNuocUong;
        this.ngayTao = ngayTao;
        this.ngayCapNhat = ngayCapNhat;
    }

    public Drink() {
    }

}

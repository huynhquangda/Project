"use strict"
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gBASE_URL = "http://203.171.20.210:8080/devcamp-pizza365/drinks";
const gBASE_URL_VOURCHER = "http://203.171.20.210:8080/devcamp-pizza365/voucher_detail";
const gBASE_URL_ORDER = "http://203.171.20.210:8080/devcamp-pizza365/orders";
const gSIZE_S = "S";
const gSIZE_M = "M";
const gSIZE_L = "L";
const gPIZZA_OCEAN = "Ocean";
const gPIZZA_HAIWAI = "Haiwai";
const gPIZZA_BACON = "Bacon";
var gDataSizeS = "";
var gDataSizeM = "";
var gDataSizeL = "";
var gDataOcean = "";
var gDataHaiwai = "";
var gDataBacon = "";
var gDataOrder = "";


/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
$(document).ready(function () {
    onloadDataDrink();
    $("#btn-size-s").on("click", function () {
        onBtnSizeS();
        console.log(gDataSizeS);
    })
    $("#btn-size-m").on("click", function () {
        onBtnSizeM();
        console.log(gDataSizeM);
    })
    $("#btn-size-l").on("click", function () {
        onBtnSizeL();
        console.log(gDataSizeL);
    })
    $("#btn-ocean").on("click", function () {
        onBtnOcean();
        console.log(gDataOcean);
    })
    $("#btn-haiwai").on("click", function () {
        onBtnHaiwai();
        console.log(gDataHaiwai);
    })
    $("#btn-bacon").on("click", function () {
        onBtnBacon();
        console.log(gDataBacon);
    })
    $("#btn-send").on("click", function (event) {
        event.preventDefault();
        onBtnSend();
        console.log(gDataOrder);


    })
    $("#btn-order").on("click", function () {

        $("#modal-order").modal('hide');
        // console.log("hello")
        onBtnCreateOrder();


    })

})
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onBtnSizeS() {
    changeColorCombo("S");
    gDataSizeS = getDataCombo("S", "20cm", "2", "2", "200g", 150000);
}
function onBtnSizeM() {
    changeColorCombo("M");
    gDataSizeM = getDataCombo("M", "25cm", "3", "4", "300g", 200000);
}
function onBtnSizeL() {
    changeColorCombo("L");
    gDataSizeL = getDataCombo("L", "30cm", "4", "8", "500g", 250000);
}
function onBtnOcean() {
    changeColorLoaiPizza(gPIZZA_OCEAN);
    gDataOcean = "Pizza Ocean";

}
function onBtnHaiwai() {
    changeColorLoaiPizza(gPIZZA_HAIWAI);
    gDataHaiwai = "Pizza Haiwai";
}
function onBtnBacon() {
    changeColorLoaiPizza(gPIZZA_BACON);
    gDataBacon = "Pizza Bacon";
}

function onloadDataDrink() {
    $.ajax({
        url: gBASE_URL,
        type: "GET",
        success: function (paramRes) {
            getDataSelectDrink(paramRes);
            console.log(paramRes);
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })

}
function onBtnSend() {

    var vObjOrder = {
        kichCo: "",
        duongKinh: "",
        soLuongNuoc: "",
        suon: "",
        salad: "",
        loaiPizza: "",
        thanhTien: "",
        hoTen: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: "",
        idVourcher: "",
        phanTramGiamGia: 0,
        giamGia: 0,
        idLoaiNuocUong: "",

    }
    // b1 thu thap thong tin
    getDataSendOrder(vObjOrder);

    var vCheck = validateDataOrder(vObjOrder);
    if (vObjOrder.idVourcher != "") {
        tinhPhanTramGiamGia(vObjOrder);
    }
    if (vObjOrder.idVourcher == "") {
        vObjOrder.giamGia = vObjOrder.thanhTien;
    }
    if (vCheck) {
        $("#modal-order").modal().show;
        onLoadDataModal(vObjOrder);
    }



}
function onLoadDataModal(paramObj) {
    $("#inp-modal-ten").val(paramObj.hoTen);
    $("#inp-modal-so-dien-thoai").val(paramObj.soDienThoai);
    $("#inp-modal-dia-chi").val(paramObj.diaChi);
    $("#inp-modal-loi-nhan").val(paramObj.loiNhan);
    $("#inp-modal-ma-giam-gia").val(paramObj.idVourcher);
    $("#info-detail").html("Xác nhận: " + paramObj.hoTen + ", " + paramObj.soDienThoai + ", " + "menu: "
        + paramObj.kichCo + ", " + "Sườn nướng: " + paramObj.suon + ", " + "Nước: " + paramObj.soLuongNuoc + ", " + "..."
        + "loại pizza: " + paramObj.loaiPizza + ", " + " giá :" + paramObj.thanhTien + " mã giảm giá :" + paramObj.idVourcher
        + ", " + " phải thanh toán: " + paramObj.giamGia + "VND" + "(" + "Giảm giá: " + paramObj.phanTramGiamGia + "%" + ")");

}

// create order
function onBtnCreateOrder() {
    var vObjOrder = {
        kichCo: "",
        duongKinh: "",
        soLuongNuoc: "",
        suon: "",
        salad: "",
        loaiPizza: "",
        thanhTien: "",
        hoTen: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: "",
        idVourcher: "",
        phanTramGiamGia: 0,
        giamGia: 0,
        idLoaiNuocUong: "",

    }
    // b1 thu thap thong tin
    getDataSendOrder(vObjOrder);
    // b2 
    $.ajax({
        url: gBASE_URL_ORDER,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(vObjOrder),
        success: function (paramRes) {
            handleOrder(paramRes);
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })

}


/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function getDataCombo(paramSize, paramDuongKinh, paramNuocNgot, paramSuon, paramSalad, paramVND) {
    var vObjCombo = {
        kichCo: paramSize,
        duongKinh: paramDuongKinh,
        soLuongNuoc: paramNuocNgot,
        suon: paramSuon,
        salad: paramSalad,
        thanhTien: paramVND
    }
    return vObjCombo;
}

function changeColorCombo(paramSize) {
    if (paramSize == "S") {
        $("#btn-size-s").data("data-combo-size", "Y")
            .removeClass()
            .addClass("btn btn-success col-sm-12");
        $("#btn-size-m").data("data-combo-size", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");
        $("#btn-size-l").data("data-combo-size", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");

    }
    else if (paramSize == "M") {
        $("#btn-size-s").data("data-combo-size", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");
        $("#btn-size-m").data("data-combo-size", "Y")
            .removeClass()
            .addClass("btn btn-success col-sm-12");
        $("#btn-size-l").data("data-combo-size", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");
    }
    else if (paramSize == "L") {
        $("#btn-size-s").data("data-combo-size", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");
        $("#btn-size-m").data("data-combo-size", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");
        $("#btn-size-l").data("data-combo-size", "Y")
            .removeClass()
            .addClass("btn btn-success col-sm-12");
    }

}
// loai pizza
function changeColorLoaiPizza(paramLoai) {
    if (paramLoai == gPIZZA_OCEAN) {
        $("#btn-ocean").data("data-loai-pizza", "Y")
            .removeClass()
            .addClass("btn btn-success col-sm-12");
        $("#btn-haiwai").data("data-loai-pizza", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");
        $("#btn-bacon").data("data-loai-pizza", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");

    }
    else if (paramLoai == gPIZZA_HAIWAI) {
        $("#btn-ocean").data("data-loai-pizza", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");
        $("#btn-haiwai").data("data-loai-pizza", "Y")
            .removeClass()
            .addClass("btn btn-success col-sm-12");
        $("#btn-bacon").data("data-loai-pizza", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");
    }
    else if (paramLoai == gPIZZA_BACON) {
        $("#btn-ocean").data("data-loai-pizza", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");
        $("#btn-haiwai").data("data-loai-pizza", "N")
            .removeClass()
            .addClass("btn btn-warning col-sm-12");
        $("#btn-bacon").data("data-loai-pizza", "Y")
            .removeClass()
            .addClass("btn btn-success col-sm-12");
    }

}

function getDataSelectDrink(paramRes) {
    for (var bI = 0; bI < paramRes.length; bI++) {
        $("#select-drink").append($("<option>", {
            text: paramRes[bI].tenNuocUong,
            value: paramRes[bI].maNuocUong,
        }))
    }

}
function getDataSendOrder(paramObj) {
    paramObj.hoTen = $("#inp-ten").val().trim();
    paramObj.email = $("#inp-email").val().trim();
    paramObj.soDienThoai = $("#inp-so-dien-thoai").val().trim();
    paramObj.diaChi = $("#inp-dia-chi").val().trim();
    paramObj.loiNhan = $("#inp-loi-nhan").val().trim();
    paramObj.idVourcher = $("#inp-ma-giam-gia").val().trim();

    paramObj.idLoaiNuocUong = $("#select-drink option:selected").val();
    // paramObj.phanTramGiamGia = gDataOrder.phanTramGiamGia;

    var vDataBtnS = $("#btn-size-s").data("data-combo-size");
    var vDataBtnM = $("#btn-size-m").data("data-combo-size");
    var vDataBtnL = $("#btn-size-l").data("data-combo-size");
    var vDataBtnHaiwai = $("#btn-haiwai").data("data-loai-pizza");
    var vDataBtnOcean = $("#btn-ocean").data("data-loai-pizza");
    var vDataBtnBacon = $("#btn-bacon").data("data-loai-pizza");

    if (vDataBtnS == "Y") {

        paramObj.kichCo = gDataSizeS.kichCo;
        paramObj.duongKinh = gDataSizeS.duongKinh;
        paramObj.suon = gDataSizeS.suon;
        paramObj.soLuongNuoc = gDataSizeS.soLuongNuoc;
        paramObj.thanhTien = gDataSizeS.thanhTien;
        paramObj.salad = gDataSizeS.salad;
    }
    if (vDataBtnM == "Y") {

        paramObj.kichCo = gDataSizeM.kichCo;
        paramObj.duongKinh = gDataSizeM.duongKinh;
        paramObj.suon = gDataSizeM.suon;
        paramObj.soLuongNuoc = gDataSizeM.soLuongNuoc;
        paramObj.thanhTien = gDataSizeM.thanhTien;
        paramObj.salad = gDataSizeM.salad;
    }
    if (vDataBtnL == "Y") {

        paramObj.kichCo = gDataSizeL.kichCo;
        paramObj.duongKinh = gDataSizeL.duongKinh;
        paramObj.suon = gDataSizeL.suon;
        paramObj.soLuongNuoc = gDataSizeL.soLuongNuoc;
        paramObj.thanhTien = gDataSizeL.thanhTien;
        paramObj.salad = gDataSizeL.salad;
    }
    if (vDataBtnHaiwai == "Y") {
        paramObj.loaiPizza = gDataHaiwai;
    }
    if (vDataBtnOcean == "Y") {
        paramObj.loaiPizza = gDataOcean;
    }
    if (vDataBtnBacon == "Y") {
        paramObj.loaiPizza = gDataBacon;
    }


}
// kiem tra thong tin
function validateDataOrder(paramObj) {
    if (paramObj.hoTen == "" || paramObj.diaChi == "" || paramObj.loiNhan == "" || paramObj.soDienThoai == "") {
        alert("Nhập đầy đủ các trường!");
        return false;
    }
    else if (paramObj.duongKinh == "") {
        alert("Chọn menu combo!");
        return false;
    }
    else if (paramObj.loaiPizza == "") {
        alert("Chọn loại pizza!");
        return false;
    }
    return true;

}
function tinhPhanTramGiamGia(paramObj) {
    $.ajax({
        url: gBASE_URL_VOURCHER + "/" + paramObj.idVourcher,
        type: "GET",
        async: false,
        success: function (paramRes) {
            paramObj.phanTramGiamGia = paramRes.phanTramGiamGia;

            handleThanhTien(paramRes, paramObj);
        },
        error: function (paramErr) {
            alert("không tồn tại mã giảm giá");
            paramObj.giamGia = paramObj.thanhTien;
        }
    })

}
function handleThanhTien(paramRes, paramObj) {
    paramObj.giamGia = paramObj.thanhTien * (100 - paramRes.phanTramGiamGia) / 100;

}
function handleOrder(paramRes) {
    alert("Tạo đơn hàng thành công!");
    // $("#modal-order").modal().hide;
    $("#modal-result").modal().show;
    $("#inp-order-code").val(paramRes.orderCode);
}



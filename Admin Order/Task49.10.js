"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gCOL_NAME = ["orderCode", "kichCo", "loaiPizza", "idLoaiNuocUong", "thanhTien", "hoTen", "soDienThoai", "trangThai", "action"];
const gCOL_ORDER_CODE = 0;
const gCOL_KICH_CO = 1;
const gCOL_LOAI_PIZZA = 2;
const gCOL_NUOC_UONG = 3;
const gCOL_THANH_TIEN = 4;
const gCOL_HO_TEN = 5;
const gCOL_SO_DIEN_THOAI = 6;
const gCOL_TRANG_THAI = 7;
const gCOL_ACTION = 8;
var gSTT = 0;
const gBASE_URL = "http://203.171.20.210:8080/devcamp-pizza365/orders";
var gBASE_URL_DRINK = "http://203.171.20.210:8080/devcamp-pizza365/drinks";
var gDataOrder = "";
var gDataOrderAll = "";

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {

    goiApiOrder();
    onLoadTable();



    $("#btn-add").on("click", function () {
        $("#modal-add").modal().show;
        onLoadSelectDrink();
        fillDataKichCo();


    })
    $("#btn-modal-add-add").on("click", function () {
        onBtnAddOrder();
    })
    $("#table-order").on("click", ".btn-update", function () {
        gDataOrder = getDataRowTable(this);
        $("#modal-update").modal().show;
        console.log(gDataOrder);
        getDataModalUpdate();
    })

    $("#btn-update-confirm").on("click", function () {
        onBtnUpdateConfirm();
    })
    $("#btn-update-cancel").on("click", function () {
        onBtnUpdateCancel();
    })
    $("#table-order").on("click", ".btn-delete", function () {
        gDataOrder = getDataRowTable(this);
        $("#modal-delete").modal().show;


    })
    $("#btn-delete").on("click", function () {
        onBtnDeleteOrder();
    })
    $("#btn-filter").on("click", function () {
        onBtnFilter();
    })








})
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onLoadTable() {
    $("#table-order").DataTable({
        columns: [
            { "data": gCOL_NAME[gCOL_ORDER_CODE] },
            { "data": gCOL_NAME[gCOL_KICH_CO] },
            { "data": gCOL_NAME[gCOL_LOAI_PIZZA] },
            { "data": gCOL_NAME[gCOL_NUOC_UONG] },
            { "data": gCOL_NAME[gCOL_THANH_TIEN] },
            { "data": gCOL_NAME[gCOL_HO_TEN] },
            { "data": gCOL_NAME[gCOL_SO_DIEN_THOAI] },
            { "data": gCOL_NAME[gCOL_TRANG_THAI] },
            { "data": gCOL_NAME[gCOL_ACTION] },
        ],
        columnDefs: [
            {

                targets: gCOL_ACTION,
                defaultContent: '<button class="btn btn-primary mb-2 btn-update">Sửa</button>' + '<button class="btn btn-danger btn-delete">Xóa</button>'

            },



        ]
    })
}
// add don hang
function onBtnAddOrder() {
    var vObjectRequest = {
        kichCo: "",
        duongKinh: "",
        suon: "",
        salad: "",
        loaiPizza: "",
        idVourcher: "",
        idLoaiNuocUong: "",
        soLuongNuoc: "",
        hoTen: "",
        thanhTien: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: "",
        trangThai: "",
    }
    getDataOrder(vObjectRequest);
    // console.log(vObjectRequest);



    var vCheck = validateDataOrder(vObjectRequest);
    if (vCheck) {
        console.log("hello")
        $.ajax({
            url: gBASE_URL,
            type: "POST",
            data: JSON.stringify(vObjectRequest),
            contentType: "application/json; charset=utf-8",
            success: function (paramRes) {
                handleAddOrder();
                // console.log("hello");
            },
            error: function (paramErr) {
                console.log(paramErr.status);
            }
        })
    }
}

function onLoadDataOnTable(paramData) {
    var vTable = $("#table-order").DataTable();
    vTable.clear();
    gSTT = 1;

    vTable.rows.add(paramData);
    vTable.draw();
}
// 

function goiApiOrder() {
    $.ajax({
        url: gBASE_URL,
        type: "GET",
        success: function (paramRes) {
            console.log(paramRes);
            gDataOrderAll = paramRes;
            onLoadDataOnTable(paramRes);

        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}
function onLoadSelectDrink() {
    $.ajax({
        url: gBASE_URL_DRINK,
        type: "GET",
        success: function (paramRes) {
            for (var bI = 0; bI < paramRes.length; bI++) {
                $("#select-drink").append($("<option>", {
                    text: paramRes[bI].tenNuocUong,
                    value: paramRes[bI].maNuocUong,
                }))
            }

        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}
function onBtnUpdateConfirm() {
    var vObjOrder = {
        trangThai: "confirmed",
    }
    $.ajax({
        url: gBASE_URL + "/" + gDataOrder.id,
        type: "PUT",
        data: JSON.stringify(vObjOrder),
        contentType: "application/json; charset=utf-8",
        success: function (paramRes) {
            handleUpdate();
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }

    })
}
function onBtnUpdateCancel() {
    var vObjOrder = {
        trangThai: "cancel",
    }
    $.ajax({
        url: gBASE_URL + "/" + gDataOrder.id,
        type: "PUT",
        data: JSON.stringify(vObjOrder),
        contentType: "application/json; charset=utf-8",
        success: function (paramRes) {
            handleUpdate();
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }

    })
}
function onBtnDeleteOrder() {
    $.ajax({
        url: gBASE_URL + "/" + gDataOrder.id,
        type: "DELETE",
        success: function (paramRes) {
            handleDelete();
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}
// filter
function onBtnFilter() {

    var vFilterObj = {
        loaiPizza: "",
        trangThai: "",
    }
    getDataFilter(vFilterObj);
    var vArrayData = handelFilter(vFilterObj);
    console.log(vArrayData);
    onLoadDataOnTable(vArrayData);
}

/*** REGION 4 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function fillDataKichCo() {
    $("#select-kich-co").change(function () {
        var vKichCo = $("#select-kich-co option:selected").text();
        console.log(vKichCo);
        if (vKichCo == "S") {
            $("#inp-duong-kinh").val("20cm");
            $("#inp-salad").val("200g");
            $("#inp-suon").val(2);
            $("#inp-so-luong-nuoc").val("2");
            $("#inp-thanh-tien").val(150000);
        }
        else if (vKichCo == "M") {
            $("#inp-duong-kinh").val("25cm");
            $("#inp-salad").val("300g");
            $("#inp-suon").val(4);
            $("#inp-so-luong-nuoc").val("3");
            $("#inp-thanh-tien").val(200000);
        }
        else if (vKichCo == "L") {
            $("#inp-duong-kinh").val("30cm");
            $("#inp-salad").val("500g");
            $("#inp-suon").val(8);
            $("#inp-so-luong-nuoc").val("4");
            $("#inp-thanh-tien").val(250000);
        }
    })


}
// thu thap thong tin
function getDataOrder(paramObj) {
    paramObj.kichCo = $("#select-kich-co option:selected").text();
    paramObj.duongKinh = $("#inp-duong-kinh").val();
    paramObj.suon = $("#inp-suon").val();
    paramObj.salad = $("#inp-salad").val();
    paramObj.soLuongNuoc = $("#inp-so-luong-nuoc").val();
    paramObj.thanhTien = $("#inp-thanh-tien").val();
    paramObj.loaiPizza = $("#select-loai-pizza option:selected").text();
    paramObj.idVourcher = $("#inp-voucher").val();
    paramObj.hoTen = $("#inp-ho-ten").val();
    paramObj.email = $("#inp-email").val();
    paramObj.soDienThoai = $("#inp-so-dien-thoai").val();
    paramObj.diaChi = $("#inp-dia-chi").val();
    paramObj.loiNhan = $("#inp-loi-nhan").val();
    paramObj.idLoaiNuocUong = $("#select-drink option:selected").text();
    paramObj.trangThai = $("#inp-trang-thai").val();

}
// kiem tra thong tin
function validateDataOrder(paramObj) {
    if (paramObj.kichCo == "chọn kích cỡ" || paramObj.loaiPizza == "chọn loại pizza" || paramObj.idLoaiNuocUong == "chọn loại nước uống" || paramObj.hoTen == "" || paramObj.soDienThoai == "" || paramObj.diaChi == "") {
        alert("Nhập đầy đủ các trường!");
        return false;
    }

    else if (checkEmail(paramObj.email) == false) {
        return false;
    }


    else if (isNaN(paramObj.idVourcher) == true) {
        return false;
    }
    return true;
}
// validate email 
function checkEmail(paramEmail) {

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(paramEmail)) {
        alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
        email.focus;
        return false;
    }
    else {
        return true;
    }
}
function handleAddOrder() {
    alert("Đã thêm thành công!");
    $("#modal-order").modal().hide;
    location.reload();
}
function getDataRowTable(paramElement) {

    var vTable = $("#table-order").DataTable();
    var vRow = $(paramElement).closest("tr");
    var vData = vTable.row(vRow).data();
    return vData;
}
// load data modal
function getDataModalUpdate() {

    $("#select-kich-co-update option:selected").text(gDataOrder.kichCo);
    $("#inp-duong-kinh-update").val(gDataOrder.duongKinh);
    $("#inp-suon-update").val(gDataOrder.suon);
    $("#inp-salad-update").val(gDataOrder.salad);
    $("#select-loai-pizza-update option:selected").text(gDataOrder.loaiPizza);
    $("#inp-voucher-update").val(gDataOrder.idVourcher);
    $("#inp-thanh-tien-update").val(gDataOrder.thanhTien);

    $("#select-drink-update option:selected").text(gDataOrder.idLoaiNuocUong);
    $("#inp-so-luong-nuoc-update").val(gDataOrder.soLuongNuoc);
    $("#inp-ho-ten-update").val(gDataOrder.hoTen);
    $("#inp-email-update").val(gDataOrder.email);
    $("#inp-so-dien-thoai-update").val(gDataOrder.soDienThoai);
    $("#inp-dia-chi-update").val(gDataOrder.diaChi);
    $("#inp-loi-nhan-update").val(gDataOrder.loiNhan);


}
function handleUpdate() {
    alert("Cập nhật thành công!");
    $("#modal-update").modal().hide;
    location.reload();
}
function handleDelete() {
    alert("Xóa thành công!");
    $("#modal-delete").modal().hide;
    location.reload();
}
function getDataFilter(paramObj) {
    paramObj.loaiPizza = $("#select-loai-pizza-filter").val();
    paramObj.trangThai = $("#select-trang-thai-filter").val();
}
function handelFilter(paramObj) {
    console.log(gDataOrderAll);
    var vResult = [];
    vResult = gDataOrderAll.filter(function (item) {
        return (paramObj.loaiPizza == "Chọn loại pizza" || paramObj.loaiPizza == item.loaiPizza)
            && (paramObj.trangThai == "Chọn trạng thái" || paramObj.trangThai === item.trangThai.toUpperCase());


    })
    return vResult;
}





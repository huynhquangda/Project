"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gCOL_NAME = ["id", "studentId", "subjectId", "grade", "examDate", "action"];
const gCOL_STT = 0;
const gCOL_FULL_NAME = 1;
const gCOL_SUBJECT = 2;
const gCOL_GRADE = 3;
const gCOL_EXAM_DATE = 4;
const gCOL_ACTION = 5;
var gSTT = 0;

var gBASE_URL = "https://62454a477701ec8f724fb923.mockapi.io/api/v1/";
var gDataGrade = [];
var gDataStudent = "";
var gDataSubject = "";
var gDataRow = "";

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {

    goiApiStudent();
    goiApiSubject();
    onLoadTable();


    goiApiGrade();

    $("#btn-add").on("click", function () {
        $("#modal-grade-add").modal().show;
        onLoadDataSelectStudent();
        onLoadDataSelectSubject();
    })
    $("#btn-save-add").on("click", function () {
        onBtnAddGrade();
    })

    $("#table-grade").on("click", ".btn-edit", function () {
        $("#modal-grade-edit").modal().show;

        gDataRow = getDataRowTable(this);
        fillDataModalEdit();
        // onBtnEditGrade();
    })
    $("#btn-save-edit").on("click", function () {
        onBtnEditGrade();
    })
    $("#table-grade").on("click", ".btn-delete", function () {
        $("#modal-grade-delete").modal().show;
        gDataRow = getDataRowTable(this);
    })
    $("#btn-save-delete").on("click", function () {
        onBtnDeleteGrade();
    })
    $("#btn-filter").on("click", function () {
        var vArray = onBtnFilter();
        onLoadDataOnTable(vArray);
    })








})
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onLoadTable() {
    $("#table-grade").DataTable({
        columns: [
            { data: gCOL_NAME[gCOL_STT] },
            { data: gCOL_NAME[gCOL_FULL_NAME] },
            { data: gCOL_NAME[gCOL_SUBJECT] },
            { data: gCOL_NAME[gCOL_GRADE] },
            { data: gCOL_NAME[gCOL_EXAM_DATE] },
            { data: gCOL_NAME[gCOL_ACTION] },
        ],
        columnDefs: [
            {
                targets: gCOL_ACTION,
                defaultContent: '<i class="fas fa-edit mr-2 btn-edit"></i>' + '<i class="fas fa-trash-alt btn-delete"></i>'
            },
            {
                targets: gCOL_STT,
                render: ChuyenSTT,
            },
            {
                targets: gCOL_FULL_NAME,
                render: getFullName,
            },
            {
                targets: gCOL_SUBJECT,
                render: getFullSubject,
            }


        ]
    })
}
// load dữ liệu vào select sinh viên
function onLoadDataSelectStudent() {
    for (var bI = 0; bI < gDataStudent.length; bI++) {
        $("#select-student").append($("<option>", {
            text: gDataStudent[bI].username,
            vale: gDataStudent[bI].username.toUpperCase()
        }))

    }
}

// load data subject
function onLoadDataSelectSubject() {
    for (var bI = 0; bI < gDataSubject.length; bI++) {
        $("#select-subject").append($("<option>", {
            text: gDataSubject[bI].subjectName,
            vale: gDataSubject[bI].subjectName.toUpperCase()
        }))

    }
}
// Thêm grade table
function onBtnAddGrade() {
    var vGradeObj = {
        studentId: -1,
        subjectId: -1,
        grade: -1,
        examDate: "",
    }
    getDataGrade(vGradeObj);
    var vCheck = validateDataGrade(vGradeObj);
    if (vCheck) {
        $.ajax({
            url: gBASE_URL + "/grades",
            data: JSON.stringify(vGradeObj),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (paramRes) {
                handleAddGrade();
            },
            error: function (paramErr) {
                console.log(paramErr.status);
            }
        })
    }
    // console.log(vGradeObj);


    // thu thap thong tin
    // kiem tra thong tin
    // xu ly thog tin
    // hien thi thong tin
}
function onBtnEditGrade() {
    var vGradeObj = {
        studentId: -1,
        subjectId: -1,
        grade: -1,
        examDate: "",
    }
    getDataGradeUpdate(vGradeObj);
    $.ajax({
        url: gBASE_URL + "/" + "grades" + "/" + gDataRow.id,
        type: "PUT",
        data: JSON.stringify(vGradeObj),
        contentType: "application/json; charset=utf-8",
        success: function (paramRes) {
            handleUpdateGrade();
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }

    })

}
function onBtnDeleteGrade() {
    $.ajax({
        url: gBASE_URL + "/grades" + "/" + gDataRow.id,
        type: "DELETE",
        success: function (paramRes) {
            handleDelete();
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}
function onLoadDataSinhVienFilter() {
    for (var bI = 0; bI < gDataStudent.length; bI++) {
        $("#select-sinh-vien").append($("<option>", {
            text: gDataStudent[bI].username,
            vale: gDataStudent[bI].username.toUpperCase()
        }))

    }

}
function onLoadDataMonHocFilter() {
    for (var bI = 0; bI < gDataSubject.length; bI++) {
        $("#select-mon-hoc").append($("<option>", {
            text: gDataSubject[bI].subjectName,
            vale: gDataSubject[bI].subjectName.toUpperCase()
        }))

    }

}
function onBtnFilter() {
    var vFilterObj = {
        studentId: "",
        subjectId: "",
    }
    getDataFilter(vFilterObj);
    console.log(vFilterObj);
    var vIdSinhVien = findIdStudentByUserName(vFilterObj.studentId);
    var vIdMonHoc = findIdSubjectBySubjectName(vFilterObj.subjectId);
    var vResult = [];
    vResult = gDataGrade.filter(function (item) {
        return vIdSinhVien == item.studentId && vIdMonHoc == item.subjectId;
    })
    return vResult;
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function getDataFilter(paramObj) {
    paramObj.studentId = $("#select-sinh-vien option:selected").text();
    paramObj.subjectId = $("#select-mon-hoc option:selected").text();

}
function getDataRowTable(paramElement) {
    var vTable = $("#table-grade").DataTable();
    var vRow = (paramElement).closest("tr");
    var vDataRow = vTable.row(vRow).data();
    console.log(vDataRow);
    return vDataRow;
}
function ChuyenSTT() {
    return gSTT++;
}
function getFullName(data, type, row) {
    var vTimThay = false;
    var vIndex = 0;
    var vResult = "";
    while (!vTimThay && vIndex < gDataStudent.length) {
        if (data == gDataStudent[vIndex].id) {
            vResult = gDataStudent[vIndex].firstname + " " + gDataStudent[vIndex].lastname;

        }
        vIndex++;
    }
    // console.log(vResult);
    return vResult;


}
function getFullSubject(data, type, row) {
    var vTimThay = false;
    var vIndex = 0;
    var vResult = "";
    while (!vTimThay && vIndex < gDataSubject.length) {
        if (data == gDataSubject[vIndex].id) {
            vResult = gDataSubject[vIndex].subjectName;

        }
        vIndex++;
    }
    // console.log(vResult);
    return vResult;


}
function onLoadDataOnTable(paramData) {
    var vTable = $("#table-grade").DataTable();
    vTable.clear();
    gSTT = 1;

    vTable.rows.add(paramData);
    vTable.draw();
}
function goiApiStudent() {

    $.ajax({
        url: gBASE_URL + "/students",
        type: "GET",
        success: function (paramRes) {
            console.log(paramRes);
            gDataStudent = paramRes;
            onLoadDataSinhVienFilter();

        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })

}

function goiApiGrade() {
    $.ajax({
        url: gBASE_URL + "/grades",
        type: "GET",
        success: function (paramRes) {
            console.log(paramRes);
            onLoadDataOnTable(paramRes);
            gDataGrade = paramRes;

        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}
function goiApiSubject() {
    $.ajax({
        url: gBASE_URL + "/subjects",
        type: "GET",
        success: function (paramRes) {
            console.log(paramRes);

            gDataSubject = paramRes;
            onLoadDataMonHocFilter();

        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}
// ham tin id student
function findIdStudentByUserName(paramObj) {
    var vId = "";
    var vIndex = 0;
    var vTimThay = false;
    while (!vTimThay && vIndex < gDataStudent.length) {
        if (paramObj == gDataStudent[vIndex].username) {
            vId = gDataStudent[vIndex].id;
            vTimThay = true;
        }
        vIndex++;
    }
    return vId;
}
function findUserNameStudentById(paramObj) {
    var vUserName = "";
    var vIndex = 0;
    var vTimThay = false;
    while (!vTimThay && vIndex < gDataStudent.length) {
        if (paramObj == gDataStudent[vIndex].id) {
            vUserName = gDataStudent[vIndex].username;
            vTimThay = true;
        }
        vIndex++;
    }
    return vUserName;
}
// tìm id subject
function findIdSubjectBySubjectName(paramObj) {
    var vId = "";
    var vIndex = 0;
    var vTimThay = false;
    while (!vTimThay && vIndex < gDataSubject.length) {
        if (paramObj == gDataSubject[vIndex].subjectName) {
            vId = gDataSubject[vIndex].id;
            vTimThay = true;
        }
        vIndex++;
    }
    return vId;
}
function findSubjectNameBySubjecId(paramObj) {
    var vSubjectName = "";
    var vIndex = 0;
    var vTimThay = false;
    while (!vTimThay && vIndex < gDataSubject.length) {
        if (paramObj == gDataSubject[vIndex].id) {
            vSubjectName = gDataSubject[vIndex].subjectName;
            vTimThay = true;
        }
        vIndex++;
    }
    return vSubjectName;
}
// Thu thập thông tin
function getDataGrade(paramObj) {
    var vStudentUser = $("#select-student option:selected").text();
    paramObj.studentId = findIdStudentByUserName(vStudentUser);
    var vSubjectName = $("#select-subject option:selected").text();
    paramObj.subjectId = findIdSubjectBySubjectName(vSubjectName);
    // paramObj.studentId = $("#select-student option:selected").text();
    // paramObj.subjectId = $("#select-subject option:selected").text();
    paramObj.grade = $("#inp-grade").val();
    paramObj.examDate = $("#inp-date").val();

}
function getDataGradeUpdate(paramObj) {
    var vStudentUser = $("#select-student-edit option:selected").text();
    paramObj.studentId = findIdStudentByUserName(vStudentUser);
    var vSubjectName = $("#inp-grade-subject").val();
    paramObj.subjectId = findIdSubjectBySubjectName(vSubjectName);
    // paramObj.studentId = $("#select-student option:selected").text();
    // paramObj.subjectId = $("#select-subject option:selected").text();
    paramObj.grade = $("#inp-grade-edit").val();
    paramObj.examDate = $("#inp-date-edit").val();

}
// kiểm tra thông tin
function validateDataGrade(paramObj) {
    if (paramObj.subjectId == -1 || paramObj.studentId == -1 || paramObj.grade == -1 || paramObj.examDate == "") {
        alert("Nhập đầy đủ các trường!");
        return false;
    }
    else if (paramObj.grade < 0 || paramObj.grade > 10) {
        alert("Điểm phải là số dương và nhỏ hơn 10");
        return false;
    }
    else if (validateDate(paramObj.examDate) == null || validateDate(paramObj.examDate) == 0) {
        alert("Nhập đúng định dạng dd/mm/yyyy");
        return false;
    }
    return true;

}
// kiem tra ExamDate
function validateDate(dateStr) {
    const regExp = /^(\d\d?)\/(\d\d?)\/(\d{4})$/;
    let matches = dateStr.match(regExp);
    let isValid = matches;
    let maxDate = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (matches) {
        const month = parseInt(matches[1]);
        const date = parseInt(matches[2]);
        const year = parseInt(matches[3]);

        isValid = month <= 12 && month > 0;
        isValid &= date <= maxDate[month] && date > 0;

        const leapYear = (year % 400 == 0)
            || (year % 4 == 0 && year % 100 != 0);
        isValid &= month != 2 || leapYear || date <= 28;
    }

    return isValid
}
// xu ly them diem
function handleAddGrade() {
    alert("Thêm 1 grade thành công!");
    $("#modal-grade-add").modal().hide;
    location.reload();

}
function fillDataModalEdit() {
    var vUserName = findUserNameStudentById(gDataRow.studentId);
    $("#select-student-edit option:selected").text(vUserName);
    var vSubjectName = findSubjectNameBySubjecId(gDataRow.subjectId);
    $("#inp-grade-subject").val(vSubjectName);
    $("#inp-grade-edit").val(gDataRow.grade);
    $("#inp-date-edit").val(gDataRow.examDate);

}
function handleUpdateGrade() {
    alert("Cập nhật Grade thành công!");
    $("#modal-grade-edit").modal().hide;
    location.reload();
}
function handleDelete() {
    alert("Xóa Grade thành công!");
    $("#modal-grade-delete").modal().hide;
    location.reload();
}
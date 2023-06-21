var gCoursesDB = {
    description: "This DB includes all courses in system",
    courses: [
        {
            id: 1,
            courseCode: "FE_WEB_ANGULAR_101",
            courseName: "How to easily create a website with Angular",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-angular.jpg",
            teacherName: "Morris Mccoy",
            teacherPhoto: "images/teacher/morris_mccoy.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 2,
            courseCode: "BE_WEB_PYTHON_301",
            courseName: "The Python Course: build web application",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-python.jpg",
            teacherName: "Claire Robertson",
            teacherPhoto: "images/teacher/claire_robertson.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 5,
            courseCode: "FE_WEB_GRAPHQL_104",
            courseName: "GraphQL: introduction to graphQL for beginners",
            price: 850,
            discountPrice: 650,
            duration: "2h 15m",
            level: "Intermediate",
            coverImage: "images/courses/course-graphql.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: false
        },
        {
            id: 6,
            courseCode: "FE_WEB_JS_210",
            courseName: "Getting Started with JavaScript",
            price: 550,
            discountPrice: 300,
            duration: "3h 34m",
            level: "Beginner",
            coverImage: "images/courses/course-javascript.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 8,
            courseCode: "FE_WEB_CSS_111",
            courseName: "CSS: ultimate CSS course from beginner to advanced",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-css.jpg",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 9,
            courseCode: "FE_WEB_WORDPRESS_111",
            courseName: "Complete Wordpress themes & plugins",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Intermediate",
            coverImage: "images/courses/course-wordpress.jpg",
            teacherName: "Clevaio Simon",
            teacherPhoto: "images/teacher/clevaio_simon.jpg",
            isPopular: true,
            isTrending: false
        },
        {
            id: 10,
            courseCode: "FE_UIUX_COURSE_211",
            courseName: "Thinkful UX/UI Design Bootcamp",
            price: 950,
            discountPrice: 700,
            duration: "5h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-uiux.jpg",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: false,
            isTrending: false
        },
        {
            id: 11,
            courseCode: "FE_WEB_REACRJS_210",
            courseName: "Front-End Web Development with ReactJs",
            price: 1100,
            discountPrice: 850,
            duration: "6h 20m",
            level: "Advanced",
            coverImage: "images/courses/course-reactjs.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 12,
            courseCode: "FE_WEB_BOOTSTRAP_101",
            courseName: "Bootstrap 4 Crash Course | Website Build & Deploy",
            price: 750,
            discountPrice: 600,
            duration: "3h 15m",
            level: "Intermediate",
            coverImage: "images/courses/course-bootstrap.png",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: true,
            isTrending: false
        },
        {
            id: 14,
            courseCode: "FE_WEB_RUBYONRAILS_310",
            courseName: "The Complete Ruby on Rails Developer Course",
            price: 2050,
            discountPrice: 1450,
            duration: "8h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-rubyonrails.png",
            teacherName: "Claire Robertson",
            teacherPhoto: "images/teacher/claire_robertson.jpg",
            isPopular: false,
            isTrending: true
        }
    ]
}

"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gREQUEST_STATUS_OK = 200;
const gREQUEST_CREATE_OK = 201; // status 201 là tạo mới thành công
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
const gCONTENT_TYPE = "application/json;charset=UTF-8";
var gBASE_URL = "https://630890e4722029d9ddd245bc.mockapi.io/api/v1";
var gBASE_URL_CRUD = "https://624abe0dfd7e30c51c110ac6.mockapi.io/api/v1/";

var gId = 0;
/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
$(document).ready(function () {


    onPageLoading();
    onPageLoadingAllDataCourses();
    $("#btn-create").on("click", function () {
        $("#create-modal").modal().show;
    })
    $("#btn-create-save").on("click", function () {
        onBtnCreateCourse();
    })
    $("#row-all-courses").on("click", ".btn-update", function () {
        $("#update-modal").modal().show;
        onBtnUpdate(this);
        getDataCourseById();
        // onBtnUpdateCouser();

    });
    $("#row-all-courses").on("click", ".btn-delete", function () {
        $("#delete-modal").modal().show;
        onBtnDelete(this);


    });
    $("#btn-update-save").on("click", function () {
        onBtnUpdateCouser();
    })
    $("#btn-delete-save").on("click", function () {
        onBtnDeleteCourses();
    })


})
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */

function onPageLoading() {
    $.ajax({
        url: gBASE_URL + "/courses",
        type: "GET",
        success: function (paramRes) {
            console.log(paramRes);
            onLoadData(paramRes);
            // getDataAllCourses(paramRes)

        },
        error: function (paramError) {
            console.log(paramError.status);
        }
    })
}
function onPageLoadingAllDataCourses() {
    $.ajax({
        url: gBASE_URL_CRUD + "/courses",
        type: "GET",
        success: function (paramRes) {
            console.log(paramRes);
            // onLoadData(paramRes);
            getDataAllCourses(paramRes)

        },
        error: function (paramError) {
            console.log(paramError.status);
        }
    })
}
function onLoadData(paramRes) {

    var vCountTrend = 0;
    var vCountPop = 0;
    var vIndex = 0;
    while (vCountPop < 4) {
        if (paramRes[vIndex].isTrending == true) {

            getDataTrending(paramRes, vIndex);
            vCountTrend++;
        }
        if (paramRes[vIndex].isPopular == true) {
            getDataPopular(paramRes, vIndex);
            vCountPop++;
        }
        vIndex++;
    }
}
// create courses
function onBtnCreateCourse() {
    var vObjCourse = {
        courseCode: "",
        courseName: "",
        price: 0,
        discountPrice: 0,
        duration: "",
        level: "",
        coverImage: "",
        teacherName: "",
        teacherPhoto: "",
        isPopular: false,
        isTrending: true,
    }
    getDataCourse(vObjCourse); //b1 thu thập thông tin
    var vCheck = validateData(vObjCourse); // b2 kiểm tra thông tin
    if (vCheck) {
        $.ajax({
            url: gBASE_URL_CRUD + "/courses",
            type: "POST",
            data: JSON.stringify(vObjCourse),
            contentType: gCONTENT_TYPE,

            success: function (paramRes) {
                // thông báo thêm thành công
                // xóa bỏ dữ liệu cũ
                // đóng modal
                getHandle();
            },
            error: function (paramError) {
                console.log(paramError.status);
            },

        })
    }
    // b3 gọi api xử lý

    // b4 hiển thị 

}

function onBtnUpdate(paramObj) {
    var vId = $(paramObj).data("id");
    console.log(vId);
    gId = vId;
}
function onBtnDelete(paramObj) {
    var vId = $(paramObj).data("id");
    console.log(vId);
    gId = vId;
}
// goi mot Course theo id
function getDataCourseById() {
    $.ajax({
        url: gBASE_URL_CRUD + "/courses/" + gId,
        type: "GET",
        success: function (paramRes) {
            console.log(paramRes);
            loadDataModalUpdate(paramRes);
        },
        error: function (parammErr) {
            console.log(parammErr.status);
        }
    })
}

function onBtnDeleteCourses() {
    $.ajax({
        url: gBASE_URL_CRUD + "/courses/" + gId,
        type: "DELETE",
        contentType: gCONTENT_TYPE,
        success: function (paramRes) {
            getHandleDelete();
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}
function loadDataModalUpdate(paramRes) {

    $("#inp-courseCode-up").val(paramRes.courseCode);
    $("#inp-courseName-up").val(paramRes.courseName);
    $("#inp-price-up").val(paramRes.price);
    $("#inp-discountPrice-up").val(paramRes.discountPrice);
    $("#inp-duration-up").val(paramRes.duration);
    $("#select-level-up option:selected").text(paramRes.level);
    $("#inp-teacher-name-up").val(paramRes.teacherName);
    // ********************not val img+radio***************************//
    // $("#img-course-up").val("images/courses/");
    // $("#hello-up").val("hello");
    // $("#img-teacher-up").val();
    // var vIsTrending = $('input[name=radio-trending]:checked', '#form-trending').val(paramRes.isTrending);
    // if (vIsTrending == "true") {
    //     paramCourse.isTrending = true;
    // }
    // else if (vIsTrending == "false") {
    //     paramCourse.isTrending = false;
    // }


}
function onBtnUpdateCouser() {
    var vObjCourse = {
        courseCode: "",
        courseName: "",
        price: 0,
        discountPrice: 0,
        duration: "",
        level: "",
        coverImage: "",
        teacherName: "",
        teacherPhoto: "",
        isPopular: false,
        isTrending: true,
    }
    getDataCourseUpdate(vObjCourse);
    // var vCheck = validateData(vObjCourse);
    // if (vCheck) {
    $.ajax({
        url: gBASE_URL_CRUD + "courses/" + gId,
        type: "PUT",
        contentType: gCONTENT_TYPE,
        data: JSON.stringify(vObjCourse),
        success: function (paramRes) {
            console.log(paramRes);
            getHandleUpdate();
        },
        error: function (paramError) {
            console.log(paramError.status);
        }

    })
    // }

}


/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function getDataTrending(paramRes, paramIndex) {

    $("#row-trending").append($("<div>", {
        class: "col-sm-3",

    })
        .append($("<div>", {
            class: "card card-demo",

        })
            .append($("<div>", {
                class: "card card-demo",

            })
                .append($("<img>", {
                    class: "card-img-top",
                    src: paramRes[paramIndex].coverImage,

                }))
                .append($("<div>", {
                    class: "card-body",

                })
                    .append($("<div>", {
                        class: "row",
                    })
                        .append($("<div>", {
                            class: "col-sm-12",
                        })
                            .append($("<h6>", {
                                class: "text-primary font-weight-bold",
                                html: paramRes[paramIndex].courseName,

                            }))
                        )
                    )
                    .append($("<div>", {
                        class: "row pl-3",
                    })
                        .append($("<i>", {
                            class: "far fa-clock mr-2 mt-1",

                        }))
                        .append($("<p>", {
                            html: paramRes[paramIndex].duration,
                        })


                        )
                        .append($("<p>", {
                            class: "ml-3",
                            html: paramRes[paramIndex].level
                        }))
                    )
                    .append($("<div>", {

                    })
                        .append($("<div>", {
                            class: "col-sm-12",
                        })
                            .append($("<p>", {
                                class: "font-weight-bold",
                                html: "$" + paramRes[paramIndex].discountPrice,
                            })
                                .append($("<del>", {
                                    class: "text text-del-money ml-2",
                                    html: "$" + paramRes[paramIndex].price
                                }))
                            )
                        )
                    )
                )
                .append($("<div>", {
                    class: "card-footer",
                })
                    .append($("<div>", {
                        class: "row row-card"
                    })
                        .append($("<div>", {
                            class: "col-sm-3",
                        })
                            .append($("<img>", {
                                src: paramRes[paramIndex].teacherPhoto,
                                class: "rounded-circle",
                                height: "40",
                            }))
                        )
                        .append($("<div>", {
                            class: "col-sm-7 text-left pt-2",
                        })
                            .append($("<p>", {

                                class: "small",
                                html: paramRes[paramIndex].teacherName,

                            }))
                        )
                        .append($("<div>", {
                            class: "col-sm-2  text-right pt-2",
                        })
                            .append($("<i>", {

                                class: "far fa-bookmark",


                            }))
                        )
                    )
                )
            )
        )
    )

}
function getDataPopular(paramRes, paramIndex) {

    $("#row-popular").append($("<div>", {
        class: "col-sm-3",

    })
        .append($("<div>", {
            class: "card card-demo",

        })
            .append($("<div>", {
                class: "card card-demo",

            })
                .append($("<img>", {
                    class: "card-img-top",
                    src: paramRes[paramIndex].coverImage,

                }))
                .append($("<div>", {
                    class: "card-body",

                })
                    .append($("<div>", {
                        class: "row",
                    })
                        .append($("<div>", {
                            class: "col-sm-12",
                        })
                            .append($("<h6>", {
                                class: "text-primary font-weight-bold",
                                html: paramRes[paramIndex].courseName,

                            }))
                        )
                    )
                    .append($("<div>", {
                        class: "row pl-3",
                    })
                        .append($("<i>", {
                            class: "far fa-clock mr-2 mt-1",

                        }))
                        .append($("<p>", {
                            html: paramRes[paramIndex].duration,
                        })


                        )
                        .append($("<p>", {
                            class: "ml-3",
                            html: paramRes[paramIndex].level
                        }))
                    )
                    .append($("<div>", {

                    })
                        .append($("<div>", {
                            class: "col-sm-12",
                        })
                            .append($("<p>", {
                                class: "font-weight-bold",
                                html: "$" + paramRes[paramIndex].discountPrice,
                            })
                                .append($("<del>", {
                                    class: "text text-del-money ml-2",
                                    html: "$" + paramRes[paramIndex].price
                                }))
                            )
                        )
                    )
                )
                .append($("<div>", {
                    class: "card-footer",
                })
                    .append($("<div>", {
                        class: "row row-card"
                    })
                        .append($("<div>", {
                            class: "col-sm-3",
                        })
                            .append($("<img>", {
                                src: paramRes[paramIndex].teacherPhoto,
                                class: "rounded-circle",
                                height: "40",
                            }))
                        )
                        .append($("<div>", {
                            class: "col-sm-7 text-left pt-2",
                        })
                            .append($("<p>", {

                                class: "small",
                                html: paramRes[paramIndex].teacherName,

                            }))
                        )
                        .append($("<div>", {
                            class: "col-sm-2  text-right pt-2",
                        })
                            .append($("<i>", {

                                class: "far fa-bookmark",


                            }))
                        )
                    )
                )
            )
        )
    )

}
function getDataAllCourses(paramRes) {
    for (var bI = 0; bI < paramRes.length; bI++) {
        $("#row-all-courses").append($("<div>", {
            class: "col-sm-3 mb-5",

        })
            .append($("<div>", {
                class: "card card-demo",

            })
                .append($("<div>", {
                    class: "card card-demo",

                })
                    .append($("<img>", {
                        class: "card-img-top",
                        height: 151.07,
                        src: paramRes[bI].coverImage,

                    }))
                    .append($("<div>", {
                        class: "card-body",

                    })
                        .append($("<div>", {
                            class: "row",
                        })
                            .append($("<div>", {
                                class: "col-sm-12",
                            })
                                .append($("<h6>", {
                                    class: "text-primary font-weight-bold",
                                    html: paramRes[bI].courseName,

                                }))
                            )
                        )
                        .append($("<div>", {
                            class: "row pl-3",
                        })
                            .append($("<i>", {
                                class: "far fa-clock mr-2 mt-1",

                            }))
                            .append($("<p>", {
                                html: paramRes[bI].duration,
                            })


                            )
                            .append($("<p>", {
                                class: "ml-3",
                                html: paramRes[bI].level
                            }))
                        )
                        .append($("<div>", {

                        })
                            .append($("<div>", {
                                class: "col-sm-12",
                            })
                                .append($("<p>", {
                                    class: "font-weight-bold",
                                    html: "$" + paramRes[bI].discountPrice,
                                })
                                    .append($("<del>", {
                                        class: "text text-del-money ml-2",
                                        html: "$" + paramRes[bI].price
                                    }))
                                )
                            )
                        )
                        .append($("<div>", {
                            class: "row"
                        })
                            .append($("<button>", {
                                class: "btn btn-danger mx-3 btn-delete",
                                html: "Delete",

                            }

                            )
                                .data("id", paramRes[bI].id),

                            )
                            .append($("<button>", {
                                class: "btn btn-warning px-4 btn-update",
                                html: "Edit",
                            })
                                .data("id", paramRes[bI].id),
                            )

                        )
                    )
                    .append($("<div>", {
                        class: "card-footer",
                    })
                        .append($("<div>", {
                            class: "row row-card"
                        })
                            .append($("<div>", {
                                class: "col-sm-3",
                            })
                                .append($("<img>", {
                                    src: paramRes[bI].teacherPhoto,
                                    class: "rounded-circle",
                                    height: "40",
                                }))
                            )
                            .append($("<div>", {
                                class: "col-sm-7 text-left pt-2",
                            })
                                .append($("<p>", {

                                    class: "small",
                                    html: paramRes[bI].teacherName,

                                }))
                            )
                            .append($("<div>", {
                                class: "col-sm-2  text-right pt-2",
                            })
                                .append($("<i>", {

                                    class: "far fa-bookmark",


                                }))
                            )
                        )
                    )
                )
            )
        )
    }


}

function getDataCourse(paramCourse) {
    paramCourse.courseCode = $("#inp-courseCode").val().trim();
    paramCourse.courseName = $("#inp-courseName").val().trim();
    paramCourse.price = $("#inp-price").val().trim();
    paramCourse.discountPrice = $("#inp-discountPrice").val().trim();
    paramCourse.duration = $("#inp-duration").val().trim();
    paramCourse.level = $("#select-level option:selected").text();

    paramCourse.coverImage = "images/courses/" + $("#img-course").val().split("\\").pop();
    paramCourse.teacherName = $("#inp-teacherName").val().trim();
    paramCourse.teacherPhoto = "images/teacher/" + $("#img-teacher").val().split("\\").pop();

    var vIsPopular = $('input[name=radio-popular]:checked', '#form-popular').val();
    if (vIsPopular == "true") {
        paramCourse.isPopular = true;
    }
    else if (vIsPopular == "false") {
        paramCourse.isPopular = false;
    }
    var vIsTrending = $('input[name=radio-trending]:checked', '#form-trending').val();
    if (vIsTrending == "true") {
        paramCourse.isTrending = true;
    }
    else if (vIsTrending == "false") {
        paramCourse.isTrending = false;
    }


}
function validateData(paramCourse) {
    var vInputPrice = Number(paramCourse.price);
    var vInputDiscoutPrice = Number(paramCourse.discountPrice);
    if (paramCourse.courseCode == "" || paramCourse.courseName == "" || paramCourse.price == ""
        || paramCourse.duration == "" || paramCourse.coverImage == "images/courses/" || paramCourse.teacherPhoto == "images/teacher/"
        || paramCourse.teacherName == "") {
        alert("phải nhập đầy đủ các trường!");
        return false;
    }
    else if (paramCourse.level == "Chọn level") {
        alert("Vui lòng chọn level!");
        return false;
    }
    else if (paramCourse.courseCode.length < 11) {
        alert("Mã khóa học phải hơn 10 kí tự");
        return false;
    }
    else if (paramCourse.courseName.length < 21) {
        alert("Tên khóa học phải hơn 20 kí tự")
        return false;
    }
    else if (Number.isInteger(vInputPrice) == false || vInputPrice <= 0) {
        alert("Giá là số nguyên và lớn hơn 0!");
        return false;
    }
    else if (Number.isInteger(vInputDiscoutPrice) == false || vInputDiscoutPrice <= 0 || vInputDiscoutPrice >= vInputPrice) {
        alert("Giảm giá phải là số nguyên lớn hơn 0 và nhỏ hơn giá gốc!");
        return false;
    }

    return true;

}
function getDataCourseUpdate(paramCourse) {
    paramCourse.courseCode = $("#inp-courseCode-up").val().trim();
    paramCourse.courseName = $("#inp-courseName-up").val().trim();
    paramCourse.price = $("#inp-price-up").val().trim();
    paramCourse.discountPrice = $("#inp-discountPrice-up").val().trim();
    paramCourse.duration = $("#inp-duration-up").val().trim();
    paramCourse.level = $("#select-level-up option:selected").text();

    paramCourse.coverImage = "images/courses/" + $("#img-course-up").val().split("\\").pop();
    paramCourse.teacherName = $("#inp-teacher-name-up").val().trim();
    paramCourse.teacherPhoto = "images/teacher/" + $("#img-teacher-up").val().split("\\").pop();

    var vIsPopular = $('input[name=radio-popular]:checked', '#form-popular-up').val();
    if (vIsPopular == "true") {
        paramCourse.isPopular = true;
    }
    else if (vIsPopular == "false") {
        paramCourse.isPopular = false;
    }
    var vIsTrending = $('input[name=radio-trending]:checked', '#form-trending-up').val();
    if (vIsTrending == "true") {
        paramCourse.isTrending = true;
    }
    else if (vIsTrending == "false") {
        paramCourse.isTrending = false;
    }


}

// 
function getHandle() {
    alert("Thêm khóa học thành công");
    $("#btn-create-save").modal().hide;
    location.reload();
}
function getHandleUpdate() {
    alert("Cập nhật thành công!");
    $("#btn-update-save").modal().hide;
    location.reload();
}
function getHandleDelete() {
    alert("Xóa thành công!");
    $("#btn-delete-save").modal().hide;
    location.reload();
}








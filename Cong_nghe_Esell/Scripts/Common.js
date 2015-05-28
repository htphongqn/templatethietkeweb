/*
* Created       : Nguyen Duc Hien
* Created Date  : 25th Dec 2012
*/

var fileUpload = "";
var remainLength = 5;
/*
 * Set Cookie User's Location throught provinceId
 */
//function CreateCookie() {
//    //debugger;
//    var iprovince = $('#allprovince option:selected').val();
//    var c_name = 'CK_CHECK_PROVINCE_OF_USER';
//    $('#provinceid').val(iprovince);
//    var expiredays = 30;
//    CreateCookie(c_name, iprovince, expiredays);
//    alert(getCookie('CK_CHECK_PROVINCE_OF_USER'));
//    $('#provinceid').val(iprovince);
//    $('.splash-wrapper').css('display', 'none');
//    $('body').css('overflow', 'auto');
//}

var i = 0;
function Runplaceholder(str, textinput) {
    var arr = str.split(" ");
    textinput += arr[i] + " ";
    $('#search-keyword').attr('placeholder', textinput);
    i++;
    if (i < arr.length) {
        setTimeout("Runplaceholder('" + str + "','" + textinput + "')", 400);
    }
}

function FormatPhone(obj, val, event) {
    var pos = doGetCaretPosition(obj);
    val = val.replace(/-/g, '');
    if (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if ((keycode >= '48' && keycode <= '57') || (keycode >= '96' && keycode <= '105')) {
            if (val.length <= 4) {
                obj.value = val;
            }
            else if (val.length > 4 && val.length <= 7) {
                obj.value = val.substr(0, 4) + "-" + val.substr(4);
            }
            else if (val.length > 7) {
                obj.value = val.substr(0, 4) + "-" + val.substr(4, 3) + "-" + val.substr(7);
            }
        }
        else if (keycode == '37' || keycode == '38') {
            if (val.length <= 4) {
                obj.value = val;
                setCaretPosition(obj, pos);
            }
            else if (val.length > 4 && val.length <= 7) {
                obj.value = val.substr(0, 4) + "-" + val.substr(4);
                setCaretPosition(obj, pos);
            }
            else if (val.length > 7) {
                obj.value = val.substr(0, 4) + "-" + val.substr(4, 3) + "-" + val.substr(7);
                setCaretPosition(obj, pos);
            }
        }
    }
    else {
        //        if (val.length <= 4) {
        //            obj.value = val;
        //            setCaretPosition(obj, pos);
        //        }
        //        else if (val.length > 4 && val.length <= 7) {
        //            obj.value = val.substr(0, 4) + "-" + val.substr(4);
        //            setCaretPosition(obj, pos);
        //        }
        //        else if (val.length > 7) {
        //            obj.value = val.substr(0, 4) + "-" + val.substr(4, 3) + "-" + val.substr(7);
        //            setCaretPosition(obj, pos);
        //        }
    }
}

function doGetCaretPosition(ctrl) {
    var CaretPos = 0; // IE Support
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
        // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}
function setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

// !!!!! Onload
$(document).ready(function () {
    var splash = $('.splash-wrapper');
    if (splash.css('display') == 'block') {
        $('body').css('position', 'relative');
    }
    //LoadProvince();
    $('#site-header #user-zone .user-location a.location').click(function () {
        $('#site-header #user-zone .user-location .select-location-wrapper').css('display', 'block');
        $('#localtion-search').focus();
    });

    $('#site-header #user-zone .user-location .select-location-wrapper').mouseover(function () {
        $('#site-header #user-zone .user-location .select-location-wrapper').css('display', 'block');
    }).mouseout(function () {
        $('#site-header #user-zone .user-location .select-location-wrapper').css('display', 'none');
    });

    $('#site-header #site-search .form .input-wrapper input').click(function () {
        $('#site-header #site-search .form .search-suggestion-wrapper').css('display', 'block');
    });

    $('#site-header #site-search .form .search-suggestion-wrapper').mouseover(function () {
        $('#site-header #site-search .form .search-suggestion-wrapper').css('display', 'block');
    }).mouseout(function () {
        $('#site-header #site-search .form .search-suggestion-wrapper').css('display', 'none');
    });

    // Product list item's information slide top on hover		
    $('.product-list-wrapper .product-list li:not(.double-col)').live({
        mouseenter:
            function () {
                $(this).find('.more-detail').animate({
                    'top': 0
                }, {
                    duration: 500,
                    queue: false,
                    complete: function () {
                    }
                });
            },
        mouseleave:
            function () {
                $(this).find('.more-detail').animate({
                    'top': 220
                }, {
                    duration: 500,
                    queue: false,
                    complete: function () {
                    }
                });
            }
    });

    $("#SuggestSearch .search-suggestion ul li.selected a").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            window.location = $('#SuggestSearch div.search-suggestion ul li.selected a').attr('href');
        }
    });

    // Fix double click on navigation on tablet
    $('#site-body .navigation-banner .navigation ul li a').mouseenter(function () {
        $(this).addClass('hover');
    }).mouseleave(function () {
        $(this).removeClass('hover');
    })

    $('#ads-name, #ads-submit').click(function () {
        CreateClassified();
        if ($(window).scrollTop() < 300) {
            var y = $(window).scrollTop();  // current y position on the page
            $('#form-wrapper .ads-form-wrapper').fadeIn(300);
            var formwrapp = $('#form-wrapper .ads-form-wrapper').height();
            $(window).scrollTop(y + formwrapp - $(window).scrollTop()).fadeIn(500);
        }
        else {
            $('#form-wrapper .ads-form-wrapper').fadeIn(300);
        }

        if ($('#select-category :selected').text() == "") {
            $('#select-category').val(-1);
            $("#select-category option[value=-1]").attr("selected", "selected");
        }
        if ($('#select-location :selected').text() == "") {
            $('#select-location').val(provinceId);
            $("#select-location option[value=" + provinceId + "").attr("selected", "selected");
        }
    });

    $('#cancel-ads').live("click", function () {
        $('#select-category option[value="-1"]').attr("selected", "selected");
        $('#title').val('');
        $('#price').val('');
        $('#content').val('');
        $('#phone').val('');
        $('#email').val('');
        //var liIds = $('#thumbnail li img').map(function (i, n) {
        //    return $(n).attr('id');
        //}).get().join(',');
        var liIds = $('#thumbnail li img').map(function (i, n) {
            RemoveImage($(n).attr('id'));
        });
        $('.ads-form-wrapper').fadeOut();
    });

    $('#price').live('keypress', function (e) {
        //var e = event || evt; // for trans-browser compatibility
        var charCode = e.which || e.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true; r
    });

    $('#phone').live('keypress', function (e) {
        //var e = event || evt; // for trans-browser compatibility
        var charCode = e.which || e.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    });

    $('#phone').live('blur', function (e) {
        var num = $.trim($('#phone').val());
        if (num == '')
            return;
        //if (num.indexOf(0) == 0 || num.indexOf(0) == 3)
        //num = setCharAt(num, num.indexOf(0), "");

        $('#phone').val(num);
    });

    $('#price').live('blur', function () {
        ValidateAndFormatNumber(this);
        //$('#price').val($('#price').val().replace('₫',''));
        //$('#price').val(ValidateAndFormatNumber(this) + ' ₫');
    });

    $('ul.location-list li a').live("click", function () {
        $('#provinceid').val($(this).attr('data-id'));
        var provinceId = $(this).attr('data-id');
        var c_name = 'CK_CHECK_PROVINCE_OF_USER';
        var expiredays = (30 * 365);
        CreateCookie(c_name, provinceId, expiredays);
        window.location.reload();
    });

    $('#localtion-search').live('keypress', function (event) {
        if (event.which == '13') {
            var provinceId = $('#location-suggestion-wrapper ul li.selected a').attr('data-id').trim();
            $('#provinceid').val($('#location-suggestion-wrapper ul li.selected a').attr('data-id').trim());
            var c_name = 'CK_CHECK_PROVINCE_OF_USER';
            var expiredays = (30 * 365);
            CreateCookie(c_name, provinceId, expiredays);
            window.location.reload();
        }
    });

    $('#selectArea').live("click", function () {
        if ($('#allprovince option:selected').val() != -1) {
            var iprovince = $('#allprovince option:selected').val();
            var c_name = 'CK_CHECK_PROVINCE_OF_USER';
            $('#provinceid').val(iprovince);
            var expiredays = (30 * 365);
            CreateCookie(c_name, iprovince, expiredays);
            window.location.reload();
        }
        else {
            $('.splash-wrapper').css('display', 'block');
            $('body').css('overflow', 'auto');
        }
    });
});

var FLAG_CREATE_CLASSIFIED = true;
function CreateClassified() {
    if (FLAG_CREATE_CLASSIFIED == false) return;
    $.ajax({
        url: '/aj/Home/CreateClassifiedAds/',
        type: "GET",
        cache: false,
        data: {  },
        beforeSend: function () {
            $('.loader-create-classified').show();
        },
        success: function (result) {
            $('.loader-create-classified').hide();
            if (result != null) {
                $('.ads-form-wrapper').html(result);
                FLAG_CREATE_CLASSIFIED = true;
            }
        },
        error: function (d) {
            $('.loader-create-classified').hide();
        }
    })
}

var FLAG_GET_NEW_CLASSIFIED = true;
function GetNewClassifieds() {
    var provinceId = parseInt(getCookie('CK_CHECK_PROVINCE_OF_USER'));
    if (FLAG_GET_NEW_CLASSIFIED == false)
        return;
    FLAG_GET_NEW_CLASSIFIED = false;
    $.ajax({
        url: '/aj/Home/GetNewListClassifieds/',
        type: "GET",
        cache: false,
        data: { ProvinceId: provinceId },
        beforeSend: function () {
        },
        success: function (result) {
            if (result != null) {
                $('ul.ads-list').animate({ opacity: 0.5 }, 300).fadeOut(10);
                $('ul.ads-list').css('height', $('ul.ads-list').height());
                $('ul.ads-list').html(result);
                $('ul.ads-list').animate({ opacity: 1 }, 300).fadeIn(300);
                FLAG_GET_NEW_CLASSIFIED = true;
            }
        },
        error: function (d) {
        }
    })
}

function ReloadDataBaseScreen() {
    SCREEN_RESOLUTION = $.extend({}, SCREEN_RESOLUTION, { resolution: SCREEN_RESOLUTION, ProvinceId: _provinceId })
    if (FLAG == false)
        return;
    FLAG = false;
    POSTAjax(
           '/aj/Home/ReloadDataBaseScreen/',
           SCREEN_RESOLUTION,
          BeforeSendAjax,
           function (e) {
               $('#dlding').fadeOut(300);
               if (e != null) {
                   $('.product-list').html(e);
                   FLAG = true;
               }
           },
           function () { },
           true
           );
}

function LoadProvince() {
    if (FLAG == false)
        return;
    FLAG = false;
    POSTAjax(
           '/aj/Home/GenerateProvinceOnLoadPage/',
           _data_provinceId,
          BeforeSendAjax,
           function (e) {
               $('#dlding').fadeOut(300);
               if (e != null) {
                   $('ul.location-list').html($(e)[0]);
                   $('#block-location').text($(e)[1]);
                   FLAG = true;
               }
           },
           function () { },
           true
           );
}

// CALLING AJAX
function POSTAjax(url, dat, befHandle, sucHandle, errHandle, asy) {
    $.ajax({
        async: asy,
        url: url,
        data: dat,
        type: 'POST',
        cache: false,
        beforeSend: function () {
            befHandle();
        },
        success: function (e) {
            sucHandle(e);
        },
        error: function () {
            errHandle();
        }
    });
}

// Calling a AJAX request with 'POST' type and JSON data type
function POSTAjaxJSON(url, dat, befHandle, sucHandle, errHandle, asy) {
    $.ajax({
        async: asy,
        url: url,
        data: dat,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        cache: false,
        beforeSend: function () {
            befHandle();
        },
        complete: function (e) {
            sucHandle(e);
        },
        error: function () {
            errHandle();
        }
    });
}

// BeforeSendAjax
function BeforeSendAjax() {
    $('#dlding').show();
}

// ErrorAjax
function ErrorAjax() {
    // Not implemented yet
}

function CallAjaxPost(url, dat, befHandle, sucHandle, errHandle, asy) {
    $.ajax({
        async: asy,
        url: url,
        data: dat,
        type: 'POST',
        cache: false,
        beforeSend: function () {
            befHandle();
        },
        success: function (e) {
            sucHandle(e);
        },
        error: function () {
            errHandle();
        }
    });
}

var click = false;
$('#post-ads').live("click", function () {
    $('#post-ads').attr('disabled', 'disabled');

    click = true;
    var options = {
        //target: '#showmessage',   // target element(s) to be updated with server response 
        beforeSubmit: showRequest,  // pre-submit callback 
        success: showResponse,  // post-submit callback 
        //clearForm: true        // clear all form fields after successful submit 

        // other available options: 
        //url:       url         // override for form's 'action' attribute 
        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        //resetForm: true        // reset the form after successful submit 

        // $.ajax options can be used here too, for example: 
        //timeout:   3000 
    };

    // bind to the form's submit event 
    //$('#form-ads').submit(function () {

    // inside event callbacks 'this' is the DOM element so we first 
    // wrap it in a jQuery object and then invoke ajaxSubmit 
    if (PrepareSubmit(click) == true) {
        $('#Ispost').val(0);

        $('#form-ads').ajaxSubmit(options);
    }

    // !!! Important !!! 
    // always return false to prevent standard browser submit and page navigation 
    //return false;
    //});
});

/*/
 * -------------------------- Functions Use for Post New ClassifiedAds --------------------------/
 */
function showRequest(formData, jqForm, options) {
    // formData is an array; here we use $.param to convert it to a string to display it 
    // but the form plugin does this for you automatically when it submits the data 
    var queryString = $.param(formData);
    $('#form-ads .form-wrapper').append('<div id="fade-add-classifieds"><div class="div-loading">Vui lòng chờ trong giây lát!</div></div>');
    $('#fade-add-classifieds').css({ 'filter': 'alpha(opacity=80)' }).fadeIn();
    // jqForm is a jQuery object encapsulating the form element.  To access the 
    // DOM element for the form do this: 
    // var formElement = jqForm[0]; 

    //alert('About to submit: \n\n' + queryString);

    // here we could return false to prevent the form from being submitted; 
    // returning anything other than false will allow the form submit to continue 
    return true;
}

function showResponse(response) {
    console.log(response);
    if (response == "fail_when_post_Ads") {

        //Remove all image have already uploaded
        $('#thumbnail li').find("img").each(function () {
            var imgId = $(this).attr('id');
            RemoveImage(imgId);
        });

        $('#post-ads').removeAttr('disabled', 'disabled');
        alert("Quá trình đăng tin xảy ra lỗi.");
        $('#form-ads .form-wrapper #fade-add-classifieds').fadeOut(function () {
            $('#fade-add-classifieds').remove();
        });

        return;
    }

    if (response == -1) {
        $('#post-ads').removeAttr('disabled', 'disabled');
        alert("Tiêu đề tin đăng không hợp lệ.");
        $('#form-ads .form-wrapper #fade-add-classifieds').fadeOut(function () {
            $('#fade-add-classifieds').remove();
        });
        return;
    }

    if (response == -2) {
        $('#post-ads').removeAttr('disabled', 'disabled');
        alert("Giá bán không hợp lệ.");
        $('#form-ads .form-wrapper #fade-add-classifieds').fadeOut(function () {
            $('#fade-add-classifieds').remove();
        });
        return;
    }

    if (response == -3) {
        $('#post-ads').removeAttr('disabled', 'disabled');
        alert("Nội dung tin đăng không hợp lệ. \nTối thiếu từ 20 ký tự trở lên");
        $('#form-ads .form-wrapper #fade-add-classifieds').fadeOut(function () {
            $('#fade-add-classifieds').remove();
        });
        return;
    }

    if (response == -4) {
        $('#post-ads').removeAttr('disabled', 'disabled');
        alert("Số điện thoại không hợp lệ.");
        $('#form-ads .form-wrapper #fade-add-classifieds').fadeOut(function () {
            $('#fade-add-classifieds').remove();
        });
        return;
    }

    if (response == -5) {
        $('#post-ads').removeAttr('disabled', 'disabled');
        alert("Họ tên không hợp lệ. \nTối thiếu từ 05 ký tự trở lên");
        $('#form-ads .form-wrapper #fade-add-classifieds').fadeOut(function () {
            $('#fade-add-classifieds').remove();
        });
        return;
    }

    if (response) {
        $('#post-ads').removeAttr('disabled', 'disabled');
        $('#showmessage').css({ 'float': 'left' });
        $('#showmessage').addClass('clearfix');
        $('#showmessage').html('');
        $('#showmessage').append(RenderMessage(response));
    }

    $('#post-ads').removeAttr('disabled', 'disabled');
    $('.ads-form-wrapper').slideUp('fast');
    $('#select-category option[value="-1"]').attr("selected", "selected");
    $('#title').val('');
    $('#price').val('');
    $('#content').val('');
    $('#phone').val('');
    $('#email').val('');
    $('#thumbnail li').find("img").each(function () {
        $(this).parent().remove();
        $(this).remove();
    });
    $('#form-ads .form-wrapper #fade-add-classifieds').fadeOut(function () {
        $('#fade-add-classifieds').remove();
    });
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

function RenderMessage(id) {
    var html = '';
    html = '<div id="divMessage">';
    html += 'Cám ơn bạn đã đăng tin Rao vặt tại thegioididong.';
    html += '<div>Mã tin đăng của bạn là:<strong> ' + id + '.</strong></div>';
    html += '<div>(Tin đăng của qúy khách sẽ được hiển thị khoảng 30 phút sau).</div>';
    html += '<div>Để xác thực tin đăng vui lòng nhắn tin theo cú pháp: </div>';
    html += '<div><strong>RV VIP</strong> <strong>' + id + '</strong> gửi <strong>1900 561 292</strong> (Phí nhắn tin là 1000đ)</di>';
    html += '</div>';
    return html;
}

function PrepareSubmit() {
    if (click) {
        $form = $('#form-ads');
        if ($form.find('select[name="select-category"]').val() == -1) {
            alert("Bạn chưa chọn sản phẩm!");
            $('.require-field').show();
            $form.find('select[name="select-category"]').focus();
            $('#post-ads').removeAttr('disabled');
            return false;
        }

        if ($form.find('select[name="select-location"]').val() == -1) {
            alert("Bạn chưa chọn Tỉnh/Thành!");
            $('.require-field').show();
            $form.find('select[name="select-location"]').focus();
            $('#post-ads').removeAttr('disabled');
            return false;
        }

        if ($.trim($form.find('input[name="title"]').val()) == '') {
            alert("Bạn vui lòng điền đầy đủ thông tin cần thiết");
            $('.require-field').show();
            $form.find('input[name="title"]').focus();
            $('#post-ads').removeAttr('disabled');
            return false;
        }

        if ($.trim($form.find('input[name="price"]').val()) == '' || $.trim($form.find('input[name="price"]').val()).replace('/,/gi', '') <= 0) {
            alert("Bạn vui lòng điền đầy đủ thông tin cần thiết");
            $('.require-field').show();
            $form.find('input[name="price"]').focus();
            $('#post-ads').removeAttr('disabled');
            return false;
        }

        if ($form.find('input[name="content"]').val() == '') {
            alert("Bạn vui lòng điền đầy đủ thông tin cần thiết");
            $('.require-field').show();
            $form.find('input[name="content"]').focus();
            $('#post-ads').removeAttr('disabled');
            return false;
        }

        if ($.trim($form.find('input[name="nameCustomer"]').val()) == '') {
            alert("Bạn vui lòng điền đầy đủ thông tin cần thiết");
            $('.require-field').show();
            $form.find('input[name="nameCustomer"]').focus();
            $('#post-ads').removeAttr('disabled');
            return false;
        }

        if ($.trim($form.find('input[name="phone"]').val()) == '') {
            alert("Bạn vui lòng điền đầy đủ thông tin cần thiết");
            $('.require-field').show();
            $form.find('input[name="phone"]').focus();
            $('#post-ads').removeAttr('disabled');
            return false;
        }

        //if ($.trim($form.find('input[name="email"]').val()) == '') {
        //    alert("Bạn vui lòng điền đầy đủ thông tin cần thiết");
        //    $('.require-field').show();
        //    $form.find('input[name="email"]').focus();
        //    $('#post-ads').removeAttr('disabled');
        //    return false;
        //}

        if ($.trim($form.find('input[name="email"]').val()) != '') {
            if (!ValidateEmail($.trim($form.find('input[name="email"]').val()))) {
                alert("Email không hợp lệ!");
                $('#post-ads').removeAttr('disabled');
                return false;
            }
        }

        $('#thumbnail li').find("img").each(function () {
            if (fileUpload != "") fileUpload += ";";
            fileUpload += $(this).attr("name");
        });
        $('#lUpimage').val(fileUpload);
        return true;
    }
}
/**
 *-------------------------- End functions for post new classifiedAds --------------------------/
**/


/**
 *-------------------------- Some function to validate input --------------------------/
**/
// !!!!! Validate an email
function ValidateEmail(input) {
    var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
    if (!emailRegex.test(input))
        return false;
    return true;
}
// !!!!! Validate an phone
function ValidatePhoneNumber(ctrl) {
    var control = document.getElementById(ctrl);
    var regEx = new RegExp(/^((09[0-9]{8})|(01[0-9]{9}))$/);

    if (control != null) {
        var str = control.value;

        if (regEx.test(str.trim())) {
            return false;
        }
    }

    return true;
}
// !!!!! Validate input Number
function ValidateAndFormatNumber(NumberTextBox) {
    var min = 0;
    max = 999999999;
    if (NumberTextBox.value == "") return;

    UnFormatNumber(NumberTextBox);

    var IsFound = /^-?\d+\.{0,1}\d*$/.test(NumberTextBox.value);
    if (!IsFound) {
        //alert("Not a number");
        //NumberTextBox.value = FormatNumbers(min,min,max);
        NumberTextBox.focus();
        NumberTextBox.select();
        return;
    }

    if (isNaN(parseFloat(NumberTextBox.value))) {
        //alert("Number exceeding float range");
        //NumberTextBox.value = FormatNumbers(max,min,max);
        NumberTextBox.focus();
        NumberTextBox.select();
    }
    NumberTextBox.value = FormatNumbers(NumberTextBox.value, min, max);
    //return FormatNumbers(NumberTextBox.value, min, max);
    //    NumberTextBox.value = FormatNumbers(NumberTextBox.value,2,',','.','','','-','',min,max);
}

// !!!!!! Format numbers with commas
function FormatNumbers(fnum, min, max) {
    if (fnum < min)
        fnum = min.toString();
    if (fnum > max)
        fnum = max.toString();
    var orgfnum = fnum;
    var flagneg = false;

    //    if (fnum.charAt(0) == "-") {
    //        flagneg = false;
    //        fnum = fnum.substr(1, fnum.length - 1);
    //    }    
    psplit = fnum.split(".");

    var cnum = psplit[0],
        parr = [],
        j = cnum.length,
        m = Math.floor(j / 3),
        n = cnum.length % 3 || 3;

    // break the number into chunks of 3 digits; first chunk may be less than 3
    for (var i = 0; i < j; i += n) {
        if (i != 0) { n = 3; }
        parr[parr.length] = cnum.substr(i, n);
        m -= 1;
    }

    // put chunks back together, separated by comma
    fnum = parr.join(",");

    // add the precision back in
    //if (psplit[1]) {fnum += "." + psplit[1];}
    if (orgfnum.indexOf(".") != -1) {
        fnum += "." + psplit[1];
    }

    if (flagneg == true) {
        fnum = "-" + fnum;
    }

    return fnum;
}

// !!!!!! Replace commas
function UnFormatNumber(obj) {
    if (obj.value == "") return;

    obj.value = obj.value.replace(/,/gi, "");
}

// !!!!!! Suggest Search Home page
var strPathCatImg = 'http://cdn.thegioididong.com/category/';
var strPathProImg = 'http://cdn.thegioididong.com/products/images/';
var strPathManuImg = 'http://cdn.thegioididong.com/brand/'
function SuggestSearch(e) {
    if (e.which == 40) {
        if ($('#SuggestSearch div.search-suggestion ul li.selected').length == 0) {
            $('#SuggestSearch div.search-suggestion ul li.li-item:first').addClass('selected');
            $('#search-keyword').val($('#SuggestSearch div.search-suggestion ul li.selected:first a.clearfix div.content div.name').text());
        }
        else {
            var t = $('#SuggestSearch div.search-suggestion ul li.selected').next();
            if (t.hasClass('li-group'))
                t = t.next();
            $('#SuggestSearch div.search-suggestion ul li.selected').removeClass('selected');
            t.addClass('selected');
            $('#search-keyword').val(t.find('a.clearfix div.content div.name').text());
        }
        return;
    }
    else if (e.which == 38) {
        if ($('#SuggestSearch div.search-suggestion ul li.selected').length == 0) {
            $('#SuggestSearch div.search-suggestion ul li.li-item:last').addClass('selected');
            $('#search-keyword').val($('#SuggestSearch div.search-suggestion ul li.selected:last a.clearfix div.content div.name').text());
        }
        else {
            var t = $('#SuggestSearch div.search-suggestion ul li.selected').prev();
            if (t.hasClass('li-group'))
                t = t.prev();
            $('#SuggestSearch div.search-suggestion ul li.selected').removeClass('selected');
            t.addClass('selected');
            if (t.find('a.clearfix div.content div.name').text() == '')
                $('#search-keyword').val(t.find('a.clearfix').text());
            else
                $('#search-keyword').val(t.find('a.clearfix div.content div.name').text());
        }
        return;
    }

    var kw = $('#search-keyword').val().replace(/:|;|!|@@|#|\$|%|\^|&|\*|'|"|>|<|,|\.|\?|\/|`|~|\+|=|_|\(|\)|{|}|\[|\]|\\|\|/gi, '');
    var kwt = kw.trim().toLowerCase();
    if (kwt.length < 1) {
        $('#SuggestSearch').hide();
        return;
    }
    $.ajax({
        url: '/tim-kiem/aj/SuggestSearch',
        type: 'GET',
        data: { Key: kwt },
        dataType: 'json',
        cache: true,
        success: function (d) {
            if (d == null) {
                $('#SuggestSearch').hide();
                return;
            }
            d = d.i;
            var rl = d.length;
            var html = '';
            var lpros = '';
            var lmanu = '';
            var lcat = '';
            var catetrack = {};
            html += '<div class="search-suggestion clearfix">';
            html += '<ul class="suggestion-list with-image nolist clearfix">';
            for (var j = 0; j < rl; j++) {
                if (d[j][8] == '1') {
                    lpros += '<li class="li-item">';
                    lpros += '<a href="' + d[j][7] + '" class="clearfix">';
                    lpros += '<div class="img">';
                    lpros += '<img src="' + strPathProImg + d[j][0] + '/' + d[j][3] + '/' + d[j][5] + '" title="' + d[j][4] + '">';
                    lpros += '</div>';
                    lpros += '<div class="content">';
                    lpros += '<div class="name">' + d[j][4] + '</div>';
                    if (d[j][6].toString() != "0") {
                        lpros += '<div class="price">' + d[j][6] + '₫</div>';
                    }
                    else {
                        lpros += '<div class="price"></div>';
                    }
                    lpros += '<div class="note">' + d[j][9] + '</div>';
                    lpros += '</div>';
                    lpros += '</a>';
                    lpros += '</li>';

                }
            }
            if (lpros != '')
                html += lpros;
            html += '</ul>';
            html += '</div>';
            $('#SuggestSearch').html(html);
            $('#SuggestSearch').show();
        }
    })
}

// !!!!!! Submit Search Form
function submitSearchForm() {
    var kw = $('#search-keyword').val().replace(/:|;|!|@|@@|#|\$|%|\^|&|\*|'|"|>|<|,|\?|\/|`|~|=|_|\(|\)|{|}|\[|\]|\\|\|/gi, '');
    $(this).val(kw);
    var kwt = kw.trim().toLowerCase();
    if (kwt != '' & kwt.length >= 2) {
        if (searchpage === undefined) {
            window.location = '/tim-kiem?key=' + encodeURIComponent(kwt);
            return false;
        }
        else if (searchpage == 1) {
            window.location = '/tim-kiem?key=' + encodeURIComponent(kwt);
            return false;
        }
        else if (searchpage == 2) {
            window.location = '/tim-kiem-rao-vat?key=' + encodeURIComponent(kwt);
            return false;
        }
        else if (searchpage == 3) {
            window.location = '/tim-kiem-tin-tuc?key=' + encodeURIComponent(kwt);
            return false;
        }
        else if (searchpage == 4) {
            window.location = '/tim-kiem-sim-so?key=' + encodeURIComponent(kwt);
            return false;
        }
        else if (searchpage == 5) {
            window.location = '/tim-kiem-sieu-thi?key=' + encodeURIComponent(kwt);
            return false;
        }
        else {
            window.location = '/tim-kiem?key=' + encodeURIComponent(kwt);
            return false;
        }
    }
    return false;
}

// !!!!!! Suggest Province Home page 
function SuggestProvince(e) {
    if (e.which == 40) {
        if ($('#location-suggestion-wrapper ul li.selected').length == 0) {
            $('#location-suggestion-wrapper ul li.p-item:first').addClass('selected');
            $('#localtion-search').val($('#location-suggestion-wrapper ul li.p-item:first a').text());
        }
        else {
            var t = $('#location-suggestion-wrapper ul li.selected').next();
            $('#location-suggestion-wrapper ul li').removeClass('selected');
            t.addClass('selected');
            $('#localtion-search').val(t.find('a').text());
        }
        return;
    }
    else if (e.which == 38) {
        if ($('#location-suggestion-wrapper ul li.selected').length == 0) {
            $('#location-suggestion-wrapper ul li.p-item:last').addClass('selected');
            $('#localtion-search').val($('#location-suggestion-wrapper ul li.p-item:last a').text());
        }
        else {
            var t = $('#location-suggestion-wrapper ul li.selected').prev();
            $('#location-suggestion-wrapper ul li.selected').removeClass('selected');
            t.addClass('selected');
            $('#localtion-search').val(t.find('a').text());
        }
        return;
    }

    var kw = $('#localtion-search').val().replace(/:|;|!|@@|#|\$|%|\^|&|\*|'|"|>|<|,|\.|\?|\/|`|~|\+|=|_|\(|\)|{|}|\[|\]|\\|\|/gi, '');
    var kwt = kw.trim();

    $.ajax({
        url: '/aj/Common/SuggestProvince',
        type: 'GET',
        data: { keyword: kwt },
        cache: false,
        dataType: "html",
        success: function (d) {
            if (d == null || d == '') {
                $('#location-suggestion-wrapper').hide();
                return;
            }
            var html = '<ul class="location-list nolist clearfix" id="location-list">';
            html += d;
            html += '</ul>';
            $('#location-suggestion-wrapper').html('');
            $('#location-suggestion-wrapper').html(html);
            $('#location-suggestion-wrapper').show();
        },
        error: function (xmlHttpRequest) {
            if (xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0)
                return;
            else {

            }
        }
    })
}

// !!!!!! Subscribe
$('#frmNewsletterSubscribeFT').live('submit', function (e) {
    var $form = $(this);
    ajaxPostForm($form, e,
        function () {
            $('#QO-Frm').remove();
            $('.loading').show();
        },
        function (data) {
            $('.loading').hide();
            $('#QO-Frm').remove();
            if (data == null || data == '0') {
                window.location.href = '/subscribe';
            }
            else {
                alert('Bạn đã đăng ký nhận tin khuyến mãi thành công.');
            }
        });
});
/*==================================*/
/*ContactUs*/
/*==================================*/
function ReportSupport() {
    debugger;
    //$("#img_process").removeClass("temp_processing_img");
    //$("#img_process").addClass("processing_img");
    var name = document.getElementById("fullname");
    var email = document.getElementById("email");
    var dllsubject = document.getElementById("topic-filter");
    var sub = dllsubject.value;
    var mobile = document.getElementById("tel");
    var title = document.getElementById("title");
    var message = document.getElementById("message");
    if (sub == "-1") {
        alert("Vui lòng chọn chủ đề !");
        return false;
    }
    if (title.value == "") {
        alert("Vui lòng nhập tiêu đề !");
        title.focus();
        return false;
    }
    if (message.value == "") {
        alert("Vui lòng nhập dội dung !");
        message.focus();
        return false;
    }
    if (name.value == "") {
        alert("Vui lòng nhập họ tên !");
        name.focus();
        return false;
    }
    if (email.value != "") {
        if (!ValidateEmail(email.value)) {
            alert("Email không hợp lệ !");
            email.focus();
            return false;
        }
    }
    if (mobile.value != "") {
        if (!ValidatePhoneNumber(mobile.value)) {
            alert("Số điện thoại không hợp lệ !");
            mobile.focus();
            return false;
        }
    }
    var Title = $('#topic-filter option:selected').text().replace(/\n/gi, '').replace(/\r/gi, '');
    $.ajax({
        url: "/aj/Other/SendMailSupport",
        type: 'GET',
        data: { name: name.value, email: email.value, _context: message.value, mobile: mobile.value, title: Title + " - " + title.value },
        cache: false,
        beforeSend: function () {
            $("#submit").attr('disabled', 'disabled');

            BeforeSendAjax();
        },
        success: function (data) {
            dllsubject.value = "-1";
            mobile.value = "";
            name.value = "";
            Title = "";
            email.value = "";
            title.value = "";
            message.value = "";
            alert('Đã gửi thông tin thành công!');
            $('#dlding').fadeOut(1000);
            $("#submit").removeAttr('disabled');
        },
        error: function (e) {
            $('#dlding').fadeOut(1000);
            $("#submit").removeAttr('disabled');
            alert('Xảy ra lỗi, vui lòng thử lại sau!');
            return;
        }
    })

    return true;
}

// set cookie
function CreateCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    //var c_value = escape(value) + ((exdays == null) ? "" : "; visited=true; domain=.tgdd2013.com; path=/; expires=" + exdate.toUTCString() + ";");
    var c_value = escape(value) + ((exdays == null) ? "" : "; visited=true; domain=.thegioididong.com; path=/; expires=" + exdate.toUTCString() + ";");
    document.cookie = c_name + "=" + c_value;
}

// get cookie
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

// delete cookie
function Delete_Cookie(name, path, domain) {
    if (getCookie(name))
        document.cookie = name + "=" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") +
                                        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

function GetAllFormData($f) {
    var dataElement = {};
    $f.find('input[type=text], input[type=password], input[type=radio]:checked, input[type=hidden], textarea').each(function () {
        dataElement[$(this).attr('name')] = $(this).val();
    });
    $f.find('input[type=checkbox]').each(function () {
        dataElement[$(this).attr('name')] = $(this).attr('checked') == 'checked' ? true : false;
    });
    $f.find('select').each(function () {
        dataElement[$(this).attr('name')] = $(this).val();
        dataElement[$(this).attr('name') + 'text'] = $(this).find('option:selected').text();
    });
    var dataAttach = {};
    $f.find('input[type=text], input[type=password], input[type=radio]:checked, input[type=hidden], textarea, select option:selected').each(function () {
        dataAttach = $.extend({}, dataAttach, $(this).data());
    });
    var dataReturn = $.extend({}, dataElement, dataAttach);
    return dataReturn;
}

var SUBMIT_FOOTER_SUBSCRIBE_FLAG = true;
function SubmitFooterSubscribe() {
    $('.subscribe-form').removeAttr('style');
    $('.subscribe-form .justadd').remove();
    if (!SUBMIT_FOOTER_SUBSCRIBE_FLAG)
        return;
    SUBMIT_FOOTER_SUBSCRIBE_FLAG = false;
    var data = GetAllFormData($('#frmFooterSubscribe'))
    POSTAjax('/aj/Common/SubmitFooterSubscirbe', data, BeforeSendAjax, function (e) {
        if (e != null || e != '') {
            if (e.status == 1) {
                var html = '<div class="justadd">Cảm ơn bạn đã đăng ký. Chúng tôi sẽ sớm gửi những điều bất ngờ đến cho bạn.</div>';
                $('.subscribe-form').replaceWith(html);
            }
            else if (e.status == -1) {
                var html = '<ul class="justadd">';
                for (var i in e.errors) {
                    html += '<li>';
                    html += e.errors[i];
                    html += '</li>';
                }
                $('.subscribe-form').append(html).css('height', 'auto');
            }
            else {
                var html = '<div class="justadd">Chức năng đang được bảo trì, vui lòng thử lại sau</div>';
                $('.subscribe-form').append(html).css('height', 'auto');
            }
        }
        $('#dlding').fadeOut(1000);
        SUBMIT_FOOTER_SUBSCRIBE_FLAG = true;
    }, ErrorAjax, true);
}

var GET_LOCATION_FLAG = true;
function _get_location()
{
    if (GET_LOCATION_FLAG) {
        GET_LOCATION_FLAG = false;
        $.ajax({
            url: '/aj/Common/GetLocation/',
            type: 'GET',
            cache: true,
            dataType: 'html',
            beforeSend: function () {
                $('.loader').show();
            },
            success: function (e) {
                GET_LOCATION_FLAG = true;
                if (e != "")
                {
                    var _pn = $(e)[1].innerHTML;
                    var _d = $(e).find('> li');
                    $('#location-list').html(_d);
                    $('#location-name-p').text(_pn);
                    $('#location-view-info').text(_pn);
                    $('.loader').hide();
                }
            },
            error: function () {
                $('.loader').hide();
            }
        })
    }
}
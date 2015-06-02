function openpage_noresize(pageurl, pagename, pagewidth, pageheight) {
    var attr;
    attr = "width=" + pagewidth + ",height=" + pageheight + ",scrollbars=no,status=no,title=yes,toolbars=no,resizable=no"
    window.open(pageurl, pagename, attr);
}
function openpage_noresize2(pageurl, pagename, pagewidth, pageheight) {
    var attr;
    attr = "width=" + pagewidth + ",height=" + pageheight + ",scrollbars=yes,status=no,title=yes,toolbars=no,resizable=no"
    window.open(pageurl, pagename, attr);
}
function submitVote(sform, intVote_id, intShowResult, intMultiChoice) {

    window.document.formWebsite.VoteItem.value = '';
    for (i = 0; i < window.document.formWebsite.elements.length - 1; i++) {        
        if (window.document.formWebsite.elements[i].checked)
            window.document.formWebsite.VoteItem.value = window.document.formWebsite.VoteItem.value + ',' + window.document.formWebsite.elements[i].value;
    }
    openpage_noresize('http://www.dangcapviet/vi-vn/vote.aspx?vote_id=' + intVote_id + '&action=1' + '&itemlist=' + window.document.formWebsite.VoteItem.value + '&mulcho=' + intMultiChoice, 'itemvote', '520', '310');

}

function doSubmit(btnName, e) {
    var key;
    if (window.event)
        key = window.event.keyCode;
    else
        key = e.which;
    if (key == 13) {
        //Get the button the user wants to have clicked
        var btn = document.getElementById(btnName);
        if (btn != null) { //If we find the button click it
            btn.click();
            //alert("Đổi mật khẩu thành công!");
            event.keyCode = 0;
        }
    }
}

function getthedate() {
    var dayarray = new Array("Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy");
    var montharray = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    var mydate = new Date();
    var year = mydate.getYear();
    if (year < 1000)
        year += 1900;
    var day = mydate.getDay();
    var month = mydate.getMonth();
    var daym = mydate.getDate();
    if (daym < 10)
        daym = "0" + daym;
    var hours = mydate.getHours();
    var minutes = mydate.getMinutes();
    var seconds = mydate.getSeconds();
    var dn = "AM";
    if (hours >= 12)
        dn = "PM";
    if (hours > 12) {
        hours = hours - 12;
    }
    if (hours == 0)
        hours = 12;
    if (minutes <= 9)
        minutes = "0" + minutes;
    if (seconds <= 9)
        seconds = "0" + seconds;
    //change font size here
    var cdate = dayarray[day] + ", " + daym + "-" + montharray[month] + "-" + year + ", " + hours + ":" + minutes + ":" + seconds + " " + dn;
    if (document.all)
        document.all.clock.innerHTML = cdate;
    else if (document.getElementById)
        document.getElementById("clock").innerHTML = cdate;
}

function formatNumeric(num) {
    num = repStr(num.toString());
    if (isNaN(num)) {
        num = "0";
    }
    return (num);
}
function repStr(str) {
    var strResult = "";
    for (i = 0; i < str.length; i++)
        if ((str.charAt(i) != "$") && (str.charAt(i) != ",")) {
            strResult = strResult + str.charAt(i)
        }
    return strResult;
}

function RemoveUnicode(obj) {
    var str;
    if (eval(obj))
        str = eval(obj).value;
    else
        str = obj;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    /*thay the 1 so ky tu dat biet*/
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|-+|–|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\“|\”|\&|\#|\[|\]|~|$|_/g, " ");
    /**/
    //str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/\s+/g, "-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-  
    str = str.replace(/^\-+|\-+$/g, "");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi 
    //eval(obj).value = str.toUpperCase();
    return str;
}

function RemoveUnicodeToNull(obj) {
    var str;
    if (eval(obj))
        str = eval(obj).value;
    else
        str = obj;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|-+|–|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\“|\”|\&|\#|\[|\]|~|$|_/g, " ");
    str = str.replace(/\s+/g, "");
    return str;
}

function ParseUrl(objsent, objreceive) {
    objreceive.value = RemoveUnicode(objsent);
}

function ParseUserName(objsent) {
    objsent.value = RemoveUnicodeToNull(objsent);
}

function mask(str, textbox, loc, delim) {
    var locs = loc.split(',');
    for (var i = 0; i <= locs.length; i++) {
        for (var k = 0; k <= str.length; k++) {
            if (k == locs[i]) {
                if (str.substring(k, k + 1) != delim) {
                    str = str.substring(0, k) + delim + str.substring(k, str.length)
                }
            }
        }
    }

    textbox.value = str
}

function formatNumeric(num) {
    num = repStr(num.toString());
    if (isNaN(num)) {
        num = "0";
    }
    return (num);
}

function repStr(str) {
    var strResult = "";
    for (i = 0; i < str.length; i++)
        if ((str.charAt(i) != "$") && (str.charAt(i) != ",")) {
            strResult = strResult + str.charAt(i)
        }
    return strResult;
}

function isEmail(strEmail) {
    var intlen;
    var ctmp;
    strEmail = trim(strEmail);
    if (strEmail == '') return false;
    intlen = strEmail.length;
    if (intlen < 5) return false;
    if (strEmail.indexOf('@') == -1) return false;
    if (strEmail.indexOf('.') == -1) return false;
    if (intlen - strEmail.lastIndexOf('.') - 1 > 3) return false;
    if ((strEmail.indexOf("_") != -1) && (strEmail.lastIndexOf("_") > strEmail.lastIndexOf("@"))) return false;
    if (strEmail.lastIndexOf(".") <= strEmail.lastIndexOf("@") + 1) return false;
    if (strEmail.indexOf("@") != strEmail.lastIndexOf("@")) return false;
    if (intlen - 1 == strEmail.lastIndexOf('.')) return false;
    if (strEmail.charAt(strEmail.indexOf('@') + 1) == '.') return false;
    if (strEmail.indexOf(" ") != -1) return false;
    if (strEmail.indexOf("..") != -1) return false;

    strEmail = strEmail.toLowerCase();
    for (intcnt = 0; intcnt < intlen; intcnt++) {
        ctmp = strEmail.charAt(intcnt)
        if ((!isDigit(ctmp)) && ((ctmp > 'z') || (ctmp < 'a')) && (ctmp != '-') && (ctmp != '.') && (ctmp != '@') && (ctmp != '_')) return false;
    }
    return true;
}


function trim(text) {
    pos1 = 0;
    pos2 = text.length - 1;
    for (i = 0; i <= text.length - 1; i++)
        if (text.substr(i, 1) == " ") pos1 = i;
        else break;
    for (i = length - 1; i >= 0; i--)
        if (text.substr(i, 1) == " ") pos2 = i;
        else break;
    if (pos2 < pos1) return ""
    return text.substr(pos1, pos2 - pos1)
}

function trimstring(strin) {
    var strtemp;
    var i, j;
    strtemp = "";
    i = 0;

    while (strin.charAt(i) == " ") {
        i++;
    }

    for (var j = i; j < strin.length - 1; j++) {
        if (strin.charAt(j) == " ") {
            if (strin.charAt(j + 1) == " ") {
                strtemp = strtemp + strin.charAt(j);
            }
            else {
                strtemp = strtemp + strin.charAt(j);
            }
        }
        else { strtemp = strtemp + strin.charAt(j) }
    }

    if (strin.charAt(j) != " ") {
        strtemp = strtemp + strin.charAt(j);
    }
    return strtemp;
}

function trimfullstring(strin) {
    var strtemp
    strtemp = ""
    for (var i = 0; i < strin.length; i++)
        if (strin.charAt(i) != " ") { strtemp = strtemp + strin.charAt(i) }
    return strtemp;
}

function isDigit(c) {
    if ((c == '0') || (c == '1') || (c == '2') || (c == '3') || (c == '4') || (c == '5') || (c == '6') || (c == '7') || (c == '8') || (c == '9'))
        return true;
    else
        return false;
}

function number_format(number, decimals, dec_point, thousands_sep) {
    // * example 1: number_format(1234.5678, 2, '.', '');
    // * returns 1: 1234.57

    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point == undefined ? "," : dec_point;
    var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function auto_currency(id) {
    var variable = document.getElementById(id);
    var new_value = variable.value.replace(/\,/g, "");
    variable.style.textAlign = "right";
    variable.value = digit_grouping(new_value);
}

var increase;
increase = function (obj) {
    var value = parseInt($(obj).val());
    $(obj).val(value + 1);
}

var decrease;
decrease = function (obj) {
    var value = parseInt($(obj).val());
    if (value > 1)
        $(obj).val(value - 1);
}

$(document).ready(function () {
    $('.quanti').blur(function () {
        var value = parseInt($(this).val());
        if (isNaN(value))
            $(this).val(1);
    });

    $('.quanti').keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 13 || event.keyCode == 16 || event.keyCode == 36 || event.keyCode == 35) {
            if (event.keyCode == 13) {
                localiza_cep(this.value);
            }
        } else {
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
});


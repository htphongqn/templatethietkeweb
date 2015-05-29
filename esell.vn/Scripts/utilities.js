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

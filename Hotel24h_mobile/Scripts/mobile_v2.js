$(function () {
// Global functions	
$.G_getTransition = function () {
if (navigator.userAgent.toLowerCase().indexOf("android 2") >= 0) {
return "none";
} else {
return "slide";
}
}

$.G_initTransition = function (parent) {
var loadedTran = $(parent).attr("loaded-transition");
if (typeof loadedTran !== "undefined") {
return;
}

// set transition
var myE = $(parent).find('a[data-transition]');
myE.attr("data-transition", $.G_getTransition());

// mark loaded transition
$(parent).attr("loaded-transition", 1);
}

$.G_changePage = function (opt) {
$.mobile.changePage(opt.page, {
transition: $.G_getTransition(),
reverse: opt.reverse
});
}

$.G_changePage2NoHistory = function (opt) {
$.mobile.changePage(opt.page, {
transition: $.G_getTransition(),
reverse: opt.reverse,
changeHash: false
});
}

$.G_loadPage = function (url) {
document.location.href = url;
}

$.G_loadHomePage = function () {
document.location.href="/"; //M/Mobile_v2/Default_v2.aspx
}

$.G_goBack = function () {
if (document.referrer != '') {
document.location.href = document.referrer;
} else {
window.history.back();
}
}

$.G_toDateShortYMD = function (date) {
return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
}

$.G_toDateShortDMY = function (date) {
var month = (date.getMonth() + 1);
if (month < 10) {
month = "0" + month;
}
var day = date.getDate();
if (day < 10) {
day = "0" + day;
}
return day + '/' + month + '/' + date.getFullYear();
}

$.G_setOptionValue = function (selectObject, value) {
$(selectObject).val(value).selectmenu('refresh');
}

$.G_setCookieSearchObject = function (searchObject) {
$.cookie('searchObject.cityId', searchObject.cityId, { path: '/' });
$.cookie('searchObject.cityName', searchObject.cityName, { path: '/' });
$.cookie('searchObject.numberOfCustomer', searchObject.numberOfCustomer, { path: '/' });
$.cookie('searchObject.numberOfRoom', searchObject.numberOfRoom, { path: '/' });
$.cookie('searchObject.checkinDate', searchObject.checkinDate, { path: '/' });
$.cookie('searchObject.checkoutDate', searchObject.checkoutDate, { path: '/' });

// notify has update data
$.G_setCookieSearchObjectHasUpdate(1);
}

$.G_setCookieSearchObjectCheckinDate = function (checkinDate) {
$.cookie('searchObject.checkinDate', checkinDate, { path: '/' });
$.cookie('searchObject.toCheckinDateShort', $.G_toDateShortYMD(checkinDate), { path: '/' });
}

$.G_setCookieSearchObjectCheckoutDate = function (checkoutDate) {
$.cookie('searchObject.checkoutDate', checkoutDate, { path: '/' });
$.cookie('searchObject.toCheckoutDateShort', $.G_toDateShortYMD(checkoutDate), { path: '/' });
}

$.G_setCookieSearchObjectHasUpdate = function (vl) {
$.cookie('searchObject.HasUpdate', vl, { path: '/' });
}

$.G_getCookieSearchObjectCityId = function () {
if ($.cookie('searchObject.cityId') != null) {
return $.cookie('searchObject.cityId');
}
return null;
}

$.G_getCookieSearchObjectCityName = function () {
if ($.cookie('searchObject.cityName') != null) {
return $.cookie('searchObject.cityName');
}
return null;
}

$.G_getCookieSearchObjectNumberOfCustomer = function () {
if ($.cookie('searchObject.numberOfCustomer') != null) {
return $.cookie('searchObject.numberOfCustomer');
}
return null;
}

$.G_getCookieSearchObjectNumberOfRoom = function () {
if ($.cookie('searchObject.numberOfRoom') != null) {
return $.cookie('searchObject.numberOfRoom');
}
return null;
}

$.G_getCookieSearchObjectCheckinDate = function () {
if ($.cookie('searchObject.checkinDate') != null) {
return new Date($.cookie('searchObject.checkinDate'));
}
return null;
}

$.G_getCookieSearchObjectCheckoutDate = function () {
if ($.cookie('searchObject.checkoutDate') != null) {
return new Date($.cookie('searchObject.checkoutDate'));
}
return null;
}

$.G_getCookieSearchObjectHasUpdate = function () {
if ($.cookie('searchObject.HasUpdate') != null) {
return $.cookie('searchObject.HasUpdate');
}
return null;
}

// bind transition
$.G_initTransition("#search-selection-page");
$(document).on('pagebeforeshow', 'div[data-role="page"]', function () {
// next load for other pages when change page
$.G_initTransition(this);
});
// end bind transition

// bind 'Giao dien day du' menu link
$.G_loadFullSizeLink = function (href) {
if (href.length > 0) {
$("a.lnkFullSize").prop("href", href).parents("li").show();
} else {
if ($('link[rel="canonical"]').length > 0) {
$("a.lnkFullSize").prop("href", $('link[rel="canonical"]').attr('href')).parents("li").show();
} else {
$("a.lnkFullSize").parents("li").hide();
}
}
}
$.G_loadFullSizeLink('');

$(document).on('click', 'a.lnkFullSize', function (e) {
e.preventDefault();
$.ajax({
url: "/M/Mobile_v2/WebServices/WebServices.asmx/SetStopMobileCookie",
context: document.body,
dataType: "json",
type: "POST",
contentType: "application/json; charset=utf-8"
}).done(function () {
window.location.href = $("a.lnkFullSize").attr('href');
});
});
// end bind 'Giao dien day du' menu link

// back button
$(document).on('click', 'a.back-button-mv2-header-v3', function (e) {
e.preventDefault();
$.G_goBack();
});
// end back button
});
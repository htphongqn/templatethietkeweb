$(function () {

// update global checkin date ------------------ 27-11-2013 (ADDED)
function updateGlobalCheckinDate(checkInDate) {
if (typeof $.G_setCookieSearchObjectCheckinDate === "undefined") return;

// because the global checkin date use format date: YMD, we need to convert the current date (DMY)
var checkinDateArr = checkInDate.split('/');
$.G_setCookieSearchObjectCheckinDate(new Date(checkinDateArr[2] + "/" + checkinDateArr[1] + "/" + checkinDateArr[0]));

// update global checkout date
var checkinDate = $.G_getCookieSearchObjectCheckinDate();
var checkoutDate = $.G_getCookieSearchObjectCheckoutDate();

if (checkoutDate == null) {
checkoutDate = checkinDate;
}
if (new Date($.G_toDateShortYMD(checkinDate)) >= new Date($.G_toDateShortYMD(checkoutDate))) {
var d = new Date(checkinDate);
d.setDate(d.getDate() + 1);
$.G_setCookieSearchObjectCheckoutDate(d);
}
}

function bindGlobalCheckinDate() {
// update if global changes
if (typeof $.G_getCookieSearchObjectHasUpdate === "undefined") return;
if ($.G_getCookieSearchObjectHasUpdate() == 1) {
$.cookie('CheckInDate', $.G_toDateShortDMY($.G_getCookieSearchObjectCheckinDate()), { path: '/' });
$.G_setCookieSearchObjectHasUpdate(0);
}
// set selected value    
$.G_setOptionValue('#txtRooms', $.G_getCookieSearchObjectNumberOfRoom());
}
bindGlobalCheckinDate();
// /end update global checkin date -------------- 27-11-2013 (ADDED)

$("#txtSubmit").on("click", function (e) {
e.preventDefault();

$("#txtCustomerName, #txtMobile, #txtEmail").closest('div').removeClass("ui-state-highlight");
$("div.divCustomerNameError, div.divMobileError, div.divEmailError").hide();
var isValid = true;

var Email = $.trim($("#txtEmail").val());
if (!IsValid_Email(Email)) {
$("#txtEmail").closest('div').addClass("ui-state-highlight").focus();
$("div.divEmailError").show();
isValid = false;
}
var Phone = $.trim($("#txtMobile").val());
if (!IsValid_Phone(Phone) || Phone.length == 0) {
$("#txtMobile").closest('div').addClass("ui-state-highlight").focus();
$("div.divMobileError").show();
isValid = false;
}
var CustomerName = $.trim($("#txtCustomerName").val());
if (CustomerName.length == 0) {
$("#txtCustomerName").closest('div').addClass("ui-state-highlight").focus();
$("div.divCustomerNameError").show();
isValid = false;
}
var CustomerNotes = $.trim($("#txtBookingNotes").val());

if (isValid) {
$("div.divDatPhongButton").hide();
$("div.divLoading").show();
// 1-dat binh thuong
var _url = "/M/Mobile_v2/WebServices/InquiryForm_v4.asmx/CreateReservation";
var _data = "{  'CheckIn': '" + SafeData($("#txtCheckIn option:selected").val()) + "'"
+ ",'Nights': '" + SafeData($("#txtNights option:selected").val()) + "'"
+ ",'Rooms':'" + SafeData($("#txtRooms option:selected").val()) + "'"
+ ",'Extrabeds':'" + SafeData($("#txtExtraBeds option:selected").val()) + "'"
+ ",'CustomerName': '" + SafeData(CustomerName) + "'"
+ ",'Email': '" + SafeData(Email) + "'"
+ ",'Mobile': '" + SafeData(Phone) + "'"
+ ",'CustomerNotes': '" + SafeData(CustomerNotes) + "'"
+ ",'HotelIdInt': '" + SafeData($("#txtHotelIdInt").val()) + "'"
+ ",'TypeId': '" + SafeData($("#txtTypeId").val()) + "'"
+ ",'ItemId': '" + SafeData($("#txtItemId").val()) + "'"
+ ",'ItemName': '" + SafeData($("span.spnItemName").text()) + "'"
+ ",'HotelId': '" + SafeData($("#txtHotelId").val()) + "'"
+ "}";

// 2-dat khuyen mai
if (SafeData($("#txtTypeId").val()) == "Promotion") {
_url = "/M/Mobile_v2/WebServices/InquiryForm_Promotion_v1.2.asmx/CreateReservation";
_data = "{'CustomerName': '" + SafeData(CustomerName) + "'"
+ ",'Email': '" + SafeData(Email) + "'"
+ ",'Phone': '" + SafeData(Phone) + "'"
+ ",'NumberOfRooms':'" + SafeData($("#txtRooms option:selected").val()) + "'"
+ ",'CheckIn': '" + SafeData($("#txtCheckIn option:selected").val()) + "'"
+ ",'Nights': '" + SafeData($("#txtNights option:selected").val()) + "'"
+ ",'BookingNotes': '" + SafeData(CustomerNotes) + "'"
+ ",'HotelIdInt': '" + SafeData($("#txtHotelIdInt").val()) + "'"
+ ",'PromotionId': '" + SafeData($("#txtItemId").val()) + "'"
+ ",'PromotionName': '" + SafeData($("span.spnItemName").text()) + "'"
+ "}";
}

// 3-if price not available redirect to InquiryForm
if ($.SafeData($("#txtIsHotelEnabled").val()) == '0' || $.SafeData($("#txtItemId").val()) == '') {
// calculate checkout date number of nights
var ckinDateArr = SafeData($("#txtCheckIn option:selected").val()).split("/");
var ckoutDateTemp = new Date(ckinDateArr[2] + "/" + ckinDateArr[1] + "/" + ckinDateArr[0]);
ckoutDateTemp.setDate(ckoutDateTemp.getDate() + parseInt(SafeData($("#txtNights option:selected").val())));
var ckoutDate = $.G_toDateShortDMY(ckoutDateTemp);
// set to server
_url = "/M/Mobile_v2/WebServices/InquiryForm_Promotion_v1.2.asmx/InquiryForm_General";
_data = "{'CustomerName': '" + SafeData(CustomerName) + "'"
+ ",'Email': '" + SafeData(Email) + "'"
+ ",'Phone': '" + SafeData(Phone) + "'"
+ ",'NumberOfRooms':'" + SafeData($("#txtRooms option:selected").val()) + "'"
+ ",'CheckIn': '" + SafeData($("#txtCheckIn option:selected").val()) + "'"
+ ",'Nights': '" + SafeData($("#txtNights option:selected").val()) + "'"
+ ",'CustomerNotes': '" + SafeData(CustomerNotes) + "'"
+ ",'HotelId': '" + SafeData($("#txtHotelId").val()) + "'"
+ ",'HotelName': '" + $.SafeData($("#txtHotelName").val()) + "'"
+ "}";
}

//alert(_data);
$.ajax({
type: "POST",
url: _url,
data: _data,
contentType: "application/json; charset=utf-8",
dataType: "json",
success: function (html) {
if (html != "" && html.d != "Error") {
//alert(html.d);
var arrData = html.d.split('|');
window.location = "/M/Mobile_v2/ThankYou.aspx?ReservationNumber=" + arrData[0] + "&ReservationId=" + arrData[1];
} else {
alert("Error.");
$("div.divDatPhongButton").show();
$("div.divLoading").hide();
}
},
error: function () {
alert("Error...");
$("div.divDatPhongButton").show();
$("div.divLoading").hide();
}
});

// * set cookie again
$CheckInDate = SafeData($("#txtCheckIn option:selected").val());
$Nights = SafeData($("#txtNights option:selected").val());
$.cookie('CheckInDate', $CheckInDate, { path: '/' });
$.cookie('Nights', $Nights, { path: '/' });
// update global checkin date ------------------ 27-11-2013 (ADDED)
updateGlobalCheckinDate($CheckInDate);
// /end update global checkin date ------------- 27-11-2013 (ADDED
// * end set cookie again
}
});

// an giuong phu: neu dat phong khuyen mai hoac khong co gia
if ((SafeData($("#txtTypeId").val()) == "Promotion")
|| ($.SafeData($("#txtIsHotelEnabled").val()) == '0' || $.SafeData($("#txtItemId").val()) == '')) {
$(".divWrapperExtraBeds").hide();
} else {
$(".divWrapperExtraBeds").show();
}

function SafeData(_data) {
if (_data != undefined)
return $.trim(_data.replace(/\'/g, "\""));
else
return _data;
}
function IsValid_Email(emailAddress) {
var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
return pattern.test(emailAddress);
};
function IsValid_Phone(phone) {
var pattern = new RegExp(/^([0-9\(\)\/\+ \-]*)$/);
return pattern.test(phone);
};

$("a[href^='tel:']").on("click", function (e) {
var phoneNumber = $(this).attr("href");
_gaq.push(['_trackEvent', 'm.hotel24h.com', "Call phone number", phoneNumber]);
});


// ---------------------------------------------------------------------------------
$('a.lnkRoomTypePrice').click(function (e) {
e.preventDefault();
$link = $(this);
$RoomTypeItem = $link.parents('div.RoomTypeItem');
$DetailedRates = $('div#detailed-rates', $RoomTypeItem);
$IsFirstClick = $link.attr("isfirstclick");
if ($IsFirstClick == "true") {
$DiscountPercentageForMember = $('input.hdDiscountPercentageForMember').val();
$('table.detailed-rates td.tdDiscountPercentageForMember', $DetailedRates).each(function () {
$(this).html($DiscountPercentageForMember);
});
$link.attr('isfirstclick', 'false');
}

$DetailedRates.slideToggle(function () {
if ($link.attr('show') == 'true') {
$link.attr('show', 'false');
$link.text($link.attr('hidetext'));
} else {
$link.attr('show', 'true');
$link.text($link.attr('showtext'));
}
});
});

$('a.lnkRoomTypeInfo').click(function (e) {
e.preventDefault();
$link = $(this);
$RoomTypeItem = $link.parents('div.RoomTypeItem');
$HotelIdInt = $('input.hdHotelIdInt').val();
$RoomTypeId = $link.attr('RoomTypeId');
$RoomTypeInfos = $('div.RoomTypeInfos', $RoomTypeItem);
if ($RoomTypeInfos.length == 0) {
var _url = "/M/Mobile_v2/WebServices/ThongTinPhongKhachSan.aspx";
var _data = "HotelIdInt=" + $HotelIdInt;
$.ajax({
url: _url,
data: _data,
cache: false,
async: false,
success: function (html) {
$.BindDivThongTinKhachSan($.parseHTML(html));
},
error: function () {
alert('Error!!!');
}
});
}

$RoomTypeInfos = $('div.RoomTypeInfos', $RoomTypeItem);
if ($RoomTypeInfos.length > 0) {
$RoomTypeInfos.slideToggle(function () {
if ($link.attr('show') == 'true') {
$link.attr('show', 'false');
$link.text($link.attr('hidetext'));
} else {
$link.attr('show', 'true');
$link.text($link.attr('showtext'));
}
});
}
});

$.BindDivThongTinKhachSan = function ($html) {
$('div.RoomTypeItem').each(function () {
$RoomTypeId = $('input.hdItemId', $(this)).val();
$divRoomTypeInfo = $('div.RoomTypeInfos[RoomTypeId=' + $RoomTypeId + ']', $html);
$LinkRoomTypeInfo = $('a.lnkRoomTypeInfo', $(this));
$LinkRoomTypeInfo.after($divRoomTypeInfo);
});
};

// divListHotel CheckInDate and Nights
$SearchDate = $('div.SearchDate');
$.GetCookie = function () {
$CheckInDate = $.cookie('CheckInDate');
$Nights = $.cookie('Nights');
if ($CheckInDate) {
$('select.txtCheckInDate', $SearchDate).val($CheckInDate);
}
if ($Nights) {
$('select.txtNights', $SearchDate).val($Nights);
}
/* Set index for sort hotel */
$SortMethod = $.cookie('SortMethod');
if ($SortMethod) {
$('select.selectSortHotels', $SearchDate).val($SortMethod);
}
$('select', $SearchDate).selectmenu('refresh');
};
$.GetCookie();

$divListHotel = $('div.divListHotel');
$('input.btnSearch', $divListHotel).on('click', function (e) {
e.preventDefault();
$CheckInDate = $('select.txtCheckInDate', $divListHotel).val();
$Nights = $('select.txtNights', $divListHotel).val();
$CityTextId = $('input.hidCityTextId', $divListHotel).val();
$DiaDanhId = $('input.hidDiaDanhId', $divListHotel).val();
$SortMethod = $('select.selectSortHotels option:selected', $divListHotel).val();
var _url = "/M/Mobile_v2/WebServices/GetHotelItems.aspx";
var _data = "CityTextId=" + escape($CityTextId) + "&SortMethod=" + escape($SortMethod) + "&DiaDanhId=" + $DiaDanhId;

$.mobile.loading('show');
$("div#divHotels").empty();

$.ajax({
url: _url,
data: _data,
cache: false,
success: function (html) {
if (html.length > 0) {
if (html.indexOf('Error') == -1) {
$.cookie('CheckInDate', $CheckInDate, { path: '/' });
$.cookie('Nights', $Nights, { path: '/' });
$.cookie('SortMethod', $SortMethod, { path: '/' });
$("div#divHotels").html(html);
var count = $('table.tblHotels tr').length;
var html = $('h2.ItemHotels', $('div.content-primary')).html();
$('h2.ItemHotels', $('div.content-primary')).html(html.replace(/\d+/, count));
$.mobile.loading('hide')
} else {
alert('Error...!');
}
}
},
error: function () {
alert('Error...!');
}
});
})
// divListHotel CheckInDate and Nights - End	
// divViewHotelDetails CheckInDate and Nights
$divViewHotelDetails = $('div.divViewHotelDetails');
$('input.btnSearchDetail', $divViewHotelDetails).on('click', function (e) {
e.preventDefault();
// * set cookie khi xem gia
$CheckInDate = $('select.txtCheckInDate', $divViewHotelDetails).val();
$Nights = $('select.txtNights', $divViewHotelDetails).val();
$.cookie('CheckInDate', $CheckInDate, { path: '/' });
$.cookie('Nights', $Nights, { path: '/' });
// update global checkin date ------------------ 27-11-2013 (ADDED)
updateGlobalCheckinDate($CheckInDate);
// /end update global checkin date ------------- 27-11-2013 (ADDED)
// * end set cookie khi xem gia

// ap dat reload page
//window.location.reload(true);

document.forms[0].submit();

})
// divViewHotelDetails CheckInDate and Nights - End

$('a.bookHotelLink').click(function (e) {
// * set cookie khi click dat phong tu viewhoteldetail
$CheckInDate = $('select.txtCheckInDate', $divViewHotelDetails).val();
$Nights = $('select.txtNights', $divViewHotelDetails).val();
$.cookie('CheckInDate', $CheckInDate, { path: '/' });
$.cookie('Nights', $Nights, { path: '/' });
// update global checkin date ------------------ 27-11-2013 (ADDED)
updateGlobalCheckinDate($CheckInDate);
// /end update global checkin date ------------- 27-11-2013 (ADDED)
// * end set cookie khi click dat phong tu viewhoteldetail
});

// divViewSearchHotels
$(document).on('click', 'div.divViewSearchHotels input.btnSearchHotel', function (e) {
e.preventDefault();
var _SearchHotelKey = $.trim($('div.divViewSearchHotels input.txtSearchHotel').val());
if (_SearchHotelKey.length == 0) {
var offset = $(this).offset();
$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h4>Xin vui lòng nhập từ khóa...</h4></div>")
.css({ "color": "#2489CE", "display": "block", "padding": "0 10px", "opacity": 0.96, "top": (offset.top + 40) - $(window).scrollTop(), "left": offset.left })
.appendTo($.mobile.pageContainer)
.delay(2000)
.fadeOut(400, function () {
$(this).remove();
});
}
else {
window.location = '/M/Mobile_v2/TimKhachSan.aspx?Keyword=' + encodeURIComponent(_SearchHotelKey).replace(/\%20/g, '+');
}
})
// divViewSearchHotels - End

/* Set Default button on Enter - start */
$(document).bind("keydown", function (event) {
// track enter key
var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
if (keycode == 13) { // keycode for enter key
// force the 'Enter Key' to implicitly click the Update button
//alert(keycode);
$(':button, :submit').filter(function (i) {
if ($(this).hasClass('DefaultSubmitEnter')) {
return true;
}
}).trigger('click');
return false;
} else {
return true;
}
}); // end of function
/* Set Default button on Enter - end */
});
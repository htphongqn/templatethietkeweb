$(function () {

var searchObject = {
init: function () {
	// reassign previous selection from cookie
if (typeof $.G_getCookieSearchObjectCityId === "undefined") return;
if ($.G_getCookieSearchObjectCityId() != null) {
this.cityId = $.G_getCookieSearchObjectCityId();
}
if ($.G_getCookieSearchObjectCityName() != null) {
this.cityName = $.G_getCookieSearchObjectCityName();
}
if ($.G_getCookieSearchObjectCheckinDate() != null) {
this.checkinDate = $.G_getCookieSearchObjectCheckinDate();
}
if ($.G_getCookieSearchObjectCheckoutDate() != null) {
this.checkoutDate = $.G_getCookieSearchObjectCheckoutDate();
}
if ($.G_getCookieSearchObjectNumberOfCustomer() != null) {
this.numberOfCustomer = $.G_getCookieSearchObjectNumberOfCustomer();
}
if ($.G_getCookieSearchObjectNumberOfRoom() != null) {
this.numberOfRoom = $.G_getCookieSearchObjectNumberOfRoom();
}

// update cookie
if (this.toCheckinDateShort() == this.toCheckoutDateShort()) {
this.checkoutDate.setDate(this.checkoutDate.getDate() + 1);
}
},
cityId: 0,
cityName: "[Xin chọn thành phố]",
checkinDate: new Date(),
checkoutDate: new Date(),
numberOfCustomer: 1,
numberOfRoom: 1,
toCheckinDateShort: function () {
return $.G_toDateShortYMD(this.checkinDate);
},
toCheckoutDateShort: function () {
return $.G_toDateShortYMD(this.checkoutDate);
},
toCurrentDateShort: function () {
return $.G_toDateShortYMD(new Date());
}
};
searchObject.init();

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SearchSelection page
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
$(function () {
function bindData() {
// city-selection
if (searchObject.cityName !== '') {
$('#search-selection-page .city-section .text1 .subtext1').text(searchObject.cityName);
}
// date-selection
var dayArray = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
// day
$('#search-selection-page .date-section .check-in .day').text(dayArray[searchObject.checkinDate.getDay()]);
$('#search-selection-page .date-section .check-out .day').text(dayArray[searchObject.checkoutDate.getDay()]);
// month
$('#search-selection-page .date-section .check-in .month').text("T" + (searchObject.checkinDate.getMonth() + 1));
$('#search-selection-page .date-section .check-out .month').text("T" + (searchObject.checkoutDate.getMonth() + 1));
// date
$('#search-selection-page .date-section .check-in .date').text(searchObject.checkinDate.getDate());
$('#search-selection-page .date-section .check-out .date').text(searchObject.checkoutDate.getDate());
// customer-selection
$('#search-selection-page .customer-section .text1 label').text(searchObject.numberOfCustomer);
// room-selection
$('#search-selection-page .room-section .text1 label').text(searchObject.numberOfRoom);
}

// customer-selection
$("#search-selection-page .customer-section a[data-icon='minus']").click(function () {
searchObject.numberOfCustomer--;
$('#search-selection-page .customer-section .text1 label').text(searchObject.numberOfCustomer);

// disable current
if (searchObject.numberOfCustomer == 1) {
$("#search-selection-page .customer-section a[data-icon='minus']").addClass('ui-disabled');
}

// enable
if (searchObject.numberOfCustomer < 20) {
$("#search-selection-page .customer-section a[data-icon='plus']").removeClass('ui-disabled');
}
});

$("#search-selection-page .customer-section a[data-icon='plus']").click(function () {
searchObject.numberOfCustomer++;
$('#search-selection-page .customer-section .text1 label').text(searchObject.numberOfCustomer);

// enable
if (searchObject.numberOfCustomer > 1) {
$("#search-selection-page .customer-section a[data-icon='minus']").removeClass('ui-disabled');
}
// disable current
if (searchObject.numberOfCustomer == 20) {
$("#search-selection-page .customer-section a[data-icon='plus']").addClass('ui-disabled');
}
});

// room-selection        
$("#search-selection-page .room-section a[data-icon='minus']").click(function () {
searchObject.numberOfRoom--;
$('#search-selection-page .room-section .text1 label').text(searchObject.numberOfRoom);

// disable current
if (searchObject.numberOfRoom == 1) {
$("#search-selection-page .room-section a[data-icon='minus']").addClass('ui-disabled');
}

// enable
if (searchObject.numberOfRoom < 20) {
$("#search-selection-page .room-section a[data-icon='plus']").removeClass('ui-disabled');
}
});

$("#search-selection-page .room-section a[data-icon='plus']").click(function () {
searchObject.numberOfRoom++;
$('#search-selection-page .room-section .text1 label').text(searchObject.numberOfRoom);

// enable
if (searchObject.numberOfRoom > 1) {
$("#search-selection-page .room-section a[data-icon='minus']").removeClass('ui-disabled');
}

// disable current
if (searchObject.numberOfRoom == 20) {
$("#search-selection-page .room-section a[data-icon='plus']").addClass('ui-disabled');
}
});

// seach-button-section
$("#search-selection-page .seach-button-section #btnSearchCity").click(function () {

if (searchObject.cityId == 0) {
alert("Xin chọn thành phố")
return;
}

// set cookie            
$.G_setCookieSearchObject(searchObject);

// redirect to search page
window.location.href="/M/Mobile_v2/Search.aspx?ArrivalDate=" + searchObject.toCheckinDateShort()
+ "&DepartureDate=" + searchObject.toCheckoutDateShort()
+ "&CityId=" + searchObject.cityId
+ "&Guests=" + searchObject.numberOfCustomer
+ "&Rooms=" + searchObject.numberOfRoom;
// change page
//            $.G_changePage({ page: "/M/Mobile_v2/Search.aspx?ArrivalDate=" + searchObject.toCheckinDateShort()
//                                    + "&DepartureDate=" + searchObject.toCheckoutDateShort()
//                                    + "&CityId=" + searchObject.cityId
//                                    + "&Guests=" + searchObject.numberOfCustomer
//                                    + "&Rooms=" + searchObject.numberOfRoom, reverse: false
//            });
});

$(document).on('pagebeforeshow', '#search-selection-page', function () {
// refresh data passed from another page
bindData();
});

// init
bindData();
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CitySelection page
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
$(function () {

$(document).on('pagebeforeshow', '#city-selection-page', function () {
// re-assign selected data
if (searchObject.cityId > 0) {
$("#city-selection-page input[data-type='search']").val(searchObject.cityName);
}

//            $("#city-selection-page input[data-type='search']").keyup(function () {                
//                if ($(this).val() === '') {
//                    // hide result window
//                    $(this).closest('form').next("[data-role=listview]").children().addClass('ui-screen-hidden');
//                }
//            });

//            $("#city-selection-page input[data-type='search']").focusin(function () {
//                TODO              
//            });

//        $('#city-selection-page a.ui-input-clear').click(function () {
//            $(this).closest('input').val('');
//            $(this).closest('input').trigger('keyup');
//        });

});

$(document).on("pageinit", "#city-selection-page", function () {

// select khach san pho bien nhat
$('#city-selection-page .wrapperRightKSPB .RightWrapCity').click(function () {
// hide result window
//$(this).closest('[data-role=listview]').children().addClass('ui-screen-hidden');

//  store selected data
searchObject.cityId = $(this).attr('id');
searchObject.cityName = $(this).attr('text');

// set cookie to reassign when come back					        
$.G_setCookieSearchObject(searchObject);

// Change page
$.G_changePage({ page: "#search-selection-page", reverse: true });
});


$("#city-selection-page #city-autocomplete").on("listviewbeforefilter", function (e, data) {
var $ul = $(this),
$input = $(data.input),
value = $input.val(),
html = "";
$ul.html("");
if (value && value.length > 0) {
$ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
$ul.listview("refresh");
$.ajax({
url: "/M/Mobile_v2/WebServices/WebServices.asmx/City_AutoComplete",
dataType: "json",
type: "POST",
contentType: "application/json; charset=utf-8",
data: "{ 'Q': '" + $input.val() + "', 'Limit': '10' }"
}).then(function (response) {
$.each(response, function (i, val) {
// parse json array
$.each(val, function (i, n) {
html += "<li  id='" + n.CityId + "'><a href=#>" + n.CityName + "</a></li>";
});
});
$ul.html(html);
$ul.listview("refresh");
$ul.trigger("updatelayout");

// get data selection
$('#city-selection-page #city-autocomplete li').click(function () {
// hide result window
//$(this).closest('[data-role=listview]').children().addClass('ui-screen-hidden');

//  store selected data
searchObject.cityId = $(this).attr('id');
searchObject.cityName = $(this).find('a').text();

// set cookie to reassign when come back					        
$.G_setCookieSearchObject(searchObject);

// Change page
$.G_changePage({ page: "#search-selection-page", reverse: true });
});

});
}
});
});

});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CheckinSelection page
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
$(function () {
// init datebox from cached
var element = $('#checkin-datebox-cache').detach();
$(element).appendTo($('#checkin-selection-page .jqm-content'));
element.show();

// bind page event
$(document).on('pagebeforeshow', '#checkin-selection-page', function () {
// re-assign value            
$('#checkin-selection-page .my-checkin-date').datebox('setTheDate', searchObject.checkinDate);

// refresh datebox to update ui
$('#checkin-selection-page .my-checkin-date').trigger('datebox', { 'method': 'doset' });

$('#checkin-selection-page .my-checkin-date').bind('datebox', function (e, p) {
if (p.method === 'close') {
e.stopImmediatePropagation()

// get selected data
searchObject.checkinDate = $('#checkin-selection-page .my-checkin-date').datebox('getTheDate');

// update checkout date if checkin date > checkout date
if (new Date(searchObject.toCheckinDateShort()) >= new Date(searchObject.toCheckoutDateShort())) {
var d = new Date(searchObject.checkinDate);
d.setDate(d.getDate() + 1);
searchObject.checkoutDate = d;
}

// change page
$.G_changePage({ page: "#search-selection-page", reverse: true });
}
});
})

});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CheckoutSelection page
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
$(function () {

// init datebox from cached
var element = $('#checkout-datebox-cache').detach();
$(element).appendTo($('#checkout-selection-page .jqm-content'));
element.show();

// bind page event
$(document).on('pagebeforeshow', '#checkout-selection-page', function () {
// re-assign value            
$('#checkout-selection-page .my-checkout-date').datebox('setTheDate', searchObject.checkoutDate);

// set date limit
var temp = new Date();
diff = parseInt((searchObject.checkinDate - temp) / (1000 * 60 * 60 * 24));

// if current date           
if (searchObject.toCheckinDateShort() == searchObject.toCurrentDateShort()) {
diffstrt = (diff * -1) - 1; // If you want a minimum of 1 day between, make this -2 instead of -1
} else {
// other
diffstrt = (diff * -1) - 2;
}
$('#checkout-selection-page .my-checkout-date').data('mobileDatebox').options.minDays = diffstrt;

// refresh datebox to update ui
$('#checkout-selection-page .my-checkout-date').trigger('datebox', { 'method': 'doset' });

// bind datebox event
$('#checkout-selection-page .my-checkout-date').bind('datebox', function (e, p) {
if (p.method === 'close') {
e.stopImmediatePropagation()

// get selected data
searchObject.checkoutDate = $('#checkout-selection-page .my-checkout-date').datebox('getTheDate');

// Change page
$.G_changePage({ page: "#search-selection-page", reverse: true });
}
});
})

});
});
$(function () {

var searchAdvanceObject = {
sorting: "",
promotions: new Array(),
stars: new Array(),
prices: new Array(),
hasAdvanceSearch: false,
pageSize: 10,
pageIndex: 2
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Search page	
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
$.m2_searchpage_init = function () {
// check view more button
function hideTheViewMoreButtonIfEndOfRecord(isEnd) {
if (isEnd == '0') {
$('#search-page .click-to-view-more').hide();
} else {
$('#search-page .click-to-view-more').show();
}
}

function viewMoreData(completeAction, appendResult) {
// reset
if (appendResult == false) {
$("#search-page .result-section").html('');
}
var items = "";
var isEnd = false;
var total = 0;

// get data
$.ajax({
beforeSend: function () { $.mobile.showPageLoadingMsg(); }, //Show spinner
complete: function () { $.mobile.hidePageLoadingMsg() }, //Hide spinner
url: "/M/Mobile_v2/WebServices/WebServices.asmx/SearchHotel",
dataType: "json",
type: "POST",
contentType: "application/json; charset=utf-8",
data: "{ 'ArrivalDate': '" + $('#search-page input[name=hidArrivalDate]').val()
+ "', 'DepartureDate': '" + $('#search-page input[name=hidDepartureDate]').val()
+ "', 'CityId': '" + $('#search-page input[name=hidCityId]').val()
+ "', 'Guests': '" + $('#search-page input[name=hidGuests]').val()
+ "', 'Rooms': '" + $('#search-page input[name=hidRooms]').val()
+ "',  'Sorting': '" + searchAdvanceObject.sorting
+ "',  'Promotions': '" + searchAdvanceObject.promotions
+ "',  'Stars': '" + searchAdvanceObject.stars
+ "',  'Prices': '" + searchAdvanceObject.prices
+ "',  'PageIndex': '" + searchAdvanceObject.pageIndex
+ "', 'Limit': '" + searchAdvanceObject.pageSize
+ "', 'RawUrl': '" + $('#search-page input[name=hidRequestUrl]').val() + "' }"
}).then(function (response) {
// read result
$.each(response, function (i, val) {
isEnd = val.IsEnd;
items = val.Items;
total = val.Total;
});

// clear or append more result
if (appendResult) {
$("#search-page .result-section").append(items);
} else {
$("#search-page .result-section").html(items);
}

// bind total
$('#search-page .summary-section .total .num').text(total);

// check hide the view more button
hideTheViewMoreButtonIfEndOfRecord(isEnd);

// call complete func
if (completeAction != null) {
completeAction();
}

// next page
searchAdvanceObject.pageIndex++;
});
}

$('#search-page .click-to-view-more').click(function () {
viewMoreData(null, true);
});

// search if select sorting
$('#search-page #sortingPopupMenu li').click(function () {
// hightlight
$('#search-page #sortingPopupMenu li').attr("data-theme", "c").removeClass("ui-btn-up-b").removeClass('ui-btn-hover-b').addClass("ui-btn-up-c").addClass('ui-btn-hover-c');
$(this).attr("data-theme", "b").removeClass("ui-btn-up-c").removeClass('ui-btn-hover-c').addClass("ui-btn-up-b").addClass('ui-btn-hover-b');

// close popup
$('#search-page #sortingPopupMenu').popup("close");

// set selected sorting
searchAdvanceObject.sorting = $(this).attr('sorting');

// reset to begining
searchAdvanceObject.pageIndex = 1;
// get data
viewMoreData(function () {
//$(document).scrollTop($(document).height());
}, false);
});

$('#search-page .filter').click(function () {
$.G_changePage2NoHistory({ page: "#search-advance-page", reverse: false });
});

// search if have request advance data
$(document).on('pagebeforeshow', '#search-page', function () {
if (searchAdvanceObject.hasAdvanceSearch) {
// reset to begining
searchAdvanceObject.pageIndex = 1;

// call from advance search page
searchAdvanceObject.hasAdvanceSearch = false;

// ge data
viewMoreData(null, false);
}
});

// call at init
hideTheViewMoreButtonIfEndOfRecord($('#search-page input[name=hidPageCount]').val());

// set cookie	(if access link directly)
if (typeof $.G_setCookieSearchObject !== "undefined") {			
$.G_setCookieSearchObject({
cityId: $('#search-page input[name=hidCityId]').val(),
cityName: $('#search-page input[name=hidCityName]').val(),
checkinDate: new Date($('#search-page input[name=hidArrivalDate]').val()),
checkoutDate: new Date($('#search-page input[name=hidDepartureDate]').val()),
numberOfCustomer: $('#search-page input[name=hidGuests]').val(),
numberOfRoom: $('#search-page input[name=hidRooms]').val()
});
}
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SearchAdvance page	
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
$.m2_searchadvancepage_init = function () {
$('#search-advance-page .apply-button').click(function () {
// prom
var promValues = new Array();
$.each($("#search-advance-page .have-promotion-section input[name='promotion']:checked"), function () {
promValues.push($(this).attr('vl'));
})
searchAdvanceObject.promotions = promValues;

// star
var starValues = new Array();
$.each($("#search-advance-page .standard-to-rank-section input[name='star']:checked"), function () {
starValues.push($(this).attr('vl'));
})
searchAdvanceObject.stars = starValues;

// price
var priceValues = new Array();
$.each($("#search-advance-page .price-tier-section input[name='price']:checked"), function () {
priceValues.push($(this).attr('vl'));
})
searchAdvanceObject.prices = priceValues;

// notify has advance search            
searchAdvanceObject.hasAdvanceSearch = true;
});

$('#search-advance-page .clear-button').click(function () {
$("#search-advance-page input[type='checkbox']").attr("checked", false).checkboxradio("refresh");
});
}
});
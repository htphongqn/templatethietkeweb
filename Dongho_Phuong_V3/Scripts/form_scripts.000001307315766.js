
 

function addremove(aid){
if($("#"+aid).hasClass("filtername_a_selected")){
  $("#"+aid).removeClass("filtername_a_selected");
  $("#"+aid).addClass("filtername_a");
  $("#"+aid+"-img").removeClass("f_arrw_a_select");
  $("#"+aid+"-img").addClass("f_arrw_a");
 }else{
  $("#"+aid).removeClass("filtername_a");
  $("#"+aid).addClass("filtername_a_selected");
  $("#"+aid+"-img").removeClass("f_arrw_a");
  $("#"+aid+"-img").addClass("f_arrw_a_select"); 
 }
 return false;	

}




function toggle(obj) {
var el = document.getElementById(obj);
aid=obj+"-a";
addremove(aid);

$(el).slideToggle('slow', function() {
// Animation complete.

$.get('/dropdowntoggle.php?action='+obj);


});


}


//no slide
function toggle2(obj) {
var el = document.getElementById(obj);
aid=obj+"-a";
addremove(aid);


$(el).toggle();

$.get('/dropdowntoggle.php?action='+obj);

}


 
 
 // read more
$(document).ready(function() {
  
    var showChar = 550;
    var ellipsestext = ".....";
    var moretext = "(read more)";
    var lesstext = "(show less)";
    $('.more').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });
    
    
    
    
    var showChar = 250;
        $('.moreshort').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });

 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
});


 

function handlerFunction(description,page,line) {
 // put error-handling operators here
 return true;
}
window.onerror=handlerFunction;








$(document).ready(function() {

$('.shortlistadd').click(function() {
  $("#comparetop").show();
});

// faq
$("#accordion").accordion({
  autoHeight: false
});

///jquery iframe
$('a.iframepopup').click(function(e) {
    e.preventDefault();
    var $this = $(this);
    var horizontalPadding = 12;
    var verticalPadding = 12;
    
    var dialogwidth = 900;
    var dialogheight = 700;
    
    //var dialogheight = $(window).height()*0.8; //80% of browser height
    
    $('<iframe frameBorder="0" style="border: 0;border-style:none;" id="externalSite" class="externalSite" src="' + this.href + '" />').dialog({
	title: ($this.attr('title')) ? $this.attr('title') : 'WATCH SHOP &trade;',
	autoOpen: true,
	hide: 'fade',
	
	
	
	show: 'fade',
	width: dialogwidth,
	height: dialogheight,
	modal: true,
	resizable: true
	//,
	//position: { my: "bottom+40", at: "center", of: window }
	
	//close: function(event, ui) { $('#playerID').stopVideo(); }

    }).width(dialogwidth - horizontalPadding).height(dialogheight - verticalPadding);            
});
});
///jquery iframe






function lookup(inputString) {
if(inputString.length > 2) {

$.post("/rpc-search.php", {queryString: ""+inputString+""}, function(data){
if(data.length > 10) {
  
$('#suggestions').fadeIn('fast', function(){
    $('#autoSuggestionsList').html(data);
    
});
}

else if (data == 'noresult'){
   //alert("arf");
   $('#suggestions').fadeOut('fast', function(){
	  $('#autoSuggestionsList').html('');
	  
      });
  }

});
}

else {
// Hide the suggestion box.
$('#suggestions').fadeOut();

}
} // lookup




function fill(thisValue) {
	$('#inputString').val(thisValue);
	setTimeout("$('#suggestions').fadeOut();", 200);
}

function isSearchValid() {
 var qstring=document.search_form.q.value;
 
 //alert(qstring);
 
 
 if ((qstring.length < 1) || (qstring == 'Search...')){
  $('#inputString').val('');
 $('#inputString').focus();
 // alert(qstring);
  
  return false;
 }

document.search_form.submit();
 return true;
}





// Check email address for validity
function fn_check_email(email, msg) {

	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	if (filter.test(email)) {
		return true;
	} else{
		alert(msg);
		return false;
	}
}




function delivertobilling(msg) {
  
$('#sa').fadeOut('slow');
$("#elm_19").val($("#elm_18").val()); //s_address
$("#elm_21").val($("#elm_20").val()); //s_address_2
$("#elm_23").val($("#elm_22").val()); //s_city
$("#elm_27").val($("#elm_26").val()); //s_country
$("#elm_29").val($("#elm_28").val()); //s_zipcode


}


function fn_format_price(value, decplaces)
{
	if (typeof(decplaces) == 'undefined') {
		decplaces = 2;
	}

	value = parseFloat(value.toString()) + 0.00000000001;
	return value.toFixed(decplaces);
}



/*
String.prototype.str_replace = function(src, dst)
{

	return this.toString().split(src).join(dst);
}

*/


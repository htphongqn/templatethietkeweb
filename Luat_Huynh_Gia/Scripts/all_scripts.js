//All Scripts
//Simply Scroll
(function($) {
	$(function() { //on DOM ready
		$("#scroller").simplyScroll({orientation:'vertical',customClass:'vert'});
	});
})(jQuery);

$(document).ready(function(){
	//  Accordion Panels
    $("div.menu_body:first").show();
	$("div.menu_head:first").addClass("current");
    //setTimeout("$('div.menu_body').slideToggle('slow');", 1000);
    $("#firstpane p.menu_head").click(function () {
        $(this).next("div.menu_body").slideToggle("medium").siblings("div.menu_body:visible").slideUp("medium");
        $(this).toggleClass("current");
        $(this).siblings("p.menu_head").removeClass("current");
    });	   
				  		   
//Mobile menu
$('li.cat-header ul').each(function(index) {
 $(this).prev().addClass('idCatSubcat')});
 $('li.cat-header a').after('<span></span>'); 
 $('li.cat-header ul').css('display','none');
 $('li.cat-header ul.active').css('display','block');
 $('li.cat-header ul').each(function(index) {
   $(this).prev().addClass('close').click(function() {
  if (
   $(this).next().css('display') == 'none') {
   $(this).next().slideDown(400, function () {
   $(this).prev().removeClass('collapsed').addClass('expanded');
    });
  }else {
    $(this).next().slideUp(400, function () {
   $(this).prev().removeClass('expanded').addClass('collapsed');
   $(this).find('ul').each(function() {
    $(this).hide().prev().removeClass('expanded').addClass('collapsed');
   });
    });
  }
  return false;
   });
});
 
// Add a <span> to every .nav_item that has a <ul> inside	
	$('#mega_menu li li').has('ul.noli').addClass('menu_level2');
	
	$('.menu_icon, .close_menu').click(function () {
		$(this).parents().find('.container').toggleClass('tran_wp');												 
        $(this).parents().find('.fly_menu').toggleClass('active');        
    }) 
	
 
	//Nivo Slide Responsive
	$('#slider').nivoSlider();						  
 
});
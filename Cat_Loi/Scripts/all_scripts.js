//All Scripts

//Simply Scroll
(function($) {
	$(function() { //on DOM ready
		$("#scroller").simplyScroll();
	});
})(jQuery);

$(document).ready(function(){						  			   
 
	//Main Slide
	jQuery('#demo1').skdslider({delay:4000, animationSpeed: 2000,showNextPrev:true,showPlayButton:false,showNav:false,autoSlide:true,animationType:'fading'});	
	
    //  Accordion Panels
    $("div.menu_body:first").show();
	$("#firstpane .menu_head:first").addClass("current");
    //setTimeout("$('div.menu_body').slideToggle('slow');", 1000);
    $("#firstpane .menu_head").click(function () {
        $(this).next("div.menu_body").slideToggle("slow").siblings("div.menu_body:visible").slideUp("slow");
        $(this).toggleClass("current");
        $(this).siblings("p.menu_head").removeClass("current");
    });		
	 
});

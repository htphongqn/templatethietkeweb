//All Scripts

//Simply Scroll
(function($) {
	$(function() { //on DOM ready
		$("#scroller").simplyScroll();
	});
})(jQuery);

$(document).ready(function(){
				  		   
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
		$(this).parents().find('#page_wrap').toggleClass('tran_wp');												 
        $(this).parents().find('.fly_menu').toggleClass('active');        
    }) 
	
//Menu Footer Mobile
		$('.menu_footer_icon').click(function(){										
			$('#menu_footer_mobile > ul').slideToggle();			
		});	
 
	//Nivo Slide Responsive
	$('#slider').nivoSlider();		
 
});

$( function()
	{    	
	
// Slideshow 4
      $("#slider4").responsiveSlides({
        auto: true,
        pager: false,
		pagination: true,
        nav: true,
        speed: 500,
		timeout: 3000,
        namespace: "callbacks",
        before: function () {
          $('.events').append("<li>before event fired.</li>");
        },
        after: function () {
          $('.events').append("<li>after event fired.</li>");
        }
      });
		
	$(".zoom").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '10000'
    });
	
	$(".zoom_gallery").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '3000'
    });	
	
});
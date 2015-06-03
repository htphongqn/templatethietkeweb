//All Scripts
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
		//$(this).parents().find('.container').toggleClass('tran_wp');												 
        $(this).parents().find('.mobile_menu').slideToggle('fast');        
    }) 
	
	//Owl Carousel Assets
      var owl = $('.owl-carousel');
              owl.owlCarousel({
                margin: 25,
                autoplay: true,
				autoplayTimeout:3000,
				autoplayHoverPause:true,
				nav:true,
				navSpeed : 1000,
				dots : false,				
				smartSpeed: 800,
				loop: true,
				items:1,
				responsive:{
					0:{items:1},
					320:{items:2},
					640:{items:3},
					768:{items:4},
					980:{items:5}
				}
              })	

});
$( function(){    
		//Nivo Slide Responsive
		$('#slider').nivoSlider();
});	
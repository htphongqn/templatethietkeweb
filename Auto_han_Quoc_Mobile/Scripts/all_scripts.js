//Function
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
});

$(document).ready(function () {	
							
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
	
	$('.menu_icon').click(function () {
        $(this).parents().find('.fly_menu').toggleClass('active');
        $(this).parents().find('#wrap_outer').toggleClass('tran_wp');		  
    })   
	
	$('.close_head_menu').click(function () {
        $(this).parents().find('.fly_menu').toggleClass('active');
        $(this).parents().find('#wrap_outer').toggleClass('tran_wp');
    })	
	
	
		//Owl Carousel
		$(".slide_P").owlCarousel({
				autoplay: true,
				autoplayTimeout: 5000,
				autoplayHoverPause:true,
				nav:true,
				navSpeed : 1000,
				dots : false,				
				smartSpeed: 800,
				loop: true,
				items:5,
				responsive:{
					0:{items:2},
					480:{items:2},	
					640:{items:3},			
					979:{items:4},						
					1199:{items:5}
				}
		});
		$("#owl-slideweb").owlCarousel({
				margin: 0,
				autoplay: true,
				autoplayTimeout: 4000,
				autoplayHoverPause:true,
				nav:true,
				navSpeed : 1000,
				dots : false,				
				smartSpeed: 800,
				loop: true,
				items:6,
				responsive:{
					0:{items:2},
					480:{items:2},					
					640:{items:3},
					767:{items:4},	
					979:{items:5},						
					1199:{items:6}
				}
		});		
});
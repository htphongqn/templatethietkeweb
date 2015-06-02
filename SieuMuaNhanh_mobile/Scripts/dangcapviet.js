
$(document).ready(function () {	
	
	$('.menu_icon').click(function () {
        $(this).parents().find('.fly_menu').toggleClass('active');
        $(this).parents().find('#wrap_outer').toggleClass('tran_wp');
		 $(this).parents().find('#smn_logo').toggleClass('hide');		  
    })   
	
		
	$('.mobile_menu .main_nav>ul>li>ul').hide(); 	

    $('.mobile_menu .main_nav>ul.nav>li>span').click(function(e) {
        $('.mobile_menu .main_nav ul ul').slideUp('normal'); 		

     // if the moreInfo div is a sibling of the li
        if($(this).next().is(':hidden') == true) {
          $(this).next().slideDown('normal').siblings('.mobile_menu .main_nav>ul.nav>li>span').addClass('active');
		} else {
		  $(this).next().slideUp('normal').siblings('.mobile_menu .main_nav>ul.nav>li>span').removeClass('active');			  
        }     			
    });
	
	$('.close_head_menu').click(function () {
        $(this).parents().find('.fly_menu').toggleClass('active');
        $(this).parents().find('#wrap_outer').toggleClass('tran_wp');
		$('#smn_logo').toggleClass('hide');
    })		
	
	<!-- Owl Carousel Assets -->    
      $("#owl-demo").owlCarousel({
        navigation : false
      });	
	
});
//Main Menu
$( function()
	{
		$( '#nav li:has(ul)' ).doubleTapToGo();
		
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
	  
	  	  //Tab
	  var indicator = $('#indicator'),
					indicatorHalfWidth = indicator.width()/2,
					lis = $('#tabs_detail').children('li');					

			$("#tabs_detail").tabs("#tabs_dtcontent .section", {
				effect: 'fade',
				fadeOutSpeed: 0,
				fadeInSpeed: 1000,
				onBeforeClick: function(event, index) {
					var li = lis.eq(index),
					    newPos = li.position().left + (li.width()/2) - indicatorHalfWidth;
					indicator.stop(true).animate({ left: newPos }, 600, 'easeInOutExpo');
				}
			});	
	  	  
});

//All Scripts
$( function(){    	
								
		//Nivo Slide Responsive
		$('#slider').nivoSlider();						
		
		//Examples of how to assign the Colorbox event to elements
		//get height and width of window
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		//windowsize - 50px
		var windowHeightFixed = windowHeight - 50;
		var windowWidthFixed = windowWidth - 50;    
	
		$('#gallery_image a').lightBox({          
			maxHeight: windowHeightFixed,
			maxWidth: windowWidthFixed
		});								
									
});	
$(document).ready(function(){
			
			//bxSlider
			$('.slider_home').bxSlider({
			  minSlides: 1,
			  maxSlides: 1,
			  moveSlides: 1,
			  //slideWidth: 220,
			  slideMargin: 0,
			  pager: false,
			  auto: false,
			  pause: 3000,
			  speed: 1000
			});
			
			//bxSlider
			$('.slider_pro').bxSlider({
			  minSlides: 1,
			  maxSlides: 5,	
			  moveSlides: 1,
			  slideWidth: 180,
			  slideMargin: 25,
			  pager: false,
			  auto: true,
			  pause: 5000,
			  speed: 1000
			});
			
			$(".tab_menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
});
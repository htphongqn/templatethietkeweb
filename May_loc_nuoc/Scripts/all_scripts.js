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
	
		$('.list_gallery_img a').lightBox({          
			maxHeight: windowHeightFixed,
			maxWidth: windowWidthFixed
		});								
									
});	
$(document).ready(function(){
			
			//bxSlider
			$('#sl_products .bxslider').bxSlider({
			  minSlides: 4,
			  maxSlides: 4,
			  moveSlides: 1,
			  slideWidth: 220,
			  slideMargin: 25,
			  pager: false,
			  auto: true,
			  pause: 3000,
			  speed: 1000
			});
			
			//bxSlider
			$('#img_dtp .bxslider').bxSlider({
			  minSlides: 1,
			  maxSlides: 1,			  
			  slideWidth: 320,
			  slideMargin: 0,
			  pager: false,
			  auto: true,
			  pause: 3000,
			  speed: 1000
			});
});
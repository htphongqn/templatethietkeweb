//Scripts click Toggle
$(document).ready(function() {	
	//Nivo Slide Responsive
	$('#slider').nivoSlider();								
						   
	//JS Sticky
	$(".sticky").sticky({ topSpacing: 0 });
	
	//Examples of how to assign the Colorbox event to elements
		$(".cloud-zoom-gallery").colorbox({rel:'group_colorbox', maxWidth:'98%', maxHeight:'98%'});				
				
		//bxSlider			
			$('#thumblist .bxslider').bxSlider({
			  minSlides: 3,
			  maxSlides: 3,
			  moveSlides: 1,
			  slideWidth: 54,
			  slideMargin: 10,
			  pager: false,
			  auto: true,
			  pause: 6000,
			  speed: 1000
			});
			$('#thesame_P .bxslider').bxSlider({
			  minSlides: 4,
			  maxSlides: 4,
			  moveSlides: 4,
			  slideWidth: 210,
			  slideMargin: 15,
			  pager: false,
			  auto: true,
			  pause: 60000,
			  speed: 1000
			});
			
});  
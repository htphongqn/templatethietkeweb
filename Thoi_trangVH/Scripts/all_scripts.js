//Scripts click Toggle
$(document).ready(function() {	

//Scripts click Toggle
var notH = 1,
    $pop = $('.contentEGP').hover(function(){notH^=1;});

$(document).on('mouseup keyup', function( e ){
  if(notH||e.which==27) $pop.stop().hide();
});
/////// CALL POPUP 
$('.filter_name').click(function(){
	jQuery(this).find('.contentEGP').slideDown("fast").end().siblings().find('.contentEGP').hide('fast');							 
	event.stopPropagation();  
});					   						   
						   
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
			  minSlides: 3,
			  maxSlides: 3,
			  moveSlides: 1,
			  slideWidth: 242,
			  slideMargin: 5,
			  pager: false,
			  auto: true,
			  pause: 3000,
			  speed: 1000
			});
			
});  
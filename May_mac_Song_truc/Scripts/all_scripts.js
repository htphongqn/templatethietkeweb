//All Scripts

jQuery(function(){												
			
			$('.accordion-2').dcAccordion({
				eventType: 'hover',
				autoClose: false,
				menuClose   : true,   
				classExpand : 'dcjq-current-parent',
				saveState: false,
				disableLink: false,
				showCount: false,
				hoverDelay   : 50,
				speed: 'slow'
			});
			
});			
			
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
						   	
	
		//Examples of how to assign the Colorbox event to elements
		$(".cloud-zoom-gallery").colorbox({rel:'group_colorbox', maxWidth:'98%', maxHeight:'98%'});				
				
		//bxSlider
			$('#partners .bxslider').bxSlider({
			  minSlides: 4,
			  maxSlides: 4,
			  moveSlides: 1,
			  slideWidth: 100,
			  slideMargin: 20,
			  pager: false,
			  auto: true,
			  pause: 4000,
			  speed: 1000
			});
			$('#recruitment .bxslider').bxSlider({
			  minSlides: 1,
			  maxSlides: 1,
			  moveSlides: 1,
			  mode: 'fade',
			  //slideWidth: 100,
			  slideMargin: 0,
			  pager: false,
			  auto: true,
			  pause: 3000,
			  speed: 1000,
			  controls: false
			});
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
			
});  
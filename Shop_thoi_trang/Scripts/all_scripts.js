//Scripts click Toggle
$(document).ready(function() {
	//Nivo Slide Responsive
	$('#slider').nivoSlider();	
	
	//Examples of how to assign the Colorbox event to elements
	$(".group_colorbox").colorbox({rel:'group_colorbox', width:"auto", height:"90%"});
	
	//Carousel
	$(".carousel").carouFredSel({
		circular: true,
		infinite: false,    
		auto 	: { pauseDuration : 4000, duration: 1000},
		scroll  : {
			items   : 1,
			pauseOnHover    : true,
			duration    : 1000
		},
		swipe: { onMouse: true, onTouch: true},
		items: {		
			visible: { min: 1, max: 4 }								
		},																			
		prev    : {
			button  : function(){
				return $(this).parents('.sl_products').find('.prev');
			},
			key     : "left"
		},
		next    : {
			button  : function(){
				return $(this).parents('.sl_products').find('.next');
			},
			key     : "right"
		}
	});	
	
	$('.jqzoom').jqzoom({
            zoomType: 'standard',
            lens:true,
            preloadImages: false,
            alwaysOn:false
        });
});  

$(function(){
	$('.marquee').marquee({
		//speed in milliseconds of the marquee
		speed: 20000,
		//gap in pixels between the tickers
		gap: 835,
		//gap in pixels between the tickers
		delayBeforeStart: 0,
		//'left' or 'right'
		direction: 'left',
		//true or false - should the marquee be duplicated to show an effect of continues flow
		duplicated: true,
		//on hover pause the marquee - using jQuery plugin https://github.com/tobia/Pause
		pauseOnHover: true
	});	
});
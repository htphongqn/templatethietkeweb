//Scripts click Toggle
$(document).ready(function () {		
	
	//Carousel
	$("#thumblist_iframe ul").carouFredSel({
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
			visible: { min: 1, max: 3 }								
		},																			
		prev    : {
			button  : function(){
				return $(this).parents('#thumblist_iframe').find('.prev');
			},
			key     : "left"
		},
		next    : {
			button  : function(){
				return $(this).parents('#thumblist_iframe').find('.next');
			},
			key     : "right"
		}
	});	
	
	$('.jqzoom_iframe').jqzoom({
            zoomType: 'standard',
            lens:true,
            preloadImages: false,
            alwaysOn:false,
			zoomWidth: 500,
            zoomHeight: 500,
        });

});
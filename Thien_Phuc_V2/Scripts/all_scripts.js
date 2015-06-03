//Scripts click Toggle
$(document).ready(function () {
							
	//Carousel
	$(".carousel").carouFredSel({
		circular: true,
		infinite: false,    
		auto 	: { pauseDuration : 3000, duration: 800},
		scroll  : {
			items   : 1,
			pauseOnHover    : true,
			duration    : 800
		},
		swipe: { onMouse: true, onTouch: true},
		items: {		
			visible: { min: 1, max: 3 }								
		},																			
		prev    : {
			button  : function(){
				return $(this).parents('#slide_ads').find('.prev_slide');
			},
			key     : "left"
		},
		next    : {
			button  : function(){
				return $(this).parents('#slide_ads').find('.next_slide');
			},
			key     : "right"
		}
	});								
							
	// Slideshow 4
            $("#slider1").responsiveSlides({
                auto: true,
                pager: false,
                nav: true,
                speed: 500,
                timeout: 3500,
                random: true,
                namespace: "callbacks",
                before: function () {
                    $('.events').append("<li>before event fired.</li>");
                },
                after: function () {
                    $('.events').append("<li>after event fired.</li>");
                }
            });	
			
			$('#testimonial').cycle({ 
				fx:    'fade', 				
				prev:    '.prev_testimonials',
				next:    '.next_testimonials',
		 	});
							
	//Examples of how to assign the Colorbox event to elements
	$(".group_colorbox").colorbox({rel:'group_colorbox', width:"auto", height:"90%"});		

});
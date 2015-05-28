//All Scripts
$(document).ready(function(){						  	   
						   
	//Nivo Slide Responsive
	$('#slider').nivoSlider();					   						  

});

//Webwidget Slideshow Dot
$(function() {
                $("#slide_images").webwidget_slideshow_dot({
                    slideshow_time_interval: '5000',
                    slideshow_window_width: '270',
                    slideshow_window_height: '200',
                    slideshow_title_color: '#17CCCC',
                    soldeshow_foreColor: '#06131d',
                    directory: 'Images/'
                });
            });

$( function()
	{    

		//carouFredSel
		$('#pro_detail_slide ul').carouFredSel({
					prev: '#prev1',
					next: '#next1',
					responsive: true,
					width: '100%',
					scroll : {		            	
			            pauseOnHover: true
        			},
					speed: 1000,
					duration: 4000,	
					items: {
						width: 280,					
						visible: {
							min: 1,
							max: 1
						}
					}
				});	
		
	$(".zoom").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '10000'
    });
	
});

(function($){
			$(window).load(function(){
				/* custom scrollbar fn call */

				$(".scroll").mCustomScrollbar({
					scrollInertia:600,
					autoDraggerLength:false
				});				
				
			});
		})(jQuery);

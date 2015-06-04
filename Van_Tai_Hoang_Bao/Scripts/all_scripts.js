$( function(){    			
		//Menu		
		$('#cssmenu > ul > li:has(ul)').addClass("has-sub");
});	

$(document).ready(function() {
		//Nivo Slide Responsive
		$('#slider').nivoSlider();							   
							   
       $('#lightSlider').lightSlider({
            gallery:true,
            item:1,
            thumbItem:5,
            slideMargin: 0,
            speed:500,
            auto:true,
            loop:true,
			pause: 3000,
            onSliderLoad: function() {
                $('#lightSlider').removeClass('cS-hidden');
            }     
        }); 
	   
	   $('#lightSlider1').lightSlider({
            gallery:true,
            item:1,
            thumbItem:8,
            slideMargin: 0,
            speed:500,
            auto:true,
            loop:true,
			pause: 5000,
            onSliderLoad: function() {
                $('#lightSlider1').removeClass('cS-hidden');
            }     
        }); 
    });
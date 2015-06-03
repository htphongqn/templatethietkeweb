//All Scripts
$(document).ready(function () {
/////// CALL POPUP 
            $('.trigger').click(function () {
				$('.trigger').toggleClass("trigger_trans");	
                $('#dpop').toggleClass("search_trans");				
            }); 
			$('.close_search').click(function () {
				$('.trigger').toggleClass("trigger_trans");	
                $('#dpop').toggleClass("search_trans");
            });								   
    });	

$( function()
		{    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider();	
				
		//Examples of how to assign the Colorbox event to elements
		$(".group_colorbox").colorbox({rel:'group_colorbox', maxWidth:'98%', maxHeight:'98%'});				
				
		//bxSlider
			$('#thumbnails_P .bxslider').bxSlider({
			  minSlides: 3,
			  maxSlides: 3,
			  moveSlides: 1,
			  slideWidth: 72,
			  slideMargin: 15,
			  pager: false,
			  auto: true,
			  pause: 10000,
			  speed: 1000
			});
});

$(document).ready(function () {			
							
        function showImage(o) {
            $('#thumbnails_P li a').removeClass('current');
            $(o).addClass('current');
            var img = $('.inn #' + $(o).attr('for'));
            if ($('.inn a:visible').length > 0) {
                $('.inn a:visible').fadeOut('fast', function () {
                    img.fadeIn('fast');
                });
            } else {
                img.fadeIn('fast');
            }

            return false;
        }

        $('#thumbnails_P li a').click(function () {
            showImage(this);
            return false;
        });
        $('#thumbnails_P li:first-child a').click();
        
    });	
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
			
		//Examples of how to assign the Colorbox event to elements
		$(".group_colorbox").colorbox({rel:'group_colorbox', maxWidth:'98%', maxHeight:'98%'});				
				
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

$(document).ready(function () {			
							
        function showImage(o) {
            $('#thumblist li a').removeClass('current');
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

        $('#thumblist li a').click(function () {
            showImage(this);
            return false;
        });
        $('#thumblist li:first-child a').click();
        
    });	

$( function()
		{    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider();	
		
		$(function() {
			$(".scroller").simplyScroll({orientation:'vertical',customClass:'vert'});
		});
				
		//Gallery	   
    	var galleries = $('.ad-gallery').adGallery();
						
});

$(document).ready(function ($) {
            $("#accordion li ul").first().css("display", "block");
            $('#accordion').dcAccordion({
                eventType: 'click',
                autoClose: true,
                saveState: true,
                disableLink: true,
                speed: 'slow',
                showCount: false,
                autoExpand: true,
                cookie: 'dcjq-accordion-1',
                classExpand: 'dcjq-current-parent'
            });
        });
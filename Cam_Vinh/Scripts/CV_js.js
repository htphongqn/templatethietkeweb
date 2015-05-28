//Camera Slider
jQuery(function(){
			
			jQuery('#camera_wrap_4').camera({
				loader: 'none',
				pagination: false,
				thumbnails: false,
				hover: false,
				opacityOnGrid: false,
				imagePath: '../Images/',						
            	height: '630px',
            	fx: 'random',
            	navigation: true,
            	navigationHover: true,
            	playPause: false,
			});

		});

$(document).ready(function(){
						   
//Bxslider						   
$('.bxslider').bxSlider({
  mode: 'horizontal',
  captions: false,
  auto: true,
  autoControls: false,
  pager: false,
  minSlides: 3,
  maxSlides: 3,
  slideWidth: 310,
  slideMargin: 15
});

});

//Function
$(function() {
		   
	//Lightbox
	function launch() {
                 $('#box_lightbox').lightbox_me({centered: true, onLoad: function() { $('#box_lightbox').find('input:first').focus()}});
            }
            
            $('#lightbox_me').click(function(e) {
                $("#box_lightbox").lightbox_me({centered: true, onLoad: function() {
					$("#box_lightbox").find("input:first").focus();
				}});
				
                e.preventDefault();
            });
            
            
            $('table tr:nth-child(even)').addClass('stripe');
	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();
	
  });

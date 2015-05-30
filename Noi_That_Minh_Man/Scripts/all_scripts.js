//All Scripts
$( function()
	{    
	
// Add a <span> to every .nav_item that has a <ul> inside
	$('#cssmenu > ul > li').prepend('<div class="mask_menu trans"></div>');
	$('#cssmenu li').has('ul').addClass('has-sub');	
	
// ResponsiveSlides
  $("#slider1").responsiveSlides({
	speed: 800,
	nav: true,
	speed: 500,
	timeout: 4000,
	random: true,
	namespace: "callbacks",
	before: function () {
	  $('.events').append("<li>before event fired.</li>");
	},
	after: function () {
	  $('.events').append("<li>after event fired.</li>");
	}
  }); 
	  
		//carouFredSel
		$('#ads_bottom ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll : {		            	
			            pauseOnHover: true
        			},
					speed: 1000,
					duration: 4000,	
					items: {
						width: 200,					
						visible: {
							min: 1,
							max: 6
						}
					}
				});	
		
});

$(document).ready(function(){
						   
//Click Toggle
var notH = 1,
	$pop = $('#dpop').hover(function(){notH^=1;});
    $pop = $('ul.hidden').hover(function () { notH ^= 1; });	

            $(document).on('mouseup keyup', function (e) {
                if (notH || e.which == 27) $pop.stop().hide();
            });
            /////// CALL POPUP 
	 $('.sub_cate_hide').click(function () {
                jQuery(this).find('ul.hidden').slideDown("fast").end().siblings().find('ul.hidden').hide('fast');
                event.stopPropagation();
            });	
	 $('.search_icon').click(function(){
	$('#dpop').slideDown("fast");							 	
});	
$('.icon_close').click(function(){
	$('#dpop').slideUp("fast");							 	
});	

	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();	

});

//Support
$(window).load(function(){
var state = false;

$("#toggle-slide-button").click(function () {
    if (!state) {
        $('#map-legend').animate({width: "toggle"}, 200);
        $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = true;
        }
    else {
          $('#map-legend').animate({width: "toggle"}, 200);
          $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = false;
        }
});
});

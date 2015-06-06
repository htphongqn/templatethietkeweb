      
	  //slider nivo
	 $(window).load(function() {
        $('#slider').nivoSlider();
    });
	 //slider nivo
	 $(window).load(function() {
        $('#sliderGallery').nivoSlider({
		});
		 
    });
	
	//slide ngang
	function mycarousel_initCallback(carousel)
	{
		carousel.clip.hover(function() {
		carousel.stopAuto();
		}, function() {
		carousel.startAuto();
	});
	};
	jQuery(document).ready(function () {     
		jQuery('#mycarousel_same_P,#mycarousel_dt_img,#mycarousel_products').jcarousel({
		auto: 0,
		animation: 1000,
		wrap: 'circular',
		scroll: 1,
		initCallback: mycarousel_initCallback
		});	
	});
	jQuery(document).ready(function () {     
		jQuery('#project').jcarousel({
		auto: 1,
		animation: 2000,
		wrap: 'circular',
		scroll: 1,
		initCallback: mycarousel_initCallback
		});	
	});
 
  
//ho tro truc tuyen	
	$(window).load(function(){
var state = false;
$("#toggle-slide-button").click(function () {
    if (!state) {
        $('#map-legend').animate({width: "toggle"}, 0);
        $('#toggle-slide-button img').attr();

          state = true;
        }
    else {
          $('#map-legend').animate({width: "toggle"}, 0);
          $('#toggle-slide-button img').attr();

          state = false;
        }
});
});


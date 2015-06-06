      //slider nivo
	 $(window).load(function() {
        $('#slider').nivoSlider();
    });
	
	//slide ngang
	function mycarousel_initCallback(carousel)
	{
		carousel.clip.hover(function() {
		carousel.stopAuto();
		}, function() {
		carousel.startAuto( );
	});
	};
	jQuery(document).ready(function () {     
		jQuery('#gallery').jcarousel({
		auto: 0,
		animation: 1000,
		wrap: 'circular',
		scroll: 1,
		initCallback: mycarousel_initCallback
		});	
	});
	
	jQuery(document).ready(function () {     
		jQuery('#doi_tac').jcarousel({
		auto: 1,
		animation: 1000,
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

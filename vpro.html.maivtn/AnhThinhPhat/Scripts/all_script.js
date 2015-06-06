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
		jQuery('#img_doi_tac').jcarousel({
		auto: 1,
		animation: 1000,
		wrap: 'circular',
		scroll: 1,
		initCallback: mycarousel_initCallback
		});	
	});
 
  
//All Scripts
$( function()
	{    
	
	$(".zoom").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '5000'
    });
	
});


jQuery(window).load(function () {
            // nivoslider init
            jQuery('#slider').nivoSlider({
                effect: 'fade',
                slices: 15,
                boxCols: 8,
                boxRows: 8,
                animSpeed: 500,
                pauseTime: 5000,
                directionNav: false,
                directionNavHide: true,
                controlNav: true,
                captionOpacity: 1
            });
        });
//All Scripts
$( function()
		{    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider();	
				
		//Examples of how to assign the Colorbox event to elements
		$(".group_colorbox").colorbox({rel:'group_colorbox', maxWidth:'98%', maxHeight:'98%'});
		
		//carouFredSel				
				$("#slide_ads ul").carouFredSel({
							circular: true,
							infinite: true,
							pagination: false,
							auto 	: { pauseDuration : 3000, duration: 1000}, // fx: "crossfade"
							prev: '#prev',
							next: '#next',
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								//width: 214,
								height: "variable",
								visible: { min: 1, max: 5}
							}
						});	
				
		//Marrquee
		$('.marquee').marquee({
		//speed in milliseconds of the marquee
		speed: 20000,
		//gap in pixels between the tickers
		gap: 835,
		//gap in pixels between the tickers
		delayBeforeStart: 0,
		//'left' or 'right'
		direction: 'left',
		//true or false - should the marquee be duplicated to show an effect of continues flow
		duplicated: true,
		//on hover pause the marquee - using jQuery plugin https://github.com/tobia/Pause
		pauseOnHover: true
	});	
});

$(document).ready(function () {
        $(".tab_content").hide();
        $(".tab_content:first").show();

        $("ul.tabs_menu li").click(function () {
            $("ul.tabs_menu li").removeClass("active");
            $(this).addClass("active");
            $(".tab_content").hide();
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn();
        });
    }); 
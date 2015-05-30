//All Scripts
$( function()
		{    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider();	
				
		//Examples of how to assign the Colorbox event to elements
		$(".group_colorbox").colorbox({rel:'group_colorbox', width:"auto", height:"90%"});
		
		//carouFredSel
		$("#ads_sidebar ul").carouFredSel({
							circular: true,
							infinite: true,
							pagination: false,
							auto 	: { pauseDuration : 3000, duration: 1000, fx: "crossfade"},							
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								//width: 214,
								height: "variable",
								visible: { min: 1, max: 1}
							}
						});	
		
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
								visible: { min: 1, max: 4}
							}
						});				
});
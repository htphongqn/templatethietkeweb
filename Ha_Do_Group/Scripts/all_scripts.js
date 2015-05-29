//All Scripts
$( function(){    	
								
		//Nivo Slide Responsive
		$('#slider').nivoSlider();	
		
		//Menu		
		$('#cssmenu > ul > li:has(ul)').addClass("has-sub");
		
		//Examples of how to assign the Colorbox event to elements
		$('#gallery_image a').lightBox();						
				
		$('#sl_partners ul').carouFredSel({
							circular: true,
							infinite: true,							
							pagination: false,
							auto 	: { pauseDuration : 3000, duration: 1500},
							prev: '#prev_partner',
							next: '#next_partner',							
							scroll	: {
								items	: 3							
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 7}
							}
						});				
});	
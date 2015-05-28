//CarouFedsel
$( function(){    	
			
		//Examples of how to assign the Colorbox event to elements
		$(".group_colorbox").colorbox({rel:'group_colorbox', width:"auto", height:"90%"});		
		
		//Nivo Slide Responsive
		$('#slider').nivoSlider();	
		
		//Scrollbar
		$('.scrollbar').slimscroll({
        	height: 'auto'
      	});
		
		$('#cate1 ul').carouFredSel({
							circular: true,
							infinite: true,							
							pagination: false,
							auto 	: { pauseDuration : 3000, duration: 1000},
							prev: '#prev1',
							next: '#next1',							
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 4}
							}
						});
		
		$('#cate2 ul').carouFredSel({
							circular: true,
							infinite: true,							
							pagination: false,
							auto 	: { pauseDuration : 4000, duration: 1000},
							prev: '#prev2',
							next: '#next2',							
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 4}
							}
						});
		$('#sl_partners ul').carouFredSel({
							circular: true,
							infinite: true,							
							pagination: false,
							auto 	: { pauseDuration : 50000, duration: 1000},
							prev: '#prev_partner',
							next: '#next_partner',							
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 1}
							}
						});		
});	
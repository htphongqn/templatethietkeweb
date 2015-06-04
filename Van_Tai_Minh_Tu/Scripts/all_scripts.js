//CarouFedsel
$( function(){    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider();			
		$('#slide_partners ul').carouFredSel({
							circular: true,
							infinite: true,							
							pagination: false,
							auto 	: { pauseDuration : 4000, duration: 1000}, // fx: "crossfade"
							prev: '#prev',
							next: '#next',							
							speed: 2000,
							duration: 3000,	
							scroll	: {
								items	: 1
								//onBefore: function( data ) {
				                    //$('#slide_services').not(data.items.visible[0]).find('a').animate({opacity: 0,visibility: 'hidden',bottom: 60});
				                    //$(data.items.visible[0]).find('a').animate({opacity: 1,visibility: 'visible',bottom: 40},{queue:false,duration:1000});
				                //},
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								//width: 120,
								height: "variable",
								visible: { min: 1, max: 6}
							}
						});
});	
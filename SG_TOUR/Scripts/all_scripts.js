//CarouFedsel
$( function(){    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider();
				
		$('#slide_focus_tour ul').carouFredSel({												 
					prev: '#prev',
					next: '#next',		
					auto 	: { pauseDuration : 3000, duration: 1000 },					
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 3000,	
					items: {					
						visible: {
							width: 270,
							min: 1,
							max: 4
						}
					}
				});	
		$('#slide_special_tour ul').carouFredSel({												 
					prev: '#prev1',
					next: '#next1',
					auto 	: { pauseDuration : 7000, duration: 1000 },					
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 3000,	
					items: {					
						visible: {
							width: 230,
							min: 1,
							max: 5
						}
					}
				});	
});	
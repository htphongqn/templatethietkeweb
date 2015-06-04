//CarouFedsel
$( function(){    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider();
				
		$('#slide_agents ul').carouFredSel({												 
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
							min: 1,
							max: 8
						}
					}
				});	
});	
//CarouFedsel
$( function(){    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider();
				
		$('#slide_bestselling ul').carouFredSel({												 
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
							max: 5
						}
					}
				});	
		$('.zoom-desc ul').carouFredSel({												 
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
							width: 50,
							min: 1,
							max: 3
						}
					}
				});
		$('#slide_other_products ul').carouFredSel({												 
					prev: '#prev2',
					next: '#next2',
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
							max: 4
						}
					}
				});	
});	
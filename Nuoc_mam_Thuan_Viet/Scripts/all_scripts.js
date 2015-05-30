//CarouFedsel
$( function(){    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider();
				
		$('#slide_cateproducts ul').carouFredSel({												 
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
					auto: false,
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 3000,	
					items: {				
						visible: {
							min: 1,
							max: 3
						}
					}
				});	
		$('#slide_products ul').carouFredSel({
					prev: '#prev2',
					next: '#next2',					
					auto: { pauseDuration: 6000, duration: 800 },					
					scroll: {
						items: 1,
						pauseOnHover: true
					},
					speed: 1500,
					duration: 3000,
					items: {						
						visible: {
							min: 1,
							max: 3
						}
					}
				});		
});	
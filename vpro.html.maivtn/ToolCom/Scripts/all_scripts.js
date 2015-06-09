//CarouFedsel
$( function(){    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider();
		
		
		
		//CarouFredSel
		$('#slide_viewed_P ul').carouFredSel({
					prev: '#prev_viewed',
					next: '#next_viewed',
					//responsive: true,
					//width: '100%',
					auto: 5000,					
					direction: 'up',
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 8000,	
					items: {
						height: 50,				
						visible: {
							min: 1,
							max: 3
						}
					}
				});	
		$('.sl_products ul').carouFredSel({					
					//responsive: true,
					//width: '100%',
					auto 	: { pauseDuration : 4000, duration: 1000 },					
					scroll : {
						items	: 5,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 3000,	
					items: {
						width: 231,					
						visible: {
							min: 1,
							max: 5
						}
					}
				});	
		$('#popular_products ul').carouFredSel({					
					prev: '#prev_tab1',
					next: '#next_tab1',
				});	
		$('#viewed_products ul').carouFredSel({					
					prev: '#prev_tab2',
					next: '#next_tab2',
				});	
		$('#liked_products ul').carouFredSel({					
					prev: '#prev_tab3',
					next: '#next_tab3',
				});	
		$('#buyed_products ul').carouFredSel({					
					prev: '#prev_tab4',
					next: '#next_tab4',
				});	
		$('#updated_products ul').carouFredSel({					
					prev: '#prev_tab5',
					next: '#next_tab5',
				});	
		$('#saleoff_products ul').carouFredSel({					
					prev: '#prev_tab6',
					next: '#next_tab6',
				});	
		
		
});	
//All Scripts
$( function()
	{    	
	
//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'clean',
				numbers_align: 'center',
				progressbar: false, 
				dots: true,
				numbers: false,
				preview: false,
				animation: 'randomSmart',
				interval: 2000
			});
	  
		//carouFredSel
		$('#slide_products ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					auto 	: { pauseDuration : 4000, duration: 1000, fx: "crossfade"},
					width: '100%',
					scroll : {
						items	: 5,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 3000,	
					items: {
						width: 240,					
						visible: {
							min: 1,
							max: 5
						}
					}
				});		
				$('.zoom-desc ul').carouFredSel({
					prev: '#prev1',
					next: '#next1',
					responsive: true,
					auto: 5000,
					//width: '100%',
					direction: 'up',
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 8000,	
					items: {
						height: 70,				
						visible: {
							min: 1,
							max: 4
						}
					}
				});	
		
	$(".zoom").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '10000'
    });
	
});
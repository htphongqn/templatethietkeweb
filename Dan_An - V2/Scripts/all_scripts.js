//All Scripts
$( function()
	{    		
		$('#ads_slide ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll : {		            	
			            pauseOnHover: true
        			},
					speed: 1500,
					duration: 4000,	
					items: {
						width: 250,					
						visible: {
							min: 1,
							max: 1
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
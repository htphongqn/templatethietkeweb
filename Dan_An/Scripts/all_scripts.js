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
					speed: 1000,
					duration: 3000,	
					items: {
						width: 300,					
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

$(document).ready(function(){
						   
//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'square',
				numbers_align: 'center',
				progressbar: false, 
				dots: false,	
				navigation: false,
				preview: false,
				animation: 'randomSmart',
				interval: 2000				
			});
						   
 	
});
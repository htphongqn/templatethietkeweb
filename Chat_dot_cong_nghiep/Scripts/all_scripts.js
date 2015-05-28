// You can also use "$(window).load(function() {"

$(document).ready(function(){
						   		   					   
//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'clean',
				numbers_align: 'center',
				progressbar: false, 
				dots: false,
				numbers: true,
				preview: false,
				animation: 'randomSmart',
				interval: 2000,
				navigation: false
			});

		//carouFredSel
		$('#pro_detail_slide ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll : {		            	
			            pauseOnHover: true
        			},
					speed: 1000,
					duration: 4000,	
					items: {
						width: 300,					
						visible: {
							min: 1,
							max: 1
						}
					}
				});	
		
	$(".zoom, .zoom_click a").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '5000'
    });
	
});

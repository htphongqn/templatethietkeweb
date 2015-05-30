//All Scripts
$(function () {

// Add a <span> to every .nav_item that has a <ul> inside
	$('#cssmenu > ul > li').prepend('<div class="mask_menu trans"></div>');	
});

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
		$('#ads_slide ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					//width: '100%',
					scroll : {		            	
			            pauseOnHover: true
        			},
					speed: 1000,
					duration: 4000,	
					items: {
						width: 300,					
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
		playSpeed: '5000'
    });
	
	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();
	 
});

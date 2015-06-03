//All Scripts
//$(function () {
// Add a <span> to every .nav_item that has a <ul> inside
	//$('#nav_menu > ul > li').prepend('<div class="mask_menu trans"></div>');	
//});

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
				interval: 4000,
				navigation: false
			});

		//carouFredSel
		$('#ads_slide ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					//responsive: true,
					//width: '100%',
					auto: 5000,					
					scroll : {	
						items	: 4,
			            pauseOnHover: true
        			},
					speed: 1500,
					duration: 3000,	
					items: {
						//width: 160,					
						visible: {
							min: 1,
							max: 5
						}
					}
				});	
	
	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();
	 
});

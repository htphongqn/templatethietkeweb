//Simply Scroll
(function($) {
	$(function() { //on DOM ready
		$("#scroller").simplyScroll({orientation:'vertical',customClass:'vert'});
	});
})(jQuery);

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

	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();
	
});
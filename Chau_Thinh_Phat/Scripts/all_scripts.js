// You can also use "$(window).load(function() {"
//Simply Scroll
(function($) {
	$(function() { //on DOM ready
		$("#scroller").simplyScroll();
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

//Support
$(window).load(function(){
var state = false;

$("#toggle-slide-button").click(function () {
    if (!state) {
        $('#map-legend').animate({width: "toggle"}, 0);		
        $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = true;
        }
    else {
          $('#map-legend').animate({width: "toggle"}, 0);		  
          $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = false;
        }
});
});

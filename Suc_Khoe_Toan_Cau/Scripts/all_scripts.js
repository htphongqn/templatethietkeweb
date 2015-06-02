//JS carousel
$(document).ready(function() {
			$('body').removeClass('no-js');
		   
		    $('#cate01, #cate02, #cate03, #cate04').carousel({
				itemsPerPage: 5,
				itemsPerTransition: 5,
				easing: 'linear',
				noOfRows: 1
			});			 
		});

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

		//carouFredSel
		$('#pro_detail_slide ul').carouFredSel({
					prev: '#prev1',
					next: '#next1',
					responsive: true,
					width: '100%',
					scroll : {		            	
			            pauseOnHover: true
        			},
					speed: 1000,
					duration: 4000,	
					items: {
						width: 400,					
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

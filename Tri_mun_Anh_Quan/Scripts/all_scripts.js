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
		$('#ads_bottom ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					auto: true,
					width: '100%',
					scroll : {		            	
			            pauseOnHover: true
        			},
					speed: 3000,
					duration: 5000,	
					items: {
						width: 200,					
						visible: {
							min: 1,
							max: 6
						}
					}
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

//Simply Scroll
(function($) {
	$(function() { //on DOM ready
		$("#scroller").simplyScroll({orientation:'vertical',customClass:'vert'});
	});
})(jQuery);
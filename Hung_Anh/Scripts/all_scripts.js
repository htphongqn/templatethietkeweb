//All Scripts
$( function()
	{    
	
// ResponsiveSlides
  $("#slider1").responsiveSlides({
	speed: 800,
	nav: true,
	speed: 500,
	timeout: 4000,
	random: true,
	namespace: "callbacks",
	before: function () {
	  $('.events').append("<li>before event fired.</li>");
	},
	after: function () {
	  $('.events').append("<li>after event fired.</li>");
	}
  }); 
  
  //Nice Scroll
  var nice = $("html").niceScroll();  // The document page (body)			
	  
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
					speed: 1000,
					duration: 4000,	
					items: {
						width: 200,					
						visible: {
							min: 1,
							max: 6
						}
					}
				});	
		
	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();			
		
});

//Simply Scroll
(function($) {
	$(function() { //on DOM ready
		$("#scroller").simplyScroll();
	});
})(jQuery);
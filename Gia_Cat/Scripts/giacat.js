//All Scripts
$( function()
	{    
		// Add a <span> to every .nav_item that has a <ul> inside	
		$('#nav > ul > li').has('ul').addClass('has-sub');		
		
// Slideshow 1
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
		
		//carouFredSel
		$('#news_home ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll : {
		            	easing: "elastic",
			            pauseOnHover: true
        			},
					speed: 1000,
					duration: 4000,	
					
					items: {
						width: 235,					
						visible: {
							min: 1,
							max: 4
						}
					}
				});				
		$('#ads_slide ul').carouFredSel({
					prev: '#prev1',
					next: '#next1',
					responsive: true,
					width: '100%',					
					scroll : {		            	
			            pauseOnHover: true
        			},
					speed: 1500,
					duration: 5000,	
					items: {
						width: 145,					
						visible: {
							min: 1,
							max: 7
						}
					}
				});	
		
	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();

});
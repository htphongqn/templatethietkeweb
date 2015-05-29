//All Scripts
$( function()
	{    	
	
// Slideshow 4
      $("#slider1").responsiveSlides({
        auto: true,
        pager: true,
		pagination: true,
        nav: false,
        speed: 500,
		timeout: 3000,
        namespace: "callbacks",
        before: function () {
          $('.events').append("<li>before event fired.</li>");
        },
        after: function () {
          $('.events').append("<li>after event fired.</li>");
        }
      });
	  
		//carouFredSel
		$('#ads_bottom ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					auto: true,
					width: '100%',
					scroll : {
						items	: 4,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 4000,	
					items: {
						width: 200,					
						visible: {
							min: 1,
							max: 4
						}
					}
				});		
				$('.zoom-desc ul').carouFredSel({
					prev: '#prev1',
					next: '#next1',
					responsive: true,
					auto: 5000,
					//width: '100%',
					direction: 'up',
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 8000,	
					items: {
						height: 70,				
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
		playSpeed: '10000'
    });
	
});
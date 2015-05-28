//CarouFedsel
$( function(){    
			
		//Nivo Slide Responsive
		$('#slider').nivoSlider();
		
		//Left Menu		
		$('.m_li').bind('mouseenter', function () {
            $(this).find('.list_categories').stop(true, true).fadeIn(200);			
        }).bind('mouseleave', function () {
            $(this).find('.list_categories').stop(true, true).fadeOut(200, function () {
            });
        });       	
					
		//Carousel
		$(".carousel").carouFredSel({
			circular: true,
			infinite: false,   
			auto 	: { pauseDuration : 3000, duration: 800},
			scroll  : {
				items   : 1,
				pauseOnHover    : true,
				duration    : 800
			},
			swipe: { onMouse: true, onTouch: true},
			items: {		
				visible: { min: 1, max: 4 }								
			},																			
			prev    : {
				button  : function(){
					return $(this).parents('.sl_products').find('.prev_slide');
				},
				key     : "left"
			},
			next    : {
				button  : function(){
					return $(this).parents('.sl_products').find('.next_slide');
				},
				key     : "right"
			}
		});	
		$('#sl_logo_partner ul').carouFredSel({
					prev: '#prev_partner',
					next: '#next_partner',
					auto 	: { pauseDuration : 4000, duration: 1000},
					scroll: {
						items: 1,
						pauseOnHover: true
					},
					speed: 2000,
					duration: 3000,
					items: {
						visible: {
							min: 1,
							max: 5
						}
					}
				});
		$('.zoom-desc ul').carouFredSel({
					prev: '#prev_thumb',
					next: '#next_thumb',
					auto: false,
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 3000,	
					items: {
						//width: 50,				
						visible: {
							min: 1,
							max: 3
						}
					}
				});				
});	

$(document).ready(function () {
        $(".tab_content").hide();
        $(".tab_content:first").show();

        $("ul.tabs_menu li").click(function () {
            $("ul.tabs_menu li").removeClass("active");
            $(this).addClass("active");
            $(".tab_content").hide();
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn();
        });
    }); 
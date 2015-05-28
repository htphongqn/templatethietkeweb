//All Scripts
$( function(){    	
								
		//Nivo Slide Responsive
		$('#slider').nivoSlider();	
		
		//Gallery	   
    	var galleries = $('.ad-gallery').adGallery();	
		
		//Examples of how to assign the Colorbox event to elements
		//get height and width of window
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		//windowsize - 50px
		var windowHeightFixed = windowHeight - 50;
		var windowWidthFixed = windowWidth - 50;    
	
		$('.list_gallery_img a').lightBox({          
			maxHeight: windowHeightFixed,
			maxWidth: windowWidthFixed
		});								
				
		$('#sl_gallery ul').carouFredSel({
							circular: true,
							infinite: true,							
							pagination: false,
							auto 	: { pauseDuration : 30000, duration: 1500},
							prev: '#prev_gallery',
							next: '#next_gallery',							
							scroll	: {
								items	: 1							
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 2}
							}
						});				
		$('#sl_partners ul').carouFredSel({
							circular: true,
							infinite: true,							
							pagination: false,width: '100%', responsive: true,
							auto 	: { pauseDuration : 3000, duration: 1500},
							prev: '#prev_partner',
							next: '#next_partner',							
							scroll	: {
								items	: 3							
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 6}
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
//Scripts click Toggle
$(document).ready(function () {
							
	//Examples of how to assign the Colorbox event to elements
	$(".iframe").colorbox({iframe:true, width:"80%", height:"90%"});
	
	$('#slide_products ul').carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 5000, duration: 1000}, // fx: "crossfade"
							prev: '#prev',
							next: '#next',	
							width: '100%',
							speed: 2000,
							duration: 3000,	
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								//width: 90,
								height: "variable",
								visible: { min: 1, max: 4}
							}
						});
	//Carousel
	$("#thumblist .carousel").carouFredSel({
		circular: true,
		infinite: false,    
		auto 	: { pauseDuration : 4000, duration: 1000},
		scroll  : {
			items   : 1,
			pauseOnHover    : true,
			duration    : 1000
		},
		swipe: { onMouse: true, onTouch: true},
		items: {		
			visible: { min: 1, max: 3 }								
		},																			
		prev    : {
			button  : function(){
				return $(this).parents('#thumblist').find('.prev');
			},
			key     : "left"
		},
		next    : {
			button  : function(){
				return $(this).parents('#thumblist').find('.next');
			},
			key     : "right"
		}
	});	
	
	$('.jqzoom').jqzoom({
            zoomType: 'standard',
            lens:true,
            preloadImages: false,
            alwaysOn:false
        });		

});

$(document).ready(function () {
        $(".tab_content").hide();
        $(".tab_content:first").show();

        $("ul.TabNav li").click(function () {
            $("ul.TabNav li").removeClass("active");
            $(this).addClass("active");
            $(".tab_content").hide();
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn();
        });
		
		//Slide banner
		$('.pix_diapo').diapo();
    }); 
//All Scripts	
$(document).ready(function(){						  				   
						   
//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'square',
				numbers_align: 'center',
				progressbar: false, 
				dots: true,	
				navigation: false,
				navigation: false,
				controls: false,
				preview: false,
				animation: 'randomSmart',
				interval: 2000				
			});		

	//  Accordion Panels
    $(".menu_list:first").show();
	$(".cate_header:first").addClass("current");
    //setTimeout("$('div.menu_body').slideToggle('slow');", 1000);
    $(".cate_header").click(function () {
        $(this).next("div.menu_list").slideToggle("medium").siblings("div.menu_list:visible").slideUp("medium");
        $(this).toggleClass("current");
        $(this).siblings(".cate_header").removeClass("current");
    });	 
	$("div.menu_body:first").show();
	$("div.menu_head:first").addClass("current");
    //setTimeout("$('div.menu_body').slideToggle('slow');", 1000);
    $("p.menu_head").click(function () {
        $(this).next("div.menu_body").slideToggle("medium").siblings("div.menu_body:visible").slideUp("medium");
        $(this).toggleClass("current");
        $(this).siblings("p.menu_head").removeClass("current");
    });	
						   
		//carouFredSel
		$("#ads_bottom ul").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,							
							auto 	: { pauseDuration : 4000, duration: 1000},
							prev: '#prev',
							next: '#next',
							scroll	: {
								items	: 3								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 6}
							}
						});
		$(".thumb").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto: false,
							//auto 	: { pauseDuration : 4000, duration: 1000},
							prev: '#prev1',
							next: '#next1',
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 4}
							}
						});				
		
//Zoomin - zoomout
    hs.graphicsDir = 'Images/';
    hs.align = 'center';
    hs.transitions = ['expand', 'crossfade'];
    hs.fadeInOut = true;
    hs.dimmingOpacity = 0.8;
    hs.outlineType = 'rounded-white';
    hs.captionEval = 'this.thumb.alt';
	hs.showCredits = false;
    hs.marginBottom = 105; // make room for the thumbstrip and the controls
    //hs.numberPosition = 'caption';
    // Add the slideshow providing the controlbar and the thumbstrip
    hs.addSlideshow({
        //slideshowGroup: 'group1',
        interval: 3000,
        repeat: false,
        useControls: true,
		fixedControls: 'fit',
        overlayOptions: {
            className: 'text-controls',
            position: 'bottom center',
            relativeTo: 'viewport',
            offsetY: -60
        },
        thumbstrip: {
            position: 'bottom center',
            mode: 'horizontal',
            relativeTo: 'viewport'
        }
    });

	function showImage(o) {
    $('.thumb a').removeClass('current');
    $(o).addClass('current');
    var img = $('.inn #' + $(o).attr('for'));
    if ($('.inn a:visible').length > 0) {
        $('.inn a:visible').fadeOut('fast', function() {
            img.fadeIn('fast');
        });
    } else {
        img.fadeIn('fast');
    }
    
    	return false;
	}


    $('.thumb a').click(function() {
        showImage(this);
        return false;
    });
    $('.thumb a:first-child').click();
    $('.zoom a').click(function() {
        var o = $('.inn a:visible')[0];
        return hs.expand(o);
    });		
				  		   
});
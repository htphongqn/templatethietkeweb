$(window).load(function(){
(function ($) {
        // VERTICALLY ALIGN FUNCTION
        $.fn.vAlign = function() {
            return this.each(function(i){
            var ah = $(this).height();
            var ph = $(this).parent().height();
            var mh = Math.ceil((ph-ah) / 2);
            $(this).css('margin-top', mh);
            });
        };
    })(jQuery);
$(document).ready(function() {
    $(".product img, .pro_left .thumb img, .simply-scroll-list li img").vAlign();
});
});//]]> 

// You can also use "$(window).load(function() {"
$(function () {

// Add a <span> to every .nav_item that has a <ul> inside
	$('#cssmenu > ul > li').has('ul').prepend('<span class="arrow_down"></span>');	
	
//Support
$(".title_support").click(function () {
                $(".support_head").toggleClass("support_head_active");
            })

//Simply Scroll
		$("#scroller").simplyScroll();		

//Fancybox
	$(".zoom").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic'
    });	

//Left Menu
$('.sitenav .cataloglist li').bind('mouseenter', function () {

                $(this).find('ul.subcate, ul.subcate_detail').stop(true, true).fadeIn(200);                                
            }).bind('mouseleave', function () {
                $(this).find('ul.subcate, ul.subcate_detail').stop(true, true).fadeOut(200, function () {
                });
            });

});

$(document).ready(function(){

//Click Toggle
var notH = 1,
	$pop = $('#dpop').hover(function(){notH^=1;});
    $pop = $('ul.hidden').hover(function () { notH ^= 1; });	

            $(document).on('mouseup keyup', function (e) {
                if (notH || e.which == 27) $pop.stop().hide();
            });
            /////// CALL POPUP 
	 $('.sub_cate_hide').click(function () {
                jQuery(this).find('ul.hidden').slideDown("fast").end().siblings().find('ul.hidden').hide('fast');
                event.stopPropagation();
            });	
	 $('.search_icon').click(function(){
	$('#dpop').slideDown("fast");							 	
});	
$('.icon_close').click(function(){
	$('#dpop').slideUp("fast");							 	
});	


//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'clean',
				numbers_align: 'center',
				progressbar: false, 
				dots: false,
				numbers: false,
				preview: false,
				animation: 'randomSmart',
				interval: 2000,
				navigation: true
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

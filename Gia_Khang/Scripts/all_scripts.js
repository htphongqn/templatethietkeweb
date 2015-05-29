//All Scripts
$(function () {
			
// Add a <span> to every .nav_item that has a <ul> inside
	$('#cssmenu > ul > li').prepend('<div class="mask_menu trans"></div>');
	
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
				theme: 'square',
				numbers_align: 'center',
				progressbar: false, 
				dots: false,	
				navigation: false,
				preview: false,
				animation: 'randomSmart',
				interval: 2000				
			});						   
						   
		//carouFredSel
		$("#categories_home ul").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 4000, duration: 1000},
							prev: '#prev',
							next: '#next',
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 3}
							}
						});		
		$("#slide_dt_products ul").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: ".cataPagi",
							auto 	: { pauseDuration : 4000, duration: 1000, fx: "crossfade"},
							prev: false,
							next: false,
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 1}
							}
						});		
		
//FancyBox
$(".zoom").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '10000'
    });
			
	
    //  Accordion Panels
    //$("div.menu_body").show();
    //setTimeout("$('div.menu_body').slideToggle('slow');", 1000);
    $("#firstpane p.menu_head").click(function () {
        $(this).next("div.menu_body").slideToggle("slow").siblings("div.menu_body:visible").slideUp("slow");
        $(this).toggleClass("current");
        $(this).siblings("p.menu_head").removeClass("current");
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
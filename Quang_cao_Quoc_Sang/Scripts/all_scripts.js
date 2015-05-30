//All Scripts
$( function()
	{    	
					
		//carouFredSel
		$('#albumn ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll : {
		            	
			            pauseOnHover: true
        			},
					speed: 1000,
					duration: 4000,	
					
					items: {
						width: 250,					
						visible: {
							min: 1,
							max: 4
						}
					}
				});		
		
		$(".zoom_gallery").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '10000'
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

// Add a <span> to every .nav_item that has a <ul> inside	
	$('#mega_menu li li').has('ul.noli').addClass('menu_level2');
	
	$('.menu_icon, .close_menu').click(function () {
		$(this).parents().find('#wrap').toggleClass('tran_wp');												 
        $(this).parents().find('.fly_menu').toggleClass('active');        
    }) 
	
//Menu Footer Mobile
		$('.menu_footer_icon').click(function(){										
			$('#menu_footer_mobile > ul').slideToggle();			
		});	
	
//Flexible Slide
 $('.main-slider>.flexslider').flexslider({
								animation: "slide",
								slideshow: true,
								easing: "swing",
								slideshowSpeed: 3000,
								directionNav: false
							  });
	
//Mobile menu
$('li.cat-header ul').each(function(index) {
 $(this).prev().addClass('idCatSubcat')});
 $('li.cat-header a').after('<span></span>'); 
 $('li.cat-header ul').css('display','none');
 $('li.cat-header ul.active').css('display','block');
 $('li.cat-header ul').each(function(index) {
   $(this).prev().addClass('close').click(function() {
  if (
   $(this).next().css('display') == 'none') {
   $(this).next().slideDown(400, function () {
   $(this).prev().removeClass('collapsed').addClass('expanded');
    });
  }else {
    $(this).next().slideUp(400, function () {
   $(this).prev().removeClass('expanded').addClass('collapsed');
   $(this).find('ul').each(function() {
    $(this).hide().prev().removeClass('expanded').addClass('collapsed');
   });
    });
  }
  return false;
   });
});
	
});

//Support
$(window).load(function(){
var state = false;

$("#toggle-slide-button").click(function () {
    if (!state) {
        $('#map-legend').animate({width: "toggle"}, 200);
        $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = true;
        }
    else {
          $('#map-legend').animate({width: "toggle"}, 200);
          $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = false;
        }
});
});
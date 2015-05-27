//CarouFedsel
$( function(){    	
							
		// Slideshow 4
            $("#slider_res").responsiveSlides({
                auto: true,
                pager: false,
                nav: true,
                speed: 500,
                timeout: 3500,
                random: true,
                namespace: "callbacks",
                before: function () {
                    $('.events').append("<li>before event fired.</li>");
                },
                after: function () {
                    $('.events').append("<li>after event fired.</li>");
                }
            });
								
});	

//Scripts click Toggle
$(document).ready(function () {
							
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

           /////// CALL POPUP 
            $('.trigger').click(function () {
				$('.trigger').toggleClass("trigger_trans");	
                $('#dpop').toggleClass("search_trans");				
            }); 
			$('.close_search').click(function () {
				$('.trigger').toggleClass("trigger_trans");	
                $('#dpop').toggleClass("search_trans");
            });
			
// Add a <span> to every .nav_item that has a <ul> inside	
	$('#mega_menu li li').has('ul.noli').addClass('menu_level2');
	
	$('.menu_icon, .close_menu').click(function () {
		//$(this).parents().find('.container').toggleClass('tran_wp');												 
        $(this).parents().find('.mobile_menu').slideToggle('fast');
		$('.menu_icon').toggleClass("menu_icon_active");
    }) 
	
	
	$('#customers-caro ul').carouFredSel({
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
								visible: { min: 1, max: 6}
							}
						});
	
	$('#lightSlider').lightSlider({
				gallery:true,
				item:1,
				thumbItem:8,
				slideMargin:0,
				mode:'fade',
				auto: true,
				pause: 3000,
				loop: true,
				currentPagerPosition:'left',
				onSliderLoad: function(el) {
                	el.lightGallery();
				}        
        }); 
});
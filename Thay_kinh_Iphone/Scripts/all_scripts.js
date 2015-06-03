//All Scripts

function showContact(type) {
                $(".title-spp").css("left", "50px");
                $(".title-spp").css("opacity", 0);
                setTimeout(function () {
                    $(".container-spp").css("right", "0");
                    $(".container-spp").css("opacity", 1);
                }, 200);
                if (type == 0) {
                    $(".content-yahoo").css("opacity", 1);
                    $(".content-yahoo").css("z-index", 1);
                } else {
                    $(".content-yahoo").css("opacity", 0);
                    $(".content-yahoo").css("z-index", 0);
                }
            }

            function closeContact(type) {
                $(".container-spp").css("right", "-185px");
                //$(".content-yahoo").css("opacity", 0);

                setTimeout(function () {
                    $(".title-spp").css("left", "-35px");
                    $(".title-spp").css("opacity", 1);
                }, 200);
            } 
			
$(document).ready(function(){

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

// Add a <span> to every .nav_item that has a <ul> inside	
	$('#mega_menu li li').has('ul.noli').addClass('menu_level2');
	
	$('.menu_icon, .close_menu').click(function () {
		//$(this).parents().find('.container').toggleClass('tran_wp');												 
        $(this).parents().find('.mobile_menu').slideToggle('fast');		
    }) 
	
/////// CALL POPUP 
            $('.trigger').click(function () {
				$('.trigger').toggleClass("trigger_trans");	
                $('#dpop').toggleClass("search_trans");				
            }); 
			$('.close_search').click(function () {
				$('.trigger').toggleClass("trigger_trans");	
                $('#dpop').toggleClass("search_trans");
            });	
	
//Examples of how to assign the Colorbox event to elements
$(".group_colorbox").colorbox({rel:'group_colorbox', maxWidth:'95%', maxHeight:'95%'});
	
//Owl Carousel
		$('#owl-slidebanner').each(function(){
		if( $(this).find("div").length > 1 ) $(this).owlCarousel({
			autoplay: true,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			nav:true,
			navSpeed : 1000,
			dots : false,
			items:1,
			smartSpeed: 1000,
			loop: true,			
		  })
		});		
		$('#owl-gallery').each(function(){
		if( $(this).find("div").length > 1 ) $(this).owlCarousel({
			autoplay: true,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			nav:true,
			navSpeed : 1000,
			dots : false,
			items:1,
			smartSpeed: 1000,
			loop: true,
			animateOut: 'fadeOut'
		  })
		});			
		$('#slide_partners').each(function(){
		if( $(this).find("div").length > 1 ) $(this).owlCarousel({
			autoplay: true,
			autoplayTimeout:4000,
			autoplayHoverPause:true,
			nav:true,
			navSpeed : 1000,
			dots : false,
			smartSpeed: 1000,
			loop: true,
			items:5,
			margin: 20,
			responsive:{
					0:{items:2},
					480:{items:3},		
					980:{items:4},	
					1199:{items:5}
				}	
		  })
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
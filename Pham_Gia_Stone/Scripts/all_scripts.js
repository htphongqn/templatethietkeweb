//All Scripts
$( function()
		{    	
		// Slideshow 4
      	$("#slider1").responsiveSlides({
			auto: true,
			pager: false,
			pagination: false,
			nav: true,
			speed: 500,
			timeout: 5000,
			namespace: "callbacks",
			before: function () {
			  $('.events').append("<li>before event fired.</li>");
			},
			after: function () {
			  $('.events').append("<li>after event fired.</li>");
			}
		  });
		
		$(function() {
			$(".scroller").simplyScroll({orientation:'vertical',customClass:'vert'});
		});
		
		//carouFredSel
				$("#slide_partners ul").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 4000, duration: 1000}, // fx: "crossfade"
							prev: '#prev',
							next: '#next',
							width: '100%',
							scroll	: {
								items	: 1
								//onBefore: function( data ) {
				                    //$('#slide_services').not(data.items.visible[0]).find('a').animate({opacity: 0,visibility: 'hidden',bottom: 60});
				                    //$(data.items.visible[0]).find('a').animate({opacity: 1,visibility: 'visible',bottom: 40},{queue:false,duration:1000});
				                //},
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								//width: 214,
								height: "variable",
								visible: { min: 1, max: 5}
							}
						});
				
		$('#thumbnails_P ul').carouFredSel({
            prev: '#prev2',
            next: '#next2',
            //responsive: true,
            auto: false,
            //width: '100%',
            scroll: {
                items: 1,
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
	$('.menu_icon, .close_menu').click(function () {
		//$(this).parents().find('.container').toggleClass('tran_wp');												 
        $(this).parents().find('.mobile_menu').slideToggle('fast');        
    }) 
	
		
		function showImage(o) {
            $('#thumbnails_P li a').removeClass('current');
            $(o).addClass('current');
            var img = $('.inn #' + $(o).attr('for'));
            if ($('.inn a:visible').length > 0) {
                $('.inn a:visible').fadeOut('fast', function () {
                    img.fadeIn('fast');
                });
            } else {
                img.fadeIn('fast');
            }

            return false;
        }

        $('#thumbnails_P li a').click(function () {
            showImage(this);
            return false;
        });
        $('#thumbnails_P li:first-child a').click();

        //carouFredSel
        

        //Examples of how to assign the Colorbox event to elements
		$(".img-box").colorbox({rel:'img-box', maxWidth:'98%', maxHeight:'98%'});
 
});
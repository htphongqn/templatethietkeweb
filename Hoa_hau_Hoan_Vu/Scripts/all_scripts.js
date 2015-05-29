//All Scripts
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
	
	//Script Top Menu
		function makeTall() {
        	clearTimeout($.data(this, 'timer'));
            $('.subMenu', this).stop(true, true).slideDown(500);
		}

		function makeShort() {
        	$.data(this, 'timer', setTimeout($.proxy(function () {
	            if (!$('.subMenu', this).hasClass('subMenuBLock')) {
					$('.subMenu', this).stop(true, true).slideUp(500);
	           	}
	    	}, this), 200));
    	}

		$('.new_menu li').hoverIntent({
			over: makeTall,
	        out: makeShort
		});

//Scrollbar							
$('.scrollbar').slimscroll({
        height: 'auto'
      });

});
<!--Sap xep cot so le nhau-->
$( window ).load( function()
{    
	var columns    = 3,
	setColumns = function() { columns = $( window ).width() > 768 ? 3 : $( window ).width() > 480 ? 2 : 1; };
	setColumns();
	$( window ).resize( setColumns );	
    $('#news_post_wrap').masonry({
		itemSelector: '.post',
		//gutterWidth: 0,
		//columnWidth: 244,
		isAnimated: true,
		//layoutPriorities: {
			//shelfOrder: 1
		//},
		//animationOptions: {
    		//duration: 400
  		//},
		// set columnWidth a fraction of the container width
      	columnWidth: function( containerWidth ) {
        	return containerWidth / columns;
      	}
	});	
});

    $(document).ready(function() {
		
	$("#owl-slidebanner, #owl-slidehotnews").owlCarousel({
			autoplay: true,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			nav:true,
			navSpeed : 1000,
			dots : true,
			items:1,
			smartSpeed: 1000,
			loop: true,

      });
	  $("#owl-logo-donors").owlCarousel({
				autoplay: true,
				autoplayTimeout:3000,
				autoplayHoverPause:true,
				nav:true,
				navSpeed : 1000,
				dots : false,				
				smartSpeed: 800,
				loop: true,
				items:6,
				responsive:{
					0:{items:2},
					480:{items:3},	
					640:{items:4},	
					979:{items:5},						
					1199:{items:6}
				}																				        
      });	
	  $("#owl-candidates").owlCarousel({
				autoplay: false,
				autoplayTimeout:3000,
				autoplayHoverPause:true,
				nav:true,
				navSpeed : 500,
				dots : false,				
				smartSpeed: 500,
				loop: true,
				items:5,
				responsive:{
					0:{items:1},
					480:{items:2},
					767:{items:3},
					979:{items:4},						
					1199:{items:5}
				}											   										           
      });
$("#owl-slidemiss").owlCarousel({
			autoplay: true,
			autoplayTimeout:4000,
			autoplayHoverPause:true,
			nav:true,
			navSpeed : 1000,
			dots : false,
			items:1,
			smartSpeed: 1000,
			loop: true,					
      });
    });
	
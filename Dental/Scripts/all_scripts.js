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
	
//Owl Carousel
		$('#owl-slidebanner').each(function(){
		if( $(this).find("div").length > 1 ) $(this).owlCarousel({
			autoplay: true,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			nav:false,
			navSpeed : 1000,
			dots : true,
			items:1,
			smartSpeed: 1000,
			loop: true,
			animateOut: 'fadeOut'
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
		$('#list_service_home').each(function(){
		if( $(this).find("div").length > 1 ) $(this).owlCarousel({
			autoplay: false,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			nav:true,
			navSpeed : 1000,
			dots : false,
			smartSpeed: 1000,
			loop: true,
			items:4,
			margin: 75,
			responsive:{
					0:{items:1},
					480:{items:2},	
					767:{items:3},						
					1199:{items:4}
				}	
		  })
		});	
		$('#slide_partners').each(function(){
		if( $(this).find("div").length > 1 ) $(this).owlCarousel({
			autoplay: false,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			nav:true,
			navSpeed : 1000,
			dots : false,
			smartSpeed: 1000,
			loop: true,
			items:4,
			margin: 30,
			responsive:{
					0:{items:1},
					480:{items:2},	
					767:{items:3},						
					1199:{items:4}
				}	
		  })
		});	
		
		//Responsive Tab
		RESPONSIVEUI.responsiveTabs();
				
});

jQuery(document).ready(function ($) {
            var options = {
                $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
                $AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
                $SlideDuration: 500,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
                $DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
                $UISearchMode: 0,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).

                $ThumbnailNavigatorOptions: {
                    $Class: $JssorThumbnailNavigator$,              //[Required] Class to create thumbnail navigator instance
                    $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always

                    $Loop: 2,                                       //[Optional] Enable loop(circular) of carousel or not, 0: stop, 1: loop, 2 rewind, default value is 1
                    $SpacingX: 3,                                   //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
                    $SpacingY: 3,                                   //[Optional] Vertical space between each thumbnail in pixel, default value is 0
                    $DisplayPieces: 6,                              //[Optional] Number of pieces to display, default value is 1
                    $ParkingPosition: 204,                          //[Optional] The offset position to park thumbnail,

                    $ArrowNavigatorOptions: {
                        $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
                        $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                        $AutoCenter: 2,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                        $Steps: 6                                       //[Optional] Steps to go for each navigation request, default value is 1
                    }
                }
            };

            var jssor_slider1 = new $JssorSlider$("slider1_container", options);

            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizes
            function ScaleSlider() {
                var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
                if (parentWidth)
                    jssor_slider1.$ScaleWidth(Math.min(parentWidth, 825));
                else
                    window.setTimeout(ScaleSlider, 30);
            }
            ScaleSlider();

            $(window).bind("load", ScaleSlider);
            $(window).bind("resize", ScaleSlider);
            $(window).bind("orientationchange", ScaleSlider);
            //responsive code end
        });

$( function(){    
			
		// initialize the slideshow
            $('.main_image img').fullscreenslides();

            // All events are bound to this container element
            var $container = $('#fullscreenSlideshowContainer');

            $container
            //This is triggered once:
    .bind("init", function () {

        // The slideshow does not provide its own UI, so add your own
        // check the fullscreenstyle.css for corresponding styles
        $container
        .append('<div class="ui" id="fs-close">&times;</div>')
        .append('<div class="ui" id="fs-loader">Loading...</div>')
        .append('<div class="ui" id="fs-prev">&lt;</div>')
        .append('<div class="ui" id="fs-next">&gt;</div>')
        .append('<div class="ui" id="fs-caption"><span></span></div>');

        // Bind to the ui elements and trigger slideshow events
        $('#fs-prev').click(function () {
            // You can trigger the transition to the previous slide
            $container.trigger("prevSlide");
        });
        $('#fs-next').click(function () {
            // You can trigger the transition to the next slide
            $container.trigger("nextSlide");
        });
        $('#fs-close').click(function () {
            // You can close the slide show like this:
            $container.trigger("close");
        });

    })
            // When a slide starts to load this is called
    .bind("startLoading", function () {
        // show spinner
        $('#fs-loader').show();
    })
            // When a slide stops to load this is called:
    .bind("stopLoading", function () {
        // hide spinner
        $('#fs-loader').hide();
    })
            // When a slide is shown this is called.
            // The "loading" events are triggered only once per slide.
            // The "start" and "end" events are called every time.
            // Notice the "slide" argument:
    .bind("startOfSlide", function (event, slide) {
        // set and show caption
        $('#fs-caption span').text(slide.title);
        $('#fs-caption').show();
    })
            // before a slide is hidden this is called:
    .bind("endOfSlide", function (event, slide) {
        $('#fs-caption').hide();
    });
});	
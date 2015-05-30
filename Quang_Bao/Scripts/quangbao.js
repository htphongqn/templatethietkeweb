//All Scripts
$( function()
	{    
		// Add a <span> to every .nav_item that has a <ul> inside	
		$('#nav > ul > li').has('ul').addClass('has-sub');		
		
		//Slide banner
				var demo1 = $("#main_slider").slippry({
					transition: 'fade',
					useCSS: true,
					speed: 1000,
					pause: 3000,
					auto: true,
					preload: 'visible'
				});

				$('.stop').click(function () {
					demo1.stopAuto();
				});

				$('.start').click(function () {
					demo1.startAuto();
				});

				$('.prev').click(function () {
					demo1.goToPrevSlide();
					return false;
				});
				$('.next').click(function () {
					demo1.goToNextSlide();
					return false;
				});
				$('.reset').click(function () {
					demo1.destroySlider();
					return false;
				});
				$('.reload').click(function () {
					demo1.reloadSlider();
					return false;
				});
				$('.init').click(function () {
					demo1 = $("#main_slider").slippry();
					return false;
				});				
		
		//carouFredSel
		$('#categories_static ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll : {
		            	easing: "elastic",
			            pauseOnHover: true
        			},
					speed: 1000,
					duration: 4000,	
					
					items: {
						width: 400,					
						visible: {
							min: 1,
							max: 4
						}
					}
				});		
		
		$('#slide_products ul').carouFredSel({
					prev: '#prev1',
					next: '#next1',		
					responsive: true,
					width: '100%',
					scroll: 1,
					speed: 1500,
					duration: 5000,
					auto: false,				
					items: {
						width: 385,					
						visible: {
							min: 1,
							max: 1
						}
					}
				});
		$('#slide_brands ul').carouFredSel({
					prev: '#prev2',
					next: '#next2',		
					responsive: true,
					width: '100%',
					scroll: 1,
					speed: 1500,
					duration: 5000,
					auto: false,				
					items: {
						width: 385,					
						visible: {
							min: 1,
							max: 1
						}
					}
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
			
	//Hoidap
	$('.question').click(function() {
 
  if($(this).next().is(':hidden') != true) {
	$(this).removeClass('active'); 
    $(this).next().slideUp("normal");
  } else {
    //$('.question').removeClass('active');  
     //$('.answer').slideUp('normal');
    if($(this).next().is(':hidden') == true) {
    $(this).addClass('active');
    $(this).next().slideDown('normal');
     }   
  }
   });
 
  $('.answer').hide();
  $('.answer:first').show();
	
					
// Add a <span> to every .nav_item that has a <ul> inside	
	$('#mega_menu li li').has('ul.noli').addClass('menu_level2');
	
	$('.menu_icon, .close_menu').click(function () {
		$(this).parents().find('#wrap').toggleClass('tran_wp');												 
        $(this).parents().find('.fly_menu').toggleClass('active');        
    }) 
	
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
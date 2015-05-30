<!--Lightbox-->
$(function() {
            function launch() {
                 $('#box_lightbox').lightbox_me({centered: true, onLoad: function() { $('#box_lightbox').find('input:first').focus()}});
            }
            
            $('#lightbox_me').click(function(e) {
                $("#box_lightbox").lightbox_me({centered: true, onLoad: function() {
					$("#box_lightbox").find("input:first").focus();
				}});
				
                e.preventDefault();
            });
            
            
            $('table tr:nth-child(even)').addClass('stripe');
        });

<!--Slide Camera-->
jQuery(function(){
			jQuery('#camera_wrap_4').camera({
				loader: 'none',
				easing: 'easeInOutElastic',
				loaderStroke: 10,
				loaderPadding: 3,
				height: '37.1%',
				minHeight: '100px',
				loaderOpacity:0.7,
				loaderColor:'#717274',
				loaderBgColor:'#222222',
				pieDiameter:50,
				piePosition:'rightTop',
				barPosition:'bottom',
				barDirection:'leftToRight',
				fx:'random',
				alignment:'center',
				autoAdvance:true,
				hover:true,
				navigationHover:true,
				overlayer:true,
				time:7000,
				transPeriod:1500,
				portrait:true,
				navigation:true,
				mobileAutoAdvance:true,
				pauseOnClick:true,
				mobileNavHover:true,
				pagination:true,thumbnails:true				
			});
		});

<!--Partners Slide-->
jQuery(document).ready(function () {
            function mycarousel_initCallback(carousel) {
                // Disable autoscrolling if the user clicks the prev or next button.
                /* carousel.buttonNext.bind('click', function() {
                carousel.startAuto(0);
                });

                carousel.buttonPrev.bind('click', function() {
                carousel.startAuto(0);
                });*/

                // Pause autoscrolling if the user moves with the cursor over the clip.
                carousel.clip.hover(function () {
                    carousel.stopAuto();
                }, function () {
                    carousel.startAuto();
                });
            };
            jQuery('#sl_logo').jcarousel({
                auto: 2,
                wrap: 'circular',
                animation: 1000,
                scroll: 1,
                initCallback: mycarousel_initCallback
            });
        });

<!--Sap xep cot so le nhau-->
$( window ).load( function()
{    
	var columns    = 4,
	setColumns = function() { columns = $( window ).width() > 1000 ? 4 : $( window ).width() > 768 ? 3 : $( window ).width() > 480 ? 2 : 1; };
	setColumns();
	$( window ).resize( setColumns );	
    $('#news_post_wrap').masonry({
		itemSelector: '.item',
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

$(document).ready(function () {
	$('.icon_search').click(function () {
        $('#search_tool').fadeIn(300)
    })

    $('.search_close').click(function () {
        $('#search_tool').fadeOut(300).css('display','block');
    })		
	
	<!--Main Menu-->			
	$('.menu_icon').click(function () {
        $(this).parents().find('.fly_menu').toggleClass('active');
        $(this).parents().find('#wrap_outer').toggleClass('tran_wp');
    })    
			
	<!-- Owl Carousel Assets -->    
      $("#owl-demo").owlCarousel({
        navigation : false
      });	

	<!--Hoi dap-->
  $('.question').click(function() {
 
  if($(this).next().is(':hidden') != true) {
                $(this).removeClass('active'); 
    $(this).next().slideUp("normal");
  } else {
    $('.question').removeClass('active');  
     //$('.answer').slideUp('normal');
    if($(this).next().is(':hidden') == true) {
    $(this).addClass('active');
    $(this).next().slideDown('normal');
     }   
  }
   });
 
  $('.answer').hide();
 
  $('.expand').click(function(event)
    {$('.question').next().slideDown('normal');
        {$('.question').addClass('active');}
    }
  );
 
  $('.collapse').click(function(event)
    {$('.question').next().slideUp('normal');
        {$('.question').removeClass('active');}
    }
  );
	
	<!--Simple Slider-->
          $('#dt_project_slide').bjqs({
            height      : 305,
            width       : 534,
            responsive  : true
          });
	
});

<!--Services-->
	$(window).load(function() {
       	$('div.ser_box > div img').css('visibility','visible').css('opacity',0);
	$('div.ser_box > div img img:first').css('opacity',1);
	$('div.ser_box > div img img:last').css('opacity',1);
	$('div.ser_box > div img').delay(500);
	$('div.ser_box > div img').stop().animate({'opacity':1,'display':'inline'},2000,'swing',function(){
		$(this).delay(300).stop().animate({'opacity':1},1000);
	});
	$('div.ser_box .item1 h3, div.ser_box .item2 h3, div.ser_box .item4 h3, div.ser_box .item6 h3, div.ser_box .item7 h3').css('visibility','visible').animate({'bottom':'0','opacity':1},1000,'swing');
	$('div.ser_box .item3 h3').css('visibility','visible').animate({'bottom':'-105px','opacity':1},1000,'swing');
    });
	
<!--Fancybox-->
	$(".zoom").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic'
    });	
	
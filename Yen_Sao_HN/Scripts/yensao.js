//All Scripts
$( function()
	{
    $(".title_support").click(function () {
                $(".support_head").toggleClass("support_head_active");
            })
		//Main Menu
		/*
	Flaunt.js v1.0.0
	by Todd Motto: http://www.toddmotto.com
	Latest version: https://github.com/toddmotto/flaunt-js
	
	Copyright 2013 Todd Motto
	Licensed under the MIT license
	http://www.opensource.org/licenses/mit-license.php

	Flaunt JS, stylish responsive navigations with nested click to reveal.
*/
		// Add a <span> to every .nav_item that has a <ul> inside	
		$('#cssmenu > ul > li').has('ul').addClass('has-sub');		
	
	// Append the mobile icon nav	
		$('#nav').append($('<div class="nav_mobile"></div>'));	
		
		// Add a <span> to every .nav_item that has a <ul> inside
		$('#nav > ul > li').has('ul').prepend('<span class="nav_click"><i class="nav_arrow"></i></span>');				
		
		// Click to reveal the nav
		$('#nav .nav_mobile').click(function(){										
			$('#nav > ul').slideToggle();			
		});
	
		// Dynamic binding to on 'click'
		$('.nav_list').on('click', '.nav_click', function(){
		
			// Toggle the nested nav
			$(this).siblings('.nav_submenu').slideToggle();
			
			// Toggle the arrow using CSS3 transforms
			$(this).children('.nav_arrow').toggleClass('nav_rotate');
			
		});
				
		// Dynamic binding to on 'click'
		$('#nav > ul').on('click', '.nav_click', function(){
		
			// Toggle the nested nav
			$(this).siblings('#nav li ul').slideToggle();
			
			// Toggle the arrow using CSS3 transforms
			$(this).children('.nav_arrow').toggleClass('nav_rotate');
			
		});

		
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
			
			
			//Slide Partners
			 $("#scroller").simplyScroll();
			 
	//Fancybox
	$(".zoom").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',		
    });			 
			 
	  
	});

$(document).ready(function(){
	//carouFedSel
	var $homeNews = $('.slide_P');
					$homeNews.imagesLoaded( function(){
						if (document.body.clientWidth > 579){
							$(".slide_P").carouFredSel({
								circular: true,
								infinite: true,
								responsive: true,
								auto 	: {
									pauseDuration : 3000,
									pauseOnHover: true,
								},
								scroll	: {
									items	: 1,
								},
								prev	: ".newsNav .prev",
								next	: ".newsNav .next",
								swipe: {
									onMouse: true,
									onTouch: true
								},
								items: {
									width: 400,
									height: "variable",
									visible: {
										min: 1,
										max: 5
									}
								}
							});
						}else if (document.body.clientWidth > 380) {
							$(".slide_P").carouFredSel({
								circular: true,
								infinite: true,
								responsive: true,
								auto 	: {
									pauseDuration : 3000,
									pauseOnHover: true,
								},
								scroll	: {
									items	: 1,
								},
								prev	: ".newsNav .prev",
								next	: ".newsNav .next",
								swipe: {
									onMouse: true,
									onTouch: true
								},
								items: {
									width: 360,
									height: "variable",
									visible: {
										min: 1,
										max: 5
									}
								}
							});
						}else{ $("#carousel ul").removeClass("slide_P");}
					});
					
					//Left Menu
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
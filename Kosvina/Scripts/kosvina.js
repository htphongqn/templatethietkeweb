$(function() {		 
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
		
		// Append the mobile icon nav	
		$('#nav_menu').append($('<div class="nav_mobile"></div>'));
		$('.topnav').append($('<div class="nav_mobile"></div>'));		
		
		// Add a <span> to every .nav_item that has a <ul> inside
		$('#menu > li').has('.sub_menu').prepend('<span class="nav_click"><i class="nav_arrow"></i></span>');		
		$('.nav_item').has('.nav_submenu').prepend('<span class="nav_click"><i class="nav_arrow"></i></span>');		
		
		// Click to reveal the nav
		$('#nav_menu .nav_mobile').click(function(){										
			$('#menu').slideToggle();
		});
		$('.topnav .nav_mobile').click(function(){										
			$('.nav_list').slideToggle();			
		});
	
		// Dynamic binding to on 'click'
		$('#menu > li').on('click', '.nav_click', function(){
		
			// Toggle the nested nav
			$(this).siblings('.sub_menu').slideToggle();
			
			// Toggle the arrow using CSS3 transforms
			$(this).children('.nav_arrow').toggleClass('nav_rotate');
			
		});
				
		// Dynamic binding to on 'click'
		$('.nav_item').on('click', '.nav_click', function(){
		
			// Toggle the nested nav
			$(this).siblings('.nav_submenu').slideToggle();
			
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
			});

//Simply Scroll
(function($) {
	$(function() {
		$("#scroller").simplyScroll({
			auto: true
		});
	});
})(jQuery);

//Cycle Plugin
$(document).ready(function(){	
	$('#events_slide, #ads_slide').cycle({
		fx: 'fade',
		timeout: 4000,
		speed: 0
    });
	
	//Images Gallery
	 	$(".zoom").fancybox({
        	openEffect: 'elastic',
        	closeEffect: 'elastic'
    	});
});
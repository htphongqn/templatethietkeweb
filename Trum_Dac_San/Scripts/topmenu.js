$(function() {    
			var sticky_navigation_offset_top = $('#nav_menu_wrap').offset().top;
			var sticky_navigation = function(){
				var scroll_top = $(window).scrollTop();
				if (scroll_top > sticky_navigation_offset_top) { 
					$('#nav_menu_wrap').css({ 'position': 'fixed', 'top':0 });
				} else {
					$('#nav_menu_wrap').css({ 'position': 'relative' }); 
				}   
			};
			
			sticky_navigation();
			
			$(window).scroll(function() {
			sticky_navigation();
			});
		});// JavaScript Document
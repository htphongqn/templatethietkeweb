$(function() {    
			var sticky_navigation_offset_top = $('#smoothmenu1').offset().top;
			var sticky_navigation = function(){
				var scroll_top = $(window).scrollTop();
				if (scroll_top > sticky_navigation_offset_top) { 
					$('#smoothmenu1').css({ 'position': 'fixed', 'top':0 });
				} else {
					$('#smoothmenu1').css({ 'position': 'absolute', 'left':10, 'bottom':10 }); 
				}   
			};
			
			sticky_navigation();
			
			$(window).scroll(function() {
			sticky_navigation();
			});
		});// JavaScript Document
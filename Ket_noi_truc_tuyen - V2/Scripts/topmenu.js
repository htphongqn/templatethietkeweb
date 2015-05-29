$(function() {    
			var sticky_navigation_offset_top = $('#left_fix_side').offset().top;
			var sticky_navigation = function(){
				var scroll_top = $(window).scrollTop();
				if (scroll_top > sticky_navigation_offset_top) { 
					$('#left_fix_side').css({ 'position': 'fixed', 'top':0 });
				} else {
					$('#left_fix_side').css({ 'position': 'fixed', 'top':200 }); 
				}   
			};
			
			sticky_navigation();
			
			$(window).scroll(function() {
			sticky_navigation();
			});
		});// JavaScript Document
$(function() {    
			var block_menu_main_offset_top = $('#block_menu').offset().top;
			var block_menu_main = function(){
				var scroll_top = $(window).scrollTop();
				if (scroll_top > block_menu_main_offset_top) { 
					$('#block_menu').css({ 'position': 'fixed', 'top':0 });
				} else {
					$('#block_menu').css({ 'position': 'relative' }); 
				}   
			};
			
			block_menu_main();
			
			$(window).scroll(function() {
			block_menu_main();
			});
		});// JavaScript Document

 
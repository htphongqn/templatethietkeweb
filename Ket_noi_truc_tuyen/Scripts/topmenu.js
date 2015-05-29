$(function() {    
			var sticky_navigation_offset_top = $('#sticky_navigation').offset().top;
			var sticky_navigation = function(){
				var scroll_top = $(window).scrollTop();
				if (scroll_top > sticky_navigation_offset_top) { 
					$('#sticky_navigation').css({ 'position': 'fixed', 'top':0 });
					$("#sticky_navigation .search").css ({ 'display': 'block' });
				} else {
					$('#sticky_navigation').css({ 'position': 'relative' }); 
					$('#sticky_navigation .search').css({ 'display': 'none' });
				}   
			};
			
			sticky_navigation();
			
			$(window).scroll(function() {
			sticky_navigation();
			});
		});// JavaScript Document
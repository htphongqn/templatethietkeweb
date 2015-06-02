/*
	Flaunt.js v1.0.0
	by Todd Motto: http://www.toddmotto.com
	Latest version: https://github.com/toddmotto/flaunt-js
	
	Copyright 2013 Todd Motto
	Licensed under the MIT license
	http://www.opensource.org/licenses/mit-license.php

	Flaunt JS, stylish responsive navigations with nested click to reveal.
*/
;(function($) {

	// DOM ready
	$(function() {
		
		// Append the mobile icon nav
		$('#topnav').append($('<div class="nav_mobile"></div>'));
		
		// Add a <span> to every .nav_item that has a <ul> inside
		$('.nav_item').has('ul').prepend('<span class="nav_click"><i class="nav_arrow"></i></span>');
		$('.nav_submenu_item').has('ul.nav_submenu_lv3').prepend('<span class="nav_click"><i class="nav_arrow"></i></span>');
		
		// Click to reveal the nav
		$('.nav_mobile').click(function(){
			$('.nav_list').slideToggle();			
		});
	
		// Dynamic binding to on 'click'
		$('.nav_list').on('click', '.nav_click', function(){
		
			// Toggle the nested nav
			$(this).siblings('.nav_submenu').slideToggle();
			$(this).siblings('.nav_submenu_lv3').slideToggle();
			
			// Toggle the arrow using CSS3 transforms
			$(this).children('.nav_arrow').toggleClass('nav_rotate');
			
		});
	    
	});
	
})(jQuery);
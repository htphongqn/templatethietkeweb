// You can also use "$(window).load(function() {"
$(function () {

// Add a <span> to every .nav_item that has a <ul> inside
	$('#cssmenu > ul > li').prepend('<div class="mask_menu trans"></div>');
	$('#cssmenu > ul > li').has('ul').prepend('<span class="arrow_down"></span>');	
	
});

$(document).ready(function(){
						   		   					   
//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'clean',
				numbers_align: 'center',
				progressbar: false, 
				dots: true,
				numbers: false,
				preview: false,
				animation: 'randomSmart',
				interval: 2000,
				navigation: false
			});
	
});

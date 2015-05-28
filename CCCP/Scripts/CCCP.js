// You can also use "$(window).load(function() {"
$(function () {

// Nivo Slider
  $('#slider').nivoSlider();
  
// Add a <span> to every .nav_item that has a <ul> inside	
	$('#cssmenu > ul > li').has('ul').addClass('has-sub');		
	
});

$(document).ready(function(){
    $("a[rel^='prettyPhoto']").prettyPhoto({
		overlay_gallery: false,
		social_tools:false,
		opacity:0.6,
		
		});
  });


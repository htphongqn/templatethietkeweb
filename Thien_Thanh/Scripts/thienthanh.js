// You can also use "$(window).load(function() {"
$(function () {

// Slideshow 1
  $("#slider1").responsiveSlides({
	speed: 800,
	nav: true,
	namespace: "callbacks",
	before: function () {
	  $('.events').append("<li>before event fired.</li>");
	},
	after: function () {
	  $('.events').append("<li>after event fired.</li>");
	}
  });
  
// Add a <span> to every .nav_item that has a <ul> inside
	$('#cssmenu > ul > li').has('ul').prepend('<span class="arrow_down"></span>');	

//Gallery	   
    var galleries = $('.ad-gallery').adGallery();
	
	//Fancybox
	$(".zoom").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic'
    });

});
// You can also use "$(window).load(function() {"
$(function () {
//Vertical Scrollbox
 $('#news_home').scrollbox({
    linear: true,
    step: 1,
    delay: 0,
    speed: 30
  });  
  var queueNext = 7;
  (function () {
    $('#demo6-queue ul').append('<li><p>'+ queueNext +'</p></li>');
    queueNext++;
    setTimeout(arguments.callee, 2000 + parseInt(Math.random() * 2000, 10));
  }());			

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

});
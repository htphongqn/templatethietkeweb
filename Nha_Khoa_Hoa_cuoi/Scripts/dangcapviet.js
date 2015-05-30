<!--Vertical Slide-->
$(function () {
	        $('#customers_idea').vTicker({showItems: 1});
	    });
//Main Menu
$( function()
	{
		$( '#nav li:has(ul)' ).doubleTapToGo();
		
		// Slideshow 4
      $("#slider4").responsiveSlides({
        auto: true,
        pager: false,
        nav: true,
        speed: 500,
        namespace: "callbacks",
        before: function () {
          $('.events').append("<li>before event fired.</li>");
        },
        after: function () {
          $('.events').append("<li>after event fired.</li>");
        }
      });
	  
	});
//Slide banner
		jQuery(document).ready(function(){
			jQuery('#SKDSlider').skdslider({'delay':4000, 'animationSpeed': 1000,'showNextPrev':true,'showPlayButton':false,'autoSlide':true,'animationType':'fading'});
		});

//Vertical Menu
$(window).load(function(){
$('#topnav li a').mouseover(function(){
    //show the box
    $(this).children('.info_cate').stop().css("display","block");
});

$('#topnav li a').mouseleave(function(){
    //hide the box	
    $(this).children('.info_cate').stop().css("display","none");
});
}); 
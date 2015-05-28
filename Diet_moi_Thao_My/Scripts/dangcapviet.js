
$( function()
	{
		//Main Menu
		$( '#nav li:has(ul)' ).doubleTapToGo();		
		$('#nav > ul > li').has('ul').prepend('<span class="nav_click"><i class="nav_arrow"></i></span>');
		// Dynamic binding to on 'click'
		$('ul.MenuBarHorizontal').on('click', '.nav_click', function(){
		
			// Toggle the nested nav
			$(this).siblings('#nav li ul').slideToggle();
			
			// Toggle the arrow using CSS3 transforms
			$(this).children('.nav_arrow').toggleClass('nav_rotate');
			
		});
		
		//Slide banner
				var demo1 = $("#main_slider").slippry({
					transition: 'fade',
					useCSS: true,
					speed: 1000,
					pause: 3000,
					auto: true,
					preload: 'visible'
				});

				$('.stop').click(function () {
					demo1.stopAuto();
				});

				$('.start').click(function () {
					demo1.startAuto();
				});

				$('.prev').click(function () {
					demo1.goToPrevSlide();
					return false;
				});
				$('.next').click(function () {
					demo1.goToNextSlide();
					return false;
				});
				$('.reset').click(function () {
					demo1.destroySlider();
					return false;
				});
				$('.reload').click(function () {
					demo1.reloadSlider();
					return false;
				});
				$('.init').click(function () {
					demo1 = $("#main_slider").slippry();
					return false;
				});		
	  
	});

$(document).ready(function () {
	<!-- Owl Carousel Assets -->    
      $("#owl-demo").owlCarousel({
        navigation : true
      });	   
});	

//Support
$(window).load(function(){
var state = false;

$("#toggle-slide-button").click(function () {
    if (!state) {
        $('#map-legend').animate({width: "toggle"}, 200);
        $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = true;
        }
    else {
          $('#map-legend').animate({width: "toggle"}, 200);
          $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = false;
        }
});
});

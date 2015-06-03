//All Scripts
$( function()
	{    
	
// ResponsiveSlides
  $("#slider1").responsiveSlides({
	speed: 800,
	nav: true,
	speed: 500,
	timeout: 4000,
	random: true,
	namespace: "callbacks",
	before: function () {
	  $('.events').append("<li>before event fired.</li>");
	},
	after: function () {
	  $('.events').append("<li>after event fired.</li>");
	}
  }); 
  
//Click Toggle
var notH = 1,
	$pop = $('#dpop').hover(function(){notH^=1;});
    $pop = $('#dpop_sp_order').hover(function () { notH ^= 1; });	

            $(document).on('mouseup keyup', function (e) {
                if (notH || e.which == 27) $pop.stop().hide();
            });
            /////// CALL POPUP 	 
	 $('.search_icon').click(function(){
	$('#dpop').slideDown("fast");							 	
});	
	 
$('.icon_close').click(function(){
	$('#dpop').slideUp("fast");							 	
});	 
		
});

//Support
$(window).load(function(){
var state = false;

$("#toggle-slide-button").click(function () {
    if (!state) {
        $('#map-legend').animate({width: "toggle"}, 0);	
        $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = true;
        }
    else {
          $('#map-legend').animate({width: "toggle"}, 0);		  
          $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = false;
        }
});
});
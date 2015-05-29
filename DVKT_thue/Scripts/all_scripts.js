//All Scripts

$(document).ready(function(){
				  		   
//Mobile menu
$('li.cat-header ul').each(function(index) {
 $(this).prev().addClass('idCatSubcat')});
 $('li.cat-header a').after('<span></span>'); 
 $('li.cat-header ul').css('display','none');
 $('li.cat-header ul.active').css('display','block');
 $('li.cat-header ul').each(function(index) {
   $(this).prev().addClass('close').click(function() {
  if (
   $(this).next().css('display') == 'none') {
   $(this).next().slideDown(400, function () {
   $(this).prev().removeClass('collapsed').addClass('expanded');
    });
  }else {
    $(this).next().slideUp(400, function () {
   $(this).prev().removeClass('expanded').addClass('collapsed');
   $(this).find('ul').each(function() {
    $(this).hide().prev().removeClass('expanded').addClass('collapsed');
   });
    });
  }
  return false;
   });
});
 
// Add a <span> to every .nav_item that has a <ul> inside	
	$('#mega_menu li li').has('ul.noli').addClass('menu_level2');
	
	$('.menu_icon, .close_menu').click(function () {
		 $(this).parents().find('.fly_menu').toggleClass('active');
        $(this).parents().find('#page_wrap').toggleClass('tran_wp');     
    }) 
	 
	//Nivo Slide Responsive
	$('#slider').nivoSlider();	
	
//carouFredSel
		$("#carouFedsel_logo").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 3000, duration: 800}, // fx: "crossfade"
							prev: '#prev',
							next: '#next',
							scroll	: {
								items	: 2
								//onBefore: function( data ) {
				                    //$('#slide_services').not(data.items.visible[0]).find('a').animate({opacity: 0,visibility: 'hidden',bottom: 60});
				                    //$(data.items.visible[0]).find('a').animate({opacity: 1,visibility: 'visible',bottom: 40},{queue:false,duration:1000});
				                //},
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								width: 178,
								height: "variable",
								visible: { min: 1, max: 5}
							}
						});									
 
});

//Support
$(window).load(function(){
var state = false;

$("#toggle-slide-button").click(function () {
    if (!state) {
        $('#map-legend').animate({width: "toggle"}, 0);		
        $('#toggle-slide-button img').attr('src', 'Images/red_close_icon.png');

          state = true;
        }
    else {
          $('#map-legend').animate({width: "toggle"}, 0);		  
          $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = false;
        }
});
});
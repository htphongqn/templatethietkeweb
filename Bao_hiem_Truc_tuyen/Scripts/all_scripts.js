//All Scripts
$(function () {

// Add a <span> to every .nav_item that has a <ul> inside
	$('#cssmenu > ul > li').prepend('<div class="mask_menu trans"></div>');
	$('#cssmenu li').has('ul').addClass('has-sub');	
	
});

$(document).ready(function(){
						   
//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'square',
				numbers_align: 'center',
				progressbar: false, 
				dots: false,	
				navigation: false,
				preview: false,
				animation: 'randomSmart',
				interval: 2000				
			});						   
						   
		//carouFredSel
		$("#slide_products").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 4000, duration: 1000, fx: "crossfade"},
							prev: '#prev',
							next: '#next',
							scroll	: {
								items	: 1,
								onBefore: function( data ) {
				                    $('#slide_services').not(data.items.visible[0]).find('a').animate({opacity: 0,visibility: 'hidden',bottom: 60});
				                    $(data.items.visible[0]).find('a').animate({opacity: 1,visibility: 'visible',bottom: 40},{queue:false,duration:1000});
				                },
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 4}
							}
						});						   
				  		   
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
 
});

//Support
$(window).load(function(){
var state = false;

$("#toggle-slide-button").click(function () {
    if (!state) {
        $('#map-legend').animate({width: "toggle"}, 50);		
        $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = true;
        }
    else {
          $('#map-legend').animate({width: "toggle"}, 50);		  
          $('#toggle-slide-button img').attr('src', 'Images/support_icon.png');

          state = false;
        }
});
});
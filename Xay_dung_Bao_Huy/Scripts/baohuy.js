// You can also use "$(window).load(function() {"
$(function () {

// Add a <span> to every .nav_item that has a <ul> inside
	$('#cssmenu > ul > li').prepend('<div class="mask_menu trans"></div>');
	$('#cssmenu li').has('ul').addClass('has-sub');	
	
});

//Camera Slider
jQuery(function(){
			
			jQuery('#camera_wrap_4').camera({
				height: '500px',
            	loader: 'none',
            	pagination: false,
            	thumbnails: false,
            	hover: false,
            	pauseOnClick: false,
            	playPause: false,
            	opacityOnGrid: false,
            	time: 5000,
            	transPeriod: 1200,
			});

		});

$(document).ready(function(){

//Click Toggle
var notH = 1,
	$pop = $('#dpop').hover(function(){notH^=1;});
    $pop = $('ul.hidden').hover(function () { notH ^= 1; });	

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
  
//Left Menu
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
	
	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();	
	
	//carouFedSel
	var $homeNews = $('.projectSlide');
					$homeNews.imagesLoaded( function(){
						if (document.body.clientWidth > 579){
							$(".projectSlide").carouFredSel({
								circular: true,
								infinite: true,
								responsive: true,
								auto 	: {
									pauseDuration : 5000,
									pauseOnHover: true,
								},
								scroll	: {
									items	: 1,
								},
								prev	: ".newsNav .prev",
								next	: ".newsNav .next",
								swipe: {
									onMouse: true,
									onTouch: true
								},
								items: {
									width: 280,
									height: "variable",
									visible: {
										min: 1,
										max: 5
									}
								}
							});
						}else if (document.body.clientWidth > 380) {
							$(".projectSlide").carouFredSel({
								circular: true,
								infinite: true,
								responsive: true,
								auto 	: {
									pauseDuration : 5000,
									pauseOnHover: true,
								},
								scroll	: {
									items	: 1,
								},
								prev	: ".newsNav .prev",
								next	: ".newsNav .next",
								swipe: {
									onMouse: true,
									onTouch: true
								},
								items: {
									width: 360,
									height: "variable",
									visible: {
										min: 1,
										max: 5
									}
								}
							});
						}else{ $("#projects_home ul").removeClass("projectSlide");}
					});
	
});

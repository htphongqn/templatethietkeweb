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
		//$(this).parents().find('.container').toggleClass('tran_wp');												 
        $(this).parents().find('.mobile_menu').slideToggle('fast');        
    }) 
	 
	//Nivo Slide Responsive
	$('#slider').nivoSlider();	

	//carouFedSel
	var $homeNews = $('.slide_channels');
					$homeNews.imagesLoaded( function(){
						if (document.body.clientWidth > 579){
							$(".slide_channels").carouFredSel({
								circular: true,
								infinite: true,
								responsive: true,
								auto 	: {
									speed: 2000,
									pauseDuration : 4000,
									pauseOnHover: true,
								},
								scroll	: {
									items	: 1,
								},
								prev	: ".slideNav .prev",
								next	: ".slideNav .next",
								swipe: {
									onMouse: true,
									onTouch: true
								},
								items: {
									width: 160,
									height: "variable",
									visible: {
										min: 1,
										max: 6
									}
								}
							});
						}else if (document.body.clientWidth > 380) {
							$(".slide_channels").carouFredSel({
								circular: true,
								infinite: true,
								responsive: true,
								auto 	: {
									pauseDuration : 3000,
									pauseOnHover: true,
								},
								scroll	: {
									items	: 1,
								},
								prev	: ".slideNav .prev",
								next	: ".slideNav .next",
								swipe: {
									onMouse: true,
									onTouch: true
								},
								items: {
									width: 160,
									height: "variable",
									visible: {
										min: 1,
										max: 6
									}
								}
							});
						}else{ $("#carousel_channels ul").removeClass("slide_channels");}
					});	
	
	//carouFedSel
	var $homeNews = $('.slide_topnews');
					$homeNews.imagesLoaded( function(){
						if (document.body.clientWidth > 579){
							$(".slide_topnews").carouFredSel({
								circular: true,
								infinite: true,
								responsive: true,
								auto 	: {
									speed: 2000,
									pauseDuration : 4000,
									pauseOnHover: true,
								},
								scroll	: {
									items	: 1,
								},							
								swipe: {
									onMouse: true,
									onTouch: true
								},
								items: {
									width: 180,
									height: "variable",
									visible: {
										min: 1,
										max: 4
									}
								}
							});
						}else if (document.body.clientWidth > 380) {
							$(".slide_topnews").carouFredSel({
								circular: true,
								infinite: true,
								responsive: true,
								auto 	: {
									pauseDuration : 3000,
									pauseOnHover: true,
								},
								scroll	: {
									items	: 1,
								},								
								swipe: {
									onMouse: true,
									onTouch: true
								},
								items: {
									width: 180,
									height: "variable",
									visible: {
										min: 1,
										max: 4
									}
								}
							});
						}else{ $("#carousel_topnews ul").removeClass("slide_topnews");}
					});						
 
});
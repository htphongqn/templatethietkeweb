//All Scripts
$( function()
	{    	
	
//Sidebar Click
$('.box_Tab_l:first').prepend('<span class="click_Tab" id="l_Tab"></span>')
$("#l_Tab").click(function(){
	$('#l_Tab').addClass('close_tab');	
    var div = $(this).next("#topnav");
    $("#topnav").slideToggle("slow");   
	$('#l_Tab').removeClass('close_tab');	
  });
$('#topnav > ul > li').has('ul').prepend('<span class="click_Tab" id="tab_sub"></span>');	
$("#tab_sub").click(function(){
	$('#tab_sub').addClass('close_tab');
    var div = $(this).next("#topnav");
    $("#topnav ul ul").slideToggle("slow");   
	$('#tab_sub').removeClass('close_tab');	
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
		
		//carouFredSel
		//	Fluid layout example 1, resizing the items
				$('#slide_news').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll: 2,
					speed: 1000,
					duration: 4000,					
					items: {
						width: 300,					
						visible: {
							min: 1,
							max: 4
						}
					}
				});	

	//Fancybox
	$(".zoom").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',	
		autoPlay: 'true',
		playSpeed: 3000
    });		
	  	  
	});

$(document).ready(function(){

// Add a <span> to every .nav_item that has a <ul> inside	
	$('#mega_menu li li').has('ul.noli').addClass('menu_level2');
	
	$('.menu_icon, .close_menu').click(function () {
		$(this).parents().find('.container').toggleClass('tran_wp');												 
        $(this).parents().find('.fly_menu').toggleClass('active');        
    }) 
	
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
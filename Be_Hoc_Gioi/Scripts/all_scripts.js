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
$('.support_order_button').click(function(){
	$('#dpop_sp_order').slideDown("fast");							 	
});	
$('.icon_close_order').click(function(){
	$('#dpop_sp_order').hide("fast");							 	
});	 
 
// Add a <span> to every .nav_item that has a <ul> inside	
	$('#mega_menu li li').has('ul.noli').addClass('menu_level2');
	
	$('.menu_icon, .close_menu').click(function () {
		$(this).parents().find('#page_wrap').toggleClass('tran_wp');												 
        $(this).parents().find('.fly_menu').toggleClass('active');        
    }) 
	
//Menu Footer Mobile
		$('.menu_footer_icon').click(function(){										
			$('#menu_footer_mobile > ul').slideToggle();			
		});	
 
	//Nivo Slide Responsive
	$('#slider').nivoSlider();		
 
});

$( function()
	{    	
	
		//carouFredSel
		$('#pro_detail_slide ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll : {		            	
			            pauseOnHover: true
        			},
					speed: 1000,
					duration: 4000,	
					auto 	: { pauseDuration : 3000, duration: 1000, fx: "crossfade"},
					items: {
						width: 400,					
						visible: {
							min: 1,
							max: 1
						}
					}
				});	
		
	$(".zoom").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '10000'
    });
	
	$(".zoom_gallery").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '3000'
    });	
	
});
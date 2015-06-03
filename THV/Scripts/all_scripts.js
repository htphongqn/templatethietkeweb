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
		//$(this).parents().find('#page_wrap').toggleClass('tran_wp');												 
        $(this).parents().find('.fly_menu').slideToggle('fast');        
    }) 
 
	//Nivo Slide Responsive
	$('#slider').nivoSlider();
						   
	//Cycle Plugin						   
	$('#slide_hotnews').cycle({timeout: 3000});
	$('#dt_project_slide').after('<div id="nav_ctr" class="nav_ctr">').cycle({
																			 timeout: 4000,
																			 pager:  '#nav_ctr',
																			 fx: 'scrollHorz'});
	
	//SimplyScroll
	$('#slide_partners').simplyScroll({
			frameRate: 75,
			auto: true,
			startOnLoad: true
		});
	
	//Width Group News
	w = $('.group_news').width();
	h = $('.group_news').height();
	$('#slide_hotnews').css('width', w);
	$('#hotnews_inner').css('height', h); 
 
});
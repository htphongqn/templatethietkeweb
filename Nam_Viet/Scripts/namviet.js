//Cycle Plugin
$(document).ready(function(){
	$('#most_viewed_post').cycle({
                timeout: 3000,
				next:   '#next_slide', 
    			prev:   '#prev_slide'
            });

$('.bxslider').bxSlider({
  pagerCustom: '#bx-pager',
  auto: true,
});


});

// You can also use "$(window).load(function() {"
$(function () {
			
// Add a <span> to every .nav_item that has a <ul> inside
	$('#cssmenu > ul > li').prepend('<div class="mask_menu trans"></div>');
	$('#cssmenu li').has('ul').addClass('has-sub');	
	
//Fancybox
	$(".zoom").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic'
    });	
	
var h = $('.news_item').height();
$('#most_viewed_post').css('height', h);		
	
});


//Left Menu
$(document).ready(function() {
						   
//Left Categories
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
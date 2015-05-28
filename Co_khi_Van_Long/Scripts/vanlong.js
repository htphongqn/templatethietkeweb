// You can also use "$(window).load(function() {"
$(function () {

// Add a <span> to every .nav_item that has a <ul> inside
	$('#cssmenu > ul > li').has('ul').prepend('<span class="arrow_down"></span>');	
	
	//Fancybox
	$(".zoom").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic'
    });

});

$(document).ready(function(){
						   		   					   
//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'clean',
				numbers_align: 'center',
				progressbar: false, 
				dots: true,
				numbers: false,
				preview: false,
				animation: 'randomSmart',
				interval: 2000,
				navigation: false
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
 
});

//CarouFredSel
$(function() {
				$('#carousel').carouFredSel({
					width: '100%',
					items: {
						visible: 4,
						start: -1
					},
					scroll: {
						items: 1,
						duration: 1000,
						timeoutDuration: 4000
					},
					prev: '#prev',
					next: '#next',
					pagination: {
						container: '#pager',
						deviation: 1
					}
				});
			});

//Load Index
$(window).load(function() {
    $('#carousel .item_P h3').css('visibility','visible').css('opacity',0);		
	$('#carousel .item_P h3').stop().animate({'opacity':1,'display':'inline'},0,'swing',function(){
		$(this).delay(300).stop().animate({'opacity':1, 'bottom':0},1000);
	});	
    });


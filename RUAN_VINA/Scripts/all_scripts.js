//All Scripts
$(function(){
	$('.mBanner').mBanner({width:250, height:220});
	$('.mBanner1').mBanner({width:250, height:265});
});

$(document).ready(function(){

//Click Toggle
$(".icon_link_web").click(function(){
    		$("#list_link_web").slideToggle();
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
 
//Nice Scroll 
var nice = $("html").niceScroll();  // The document page (body)		
            $('#header').niceScroll();
 
});
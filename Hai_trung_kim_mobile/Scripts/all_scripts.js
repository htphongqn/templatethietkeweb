$(document).ready(function () {	
							
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
	
	$('.menu_icon').click(function () {
        $(this).parents().find('.fly_menu').toggleClass('active');
        $(this).parents().find('#wrap_outer').toggleClass('tran_wp');		  
    })   
	
		
	$('.mobile_menu .main_nav>ul>li>ul').hide(); 	

    $('.mobile_menu .main_nav>ul.nav>li>span').click(function(e) {
        $('.mobile_menu .main_nav ul ul').slideUp('normal'); 		

     // if the moreInfo div is a sibling of the li
        if($(this).next().is(':hidden') == true) {
          $(this).next().slideDown('normal').siblings('.mobile_menu .main_nav>ul.nav>li>span').addClass('active');
		} else {
		  $(this).next().slideUp('normal').siblings('.mobile_menu .main_nav>ul.nav>li>span').removeClass('active');			  
        }     			
    });
	
	$('.close_menu').click(function () {
        $(this).parents().find('.fly_menu').toggleClass('active');
        $(this).parents().find('#wrap_outer').toggleClass('tran_wp');
    })		
		
	
});
//Function
$( function()
	{	
		
		// Slideshow 4
      $("#slider4").responsiveSlides({
        auto: true,
        pager: false,
		pagination: true,
        nav: true,
        speed: 500,
		timeout: 3000,
        namespace: "callbacks",
        before: function () {
          $('.events').append("<li>before event fired.</li>");
        },
        after: function () {
          $('.events').append("<li>after event fired.</li>");
        }
      });	  
});

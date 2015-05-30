//All Scripts
$( function()
	{    
		// Add a <span> to every .nav_item that has a <ul> inside	
		$('#cssmenu > ul > li').has('ul').addClass('has-sub');		
	  	  
	});

           function showContact(type) {
                $(".title-contact").css("left", "0");
                $(".title-contact").css("opacity", 0);
                setTimeout(function () {
                    $(".container-contact-us").css("right", "-1px");
                    $(".container-contact-us").css("opacity", 1);
                }, 200);
                if (type == 0) {
                    $(".content-yahoo").css("opacity", 1);
                    $(".content-yahoo").css("z-index", 1);
                    $(".content-facebook").css("opacity", 0);
                    $(".content-facebook").css("z-index", 0);
                } else {
                    $(".content-facebook").css("opacity", 1);
                    $(".content-facebook").css("z-index", 1);
                    $(".content-yahoo").css("opacity", 0);
                    $(".content-yahoo").css("z-index", 0);
                }
            }

            function closeContact(type) {
                $(".container-contact-us").css("right", "-231px");
                $(".content-yahoo").css("opacity", 0);
                $(".content-facebook").css("opacity", 0);

                setTimeout(function () {
                    $(".title-contact").css("left", "-37px");
                    $(".title-contact").css("opacity", 1);
                }, 400);
            }

$(document).ready(function(){
						   
//Click Toggle
var notH = 1,
	$pop = $('#dpop').hover(function(){notH^=1;});
    $pop = $('ul.hidden').hover(function () { notH ^= 1; });	

            $(document).on('mouseup keyup', function (e) {
                if (notH || e.which == 27) $pop.stop().hide();
            });
            /////// CALL POPUP 
	 $('.sub_cate_hide').click(function () {
                jQuery(this).find('ul.hidden').slideDown("fast").end().siblings().find('ul.hidden').hide('fast');
                event.stopPropagation();
            });	
	 $('.search_icon').click(function(){
	$('#dpop').slideDown("fast");							 	
});	
$('.icon_close').click(function(){
	$('#dpop').slideUp("fast");							 	
});										   

//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'clean',
				numbers_align: 'center',
				progressbar: false, 
				dots: true,				
				preview: false,
				animation: 'randomSmart',
				interval: 2000				
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

//Function
$(function() {
		   
	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();
	
  });	
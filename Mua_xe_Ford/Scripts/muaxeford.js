//All Scripts
$( function()
	{    
		// Add a <span> to every .nav_item that has a <ul> inside	
		$('#cssmenu > ul > li').has('ul').addClass('has-sub');		
					  	  
	});

$(document).ready(function(){

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
//All Scripts
$( function()
	{    
	var w = $('.container').width();
	var w_l = $('#sidebar').width();
	$('#main_content').css('width', w - w_l);	
	
		//carouFredSel
		$('#list_projects ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll : {		            	
			            pauseOnHover: true
        			},
					speed: 1500,
					duration: 4000,	
					items: {
						width: 300,					
						visible: {
							min: 1,
							max: 2
						}
					}
				});	
		//carouFredSel
		$('#list_news ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll : {		            	
			            pauseOnHover: true
        			},
					auto: false,
					speed: 1500,
					duration: 4000,	
					items: {
						width: 600,					
						visible: {
							min: 1,
							max: 1
						}
					}
				});			
		
	// Trigger maximage
				jQuery('#maximage').maximage();		
  	  
});

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
 
});
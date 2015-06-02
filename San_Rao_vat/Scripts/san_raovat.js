//Carousel		
		$(document).ready(function() {
								   
			//Basic carousel					   
			$('body').removeClass('no-js');
		   
		    $('#my-carousel').carousel({
				itemsPerPage: 1,
				itemsPerTransition: 1,
				easing: 'linear',
				noOfRows: 4
			});
			$('#thesame_P').carousel({
				itemsPerPage: 3,
				itemsPerTransition: 3,
				easing: 'linear',
				noOfRows: 1
			});
			
		});
		
//Function
$(function() {
		   
	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();
	
	//Arcordion	
	$("#accordion > li > span").click(function(){

	if(false == $(this).next().is(':visible')) {
		$('#accordion > li > ul').slideUp(300);
	}
	$(this).next().slideToggle(300);
});

$('#accordion > li > ul:eq(0)').show();

//Ads Slideshow
$("#adspos1_l > div:gt(0)").hide();
	
			setInterval(function() { 
			  $('#adspos1_l > div:first')
			    .fadeOut(1000)
			    .next()
			    .fadeIn(1000)
			    .end()
			    .appendTo('#adspos1_l');
			},  3000);
			
$("#adspos1_2 > div:gt(0)").hide();
	
			setInterval(function() { 
			  $('#adspos1_2 > div:first')
			    .fadeOut(1000)
			    .next()
			    .fadeIn(1000)
			    .end()
			    .appendTo('#adspos1_2');
			},  2000);			
	
  });		

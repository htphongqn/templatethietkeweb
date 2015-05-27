//All Scripts
$(document).ready(function(){						  			   
 
	//Nivo Slide Responsive
	$('#slider').nivoSlider();	
	
	$(".zoom").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'false',
		playSpeed: '5000'
    });
	
	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();		
		 
});

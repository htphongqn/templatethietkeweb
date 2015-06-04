//All Scripts
$( function()
	{    		
		//Nivo Slide Responsive
		$('#slider').nivoSlider();	
		
		//  Accordion Panels		
		$('#nav > li > a').click(function(e){
			 if ($(this).attr('class') != 'active'){
			   $('#nav li ul').slideUp();
			   $(this).next().slideToggle();
			   $('#nav li a').removeClass('active');
			   $(this).addClass('active');
			 }
			 e.preventDefault();
		 });	
		
		//Video
		$("ul.demo2").ytplaylist({addThumbs:true, autoPlay: false, holderId: 'ytvideo2'});
		
		//Gallery	   
    	var galleries = $('.ad-gallery').adGallery();

});
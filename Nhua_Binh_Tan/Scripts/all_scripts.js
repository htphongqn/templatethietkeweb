//All Scripts
$( function()
	{    		
				

});
$(document).ready(function(){
		//Owl Carousel Assets
		  $("#owl-slidebanner").owlCarousel({
			navigation : true,
			autoPlay: 4000, //Set AutoPlay to 3 seconds
			items : 1,
			singleItem : true,
			rewindNav : true,
			pagination: true
		  }); 
		  $(".owl_slide").owlCarousel({
			navigation : true,
			autoPlay: false, //Set AutoPlay to 3 seconds
			items : 1,
			singleItem : true,
			rewindNav : true,
			pagination: false
		  }); 
			
		//Examples of how to assign the Colorbox event to elements
		$(".img_box").colorbox({rel:'img_box', maxWidth:'98%', maxHeight:'98%'});			
});
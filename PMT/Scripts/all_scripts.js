//All Scripts
$( function()
	{    		
		//Nivo Slide Responsive
		$('#slider').nivoSlider();			

});
$(document).ready(function(){
/////// CALL POPUP 
            $('.trigger').click(function () {
				$('.search_icon').toggleClass("close_search");	
                $('#dpop').toggleClass("search_trans");				
            }); 					
			
		//Examples of how to assign the Colorbox event to elements
		$(".zoom-image").colorbox({rel:'zoom-image', maxWidth:'98%', maxHeight:'98%'});			
});
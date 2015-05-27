//All Scripts
$( function()
	{    
	
// ResponsiveSlides
  $("#slider1").responsiveSlides({
	speed: 800,
	nav: true,
	speed: 500,
	timeout: 4000,
	random: true,
	namespace: "callbacks",
	before: function () {
	  $('.events').append("<li>before event fired.</li>");
	},
	after: function () {
	  $('.events').append("<li>after event fired.</li>");
	}
  }); 
}); 

$(document).ready(function() {
		/*
		*   Examples - images
		*/
		$("a#view-images").fancybox({
			'titleShow'     : false,
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic'
		});
		
		$("a[rel=view-images-group]").fancybox({
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'titlePosition' 	: 'over',
			'titleFormat'       : function(title, currentArray, currentIndex, currentOpts) {
				return '';
			}
		});
		
	});
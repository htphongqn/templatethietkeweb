//CarouFedsel
$( function(){    	
		//Nivo Slide Responsive
		$('#slider').nivoSlider({			
			captionOpacity:1,
			afterLoad: function(){$('#slider .nivo-caption').css("bottom","0")},    
			beforeChange: function(){$('#slider .nivo-caption').css("bottom","-100px")},
			afterChange: function(){$('#slider .nivo-caption').css("bottom","0")}
		});

});	
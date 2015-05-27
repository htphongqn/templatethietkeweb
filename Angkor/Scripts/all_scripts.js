//All Scripts	

$(document).ready(function(){						  				   						   			   
						   
		//carouFredSel
		$(".thumb").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 4000, duration: 1000},
							prev: '#prev',
							next: '#next',
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 3}
							}
						});		
		
//Zoomin - zoomout
    hs.graphicsDir = 'Images/';
    hs.align = 'center';
    hs.transitions = ['expand', 'crossfade'];
    hs.fadeInOut = true;
    hs.dimmingOpacity = 0.8;
    hs.outlineType = 'rounded-white';
    hs.captionEval = 'this.thumb.alt';
	hs.showCredits = false;
    hs.marginBottom = 105; // make room for the thumbstrip and the controls
    //hs.numberPosition = 'caption';
    // Add the slideshow providing the controlbar and the thumbstrip
    hs.addSlideshow({
        //slideshowGroup: 'group1',
        interval: 3000,
        repeat: false,
        useControls: true,
		fixedControls: 'fit',
        overlayOptions: {
            className: 'text-controls',
            position: 'bottom center',
            relativeTo: 'viewport',
            offsetY: -60
        },
        thumbstrip: {
            position: 'bottom center',
            mode: 'horizontal',
            relativeTo: 'viewport'
        }
    });

	function showImage(o) {
    $('.thumb a').removeClass('current');
    $(o).addClass('current');
    var img = $('.inn #' + $(o).attr('for'));
    if ($('.inn a:visible').length > 0) {
        $('.inn a:visible').fadeOut('fast', function() {
            img.fadeIn('fast');
        });
    } else {
        img.fadeIn('fast');
    }
    
    	return false;
	}


    $('.thumb a').click(function() {
        showImage(this);
        return false;
    });
    $('.thumb a:first-child').click();
    $('.zoom a').click(function() {
        var o = $('.inn a:visible')[0];
        return hs.expand(o);
    });		
				  		   
});
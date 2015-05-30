//Gallery JS
$(document).ready(function(){
						   
//Bxslider						   
$('.bxslider_cate').bxSlider({
  mode: 'horizontal',
  captions: false,
  auto: true,
  autoControls: false,
  pager: false,
  minSlides: 4,
  maxSlides: 4,
  slideWidth: 280,
  slideMargin: 10
});
$('.bxslider_gallery').bxSlider({
  mode: 'horizontal',
  captions: false,
  auto: false,
  autoControls: false,
  pager: false,
  minSlides: 4,
  maxSlides: 4,
  slideWidth: 165,
  slideMargin: 20
});

//PrettyPhoto JS
				$("area[rel^='prettyPhoto']").prettyPhoto();
				
				$(".gallery_images:first a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'pp_default',slideshow:3000, autoplay_slideshow: false});
				$(".gallery_images:gt(0) a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});
		
				$("#custom_content a[rel^='prettyPhoto']:first").prettyPhoto({
					custom_markup: '<div id="map_canvas" style="width:600px; height:504px"></div>',
					changepicturecallback: function(){ initialize(); }
				});

				$("#custom_content a[rel^='prettyPhoto']:last").prettyPhoto({
					custom_markup: '<div id="bsap_1259344" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div><div id="bsap_1237859" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6" style="height:260px"></div><div id="bsap_1251710" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div>',
					changepicturecallback: function(){ _bsap.exec(); }
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

//Masonry JS
$( window ).load( function()
{    
	var columns    = 5,
	setColumns = function() { columns = $( window ).width() > 750 ? 5 : $( window ).width() > 500 ? 4 : $( window ).width() > 250 ? 2 : 1; };
	setColumns();
	$( window ).resize( setColumns );	
    $('#list_gallery_img').masonry({
		itemSelector: '.img_item',
		//gutterWidth: 0,
		//columnWidth: 244,
		isAnimated: true,
		//layoutPriorities: {
			//shelfOrder: 1
		//},
		//animationOptions: {
    		//duration: 400
  		//},
		// set columnWidth a fraction of the container width
      	columnWidth: function( containerWidth ) {
        	return containerWidth / columns;
      	}
	});	
});
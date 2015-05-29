//All Scripts
$( function()
	{    		
		$('#slide_products ul').carouFredSel({
					prev: '#prev1',
					next: '#next1',
					//responsive: true,
					auto 	: true,
					//width: '100%',
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 3000,	
					items: {
						//width: 308,					
						visible: {
							min: 1,
							max: 3
						}
					}
				});
		$('#thumbnails_P ul').carouFredSel({
					prev: '#prev2',
					next: '#next2',
					//responsive: true,
					auto 	: false,
					//width: '100%',
					scroll : {
						items	: 4,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 3000,	
					items: {
						//width: 52,					
						visible: {
							min: 1,
							max: 4
						}
					}
				});	
		
	$(".zoom").fancybox({
		openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '5000',
    });		

});

$(document).ready(function(){
	function showImage(o) {
    $('#thumbnails_P li a').removeClass('current');
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

    $('#thumbnails_P li a').click(function() {
        showImage(this);
        return false;
    });
    $('#thumbnails_P li:first-child a').click();
});

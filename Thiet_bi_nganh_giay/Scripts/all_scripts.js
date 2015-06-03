//All Scripts
$( function()
	{    		
	
$('#box_category > ul > li > a').mouseover(function () {
            if ($(this).next('ul').is(':hidden') == true) {
                $('#box_category > ul > li > a').next('ul').slideUp(1000);
                $(this).next('ul').slideDown('normal');
            }						
        });

			
		$('#slide_products ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					//responsive: true,
					//width: '100%',
					scroll : {	
						item: 4,
			            pauseOnHover: true
        			},
					auto: 4000,
					speed: 1500,
					duration: 3000,	
					items: {
						//width: 160,					
						visible: {
							min: 1,
							max: 4
						}
					}
				});
		$('#slide_ads ul').carouFredSel({
					prev: '#prev1',
					next: '#next1',
					//responsive: true,
					//width: '100%',
					scroll : {	
						item: 2,
			            pauseOnHover: true
        			},
					auto: 6000,
					speed: 1500,
					duration: 3000,	
					items: {
						//width: 215,					
						visible: {
							min: 1,
							max: 4
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

//Click Toggle
var notH = 1,
	$pop = $('#dpop').hover(function(){notH^=1;});
    $pop = $('ul.hidden').hover(function () { notH ^= 1; });	

            $(document).on('mouseup keyup', function (e) {
                if (notH || e.which == 27) $pop.stop().hide();
            });
            /////// CALL POPUP 	 
$('.search_icon').click(function(){
	$('#dpop').slideDown("fast");							 	
});	
$('.icon_close').click(function(){
	$('#dpop').slideUp("fast");							 	
});

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
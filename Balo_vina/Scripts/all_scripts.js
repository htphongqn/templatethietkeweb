//All Scripts
$(document).ready(function(){

//Click Toggle
var notH = 1,
	$pop = $('#dpop').hover(function(){notH^=1;});
    $pop = $('#dpop_sp_order').hover(function () { notH ^= 1; });	

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
 
});

//Support
$(window).load(function () {
    var state = false;

    $("#toggle-slide-button").click(function () {
        if (!state) {
            $('#map-legend').animate({ width: "toggle" }, 100);
            $('#map-legend-control').css('top', "10px");
            $('#toggle-slide-button img').attr('src', '../vi-vn/Images/support_icon.png');

            state = true;
        }
        else {
            $('#map-legend').animate({ width: "toggle" }, 50);
            $('#toggle-slide-button img').attr('src', '../vi-vn/Images/support_icon.png');

            state = false;
        }
        return false;
    });
});

$( function()
	{    	
	
//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'clean',
				numbers_align: 'center',
				progressbar: false, 
				dots: true,
				numbers: false,
				preview: false,
				animation: 'randomSmart',
				interval: 2000
			});


	  
		//carouFredSel
		$('#slide_ads ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					//responsive: true,
					auto 	: { pauseDuration : 4000, duration: 1000},
					//width: '100%',
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 3000,	
					items: {
						//width: 180,					
						visible: {
							min: 1,
							max: 6
						}
					}
				});		
				$('.zoom-desc ul').carouFredSel({
					prev: '#prev1',
					next: '#next1',
					//responsive: true,
					auto: false,
					//width: '100%',
					direction: 'up',
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 8000,	
					items: {
						//height: 70,				
						visible: {
							min: 1,
							max: 4
						}
					}
				});	
		
	$('#slide_products ul').carouFredSel({
					prev: '#prev2',
					next: '#next2',
					//responsive: true,
					auto 	: false, //{ pauseDuration : 4000, duration: 1000, fx: "crossfade"},
					//width: '100%',
					scroll : {
						items	: 4,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 3000,	
					items: {
						//width: 240,					
						visible: {
							min: 1,
							max: 4
						}
					}
				});	
	
});
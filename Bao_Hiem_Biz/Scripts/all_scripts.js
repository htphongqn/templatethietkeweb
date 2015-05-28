//All Scripts
$( function(){    
		//Nivo Slide Responsive
		$('#slider').nivoSlider();
		
		
		//carouFredSel
		$("#slider_logo ul").carouFredSel({
							prev: '#prev',
							next: '#next',
							auto: 5000,
							scroll	: {
								items	: 1
							}							
						});		
		
		
		 //  Accordion Panels   
	$(".menu_head:first").addClass("current");
    $(".v_box .menu_body:first").show();
    $(".menu_head").click(function () {
        $(this).next("div.menu_body").slideDown("medium").siblings("div.menu_body:visible").slideUp("medium");
        $(this).addClass("current");
        $(this).siblings(".menu_head").removeClass("current");
    });
	
	
	//LightBox
	function launch() {
                 $('#box_lightbox').lightbox_me({centered: true, onLoad: function() { $('#box_lightbox').find('input:first').focus()}});
            }
            
            $('.lightbox_me').click(function(e) {
                $("#box_lightbox").lightbox_me({centered: true, onLoad: function() {
					$("#box_lightbox").find("input:first").focus();
				}});
				
                e.preventDefault();
            });
            
            
            $('table tr:nth-child(even)').addClass('stripe');
	
});	
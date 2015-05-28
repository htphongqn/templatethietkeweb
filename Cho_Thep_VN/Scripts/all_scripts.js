//All Scripts
$(document).ready(function () {
	//Menu Sidebar
		// Add a <span> to every .nav_item that has a <ul> inside	
		$('#left_nav > ul > li').has('ul').addClass('has-sub');	
		
		$('#left_nav li a').mouseover(function () {
            if ($(this).next('ul').is(':hidden') == true) {
                $('#left_nav li a').next('ul').slideUp(1000);				
                $(this).next('ul').slideDown('normal');				
            }						
        });							
							
	$('#new_products').cycle({ 
		fx:    'scrollRight', 
		delay: -1000 
	});		
	
	//Examples of how to assign the Colorbox event to elements
	$(".group_colorbox").colorbox({rel:'group_colorbox', maxWidth:'95%', maxHeight:'95%'});
});	

$( function()
		{    					
		//Nivo Slide Responsive
		$('#slider').nivoSlider();	
		
		$(function() {
			$(".scroller").simplyScroll({orientation:'vertical',customClass:'vert'});
		});
						
});

$(document).ready(function () {
        $(".tab_content").hide();
        $(".tab_content:first").show();

        $("ul.tabs_menu li").click(function () {
            $("ul.tabs_menu li").removeClass("active");
            $(this).addClass("active");
            $(".tab_content").hide();
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn();
        });
    }); 
//All Scripts
$( function()
	{    
// vivo Slider
  $('#slider').nivoSlider();
  
	//Slideshow	
	$(".zoom_slide").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '10000'
    });  
	
	
/* Tab Process Order */
    $(".tab a").click(function(e) {
        e.preventDefault();
    });
    $(".tab a").hover(function() {
        var elm = $(this);
        if (!elm.parent("li").hasClass("active"))
        {
            elm.parent("li")
                .siblings()
                .removeClass("active");
            elm.parent("li").addClass("active");
            elm.parents(".tab")
                .next()
                .children(".tabContents div")
                .hide();
            $(this.hash).stop().fadeIn(500);
        }
        return false;
    }, function() {
        return false;
    });
		
    $(".sub_col_menu a").hover(function() {
        var elm = $(this);
        if (!elm.parent("li").hasClass("active"))
        {
            elm.parent("li")
                .siblings()
                .removeClass("active");
            elm.parent("li").addClass("active");
            elm.parents(".sub_col_menu")
                .next()
                .children(".sub_col_info_item")
                .hide();
            $(this.hash).stop().fadeIn(500);
        }
        return false;
    }, function() {
        return false;
    });
	  	  
	});

//All Scripts
            function showContact(type) {
                $(".title-contact").css("left", "0");
                $(".title-contact").css("opacity", 0);
                setTimeout(function () {
                    $(".container-contact-us").css("right", "-1px");
                    $(".container-contact-us").css("opacity", 1);
                }, 200);
                if (type == 0) {
                    $(".content-yahoo").css("opacity", 1);
                    $(".content-yahoo").css("z-index", 1);
                    $(".content-facebook").css("opacity", 0);
                    $(".content-facebook").css("z-index", 0);
                } else {
                    $(".content-facebook").css("opacity", 1);
                    $(".content-facebook").css("z-index", 1);
                    $(".content-yahoo").css("opacity", 0);
                    $(".content-yahoo").css("z-index", 0);
                }
            }

            function closeContact(type) {
                $(".container-contact-us").css("right", "-237px");
                $(".content-yahoo").css("opacity", 0);
                $(".content-facebook").css("opacity", 0);

                setTimeout(function () {
                    $(".title-contact").css("left", "-37px");
                    $(".title-contact").css("opacity", 1);
                }, 400);
            }

$( function()
	{    		
		
$(".zoom").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',		
		playSpeed: '10000'
    });	
$(".zoom_gallery").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
		autoPlay: 'true',
		playSpeed: '10000'
    });	

});

$(document).ready(function(){
						   
//Init Skitter
$('.box_skitter_large').skitter({
				theme: 'square',
				numbers_align: 'center',
				progressbar: false, 
				dots: false,	
				navigation: false,
				preview: false,
				animation: 'randomSmart',
				interval: 2000				
			});
						   
 	
});
//All Scripts
$( function()
	{    		
		$('#menu_sidebar li a').mouseover(function () {
            if ($(this).next('ul').is(':hidden') == true) {
                $('#menu_sidebar li a').next('ul').slideUp(1000);
                $(this).next('ul').slideDown('normal');
            }						
        });
		
		//Gioi thieu
		if ($('.ab-box').length) {
        $('.ab-box img').css('opacity', 0)
        for (var i = 0; i <= $('.ab-box>div').length; i++) {
            var posdl = 0;
            switch (i) {
                case 1:
                    posdl = 1;
                    break;
                case 2:
                    posdl = 4;
                    break;
                case 3:
                    posdl = 2;
                    break;
                case 4:
                    posdl = 6;
                    break;
                case 5:
                    posdl = 3;
                    break;
                case 6:
                    posdl = 5;
                    break;
                case 7:
                    posdl = 7;
                    break;
            }
            $('.ab-box .item' + posdl).children().delay(i * 500).fadeTo('500', 1);
        };
    }
	
	//Ban Lanh Dao 	
	$('.newsatt-head').click(function () {
        var _parent = $(this).parent();
        if (_parent.hasClass('active')) {
            _parent.removeClass('active');
            _parent.find('.newsatt-content').slideUp();

        } else {
            //$('.newsatt-item').removeClass('active');   
            //$('.newsatt-content').slideUp();
            _parent.addClass('active');
            _parent.find('.newsatt-content').slideDown();

        }

    });
    if ($('.newsatt-item').length) {
        $('.newsatt-head').each(function () {
            $(this).wrapStart(1);
        })

        if ($('.newsatt-item.active').length) {
            $('.newsatt-item.active').trigger('click');
        } else {
            $('.newsatt-item').eq(0).find('.newsatt-head').trigger('click');
        }
    }
					  	  
	});

$(document).ready(function(){
				  		   
//Mobile menu
$('li.cat-header ul').each(function(index) {
 $(this).prev().addClass('idCatSubcat')});
 $('li.cat-header a').after('<span></span>'); 
 $('li.cat-header ul').css('display','none');
 $('li.cat-header ul.active').css('display','block');
 $('li.cat-header ul').each(function(index) {
   $(this).prev().addClass('close').click(function() {
  if (
   $(this).next().css('display') == 'none') {
   $(this).next().slideDown(400, function () {
   $(this).prev().removeClass('collapsed').addClass('expanded');
    });
  }else {
    $(this).next().slideUp(400, function () {
   $(this).prev().removeClass('expanded').addClass('collapsed');
   $(this).find('ul').each(function() {
    $(this).hide().prev().removeClass('expanded').addClass('collapsed');
   });
    });
  }
  return false;
   });
});

// Add a <span> to every .nav_item that has a <ul> inside	
	$('#mega_menu li li').has('ul.noli').addClass('menu_level2');
	
	$('.menu_icon, .close_menu').click(function () {
		//$(this).parents().find('.container').toggleClass('tran_wp');												 
        $(this).parents().find('.mobile_menu').slideToggle('fast');        
    }) 
	 
				
//carouFredSel
		$("#slide_ads ul").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 3000, duration: 1000}, // fx: "crossfade"
							prev: '#prev',
							next: '#next',
							scroll	: {
								items	: 1
								//onBefore: function( data ) {
				                    //$('#slide_services').not(data.items.visible[0]).find('a').animate({opacity: 0,visibility: 'hidden',bottom: 60});
				                    //$(data.items.visible[0]).find('a').animate({opacity: 1,visibility: 'visible',bottom: 40},{queue:false,duration:1000});
				                //},
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								width: 121,
								height: "variable",
								visible: { min: 1, max: 9}
							}
						});	
				$("#slide_projects ul").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 3000, duration: 1000}, // fx: "crossfade"
							prev: '#prev1',
							next: '#next1',
							scroll	: {
								items	: 1
								//onBefore: function( data ) {
				                    //$('#slide_services').not(data.items.visible[0]).find('a').animate({opacity: 0,visibility: 'hidden',bottom: 60});
				                    //$(data.items.visible[0]).find('a').animate({opacity: 1,visibility: 'visible',bottom: 40},{queue:false,duration:1000});
				                //},
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								width: 212,
								height: "variable",
								visible: { min: 1, max: 6}
							}
						});	
				$("#slide_hotels ul").carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: false,//{ pauseDuration : 3000, duration: 1000}, // fx: "crossfade"
							prev: '#prev',
							next: '#next',
							scroll	: {
								items	: 1
								//onBefore: function( data ) {
				                    //$('#slide_services').not(data.items.visible[0]).find('a').animate({opacity: 0,visibility: 'hidden',bottom: 60});
				                    //$(data.items.visible[0]).find('a').animate({opacity: 1,visibility: 'visible',bottom: 40},{queue:false,duration:1000});
				                //},
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								width: 267,
								height: "variable",
								visible: { min: 1, max: 3}
							}
						});	
							
});
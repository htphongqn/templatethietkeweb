//Scripts click Toggle
$(document).ready(function() {
var notH = 1,
    $pop = $('.popup_login').hover(function () { notH ^= 1; });

                    $(document).on('mouseup keyup', function (e) {
                        if (notH || e.which == 27) $pop.stop().hide();
                    });
                    /////// CALL POPUP 
                    $('.tt_linktop').click(function () {
                        $('.popup_login').slideToggle('fast').end().siblings().$('.popup_login').hide('fast');
                        event.stopPropagation();
                    });
					$('.close_box_acc').click(function () {
                        $('.popup_login').slideUp('fast');                       
                    });

//Nivo Slide Responsive
$('#slider').nivoSlider();	
});  

$( function(){    	
						
		$('#slide_partners ul').carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 5000, duration: 1000}, // fx: "crossfade"
							prev: '#prev_partner',
							next: '#next_partner',	
							width: '100%',
							speed: 2000,
							duration: 3000,	
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								//width: 90,
								height: "variable",
								visible: { min: 1, max: 6}
							}
						});
		$('#slide_communities ul').carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 5000, duration: 1000 }, // fx: "crossfade"
							prev: '#prev_commu',
							next: '#next_commu',	
							width: '100%',
							speed: 2000,
							duration: 3000,	
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								//width: 90,
								height: "variable",
								visible: { min: 1, max: 1 }
							}
						});
		$('#slide_products ul').carouFredSel({
							circular: true,
							infinite: true,
							responsive: true,
							pagination: false,
							auto 	: { pauseDuration : 5000, duration: 1000}, // fx: "crossfade"
							prev: '#prev',
							next: '#next',
							width: '100%',
							speed: 2000,
							duration: 3000,	
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								//width: 289,
								height: "variable",
								visible: { min: 1, max: 3}
							}
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

//All Scripts
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

});
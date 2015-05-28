$(function() {
$(".datepicker").datepicker({ dateFormat: "dd-mm-yy" }).val()
});

$(document).ready(function(){
						   
//Click Toggle
$(".icon_link_web").click(function(){
    		$("#list_link_web").slideToggle();
  		});

						   
// Slideshow 1
  $("#slider1, #slider2").responsiveSlides({
	speed: 800,
	nav: true,
	namespace: "callbacks",
	before: function () {
	  $('.events').append("<li>before event fired.</li>");
	},
	after: function () {
	  $('.events').append("<li>after event fired.</li>");
	}
  });						   
	//carouFedSel
	$('.slide_topnews').carouFredSel({
					prev: '.newsNav .prev',
					next: '.newsNav .next',
					responsive: true,
					width: '100%',
					scroll : {	
						item: 5,
			            pauseOnHover: true
        			},
					auto: 4000,
					speed: 2000,
					duration: 3000,	
					items: {
						width: 176,					
						visible: {
							min: 1,
							max: 5
						}
					}
				});
	$('#carousel_partners ul').carouFredSel({
					prev: '.slideNav .prev',
					next: '.slideNav .next',
					responsive: true,
					width: '100%',
					scroll : {	
						item: 6,
			            pauseOnHover: true
        			},
					auto: 4000,
					speed: 2000,
					duration: 3000,	
					items: {
						width: 190,					
						visible: {
							min: 1,
							max: 6
						}
					}
				});
						
// Add a <span> to every .nav_item that has a <ul> inside	
	$('#mega_menu li li').has('ul.noli').addClass('menu_level2');
	$('#cssmenu > ul > li').prepend('<div class="mask_menuBg"></div>');
	
	$('.menu_icon').click(function () {
        $(this).parents().find('.fly_menu').toggleClass('active');
        $(this).parents().find('#wrap').toggleClass('tran_wp');
    })   
	
//Menu Footer Mobile
		$('.menu_footer_icon').click(function(){										
			$('#menu_footer_mobile > ul').slideToggle();			
		});

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
		
	
//Hover Effect
    $(".list_link_videos a").hover(function() {
        var elm = $(this);
        if (!elm.parent("li").hasClass("active"))
        {
            elm.parent("li")
                .siblings()
                .removeClass("active");
            elm.parent("li").addClass("active");
            elm.parents(".list_link_videos")
                .next()
                .children(".tab_video div")
                .hide();
            $(this.hash).stop().fadeIn(50);				
        }
        return false;
    }, function() {
        return false;
    });
    $(".list_link_videos a").click(function () {

        window.location = $(this).attr('title');

    });
	
});

function openpage_noresize(pageurl, pagename, pagewidth, pageheight) {
    var attr;
    attr = "width=" + pagewidth + ",height=" + pageheight + ",scrollbars=no,status=no,title=yes,toolbars=no,resizable=no"
    window.open(pageurl, pagename, attr);
}
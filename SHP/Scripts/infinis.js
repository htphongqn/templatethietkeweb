/*
	Plugin name: Equal Height
	Call: $('.col, .summary, .item').equalHeight();
*/

(function($){    
    $.fn.equalHeight = function() {  
        var tallest = 0;
        this.each(function() {    
            var thisHeight = $(this).height();
            if (thisHeight > tallest) {
                tallest = thisHeight;
            }
        }); // each
        return this.each(function() {    
            $(this).css('min-height',tallest);
        });
    }; // fn
}(jQuery));

$(function(){
	
	$('.chinese-wide .back a').text('返回');
	
	$('.lang').show();
	
	/* because we don't need the extra markup if there's no JS */
	$('#video-slider').wrap('<div id="video-slider-wrap">');
	$('#video-slider-wrap').prepend('<a href="#prev" id="video-prev">previous</a><a href="#next" id="video-next">next</a>');
	
	/* Map Links Hover */
	$('.dashboardMap li a img').hover(function(){
		var title = $(this).attr('title');
		$('#location').text(title);
	},function(){
		$('#location').text(' ');
	});
	
	$('#orange-map a img').hover(function(){
		var title = $(this).attr('title');
		$('#location').text(title);
	},function(){
		$('#location').text(' ');
	});
	
	/* active nav */
	$('#nav li').hover(function(){
		$(this).addClass('hovered');
		$(this).children('div').hide().stop(true,true).slideDown(300);
	},function(){
		$(this).removeClass('hovered');
		$(this).children('div').hide();
	});
	$('#nav ul li:nth-child(1n+6)').addClass('reverseDrop');
	
	/* media animation */
	
	$('#media .slide:gt(0)').hide();
	
	var $currentImg = 0;
	var $maxImage = $('#media .slide').length;
	function imgSlider($whatImg){
		if ($currentImg < $maxImage-1) {
			$currentImg++;
		} else {
			$currentImg = 0;
		}
		$('#media .slide:eq('+$whatImg+')').css({ zIndex: 10 }).fadeIn(1000, function() {
			$('#media .slide').not(':eq('+$whatImg+')').hide().css({
				zIndex: 1
			});
			$('#media .slide').not(':eq('+$whatImg+')').find('img').css({
				left: 0
			});
		});
		if ($('body.home').length > 0) {
			$('.home #media .slide:eq('+$whatImg+') img').animate({
				left:	-240
			},8000, function(){
				imgSlider($currentImg);
			});
		} else if ($('body.lower').length > 0) {
			
			$('.lower #media .slide:eq('+$whatImg+') img').animate({
				left:	0
			},8000, function(){
				imgSlider($currentImg);
			});
		}
	}
	imgSlider($currentImg);
	
	/* icon animations */
	
	$('.buttons a').wrapInner('<div class="bits">');
	$('.bio .icon').clone().prependTo('.bio .bits').attr('id','bioanim').addClass('anim').hide();
	$('.wind .icon').clone().prependTo('.wind .bits').attr('id','windanim').addClass('anim').hide();
	$('.hydro .icon').clone().prependTo('.hydro .bits').attr('id','hydroanim').addClass('anim').hide();
	$('#windanim')
		.sprite({fps: 15, no_of_frames: 6})
		.active();
	
	$('#bioanim')
		.sprite({fps: 15, no_of_frames: 8})
		.active();
		
	$('#hydroanim')
		.sprite({fps: 15, no_of_frames: 10})
		.active();
		
	$('.buttons a').hover(function() {
		$(this).find('span').stop(0,1).fadeIn(200);
		$(this).find('.icon').stop(0,1).fadeOut(200);
		$(this).find('.anim').stop(0,1).fadeIn(200);
	}, function() {
		$(this).find('span').stop(0,1).fadeOut(500);
		$(this).find('.icon').stop(0,1).fadeIn(500);
		$(this).find('.anim').stop(0,1).fadeOut(500);
	});
	
	
	var p = $('.panel');
	var position = p.position();
	var panelHeight = p.height();
	var panelWidth = p.width();
	
	if ($('.dashboardPanel').length > 0) {
	$('.dashboardPanel').css({
		width	: panelWidth-30,
		height	: panelHeight-9,
		top		: position.top,
		left	: '0px'
		});
	}
	$('.dashboard.panel').hover(function() {
		$(this).next('.dashboardPanel').animate({
			left		: -10
		});
	}, function() {
		$(this).next('.dashboardPanel').animate({
			left		: 0
		});
	});
	$('.dashboard.panel a').click(function(e) {
		e.preventDefault();
	});
	$('.dashboard.panel').toggle(function() {
		$(this).unbind('mouseenter').unbind('mouseleave');
		$(this).addClass('active').next('.dashboardPanel').animate({
			left		: panelWidth*-1,
			width		: panelWidth
		});
	}, function() {
		$(this).removeClass('active').next('.dashboardPanel').animate({
			left		: 0,
			width		: panelWidth-30
		}, function() {
			$('.dashboard.panel').hover(function() {
				$(this).next('.dashboardPanel').animate({
					left		: -10
				});
			}, function() {
				$(this).next('.dashboardPanel').animate({
					left		: 0
				});
			});
		});
	});
	if ($('.hilite, .pullout').length > 0) {
		$('.hilite, .pullout').addClass('curved').before('<div class="hilite_top">&nbsp;</div>');
		$('.hilite, .pullout').after('<div class="hilite_bot">&nbsp;</div>');
	}
	if ($('.quote').length > 0) {
		$('.quote p:first-child').prepend('<span class="openQuote">&ldquo;</span>');
		$('.quote p:first-child').append('<span class="closeQuote">&rdquo;</span>');
	}
	
	
	$('.lang ul').hover(function(){
		$(this).show();
	});
		
	
	$('.lang ul').addClass('activated').hide();
	if (!$('.lang ul li:not(:first-child)').hasClass('active')) {
		$('.lang ul li.active').appendTo('.lang ul');
	}
	if ($('.lang p').length){
		var langTxt = $('.lang p').html();
		langTxt = langTxt.replace(':','');
		$('.lang p').addClass('activated').wrapInner('<a href="#" />');
		$('.lang p a').html(langTxt);
		$('.lang').hover(function(){
			$('.lang').children('p').children('a').addClass('on');
			$(this).children('ul').stop(1,1).slideDown();
		},function(){
			$('.lang').children('p').children('a').removeClass('on');
			$(this).children('ul').stop(1,1).slideUp();
		});
	}
	
	/* set some columns to the same height */
	$('#footer ul').equalHeight();
	$('.col').equalHeight();
	$('#nav-sub,#content-main,#content-sub').equalHeight();
	$('.info,.bio').equalHeight();



	if($("a.fancybox").length){
	    $("a.fancybox").each(function(){
	    	$(this).attr('href','#'+$(this).attr('href').split('#')[1]);
	    });
	    
	    $("a.fancybox").fancybox({
	        'overlayShow'	: true,
	        'overlayColor'  : '#fff',
	        'transitionIn'	: 'fade',
	        'transitionOut'	: 'fade'
	    });
	}
	$('.js #f2 label.cv, .js #f2 input.cv').hide();
	$('select[name="Recipient"]').change(function(){
		if ($(this).find('option:selected').val() == "careers@infinis.com") {
			$('.js #f2 label.cv, .js #f2 input.cv').slideDown();
		} else {
			$('.js #f2 label.cv, .js #f2 input.cv').slideUp();
		}
	});

	$('img[src*="edge.jpg"]').fadeTo(0,0.5);

	
});
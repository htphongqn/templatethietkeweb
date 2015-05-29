//All Scripts
$( function()
	{
		//Main Menu
		/*
	Flaunt.js v1.0.0
	by Todd Motto: http://www.toddmotto.com
	Latest version: https://github.com/toddmotto/flaunt-js
	
	Copyright 2013 Todd Motto
	Licensed under the MIT license
	http://www.opensource.org/licenses/mit-license.php

	Flaunt JS, stylish responsive navigations with nested click to reveal.
*/
		
		// Append the mobile icon nav	
		$('#nav').append($('<div class="nav_mobile"></div>'));
		$('.topnav').append($('<div class="nav_mobile"></div>'));		
		
		// Add a <span> to every .nav_item that has a <ul> inside
		$('#nav > ul > li').has('ul').prepend('<span class="nav_click"><i class="nav_arrow"></i></span>');		
		$('.nav_item').has('ul').prepend('<span class="nav_click"><i class="nav_arrow"></i></span>');		
		
		// Click to reveal the nav
		$('#nav .nav_mobile').click(function(){										
			$('.MenuBarHorizontal').slideToggle();			
		});
		$('.topnav .nav_mobile').click(function(){										
			$('.nav_list').slideToggle();			
		});
	
		// Dynamic binding to on 'click'
		$('.nav_list').on('click', '.nav_click', function(){
		
			// Toggle the nested nav
			$(this).siblings('.nav_submenu').slideToggle();
			
			// Toggle the arrow using CSS3 transforms
			$(this).children('.nav_arrow').toggleClass('nav_rotate');
			
		});
				
		// Dynamic binding to on 'click'
		$('ul.MenuBarHorizontal').on('click', '.nav_click', function(){
		
			// Toggle the nested nav
			$(this).siblings('#nav li ul').slideToggle();
			
			// Toggle the arrow using CSS3 transforms
			$(this).children('.nav_arrow').toggleClass('nav_rotate');
			
		});
		
		//Slide banner
				var demo1 = $("#main_slider").slippry({
					transition: 'fade',
					useCSS: true,
					speed: 1000,
					pause: 3000,
					auto: true,
					preload: 'visible'
				});

				$('.stop').click(function () {
					demo1.stopAuto();
				});

				$('.start').click(function () {
					demo1.startAuto();
				});

				$('.prev').click(function () {
					demo1.goToPrevSlide();
					return false;
				});
				$('.next').click(function () {
					demo1.goToNextSlide();
					return false;
				});
				$('.reset').click(function () {
					demo1.destroySlider();
					return false;
				});
				$('.reload').click(function () {
					demo1.reloadSlider();
					return false;
				});
				$('.init').click(function () {
					demo1 = $("#main_slider").slippry();
					return false;
				});	
			
			//Slide Partners
			 $("#scroller").simplyScroll();
	  
	});

$(document).ready(function () {
	//Owl Carousel Assets
      $("#owl-demo").owlCarousel({
        navigation : true
      });	   
	  
	 //Images Gallery
	 	$(".zoom").fancybox({
        	openEffect: 'elastic',
        	closeEffect: 'elastic'
    	});
				
		<!--Quick Pagination-->
			$("ul.pagination").quickPagination({pagerLocation:"after",pageSize:"6"});
});	

//Slide Video whith Thumnails
	var site = $('#site');
    
    $(document).ready(function() {
        window.prettyPrint && prettyPrint()
        $('#lightSlider').lightSlider({
            gallery:true,
            minSlide:1,
            maxSlide:1,
            auto:true,
            mode:'fade',
            proportion:'71.3%',
            onSliderLoad: function() {
                $('#lightSlider').removeClass('cS-hidden');
            }     
        });
        $('#content-slider').lightSlider({
            minSlide:1,
            maxSlide:1,
            keyPress:false,
            speed:2000,
            auto:true,
            controls:false,
            onSliderLoad: function() {
                $('#content-slider').removeClass('cS-hidden');
            } 
        })
        var clk = true;
        $('.btn-navbar').on('click',function(){
            if(site.hasClass('translate')){
                clk = false;    
                site.removeClass('translate');  
                setTimeout(function(){
                    $("#mast-head").css('display','none');  
                    clk = true;
                },700);
            }else if(clk){
                $("#mast-head").css('display','block'); 
                site.addClass('translate');     
            }
        });
        $('#site').on('touchmove', function(e) {
            if($(this).hasClass('translate')){
                e.preventDefault();
            }
        });
        $('#site > .nav-over').on('click touchstart',function(e){
            e.preventDefault();
            e.stopPropagation();
            clk = false;
            site.removeClass('translate');  
            setTimeout(function(){
                $("#mast-head").css('display','none');  
                clk = true;
            },700); 
        })
        $(window).on("resize orientationchange", function(){
            if($(window).width() > 767){
                $("#mast-head").css('display','block'); 
                site.removeClass('translate');
            }else if(!site.hasClass('translate')){
                $("#mast-head").css('display','none');      
            }
        });
    });
	 $('#lightSlider li').each(function(){
      $(this).attr('data-thumb', $('img', this).attr('src'));
	  $(this).attr('data-src', $('img', this).attr('src'));
   })
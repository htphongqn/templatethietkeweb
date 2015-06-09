      //slider nivo
	 $(window).load(function() {
        $('#slider').nivoSlider();
    });
	
	//slide ngang
	function mycarousel_initCallback(carousel)
	{
		carousel.clip.hover(function() {
		carousel.stopAuto();
		}, function() {
		carousel.startAuto();
	});
	};
	jQuery(document).ready(function () {     
		jQuery('#mycarousel_same_P,#mycarousel_dt_img,#mycarousel_products').jcarousel({
		auto: 0,
		animation: 1000,
		wrap: 'circular',
		scroll: 1,
		initCallback: mycarousel_initCallback
		});	
	});
 
 
 //mySliderTabs
	$("#mySliderTabs").sliderTabs();
	$("#mySliderTabs").sliderTabs({
		arrowWidth: 0,					// Width of tab arrows in pixels
		classes: {						// Custom classes to attach
			leftArrow: '',				//  - Left arrow
			panel: '',					//  - All content panels
			panelActive: '',			//  - The selected content panel
			panelsContainer: '',		//  - Parent div containing all hidden and shown panels
			rightArrow: '',				//  - Right arrow
			tab: '',					//  - All tabs (<li> elements)
			tabActive: '',				//  - The selected tab
			tabsList: '',				//  - The list of tabs (<ul> element)
		},
		defaultTab: 1,					// Index of the default tab OR the jQuery object of the <li> element
		height: '',						// Integer or '': Height in pixels of the whole widget. '' means fluid height
		position: "top",				// 'top' or 'bottom': Orientation of the tabs relative to the content
		tabHeight: 20,					// Height of the tabs bar and arrows in pixels
		tabSliders: true,				// Use sliding tabs. If false, overflow tabs are hidden
		tabSlideLength: 100,			// Length in pixels to slide tabs when an arrow is clicked
		tabSlideSpeed: 200,				// Time (in milliseconds) of the tab sliding animation
		transition: 'slide',			// 'slide' or 'fade': The transition to use when changing panels
		transitionSpeed: 200,			// Time (in milliseconds) of the transition animation
		width: ''						// Width in pixels of the whole widget
	});
 
 
 //slider news
  $(document).ready( function(){	
		var buttons = { previous:$('#jslidernews2 .button-previous') ,
						next:$('#jslidernews2 .button-next') };			 
		$('#jslidernews2').lofJSidernews( { interval:5000,
											 	easing:'easeInOutQuad',
												duration:1200,
												auto:true,
												navigatorHeight		: 53,
												navigatorWidth		: 150,
												maxItemDisplay:7,
												buttons:buttons 
												,rtl:true} );						
	});

//ho tro truc tuyen	
	$(window).load(function(){
var state = false;
$("#toggle-slide-button").click(function () {
    if (!state) {
        $('#map-legend').animate({width: "toggle"}, 0);
        $('#toggle-slide-button img').attr();

          state = true;
        }
    else {
          $('#map-legend').animate({width: "toggle"}, 0);
          $('#toggle-slide-button img').attr();

          state = false;
        }
});
});


 

	$(document).ready(function() {
	
		$(".tab_content_news").hide();
		$(".tab_content_news:first").show(); 
		$("#tab_news ul.tabs li").click(function() {
			$("#tab_news ul.tabs li").removeClass("active");
			$(this).addClass("active");
			$("#tab_news .tab_content_news").hide();
			var activeTab = $(this).attr("rel"); 
			$("#"+activeTab).fadeIn(); 
		});
	});
	
	
//CarouFedsel
$( function(){    	
		$('#slide_viewed_P ul').carouFredSel({
					prev: '#prev1',
					next: '#next1',
					//responsive: true,
					auto: 5000,
					//width: '100%',
					direction: 'up',
					scroll : {
						items	: 1,
			            pauseOnHover: true
        			},
					speed: 2000,
					duration: 8000,	
					items: {
						height: 50,				
						visible: {
							min: 1,
							max: 3
						}
					}
				});	
});			
 
 
 (function($) {
		$(function() {
			$("#scroller").simplyScroll({pauseOnHover: true});
		});
	})(jQuery);
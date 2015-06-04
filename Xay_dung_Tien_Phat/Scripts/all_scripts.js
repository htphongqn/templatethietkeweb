//CarouFedsel
$( function(){    	
							
		$('#lightSlider').lightSlider({
				gallery:true,
				item:1,
				thumbItem:8,
				slideMargin:0,
				mode:'fade',
				auto: true,
				pause: 3000,
				loop: true,
				currentPagerPosition:'left',
				onSliderLoad: function(el) {
                	el.lightGallery();
				}        
        }); 
		
		//Nivo Slide Responsive
		$('#slider').nivoSlider();	
		
		//Menu		
		$('#cssmenu > ul > li:has(ul)').addClass("has-sub");
		
		//Scrollbar
		$('.scrollbar').slimscroll({
        	height: 'auto'
      	});
		
		$('#slide_news ul').carouFredSel({
							circular: true,
							infinite: true,							
							pagination: "#pager_news",
							auto 	: { pauseDuration : 7000, duration: 1000 },
							prev: '#prev_news',
							next: '#next_news',	
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 1}
							}
						});
				
		$('#sl_partners ul').carouFredSel({
							circular: true,
							infinite: true,							
							pagination: false,
							auto 	: { pauseDuration : 3000, duration: 1000},
							prev: '#prev_partner',
							next: '#next_partner',							
							scroll	: {
								items	: 1								
							},
							swipe: { onMouse: true, onTouch: true},
							items: {
								height: "variable",
								visible: { min: 1, max: 7}
							}
						});						
});	
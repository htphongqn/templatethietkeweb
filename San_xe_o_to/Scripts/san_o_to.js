$(document).ready(function() {
    
	//Tab JS Home
    $("ul#tab_submenu_1 li").click(function(e){
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum+1;
            $("ul#tab_submenu_1 li.active").removeClass("active");
            $(this).addClass("active");
            $("ul#tab_ct_1 li.active").removeClass("active");
            $("ul#tab_ct_1 li:nth-child("+nthChild+")").addClass("active").fadeIn();
        }
    });
	$("ul#tab_submenu_2 li").click(function(e){
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum+1;
            $("ul#tab_submenu_2 li.active").removeClass("active");
            $(this).addClass("active");
            $("ul#tab_ct_2 li.active").removeClass("active");
            $("ul#tab_ct_2 li:nth-child("+nthChild+")").addClass("active").fadeIn();
        }
    });
	
	//Tab JS Detail
	$(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
	
	//Scripts click Toggle   
var notH = 1,
    $pop = $('.search_box').hover(function(){notH^=1;});

$(document).on('mouseup keyup', function( e ){
  if(notH||e.which==27) $pop.stop().hide();
});
/////// CALL POPUP 
$('.search_icon').click(function(){
	$('.search_box').slideDown("fast");							 	
});	
$('.icon_close').click(function(){
	$('.search_box').slideUp("fast");							 	
});	


});


//Function
$(function() {
		   
	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();
	
  });

$(document).ready(function() {
	//Bx Slider
	$('.bxslider').bxSlider({
	  pagerCustom: '#bx-pager'
	});
});
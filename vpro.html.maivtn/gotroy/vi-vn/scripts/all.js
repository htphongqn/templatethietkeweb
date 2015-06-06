//$('.navbar .dropdown').hover(function() {
//  $(this).find('.dropdown-menu').first().stop(true, true).slideDown(250);
//}, function() {
//  $(this).find('.dropdown-menu').first().stop(true, true).slideUp(205)
//});
// FlexSlider 
 
$(window).load(function(){
  $('.flexslider.flexslider1').flexslider({
	animation: "fade",
	slideshowSpeed: 3000,
	start: function(slider){
	  $('body').removeClass('loading');
	}
  });
});
 
//nav
$( ".navx > li" ).has( "ul" ).addClass("dropdown").after(function() {
   $( ".navx > li.dropdown > a" ).addClass("dropdown-toggle");
   $( ".navx > li.dropdown > a" ).attr("data-toggle","dropdown"); 
  
   $( ".navx > li.dropdown > ul").addClass("dropdown-menu");
});
$( ".navx > li.dropdown > a" ).append("<span class='caret'></span>");
$(".listMain > a > span").removeClass("caret").addClass("glyphicon glyphicon-chevron-down");
//nav

$(function () {
    $('.navbar-toggle').click(function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
        $('#search').removeClass('in').addClass('collapse').slideUp(200);

        /// uncomment code for absolute positioning tweek see top comment in css
        //$('.absolute-wrapper').toggleClass('slide-in');
        
    });
   
   // Remove menu for searching
   $('#search-trigger').click(function () {
        $('.navbar-nav').removeClass('slide-in');
        $('.side-body').removeClass('body-slide-in');

        /// uncomment code for absolute positioning tweek see top comment in css
        //$('.absolute-wrapper').removeClass('slide-in');

    });
});
 

 
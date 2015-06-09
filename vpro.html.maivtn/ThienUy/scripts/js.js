//$(function () {
//    var pull = $('#pull');
//    btnClose = $('#btnClose');
//    menu = $('.navx > ul');
//    navx = $('.navx');
//    menuli = $('.navx > ul > li');
//    menuli_ul = $('.navx > ul > li>ul');
//
//    menuHeight = menu.height();
//
//    $(pull).on('click', function (e) {
//        e.preventDefault();
//        menu.slideToggle();
//    });
//    $(btnClose).on('click', function (e) {
//        e.preventDefault();
//        menu.slideToggle();
//    });
//    var w1 = $(window).width();
//    if (w1 < 767) {
//        navx.addClass("navxMb");
//        menuli_ul.addClass('dropdown');
//        menuli.on('click', function () {
//
//            if ($(this).find('ul.dropdown').is(':hidden')) {
//                $(this).find('ul.dropdown').slideToggle();
//                $(this).find('ul.dropdown').addClass('open');
//            }
//            else {
//                $(this).find('ul.dropdown').slideToggle();
//                return;
//            }
//
//        });
//    }
//
//    $(window).resize(function () {
//        var w = $(window).width();
//        if (w < 767) {
//        }
//
//    });
//	$( ".navx li" ).has( "ul" ).addClass("parent");
//});
//
//$(function () {
//	$( ".navy > ul > li" ).has( "ul" ).addClass("parent");
//	$( ".navy >ul > li> a" ).append("<span class='caretL'></span>");
//});

 

function FloatTopDiv()   
    {   
        startLX = ((document.body.clientWidth -MainContentW)/2)-LeftBannerW-LeftAdjust , startLY = TopAdjust+80;   
        startRX = ((document.body.clientWidth -MainContentW)/2)+MainContentW+RightAdjust , startRY = TopAdjust+80;   
        var d = document;   
        function ml(id)   
        {   
            var el=d.getElementById?d.getElementById(id):d.all?d.all[id]:d.layers[id];   
            el.sP=function(x,y){this.style.left=x + 'px';this.style.top=y + 'px';};   
            el.x = startRX;   
            el.y = startRY;   
            return el;   
        }   
        function m2(id)   
        {   
            var e2=d.getElementById?d.getElementById(id):d.all?d.all[id]:d.layers[id];  
            e2.sP=function(x,y){this.style.left=x + 'px';this.style.top=y + 'px';};   
            e2.x = startLX;   
            e2.y = startLY;   
            return e2;   
        }   
        window.stayTopLeft=function()   
        {   
            if (document.documentElement && document.documentElement.scrollTop)   
                var pY =  document.documentElement.scrollTop;   
            else if (document.body)   
                var pY =  document.body.scrollTop;   
             if (document.body.scrollTop > 30){startLY = 3;startRY = 3;} else  {startLY = TopAdjust;startRY = TopAdjust;};   
            ftlObj.y += (pY+startRY-ftlObj.y)/16;   
            ftlObj.sP(ftlObj.x, ftlObj.y);   
            ftlObj2.y += (pY+startLY-ftlObj2.y)/16;   
            ftlObj2.sP(ftlObj2.x, ftlObj2.y);   
            setTimeout("stayTopLeft()", 1);   
        }   
        ftlObj = ml("divAdRight");   
        //stayTopLeft();   
        ftlObj2 = m2("divAdLeft");   
        stayTopLeft();   
    }   
    function ShowAdDiv()   
    {   
        var objAdDivRight = document.getElementById("divAdRight");   
        var objAdDivLeft = document.getElementById("divAdLeft");     
        if (document.body.clientWidth < 1000)   
        {   
            objAdDivRight.style.display = "none";   
            objAdDivLeft.style.display = "none";   
        }   
        else   
        {   
            objAdDivRight.style.display = "block";   
            objAdDivLeft.style.display = "block";  
            FloatTopDiv();   
        }   
    }

document.write("<script type='text/javascript' language='javascript'>MainContentW = 1000;LeftBannerW = 210;RightBannerW = 2102;LeftAdjust = 25;RightAdjust = 25;TopAdjust = 50;ShowAdDiv();window.onresize=ShowAdDiv;;<\/script>");
 
  
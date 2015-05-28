$(document).ready(function () {
    function OnSubmit(url, lang, boardCode, compositionNo) {
        var param = "Lang=" + lang + "&BoardCode=" + boardCode + "&CompositionNo=" + compositionNo + "&count=Y";
        $.ajax({
            type: "POST",
            url: "/Pr/PrNews.aspx",
            dataType: "Text",
            data: param,
            success: function (msg) {
                //location.href = url;
                window.open(url);
            }
        }
		);
    }
});


// 현재 페이지의 메뉴 아이디
var GLOBAL_CURRENT_MENU_ID = "";

function initLeftMenu(contentId) {
    GLOBAL_CURRENT_MENU_ID = contentId;

    var $obj = $("#" + contentId);
    try {
        if ($obj.parent().hasClass("subMenuBox") ) {
            $obj.parent().show();

            SwapImgOnOff($obj.parent().parent().find('img').get(0), "on");
        }
        // SwapImgOnOff($obj.find('img').get(0), "on");
        SwapImgOnOff($obj.find('img').get(0), "on");
    } catch (e) {
        // alert(e);
    }
}

// 2013 Skip navigation
$('#skip a').focus(function() {
	$(this).css({'top':0,'z-index':10000});
}).blur(function() {
	$(this).css('top',-30+'px');
});

// 탭메뉴
function initTabMenu(tabContainerID) {
    var tabContainer = document.getElementById(tabContainerID);
    var tabAnchor = tabContainer.getElementsByTagName("a");
    var i = 0;

    for (i = 0; i < tabAnchor.length; i++) {
        if (tabAnchor.item(i).className == "tab") thismenu = tabAnchor.item(i);
        else continue;

        thismenu.container = tabContainer;
        thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
        thismenu.targetEl.style.display = "none";
        thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);
        thismenu.onclick = function tabMenuClick() {
            currentmenu = this.container.current;
            if (currentmenu == this) return false;

            if (currentmenu) {
                currentmenu.targetEl.style.display = "none";
                if (currentmenu.imgEl) {
                    currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", "_off.gif");
                } else {
                    currentmenu.className = currentmenu.className.replace(" on", "");
                }
            }
            this.targetEl.style.display = "";
            if (this.imgEl) {
                this.imgEl.src = this.imgEl.src.replace("_off.gif", "_on.gif");
            } else {
                this.className += " on";
            }
            this.container.current = this;

            return false;
        };

        if (!thismenu.container.first) thismenu.container.first = thismenu;
    }
    if (tabContainer.first) tabContainer.first.onclick();
}



/*
$(document).ready(function(){
	$('#tabMenu a').bind('click',function(e) {
		e.preventDefault();
		var thref = $(this).attr("href").replace(/#/, '');
		$('#tabMenu a').removeClass('active');
		$(this).addClass('active');
		$('#tabContent div.listView').removeClass('active');
		$('#'+thref).addClass('active');
	});   
});
*/
 
$(document).ready(function(){
	$('#tabMenu2 a').bind('click',function(e) {
		e.preventDefault();
		var thref = $(this).attr("href").replace(/#/, '');
		$('#tabMenu2 a').removeClass('active');
		$(this).addClass('active');
		$('#tabContent2 div.listView').removeClass('active');
		$('#'+thref).addClass('active');
	});   
});

// 2013 Tab Navigation
jQuery(function($){
	var $tabWrap = $('.tab-wrap');
	$tabWrap.find('.tab-cont').hide();
	$tabWrap.find('li.active .tab-cont').show();
	$tabWrap.each(function(){
		var $this = $(this);
		$this.height($this.find('li.active .tab-cont').height()+40);
	});
	function lineTabMenuToggle(event){
		var $this = $(this);
		$this.next('.tab-cont').show().parent('li').addClass('active').siblings('li').removeClass('active').find('.tab-cont').hide();
		$this.closest('.tab-wrap').height($this.next('ul').height()+40);
	}
	$tabWrap.find('.nav').click(lineTabMenuToggle);
});


// 사업영역 Phogo Gallery - show//hide
$(document).ready(function(){
	$('.viewButton a').toggle(
		function(){
			$('.stationList').hide('slow'); 
			$(this).attr('title', '전체보기');
			$(this).children('img').attr('src', '/images/ko/contents/bizLine/all_view_btn_on.gif');
		},
		function(){
			$('.stationList').show('slow');
			$(this).children('img').attr('src', '/images/ko/contents/bizLine/all_view_btn_off.gif');
			$(this).attr('title', '닫기');
		}
	);
});


/* 2013 nav_mn */
$(document).ready(function () {
	/*
	$('.nav_mn ul').hide();
	$('.ab1').hide();
	
	var ulMenuObj = {
	  moved: false,
	  show: function(){
	   var $here = this;
	   $('.ab1').show();
	   $('.ab1').slideDown('400');
	   $('.nav_mn ul').show().slideDown( '400');
	   $('#headerWrap').css('background-image','url(/img/bg_header2.png)');
	  },
	  hide: function(){
	   var $here = this;
	   $('.nav_mn ul').show().slideUp( '300');
	   $('.ab1').show().slideUp('300');
	   $('#headerWrap').css('background-image','url(/img/bg_header.png)');
	  }
	 };
	 
	 $('.nav_mn li a').mouseover(function(){
	  ulMenuObj.show();
	  return false;
	 });
	 
	 $('.nav_mn li a').focus(function () {
	  ulMenuObj.show();
	  return false;
	 });
	 
	 $('.nav_mn').mouseleave(function(){
	  ulMenuObj.hide();
	  return false;
	 });
	 */
	
	/*
	$('.nav_mn li a').mouseover(function () {
        $('.nav_mn ul').slideDown('slow', function () {
            $(this).show().css('visibility', 'visible');
        });
        $('.ab1').slideDown('slow', function () {
            $(this).show().css('visibility', 'visible');
        });
        $('#allMenu').slideDown('slow', function () {
            $(this).show().css('visibility', 'visible');
        });
        return false;
    });
    $('.nav_mn li a').focus(function () {
        $('.nav_mn ul').slideDown('slow', function () {
            $(this).show().css('visibility', 'visible');
        });
        $('.ab1').slideDown('slow', function () {
            $(this).show().css('visibility', 'visible');
        });
        $('#allMenu').slideDown('slow', function () {
            $(this).show().css('visibility', 'visible');
        });
        return false;
    });
    $('#allMenu').mouseleave(function () {
        $('.nav_mn ul').slideUp();
        $('#allMenu').slideUp();
        $('.ab1').slideUp();
    });
	
	$('.nav_mn ul a').mouseover(function () {
        var $child = $(this).find('img');
        var $src = $child.attr('src');
        $src = $src.replace("off", "on");
        $child.attr({ 'src': $src });

        // 메뉴 설명 이미지 변경
        var $parent = $(this).parent().parent();
        var className = String($parent.attr('class'));
        if (className.indexOf("menubox") > -1) {
            className = className.replace("menubox", "");
            globalChangeTopMenuDesc(className);
        }
    });
    $('.nav_mn ul a').mouseout(function () {
        var $child = $(this).find('img');
        var $src = $child.attr('src');
        $src = $src.replace("on", "off");
        $child.attr({ 'src': $src });
    });
    $('.ab2 ul li a').mouseover(function () {
        var $child = $(this).find('img');
        var $src = $child.attr('src');
        $src = $src.replace("off", "on");
        $child.attr({ 'src': $src });

        // 메뉴 설명 이미지 변경
        var $parent = $(this).parent().parent();
        var className = $parent.attr('class');
        if (className.indexOf("menubox") > -1) {
            className = className.replace("menubox", "");
            globalChangeTopMenuDesc(className);
        }
    });
    $('.ab2 ul li a').mouseout(function () {
        var $child = $(this).find('img');
        var $src = $child.attr('src');
        $src = $src.replace("on", "off");
        $child.attr({ 'src': $src });
    });
    */
});
/* 2013 $(document).ready(function () {
    $('.nav_mn li a').mouseover(function () {
        $('#allMenu').slideDown('slow', function () {
            $(this).show().css('visibility', 'visible');
        });
        return false;
    });
    $('#allMenu').mouseleave(function () {
        $('#allMenu').slideUp();
    });
    $('.ab2 ul li a').mouseover(function () {
        var $child = $(this).find('img');
        var $src = $child.attr('src');
        $src = $src.replace("off", "on");
        $child.attr({ 'src': $src });

        // 메뉴 설명 이미지 변경
        var $parent = $(this).parent().parent();
        var className = $parent.attr('class');
        if (className.indexOf("menubox") > -1) {
            className = className.replace("menubox", "");
            globalChangeTopMenuDesc(className);
        }
    });
    $('.ab2 ul li a').mouseout(function () {
        var $child = $(this).find('img');
        var $src = $child.attr('src');
        $src = $src.replace("on", "off");
        $child.attr({ 'src': $src });
    });
});*/

/** 2013 메뉴 설명글 이미지 변경 
function globalChangeTopMenuDesc(num) {
    var lang = "/images/ko";
    var $obj = $("#oTopMenuTxt");
    var $imgUrl = $obj.attr("src");
    if ($imgUrl.indexOf(lang) == -1) {
        lang = "/images/en";
    }
    var img = lang + "/menu/menu_txt_" + num + ".gif";
    $("#oTopMenuTxt").attr({ "src": img });
}**/

/** 2013 메뉴 설명글 이미지 변경 **/
function globalChangeTopMenuDesc(num) {
    var lang = "/images/ko";
    var $obj = $("#oTopMenuTxt");
    var $imgUrl = String($obj.attr("src"));

    if ($imgUrl.indexOf(lang) == -1) {
        lang = "/images/en";
    }

    var img = lang + "/menu/menu_txt_" + num + ".gif";
    $("#oTopMenuTxt").attr({ "src": img });

    var alt = "";
    if (num == 1) {
        alt = "SUSTAINABILITY. GS건설은 지속가능한 성장과 발전을 추구하는 기업이 되고자 노력을 기울이겠습니다.";
    } else if (num == 2) {
        alt = "COMPANY. GS건설은 Best Partner &amp; First Company를 비전으로 Global 1등 기업이 되고자 합니다.";
    } else if (num == 3) {
        alt = "INNOVATION. 건설의 첨단기술을 연구하고 투자하는 GS건설은 초우량 건설회사로의 발전을 추구합니다.";
    } else if (num == 4) {
        alt = "BUSINESS. 지속가능한 성장과 발전을 추구하는 GS건설은 지속가능 리더기업이 되고자 최선을 다하고 있습니다.";
    } else if (num == 5) {
        alt = "INVESTOR RELATIONS. 글로벌 수준의 우수한 배출현황 및 지속가능성을 확인하실 수 있습니다.";
    } else if (num == 6) {
        alt = "CAREERS. GS건설이 세계 초일류기업으로의 도약을 위해 글로벌 경쟁력을 갖춘 우수한 인재를 기다리고 있습니다.";
    } else if (num == 7) {
        alt = "PR ROOM. 21C 초우량 기업으로 거듭나는 GS건설이 고객님께 소식을 전해드립니다.";
    }
    $("#oTopMenuTxt").attr({ "alt": alt });
}




var $currentActiveTopMenu = null;
$(document).ready(function () {
    $('.leftMenu li a').mouseover(function () {

        if (isLeftTop($(this).parent())) {
            // 현재 선택된 객체가 최상위 메뉴인 경우 모든 메뉴 off
            offLeftAllImg();
        } else {
            // 현재 메뉴가 속한 그룹의 메뉴들 초기화.
            $(this).parent().parent().find("img").each(function () {
                SwapImgOnOff($(this), "off");
            });
        }

        // 현재 페이지가 속한 또는 현재 페이지의 메뉴가 최상위 메뉴라면 항상 활성화 되어야 함.
        // alwaysCurrentMenuOn();

        // 하위 메뉴 활성화 - 사용안함 / 테스트 중
        /*
        var $ul = $(this).parent().parent();
        if ($ul.hasClass('subMenuBox')) {
            var $ulParent = $ul.parent();
            var $parentMenu = $ulParent.find('img').get(0);
            SwapImgOnOff($parentMenu, "on");
        }
        */

        // 현재 메뉴 활성화.
        var $child = $(this).find('img');
        SwapImgOnOff($child, "on");

        // 하위 메뉴 Show
        var $parent = $(this).parent();
        var $subMenu = $parent.find('ul');
        if ($subMenu.hasClass('subMenuBox')) {
            $('.leftMenu .subMenuBox').hide();
            $subMenu.show();
        }
    });
    // 2013 focus 추가
    $('.leftMenu li a').focus(function () {

        if (isLeftTop($(this).parent())) {
            // 현재 선택된 객체가 최상위 메뉴인 경우 모든 메뉴 off
            offLeftAllImg();
        } else {
            // 현재 메뉴가 속한 그룹의 메뉴들 초기화.
            $(this).parent().parent().find("img").each(function () {
                SwapImgOnOff($(this), "off");
            });
        }

        // 현재 페이지가 속한 또는 현재 페이지의 메뉴가 최상위 메뉴라면 항상 활성화 되어야 함.
        // alwaysCurrentMenuOn();

        // 하위 메뉴 활성화 - 사용안함 / 테스트 중
        /*
        var $ul = $(this).parent().parent();
        if ($ul.hasClass('subMenuBox')) {
            var $ulParent = $ul.parent();
            var $parentMenu = $ulParent.find('img').get(0);
            SwapImgOnOff($parentMenu, "on");
        }
        */

        // 현재 메뉴 활성화.
        var $child = $(this).find('img');
        SwapImgOnOff($child, "on");

        // 하위 메뉴 Show
        var $parent = $(this).parent();
        var $subMenu = $parent.find('ul');
        if ($subMenu.hasClass('subMenuBox')) {
            $('.leftMenu .subMenuBox').hide();
            $subMenu.show();
        }
    });
});

function offLeftAllImg() {
    $(".leftMenu li").each(function () {
        $(this).find("img").each(function () {
            SwapImgOnOff($(this), "off");
        });

        $(this).find("ul").each(function () {
            if ($(this).hasClass("subMenuBox")) {
                $(this).hide();
            }
        });
    });
}

function alwaysCurrentMenuOn() {
    $obj = $("#" + GLOBAL_CURRENT_MENU_ID);
    SwapImgOnOff($obj.find("img").get(0) , "on");    
}

function isLeftTop(obj) {
    if ($(obj).parent().hasClass("subMenuBox")) {
        return false;
    }
    return true;
}

/** 이미지 on/off Swap **/
function SwapImgOnOff(obj, replace) {
    $src = $(obj).attr('src');
    if ( replace == "on" ){
        $src = $src.replace("off", "on");
    } else {
        $src = $src.replace("on", "off");        
    }
    $(obj).attr({ 'src': $src });
}

$(document).ready(function(){
	$('.overseasAllMapBox a').mouseover( function () {	
		var $child = $(this).find('img');
		var $src = $child.attr('src');
		$src = $src.replace("off.png", "on.png");
		$child.attr({'src':$src});
	});
	$('.overseasAllMapBox a').mouseout( function () {
		var $child = $(this).find('img');
		var $src = $child.attr('src');
		$src = $src.replace("on.png", "off.png");
		$child.attr({'src':$src});
	});
});


// 팝업 중앙
function popupWinWithNoScroll(sUrl, nWidth, nHeight) {
	nLeft = (window.screen.width - nWidth ) / 2;
	nTop  = (window.screen.height- nHeight) / 3.5;
	sF  = "";
	sF += "toolbar=no,location=no,menubar=no,status=no,directories=no,resizable=no,scrollbars=yes";
	sF += ",left=" + nLeft;
	sF += ",top=" + nTop;
	sF += ",width=" +  nWidth;
	sF += ",height=" + nHeight;
	window.open(sUrl, "", sF);
}
// 스코를 none
function ScrollPopupNo(sUrl, nWidth, nHeight) {
	nLeft = (window.screen.width - nWidth ) / 2;
	nTop  = (window.screen.height- nHeight) / 3.5;
	sF  = "";
	sF += "toolbar=no,location=no,menubar=no,status=no,directories=no,resizable=no,scrollbars=no";
	sF += ",left=" + nLeft;
	sF += ",top=" + nTop;
	sF += ",width=" +  nWidth;
	sF += ",height=" + nHeight;
	window.open(sUrl, "", sF);
}


// scrollTop button
$(document).ready(function() {
	var currentTop = parseInt($(".scrollTop").css("top"));
	$(window).scroll(function() {
		$(".scrollTop").stop().animate({"top": $(window).scrollTop()+currentTop+"px"}, 800);
	});
});



// 인재채용 Slider

function initScrollContent(container, prevBtn, nextBtn) {
	var currentContentPage = 1;
	var contentElCount = 0;
	var content_x = 0;
	var slideContentTo = 0;
	var contentWidth = 250;
	var isImageBtn = true;
	var cont = container.getElementsByTagName("div");

	for (i=0; i<cont.length; i++) {
		if (cont[i].className == "slideContent") {
			contentElCount++;
			cont[i].style.left = contentWidth * (contentElCount - 1) + "px";
		}
	}

	setSlideBtn();

	function setSlideBtn() {
		if (contentElCount == 1) {
			setPrevBtn("off");
			setNextBtn("off");
		} else if (parseInt(currentContentPage) == 1) {
			setPrevBtn("off");
			setNextBtn("on");
		} else if (parseInt(currentContentPage) == contentElCount) {
			setPrevBtn("on");
			setNextBtn("off");
		} else {
			setPrevBtn("on");
			setNextBtn("on");
		}
	}
	function setPrevBtn(condition) {
		if (condition == "on") {
			prevBtn.onclick = viewPrev;
			if (isImageBtn) prevBtn.src = prevBtn.src.replace("_off.gif", ".gif");
			prevBtn.className = prevBtn.className.replace(" off", "");
			prevBtn.className += " on";
		} else {
			prevBtn.onclick = "";
			if (isImageBtn) prevBtn.src = prevBtn.src.replace(".gif", "_off.gif");
			prevBtn.className = prevBtn.className.replace(" on", "");
			prevBtn.className += " off";
		}
	}
	function setNextBtn(condition) {
		if (condition == "on") {
			nextBtn.onclick = viewNext;
			if (isImageBtn) nextBtn.src = nextBtn.src.replace("_off.gif", ".gif");
			nextBtn.className = nextBtn.className.replace(" off", "");
			nextBtn.className += " on";
		} else {
			nextBtn.onclick = "";
			if (isImageBtn) nextBtn.src = nextBtn.src.replace(".gif", "_off.gif");
			nextBtn.className = nextBtn.className.replace(" on", "");
			nextBtn.className += " off";
		}
	}
	function viewPrev() {
		slideContentTo += contentWidth;
		currentContentPage = parseInt(currentContentPage) - 1;
		setSlideBtn();
		startScroll();
	}
	function viewNext() {
		slideContentTo -= contentWidth;
		currentContentPage = parseInt(currentContentPage) + 1;
		setSlideBtn();
		startScroll();
	}
	function startScroll() {
		setTimeout(
			function slideContent() {
				if (Math.abs(content_x - slideContentTo) > 1) {
					content_x += (slideContentTo - content_x) * .15;
					container.style.left = content_x + "px";
					startScroll();
				} else {
					content_x = slideContentTo;
					container.style.left = content_x + "px";
				}
			}

		, 40);
	}
}

// Family Site
$(document).ready(function() {
	$('.familySite a').click(function() {
        $('#familyWebSite').show();
    });
    $('.fw_2 .clse a').click(function() {
        $('#familyWebSite').hide();
    });
    /* 2013 삭제
	$('.familySite').click(function() {
	  $('.familyWebSite').show();
	  $('.related span').click(function() {
		$('.familyWebSite').hide();
	  })
	  $('.familyWebSite').mouseleave(function() {
		$('.familyWebSite').hide();
	  })
	});*/
	$('.links a').mouseover( function () {	
		var $child = $(this).find('img');
		var $src = $child.attr('src');
		$src = $src.replace("off.gif", "on.gif");
		$child.attr({'src':$src});
	});
	$('.links a').mouseout( function () {
		var $child = $(this).find('img');
		var $src = $child.attr('src');
		$src = $src.replace("on.gif", "off.gif");
		$child.attr({'src':$src});
	});
});

/* 2013 IR - Table */
$(document).ready(function () {
    $('.tbl-type1 td:first-child').addClass('lft');
    $('.tbl-type1 td:last-child').addClass('rgt');
    $('.tbl-type1 tbody tr:first-child td').css('border-top-width', '0');
});
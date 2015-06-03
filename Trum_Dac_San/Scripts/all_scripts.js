//All Scripts

/***************Home************/
var $initHomePage = function (cityCookieName, cityId, domain) {
    $(function () {
        initPopupMenu('div.div_btn_city', 'div.list_city');
        initPopupMenu('div.div_list_hotline', 'div.div_hot_line');
        initPopupMenu('div.div_cart_login_register', '.class_list_login_register');
        initPopupMenu('.div_targetLike', '.class_list_like');
        initPopupMenu('div.div_cart_buy', '.class_list_cart');

        $('.btn_top').click(function () {
            $("html, body").animate({ scrollTop: 0 }, 10);
            return false;
        });

        $('.btn_down').click(function () {
            $("html, body").animate({ scrollTop: $(document).height() }, 10);
            return false;
        });

        $('#closeChoosenCity').click(function () {
            $.cookie(cityCookieName, cityId, { expires: 5000, domain: domain, path: '/' });
            $('div.boxTooltipchooseCity').hide();
        });
        
        $("#topcontrol").css("left", parseFloat($('.header').offset().left) + parseFloat($('.header').width()) + 22);
        $(window).resize(function () {
            $("#topcontrol").css("left", parseFloat($('.header').offset().left) + parseFloat($('.header').width()) + 22);
        });
    });
};

/***************Slide Banner*******************/
function HotDealView(id, indexOnCurrent) {
    this.section = $('li', id);
    this.lefts = $('strong a', this.section);
    this.rights = $('em a', this.section);
    this.indexOnCurrent = indexOnCurrent - 1;
    this.initFlag = false;
};

HotDealView.prototype.init = function () {
    if (this.initFlag) {
        return;
    }
    var $this = this;
    $this.on(this.indexOnCurrent);
    $this.rights.mouseover(function () {
        //console.log($this.rights);
        var index = $this.rights.index(this);
        $this.on(index);
    });
    this.initFlag = true;
};

HotDealView.prototype.on = function (index) {
    index = index % this.rights.size();
    this.section.removeClass('sected').eq(index).addClass('sected');
    this.indexOnCurrent = index;
    return index;
};

function RollingHotDealView(view) {
    this.view = view;
    this.timesOnRolling = view.indexOnCurrent;
    this.timeForInterval = -1;
    this.view.init();
};

RollingHotDealView.prototype.start = function (interval) {
    interval = interval || 3000;
    var $this = this;
    $this.view.lefts.mouseover(function () {
        $this.shutdown();
    }).mouseout(function () {
        $this.timeForInterval = setInterval(function () {
            $this.view.on($this.timesOnRolling++);
        }, interval);
    });
    $this.view.rights.mouseover(function () {
        $this.timesOnRolling = $this.view.rights.index(this) + 1;
        $this.shutdown();
    }).mouseout(function () {
        $this.timeForInterval = setInterval(function () {
            $this.view.on($this.timesOnRolling++);
        }, interval);
    });

    $this.timeForInterval = setInterval(function () {
        $this.view.on($this.timesOnRolling++);
    }, interval);
};

RollingHotDealView.prototype.shutdown = function () {
    clearInterval(this.timeForInterval);
};
/***************End Slide Banner*******************/

//Support
$(window).load(function(){
var state = false;

$("#toggle-slide-button").click(function () {
    if (!state) {
        $('#map-legend').animate({width: "toggle"}, 200);		
        $('#toggle-slide-button img').attr('src', '../vi-vn/Images/support_icon.png');

          state = true;
        }
    else {
          $('#map-legend').animate({width: "toggle"}, 100);		  
          $('#toggle-slide-button img').attr('src', '../vi-vn/Images/support_icon.png');

          state = false;
        }
});
});

$( function()
	{
    $("#nav > ul > li").has('ul').addClass('has_sub');

		//carouFredSel
		$('#slide_thumnail ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					responsive: true,
					width: '100%',
					scroll : {
		            	
			            pauseOnHover: true
        			},
					speed: 1000,
					duration: 7000,	
					
					items: {
						width: 60,					
						visible: {
							min: 1,
							max: 6
						}
					}
				});	

	//Gallery	   
    var galleries = $('.ad-gallery').adGallery();

	});

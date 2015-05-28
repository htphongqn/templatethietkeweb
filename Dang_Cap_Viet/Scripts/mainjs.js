jlast3t(document).bind('ready', function() {
	jlast3t('#offlajn-ajax-search #search-area').focusin(function(){
		var $curWidth=jlast3t('#offlajn-ajax-search').actual('width');
		jlast3t('#offlajn-ajax-search').stop().animate({'width':$curWidth+40},{ duration: "slow", easing: "easeOutCubic" });
	});
	jlast3t('#offlajn-ajax-search #search-area').focusout(function(){
		var $curWidth=jlast3t('#offlajn-ajax-search').actual('width');
		jlast3t('#offlajn-ajax-search').stop().animate({'width':$curWidth-40},{ duration: "slow", easing: "easeOutCubic" });
	});
	jlast3t("#btnComment:submit,input.button,button.button,a.button,input[type=text],input[type=email],input[type=password], input[type=checkbox],textarea").uniform();
	
/* 	jlast3t('input[type="text"]').addClass('text');
	jlast3t('input[type="password"]').addClass('password');
	jlast3t('input[type="email"]').addClass('email');
	jlast3t('textarea').addClass('uniform');
	//checkbox
	if(jlast3t('div.checker>span>input:checkbox').length==0){
		jlast3t('input:checkbox').wrap('<span></span>');
		jlast3t('input:checkbox').parent().wrap('<div class="checker"/>');
	}
	jlast3t('div.checker>span>input:checkbox').hover(function(){
		jlast3t(this).parents('div.checker').toggleClass('hover');
	},function(){
		jlast3t(this).parents('div.checker').removeClass('hover');
		jlast3t(this).parents('div.checker').removeClass('active');
	});
	jlast3t('div.checker>span>input:checkbox').mousedown(function(){
		jlast3t(this).parents('div.checker').toggleClass('active');
	});
	jlast3t('div.checker>span>input:checkbox').mouseup(function(){
		jlast3t(this).parents('div.checker').removeClass('active');
	});
	jlast3t('div.checker>span>input:checkbox').change(function(){
		if(jlast3t(this).is(':checked'))
			jlast3t(this).parent('span').toggleClass('checked');
		else	
			jlast3t(this).parent('span').removeClass('checked');
	});
	//button
	if(jlast3t('div.button>span>input.button').length==0){
		jlast3t('input.button').each(function(){jlast3t(this).wrap('<span>'+jlast3t(this).attr('value')+'</span>');
			jlast3t(this).css('opacity',0);
		});
		jlast3t('input.button').parent().wrap('<div class="button"/>');
	}
	jlast3t('div.button>span>input.button').hover(function(){
		jlast3t(this).parents('div.button').toggleClass('hover');
	},function(){
		jlast3t(this).parents('div.button').removeClass('hover');
		jlast3t(this).parents('div.button').removeClass('active');
	});
	jlast3t('div.button>span>input.button').mousedown(function(){
		jlast3t(this).parents('div.button').toggleClass('active');
	});
	jlast3t('div.button>span>input.button').mouseup(function(){
		jlast3t(this).parents('div.button').removeClass('active');
	});
	//button
	if(jlast3t('div.button>span>button.button').length==0){
		jlast3t('button.button').each(function(){jlast3t(this).wrap('<span>'+jlast3t(this).text()+'</span>');
			jlast3t(this).css('opacity',0);
		});
		jlast3t('button.button').parent().wrap('<div class="button"/>');
	}
	jlast3t('div.button>span>button.button').hover(function(){
		jlast3t(this).parents('div.button').toggleClass('hover');
	},function(){
		jlast3t(this).parents('div.button').removeClass('hover');
		jlast3t(this).parents('div.button').removeClass('active');
	});
	jlast3t('div.button>span>button.button').mousedown(function(){
		jlast3t(this).parents('div.button').toggleClass('active');
	});
	jlast3t('div.button>span>button.button').mouseup(function(){
		jlast3t(this).parents('div.button').removeClass('active');
	});
	//button
	if(jlast3t('div.button>span>a.button').length==0){
		jlast3t('a.button').each(function(){jlast3t(this).wrap('<span>'+jlast3t(this).text()+'</span>');
			jlast3t(this).css('opacity',0);
		});
		jlast3t('a.button').parent().wrap('<div class="button"/>');
	}
	jlast3t('div.button>span>a.button').hover(function(){
		jlast3t(this).parents('div.button').toggleClass('hover');
	},function(){
		jlast3t(this).parents('div.button').removeClass('hover');
		jlast3t(this).parents('div.button').removeClass('active');
	});
	jlast3t('div.button>span>a.button').mousedown(function(){
		jlast3t(this).parents('div.button').toggleClass('active');
	});
	jlast3t('div.button>span>a.button').mouseup(function(){
		jlast3t(this).parents('div.button').removeClass('active');
	});
 	jlast3t('div.button>span').click(function(event){
		if(jlast3t(this).children('button.button').length==1){
			jlast3t(this).children('button.button').click();
		}
		if(jlast3t(this).children('input.button').length==1){
			jlast3t(this).children('input.button').click();
		}
	}); 
	//radio
	if(jlast3t('div.radio>span>input:radio').length==0){
		jlast3t('input:radio').wrap('<span></span>');
		jlast3t('input:radio').parent().wrap('<div class="radio"/>');
	}
	jlast3t('input:radio').each(function(){
		if(jlast3t(this).is(':checked'))
			jlast3t(this).parent('span').toggleClass('checked');
		else	
			jlast3t(this).parent('span').removeClass('checked');
	});
	jlast3t('div.radio>span>input:radio').hover(function(){
		jlast3t(this).parents('div.radio').toggleClass('hover');
	},function(){
		jlast3t(this).parents('div.radio').removeClass('hover');
		jlast3t(this).parents('div.radio').removeClass('active');
	});
	jlast3t('div.radio>span>input:radio').mousedown(function(){
		jlast3t(this).parents('div.radio').toggleClass('active');
	});
	jlast3t('div.radio>span>input:radio').mouseup(function(){
		jlast3t(this).parents('div.radio').removeClass('active');
	});
	jlast3t('div.radio>span>input:radio').change(function(){
		if(jlast3t(this).attr('name')!=''){
			jlast3t('input:radio[name='+jlast3t(this).attr('name')+']').each(function(){
				if(jlast3t(this).is(':checked'))
					jlast3t(this).parent('span').toggleClass('checked');
				else	
					jlast3t(this).parent('span').removeClass('checked');
			});
		}
	}); */
	jlast3t('#zt-support .yahoo_support span').hover(function(){
			jlast3t(this).find('a').stop().animate({'top':'5px'},300,'easeOutQuart');
		},function(){
			jlast3t(this).find('a').stop().animate({'top':'10px'},300,'easeOutQuart');
		});

	loadMocThuy();
	jlast3t("body#bd:not('.mocthuy') .zt-article .article-content").mCustomScrollbar({
		set_height:380,
		scrollButtons:{
			enable:true
		}
	});
	jlast3t("body#bd:not('.mocthuy') #zt-component .blog").mCustomScrollbar({
		set_height:380,
		scrollButtons:{
			enable:true
		}
	});
	jlast3t('.jshop_list_product .jshop_list_product').mCustomScrollbar({
		set_height:380,
		scrollButtons:{
			enable:true
		}
	});
});
jlast3t(window).load(function(){
/*  	jlast3t("body#bd:not('.mocthuy') #zt-component .contact .contact_container").mCustomScrollbar({
		set_height:380,
		scrollButtons:{
			enable:true
		}
	});   */
});

function loadMocThuy()
{
	jlast3t('div.ser_box > div img').css('visibility','visible').css('opacity',0);
	jlast3t('div.ser_box > div img img:first').css('opacity',1);
	jlast3t('div.ser_box > div img img:last').css('opacity',1);
	jlast3t('div.ser_box > div img').delay(500);
	jlast3t('div.ser_box > div img').stop().animate({'opacity':1,'display':'inline'},2000,'swing',function(){
		jlast3t(this).delay(300).stop().animate({'opacity':1},1000);
	});
	jlast3t('div.ser_box > div img').stop().animate({'opacity':1,'display':'inline'},2000,'swing',function(){
		jlast3t(this).delay(300).stop().animate({'opacity':1},1000);
	});
	jlast3t('div.ser_box > div img').stop().animate({'opacity':1,'display':'inline'},2000,'swing',function(){
		jlast3t(this).delay(300).stop().animate({'opacity':1},1000);
	});
	jlast3t('div.ser_box > div img').stop().animate({'opacity':1,'display':'inline'},2000,'swing',function(){
		jlast3t(this).delay(300).stop().animate({'opacity':1},1000);
	});
	jlast3t('div.ser_box > div img').stop().animate({'opacity':1,'display':'inline'},2000,'swing',function(){
		jlast3t(this).delay(300).stop().animate({'opacity':1},1000);
	});
	jlast3t('div.ser_box > div img').stop().animate({'opacity':1,'display':'inline'},2000,'swing',function(){
		jlast3t(this).delay(300).stop().animate({'opacity':1},1000);
	});
	jlast3t('div.ser_box > div img').stop().animate({'opacity':1,'display':'inline'},2000,'swing',function(){
		jlast3t(this).delay(300).stop().animate({'opacity':1},1000);
	});
	jlast3t('div.ser_box .item1 h3, div.ser_box .item2 h3, div.ser_box .item4 h3, div.ser_box .item6 h3, div.ser_box .item7 h3').css('visibility','visible').animate({'bottom':'0','opacity':1},1000,'swing');
	jlast3t('div.ser_box .item3 h3').css('visibility','visible').animate({'bottom':'-105px','opacity':1},1000,'swing');
	/*jlast3t('div#cycle_2').delay(500).animate({'top':'230px','left':'10px','opacity':1},1000,'swing',function(){
		jlast3t(this).delay(500).stop().animate({'opacity':0.5},1000);
	});
	jlast3t('div#cycle_3').delay(1000).animate({'top':'350px','left':'235px','opacity':1},1000,'swing',function(){
		jlast3t(this).delay(1000).stop().animate({'opacity':0.5},1000);
	});	
	jlast3t('div#cycle_4').delay(900).animate({'bottom':'225px','left':'625px','opacity':1},1000,'swing',function(){
		jlast3t(this).delay(300).stop().animate({'opacity':0.5},1000);
	});
	jlast3t('div#cycle_4').delay(1500).animate({'top':'230px','left':'460px','opacity':1},1000,'swing',function(){
					jlast3t(this).delay(1500).stop().animate({'opacity':0.5},1000);
						jlast3t('div.cycle_3t').hover(function(){
							jlast3t(this).stop().animate({'opacity':1},200,function(){
								jlast3t(this).find('img:eq(0)').stop().animate({'opacity':1},200,function(){
									jlast3t(this).css({'visibility':'visible','zIndex':0});
								});
								jlast3t(this).find('img:eq(1)').css({'visibility':'visible','zIndex':1}).stop().animate({'opacity':0.5},200);
							});
							
						},function(){
							jlast3t(this).stop().animate({'opacity':0.5},200,function(){
								jlast3t(this).find('img:eq(1)').stop().animate({'opacity':1},200,function(){
									jlast3t(this).css({'visibility':'visible','zIndex':0});
								});
								jlast3t(this).find('img:eq(0)').css({'visibility':'visible','zIndex':1}).stop().animate({'opacity':1},200);
							});
							
						});						
					});*/
}
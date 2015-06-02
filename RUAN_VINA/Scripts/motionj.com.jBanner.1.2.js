/**
* Title : jBanner
* Author : Won Joso (http://blog.naver.com/josoblue , http://www.motionj.com)
* Email : josoblue@motionj.com
* Version : v1.2
* License : Free
* Description :
*
* width : 필수값, 이미지의 너비 (모든 이미지의 사이즈가 같아야 합니다.)
* height : 필수값이미지의 높이.
* speed : 페이드 속도 조절.
* delay : 모션이 되는 중간 딜레이.
* paging: true or false (넘버링 생성)
* space: 1 (넘버링 좌우 간격 조정),
* src : 페이징 넘버 이미지 경로, ex) 'common/img' (기본값 : 'images')
**/

(function($){
	$.fn.mBanner = function(opt){
		opt = $.extend({
			width : 0,
			height: 0,
			speed : 1500,
			delay : 3000,
			paging: true,
			space: 1,
			src: 'Images'
		}, opt || {});

		return this.each(function(){
			// init
			var elt = $(this),
				items = elt.find('li'),
				pause = false,
				no = 1;

			var getPaging = function(){
				var str = '',
					onoff;
				str += '<p>';
				for(var i=0;i<items.length;i++){
					onoff = (i === 0 ? 'on' : 'off');
					str += '<img src="'+opt.src+'/'+ 'btn' +'_'+onoff+'.png" alt="" />';
				}
				str += '</p>';
				return str;
			};

			if(opt.paging){
				elt.append(getPaging());
			};

			//CSS & class Setup
			elt.css({position : 'relative', overflow : 'hidden', padding:0, margin:'0', width : opt.width, height: opt.height});
			elt.find('img').css({border:0});
			elt.find('ul').css({position : 'relative', 'z-index' : 0,padding:0, margin:0});
			elt.find('li').css({position : 'absolute', left: 0, top:'15px', listStyle: 'none'});
			elt.find('p').css({position : 'absolute', top:0, right:0, 'z-index' : 1, textAlign : 'center', margin:0});
			elt.find('p img').css({'cursor':'pointer', margin:'0 '+opt.space+'px'});
			elt.find('ul li:not(:first)').hide();
			elt.find('ul li:first').addClass('on');
			elt.find('p img:first').addClass('on');

			// Action
			var chaingeImageName = function(obj, isOn){
				if(isOn){
					obj.attr('src', obj.attr('src').replace('off.png', 'on.png'));
				}else{ 
					obj.attr('src', obj.attr('src').replace('on.png', 'off.png'));
				}
			};

			var act = function(num, isOver){
				if(!elt.find('ul li:eq(' + num + ')').hasClass('on')){
					if(opt.paging){
						chaingeImageName(elt.find('p img.on'), false);
						elt.find('p img.on').removeClass('on');
						elt.find('p img:eq(' + num + ')').addClass('on');
						chaingeImageName(elt.find('p img:eq(' + num + ')'), true);
					};

					if(isOver){
						elt.find('ul li').hide().removeClass('on');
						elt.find('ul li:eq(' + num + ')').addClass('on').stop().fadeIn('fast');
					}else{
						elt.find('ul li.on').fadeOut(opt.speed).removeClass('on');
						elt.find('ul li:eq(' + num + ')').fadeIn(opt.speed).addClass('on');
					};

					no = (num >= items.length - 1 ? 0 : num + 1);
				}
			};

			// Controllers
			elt.on('mouseover', function(){
				pause = true;
			});
			elt.on('mouseleave', function(){
				pause = false;
			});
			elt.find('p img').each(function(i){
				$(this).on('mouseover', function(){
					act(i, true);
				});
			});

			setInterval(function(){ if(pause == false) act(no); }, opt.delay);
		});
	}
})(jQuery);

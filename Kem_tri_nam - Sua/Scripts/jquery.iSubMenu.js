;(function($){
    /*子菜单*/
    $.fn.subMenu = function(option){
        /*
         * @param provider as [[name,url],[name,url]] format
         *
         * */
        if(!$(this).length) return;
        var options = {
            width:0,
            left:0,
            event:"click"/*click,hover*/
        };
        $.extend(true,options,option);
        function SubMenu(self,o){
            this._self = self;
            this._o = o;
            this.init();
        }
        SubMenu.prototype.init = function(){
	        var $list  = $(this.format(this._o.provider));
            this.css($list.appendTo(this._o.wrap.css("position","relative")));
            this.event(this._self,$list);
            return $list;
        }
        SubMenu.prototype.format = function(data){
            var str = '<div class="plugin-subMenu"><ul>';
	        if(data && data.constructor == Array){
		        for(var item = 0,_len = data.length;item<_len;item++){
			        var _cur = data[item];
			        if(_cur[1]){
				        str += '<li><a href="'+_cur[1]+'">'+_cur[0]+'</a></li>';
			        }else{
				        str += '<li><a href="javascript:;">'+_cur[0]+'</a></li>';
			        }
		        }
	        }else{
		        str += this._self.next().html();
	        }
            str += '</ul></div>'
            return str ;
        }
        SubMenu.prototype.caculate = function(){
            this.top = this._self.height()+this._self.offset().top;
            this.left = this._self.offset().left-this._o.wrap.offset().left+this._o.left;
            this.width = this._self[0].offsetWidth+this._o.width;
            this.paddingTop = this._o.paddingTop;

        }
        SubMenu.prototype.css = function(jDom){
            this.caculate();
			//jDom.attr('id', option.id);
            jDom.css({top:this.top, left:this.left,width:this.width,paddingTop:this.paddingTop});
        }
        SubMenu.prototype.event = function(self,list){
            var timer;
            var _self = this;
            function showEvent(){
                timer && clearTimeout(timer)
                list.show();
            }
            function hideEvent(){
                timer = setTimeout(function(){
                    list.hide();
                },20)
            }
            if(_self._o.event == "click"){
                self.bind("click",function(){
                    list.is(":hidden") ? list.show() : list.hide();
	                return false;
                })
	            $(document).bind("click",function(e){
		            !list.is(":hidden") && list.hide();
		            e.stopPropagation();
	            })
            }else if(_self._o.event == "hover"){
                self.hover(showEvent, hideEvent);
                list.hover(showEvent, hideEvent);
            }
            list.delegate("a","click",function(){
                _self._o.fn  && _self._o.fn($(this));
                list.hide();
            })
        }

        $(this).each(function(){
            return new SubMenu($(this),options)
        })
    }
})(jQuery)
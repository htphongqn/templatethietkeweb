// validation regex
var emailValidation = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
function trim(str){return str.replace(/^\s+|\s+$/g,"");}
$(document).ready(function(){
	getHeadRightData();
	menuHoverIntent(); // lib/jquery.hoverIntent.minified.js
	_initialize('autocomplete_query');
	setTimeout('startcarousel()', 120);
	//setTimeout('showtestimonial()', 5000);
	$('.searchcategory').dropkick({ theme : 'black'});
	$('.dk_toggle').prepend('<span style="color:#aaa">in &nbsp;</span>');
	$('#headcartscroll').tinyscrollbar({ sizethumb: 30 });
	$('.sitewelove li').first().addClass('active').find('.small').hide().siblings('.big').show();
	$('.expandheadright').hide();
		
	// complete logout
	$('.logoutcompletelynow').live("click",function(){
		window.location.href="/control/autoLogout";
		
	});
	
	// login
	$('.loginnow').live("click",function(){
		window.location.href="/control/checkLogin";
		
	});
	
	// partial logout
	$('.logoutmenow').live("click",function(){
		window.location.href="/control/logout";
	});
	
	// set active nav
	$('.cataloglistexpand').live('mouseenter',function(){$(this).closest('li').find('a:first').addClass('active');})
	$('.cataloglistexpand').live('mouseleave',function(){$(this).closest('li').find('a:first').removeClass('active');});
	
	// bannersublist hover lazy loading
	$('.bannersublist li').live('mouseenter',function(){
		$(this).find('.lazy').each(function(indx,imgElem){
			if($(imgElem).attr("data-original")){
	 			$(imgElem).attr("src",$(imgElem).attr("data-original"));
	 			$(imgElem).removeClass('.lazy');
			 }			
	    });
	});
	
	$('.bannersublist li').live('mouseleave',function(){});
	// testimonial click
	$('.usertestimonial').live("click", function(){window.location.href="/customer-stories";});

	/* pixl condtion     */
	function getURLParameter(name) {
	    return decodeURI(
	        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
	    );
	}
	 var referer_source = document.referrer;
	 if(referer_source == null || referer_source =="" || referer_source.match("^http://shopping.indiatimes.com")== "http://shopping.indiatimes.com") 
	 	referer_source = 'DIRECT';
	 var utmkey = getURLParameter("utm_source");
	 var utmkeyUp = utmkey;
	 var _utmuppercase = utmkeyUp.toUpperCase();
	 
	 var _Currdate = new Date();
	 //var _strDate = _Currdate.getDate() + ":" + (_Currdate.getMonth()+1) + ":" + _Currdate.getFullYear();
	 //var _Currtime = _Currdate.getHours()+':'+_Currdate.getMinutes()+':'+_Currdate.getSeconds();
	 //var _timestamp = "D"+_strDate +"T"+ _Currtime; 
	 var _timestamp = _Currdate.getTime();
	 //alert(_timestamp);
	 //alert(_Currtime);
	 var oldReferSource = $.cookie("refer_source");
	 
if(_utmuppercase!=="NULL" && _utmuppercase!==null)
{			
		//var oldCookieValue = $.cookie("utmsource");
		//alert(oldCookieValue +"+"+ _utmuppercase);
		var strGetting = _utmuppercase;
		var digitInStar = strGetting.substring(0,3);
		if(digitInStar=="DGM"){
				$.cookie("utmsource", digitInStar, {expires: 30, path: '/'});
		}
		else{
				$.cookie("utmsource", _utmuppercase, {expires: 30, path: '/'});
		}
		var firstSource = $.cookie("first_utm");
		if(firstSource != null && firstSource !="")
		{
			second_utm_value = _utmuppercase+'##'+getURLParameter("utm_medium")+'##'+getURLParameter("utm_campaign")+'##'+referer_source+'##'+ _timestamp;
			$.cookie("second_utm",second_utm_value, {expires: 30, path: '/'});
		}
		else
		{
			first_utm_value = _utmuppercase+'##'+getURLParameter("utm_medium")+'##'+getURLParameter("utm_campaign")+'##'+referer_source+'##'+ _timestamp;
			$.cookie("first_utm",first_utm_value, {expires: 30, path: '/'});
		}
		//set this in referer
		 $.cookie("refer_source", referer_source, {path: '/'});	
}
else if((oldReferSource == null || oldReferSource == "") && referer_source != null)
{
	var firstSource = $.cookie("first_utm");
	if(firstSource != null && firstSource !="")
	{
		second_utm_value = 'null##'+getURLParameter("utm_medium")+'##'+getURLParameter("utm_campaign")+'##'+referer_source+'##'+ _timestamp;
		$.cookie("second_utm",second_utm_value, {expires: 30, path: '/'});
	}
	else
	{
		first_utm_value = 'null##'+getURLParameter("utm_medium")+'##'+getURLParameter("utm_campaign")+'##'+referer_source+'##'+ _timestamp;
		$.cookie("first_utm",first_utm_value, {expires: 30, path: '/'});
	}
	$.cookie("refer_source", referer_source, {path: '/'});	
}
/*else{
	if(oldCookieValue!=="NULL" && oldCookieValue!=="null" && oldCookieValue!==null)
	{
		$.cookie("utmsource",oldCookieValue +","+"default", {expires: 30, path: '/'});
	}
	else{
		$.cookie("utmsource","default", {expires: 30, path: '/'});
	}
}
*/

function deletecookies(cookiesString){
	    var _cookie_arr=cookiesString.split(",");
	    if(_cookie_arr.length>0){
	    for(i=0;i<_cookie_arr.length;i++){
	    	$.cookie(_cookie_arr[i], null, {expires: -1, path: '/'});
	    }
	    }else{
	    	$.cookie(cookiesString, null, {expires: -1, path: '/'});
	    }
		
}

// SEO content at the bottom
	/*if($('.aboutindiatimes').length>0){
		var a = $('.aboutindiatimes').outerHeight()+0;
		a=a+"px";
		$('.footerwrapper').css("margin-top", a);
		$('.aboutindiatimes').css("bottom", "-" + a);
	}*/

	if($.browser.msie && parseInt($.browser.version, 10) == 7) {
		$(".bannersublist li li a span").click(function(){
			window.location.href = $(this).parent().attr("href");
		})
	}

	
	$('.headrightlabel')
		.live('mouseenter',function(){
			$('.headsignin, .headcart, .headhelp, .headbigdeals').removeClass('headsigninactive headcartactive headhelpactive headbigdealsactive');
			slideup('expandheadright');
			$(this).parent().addClass($(this).parent().attr('id')+'active');
			$(this).find('.expandheadright').slideDown(100);
			$(this).addClass('active');
			$('#headcartscroll').tinyscrollbar({ sizethumb: 30 });
		})
		.live('mouseleave',function(){
			$('.headsignin, .headcart, .headhelp, .headbigdeals').removeClass('headsigninactive headcartactive headhelpactive headbigdealsactive');
			$(this).find('.expandheadright').slideUp(100);
			$(this).removeClass('active');
		});
	
	
	/*
	$('.headrightlabel').live("click",function(){
		if($(this).hasClass('active'))
			{
			$('.headsignin, .headcart, .headhelp').removeClass('headsigninactive headcartactive headhelpactive');
			$(this).parent().find('.expandheadright').slideUp(100);
			$(this).removeClass('active');
			}
		else
			{
			$('.headsignin, .headcart, .headhelp').removeClass('headsigninactive headcartactive headhelpactive');
			slideup('expandheadright');
			$(this).parent().addClass($(this).parent().attr('id')+'active');
			$(this).next().slideDown(100);
			$(this).addClass('active');
			}
		$('#headcartscroll').tinyscrollbar({ sizethumb: 30 });
	});*/
	
	$('.expandheadright .closeme').live("click",function(){
		$('.headsignin, .headcart, .headhelp').removeClass('headsigninactive headcartactive headhelpactive');
		$(this).parents('.expandheadright').slideUp(100);
		$('headrightlabel').removeClass('active');
	});
	
	$('.sitewelove li').hover(function(){
		if($(document).width() > 1205)
			{
			$('.sitewelove li').removeClass('active').find('.big').hide().siblings('.small').show();
			$(this).addClass('active').find('.big').show().siblings('.small').hide();			
			}
		else{
			$('.sitewelove li').removeClass('active').find('.big').hide().siblings('.small').show();
			$(this).addClass('active').find('.big').show().siblings('.small').hide();			
		}
		
	});
	
	$('.catalogwidgetnav ul ul a').click(function(e){
		e.preventDefault();
		if(!$(this).hasClass('active'))
			{
				$(this).closest('.catalogwidget').find('.viewall').attr('href',$(this).attr('href'));
				$(this).parents().eq(3).find('a').removeClass('active');
				var _this = $(this); 
				var catdata=$(this).attr('rel').split('~');
				$(this).addClass('active');
				_this.closest('.catalogwidget').append('<span class="ajaxloader">loading</span>');
				catalogWidgeturi = 'getJsonProductForHomeCategory?categoryId='+catdata[1];
				var catalogWidgetObj={
						url:catalogWidgeturi,
						data:"",
						dataType:"json",
						success:function(response){drawlist(catdata[0],response,catdata[2]); _this.closest('.catalogwidget').find('.ajaxloader').remove();initProductHoverEvents();},
						error:function(){alert('Please try Again');}
						}
				getcatalogWidgetjson(catalogWidgetObj);
			}
	});
	$('.bestseller nav a').click(function(e){
		e.preventDefault();
		if(!$(this).hasClass('active'))
			{
				$(this).parents().eq(1).find('a').removeClass('active');
				$('.bestseller .bestsellercategory').hide();
				//var catdata=$(this).attr('rel').split('~');
				$('.'+$(this).attr('rel')).show();
				//catdata[1]=fashionjson;
				$(this).addClass('active');
				//drawlist(catdata[0],catdata[1],catdata[2]);
			}
	});
	
	
  getHotSearches();
  
  var _ro_widget=new roWidget();
  _ro_widget.init();
});

function getHotSearches(){
	$.ajax({
		url:"http://a2zsearch.indiatimes.com/a2zsearch-api/gaService/getTopQueries",
		type:"GET",
		dataType:"JSONP",
		success:topKeywordCallback,
		error:function(jXhr,jStatus, jError){
			//console.log(jError);
		}	
		
	});	

}
function topKeywordCallback(response){
		$(".hotsearch").html("").hide();
		var _hotsearch_string="";
		if(response.rows.length > 0){
			for(i=0;i<response.rows.length;i++){
				_hotsearch_string=_hotsearch_string + "<a onClick=\"_gaq.push(['_trackEvent','Hot_Search','"+leafTitle+"','"+response.rows[i][0]+"',"+i+",true]);\" href=\"/control/mtkeywordsearch?SEARCH_STRING= "+response.rows[i][0]+"&catalog=all\">"+response.rows[i][0]+"</a>";
				if(i!=response.rows.length-1){
					_hotsearch_string=_hotsearch_string+"<span>,</span>";
				}
			}					
		}
		$(".hotsearch").html("<span>Hot Searches:</span>"+_hotsearch_string).show();	
}


// get headright data
function getHeadRightData()
{
	$.ajax({url: '/control/getHeadRightData',cache: false,success: function(data) {
    	$('.headright').html(data);
    	
    	if (navigator.appVersion.indexOf("MSIE 7.") == -1) {
			$('.searchSubmit').css('position','relative');
			$('.searchSubmit').css('position','absolute');
		}
    	//FBInitialize();
    }});
}


// Lazy loading
function applyLazyLoad(){
    if(jQuery('img.lazy').length > 0){
    	jQuery('img.lazy').lazyload({effect:"fadeIn",failure_limit:500,skip_invisible:false,error_image:'/images/defaultImage.jpg'});		
     }
	 
	 // fix for images in carosuel on click of next     
    $(".productslidecontrol #getnext").click(function(){
	    if(jQuery(this).closest('.homesubcatcontainer').find('.caroufredsel_wrapper img:right-of-fold').length>1)
	    	{
		    	jQuery(this).closest('.homesubcatcontainer').find('.caroufredsel_wrapper img:right-of-fold').each(function(indx,imgElem){
					if($(imgElem).attr("data-original")){
			 			$(imgElem).attr("src",$(imgElem).attr("data-original"));	
					 }			
			    })
	    	}
	    else if(jQuery(this).closest('.brandlistwrapper').find('.caroufredsel_wrapper img:right-of-fold').length>1)
    	{
	    	jQuery(this).closest('.brandlistwrapper').find('.caroufredsel_wrapper img:right-of-fold').each(function(indx,imgElem){
				if($(imgElem).attr("data-original")){
		 			$(imgElem).attr("src",$(imgElem).attr("data-original"));	
				 }			
		    })
    	}
     });
    /*
	 // fix for images in navigation
	 var _nav_image=$(".megasubmenu .catalogbanner .homeproductthumb img.lazy");
	 if($(_nav_image).attr("data-original")){
	 	$(_nav_image).attr("src",$(_nav_image).attr("data-original"));	
	 }*/
	 
}

function getcatalogWidgetjson(paramObj){
   $.ajax(paramObj);
}

function slideup(obj_div){
			$('.'+obj_div).slideUp(100);
}



function drawlist(container,json,htmltemplate){
		var objClass = $("#"+container).attr('class');
		var objId = $("#"+container).attr('id');
		var objWrapper = $("#"+container).closest('.homesubcatcontainer');
		var template = $('#'+htmltemplate).html();
		var html = "";
		for (var i=0; i<json.length; i++)
			{
				html += Mustache.to_html(template, json[i]).replace(/^\s*/mg, '');
			}
		objWrapper.find('.caroufredsel_wrapper').remove();
		objWrapper.prepend("<ul id ='"+objId+"' class ='"+objClass+"' >"+html+"</ul>");
		drawcarousel(objId,3,4);
		
}


function startcarousel(){
	$('.subcategorylist').each(function(index) {
		drawcarousel(this.id,3,4);
		$('#'+this.id).closest('.catalogwidget').find('.catalogwidgetnav').height($('#'+this.id).closest('.homesubcatcontainer').height() - 80);
	});
	$('.bestsellerlist').each(function(index) {
		drawcarousel(this.id,4,6);
	});
	$('.bestsellercategory').hide();
	$('.bestsellercategory:first').show();
	drawcarousel('brandlistwrap',6,8);
	// lazy load
	applyLazyLoad();
	//$('.aboutindiatimes').css('bottom',$(document).height()-$(".footerwrapper").offset().top);
}

function drawcarousel(carouseldiv,min,max){
	jQuery("#"+carouseldiv).carouFredSel({
	responsive:true,
	auto:false,
	align:"center",
	height:"auto",
	width:"inherit",
	circular:false,
	infinite:false,
	prev : "."+carouseldiv+" .previous",
	next : "."+carouseldiv+" .next",
	items: {
		width: 300,
		visible: {
			min: min,
			max: max}
		}
	});
	
}

function showtestimonial(){
	drawtestimonial('testimonialcontent',2,2,'up');
	$('.testimonialcontent blockquote:even').css('border-right','1px dotted #cccccc');
	$('.usertestimonial').css('visibility','visible');
	$('.shoppingpromises').fadeOut(500);
}

function drawtestimonial(carouseldiv,min,max,scrolldirection){
	
	//if(scrolldirection == null || scrolldirection == ""){scrolldirection="left"}
	jQuery("#"+carouseldiv).carouFredSel({
	responsive:true,
	auto:true,
	align:"left",
	height:"auto",
	width:"auto",
	direction:scrolldirection,
	circular:true,
	infinite:true,
	scroll : {
		fx:"fade"
	},
	//prev : "."+carouseldiv+" #getprev",
	//next : "."+carouseldiv+" #getnext",
	auto:{
		timeoutDuration:8000
		},
	items: {
		width: '100%',
		visible: {
			min: min,
			max: max}
		}
	});
}

// auto complete code

var autocomplete_textbox;
function _initialize(autocomplete_textbox_id) {
    autocomplete_textbox = autocomplete_textbox_id;
    $("<div id='suggestions' class='searchSuggest'></div>").insertAfter($('#' + autocomplete_textbox));

//	$('#' + autocomplete_textbox).val("");
	//$('#' + autocomplete_textbox).focus();
	$('.searchSubmit').click(function() {
		if(trim($('#autocomplete_query').val()).length > 0 && $('#autocomplete_query').val() != 'Search Products') {
			var search_string = $('#autocomplete_query').val();
			var search_cat_param = searchFilters();
			search_string = search_string.replace(":", ";");
			search_string = escape(encodeURI(search_string));
			if($('#cloneglobalsearch').length > 0)
				{
				document.location = '/control/pinpointsearch?SEARCH_STRING=' + search_string+$('#cloneglobalsearch').val();
				}
				else{
				document.location = '/control/mtkeywordsearch?SEARCH_STRING=' + search_string+ search_cat_param;
				}
		}
	});

	$('#' + autocomplete_textbox).keydown(function(event) { });
	$('#' + autocomplete_textbox).bind('paste', function() {
	    $(this).keyup();	   
	});		
    $('#' + autocomplete_textbox).keyup(function(event) {
        string = $.trim(this.value);

        if(event.keyCode == 38) {
            var elem = $('a[suggestion]');
            if(elem.length && elem.eq(pos).length && $('#suggestions').is(':visible')) {
                pos--;
                if(pos < 0) pos = elem.size() - 1;

                resetHover();
                if(elem.eq(pos).attr('suggestion').length == 0)
                    this.value = decodeURI(query);
                else if(this.value != elem.eq(pos).attr('suggestion'))
                    this.value = unescape(decodeURI(elem.eq(pos).attr('suggestion')));
                elem.eq(pos).addClass('searchSuggestHover');
            }
        }else if(event.keyCode == 40) {
            var elem = $('a[suggestion]');
            if(elem.length && elem.eq(pos).length && $('#suggestions').is(':visible')) {
                pos++;
                if(pos > elem.size() - 1) pos = 0;

                resetHover();
                if(elem.eq(pos).attr('suggestion').length == 0)
                    this.value = decodeURI(query);
                else if(this.value != elem.eq(pos).attr('suggestion'))
                    this.value = unescape(decodeURI(elem.eq(pos).attr('suggestion')));
                elem.eq(pos).addClass('searchSuggestHover');
            }
        }else if(event.keyCode == 13) {
            var url;
            if(pos < 0 || typeof pos == "undefined") {
            	if($.trim(this.value).length > 0) {
					var search_string = $('#autocomplete_query').val();
					search_string = search_string.replace(":", ";");
					search_string = escape(encodeURI(search_string));
					var search_cat_param = searchFilters();
					url = "/control/mtkeywordsearch?SEARCH_STRING=" + search_string;
					if($('#cloneglobalsearch').length > 0)
					{
					document.location = '/control/pinpointsearch?SEARCH_STRING='+search_string+$('#cloneglobalsearch').val();
					}
					else{
					document.location = url+search_cat_param;
					}
                }
            }else {
                var elem = $('a[suggestion]');
                url = elem.eq(pos).attr('href');
            	document.location = url;
            }
        }else if(this.value.length < 3 || event.keyCode == 27) {
            pos = -1;
            query = "";
            $('#suggestions').fadeOut();
            if(xhr) xhr.abort();
//            $('#statistics').html('&nbsp;');
//            $('#' + autocomplete_textbox).css('background-image', '');
            //$('#suggestions').fadeOut();
//            setTimeout("$('#suggestions').html('')", 500);
        }else {
            if( (event.keyCode >= 46 && event.keyCode <= 90) || (event.keyCode == 8) ) {
                pos = -1;
                resetHover();

                clearTimeout(timer);
                timer = setTimeout("_suggestions('" + string + "')", 15);
//                _suggestions(string);
            }
        }
    });
    $('#' + autocomplete_textbox).blur(function() {
        pos = -1;
        query = "";
        
        if(xhr) xhr.abort();
        
        
//        $('#statistics').html('&nbsp;');
//        $('#' + autocomplete_textbox).css('background-image', '');
        $('#suggestions').fadeOut();
//        setTimeout("$('#suggestions').html('')", 500);
    });
}
var query, pos, timer, xhr;
var seggestionsCache = {};

function _suggestions(string) {
    if(query != string) {
        if(xhr) xhr.abort();
        if(!containsInSearch(seggestionsCache, string)){
            query = encodeURI(string);
    		var search_cat_param = searchFilters();
    		
          //-------------------- URL For live site 
          var _xhr_host = "http://a2zsearch.indiatimes.com/a2zsearch-api/autocompletionservice/getsuggestions";
          _xhr_host =  _xhr_host+"?keyword=" + escape(query) + "&primaryCatalogId="+$('#searchcategory_query').val();
          //console.log(_xhr_host);
          $.ajax({
        	    type: "GET",
        	    url: _xhr_host,
        	    dataType: "JSONP",
        		success: autosuggetCallback,
        		error: function(data){
        			//console.log(data);
        		}
        	});
        }else{
        	query = string;
        	autosuggetCallback(seggestionsCache[containsInSearch(seggestionsCache, string)]);
        }
    }
}


function containsInSearch(hayStack, needel){
	var result  = false;
	try {
		for(key in hayStack)
		{
			if(key == null || $.trim(key) == ""){
				continue;
			}
			if(key.toLowerCase() == needel.toLowerCase()){
				result =  key;
			}
		}
	}catch (e) {
	}
	return result;
}

function autosuggetCallback(data){
	var suggestions = "";
	query = unescape(decodeURI(query));
	var tokens = query.split(" ");
	if(seggestionsCache[query])	{
		suggestions = seggestionsCache[query];
	}else{
		var facets = data["facets"];
		if(facets && facets.length  && facets.length > 0){
			seggestionsCache[query] = data;
			
	        for(var i=0;i<facets.length;i++) {
	            var items = facets[i]["itemList"];
	            if(items.length > 0) {
	                suggestions += "<div class='catMajor'><span>" + facets[i]["head"] + "</span><br />";
	                
	                for(var j=0;j<items.length;j++) {
	                    var display_str = items[j]["productName"];
	                    var tags = items[j]["tags"];
	                    suggestions += "<a suggestion='" + query + "' href='" + items[j]["url"] + "' onmouseover='pos=-1;resetHover();'>";
	                    suggestions += "<div style='text-align:left;padding:0 0 3px;'>";
	                    suggestions += "<div style='overflow:hidden;height:20px;'>" + display_str + "</div>";
	                    suggestions += "</div>";
	                    suggestions += "</a>";
	                }
	            }
	        }
	    }
	}
	
	if(suggestions != ""){
		seggestionsCache[query] = suggestions;
	}else {
		suggestions  =  $('#suggestions').html();
	} 
	
	for(var x=0;x<tokens.length;x++) {
    	var matcher = new RegExp("(<div style='overflow:hidden;height:20px;'>)(.*?)("+tokens[x]+")(.*?)(</div>)", "ig" );
    	suggestions =  suggestions.replace(matcher, "$1$2<b>$3</b>$4$5");    	
    }
    if(suggestions !=""){
		$('#suggestions').html(suggestions);
	    $('#suggestions').show();    	
    }
    
 }


function resetHover() {
    var elem = $('a[suggestion]');
    for(var i=0;i<elem.size();i++)
        elem.eq(i).removeClass('searchSuggestHover');
}

function searchFilters(){
	var _params="";
	 if($('#searchcategory_query')){
	 	_params="&catalog="+$('#searchcategory_query').val();
	 }
	 return _params;
	
}

/* Track Order */
function addCookie(key, value){
	try{$.cookie(key, value, {path:'/'});
	} catch(e) {/*Do nothing*/}
	 
}


/* Create RO widget*/
function roWidget(){
	var _this=this;
	var n = $(".ro_row2 div.prd").length;
	var _t = -150*(n-2);
    var _flg=0;
    _this.init = function(){
    	$(document).on('click','.roTbalebdr .next',function(e){
		e.preventDefault();
			  if(parseInt($('.roTbalebdr .ro_row2').css('left')) > _t && _flg==0){
	      			_flg= 1;
					$('.roTbalebdr .pre').addClass('preactive');
					var a = parseInt($('.ro_row2').css('left')) - 150;	
					$('.roTbalebdr .ro_row2').animate({left: a+"px"}, 'slow', function(){
						_this.setecomwidgetcontrol();
						_flg= 0;
					});	
				}			
		});
		$(document).on('click','.roTbalebdr .pre',function(e){	
				e.preventDefault();
				$('this').removeClass('pre');	
		         if( parseInt($('.roTbalebdr .ro_row2').css('left')) < 0 && _flg==0){	
					_flg= 1;			 
					var a = parseInt($('.ro_row2').css('left')) + 150;	
					$('.roTbalebdr .ro_row2').animate({left: a+"px"}, 'slow',function(){
						_this.setecomwidgetcontrol();
						_flg= 0;
					});			
				}					
		});	    	
    	
    }
	_this.setecomwidgetcontrol = function(){
		if(parseInt($('.roTbalebdr .ro_row2').css('left')) == 0){
			$('.roTbalebdr .pre').css("opacity",0.5);	
		}else{
			$('.roTbalebdr .pre').css("opacity",1);		
		}
		if(parseInt($('.roTbalebdr .ro_row2').css('left')) == _t){
			$('.roTbalebdr .next').css("opacity",0.5);	
		}else{
			$('.roTbalebdr .next').css("opacity",1);		
		}	
	}
}

//--BEGIN -new order account page js.
$(document).ready(function(e) {
    $('.shippingAdd p').hide();
	$('.billingAdd p').hide();
	$('.shippingAdd p.'+$('#shippingAddress').val()).show();
	$('.billingAdd p.'+$('#billingAddress').val()).show();
	$('#shippingAddress').change(function(){
		$('.shippingAdd p').hide();
		$('.shippingAdd p.'+$(this).val()).show();
		});
	$('#billingAddress').change(function(){
		$('.billingAdd p').hide();
		$('.billingAdd p.'+$(this).val()).show();
		});

	$(".setDefaultAddressLink").click(function(){
	 if($(this).attr("rel") != ""){
		 document.forms.setDefaultAddress.defaultAddressMechId.value=$(this).attr("rel");
		 document.forms.setDefaultAddress.submit();
	 }
	});

});


function orderHistory(){
	shopbycatHoverIntent(); // lib/jquery.hoverIntent.minified.js
	menuHoverIntent(); // lib/jquery.hoverIntent.minified.js
	var order_counter=$(".order-container").length;
	if( order_counter < 10){$(".show-more-orders").hide();}
	$(".pageHead span").html(order_counter);

	this.initEvents=function(){
		/*if( $('input:radio[value=M]:checked') || $('input:radio[value=F]:checked'))
			{
				alert("Checked");
			}
		$('input:radio[value=M]').attr('checked', 'checked');*/
		
		$(document).on("click", ".thickbox-custom", function(e){
			e.preventDefault();
			tb_show($(this).attr('title'),$(this).attr('href'));
		});
		
		$(document).on("click", ".leftarea ul li", function(){
			$(".tab_contents").hide();
			$(".leftarea ul li").removeClass("tab_Selected");
			$(this).addClass("tab_Selected");
			var selected_leftTab = $(this).attr("rel");
			if(selected_leftTab == "gift"){
				$(".gift_wrap .tabArea span:first-child").click();
			}
			$("."+$(this).attr("rel")+"_wrap").show();
		});
		$(document).on("click", ".tabArea span", function(){
			$(".tabArea span").removeClass("spanSelected");
			$(this).addClass("spanSelected");
			$(".tabContents").hide();
			$("."+$(this).attr("rel")+"_contents").show();
		});
		$(document).on("click",".showHide", function(){
			var classdetails= $(this).attr("class");
			var orderNo = classdetails.split('_')[0];
			$("."+orderNo+"_showmore").slideToggle("slow");
			if($(this).hasClass("showHide_open")){
				$(this).removeClass("showHide_open");
			}
			else{
				$(this).addClass("showHide_open");
			}
		});
		$(document).on("click", ".showDetailsbtn" , function(){
			$(this).next("div").slideToggle();
			if($(this).children(".arrow").hasClass("arrowclicked")){
				$(".showDetailsbtn .arrow").removeClass("arrowclicked");
				$(this).children(".showdetail_txt").html("Show Details");
			}
			else{
				$(this).children(".arrow").addClass("arrowclicked");
				$(this).children(".showdetail_txt").html("Hide Details");
			}
		});

			$('#showBirthDate').change(function(){
				var dtVal = this.value;
				//alert(dtVal);
				var dateArr = dtVal.split("/");
				var dateVal = dateArr[2]+ '-' +dateArr[1]+ '-' +dateArr[0];
				$('#birthDate').val(dateVal);
			})

		
			//page load initiate......
			$(".showHide").first().click();
	    	//alert('${tab!}');
	    	if(tabClickedVal == ""){
	    		tabClickedVal = 'order';
	    	}
	    	//alert("#"+tabClickedVal);
	    	$("#"+tabClickedVal).click();

		$(".tabContents table tr:even").css("background-color", "#f2f2f2");
		
		$(document).on("click",".show-more-orders",function(e){
			e.preventDefault();
			var order_count=$(".order-container").length;
			$("#overeffect, #updating").show();
				//alert(order_count);
			$.ajax({
				url:"/control/orderhistorydata",
				method:"GET",
				data:{"VIEW_INDEX":order_count+1}			
			}).done(function(data){
				$(".orders-inner-wrapper").append(data);
				var totalCount_Orders = parseInt($(".totalOrdersCount").text());				
				if(totalCount_Orders == $(".order-container").length){$(".show-more-orders").hide();}
				$(".pageHead span").html($(".order-container").length);
				$('.FancytoolTip').simpletooltip(); 
			}).fail(function(jqXHR, textStatus, errorThrown){			
				//alert(errorThrown);
			}).always(function(){
				$("#overeffect, #updating").hide();
				
			})
	
		});
		
		$(document).on("click",".pdf-link",function(){
			var _order_id=$(this).parents(".order-container").attr("data-orderid");
			window.open("/control/order.pdf?orderId="+ _order_id,'100px','100px')
		});	
		
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var today = dd+'/'+mm+'/'+yyyy;
	    //alert(today);
		$('.FancytoolTip').simpletooltip(); 
		$('#showBirthDate').datePicker({autoFocusNextInput: true, startDate:'06/12/1900', endDate:new Date()});
		/*$('#birthdate').datePicker({autoFocusNextInput: true, startDate:'06/12/1900', endDate:'03/01/2014'});*/
		giftCoupon.constructor();
		
		$(document).on("click",".cancelreview",function(){
			tb_remove();
		});
	}
}

/* report an issue submit*/
function reportIssueSubmit(reportIssueForm){
	var cancelled_ordernumber = $(".order .value").text();
	var cancelled_ordername = $("#orderItemSeqId option:selected").text();
	_gaq.push(['_trackEvent','Request Cancellation',cancelled_ordernumber,cancelled_ordername,0,true]);
 var _validate_form= evalForm(reportIssueForm);
 if(_validate_form==true){  
  var _msg="";
  switch($("#custRequestCategoryId").val()){
  case "REQUEST_WEB_CASE":
	  reportIssueForm.submit();
	  $("#overeffect,#updating").show();
	  break;
  case "REQUEST_CANCELLATI":
	  var _confirm_box = new confirmBox();
	  _msg="Are you sure you want to cancel your order?";
	  _confirm_box.setMessage(_msg);
	  _confirm_box.confirm=function(){
	    reportIssueForm.submit();
	  }
	  break;
 default:
 	reportIssueForm.submit();
	 break;
  }
  
 
 } 
  return false;
}
//--END -new order account page js.


/**
 * jQuery iTabs() plugin
 * This is a simple jquery plugin to create tabs on your website
 * Author: Peter Tran 
 * URL: http://www.ewebvn.com
 * Version: 1.0.0
 * Date: 2011-02
 * Required: jquery lib, you can download at jquery.com
 *
 * The HTML markup used to build the tabs can be as simple as...
 *  <ul id="tabs">
 *  	<li>Tab 1</li>
 *      <li>Tab 2</li>
 *      <li>Tab 3</li>
 *  </ul>
 *	<div>Tab 1 content</div>
 *  <div>Tab 2 content</div>
 *	<div>Tab 3 content</div> 
 *
 * Use the following snippet to initialize your tabs.
 *   $(function() { $("#tabs").iTabs({ selected: 1, activeClass: "active", event: "click", delay: 100 }) });
 *
 * Options:
 * 	- selected: Default tab item will be selected. Based index from 1, default: 1
 * 	- activeClass: Actived class to style with your CSS, default: 'active'
 * 	- event: Event handler with tab item, this plugin only support mouse event, default is 'click'
 * 	- delay: Delay time's fadeIn, default: 0 ns
 */
 
( function( $ ) {
	$.fn.extend({
		iTabs: function(options) {
			//Default options
			var defaults = {
				selected	: 	1,
				activeClass	:	'active',
				event		:	'click',
				delay		:	0
			}
			var opts =  $.fn.extend(defaults, options);
			var activeTab = opts.selected - 1; //Based index from 1
				
			$(this).find("li:eq("+activeTab+")").addClass(opts.activeClass);
			$(this).find("div:lt("+activeTab+")").hide();
			$(this).find("div:gt("+activeTab+")").hide();
				
			var obj = $(this);
			var items = $("ul", obj);
			var event = (opts.event == 'click' || opts.event == 'hover') ? opts.event : 'click';
			
			items.find("li").bind(event, function() {
				var current_index = items.find("li").index(this);
				items.find('li.'+opts.activeClass).removeClass(opts.activeClass);
				items.find("li:eq("+current_index+")").addClass(opts.activeClass);
				obj.find("div").hide();
				obj.find("div:eq("+current_index+")").fadeIn(opts.delay);
			});
		}
	});
})( jQuery );
/* $Id: common-functions-v35.js,v 1.34 2012/10/02 08:33:09 JanJ Exp $ */

// -----------------------------------------------------------------------------
// js functions needed on all pages of version 3.5
// -----------------------------------------------------------------------------

//<![CDATA[

var mm = maxiMenu = createDebugObject( {
		
	// object name used for creating debug cookie name, appears in messages, too
	objectName : "maxiMenu",
	// list of used categories to have shorter code
	// TODO : consider some better object for enabled category settings globally ?
	categories : [
		"skincare", "makeup", "fragrance", "body", "hair", "accessories",
		"wellness", "men", "kids", "oralcare", "daretobe", "veryme"
	],
	// currently opened menu category
	activeCategory : "",
	// positioning of the particular menu
	menuWrapperWidth : -1,
	menuWrapperOffset : -1,
	// selectors used
	sel : {
		menuWrapper : "#menuProductsBoxInner",
		maxiMenu : ".maxi-menu",
		li : "li#mn2-",
		h1 : ".maxi-menu-h1",
		cat : ".category",
		catMaxiMenu : "#maxi-menu-",
		catList : ".categories-list",
		moreProducts : ".more-products",
		moreProductsList : ".more-products ul",
		popularProduct : ".popular-product",
		bottomBorder : ".go-to-all .border"
	},
	// maxi menu URL
	maxiMenuUrl : "/utils/page-segments/menu/products-maxi-menu.jhtml?category=",
	// minimum main sections height
	minSectionHeight : 285,
  // is maximenu functionality currently switched on? 
  isInitialized : false,
	
	/**
	 * Initializes maxi menu mouse events and some properties.
	 * @param options Not used for now.
	 */
	init : function( options ) {
		if( isMobile() ) return;
    if( options && options.checkInitialized && mm.isInitialized ) return;        
		// mouse event handlers
		for( var i = 0; i < mm.categories.length; i++ ) {
			var enabled = eval( mm.categories[ i ] + "Enabled" );
			mm.i( mm.categories[ i ] + " enabled : " + enabled );
			if( enabled ) {
        $( mm.sel.li + mm.categories[ i ] + " a" ).data( {
					"prodCat" : mm.categories[ i ],
					"brandCat" : eval( mm.categories[ i ] + "BrandsCat" )
				} ).bind( "mouseenter.mm", function() {
					var d = $( this ).data();
					mm.i( "mouseenter, " + d.prodCat + ", " + d.brandCat );
					mm.showMaxiMenu( d.prodCat, d.brandCat );
				} );
				$( mm.sel.li + mm.categories[ i ] ).data( {
					"prodCat" : mm.categories[ i ]
				} ).bind( "mouseleave.mm", function() {
					var d = $( this ).data();
					mm.i( "mouseleave, " + d.prodCat );
					mm.hideMaxiMenu( d.prodCat );
				} );
			}
		}
    mm.isInitialized = true;
	},
  
  deactivate : function( options ) { 
		// remove mouse event handlers
    
    if( options && options.checkInitialized && !mm.isInitialized ) return;
    
		for( var i = 0; i < mm.categories.length; i++ ) {
			var enabled = eval( mm.categories[ i ] + "Enabled" );
			mm.i( mm.categories[ i ] + " enabled : " + enabled );
			if( enabled ) {
				$( mm.sel.li + mm.categories[ i ] + " a" ).unbind( "mouseenter.mm" );
				$( mm.sel.li + mm.categories[ i ] ).unbind( "mouseleave.mm" ); 
			}
		}
    mm.isInitialized = false;
	},
	
	/**
	 * Checks the subwrapper position to place the active menu properly.
	 */
	checkMenuWrapperSize : function() {
		var menuWrapper = jQuery( mm.sel.menuWrapper );
		if( menuWrapper ) {
			mm.menuWrapperWidth = menuWrapper.outerWidth();
			var offset = menuWrapper.offset();
			if( offset ) mm.menuWrapperOffset = offset.left;
			mm.i(
				"menuWrapperWidth : " + mm.menuWrapperWidth +
				", menuWrapperOffset : " + mm.menuWrapperOffset
			);
		}
	},
	
	/**
	 * Shows maxi menu for category specified by parameter and counts its position (left).
	 * @param prodCategory - main product category id ("skincare", "makeup" etc. values expected)
	 * @param brandsMainCategory - id of main brands category ("scbrands", "mkbrands" etc. values expected)
	 */
	showMaxiMenu : function( prodCategory, brandsMainCategory ) {
		jQuery( mm.sel.li + prodCategory ).addClass( "hover" );
		// do nothing on lightsite
		if( lightSiteEnabled ) return;
		// hide previous maxi menu if any of any of them is visible
		jQuery( mm.sel.maxiMenu ).addClass( "hidden" );
		//show maxi menu for the prodCategory   
		var prodCatMaxiMenu = jQuery( mm.sel.catMaxiMenu + prodCategory );
		activeCategory = prodCategory;
		if( prodCatMaxiMenu.html().length == 0 ) {
      //check if already loading
      if (prodCatMaxiMenu.attr("loading") == "true") {
        //request already sent previously, do nothing
        return
      }
      //mark as loading
      prodCatMaxiMenu.attr("loading", "true");
			//ajax call maxi menu
			var url = mm.maxiMenuUrl + prodCategory;
			if( brandsMainCategory.length > 0 ) url += "&brandsMainCat=" + brandsMainCategory;
			// load particular category menu via ajax
			// TODO : consider doing this directly in HTML code, not via ajax
			prodCatMaxiMenu.load( url, function() {
				var m = $( this );
				// functions below needs to 'see' maxi menu for size based computations
				m.removeClass( "hidden" );
				// resize widths & heights properly
				mm.countPositionAndShow( prodCategory, m );
				// this is just a bugfix for IE7
				mm.setBottomBorderWidth( m );
				mm.hideIfNotActive( prodCategory, m );
			} );
		} else {
			prodCatMaxiMenu.removeClass( "hidden" );
		}  
	},
	
	/**
	 * Hides maxi menu for category specified by parameter.
	 * @param prodCategory - main product category id ("skincare", "makeup" etc.
	 * values expected)
	 */
	hideMaxiMenu : function( prodCategory ) {  
		jQuery( mm.sel.li + prodCategory ).removeClass( "hover" );
		if( lightSiteEnabled ) return;
		jQuery( mm.sel.catMaxiMenu + prodCategory ).addClass( "hidden" );
	},
	
	/**
	 * Hides maxi menu for category specified by parameter if it is not active anymore.
	 * Called after all computation which needs to temporarily makes maxi menu visible is done.
	 * @param prodCategory - main product category id ("skincare", "makeup" etc. values expected)
	 * @param menu Particular opened maxi menu as jQuery object.
	 */
	hideIfNotActive : function( prodCategory, menu ) {
		if( $( mm.sel.li + prodCategory ).hasClass( "hover" ) && activeCategory == prodCategory ) {
			// show maxi menu for this category only if there was no mouseover
			// another category in the meantime
			menu.removeClass( "hidden" );
		} else {
			// otherwise hide (was displayed only for enabling js counting
			// of position, width and height)
			menu.addClass( "hidden" );
		}
	},
	
	/**
	 * Resizes widths and heights, optionally splits category into more columns,
	 * opens menu and sets left position of the opened menu. We consider the
	 * menu wrapper to be centered and to cover the whole menu width. It is the 
	 * next higher element relativelly to which the current maxi menu is positioned.
	 * @param prodCategory Product category of current menu.
	 * @param menu Particular opened maxi menu as jQuery object.
	 */
	countPositionAndShow : function( prodCategory, menu ) {
		$( menu ).removeClass( "hidden" );
		mm.splitAndResizeCategoriesList( menu );
		mm.setPartsHeight( menu );
		// count left position
		if( mm.menuWrapperWidth == -1 ) mm.checkMenuWrapperSize();
		var prodCatLi = jQuery( mm.sel.li + prodCategory );
		var anchor = jQuery( mm.sel.li + prodCategory + " a" );
		var l1 = prodCatLi.offset().left - mm.menuWrapperOffset;
		var sum1 = mm.menuWrapperWidth - anchor.outerWidth();
		var sum2 = mm.menuWrapperWidth - menu.outerWidth();
		var koef = ( sum2 ) ? ( sum1 / sum2 ) : 1;
		mm.i(
			"l1 : " + l1 + ", sum1 : " + sum1 +
			", menuWrapperWidth : " + mm.menuWrapperWidth +
			", menu.outerWidth() : " + menu.outerWidth() +
			", sum2 : " + sum2 + ", koef : " + koef +
			", result left : " + Math.round( l1 / koef )
		);
		menu.css( "left", Math.round( l1 / koef ) + "px" );
	},
	
	/**
	 * CATEGORY part of maximenu:
	 * Splits list of categories into 2 or 3 columns if needed.
	 * Splitting to similar height columns, count depends on the whole list height.
	 * The count of resulting columns is marked in parent div class, so that each
	 * case can be adjusted in CSS properly.
	 * @param menu Particular opened maxi menu as jQuery object.
	 */
	splitAndResizeCategoriesList : function( menu ) {
		var categoriesList = jQuery( mm.sel.catList, menu );
		var c = jQuery( mm.sel.cat, menu );
		if (categoriesList.height() > 540) { //2*270px
			categoriesList.easyListSplitter({ colNumber: 3 });
			c.addClass( "threeColumns" );
		} else if (categoriesList.height() > 270) {
			categoriesList.easyListSplitter({ colNumber: 2 });
			c.addClass( "twoColumns" );
		} else {
			c.addClass( "oneColumn" );
		}
		// remove padding from first h2 list items when present
		jQuery.each( jQuery( mm.sel.catList, menu ), function( i, catList ) {
			var firstAnchor = jQuery( catList ).children( ":first" ).children( ":first" );
			if( firstAnchor.hasClass( "maxi-menu-h2" ) )
				firstAnchor.css( "paddingTop", 0 );
		} );
		mm.resizeLists( menu );
	},
	
	/**
	 * Helper function for resizing menu lists according to their item widths.
	 * Category & More products sections are resized this way.
	 * @param menu Particular opened maxi menu as jQuery object.
	 */
	resizeLists : function( menu ) {
		// resize all h1 captions
		mm.i( "captions count : " + jQuery( mm.sel.h1, menu ).length );
		jQuery.each( jQuery( mm.sel.h1, menu ), function( i, caption ) {
			mm.i( "caption " + i + " ..." );
			mm.resizeCaption( jQuery( caption ) );
		} );
		// resize all category columns
		jQuery.each( jQuery( mm.sel.catList, menu ), function( i, catList ) {
			mm.resizeList( jQuery( catList ), "Category column " + i );
		} );
		// adjust width of more products part of menu
		mm.resizeList( jQuery( mm.sel.moreProductsList, menu ), "More products" );
	},
	
	/**
	 * Checks main section caption text in a span child to fit into caption's max-width.
	 * When longer, it gets shortened considering whole words.
	 * @param caption Particular h1 menu caption as jQuery object.
	 */
	resizeCaption : function( caption ) {
		if( ! caption ) return;
		// CSS max width of current caption
		var cssMaxWidth = parseInt( caption.css( "maxWidth" ) ) || 0;
		mm.i( "caption cssMaxWidth " + cssMaxWidth );
		// reset width to not be limited in horizontal size before measuring the height
		caption.css( { "maxWidth" : "900px", "width" : "auto", "whiteSpace" : "nowrap" } );
		var c = ( caption.children().length ) ? caption.children( ":first" ) : caption;
		mm.shorten( c, cssMaxWidth );
		caption.css( { "maxWidth" : "", "width" : "", "whiteSpace" : "" } );
		mm.i( "caption result width : " + caption.width() );
	},

	/**
	 * Sets inline width and max-width of specified list element ( UL ) to have enough
	 * space to "measure" contained items widths considering it's maximum width set
	 * in list style. When the width of the particular list item is bigger then list
	 * max-width, the list item is shortened to fit and to contain whole words plus
	 * optionally three dots string.
	 * @param list The list targeted as jQuery object.
	 * @param description Only for debugging purposes.
	 */
	resizeList : function( list, description ) {
		if( ! list ) return;
		var cssMaxWidth, ci;
		// CSS max width of current list ( column )
		cssMaxWidth = parseInt( list.css( "maxWidth" ) ) || 0;
		// reset width to not be limited in horizontal size before measuring the height
		list.css( { "maxWidth" : "900px", "width" : "900px" } );
		jQuery.each( list.children(), function( j, liItem ) {
			// get the item or it's first child when available
			ci = ( jQuery( liItem ).children().length ) ?
				jQuery( liItem ).children( ":first" ) : jQuery( liItem );
			mm.shorten( ci, cssMaxWidth );
		} );
		list.css( { "maxWidth" : "", "width" : "" } );
		mm.i( description + " result width : " + list.width() );
	},

	/**
	 * Resets element text according to specified maximum width. Original text is placed
	 * in the element title. Shortens the text to whole words except the case when text
	 * is only one word and still too wide. Only white space considered in between words
	 * is " " ( space key ) so far.
	 * @param element Element as 1 item jQuery object with text to fit into specified
	 * maximum width.
	 * @param maxWidth Maximum width to be used.
	 */
	shorten : function( element, maxWidth ) {
		if( ! element || ! maxWidth ) return;
		if( element.width() <= maxWidth ) return;
		mm.i(
			element[ 0 ].nodeName + ", current width : " + element.width() +
			", " + element.text() + ", required maximum width : " + maxWidth
		);
		element.attr( "title", element.text() );
		var a = element.text().split( " " );
		while( a && a.length > 1 && element.width() > maxWidth ) {
			a.pop();
			element.text( a.join( " " ) + " ..." );
			mm.i( "shortened to " + element.text() + ", current width : " + element.width() );
		}
	},
	
	/**
	 * Fixes a bug in IE7. In other browsers this can be done via CSS.
	 * @param menu Particular opened maxi menu as jQuery object.
	 */
	setBottomBorderWidth : function( menu ) {
		var b = jQuery( mm.sel.bottomBorder, menu );
		// another funny bug in IE7 - this way it reinitializes something
		// and then width is set correctly :)
		b.width();
		b.css( "width", parseInt( menu.width() ) + "px" );
		mm.i( "bottom line width : " + b.width() + ", menu width : " + menu.width() );
	},
	
	/**
	 * Sets height of all three parts of maxi menu (category, more products, popular product).
	 * Needed for border - lines between parts.
	 * @param menu Particular opened maxi menu as jQuery object.
	 */
	setPartsHeight : function( menu ) {
		var categoryDiv = jQuery( mm.sel.cat, menu );
		var moreProductsDiv = jQuery( mm.sel.moreProducts, menu );
		var popularProductDiv = jQuery( mm.sel.popularProduct, menu );
		var maxHeight = Math.max(
			categoryDiv.height(), moreProductsDiv.height(),
			popularProductDiv.height(), mm.minSectionHeight
		);
		categoryDiv.height( maxHeight );
		moreProductsDiv.height( maxHeight );
		popularProductDiv.height( maxHeight );
		mm.i( "Height of main sections set to " + maxHeight + "px." );
	}

} );

$( document ).ready( function () {
	// mark all pages with v35 class TODO : commented out due to BS ( CW ) pages
	// $( "body" ).addClass( "v35" );
	// mark all pages with v35 class & no top menu level 2
	if( $( "#menuLv2Box" ).length == 0 ) $( "body" ).addClass( "v35noMenuL2" );
	// footer design adjustment
	var footerHeight = $( "#footerMain" ).height();
	var columnHeight = footerHeight - 10;
	$( "#footerMain #fooColumn3" ).css( "height", "" + columnHeight + "px" );  
	// maxi menu
	mm.init();
} );

//]]>
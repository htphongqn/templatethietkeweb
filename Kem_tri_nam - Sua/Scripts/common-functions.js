/* $Id: common-functions.js,v 1.55 2012/09/13 07:13:05 Ondrej Exp $ */

// -----------------------------------------------------------------------------
// Debug object & inheritance functions
// -----------------------------------------------------------------------------

/**
 * Create this prototype inheritance function for those browsers which don't
 * support it yet. Usage : newObject = Object.create( oldObject );
 */
if( typeof Object.create !== 'function' ) {
	Object.create = function( o ) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

/**
 * Object with debug messages functionality from which other objects will inherit.
 * Debug levels are :
 * 1 - errors
 * 2 - errors and warnings
 * 3 - errors, warnings and traces
 * Uses the dbg() function defined above.
 */
var debugObject = {
	
	// object name used for creating debug cookie name, appears in messages, too
	objectName : "",
	// debug cookie name set in "subclasses" and used for resetting max debug level
	debugCookieName : "",
	// default max debug level; set to 3 for displaying also trace debug messages
	debugLevel : 2,
	
	// debugging messages in JS console ----------------------------------------
	
	/**
	 * Sets object name to the specified value. This also resets the debug cookie
	 * name and debugLevel when the cookie value is set.
	 */
	setObjectName : function( objectName ) {
		if( ! objectName ) objectName = "";
		this.objectName = objectName;
		if( ! objectName ) return;
		this.debugCookieName = ( objectName ) ?
			( "debug" + objectName.substr( 0, 1 ).toUpperCase() + objectName.substr( 1 ) ) :
			"";
		if( jQuery.cookie( this.debugCookieName ) )
			this.debugLevel = parseInt( jQuery.cookie( this.debugCookieName ) );
	},
	
	/**
	 * Displays debug messages according to its debug level and the "class" debug
	 * level setting. Redefined later, logger must be created first.
	 */
	out : function( what, level, doAlert, fullDate ) {},
	
	/**
	 * Info ( trace ) level message output.
	 */
	info : function( what, doAlert, fullDate ) {
		this.out( what, 3, doAlert, fullDate );
	},
	
	/**
	 * Warning level message output.
	 */
	warn : function( what, doAlert, fullDate ) {
		this.out( what, 2, doAlert, fullDate );
	},
	
	/**
	 * Error level message output.
	 */
	error : function( what, doAlert, fullDate ) {
		this.out( what, 1, doAlert, fullDate );
	},
	
	/**
	 * Simple log message output.
	 */
	log : function( what, doAlert, fullDate ) {
		this.out( what, 0, doAlert, fullDate );
	},
	
	// extensions --------------------------------------------------------------
	
	/**
	 * Appends all properties from specified object. The cookie name property is
	 * treated differently and can also reset the debug level.
	 */
	append : function( o ) {
		if( ! o ) return;
		for( var k in o )
			if( k == "objectName" )
				this.setObjectName( o[ k ] );
			else
				this[ k ] = o[ k ];
	}
	
}

/**
 * Appends aliases of output functions to debugObject.
 */
debugObject.append( {
	// info aliases
	i : debugObject.info, trace : debugObject.info, t : debugObject.info,
	// warn aliases
	w : debugObject.warn, warning : debugObject.warn,
	// error aliases
	e : debugObject.error, err : debugObject.error,
	// log function aliases
	l : debugObject.log
} );

/**
 * Class factory like function to create new debug object instance and append
 * to it the new functionality stored in initObject.
 */
function createDebugObject( initObject ) {
	var r = Object.create( debugObject );
	r.append( initObject );
	return r;
}

// -----------------------------------------------------------------------------
// Utils ( more functions added later )
// -----------------------------------------------------------------------------

var utils = createDebugObject( {

	// object name used for creating debug cookie name, appears in messages, too
	objectName : "utils",

	/**
	 * Helper function to format date in following format : [YYYY-MM-DD ]hh:mm:ss.xxx
	 */
	formatDate : function( d, fullDate ) {
		if( ! typeof( d ) === "date" ) return "";
		if( ! fullDate ) fullDate = false;
		var fd = "";
		var x = "";
		if( fullDate ) {
			fd += d.getFullYear() + "-";
			x = "" + ( d.getMonth() + 1 );
			if( x.length < 2 ) x = "0" + x;
			fd += x + "-";
			x = "" + d.getDate();
			if( x.length < 2 ) x = "0" + x;
			fd += x + " ";
		}
		x = "" + d.getHours();
		if( x.length < 2 ) x = "0" + x;
		fd += x + ":";
		x = "" + d.getMinutes();
		if( x.length < 2 ) x = "0" + x;
		fd += x + ":";
		x = "" + d.getSeconds();
		if( x.length < 2 ) x = "0" + x;
		fd += x + ".";
		x = "" + d.getMilliseconds();
		while( x.length < 3 ) x = "0" + x;
		fd += x;
		return fd;
	},
	
	/**
	 * Helper function for escaping quotes &amp; other special characters.
	 */
	htmlEscape : function( s ) {
		if( typeof s != "string" ) return s;
		return s.replace( /\"/g, "&#34;" ).replace( /\'/g, "&#39;" ).replace( /\\/g, "&#92;" );
	}

} );

// -----------------------------------------------------------------------------
// Logger
// -----------------------------------------------------------------------------

var log = createDebugObject( {
	
	// object name used for creating debug cookie name, appears in messages, too
	objectName : "log",
	// set to true when alerts output is required globally instead of console output
	alerts : false,
	// set to true when output messages with full dates are required globally
	// instead of only having the times by default
	fullDates : false,
	// gets set by init, indicates the type of output to be used
	outputType : "console",
	
	/**
	 * Initalization of the logger object. Checks whether the console object is
	 * present and thus which kind of debug output can be used. Init should be
	 * called before the fake console creation to be able to set proper output
	 * type for older Opera etc.
	 */
	init : function( options ) {
		// set options if provided
		if( options ) for( var p in options ) log[ p ] = options[ p ];
		// set output type
		if( log.alerts ) {
			log.outputType = "alerts";
		} else if( window.console ) {
			log.outputType = "console";
		} else if( window.opera && window.opera.postError ) {
			log.outputType = "postError";
		} else {
			log.outputType = "none";
		}
		log.i( "Logger initialized." );
	},
	
	/**
	 * Displays a message in JS console.
	 */
	dbg : function( what, level, doAlert, fullDate ) {
		if( isNaN( level ) ) level = 3;
		if( level > log.debugLevel ) return;
		what = utils.formatDate( new Date(), fullDate ) + " " + what;
		if( doAlert )
			alert( what );
		else
			switch( log.outputType ) {
				case "console" :
					if( ! window.console ) return;
					switch( level ) {
						case 1 : console.error( what ); break;
						case 2 : console.warn( what ); break;
						case 3 : console.info( what ); break;
						default : console.log( what );
					}
					break;
				case "postError" :
					opera.postError( what );
					break;
				case "alerts" :
					alert( what );
					break;
				default :
					// if( doAlert ) alert( what );
			}
	}
	
} );

/**
 * Displays debug messages according to its debug level and the "class" debug
 * level setting.
 */
debugObject.out = function( what, level, doAlert, fullDate ) {
	if( isNaN( level ) ) level = 3;
	if( this.debugLevel >= level )
	log.dbg(
		( this.objectName ) ? ( this.objectName + " : " + what ) : what,
		level, doAlert, fullDate
	);
}

/**
 * Initialization of logger output type already here. Should you want to display
 * alerts, please uncomment the options.
 */
log.init( /* { alerts : true, fullDates : true } */ );

/**
 * Displays a message in JS console. Uses logger object now. For some backwards
 * compatibility only. Should be removed in future and log object functions used
 * instead.
 */
function dbg( what, level, doAlert, fullDate ) {
	log.dbg( what, level, doAlert, fullDate );
}

// -----------------------------------------------------------------------------
// firebug window.console dummy implementation
// ( prevents errors in client pages with no firebug installed )
// -----------------------------------------------------------------------------

if (!window.console){
    window.console = {};
}

if (!console.firebug){
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    try{
        for (var i = 0; i < names.length; ++i)
            if (!(names[i] in window.console)) window.console[names[i]] = function() {}
    } catch(e){
     //do nothing
    }
}

// -----------------------------------------------------------------------------
// Webtrends
// -----------------------------------------------------------------------------

var wt = createDebugObject( {

	// used to set up debug messages level
	objectName : "wt",
	// indicates whether WT is enabled for current country
	enabled : true,
	// when true, the notifications will be collected into internal array rather
	// then dispatched directly; schould be set to false after the page is rendered
	scheduling : true,
	// scheduled notifications
	scheduledItems : [],
	
	/**
	 * Initialization function. Copies all initialization options into both own
	 * and also WT library properties represented by global _tag variable. This
	 * property has to be set before for this to work properly. When the scheduling
	 * property is false, it also calls trackScheduled() method to dispatch all
	 * collected notifications. See webtrends.jhtml for more details.
	 */
	init : function( options ) {
		var tag = ( typeof _tag == "undefined" ) ? null : _tag;
		wt.i( "WT reinitialization ..." );
		for( var key in options ) {
			wt[ key ] = options[ key ];
			if( tag ) tag[ key ] = options[ key ];
		}
		if( ! wt.scheduling ) wt.trackScheduled();
	},
	
	/**
	 * Either dispatches WT notification directly or schedules it for later.
	 */
	track : function() {
		var args = [].slice.apply( arguments );
		if( ! args.length || args.length % 2 != 0 ) {
			wt.w( "Wrong notification data." );
			return;
		}
		if( wt.scheduling ) {
			wt.scheduledItems.push( args );
			wt.i( "Scheduled WT notification." );
		} else
			wt.notify.apply( null, args );
	},
	
	/**
	 * Helper function to track BIZ calendar notifications.
	 */
	trackBizCalendar : function() {
		wt.track(
			"DCS.dcsuri", "/consultants/features/biz/indexCalendar_virt.jhtml",
			"WT.ti", "BIZ_calendar",
			"WT.cg_n", "AAN",
			"WT.cg_s", "Calendar"
		);
	},
	
	/**
	 * Helper function to track BIZ e-mail notifications.
	 */
	trackBizEmail : function() {
		wt.track(
			"DCS.dcsuri", "/consultants/features/biz/indexEmail_virt.jhtml",
			"WT.ti", "BIZ_email",
			"WT.cg_n", "AAN",
			"WT.cg_s", "Email"
		);
	},
	
	/**
	 * Tracks all scheduled notifications via notify().
	 */
	trackScheduled : function() {
		var count = wt.scheduledItems.length;
		wt.i( count + " scheduled WT notifications." );
		if( ! wt.enabled || ! count ) {
			if( count )
				wt.w(
					"WT is not enabled for this country. Can't send " +
					count + " WT notifications."
				);
			return;
		}
		while( wt.scheduledItems.length )
			wt.notify.apply( null, wt.scheduledItems.pop() );
	},
	
	/**
	 * Calls the WT notification via standard WT library. Notification parameters
	 * have to be a list name - value string pairs. Don't URL encode the values,
	 * this method does it automatically.
	 */
	notify : function() {
		if( ! wt.enabled ) {
			wt.w( "WT is not enabled for this country. Can't send WT notification." );
			return;
		}
		// get arguments as array
		var args = [].slice.apply( arguments );
		// check arguments length - must be name - value pairs
		if( ! args.length || args.length % 2 != 0 ) {
			wt.w( "Wrong notification data." );
			return;
		}
		// URL encode parameter values
		for( var i = 0; i < args.length; i++ )
			if( i % 2 == 0 )
				args[ i ] = escape( args[ i ] );
		wt.i( "Sending WT notification ... notification data : " + args.join( ", " ) );
		dcsMultiTrack.apply( null, args );
	}
	
} );

// -----------------------------------------------------------------------------
// flash version detection
// -----------------------------------------------------------------------------

var fv = flashVersion = createDebugObject( {

	// used to set up debug messages level
	objectName : "flashVersion",
	// minimum flash plugin version
	requiredMinVersion : 10,
	// when found in page no flash detection will happen
	noDetectForSelectors : [ "#landing-page", "#mobile-page", ".frontPage.v35", "body.slider" ],
	// cookie switch on page load
	oldStatus : jQuery.cookie( "flash" ) || "on",
	
	// flash player detection --------------------------------------------------
	
	/**
	 * Detects current flash plugin version, sets the cookie back to
	 * on when already available or goes to no-flash page.
	 */
	detect : function() {
	
		var f = this;
		// skip detection for pages where not wanted
		for( var i = 0; i < f.noDetectForSelectors.length; i++ )
			if( jQuery( f.noDetectForSelectors[ i ] ).length > 0 ) {
				fv.out(
					"Selector " + f.noDetectForSelectors[ i ] + " found. " +
					"No redirection to no-flash page will happen."
				);
				return;
			}
		if( typeof( FlashDetect ) === "undefined" ) {
			fv.w( "FlashDetect library not found, can't detect flash properly." );
			return;
		}
	
		
		fv.out( "Flash plugin available : " + FlashDetect.installed );
		fv.out(
			"Flash plugin version >= " + f.requiredMinVersion +
			" : " + FlashDetect.versionAtLeast( f.requiredMinVersion )
		);
		fv.out( "Flash cookie at page load : " + f.oldStatus );
		if(
			FlashDetect.installed &&
			FlashDetect.versionAtLeast( f.requiredMinVersion ) &&
			f.oldStatus == "off"
		) {
			fv.out( "Flash already installed. Setting flash cookie back to on ..." );
			// we actually delete it ...
			jQuery.cookie( "flash", null, { path : "/" } );
			fv.out( "Reloading page ..." );
			window.location.reload( true );
		}
		/* redirect to the no flash page if flash cookie is "on" & no flash player
		or player version is older than v.8; user can download latest flash player
		or select html version; flash cookie is then set back to "off" & page is
		redirected back to original url */
		
		/* Adjustment 4.9.2012
		request for removing no-flash page and display automaticaly alternative image or white box
		*/
		if(
			( ! FlashDetect.installed || ! FlashDetect.versionAtLeast( f.requiredMinVersion ) ) &&
			f.oldStatus == "on"
		) {
			fv.out( "No usable flash plugin found." );
			//if( jQuery( ".noFlash" ).length > 0 ) {
				fv.out( "No flash page. Setting up HTML version link ..." );
				// image version link
				/*jQuery( ".imageLink" ).click( function() {
					
				} );*/
				
				fv.out( "Setting flash cookie to off ..." );
				
				if(!jQuery.cookie( "flash") || jQuery.cookie( "flash") != "off")
				{
					jQuery.cookie( "flash", "off", { expires : 42, path : "/" } );
					jQuery( this ).unbind();
					var url = unescape( getUrlParam( "url" ) );
					fv.out( "Redirecting to original page ( " + url + " ) ..." );
					// set location from url parameter
					window.location.replace( url );
				}
				
			/*} else {
				// go to no flash page
				var url = "/utils/no-flash.jhtml?url=" + escape( window.location.href );
				fv.out( "Redirecting to no flash page ( " + url + " ) ..." );
				//window.location.replace( url );
			}*/
		}
	},
	
	isFlashDetected : function() {
		return FlashDetect.installed;
	}
	
} );

jQuery( document ).ready( function() {
	flashVersion.detect();
} );

/*
	This function returns a value of the url parameter 'name'
*/
function getUrlParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

/*
	This function returns object with all non-empty url parameters as properties
	for http://www.example.com/?first=1&second=2&third= it returns { first : "1", second: "2"} ==> getUrlParams()['first'] returns "1" 
*/
function getUrlParams()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        if (hash[1]) {
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
        }
    }
    return vars;
}

// The funcion opens a new window. URL, name and windowFeatures are arguments.
// The function is used in <A HREF="javascript:openNewWindow(...)"> tag, where it is not possible to use the standard window.open() function
function openNewWindow(aUrl, aWindowName, aWindowFeatures) {
  window.open(aUrl, aWindowName,aWindowFeatures);
}

// This function resizes iframe under the flipping catalog when the product arrangement is changed. This
// function is called from the included iframe.
function SetFlippCatIframeHeight(pIframeId, pHeight){
	jQuery(pIframeId).css("height",pHeight);
}

// This function handles 'enter' key on form field and it clicks on relevant submit button.
// It fixes the behavior of the IE. It expects the input submit tag to be a direct child of the form tag.

function disableEnterKey(e)
{
     var key;     
     if(window.event)
          key = window.event.keyCode; //IE
     else
          key = e.which; //firefox     
     return (key != 13);
}

jQuery(function()
{
  jQuery('input').keydown(function(e){
  	if($(this).attr('onKeyPress')){
    }else{
    if (e.keyCode == 13) {
    	var cosik = jQuery(this).parents('form').find('input[type=submit]');
      cosik.click();
      return false;
    }
  }
  });
});

// focuses specified object and selects its contents
function SelectAll(id)
{
      document.getElementById(id).focus();
      document.getElementById(id).select();
}

// This feature adds a class "last-li" to all last elements in lists
jQuery(function(){
  jQuery("ul li:last-child").addClass("last-li");
});

// ---------------------------------------------
// This method are used to work around the bug
// in IE7 with CSS float style.
//
// Simply count "div" childrens width
// (including padding and margins)
// ---------------------------------------------
function setWidthAccordingToChildren(div) {
    if (div != null) {
        var width = 0;

        div.children().each( function() {
            width += $(this).outerWidth();
        });

        div.css('width', width);
    }
}
// ---------------------------------------------

// ---------------------------------------------
// This method returns true if current client
// is mobile device
// ---------------------------------------------
mobileClients = [
	"iPhone",
	"iPod",
	"iPad",
	//"AppleWebKit",    //standard Chrome
	"Fennec"
	/*"midp",
	"240x320",
	"blackberry",
	"netfront",
	"nokia",
	"panasonic",
	"portalmmm",
	"sharp",
	"sie-",
	"sonyericsson",
	"symbian",
	"windows ce",
	"benq",
	"mda",
	"mot-",
	"opera mini",
	"philips",
	"pocket pc",
	"sagem",
	"samsung",
	"sda",
	"sgh-",
	"vodafone",
	"xda",
	"android"*/
];
function isMobile() {
  var browser = navigator.userAgent.toLowerCase();

  for (i=0; i<mobileClients.length; i++) {
    if (browser.indexOf(mobileClients[i].toLowerCase()) > -1)
      return true;
  }
  return false;
} 

function updateQueryParameters(name, value, url) {

  var pattern = new RegExp(name + "=[^&]*");
  
  if (pattern.test(url)) {
    url = url.replace(pattern, name + "=" + value);
  } else {
    if (url.indexOf("?") == -1) {
      url += "?" + name + "=" + value;
    } else {
      url += "&" + name + "=" + value;
    }   
  }
  return url;
}

	
	hs.lang = {
		cssDirection : 'ltr',
		loadingText : '',
		loadingTitle : '',
		focusTitle : 'Click to bring to front',
		fullExpandTitle : 'Expand to actual size (f)',
		fullExpandText : 'Full size',
		creditsText : 'Powered by <i>Highslide JS</i>',
		creditsTitle : 'Go to the Highslide JS homepage',
		previousText : 'Previous',
		previousTitle : 'Previous (arrow left)',
		nextText : 'Next',
		nextTitle : 'Next (arrow right)',
		moveTitle : 'Move',
		moveText : 'Move',
		closeText : 'Close',
		closeTitle : 'Close (esc)',
		resizeTitle : 'Resize',
		playText : 'Play',
		playTitle : 'Play slideshow (spacebar)',
		pauseText : 'Pause',
		pauseTitle : 'Pause slideshow (spacebar)',   
		number : '',
		//restoreTitle : 'Click to close image, click and drag to move. Use arrow keys for next and previous.'
	};

    // Open a specific thumbnail based on querystring input.
    hs.addEventListener(window, "load", function() {
       // get the value of the autoload parameter
       var autoload = /[?&]autoload=([^&#]*)/.exec(window.location.href);
       // virtually click the anchor
       if (autoload) document.getElementById(autoload[1]).onclick();
    });

	function closeImage(){
	   return hs.close()
	};

	hs.dynamicallyUpdateAnchors = false;
	hs.showCredits = false;
	hs.outlineType = '';

	hs.registerOverlay({
		overlayId: 'image-resize',
		position: 'bottom right',
		relativeTo: 'image',
		hideOnMouseOut: true,
		offsetX: 4,
		offsetY: -1
	});

	// Disable Spacebar
	// hs.onKeyDown = function(sender, e) {
	//	if (e.keyCode == 32) return false;
	// };

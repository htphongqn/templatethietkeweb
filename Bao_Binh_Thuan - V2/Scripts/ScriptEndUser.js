
function showDateVN()
{
	var strdate;
	var dt = new Date();
              var strarrDay = new Array("Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"); 
              var strarrMonth = new Array("01","02","03","04","05","06","07","08","09","10","11","12"); 
              var strThu = dt.getDay();
              strThu = strarrDay[strThu] + ", ";
              var strDay=dt.getDate();
              if (strDay<10) strDay="0" + strDay
              var strMonth= dt.getMonth();
              strMonth= strarrMonth[strMonth] ;
              var strYears = dt.getYear();
              if (strYears<1900) strYears += 1900;
              strdate=strThu + " " + strDay + "/" + strMonth + "/" + strYears
              window.document.write (strdate);
}
function showDateEN()
{
	var strdate;
	var dt = new Date();
              var strarrDay = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"); 
              var strarrMonth = new Array("01","02","03","04","05","06","07","08","09","10","11","12"); 
              var strThu = dt.getDay();
              strThu = strarrDay[strThu] + ", ";
              var strDay=dt.getDate();
              if (strDay<10) strDay="0" + strDay
              var strMonth= dt.getMonth();
              strMonth= strarrMonth[strMonth] ;
              var strYears = dt.getYear();
              if (strYears<1900) strYears += 1900;
              strdate=strThu + " " + strMonth + "/" + strDay + "/" + strYears
              window.document.write (strdate);
}
function showDateCN()
{
	var strdate;
	var dt = new Date();
              var strarrDay = new Array("星 期 日", "星 期 一", "星 期 二", "星 期 三", "星 期 四", "星 期 五", "星 期 六"); 
              var strarrMonth = new Array("01","02","03","04","05","06","07","08","09","10","11","12"); 
              var strThu = dt.getDay();
              strThu = strarrDay[strThu] + ", ";
              var strDay=dt.getDate();
              if (strDay<10) strDay="0" + strDay
              var strMonth= dt.getMonth();
              strMonth= strarrMonth[strMonth] ;
              var strYears = dt.getYear();
              if (strYears<1900) strYears += 1900;
              strdate=strThu + " " + strDay + "/" + strMonth + "/" + strYears
              window.document.write (strdate);
}
function openpage(pageurl, pagename, pagewidth, pageheight) 
{                                          
	var attr;                                          
	attr="width="+pagewidth+",height="+pageheight+",scrollbars=yes,status=no,title=yes,toolbars=yes,resizable=no";
	window.open(pageurl, pagename, attr);                                          
}

function GetPage(C,P)
{
	var frmSubmit=document.ctcWebsite;
	frmSubmit.action="default.aspx?c=" + C + "&p=" + P + "#content";
	frmSubmit.submit();
}

function GetPage1(P)
{
	var frmSubmit=document.ctcWebsite;
	frmSubmit.action="default.aspx?s=1&st=1&p=" + P + "#content";
	frmSubmit.submit();
}

function doAdvanceSearch()
{
	ctcWebsite.action="default.aspx?s=1&st=1#content";
	ctcWebsite.submit();
}

function trim(text)
{
	pos1=0;
	pos2=text.length-1;
	for(i=0;i<=text.length-1;i++)
		if(text.substr(i,1)==" ") pos1=i;
		else break;
	for(i=length-1;i>=0;i--)
		if(text.substr(i,1)==" ") pos2=i;
		else break;
	if (pos2<pos1) return "";
	return text.substr(pos1,pos2-pos1);
}

function trimstring(strin)
{ 
	var strtemp;
	var i; 
	strtemp="";
	i=0;
	if (strin.charAt(i)!=" "){strtemp=strtemp+strin.charAt(i);}
	for (var i=1;i<strin.length-1;i++){
		if (strin.charAt(i)==" "){
			if (strin.charAt(i+1)!=" ") {strtemp=strtemp+strin.charAt(i)}
		}
		else {strtemp=strtemp+strin.charAt(i)} 
	}
	i=strin.length;
	if (strin.charAt(i)!=" "){strtemp=strtemp+strin.charAt(i)}
	return strtemp; 
}




function menu_show(intCatID ,intCount, strArr)
{   
		var a = new Array();
		var k;
		//l=strArr.length;
		a=strArr.split(",");

		var objText;
		for (k=1;k<=intCount;k++) 
		{	
			objText = 'tbcat_' + a[k];
			var g=document.all(objText);
			if (a[k]==intCatID)
			{	if (g.style.display=='none')
				{
					g.style.display='block';										
				}
				else
				{
					g.style.display='none';					
				}				
			}			
		}				
	return true;
}

function menu_showfirst(intCatID)
{   
	/*var objText;
	objText = 'tbcat_' + intCatID;
	var g=document.all(objText);		
	g.style.display='block';*/
	return true;
}

var slideCache = new Array();
ti = 0;

function startSS(pictureName, imageFiles, displaySecs, imageFiles1, intCount, strArr) {
    if (ti) {
        stopSS();
    }
    else {
        ti = setTimeout("RunSlideShow('" + pictureName + "','" + imageFiles + "'," + displaySecs + ",'" + imageFiles1 + "'," + intCount + ",'" + strArr + "')", 1 * 1);
        document.getElementById("imgSlideShow").src = "../img_StopSlideShow.gif"
    }
}

function stopSS() {
    if (ti) {
        ti = clearTimeout(t);
        document.getElementById("imgSlideShow").src = "../img_SlideShow.gif"
    }
}


function nextSS(pictureName, imageFiles, intCount, strArr) {
    if (!document.all && !document.getElementById)
        return
    stopSS();
    var nextImage;
    var tmp = document.getElementById(pictureName).src.indexOf("data/photos");
    var imageURL = "../" + document.getElementById(pictureName).src.substring(tmp, document.getElementById(pictureName).src.length);
    var curImage = imageFiles.indexOf(imageURL);
    var futureImages = imageFiles.substring(curImage + imageURL.length + 1, imageFiles.length);
    var imageSeparator = futureImages.indexOf(";");
    if (futureImages.length > 0) {
        if (imageSeparator == -1) {
            nextImage = futureImages.substring(0, futureImages.length);
        }
        else {
            nextImage = futureImages.substring(0, imageSeparator);
        }
        document.getElementById(pictureName).src = nextImage;
        changeInfo(pictureName, imageFiles, intCount, strArr)
    }

}

function prevSS(pictureName, imageFiles, intCount, strArr) {
    if (!document.all && !document.getElementById)
        return
    stopSS();
    var prevImage;
    var tmp = document.getElementById(pictureName).src.indexOf("data/photos");
    var imageURL = "../" + document.getElementById(pictureName).src.substring(tmp, document.getElementById(pictureName).src.length);
    var curImage = imageFiles.indexOf(imageURL);
    var prevImage;
    prevImage = imageFiles.substring(0, curImage - 1);
    var i = prevImage.indexOf(";");
    while (i > 0) {
        prevImage = prevImage.substring(i + 1, curImage - 1);
        i = prevImage.indexOf(";");
    }
    if (prevImage != "") {
        document.getElementById(pictureName).src = prevImage;
        changeInfo(pictureName, imageFiles, intCount, strArr)
    }

}

function changeInfo(pictureName, imageFiles, intCount, strArr)
{
	if (!document.all&&!document.getElementById)
		return true;
	imageFiles=";"+imageFiles
	
	var a = new Array();
	var b = new Array();	
	a=strArr.split(",");
	
	b=imageFiles.split(";");	
	var objText;
	var k;	
	var tmp=document.getElementById(pictureName).src.indexOf("data/photos");
	var imageURL="../" + document.getElementById(pictureName).src.substring(tmp,document.getElementById(pictureName).src.length);
	for (k=1;k<=intCount;k++) 
	{	
		objText = 'tbd_' + a[k];
		var g = document.getElementById(objText);
		
		if (b[k]==imageURL)
		{
			g.style.display='block';
		}
		else
		{
			g.style.display='none';
		}
	}		
}

function RunSlideShow(pictureName,imageFiles,displaySecs,imageFiles1,intCount,strArr)
{
    if (!document.all && !document.getElementById)
        return
    var imageSeparator = imageFiles.indexOf(";");
    var nextImage = imageFiles.substring(0, imageSeparator);

    var picture = document.getElementById(pictureName);
    if (picture.filters) {
        picture.style.filter = "blendTrans(duration=2)";
        picture.filters.blendTrans.Apply();

    }
    picture.src = nextImage;
    changeInfo(pictureName, imageFiles1, intCount, strArr)
    if (picture.filters) {
        picture.filters.blendTrans.Play();
    }
    var futureImages = imageFiles.substring(imageSeparator + 1, imageFiles.length)
		+ ';' + nextImage;
    if (ti) {
        ti = setTimeout("RunSlideShow('" + pictureName + "','" + futureImages + "'," + displaySecs + ",'" + imageFiles1 + "'," + intCount + ",'" + strArr + "')",
		displaySecs * 1000);
    }

    // Cache the next image to improve performance.
    imageSeparator = futureImages.indexOf(";");
    nextImage = futureImages.substring(0, imageSeparator);
    if (slideCache[nextImage] == null) {
        slideCache[nextImage] = new Image;
        slideCache[nextImage].src = nextImage;
    }	
}
var zoomfactor = 0.05
function zoomhelper() {
    if (parseInt(whatcache.style.width) > 50 && parseInt(whatcache.style.height) > 50) {
        whatcache.style.width = parseInt(whatcache.style.width)
                  + parseInt(whatcache.style.width) * zoomfactor * prefix
        whatcache.style.height = parseInt(whatcache.style.height)
                        + parseInt(whatcache.style.height) * zoomfactor * prefix
    }
    else if (prefix == 1) {
        whatcache.style.width = parseInt(whatcache.style.width)
                  + parseInt(whatcache.style.width) * zoomfactor * prefix
        whatcache.style.height = parseInt(whatcache.style.height)
                        + parseInt(whatcache.style.height) * zoomfactor * prefix
    }
}

function zoom(originalW, originalH, what, state) {
    if (!document.all && !document.getElementById)
        return
    whatcache = eval("document.images." + what)

    prefix = (state == "in") ? 1 : -1
    if (whatcache.style.width == "" || state == "restore") {
        whatcache.style.width = originalW
        whatcache.style.height = originalH
        if (state == "restore")
            return
    }
    else {
        if ((parseInt(whatcache.style.width) >= parseInt(originalW) && prefix == 1) || (parseInt(whatcache.style.height) >= parseInt(originalH) && prefix == 1)) {
            return;
        }
        else {
            zoomhelper();
        }
    }
    //if ((whatcache.style.width>=originalW && prefix==1)||(whatcache.style.height>=originalH && prefix==1))
    //{
    //return;
    //}
    //else
    //{
    //zoomhelper();
    //}     
}
function image_change(objImg, strImgPath, intProID, intCount, strArr)
{   
	if (!document.all&&!document.getElementById)
		return
	stopSS();
	var a = new Array();
	var k;
	//l=strArr.length;
	a=strArr.split(",");

	var objText;
	objImg.src=strImgPath;
	
	for (k=1;k<=intCount;k++) 
	{
	    objText = 'tbd_' + a[k];	   
		var g = document.getElementById(objText);	
		if (a[k]==intProID)
		{
			g.style.display='block';
		}
		else
		{
			g.style.display='none';
		}
	}	
}

function image_firstshow(objImg, strImgPath, intProID, intCount, strArr, intCurProID)
{   
	if (!document.all&&!document.getElementById)
		return
	if (intCurProID==intProID)
	{
		var a = new Array();
		var k;
		//l=strArr.length;
		a=strArr.split(",");

		var objText;
		objImg.src=strImgPath;

		for (k=1;k<=intCount;k++) 
		{	
			objText = 'tbd_' + a[k];
			var g = document.getElementById(objText);
			if (a[k]==intProID)
			{
				g.style.display='block';
			}
			else
			{
				g.style.display='none';
			}
		}
	}
}


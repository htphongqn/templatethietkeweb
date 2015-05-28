function $(e) { return e.tagName ? e : document.getElementById(e); };
var zmode = 1, page = $("pageimg"), body = $("body"), curHeight, curWidth, miny = (window.parent.view.frme.offsetHeight - 25) || (page.offsetHeight / 2), screenWidth, screenHeight;

page.style.width = screen.width - 140 + 'px';
function zoomin() {
    curHeight = page.height;
    curWidth = page.width;
//    if(zmode == 1.6){return;}
//    if(!zmode){zmode = 0.6;}
//    else if (zmode < 1.7) {
//        zmode += 0.2;
        curHeight *= 1.2;
        curWidth *= 1.2;
        //    }
       
//        alert(screen.width);
    //    page.style.width=zmode+"%";
    //    page.style.height=zmode+"%";
    page.style.height = curHeight + 'px';
    page.style.width = curWidth + 'px';
}
function zoomout() {
    curHeight = page.height;
    curWidth = page.width;
//    if(zmode==0){return;}
//    if (zmode > 0.6) {
//        zmode -= 0.2;
        curHeight *= 0.8;
        curWidth *= 0.8;
//    }
//    else{zmode=0;}
    
//    page.style.width=(zmode)?zmode+"%":"";
    //    page.style.height=(zmode)?zmode+"%":miny+"px";
    page.style.height = curHeight + 'px';
    page.style.width = curWidth + 'px';
}

function close()
{
    window.parent.view.moveto();
    return false;
}

document.onmousedown=function()
{
    var e=window.event||arguments[0];
    window.x=e.clientX;
    window.y=e.clientY;
    
    document.onmousemove=function()
    {
        var e=window.event||arguments[0];
        window.scrollBy(x-e.clientX,y-e.clientY);
        window.x=e.clientX;
        window.y=e.clientY;
        return false;
    };
    document.onmouseout=document.onmouseup=function()
    {
        document.onmousemove=function(){return false};
        return false;
    };
    document.ondragstart=function(){return false;};
    
    return false;
};

document.onclick = function () {
    var a = window.parent.menu.papers;
    if (!a.isshow) { a = window.parent.menu.issues; }
    if (!a.isshow) { a = window.parent.menu.pages; }
    if (!a.isshow) { return; }
    a.show();
};
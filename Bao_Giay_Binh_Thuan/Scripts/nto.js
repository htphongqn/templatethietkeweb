
(function () {
    function $(e) {
        return e.tagName ? e : document.getElementById(e);
    }

    document.onmousedown = function () {
        var a = window.menu.papers;
        if (!a.isshow) { a = window.menu.issues; }
        if (!a.isshow) { a = window.menu.pages; }
        if (!a.isshow) { return; }

        var o = a.list, e = window.event || arguments[0];
        e = e.target || e.srcElement;
        while (e.tagName.toLowerCase() != "body") {
            if (e == o) { return; }
            e = e.parentNode;
        }
        a.show();
        return false;
    }

    window.menu = (function () {
        var m = {
            search: { pattern: $("srchpatt"), action: $("srchbutt") },
            papers: { picker: $("papersel"), list: $("paperlst"), isshow: false },
            issues: { picker: $("issuesel"), list: $("issuelst"), isshow: false },
            pages: { picker: $("pagesel"), list: $("pagelst"), titl: $("pagetit"), isshow: false },
            selpage: -1
        };

        m.search.pattern.onfocus = m.search.pattern.onblur = function () {
            if (this.className) {
                if (!this.value) {
                    this.value = this.oddValue;
                    this.oddValue = "";
                    this.className = "";
                }
            }
            else {
                if (!this.oddValue) { this.oddValue = this.value; }
                if (this.oddValue == this.value) { this.value = ""; }
                this.className = "selected";
            }
        };
        m.search.pattern.onkeydown = function () {
            var e = arguments[0] || window.event;
            if (e.keyCode == 13) {
                window.menu.search.show();
                return false;
            }
        };

        m.search.show = m.search.action.onclick = function () {
            var p = window.menu.search.pattern;
            if (p.className != "selected" || !p.value) { if (this.oddValue) { this.value = this.oddValue; } return false; }
            if (window.dlog) { window.dlog.show("timbao.dec?srch=" + escape(p.value)); }
        };

        m.papers.show = function (b) {
            var s = window.menu.papers.list;
            window.menu.papers.isshow = !(!b);
            if (!b) { s.style.display = "none"; return; }

            s.style.display = "block";
            var o = window.menu.papers.picker, l = 0;
            while (o.tagName.toLowerCase() != "body") {
                if (o.tagName) { l += o.offsetLeft }
                o = o.parentNode;
            }
            s.style.left = l + "px";
            window.menu.issues.show();
            window.menu.pages.show();
        };
        m.papers.picker.onclick = function () {
            var s = window.menu.papers;
            s.show(s.list.style.display != "block");
            return false;
        };

        m.issues.show = function (b) {
            var s = window.menu.issues.list;
            window.menu.issues.isshow = !(!b);
            if (!b) { s.style.display = "none"; return; }

            s.style.display = "block";
            var o = window.menu.issues.picker, l = 0;
            while (o.tagName.toLowerCase() != "body") {
                if (o.tagName) { l += o.offsetLeft }
                o = o.parentNode;
            }
            s.style.left = l + "px";
            window.menu.papers.show();
            window.menu.pages.show();
        };
        m.issues.picker.onclick = function () {
            var s = window.menu.issues;
            s.show(s.list.style.display != "block");
            return false;
        };

        m.pages.show = function (b) {
            var s = window.menu.pages.list;
            window.menu.pages.isshow = !(!b);
            if (!b) { s.style.display = "none"; return; }

            s.style.display = "block";
            var o = window.menu.pages.picker, l = 0;
            while (o.tagName.toLowerCase() != "body") {
                if (o.tagName) { l += o.offsetLeft }
                o = o.parentNode;
            }
            s.style.left = l + "px";
            window.menu.papers.show();
            window.menu.issues.show();
        };
        m.pages.picker.onclick = function () {
            var s = window.menu.pages;
            s.show(s.list.style.display != "block");
            return false;
        };

        m.goto = function (p) {
            var s = window.menu,
                e = s.pages.items;
            for (var i = 0; i < e.length; i++) {
                var j = e[i].href.indexOf("#");
                if (!j) { continue; }
                else if (p.indexOf(e[i].href.substring(j)) > -1) {
                    s.selpage = i;
                    s.pages.titl.innerHTML = e[i].innerHTML;
                    //                    alert(p);
                    window.view.frme.show(p);
                    window.tbar.show(0);
                    return;
                }
            }
        };
        m.moveto = function (i) {
            var s = window.menu, e = s.pages.items;

            if (i == -2) {
                if (s.selpage > -1) {
                    s.selpage--;
                }
            }
            else if (i == -1) {
                if (s.selpage == -1) {
                    s.selpage = 0;
                }
                if (s.selpage < e.length) {
                    s.selpage++;
                }
            }
            else if (i > -1 && i < e.length) {
                s.selpage = i;
            }
            else { s.selpage = -1; }

            if (s.selpage == -1) {
                window.location.hash = "";
                return;
            }

            e[s.selpage].onclick();
            var p = e[s.selpage].href,
                j = p.indexOf("#");
            if (j) {
                window.location.hash = p.substring(j);
            }
        };

        m.pages.items = [];
        var e = m.pages.list.getElementsByTagName("a");
        for (var i = 0; i < e.length; i++) {
            e[i].onclick = function () {
                var a = window.menu.pages;
                for (var j = 0; j < a.items.length; j++) {
                    if (this == a.items[j]) { window.menu.selpage = j; break; }
                }

                a.show();
                a.titl.innerHTML = this.innerHTML;

                var p = this.href, j = p.indexOf("#");
                window.view.frme.show(p.substring(j));
                window.tbar.show(0);
            };
            m.pages.items.push(e[i]);
        }

        return m;
    })();

    window.thumbs = (function () {
        var t = {
            panel: $("thumbpane"), maxer: $("maximal"), miner: $("minimal"),
            upper: $("thumbupper"), lower: $("thumblower"), list: $("thumbnails")
        };

        t.sliding = false;
        t.slideup = function () {
            var w = window.thumbs;
            w.list.contentWindow.scrollBy(0, -15);
            if (w.top() > 0) { w.sliding = setTimeout(w.slideup, 150); }
        };
        t.slidedw = function () {
            var w = window.thumbs, p = w.top();
            w.list.contentWindow.scrollBy(0, 15);
            if (w.top() > p) { w.sliding = setTimeout(w.slidedw, 150); }
        };
        t.stop = function () {
            var w = window.thumbs;
            if (w.sliding) { clearTimeout(w.sliding); }
        };
        t.top = function () {
            var d = window.thumbs.list.contentWindow.document;
            return d.documentElement.scrollTop || d.body.scrollTop;
        }

        t.upper.onmouseover = function () {
            window.thumbs.slideup(-3);
            return false;
        };
        t.upper.onclick = function () {
            var w = window.thumbs, p = w.top(), a = p % 140;
            p -= ((a > 50) ? a : (a > 0) ? a + 140 : 140);
            w.list.contentWindow.scrollTo(0, p);
            w.stop();
            w.sliding = setTimeout(w.slideup, 1000);
            return false;
        };

        t.lower.onmouseover = function () {
            window.thumbs.slidedw(3);
            return false;
        };
        t.lower.onclick = function () {
            var w = window.thumbs, p = w.top() + 140, a = p % 140;
            p -= ((a > 100) ? a - 140 : (a > 0) ? a : 0);
            w.list.contentWindow.scrollTo(0, p);
            w.stop();
            w.sliding = setTimeout(w.slidedw, 1000);
            return false;
        };

        t.upper.onmouseout = t.lower.onmouseout = function () {
            window.thumbs.stop();
        };

        t.maxi = function () {
            var w = window.thumbs;
            this.className = "min_but";
            this.onclick = w.mini;

            w.miner.style.display = "block";
            w.panel.style.display = "";
            w.panel.style.width = "100%";
            window.view.show(0);

            return false;
        };
        t.mini = function () {
            var w = window.thumbs;
            this.className = "max_but";
            this.onclick = w.maxi;
            window.view.show(1);

            w.miner.style.display = "block";
            w.panel.style.display = "";
            w.panel.style.width = "120px";
            return false;
        };

        t.maxer.onclick = t.maxi;
        t.miner.onclick = function () {
            var w = window.thumbs;
            this.style.display = "none";
            w.maxer.className = "max_but";
            w.maxer.onclick = w.mini;

            window.view.show(1);
            w.panel.style.display = "none";

            return false;
        }

        t.list.items = [];
        t.list.load = function (e) {
            e = e.getElementsByTagName("a");
            for (var i = 0; i < e.length; i++) {
                e[i].onclick = function () {
                    var p = this.href, j = p.indexOf("#");
                    p = p.substring(j);
                    //                    alert(p);
                    window.menu.goto(p);
                    window.location.hash = p;
                    window.thumbs.mini();
                    return false;
                };
                t.list.items.push(e[i]);
            }
        };

        return t;
    })();

    window.view = (function () {
        var v = { panel: $("viewpane"), toc: $("viewtoc"), frme: $("viewer"), indx: $("newstoc") };

        v.show = function (b) {
            window.view.panel.style.display = b ? "" : "none";
        };
        v.frme.show = function (p) {
            var w = window.view, f = w.frme.contentWindow;

            w.show(1);
            if (w.frme.style.display != "block") { w.frme.style.display = "block"; w.toc.style.display = "none"; }


            if (p.indexOf("#") == 0) {
                var num = p.replace(/#trang-/g,'')
//                alert(num);
//                var j = p.indexOf('-');
//                p = p.substring(j);

                //                f.location.href = f.location.href.replace(/&p=[0-9]+/g, '&p=' + p[1]);
                f.location.href = f.location.href.replace(/&p=[0-9]+/g, '&p=' + num);
//                alert(f.location.href);
            }
            else {
                f.location.href = w.ref + p;
            }
        };

        return v;
    })();

    window.tbar = (function () {
        var b = {
            panel: $("adsref"),
            //             mark: $("mark"),
            plus: $("plus"), minus: $("minus"),
            prev: $("prev"), next: $("next"),
            less: $("less"), pop: $("pop"), tit: $("tooltip")
        };

        b.show = function (m) {
            window.tbar.panel.style.display = m ? "block" : "none";
            window.tbar.pop.style.display = m ? "none" : "block";
            window.tbar.less.style.display = !m ? "none" : "block";

        };
        b.tip = function () {
            var t = window.tbar, o = this, x = 0, y = 0;
            do {
                x += o.offsetLeft;
                y += o.offsetTop;
            }
            while (o = o.offsetParent);

            t.tit.innerHTML = this.innerHTML;
            t.tit.style.left = (x - 5) + "px";
            t.tit.style.top = (y - 30) + "px";
            t.tit.style.display = "block";
            return false;
        };
        b.untip = function () {
            window.tbar.tit.style.display = "none";
            return false;
        };

        //        b.mark.onclick = function () {
        //            return false;
        //        };
        //        b.mark.onmouseover = b.tip;
        //        b.mark.onmouseout = b.untip;

        b.plus.onclick = function () {
            var f = window.view.frme;
            if (f.style.display != "block" || !f.contentWindow.zoomin) { return false; }

            f.contentWindow.zoomin();
            return false;
        };
        b.plus.onmouseover = b.tip;
        b.plus.onmouseout = b.untip;

        b.minus.onclick = function () {
            var f = window.view.frme;
            if (f.style.display != "block" || !f.contentWindow.zoomout) { return false; }

            f.contentWindow.zoomout();
            return false;
        };
        b.minus.onmouseover = b.tip;
        b.minus.onmouseout = b.untip;

        b.prev.onclick = function () {
            window.menu.moveto(-2);
            return false;
        };
        b.prev.onmouseover = b.tip;
        b.prev.onmouseout = b.untip;

        b.next.onclick = function () {
            window.menu.moveto(-1);
            return false;
        };
        b.next.onmouseover = b.tip;
        b.next.onmouseout = b.untip;

        b.less.onclick = function () {
            window.tbar.show(0);
            alert(viewerHieght);
            document.getElementById('viewer').style.height = viewerHieght + 'px';
            document.getElementById('thumbnails').style.height = thumbnailsHieght + 'px';
            return false;
        };
        b.less.onmouseover = b.tip;
        b.less.onmouseout = b.untip;
        b.pop.onclick = function () {
            window.tbar.show(1);
            alert(viewerHieght);
            document.getElementById('viewer').style.height = viewerHieght - 71 + 'px';
            document.getElementById('thumbnails').style.height = thumbnailsHieght - 71 + 'px';
            return false;
        };
        b.pop.onmouseover = b.tip;
        b.pop.onmouseout = b.untip;
        b.getheight = function () {
            var h = 0;
            if (typeof (window.innerWidth) == 'number') {
                h = window.innerHeight;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                h = document.documentElement.clientHeight;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                h = document.body.clientHeight;
            }
            return h;
        };
        return b;
    })();

})();



//function ShowFlash(src, width, css, height, img, target) {
//    var platform = $('#device').val();
//    if (platform == 'msos') {
//        document.write('<embed width="' + width + '" height="' + height + '" align="middle" quality="high" wmode="transparent"');
//        document.write('allowscriptaccess="always" flashvars="" type="application/x-shockwave-flash" ');
//        document.write('pluginspage="http://www.macromedia.com/go/getflashplayer" ');
//        document.write('alt="" src="' + src + '">');

//    }
//    if (platform == 'ios' || platform == 'iemsos' || platform == 'android')
//        document.write('<a href="' + target + '" target="_blank"><img src="' + img + '" width="' + width + 'px" height="' + height + 'px" alt="NoFlash" /></a>');
//}

        var viewerHieght = window.tbar.getheight() - 168 - 36;
        var thumbnailsHeight = window.tbar.getheight() - 168 - 36 - 50;
        document.getElementById('viewer').style.height = viewerHieght + 'px';
        document.getElementById('thumbnails').style.height = thumbnailsHeight + 'px';

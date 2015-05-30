/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Varien
 * @package     js
 * @copyright   Copyright (c) 2010 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
if(typeof Product=='undefined') {
    var Product = {};
}

/********************* IMAGE ZOOMER ***********************/

Product.Zoom = Class.create();
/**
 * Image zoom control
 *
 * @author      Magento Core Team <core@magentocommerce.com>
 */
Product.Zoom.prototype = {
    initialize: function(imageEl, trackEl, handleEl, zoomInEl, zoomOutEl, hintEl){
        this.containerEl = $(imageEl).parentNode;
        this.imageEl = $(imageEl);
        this.handleEl = $(handleEl);
        this.trackEl = $(trackEl);
        this.hintEl = $(hintEl);

        this.containerDim = Element.getDimensions(this.containerEl);
        this.imageDim = Element.getDimensions(this.imageEl);

        this.imageDim.ratio = this.imageDim.width/this.imageDim.height;

        this.floorZoom = 1;

        if (this.imageDim.width > this.imageDim.height) {
            this.ceilingZoom = this.imageDim.width / this.containerDim.width;
        } else {
            this.ceilingZoom = this.imageDim.height / this.containerDim.height;
        }

        if (this.imageDim.width <= this.containerDim.width
            && this.imageDim.height <= this.containerDim.height) {
            this.trackEl.up().hide();
            this.hintEl.hide();
            this.containerEl.removeClassName('product-image-zoom');
            return;
        }

        this.imageX = 0;
        this.imageY = 0;
        this.imageZoom = 1;

        this.sliderSpeed = 0;
        this.sliderAccel = 0;
        this.zoomBtnPressed = false;

        this.showFull = false;

        this.selects = document.getElementsByTagName('select');

        this.draggable = new Draggable(imageEl, {
            starteffect:false,
            reverteffect:false,
            endeffect:false,
            snap:this.contain.bind(this)
        });

        this.slider = new Control.Slider(handleEl, trackEl, {
            axis:'horizontal',
            minimum:0,
            maximum:Element.getDimensions(this.trackEl).width,
            alignX:0,
            increment:1,
            sliderValue:0,
            onSlide:this.scale.bind(this),
            onChange:this.scale.bind(this)
        });

        this.scale(0);

        Event.observe(this.imageEl, 'dblclick', this.toggleFull.bind(this));

        Event.observe($(zoomInEl), 'mousedown', this.startZoomIn.bind(this));
        Event.observe($(zoomInEl), 'mouseup', this.stopZooming.bind(this));
        Event.observe($(zoomInEl), 'mouseout', this.stopZooming.bind(this));

        Event.observe($(zoomOutEl), 'mousedown', this.startZoomOut.bind(this));
        Event.observe($(zoomOutEl), 'mouseup', this.stopZooming.bind(this));
        Event.observe($(zoomOutEl), 'mouseout', this.stopZooming.bind(this));
    },

    toggleFull: function () {
        this.showFull = !this.showFull;

        //Hide selects for IE6 only
        if (typeof document.body.style.maxHeight == "undefined")  {
            for (i=0; i<this.selects.length; i++) {
                this.selects[i].style.visibility = this.showFull ? 'hidden' : 'visible';
            }
        }
        val_scale = !this.showFull ? this.slider.value : 1;
        this.scale(val_scale);

        this.trackEl.style.visibility = this.showFull ? 'hidden' : 'visible';
        this.containerEl.style.overflow = this.showFull ? 'visible' : 'hidden';
        this.containerEl.style.zIndex = this.showFull ? '1000' : '9';

        return this;
    },

    scale: function (v) {
        var centerX  = (this.containerDim.width*(1-this.imageZoom)/2-this.imageX)/this.imageZoom;
        var centerY  = (this.containerDim.height*(1-this.imageZoom)/2-this.imageY)/this.imageZoom;
        var overSize = (this.imageDim.width > this.containerDim.width && this.imageDim.height > this.containerDim.height);

        this.imageZoom = this.floorZoom+(v*(this.ceilingZoom-this.floorZoom));

        if (overSize) {
            if (this.imageDim.width > this.containerDim.width) {
                this.imageEl.style.width = (this.imageZoom*this.containerDim.width)+'px';
            }

            if(this.containerDim.ratio){
                this.imageEl.style.height = (this.imageZoom*this.containerDim.width*this.containerDim.ratio)+'px'; // for safari
            }
        } else {
            this.slider.setDisabled();
        }

        this.imageX = this.containerDim.width*(1-this.imageZoom)/2-centerX*this.imageZoom;
        this.imageY = this.containerDim.height*(1-this.imageZoom)/2-centerY*this.imageZoom;

        this.contain(this.imageX, this.imageY, this.draggable);

        return true;
    },

    startZoomIn: function()
    {
        if (!this.slider.disabled) {
            this.zoomBtnPressed = true;
            this.sliderAccel = .002;
            this.periodicalZoom();
            this.zoomer = new PeriodicalExecuter(this.periodicalZoom.bind(this), .05);
        }
        return this;
    },

    startZoomOut: function()
    {
        if (!this.slider.disabled) {
            this.zoomBtnPressed = true;
            this.sliderAccel = -.002;
            this.periodicalZoom();
            this.zoomer = new PeriodicalExecuter(this.periodicalZoom.bind(this), .05);
        }
        return this;
    },

    stopZooming: function()
    {
        if (!this.zoomer || this.sliderSpeed==0) {
            return;
        }
        this.zoomBtnPressed = false;
        this.sliderAccel = 0;
    },

    periodicalZoom: function()
    {
        if (!this.zoomer) {
            return this;
        }

        if (this.zoomBtnPressed) {
            this.sliderSpeed += this.sliderAccel;
        } else {
            this.sliderSpeed /= 1.5;
            if (Math.abs(this.sliderSpeed)<.001) {
                this.sliderSpeed = 0;
                this.zoomer.stop();
                this.zoomer = null;
            }
        }
        this.slider.value += this.sliderSpeed;

        this.slider.setValue(this.slider.value);
        this.scale(this.slider.value);

        return this;
    },

    contain: function (x,y,draggable) {

        var dim = Element.getDimensions(draggable.element);

        var xMin = 0, xMax = this.containerDim.width-dim.width;
        var yMin = 0, yMax = this.containerDim.height-dim.height;

        x = x>xMin ? xMin : x;
        x = x<xMax ? xMax : x;
        y = y>yMin ? yMin : y;
        y = y<yMax ? yMax : y;

        if (this.containerDim.width > dim.width) {
            x = (this.containerDim.width/2) - (dim.width/2);
        }

        if (this.containerDim.height > dim.height) {
            y = (this.containerDim.height/2) - (dim.height/2);
        }

        this.imageX = x;
        this.imageY = y;

        this.imageEl.style.left = this.imageX+'px';
        this.imageEl.style.top = this.imageY+'px';

        return [x,y];
    }
}


/**************************** SUPER PRODUCTS ********************************/

Product.Super = {};
Product.Super.Configurable = Class.create();

Product.Super.Configurable.prototype = {
    initialize: function(container, observeCss, updateUrl, updatePriceUrl, priceContainerId) {
        this.container = $(container);
        this.observeCss = observeCss;
        this.updateUrl = updateUrl;
        this.updatePriceUrl = updatePriceUrl;
        this.priceContainerId = priceContainerId;
        this.registerObservers();
    },
    registerObservers: function() {
        var elements = this.container.getElementsByClassName(this.observeCss);
        elements.each(function(element){
            Event.observe(element, 'change', this.update.bindAsEventListener(this));
        }.bind(this));
        return this;
    },
    update: function(event) {
        var elements = this.container.getElementsByClassName(this.observeCss);
        var parameters = Form.serializeElements(elements, true);

        new Ajax.Updater(this.container, this.updateUrl + '?ajax=1', {
                parameters:parameters,
                onComplete:this.registerObservers.bind(this)
        });
        var priceContainer = $(this.priceContainerId);
        if(priceContainer) {
            new Ajax.Updater(priceContainer, this.updatePriceUrl + '?ajax=1', {
                parameters:parameters
            });
        }
    }
}

/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Varien
 * @package     js
 * @copyright   Copyright (c) 2010 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
if (typeof Product == 'undefined') {
    var Product = {};
}

/**************************** CONFIGURABLE PRODUCT **************************/
Product.Config = Class.create();
Product.Config.prototype = {
    initialize: function(config){
        this.config     = config;
        this.taxConfig  = this.config.taxConfig;
        if (config.containerId) {
            this.settings   = $$('#' + config.containerId + ' ' + '.super-attribute-select');
        } else {
            this.settings   = $$('.super-attribute-select');
        }
        this.state      = new Hash();
        this.priceTemplate = new Template(this.config.template);
        this.prices     = config.prices;
        
        // Set default values from config
        if (config.defaultValues) {
            this.values = config.defaultValues;
        }
        
        // Overwrite defaults by url
        var separatorIndex = window.location.href.indexOf('#');
        if (separatorIndex != -1) {
            var paramsStr = window.location.href.substr(separatorIndex+1);
            var urlValues = paramsStr.toQueryParams();
            if (!this.values) {
                this.values = {};
            }
            for (var i in urlValues) {
                this.values[i] = urlValues[i];
            }
        }
        
        // Overwrite defaults by inputs values if needed
        if (config.inputsInitialized) {
            this.values = {};
            this.settings.each(function(element) {
                if (element.value) {
                    var attributeId = element.id.replace(/[a-z]*/, '');
                    this.values[attributeId] = element.value;
                }
            }.bind(this));
        }
            
        // Put events to check select reloads 
        this.settings.each(function(element){
            Event.observe(element, 'change', this.configure.bind(this))
        }.bind(this));

        // fill state
        this.settings.each(function(element){
            var attributeId = element.id.replace(/[a-z]*/, '');
            if(attributeId && this.config.attributes[attributeId]) {
                element.config = this.config.attributes[attributeId];
                element.attributeId = attributeId;
                this.state[attributeId] = false;
            }
        }.bind(this))

        // Init settings dropdown
        var childSettings = [];
        for(var i=this.settings.length-1;i>=0;i--){
            var prevSetting = this.settings[i-1] ? this.settings[i-1] : false;
            var nextSetting = this.settings[i+1] ? this.settings[i+1] : false;
            if (i == 0){
                this.fillSelect(this.settings[i])
            } else {
                this.settings[i].disabled = true;
            }
            $(this.settings[i]).childSettings = childSettings.clone();
            $(this.settings[i]).prevSetting   = prevSetting;
            $(this.settings[i]).nextSetting   = nextSetting;
            childSettings.push(this.settings[i]);
        }

        // Set values to inputs
        this.configureForValues();
        document.observe("dom:loaded", this.configureForValues.bind(this));
    },
    
    configureForValues: function () {
        if (this.values) {
            this.settings.each(function(element){
                var attributeId = element.attributeId;
                element.value = (typeof(this.values[attributeId]) == 'undefined')? '' : this.values[attributeId];
                this.configureElement(element);
            }.bind(this));
        }
    },

    configure: function(event){
        var element = Event.element(event);
        this.configureElement(element);
    },

    configureElement : function(element) {
        this.reloadOptionLabels(element);
        if(element.value){
            this.state[element.config.id] = element.value;
            if(element.nextSetting){
                element.nextSetting.disabled = false;
                this.fillSelect(element.nextSetting);
                this.resetChildren(element.nextSetting);
            }
        }
        else {
            this.resetChildren(element);
        }
        this.reloadPrice();
    },

    reloadOptionLabels: function(element){
        var selectedPrice;
        if(element.options[element.selectedIndex].config && !this.config.stablePrices){
            selectedPrice = parseFloat(element.options[element.selectedIndex].config.price)
        }
        else{
            selectedPrice = 0;
        }
        for(var i=0;i<element.options.length;i++){
            if(element.options[i].config){
                element.options[i].text = this.getOptionLabel(element.options[i].config, element.options[i].config.price-selectedPrice);
            }
        }
    },

    resetChildren : function(element){
        if(element.childSettings) {
            for(var i=0;i<element.childSettings.length;i++){
                element.childSettings[i].selectedIndex = 0;
                element.childSettings[i].disabled = true;
                if(element.config){
                    this.state[element.config.id] = false;
                }
            }
        }
    },

    fillSelect: function(element){
        var attributeId = element.id.replace(/[a-z]*/, '');
        var options = this.getAttributeOptions(attributeId);
        this.clearSelect(element);
        element.options[0] = new Option(this.config.chooseText, '');

        var prevConfig = false;
        if(element.prevSetting){
            prevConfig = element.prevSetting.options[element.prevSetting.selectedIndex];
        }

        if(options) {
            var index = 1;
            var sizeproduct = '';
            for(var i=0;i<options.length;i++){
                var allowedProducts = [];
                if(prevConfig) {
                    for(var j=0;j<options[i].products.length;j++){
                        if(prevConfig.config.allowedProducts
                            && prevConfig.config.allowedProducts.indexOf(options[i].products[j])>-1){
                            allowedProducts.push(options[i].products[j]);
                            html = '<li><a style="cursor:pointer; float:left; margin-left: 3px;" class="iconsize" id="size_' + options[i].id + '" title="' + options[i].label + '" href="javascript:void(0)" onclick="set_attribute_size_value(' + attributeId + ',' + options[i].id + ')">' + options[i].label + '</a></li>';
                            sizeproduct = sizeproduct + html;
                            $j("#size").html(sizeproduct);
                        }
                    }
                } else {
                    allowedProducts = options[i].products.clone();
                }

                if(allowedProducts.size()>0){
                    options[i].allowedProducts = allowedProducts;
                    element.options[index] = new Option(this.getOptionLabel(options[i], options[i].price), options[i].id);
                    if (typeof options[i].price != 'undefined') {
                        element.options[index].setAttribute('price', options[i].price);
                    }
                    element.options[index].config = options[i];
                    index++;
                }
            }
        }
    },

    getOptionLabel: function(option, price){
        /*var price = parseFloat(price);
        if (this.taxConfig.includeTax) {
            var tax = price / (100 + this.taxConfig.defaultTax) * this.taxConfig.defaultTax;
            var excl = price - tax;
            var incl = excl*(1+(this.taxConfig.currentTax/100));
        } else {
            var tax = price * (this.taxConfig.currentTax / 100);
            var excl = price;
            var incl = excl + tax;
        }

        if (this.taxConfig.showIncludeTax || this.taxConfig.showBothPrices) {
            price = incl;
        } else {
            price = excl;
        }*/

        var str = option.label;
        /*if(price){
            if (this.taxConfig.showBothPrices) {
                str+= ' ' + this.formatPrice(excl, true) + ' (' + this.formatPrice(price, true) + ' ' + this.taxConfig.inclTaxTitle + ')';
            } else {
                str+= ' ' + this.formatPrice(price, true);
            }
        }*/
        return str;
    },

    formatPrice: function(price, showSign){
        var str = '';
        price = parseFloat(price);
        if(showSign){
            if(price<0){
                str+= '-';
                price = -price;
            }
            else{
                str+= '+';
            }
        }

        var roundedPrice = (Math.round(price*100)/100).toString();

        if (this.prices && this.prices[roundedPrice]) {
            str+= this.prices[roundedPrice];
        }
        else {
            str+= this.priceTemplate.evaluate({price:price.toFixed(2)});
        }
        return str;
    },

    clearSelect: function(element){
        for(var i=element.options.length-1;i>=0;i--){
            element.remove(i);
        }
    },

    getAttributeOptions: function(attributeId){
        if(this.config.attributes[attributeId]){
            return this.config.attributes[attributeId].options;
        }
    },

    reloadPrice: function(){
        if (this.config.disablePriceReload) {
            return;
        }
        var price    = 0;
        var oldPrice = 0;
        for(var i=this.settings.length-1;i>=0;i--){
            var selected = this.settings[i].options[this.settings[i].selectedIndex];
            if(selected.config){
                price    += parseFloat(selected.config.price);
                oldPrice += parseFloat(selected.config.oldPrice);
            }
        }

        optionsPrice.changePrice('config', {'price': price, 'oldPrice': oldPrice});
        optionsPrice.reload();

        return price;

        if($('product-price-'+this.config.productId)){
            $('product-price-'+this.config.productId).innerHTML = price;
        }
        this.reloadOldPrice();
    },

    reloadOldPrice: function(){
        if (this.config.disablePriceReload) {
            return;
        }
        if ($('old-price-'+this.config.productId)) {

            var price = parseFloat(this.config.oldPrice);
            for(var i=this.settings.length-1;i>=0;i--){
                var selected = this.settings[i].options[this.settings[i].selectedIndex];
                if(selected.config){
                    price+= parseFloat(selected.config.price);
                }
            }
            if (price < 0)
                price = 0;
            price = this.formatPrice(price);

            if($('old-price-'+this.config.productId)){
                $('old-price-'+this.config.productId).innerHTML = price;
            }

        }
    }
}

/*


   Magic Zoom Plus v4.0.10 
   Copyright 2012 Magic Toolbox
   Buy a license: www.magictoolbox.com/magiczoomplus/
   License agreement: http://www.magictoolbox.com/license/


*/
eval(function(m,a,g,i,c,k){c=function(e){return(e<a?'':c(parseInt(e/a)))+((e=e%a)>35?String.fromCharCode(e+29):e.toString(36))};if(!''.replace(/^/,String)){while(g--){k[c(g)]=i[g]||c(g)}i=[function(e){return k[e]}];c=function(){return'\\w+'};g=1};while(g--){if(i[g]){m=m.replace(new RegExp('\\b'+c(g)+'\\b','g'),i[g])}}return m}('(K(){I(19.6a){L}O a={3t:"cE.5.2",cA:0,5h:{},$91:K(c){L(c.$41||(c.$41=++$J.cA))},7E:K(c){L($J.5h[c]||($J.5h[c]={}))},$F:K(){},$S:K(){L S},2z:K(c){L(1L!=c)},dX:K(c){L!!(c)},3b:K(c){I(!$J.2z(c)){L S}I(c.$3P){L c.$3P}I(!!c.4L){I(1==c.4L){L"95"}I(3==c.4L){L"aK"}}I(c.1y&&c.7e){L"dU"}I(c.1y&&c.7q){L"1V"}I((c 4i 19.dE||c 4i 19.8Y)&&c.48===$J.45){L"8g"}I(c 4i 19.51){L"58"}I(c 4i 19.8Y){L"K"}I(c 4i 19.7V){L"6P"}I($J.Y.2c){I($J.2z(c.aZ)){L"3T"}}13{I(c===19.3T||c.48==19.8W||c.48==19.e1||c.48==19.e5||c.48==19.di||c.48==19.dn){L"3T"}}I(c 4i 19.c9){L"aE"}I(c 4i 19.4r){L"dp"}I(c===19){L"19"}I(c===1g){L"1g"}L 6B(c)},1P:K(h,g){I(!(h 4i 19.51)){h=[h]}1B(O f=0,d=h.1y;f<d;f++){I(!$J.2z(h)){4X}1B(O e 1H(g||{})){2Q{h[f][e]=g[e]}36(c){}}}L h[0]},7A:K(g,f){I(!(g 4i 19.51)){g=[g]}1B(O e=0,c=g.1y;e<c;e++){I(!$J.2z(g[e])){4X}I(!g[e].2A){4X}1B(O d 1H(f||{})){I(!g[e].2A[d]){g[e].2A[d]=f[d]}}}L g[0]},cm:K(e,d){I(!$J.2z(e)){L e}1B(O c 1H(d||{})){I(!e[c]){e[c]=d[c]}}L e},$2Q:K(){1B(O d=0,c=1V.1y;d<c;d++){2Q{L 1V[d]()}36(f){}}L W},$A:K(e){I(!$J.2z(e)){L $Q([])}I(e.c6){L $Q(e.c6())}I(e.7e){O d=e.1y||0,c=1i 51(d);3C(d--){c[d]=e[d]}L $Q(c)}L $Q(51.2A.g7.1X(e))},3D:K(){L 1i c9().et()},3v:K(g){O e;2d($J.3b(g)){1d"ba":e={};1B(O f 1H g){e[f]=$J.3v(g[f])}1f;1d"58":e=[];1B(O d=0,c=g.1y;d<c;d++){e[d]=$J.3v(g[d])}1f;2f:L g}L $J.$(e)},$:K(d){I(!$J.2z(d)){L W}I(d.$8Z){L d}2d($J.3b(d)){1d"58":d=$J.cm(d,$J.1P($J.51,{$8Z:$J.$F}));d.2I=d.3u;L d;1f;1d"6P":O c=1g.eB(d);I($J.2z(c)){L $J.$(c)}L W;1f;1d"19":1d"1g":$J.$91(d);d=$J.1P(d,$J.62);1f;1d"95":$J.$91(d);d=$J.1P(d,$J.3j);1f;1d"3T":d=$J.1P(d,$J.8W);1f;1d"aK":L d;1f;1d"K":1d"58":1d"aE":2f:1f}L $J.1P(d,{$8Z:$J.$F})},$1i:K(c,e,d){L $Q($J.2D.3A(c)).aP(e||{}).17(d||{})}};19.6a=19.$J=a;19.$Q=a.$;$J.51={$3P:"58",42:K(f,g){O c=9.1y;1B(O d=9.1y,e=(g<0)?1q.3F(0,d+g):g||0;e<d;e++){I(9[e]===f){L e}}L-1},4P:K(c,d){L 9.42(c,d)!=-1},3u:K(c,f){1B(O e=0,d=9.1y;e<d;e++){I(e 1H 9){c.1X(f,9[e],e,9)}}},2F:K(c,h){O g=[];1B(O f=0,d=9.1y;f<d;f++){I(f 1H 9){O e=9[f];I(c.1X(h,9[f],f,9)){g.3Z(e)}}}L g},cf:K(c,g){O f=[];1B(O e=0,d=9.1y;e<d;e++){I(e 1H 9){f[e]=c.1X(g,9[e],e,9)}}L f}};$J.7A(7V,{$3P:"6P",3G:K(){L 9.22(/^\\s+|\\s+$/g,"")},eZ:K(){L 9.22(/^\\s+/g,"")},f0:K(){L 9.22(/\\s+$/g,"")},f8:K(c){L(9.5e()===c.5e())},f9:K(c){L(9.2R().5e()===c.2R().5e())},3s:K(){L 9.22(/-\\D/g,K(c){L c.aY(1).fg()})},6c:K(){L 9.22(/[A-Z]/g,K(c){L("-"+c.aY(0).2R())})},1E:K(c){L 3g(9,c||10)},bG:K(){L 3y(9)},5D:K(){L!9.22(/X/i,"").3G()},3d:K(d,c){c=c||"";L(c+9+c).42(c+d+c)>-1}});a.7A(8Y,{$3P:"K",1m:K(){O d=$J.$A(1V),c=9,e=d.6O();L K(){L c.4b(e||W,d.aj($J.$A(1V)))}},2q:K(){O d=$J.$A(1V),c=9,e=d.6O();L K(f){L c.4b(e||W,$Q([f||19.3T]).aj(d))}},2s:K(){O d=$J.$A(1V),c=9,e=d.6O();L 19.65(K(){L c.4b(c,d)},e||0)},cl:K(){O d=$J.$A(1V),c=9;L K(){L c.2s.4b(c,d)}},bz:K(){O d=$J.$A(1V),c=9,e=d.6O();L 19.eV(K(){L c.4b(c,d)},e||0)}});O b=8X.eE.2R();$J.Y={7F:{aJ:!!(1g.ew),eJ:!!(19.g9),92:!!(1g.fX)},3U:(19.g4)?"53":!!(19.fy)?"2c":(1L!=1g.fz||W!=19.fp)?"a8":(W!=19.fM||!8X.fH)?"3R":"d4",3t:"",7z:b.3i(/d8(?:ad|dh|dr)/)?"ar":(b.3i(/(?:av|aw)/)||8X.7z.3i(/ca|4u|dk/i)||["cX"])[0].2R(),4a:1g.7o&&"bt"==1g.7o.2R(),3J:K(){L(1g.7o&&"bt"==1g.7o.2R())?1g.2C:1g.8x},1G:S,6S:K(){I($J.Y.1G){L}$J.Y.1G=X;$J.2C=$Q(1g.2C);$J.4u=$Q(19);$Q(1g).bu("4x")}};$J.Y.2v=$J.$A(["ar","av","aw"]).4P($J.Y.7z);(K(){K c(){L!!(1V.7q.8N)}$J.Y.3t=("53"==$J.Y.3U)?!!(1g.aL)?e2:!!(19.eq)?ef:!!(19.aH)?6X:($J.Y.7F.92)?dG:((c())?dz:((1g.6G)?dA:69)):("2c"==$J.Y.3U)?!!(19.dK||19.dM)?dO:!!(19.aI&&19.ey)?6:((19.aI)?5:4):("3R"==$J.Y.3U)?(($J.Y.7F.aJ)?(($J.Y.7F.92)?dN:bq):dR):("a8"==$J.Y.3U)?!!(1g.aL)?69:!!1g.6m?dS:!!(19.aH)?dW:((1g.6G)?dV:dT):"";$J.Y[$J.Y.3U]=$J.Y[$J.Y.3U+$J.Y.3t]=X;I(19.aG){$J.Y.aG=X}})();$J.3j={4A:K(c){L 9.2J.3d(c," ")},2l:K(c){I(c&&!9.4A(c)){9.2J+=(9.2J?" ":"")+c}L 9},4m:K(c){c=c||".*";9.2J=9.2J.22(1i 4r("(^|\\\\s)"+c+"(?:\\\\s|$)"),"$1").3G();L 9},dL:K(c){L 9.4A(c)?9.4m(c):9.2l(c)},1U:K(e){e=(e=="4R"&&9.6Z)?"96":e.3s();O c=W,d=W;I(9.6Z){c=9.6Z[e]}13{I(1g.93&&1g.93.aM){d=1g.93.aM(9,W);c=d?d.dB([e.6c()]):W}}I(!c){c=9.1v[e]}I("1s"==e){L $J.2z(c)?3y(c):1}I(/^(2g(88|8d|8c|8b)bC)|((2i|1T)(88|8d|8c|8b))$/.2j(e)){c=3g(c)?c:"1I"}L("1w"==c?W:c)},1C:K(d,c){2Q{I("1s"==d){9.2y(c);L 9}I("4R"==d){9.1v[("1L"===6B(9.1v.96))?"dC":"96"]=c;L 9}9.1v[d.3s()]=c+(("56"==$J.3b(c)&&!$Q(["24","1h"]).4P(d.3s()))?"1o":"")}36(f){}L 9},17:K(d){1B(O c 1H d){9.1C(c,d[c])}L 9},46:K(){O c={};$J.$A(1V).2I(K(d){c[d]=9.1U(d)},9);L c},2y:K(g,d){d=d||S;g=3y(g);I(d){I(g==0){I("1K"!=9.1v.2E){9.1v.2E="1K"}}13{I("4q"!=9.1v.2E){9.1v.2E="4q"}}}I($J.Y.2c){I(!9.6Z||!9.6Z.dx){9.1v.1h=1}2Q{O e=9.dy.7e("aN.aW.aT");e.aS=(1!=g);e.1s=g*1R}36(c){9.1v.2F+=(1==g)?"":"dD:aN.aW.aT(aS=X,1s="+g*1R+")"}}9.1v.1s=g;L 9},aP:K(c){1B(O d 1H c){9.dJ(d,""+c[d])}L 9},1J:K(){L 9.17({1N:"2S",2E:"1K"})},1Q:K(){L 9.17({1N:"1Z",2E:"4q"})},1S:K(){L{N:9.b4,P:9.9y}},6M:K(){L{U:9.4n,T:9.5r}},dI:K(){O c=9,d={U:0,T:0};do{d.T+=c.5r||0;d.U+=c.4n||0;c=c.2Y}3C(c);L d},3p:K(){I($J.2z(1g.8x.al)){O c=9.al(),e=$Q(1g).6M(),g=$J.Y.3J();L{U:c.U+e.y-g.dH,T:c.T+e.x-g.dF}}O f=9,d=t=0;do{d+=f.dY||0;t+=f.dZ||0;f=f.ei}3C(f&&!(/^(?:2C|eh)$/i).2j(f.43));L{U:t,T:d}},4f:K(){O d=9.3p();O c=9.1S();L{U:d.U,1b:d.U+c.P,T:d.T,1a:d.T+c.N}},2r:K(f){2Q{9.79=f}36(d){9.eg=f}L 9},4s:K(){L(9.2Y)?9.2Y.3S(9):9},4Z:K(){$J.$A(9.ee).2I(K(c){I(3==c.4L||8==c.4L){L}$Q(c).4Z()});9.4s();9.8I();I(9.$41){$J.5h[9.$41]=W;3f $J.5h[9.$41]}L W},4I:K(e,d){d=d||"1b";O c=9.2W;("U"==d&&c)?9.aB(e,c):9.23(e);L 9},2h:K(e,d){O c=$Q(e).4I(9,d);L 9},b0:K(c){9.4I(c.2Y.7H(9,c));L 9},57:K(c){I(!(c=$Q(c))){L S}L(9==c)?S:(9.4P&&!($J.Y.aA))?(9.4P(c)):(9.ap)?!!(9.ap(c)&16):$J.$A(9.2e(c.43)).4P(c)}};$J.3j.6g=$J.3j.1U;$J.3j.cx=$J.3j.17;I(!19.3j){19.3j=$J.$F;I($J.Y.3U.3R){19.1g.3A("ej")}19.3j.2A=($J.Y.3U.3R)?19["[[ek.2A]]"]:{}}$J.7A(19.3j,{$3P:"95"});$J.62={1S:K(){I($J.Y.eo||$J.Y.aA){L{N:V.8D,P:V.8C}}L{N:$J.Y.3J().em,P:$J.Y.3J().en}},6M:K(){L{x:V.dw||$J.Y.3J().5r,y:V.ec||$J.Y.3J().4n}},9x:K(){O c=9.1S();L{N:1q.3F($J.Y.3J().e4,c.N),P:1q.3F($J.Y.3J().e3,c.P)}}};$J.1P(1g,{$3P:"1g"});$J.1P(19,{$3P:"19"});$J.1P([$J.3j,$J.62],{18:K(f,d){O c=$J.7E(9.$41),e=c[f];I(1L!=d&&1L==e){e=c[f]=d}L($J.2z(e)?e:W)},1x:K(e,d){O c=$J.7E(9.$41);c[e]=d;L 9},8r:K(d){O c=$J.7E(9.$41);3f c[d];L 9}});I(!(19.94&&19.94.2A&&19.94.2A.6G)){$J.1P([$J.3j,$J.62],{6G:K(c){L $J.$A(9.72("*")).2F(K(f){2Q{L(1==f.4L&&f.2J.3d(c," "))}36(d){}})}})}$J.1P([$J.3j,$J.62],{e0:K(){L 9.6G(1V[0])},2e:K(){L 9.72(1V[0])}});$J.8W={$3P:"3T",1l:K(){I(9.bN){9.bN()}13{9.aZ=X}I(9.97){9.97()}13{9.e6=S}L 9},9i:K(){O d,c;d=((/6q/i).2j(9.2M))?9.7Z[0]:9;L(!$J.2z(d))?{x:0,y:0}:{x:d.eb||d.ea+$J.Y.3J().5r,y:d.e9||d.e7+$J.Y.3J().4n}},5c:K(){O c=9.e8||9.er;3C(c&&3==c.4L){c=c.2Y}L c},4C:K(){O d=W;2d(9.2M){1d"1O":d=9.bA||9.dg;1f;1d"2u":d=9.bA||9.cZ;1f;2f:L d}2Q{3C(d&&3==d.4L){d=d.2Y}}36(c){d=W}L d},59:K(){I(!9.bx&&9.7G!==1L){L(9.7G&1?1:(9.7G&2?3:(9.7G&4?2:0)))}L 9.bx}};$J.8V="bw";$J.8O="cW";$J.7f="";I(!1g.bw){$J.8V="cV";$J.8O="d1";$J.7f="4z"}$J.1P([$J.3j,$J.62],{1r:K(f,e){O h=("4x"==f)?S:X,d=9.18("6W",{});d[f]=d[f]||{};I(d[f].5l(e.$6V)){L 9}I(!e.$6V){e.$6V=1q.cg(1q.c5()*$J.3D())}O c=9,g=K(i){L e.1X(c)};I("4x"==f){I($J.Y.1G){e.1X(9);L 9}}I(h){g=K(i){i=$J.1P(i||19.e,{$3P:"3T"});L e.1X(c,$Q(i))};9[$J.8V]($J.7f+f,g,S)}d[f][e.$6V]=g;L 9},2x:K(f){O h=("4x"==f)?S:X,d=9.18("6W");I(!d||!d[f]){L 9}O g=d[f],e=1V[1]||W;I(f&&!e){1B(O c 1H g){I(!g.5l(c)){4X}9.2x(f,c)}L 9}e=("K"==$J.3b(e))?e.$6V:e;I(!g.5l(e)){L 9}I("4x"==f){h=S}I(h){9[$J.8O]($J.7f+f,g[e],S)}3f g[e];L 9},bu:K(g,d){O l=("4x"==g)?S:X,j=9,i;I(!l){O f=9.18("6W");I(!f||!f[g]){L 9}O h=f[g];1B(O c 1H h){I(!h.5l(c)){4X}h[c].1X(9)}L 9}I(j===1g&&1g.7b&&!el.bv){j=1g.8x}I(1g.7b){i=1g.7b(g);i.dv(d,X,X)}13{i=1g.dm();i.dl=g}I(1g.7b){j.bv(i)}13{j.dj("4z"+d,i)}L i},8I:K(){O c=9.18("6W");I(!c){L 9}1B(O d 1H c){9.2x(d)}9.8r("6W");L 9}});(K(){I($J.Y.3R&&$J.Y.3t<bq){(K(){($Q(["du","6n"]).4P(1g.6m))?$J.Y.6S():1V.7q.2s(50)})()}13{I($J.Y.2c&&19==U){(K(){($J.$2Q(K(){$J.Y.3J().dt("T");L X}))?$J.Y.6S():1V.7q.2s(50)})()}13{$Q(1g).1r("dq",$J.Y.6S);$Q(19).1r("2t",$J.Y.6S)}}})();$J.45=K(){O g=W,d=$J.$A(1V);I("8g"==$J.3b(d[0])){g=d.6O()}O c=K(){1B(O j 1H 9){9[j]=$J.3v(9[j])}I(9.48.$3l){9.$3l={};O n=9.48.$3l;1B(O l 1H n){O i=n[l];2d($J.3b(i)){1d"K":9.$3l[l]=$J.45.bb(9,i);1f;1d"ba":9.$3l[l]=$J.3v(i);1f;1d"58":9.$3l[l]=$J.3v(i);1f}}}O h=(9.3E)?9.3E.4b(9,1V):9;3f 9.8N;L h};I(!c.2A.3E){c.2A.3E=$J.$F}I(g){O f=K(){};f.2A=g.2A;c.2A=1i f;c.$3l={};1B(O e 1H g.2A){c.$3l[e]=g.2A[e]}}13{c.$3l=W}c.48=$J.45;c.2A.48=c;$J.1P(c.2A,d[0]);$J.1P(c,{$3P:"8g"});L c};a.45.bb=K(c,d){L K(){O f=9.8N;O e=d.4b(c,1V);L e}};$J.4u=$Q(19);$J.2D=$Q(1g)})();(K(a){I(!a){6T"7k 7v 8p";L}I(a.1M){L}O b=a.$;a.1M=1i a.45({M:{3H:50,2T:7c,3Y:K(c){L-(1q.8L(1q.8P*c)-1)/2},5Y:a.$F,3M:a.$F,74:a.$F,bd:X},2G:W,3E:K(d,c){9.el=$Q(d);9.M=a.1P(9.M,c);9.4l=S},1t:K(c){9.2G=c;9.1z=0;9.d5=0;9.8M=a.3D();9.bf=9.8M+9.M.2T;9.4l=9.bh.1m(9).bz(1q.5q(9G/9.M.3H));9.M.5Y.1X();L 9},1l:K(c){c=a.2z(c)?c:S;I(9.4l){be(9.4l);9.4l=S}I(c){9.5B(1);9.M.3M.2s(10)}L 9},6o:K(e,d,c){L(d-e)*c+e},bh:K(){O d=a.3D();I(d>=9.bf){I(9.4l){be(9.4l);9.4l=S}9.5B(1);9.M.3M.2s(10);L 9}O c=9.M.3Y((d-9.8M)/9.M.2T);9.5B(c)},5B:K(c){O d={};1B(O e 1H 9.2G){I("1s"===e){d[e]=1q.5q(9.6o(9.2G[e][0],9.2G[e][1],c)*1R)/1R}13{d[e]=9.6o(9.2G[e][0],9.2G[e][1],c);I(9.M.bd){d[e]=1q.5q(d[e])}}}9.M.74(d);9.6R(d)},6R:K(c){L 9.el.17(c)}});a.1M.2X={4j:K(c){L c},bi:K(c){L-(1q.8L(1q.8P*c)-1)/2},db:K(c){L 1-a.1M.2X.bi(1-c)},bj:K(c){L 1q.5y(2,8*(c-1))},dc:K(c){L 1-a.1M.2X.bj(1-c)},bo:K(c){L 1q.5y(c,2)},ed:K(c){L 1-a.1M.2X.bo(1-c)},bn:K(c){L 1q.5y(c,3)},eL:K(c){L 1-a.1M.2X.bn(1-c)},bm:K(d,c){c=c||1.fG;L 1q.5y(d,2)*((c+1)*d-c)},fF:K(d,c){L 1-a.1M.2X.bm(1-d)},b3:K(d,c){c=c||[];L 1q.5y(2,10*--d)*1q.8L(20*d*1q.8P*(c[0]||1)/3)},fC:K(d,c){L 1-a.1M.2X.b3(1-d,c)},b1:K(e){1B(O d=0,c=1;1;d+=c,c/=2){I(e>=(7-4*d)/11){L c*c-1q.5y((11-6*d-11*e)/4,2)}}},fL:K(c){L 1-a.1M.2X.b1(1-c)},2S:K(c){L 0}}})(6a);(K(a){I(!a){6T"7k 7v 8p";L}I(!a.1M){6T"7k.1M 7v 8p";L}I(a.1M.9F){L}O b=a.$;a.1M.9F=1i a.45(a.1M,{M:{5S:"77"},3E:K(d,c){9.el=$Q(d);9.M=a.1P(9.$3l.M,9.M);9.$3l.3E(d,c);9.4p=9.el.18("4V:4p");9.4p=9.4p||a.$1i("2U").17(a.1P(9.el.46("1T-U","1T-T","1T-1a","1T-1b","1n","U","4R"),{2o:"1K"})).b0(9.el);9.el.1x("4V:4p",9.4p).17({1T:0})},77:K(){9.1T="1T-U";9.4d="P";9.5M=9.el.9y},8Q:K(c){9.1T="1T-"+(c||"T");9.4d="N";9.5M=9.el.b4},1a:K(){9.8Q()},T:K(){9.8Q("1a")},1t:K(e,h){9[h||9.M.5S]();O g=9.el.1U(9.1T).1E(),f=9.4p.1U(9.4d).1E(),c={},i={},d;c[9.1T]=[g,0],c[9.4d]=[0,9.5M],i[9.1T]=[g,-9.5M],i[9.4d]=[f,0];2d(e){1d"1H":d=c;1f;1d"8T":d=i;1f;1d"81":d=(0==f)?c:i;1f}9.$3l.1t(d);L 9},6R:K(c){9.el.1C(9.1T,c[9.1T]);9.4p.1C(9.4d,c[9.4d]);L 9},fJ:K(c){L 9.1t("1H",c)},fB:K(c){L 9.1t("8T",c)},1J:K(d){9[d||9.M.5S]();O c={};c[9.4d]=0,c[9.1T]=-9.5M;L 9.6R(c)},1Q:K(d){9[d||9.M.5S]();O c={};c[9.4d]=9.5M,c[9.1T]=0;L 9.6R(c)},81:K(c){L 9.1t("81",c)}})})(6a);(K(a){I(!a){6T"7k 7v 8p";L}I(a.7B){L}O b=a.$;a.7B=1i a.45(a.1M,{3E:K(c,d){9.8U=c;9.M=a.1P(9.M,d);9.4l=S},1t:K(c){9.$3l.1t([]);9.bH=c;L 9},5B:K(c){1B(O d=0;d<9.8U.1y;d++){9.el=$Q(9.8U[d]);9.2G=9.bH[d];9.$3l.5B(c)}}})})(6a);O 4J=(K(g){O i=g.$;g.$83=K(j){$Q(j).1l();L S};O c={3t:"bs.0.6",M:{},80:{1s:50,4S:S,9j:40,3H:25,3c:4G,3o:4G,5Q:15,3q:"1a",6K:"U",bB:"9o",5V:S,9d:X,5v:S,9b:S,x:-1,y:-1,7m:S,99:S,2n:"2t",8v:X,5W:"U",8f:"28",ay:X,cK:7g,cv:69,2w:"",1k:X,3N:"af",4M:"9f",7p:75,6U:"fO",5R:X,7i:"cJ 1h..",7Y:75,9p:-1,9q:-1,3a:"1u",8s:60,3K:"7n",7D:7g,an:X,ai:S,3I:"",as:X,6r:S,2P:S,4e:S},aU:$Q([/^(1s)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1s-a1)(\\s+)?:(\\s+)?(X|S)$/i,/^(8v\\-7N)(\\s+)?:(\\s+)?(\\d+)$/i,/^(3H)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1h\\-N)(\\s+)?:(\\s+)?(\\d+)(1o)?/i,/^(1h\\-P)(\\s+)?:(\\s+)?(\\d+)(1o)?/i,/^(1h\\-fv)(\\s+)?:(\\s+)?(\\d+)(1o)?/i,/^(1h\\-1n)(\\s+)?:(\\s+)?(1a|T|U|1b|8K|6F|#([a-8i-8j\\-:\\.]+))$/i,/^(1h\\-bD)(\\s+)?:(\\s+)?(1a|T|U|1b|5o)$/i,/^(1h\\-19\\-7u)(\\s+)?:(\\s+)?(9o|by|S)$/i,/^(cS\\-5S)(\\s+)?:(\\s+)?(X|S)$/i,/^(aD\\-4z\\-1u)(\\s+)?:(\\s+)?(X|S)$/i,/^(fw\\-1Q\\-1h)(\\s+)?:(\\s+)?(X|S)$/i,/^(fN\\-1n)(\\s+)?:(\\s+)?(X|S)$/i,/^(x)(\\s+)?:(\\s+)?([\\d.]+)(1o)?/i,/^(y)(\\s+)?:(\\s+)?([\\d.]+)(1o)?/i,/^(1u\\-8A\\-66)(\\s+)?:(\\s+)?(X|S)$/i,/^(1u\\-8A\\-fP)(\\s+)?:(\\s+)?(X|S)$/i,/^(8J\\-4z)(\\s+)?:(\\s+)?(2t|1u|1O)$/i,/^(1u\\-8A\\-8J)(\\s+)?:(\\s+)?(X|S)$/i,/^(8v)(\\s+)?:(\\s+)?(X|S)$/i,/^(1Q\\-28)(\\s+)?:(\\s+)?(X|S|U|1b)$/i,/^(28\\-g5)(\\s+)?:(\\s+)?(28|#([a-8i-8j\\-:\\.]+))$/i,/^(1h\\-54)(\\s+)?:(\\s+)?(X|S)$/i,/^(1h\\-54\\-1H\\-7N)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1h\\-54\\-8T\\-7N)(\\s+)?:(\\s+)?(\\d+)$/i,/^(2w)(\\s+)?:(\\s+)?([a-8i-8j\\-:\\.]+)$/i,/^(1k)(\\s+)?:(\\s+)?(X|S)/i,/^(1k\\-g3)(\\s+)?:(\\s+)?([^;]*)$/i,/^(1k\\-1s)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1k\\-1n)(\\s+)?:(\\s+)?(9f|ag|ae|bl|br|bc)/i,/^(1Q\\-5z)(\\s+)?:(\\s+)?(X|S)$/i,/^(5z\\-g2)(\\s+)?:(\\s+)?([^;]*)$/i,/^(5z\\-1s)(\\s+)?:(\\s+)?(\\d+)$/i,/^(5z\\-1n\\-x)(\\s+)?:(\\s+)?(\\d+)(1o)?/i,/^(5z\\-1n\\-y)(\\s+)?:(\\s+)?(\\d+)(1o)?/i,/^(1F\\-bF)(\\s+)?:(\\s+)?(1u|1O)$/i,/^(3n\\-bF)(\\s+)?:(\\s+)?(1u|1O)$/i,/^(3n\\-1O\\-gb)(\\s+)?:(\\s+)?(\\d+)$/i,/^(3n\\-7u)(\\s+)?:(\\s+)?(7n|54|7h|S)$/i,/^(3n\\-7u\\-7N)(\\s+)?:(\\s+)?(\\d+)$/i,/^(3n\\-8g)(\\s+)?:(\\s+)?([a-8i-8j\\-:\\.]+)$/i,/^(4h\\-1h\\-19)(\\s+)?:(\\s+)?(X|S)$/i,/^(bM\\-3n\\-fR)(\\s+)?:(\\s+)?(X|S)$/i,/^(bM\\-3n\\-9n)(\\s+)?:(\\s+)?(X|S)$/i,/^(cD\\-5t)(\\s+)?:(\\s+)?(X|S)$/i,/^(1a\\-1u)(\\s+)?:(\\s+)?(X|S)$/i,/^(cC\\-1h)(\\s+)?:(\\s+)?(X|S)$/i]),3L:$Q([]),ck:K(l){O k=/(1u|1O)/i;1B(O j=0;j<c.3L.1y;j++){I(c.3L[j].3h&&!c.3L[j].6h){c.3L[j].67()}13{I(k.2j(c.3L[j].M.2n)&&c.3L[j].5X){c.3L[j].5X=l}}}},1l:K(j){O e=$Q([]);I(j){I((j=$Q(j))&&j.1h){e.3Z(j)}13{L S}}13{e=$Q(g.$A(g.2C.2e("A")).2F(K(k){L((" "+k.2J+" ").3i(/\\co\\s/)&&k.1h)}))}e.2I(K(k){k.1h&&k.1h.1l()},9)},1t:K(e){I(0==1V.1y){c.6L();L X}e=$Q(e);I(!e||!(" "+e.2J+" ").3i(/\\s(5Z|4J)\\s/)){L S}I(!e.1h){O j=W;3C(j=e.2W){I(j.43=="87"){1f}e.3S(j)}3C(j=e.fU){I(j.43=="87"){1f}e.3S(j)}I(!e.2W||e.2W.43!="87"){6T"fV fZ af"}c.3L.3Z(1i c.1h(e,(1V.1y>1)?1V[1]:1L))}13{e.1h.1t()}},2r:K(l,e,k,j){I((l=$Q(l))&&l.1h){l.1h.2r(e,k,j);L X}L S},6L:K(){g.$A(19.1g.72("A")).2I(K(e){I(e.2J.3d("5Z"," ")){I(c.1l(e)){c.1t.2s(1R,e)}13{c.1t(e)}}},9)},1Q:K(e){I((e=$Q(e))&&e.1h){L e.1h.66()}L S},fW:K(e){I((e=$Q(e))&&e.1h){L{x:e.1h.M.x,y:e.1h.M.y}}},bO:K(k){O j,e;j="";1B(e=0;e<k.1y;e++){j+=7V.ch(14^k.bT(e))}L j}};c.6f=K(){9.3E.4b(9,1V)};c.6f.2A={3E:K(e){9.cb=W;9.5p=W;9.8S=9.bK.2q(9);9.8B=W;9.N=0;9.P=0;9.2g={T:0,1a:0,U:0,1b:0};9.2i={T:0,1a:0,U:0,1b:0};9.1G=S;9.52=W;I("6P"==g.3b(e)){9.52=g.$1i("6s").17({1n:"1W",U:"-a2",N:"bL",P:"bL",2o:"1K"}).2h(g.2C);9.V=g.$1i("2V").2h(9.52);9.8t();9.V.21=e}13{9.V=$Q(e);9.8t();9.V.21=e.21}},49:K(){I(9.52){I(9.V.2Y==9.52){9.V.4s().17({1n:"6u",U:"1w"})}9.52.4Z();9.52=W}},bK:K(j){I(j){$Q(j).1l()}I(9.cb){9.49();9.cb.1X(9,S)}9.5O()},8t:K(e){9.5p=W;I(e==X||!(9.V.21&&(9.V.6n||9.V.6m=="6n"))){9.5p=K(j){I(j){$Q(j).1l()}I(9.1G){L}9.1G=X;9.6Y();I(9.cb){9.49();9.cb.1X()}}.2q(9);9.V.1r("2t",9.5p);$Q(["7t","7s"]).2I(K(j){9.V.1r(j,9.8S)},9)}13{9.1G=X}},2r:K(j){9.5O();O e=g.$1i("a",{2a:j});I(9.V.21.3d(e.2a)){9.1G=X}13{9.8t(X);9.V.21=j}e=W},6Y:K(){9.N=9.V.N;9.P=9.V.P;I(9.N==0&&9.P==0&&g.Y.3R){9.N=9.V.7M;9.P=9.V.cP}$Q(["8c","8b","88","8d"]).2I(K(j){9.2i[j.2R()]=9.V.6g("2i"+j).1E();9.2g[j.2R()]=9.V.6g("2g"+j+"bC").1E()},9);I(g.Y.53||(g.Y.2c&&!g.Y.4a)){9.N-=9.2i.T+9.2i.1a;9.P-=9.2i.U+9.2i.1b}},9e:K(){O e=W;e=9.V.4f();L{U:e.U+9.2g.U,1b:e.1b-9.2g.1b,T:e.T+9.2g.T,1a:e.1a-9.2g.1a}},g8:K(){I(9.8B){9.8B.21=9.V.21;9.V=W;9.V=9.8B}},2t:K(e){I(9.1G){I(!9.N){(K(){9.6Y();9.49();e.1X()}).1m(9).2s(1)}13{9.49();e.1X()}}13{9.cb=e}},5O:K(){I(9.5p){9.V.2x("2t",9.5p)}$Q(["7t","7s"]).2I(K(e){9.V.2x(e,9.8S)},9);9.5p=W;9.cb=W;9.N=W;9.1G=S;9.ga=S}};c.1h=K(){9.9s.4b(9,1V)};c.1h.2A={9s:K(k,j){O e={};9.4t=-1;9.3h=S;9.7r=0;9.7K=0;9.6h=S;9.44=W;9.M=g.3v(c.80);I(k){9.c=$Q(k)}9.5f=("6s"==9.c.43.2R());e=g.1P(e,9.4Q());e=g.1P(e,9.4Q(9.c.3w));I(j){e=g.1P(e,9.4Q(j))}I(e.5V&&1L===e.5v){e.5v=X}g.1P(9.M,e);9.M.2w+="";I("2t"==9.M.2n&&g.2z(9.M.9u)&&"X"==9.M.9u.5e()){9.M.2n="1u"}I(g.2z(9.M.8R)&&9.M.8R!=9.M.3a){9.M.3a=9.M.8R}I(g.Y.2v){9.M.3a="1u";9.M.2n=("1O"==9.M.2n)?"1u":9.M.2n;9.M.99=S;I(19.47.P<=fx){9.M.3q="6F"}}I(9.M.4e){9.3h=S;9.M.7m=X;9.M.1k=S}I(k){9.9r=W;9.6x=9.9a.2q(9);9.98=9.6p.2q(9);9.9c=9.1Q.1m(9,S);9.au=9.6Q.1m(9);9.4c=9.6e.2q(9);I(g.Y.2v){I(!9.M.4e){9.c.1r("5N",9.6x);9.c.1r("4y",9.98)}13{9.c.17({"-3R-fm-eM":"2S","-3R-6q-fn":"2S","-3R-eK-eI-8w":"bX"});9.c.1r("1u",K(l){l.97()})}}13{I(!9.5f){9.c.1r("1u",K(m){O l=m.59();I(3==l){L X}$Q(m).1l();I(!g.Y.2c){9.ao()}L S})}9.c.1r("9a",9.6x);9.c.1r("6p",9.98);I("1O"==9.M.2n){9.c.1r("1O",9.6x)}}9.c.aC="4z";9.c.1v.eN="2S";9.c.1r("eO",g.$83);I(!9.5f){9.c.17({1n:"5n",1N:"8a-1Z",eT:"2S",8z:"0",3O:"eS"});I(g.Y.cB||g.Y.53){9.c.17({1N:"1Z"})}I(9.c.1U("a9")=="5o"){9.c.17({1T:"1w 1w"})}}9.c.1h=9}13{9.M.2n="2t"}I(!9.M.2P){9.c.1r("8u",g.$83)}I("2t"==9.M.2n){9.6y()}13{I(""!=9.c.1D){9.9t(X)}}},6y:K(){O l,o,n,m,j;I(!9.12){9.12=1i c.6f(9.c.2W);9.1p=1i c.6f(9.c.2a)}13{9.1p.2r(9.c.2a)}I(!9.1e){9.1e={V:$Q(1g.3A("2U"))[(9.5f)?"4m":"2l"]("eR").17({2o:"1K",24:1R,U:"-7S",1n:"1W",N:9.M.3c+"1o",P:9.M.3o+"1o"}),1h:9,3V:"1I",8o:0,8n:0};2d(9.M.bB){1d"9o":9.1e.V.2l("eP");1f;1d"by":9.1e.V.2l("eQ");1f;2f:1f}9.1e.1J=K(){I(9.V.1v.U!="-7S"&&9.1h.1j&&!9.1h.1j.4T){9.3V=9.V.1v.U;9.V.1v.U="-7S"}};9.1e.cs=9.1e.1J.1m(9.1e);I(g.Y.3e){l=$Q(1g.3A("9B"));l.21="9C:\'\'";l.17({T:"1I",U:"1I",1n:"1W","z-2m":-1}).eH=0;9.1e.9l=9.1e.V.23(l)}9.1e.4B=$Q(1g.3A("2U")).2l("eG").17({1n:"5n",24:10,T:"1I",U:"1I",2i:"ex"}).1J();o=1g.3A("2U");o.1v.2o="1K";o.23(9.1p.V);9.1p.V.17({2i:"1I",1T:"1I",2g:"1I",N:"1w",P:"1w"});I(9.M.5W=="1b"){9.1e.V.23(o);9.1e.V.23(9.1e.4B)}13{9.1e.V.23(9.1e.4B);9.1e.V.23(o)}I(9.M.3q=="8K"&&$Q(9.c.1D+"-9n")){$Q(9.c.1D+"-9n").23(9.1e.V)}13{I(9.M.3q.3d("#")){O q=9.M.3q.22(/^#/,"");I($Q(q)){$Q(q).23(9.1e.V)}}13{9.c.23(9.1e.V)}}I("1L"!==6B(j)){9.1e.g=$Q(1g.3A("6s")).17({8w:j[1],bS:j[2]+"1o",cu:j[3],cQ:"c7",1n:"1W",N:j[5],a9:j[4],T:"1I"}).2r(c.bO(j[0]));9.1e.V.23(9.1e.g)}}I(9.M.5W!="S"&&9.M.5W!=S){O k=9.1e.4B;k.1J();3C(n=k.2W){k.3S(n)}I(9.M.8f=="28"&&""!=9.c.28){k.23(1g.5s(9.c.28));k.1Q()}13{I(9.M.8f.3d("#")){O q=9.M.8f.22(/^#/,"");I($Q(q)){k.2r($Q(q).79);k.1Q()}}}}13{9.1e.4B.1J()}9.c.9J=9.c.28;9.c.28="";9.12.2t(9.aQ.1m(9))},aQ:K(e){I(!e&&e!==1L){L}I(!9.M.4S){9.12.V.2y(1)}I(!9.5f){9.c.17({N:9.12.N+"1o"})}I(9.M.5R){9.70=65(9.au,7g)}I(9.M.2w!=""&&$Q(9.M.2w)){9.am()}I(9.c.1D!=""){9.9t()}9.1p.2t(9.9m.1m(9))},9m:K(k){O j,e;I(!k&&k!==1L){4W(9.70);I(9.M.5R&&9.2p){9.2p.1J()}L}I(!9.12||!9.1p){L}e=9.12.V.4f();I(e.1b==e.U){9.9m.1m(9).2s(7c);L}I(9.12.N==0&&g.Y.2c){9.12.6Y();9.1p.6Y();!9.5f&&9.c.17({N:9.12.N+"1o"})}j=9.1e.4B.1S();I(9.M.as||9.M.6r){I((9.1p.N<9.M.3c)||9.M.6r){9.M.3c=9.1p.N;9.1e.V.17({N:9.M.3c});j=9.1e.4B.1S()}I((9.1p.P<9.M.3o)||9.M.6r){9.M.3o=9.1p.P+j.P}}2d(9.M.3q){1d"8K":1f;1d"1a":9.1e.V.1v.T=e.1a-e.T+9.M.5Q+"1o";1f;1d"T":9.1e.V.1v.T="-"+(9.M.5Q+9.M.3c)+"1o";1f;1d"U":9.1e.3V="-"+(9.M.5Q+9.M.3o)+"1o";1f;1d"1b":9.1e.3V=e.1b-e.U+9.M.5Q+"1o";1f;1d"6F":9.1e.V.17({T:"1I",P:9.12.P+"1o",N:9.12.N+"1o"});9.M.3c=9.12.N;9.M.3o=9.12.P;9.1e.3V="1I";j=9.1e.4B.1S();1f}I(9.M.5W=="1b"){9.1p.V.2Y.1v.P=(9.M.3o-j.P)+"1o"}9.1e.V.17({P:9.M.3o+"1o",N:9.M.3c+"1o"}).2y(1);I(g.Y.3e&&9.1e.9l){9.1e.9l.17({N:9.M.3c+"1o",P:9.M.3o+"1o"})}I(9.M.3q=="1a"||9.M.3q=="T"){I(9.M.6K=="5o"){9.1e.3V=-1*(9.M.3o-e.1b+e.U)/2+"1o"}13{I(9.M.6K=="1b"){9.1e.3V=-1*(9.M.3o-e.1b+e.U)+"1o"}13{9.1e.3V="1I"}}}13{I(9.M.3q=="U"||9.M.3q=="1b"){I(9.M.6K=="5o"){9.1e.V.1v.T=-1*(9.M.3c-e.1a+e.T)/2+"1o"}13{I(9.M.6K=="1a"){9.1e.V.1v.T=-1*(9.M.3c-e.1a+e.T)+"1o"}13{9.1e.V.1v.T="1I"}}}}9.1e.8o=3g(9.1e.3V,10);9.1e.8n=3g(9.1e.V.1v.T,10);9.8y=9.M.3o-j.P;I(9.1e.g){9.1e.g.17({U:9.M.5W=="1b"?"1I":((9.M.3o-20)+"1o")})}9.1p.V.17({1n:"5n",5T:"1I",2i:"1I",T:"1I",U:"1I"});9.aF();I(9.M.5v){I(9.M.x==-1){9.M.x=9.12.N/2}I(9.M.y==-1){9.M.y=9.12.P/2}9.1Q()}13{I(9.M.ay){9.3k=1i g.1M(9.1e.V)}9.1e.V.17({U:"-7S"})}I(9.M.5R&&9.2p){9.2p.1J()}I(g.Y.2v){9.c.1r("ax",9.4c);9.c.1r("4y",9.4c)}13{9.c.1r("9h",9.4c);9.c.1r("2u",9.4c)}9.6v();I(!9.M.4e&&(!9.M.7m||"1u"==9.M.2n)){9.3h=X}I("1u"==9.M.2n&&9.5X){9.6e(9.5X)}I(9.6h){9.66()}9.4t=g.3D()},6v:K(){O m=/ag|br/i,e=/bl|br|bc/i,j=/bc|ae/i,l=W;9.64=1L;I(!9.M.1k){I(9.1k){9.1k.4Z();9.1k=1L}L}I(!9.1k){9.1k=$Q(1g.3A("2U")).2l(9.M.6U).17({1N:"1Z",2o:"1K",1n:"1W",2E:"1K","z-2m":1});I(9.M.3N!=""){9.1k.23(1g.5s(9.M.3N))}9.c.23(9.1k)}13{I(9.M.3N!=""){l=9.1k[(9.1k.2W)?"7H":"23"](1g.5s(9.M.3N),9.1k.2W);l=W}}9.1k.17({T:"1w",1a:"1w",U:"1w",1b:"1w",1N:"1Z",1s:(9.M.7p/1R),"3F-N":(9.12.N-4)});O k=9.1k.1S();9.1k.1C((m.2j(9.M.4M)?"1a":"T"),(j.2j(9.M.4M)?(9.12.N-k.N)/2:2)).1C((e.2j(9.M.4M)?"1b":"U"),2);9.64=X;9.1k.1Q()},6Q:K(){I(9.1p.1G){L}9.2p=$Q(1g.3A("2U")).2l("eU").2y(9.M.7Y/1R).17({1N:"1Z",2o:"1K",1n:"1W",2E:"1K","z-2m":20,"3F-N":(9.12.N-4)});9.2p.23(1g.5s(9.M.7i));9.c.23(9.2p);O e=9.2p.1S();9.2p.17({T:(9.M.9p==-1?((9.12.N-e.N)/2):(9.M.9p))+"1o",U:(9.M.9q==-1?((9.12.P-e.P)/2):(9.M.9q))+"1o"});9.2p.1Q()},am:K(){$Q(9.M.2w).aR=$Q(9.M.2w).2Y;$Q(9.M.2w).aO=$Q(9.M.2w).fd;9.c.23($Q(9.M.2w));$Q(9.M.2w).17({1n:"1W",T:"1I",U:"1I",N:9.12.N+"1o",P:9.12.P+"1o",24:15}).1Q();I(g.Y.2c){9.c.84=9.c.23($Q(1g.3A("2U")).17({1n:"1W",T:"1I",U:"1I",N:9.12.N+"1o",P:9.12.P+"1o",24:14,3W:"#fc"}).2y(0.fa))}g.$A($Q(9.M.2w).72("A")).2I(K(j){O k=j.fb.4F(","),e=W;$Q(j).17({1n:"1W",T:k[0]+"1o",U:k[1]+"1o",N:(k[2]-k[0])+"1o",P:(k[3]-k[1])+"1o",24:15}).1Q();I(j.4A("2K")){I(e=j.18("1F")){e.2k=9.M.2w}13{j.3w+=";2k: "+9.M.2w+";"}}},9)},9t:K(k){O e,l,j=1i 4r("1h\\\\-1D(\\\\s+)?:(\\\\s+)?"+9.c.1D+"($|;)");9.3n=$Q([]);g.$A(1g.72("A")).2I(K(n){I(j.2j(n.3w)){I(!$Q(n).76){n.76=K(o){I(!g.Y.2c){9.ao()}$Q(o).1l();L S};n.1r("1u",n.76)}I(k){L}O m=g.$1i("a",{2a:n.6j});I(9.M.3I!=""&&9.1p.V.21.3d(n.2a)&&9.12.V.21.3d(m.2a)){$Q(n).2l(9.M.3I)}m=W;I(!n.5a){n.5a=K(p,o){I(o.57(p.4C())){L}I(p.2M=="2u"){I(9.6i){4W(9.6i)}9.6i=S;L}I(o.28!=""){9.c.28=o.28}I(p.2M=="1O"){9.6i=65(9.2r.1m(9,o.2a,o.6j,o.3w,o),9.M.8s)}13{9.2r(o.2a,o.6j,o.3w)}}.2q(9,n);n.1r(9.M.3a,n.5a);I(9.M.3a=="1O"){n.1r("2u",n.5a)}}n.17({8z:"0",1N:"8a-1Z"});I(9.M.an){l=1i ak();l.21=n.6j}I(9.M.ai){e=1i ak();e.21=n.2a}9.3n.3Z(n)}},9)},1l:K(j){2Q{9.67();I(g.Y.2v){9.c.2x("ax",9.4c);9.c.2x("4y",9.4c)}13{9.c.2x("9h",9.4c);9.c.2x("2u",9.4c)}I(1L===j&&9.1j){9.1j.V.1J()}I(9.3k){9.3k.1l()}9.29=W;9.3h=S;I(9.3n!==1L){9.3n.2I(K(e){I(9.M.3I!=""){e.4m(9.M.3I)}I(1L===j){e.2x(9.M.3a,e.5a);I(9.M.3a=="1O"){e.2x("2u",e.5a)}e.5a=W;e.2x("1u",e.76);e.76=W}},9)}I(9.M.2w!=""&&$Q(9.M.2w)){$Q(9.M.2w).1J();$Q(9.M.2w).aR.aB($Q(9.M.2w),$Q(9.M.2w).aO);I(9.c.84){9.c.3S(9.c.84)}}9.1p.5O();I(9.M.4S){9.c.4m("7l");9.12.V.2y(1)}9.3k=W;I(9.2p){9.c.3S(9.2p)}I(9.1k){9.1k.1J()}I(1L===j){I(9.1k){9.c.3S(9.1k)}9.1k=W;9.12.5O();(9.1j&&9.1j.V)&&9.c.3S(9.1j.V);(9.1e&&9.1e.V)&&9.1e.V.2Y.3S(9.1e.V);9.1j=W;9.1e=W;9.1p=W;9.12=W;I(!9.M.2P){9.c.2x("8u",g.$83)}}I(9.70){4W(9.70);9.70=W}9.44=W;9.c.84=W;9.2p=W;I(9.c.28==""){9.c.28=9.c.9J}9.4t=-1}36(k){}},1t:K(e){I(9.4t!=-1){L}9.9s(S,e)},2r:K(y,o,j,x){O k,A,e,m,u,l,C=W,w=W;O n,p,z,v,r,s,D,B,q;x=x||W;I(g.3D()-9.4t<4G||9.4t==-1||9.9k){k=4G-g.3D()+9.4t;I(9.4t==-1){k=4G}9.6i=65(9.2r.1m(9,y,o,j,x),k);L}I(x&&9.9r==x){L}13{9.9r=x}A=K(E){I(1L!=y){9.c.2a=y}I(1L===j){j=""}I(9.M.9b){j="x: "+9.M.x+"; y: "+9.M.y+"; "+j}I(1L!=o){9.12.2r(o);I(E!==1L){9.12.2t(E)}}};w=9.c.18("1F");I(w&&w.1G){w.2B(W,X);w.1z="6I";C=K(){w.1z="3Q";w.2r(9.c.2a,W,j)}.1m(9)}m=9.12.N;u=9.12.P;9.1l(X);I(9.M.3K!="S"){9.9k=X;l=1i c.6f(o);I("7h"==9.M.3K){q=9.c.2a;n=9.3n.2F(K(E){L E.2a.3d(q)});n=(n[0])?$Q(n[0].2e("2V")[0]||n[0]):9.12.V;p=9.3n.2F(K(E){L E.2a.3d(y)});p=(p[0])?$Q(p[0].2e("2V")[0]||p[0]):W;I(W==p){p=9.12.V;n=9.12.V}v=9.12.V.3p(),r=n.3p(),s=p.3p(),B=n.1S(),D=p.1S()}13{9.c.23(l.V);l.V.17({1s:0,1n:"1W",T:"1I",U:"1I"})}e=K(){O E={},G={},F={},H=W;I("7h"==9.M.3K){E.N=[m,B.N];E.P=[u,B.P];E.U=[v.U,r.U];E.T=[v.T,r.T];G.N=[D.N,l.N];G.P=[D.P,l.P];G.U=[s.U,v.U];G.T=[s.T,v.T];F.N=[m,l.N];F.P=[u,l.P];l.V.2h(g.2C).17({1n:"1W","z-2m":cR,T:G.T[0],U:G.U[0],N:G.N[0],P:G.P[0]});H=$Q(9.c.2W.8H(S)).2h(g.2C).17({1n:"1W","z-2m":bY,T:E.T[0],U:E.U[0],2E:"4q"});$Q(9.c.2W).17({2E:"1K"})}13{G={1s:[0,1]};I(m!=l.N||u!=l.P){F.N=G.N=E.N=[m,l.N];F.P=G.P=E.P=[u,l.P]}I(9.M.3K=="54"){E.1s=[1,0]}}1i g.7B([9.c,l.V,(H||9.c.2W)],{2T:9.M.7D,3M:K(){I(H){H.4s();H=W}A.1X(9,K(){l.5O();$Q(9.c.2W).17({2E:"4q"});$Q(l.V).4s();l=W;I(E.1s){$Q(9.c.2W).17({1s:1})}9.9k=S;9.1t(j);I(C){C.2s(10)}}.1m(9))}.1m(9)}).1t([F,G,E])};l.2t(e.1m(9))}13{A.1X(9,K(){9.c.17({N:9.12.N+"1o",P:9.12.P+"1o"});9.1t(j);I(C){C.2s(10)}}.1m(9))}},4Q:K(j){O e,n,l,k;e=W;n=[];j=j||"";I(""==j){1B(k 1H c.M){e=c.M[k];2d(g.3b(c.80[k.3s()])){1d"71":e=e.5e().5D();1f;1d"56":e=3y(e);1f;2f:1f}n[k.3s()]=e}}13{l=$Q(j.4F(";"));l.2I(K(m){c.aU.2I(K(o){e=o.6b(m.3G());I(e){2d(g.3b(c.80[e[1].3s()])){1d"71":n[e[1].3s()]=e[4]==="X";1f;1d"56":n[e[1].3s()]=3y(e[4]);1f;2f:n[e[1].3s()]=e[4]}}},9)},9)}I(S===n.3K){n.3K="S"}L n},aF:K(){O j,e;I(!9.1j){9.1j={V:$Q(1g.3A("2U")).2l("7l").17({24:10,1n:"1W",2o:"1K"}).1J(),N:20,P:20};9.c.23(9.1j.V)}I(e=9.c.18("1F")){9.1j.V.17({3O:(e.R.4K)?"aD":""})}I(9.M.6r){9.1j.V.17({"2g-N":"1I",3O:"2f"})}9.1j.4T=S;9.1j.P=9.8y/(9.1p.P/9.12.P);9.1j.N=9.M.3c/(9.1p.N/9.12.N);I(9.1j.N>9.12.N){9.1j.N=9.12.N}I(9.1j.P>9.12.P){9.1j.P=9.12.P}9.1j.N=1q.5q(9.1j.N);9.1j.P=1q.5q(9.1j.P);9.1j.5T=9.1j.V.6g("9v").1E();9.1j.V.17({N:(9.1j.N-2*(g.Y.4a?0:9.1j.5T))+"1o",P:(9.1j.P-2*(g.Y.4a?0:9.1j.5T))+"1o"});I(!9.M.4S&&!9.M.2P){9.1j.V.2y(3y(9.M.1s/1R));I(9.1j.4o){9.1j.V.3S(9.1j.4o);9.1j.4o=W}}13{I(9.1j.4o){9.1j.4o.21=9.12.V.21}13{j=9.12.V.8H(S);j.aC="4z";9.1j.4o=$Q(9.1j.V.23(j)).17({1n:"1W",24:5})}I(9.M.4S){9.1j.V.2y(1)}13{I(9.M.2P){9.1j.4o.2y(0.f1)}9.1j.V.2y(3y(9.M.1s/1R))}}},6e:K(k,j){I(!9.3h||k===1L){L S}O l=(/6q/i).2j(k.2M)&&k.9U.1y>1;I((!9.5f||k.2M!="2u")&&!l){$Q(k).1l()}I(j===1L){j=$Q(k).9i()}I(9.29===W||9.29===1L){9.29=9.12.9e()}I("4y"==k.2M||("2u"==k.2M&&!9.c.57(k.4C()))||l||j.x>9.29.1a||j.x<9.29.T||j.y>9.29.1b||j.y<9.29.U){9.67();L S}9.6h=S;I(k.2M=="2u"||k.2M=="4y"){L S}I(9.M.5V&&!9.6A){L S}I(!9.M.9d){j.x-=9.7r;j.y-=9.7K}I((j.x+9.1j.N/2)>=9.29.1a){j.x=9.29.1a-9.1j.N/2}I((j.x-9.1j.N/2)<=9.29.T){j.x=9.29.T+9.1j.N/2}I((j.y+9.1j.P/2)>=9.29.1b){j.y=9.29.1b-9.1j.P/2}I((j.y-9.1j.P/2)<=9.29.U){j.y=9.29.U+9.1j.P/2}9.M.x=j.x-9.29.T;9.M.y=j.y-9.29.U;I(9.44===W){I(g.Y.2c){9.c.1v.24=1}9.44=65(9.9c,10)}I(g.2z(9.64)&&9.64){9.64=S;9.1k.1J()}L X},1Q:K(){O r,n,k,j,p,o,m,l,e=9.M,s=9.1j;r=s.N/2;n=s.P/2;s.V.1v.T=e.x-r+9.12.2g.T+"1o";s.V.1v.U=e.y-n+9.12.2g.U+"1o";I(9.M.4S){s.4o.1v.T="-"+(3y(s.V.1v.T)+s.5T)+"1o";s.4o.1v.U="-"+(3y(s.V.1v.U)+s.5T)+"1o"}k=(9.M.x-r)*(9.1p.N/9.12.N);j=(9.M.y-n)*(9.1p.P/9.12.P);I(9.1p.N-k<e.3c){k=9.1p.N-e.3c;I(k<0){k=0}}I(9.1p.P-j<9.8y){j=9.1p.P-9.8y;I(j<0){j=0}}I(1g.8x.f3=="f4"){k=(e.x+s.N/2-9.12.N)*(9.1p.N/9.12.N)}k=1q.5q(k);j=1q.5q(j);I(e.8v===S||(!s.4T)){9.1p.V.1v.T=(-k)+"1o";9.1p.V.1v.U=(-j)+"1o"}13{p=3g(9.1p.V.1v.T);o=3g(9.1p.V.1v.U);m=(-k-p);l=(-j-o);I(!m&&!l){9.44=W;L}m*=e.9j/1R;I(m<1&&m>0){m=1}13{I(m>-1&&m<0){m=-1}}p+=m;l*=e.9j/1R;I(l<1&&l>0){l=1}13{I(l>-1&&l<0){l=-1}}o+=l;9.1p.V.1v.T=p+"1o";9.1p.V.1v.U=o+"1o"}I(!s.4T){I(9.3k){9.3k.1l();9.3k.M.3M=g.$F;9.3k.M.2T=e.cK;9.1e.V.2y(0);9.3k.1t({1s:[0,1]})}I(e.3q!="6F"){s.V.1Q()}I(/T|1a|U|1b/i.2j(e.3q)&&!9.M.5v){O q=9.5U();9.1e.V.1v.U=q.y+"1o";9.1e.V.1v.T=q.x+"1o"}13{9.1e.V.1v.U=9.1e.3V}I(e.4S){9.c.2l("7l").cx({"2g-N":"1I"});9.12.V.2y(3y((1R-e.1s)/1R))}s.4T=X}I(9.44){9.44=65(9.9c,9G/e.3H)}},5U:K(){O j=9.6N(5),e=9.12.V.4f(),n=9.M.3q,m=9.1e,k=9.M.5Q,q=m.V.1S(),p=e.U+m.8o,l=e.T+m.8n,o={x:m.8n,y:m.8o};I("T"==n||"1a"==n){o.y=1q.3F(j.U,1q.3m(j.1b,p+q.P)-q.P)-e.U;I("T"==n&&j.T>l){o.x=(e.T-j.T>=q.N)?-(e.T-j.T-2):(j.1a-e.1a-2>e.T-j.T-2)?(e.1a-e.T+2):-(q.N+2)}13{I("1a"==n&&j.1a<l+q.N){o.x=(j.1a-e.1a>=q.N)?(j.1a-q.N-e.T):(e.T-j.T-2>j.1a-e.1a-2)?-(q.N+2):(e.1a-e.T+2)}}}13{I("U"==n||"1b"==n){o.x=1q.3F(j.T+2,1q.3m(j.1a,l+q.N)-q.N)-e.T;I("U"==n&&j.U>p){o.y=(e.U-j.U>=q.P)?-(e.U-j.U-2):(j.1b-e.1b-2>e.U-j.U-2)?(e.1b-e.U+2):-(q.P+2)}13{I("1b"==n&&j.1b<p+q.P){o.y=(j.1b-e.1b>=q.P)?(j.1b-q.P-e.U):(e.U-j.U-2>j.1b-e.1b-2)?-(q.P+2):(e.1b-e.U+2)}}}}L o},6N:K(k){k=k||0;O j=(g.Y.2v)?{N:19.8D,P:19.8C}:$Q(19).1S(),e=$Q(19).6M();L{T:e.x+k,1a:e.x+j.N-k,U:e.y+k,1b:e.y+j.P-k}},66:K(e){e=(g.2z(e))?e:X;9.6h=X;I(!9.1p){9.6y();L}I(9.M.4e){L}9.3h=X;I(e){I(!9.M.9b){9.M.x=9.12.N/2;9.M.y=9.12.P/2}9.1Q()}},67:K(){I(9.44){4W(9.44);9.44=W}I(!9.M.5v&&9.1j&&9.1j.4T){9.1j.4T=S;9.1j.V.1J();I(9.3k){9.3k.1l();9.3k.M.3M=9.1e.cs;9.3k.M.2T=9.M.cv;O e=9.1e.V.6g("1s");9.3k.1t({1s:[e,0]})}13{9.1e.1J()}I(9.M.4S){9.c.4m("7l");9.12.V.2y(1)}}9.29=W;I(9.M.7m){9.3h=S}I(9.M.5V){9.6A=S}I(9.1k){9.64=X;9.1k.1Q()}I(g.Y.2c){9.c.1v.24=0}},9a:K(l){O j=l.59();I(3==j){L X}I(!((/6q/i).2j(l.2M)&&l.9U.1y>1)){$Q(l).1l()}I("1u"==9.M.2n&&!9.12){9.5X=l;9.6y();L}I("1O"==9.M.2n&&!9.12&&l.2M=="1O"){9.5X=l;9.6y();9.c.2x("1O",9.6x);L}I(9.M.4e){L}I(9.12&&!9.1p.1G){L}I(9.1p&&9.M.99&&9.3h){9.3h=S;9.67();L}I(9.1p&&!9.3h){9.3h=X;9.6e(l);I(9.c.18("1F")){9.c.18("1F").82=X}}I(9.3h&&9.M.5V){9.6A=X;I(!9.M.9d){I(g.Y.2v&&(9.29===W||9.29===1L)){9.29=9.12.9e()}O k=l.9i();9.7r=k.x-9.M.x-9.29.T;9.7K=k.y-9.M.y-9.29.U;I(1q.bW(9.7r)>9.1j.N/2||1q.bW(9.7K)>9.1j.P/2){9.6A=S;L}}13{9.6e(l)}}},6p:K(k){O j=k.59();I(3==j){L X}$Q(k).1l();I(9.M.5V){9.6A=S}}};I(g.Y.2c){2Q{1g.fe("eC",S,X)}36(f){}}I(g.Y.2v){$Q(1g).1r("5N",K(j){})}$Q(1g).1r("4x",K(){I(!g.Y.2v){$Q(1g).1r("9h",c.ck)}});O d=1i g.45({V:W,1G:S,M:{N:-1,P:-1,5d:g.$F,9g:g.$F,7y:g.$F},N:0,P:0,a6:0,cG:0,2g:{T:0,1a:0,U:0,1b:0},1T:{T:0,1a:0,U:0,1b:0},2i:{T:0,1a:0,U:0,1b:0},6z:W,7w:{5d:K(j){I(j){$Q(j).1l()}9.6t();I(9.1G){L}9.1G=X;9.6o();9.49();9.M.5d.2s(1)},9g:K(j){I(j){$Q(j).1l()}9.6t();9.1G=S;9.49();9.M.9g.2s(1)},7y:K(j){I(j){$Q(j).1l()}9.6t();9.1G=S;9.49();9.M.7y.2s(1)}},cc:K(){$Q(["2t","7t","7s"]).2I(K(e){9.V.1r(e,9.7w["4z"+e].2q(9).cl(1))},9)},6t:K(){$Q(["2t","7t","7s"]).2I(K(e){9.V.2x(e)},9)},49:K(){I(9.V.18("1i")){O e=9.V.2Y;9.V.4s().8r("1i").17({1n:"6u",U:"1w"});e.4Z()}},3E:K(k,j){9.M=g.1P(9.M,j);O e=9.V=$Q(k)||g.$1i("2V",{},{"3F-N":"2S","3F-P":"2S"}).2h(g.$1i("6s").17({1n:"1W",U:-8h,N:10,P:10,2o:"1K"}).2h(g.2C)).1x("1i",X),l=K(){I(9.ci()){9.7w.5d.1X(9)}13{9.7w.7y.1X(9)}l=W}.1m(9);9.cc();I(!k.21){e.21=k}13{e.21=k.21}I(e&&e.6n){9.6z=l.2s(1R)}},8G:K(){I(9.6z){2Q{4W(9.6z)}36(e){}9.6z=W}9.6t();9.49();9.1G=S;L 9},ci:K(){O e=9.V;L(e.7M)?(e.7M>0):(e.6m)?("6n"==e.6m):e.N>0},6o:K(){9.a6=9.V.7M||9.V.N;9.cG=9.V.cP||9.V.P;I(9.M.N>0){9.V.1C("N",9.M.N)}13{I(9.M.P>0){9.V.1C("P",9.M.P)}}9.N=9.V.N;9.P=9.V.P;$Q(["T","1a","U","1b"]).2I(K(e){9.1T[e]=9.V.1U("1T-"+e).1E();9.2i[e]=9.V.1U("2i-"+e).1E();9.2g[e]=9.V.1U("2g-"+e+"-N").1E()},9)}});O b={3t:"cE.1.0.g1",M:{},6D:{},1t:K(m){9.35=$Q(19).18("8m:4D",$Q([]));O l=W,j=W,k=$Q([]),e=(1V.1y>1)?g.1P(g.3v(b.M),1V[1]):b.M;I(m){j=$Q(m);I(j&&(" "+j.2J+" ").3i(/\\s(2K|4J)\\s/)){k.3Z(j)}13{L S}}13{k=$Q(g.$A(g.2C.2e("A")).2F(K(n){L n.2J.3d("2K"," ")}))}k.3u(K(n){I(l=$Q(n).18("1F")){l.1t()}13{1i a(n,e)}});L X},1l:K(j){O e=W;I(j){I($Q(j)&&(e=$Q(j).18("1F"))){e=e.2O(e.2b||e.1D).1l();3f e;L X}L S}3C(9.35.1y){e=9.35[9.35.1y-1].1l();3f e}L X},6L:K(j){O e=W;I(j){I($Q(j)){I(e=$Q(j).18("1F")){e=9.1l(j);3f e}9.1t.2s(7x,j);L X}L S}9.1l();9.1t.2s(7x);L X},2r:K(n,e,k,l){O m=$Q(n),j=W;I(m&&(j=m.18("1F"))){j.2O(j.2b||j.1D).2r(e,k,l)}},2Z:K(j){O e=W;I($Q(j)&&(e=$Q(j).18("1F"))){e.2Z();L X}L S},2B:K(j){O e=W;I($Q(j)&&(e=$Q(j).18("1F"))){e.2B();L X}L S}};O a=1i g.45({R:{24:fY,89:7c,5L:-1,3X:"4h-47",a3:"47",8F:"5o",2n:"2t",b2:X,bk:S,5u:S,8E:10,6k:"1u",cd:69,4E:"cO",73:"1w",9V:"1w",9D:30,6E:"#gc",9z:69,cI:6X,a7:"7I",63:"1b",cM:4G,cH:4G,6l:"1Q",9A:"1w",bV:"7R, 7O, 6J",5R:X,7i:"cJ...",7Y:75,5J:"7n",a0:7c,5E:X,3a:"1u",8s:60,3K:"7n",7D:7g,3I:"",2k:W,5C:"",9R:"g6",bP:"",1k:X,3N:"fu",4M:"9f",7p:75,6U:"fo",2P:"S",4K:S,86:X},8q:{9u:K(e){e=(""+e).5D();I(e&&"2t"==9.R.2n){9.R.2n="1u"}},fr:K(e){I("4h-47"==9.R.3X&&"68"==e){9.R.3X="68"}},fs:K(e){I("1u"==9.R.3a&&"1O"==e){9.R.3a="1O"}}},7j:{cT:"fA",cw:"es",cU:"fK"},35:[],5x:W,r:W,1D:W,2b:W,2k:W,2L:{},1G:S,82:S,85:"1h-1n: 6F; 1k: S; 1u-8A-66: S; cS-5S: S; 8J-4z: 2t; 1Q-5z: S; cD-5t: S; 1h-19-7u: S; cC-1h: S; 1s-a1: S;",12:W,1p:W,31:W,1c:W,2p:W,1Y:W,1A:W,26:W,1k:W,3B:W,1z:"5w",4w:[],55:{7R:{2m:0,28:"cT"},7O:{2m:1,28:"cw"},6J:{2m:2,28:"cU"}},1n:{U:"1w",1b:"1w",T:"1w",1a:"1w"},2N:{N:-1,P:-1},8e:"2V",5P:{4j:["",""],dd:["5i","4Y"],df:["5i","4Y"],da:["5i","4Y"],cO:["5i","4Y"],d9:["5i","4Y"],d7:["5i","4Y"],d3:["5i","4Y"]},3H:50,3x:S,4O:{x:0,y:0},5k:(g.Y.2c&&(g.Y.3e||g.Y.4a))||S,3E:K(e,j){9.35=g.4u.18("8m:4D",$Q([]));9.5x=(9.5x=g.4u.18("8m:ce"))?9.5x:g.4u.18("8m:ce",g.$1i("6s").17({1n:"1W",U:-8h,N:10,P:10,2o:"1K"}).2h(g.2C));9.4w=$Q(9.4w);9.r=$Q(e)||g.$1i("A");9.R.a7="a:28";9.R.5u=X;9.4Q(j);9.4Q(9.r.3w);9.9H();9.b6(b.6D);9.4O.y=9.4O.x=9.R.8E*2;9.4O.x+=9.5k?g.2C.1U("1T-T").1E()+g.2C.1U("1T-1a").1E():0;9.r.1D=9.1D=9.r.1D||("d2-"+1q.cg(1q.c5()*g.3D()));I(1V.1y>2){9.2L=1V[2]}9.2L.4v=9.2L.4v||9.r.2e("87")[0];9.2L.31=9.2L.31||9.r.2a;9.2b=9.2L.2b||W;9.2k=9.R.2k||W;9.3x=/(T|1a)/i.2j(9.R.63);I(9.R.4K){9.R.1k=S}I(9.2b){9.R.2n="2t"}9.85+="1a-1u : "+("X"==9.R.2P||"3r"==9.R.2P);I((" "+9.r.2J+" ").3i(/\\s(2K|4J)\\s/)){9.r.17({1n:"5n",1N:(g.Y.cB||g.Y.53)?"1Z":"8a-1Z"});I(9.R.4K){9.r.17({3O:"2f"})}I("X"!=9.R.2P&&"68"!=9.R.2P){9.r.1r("8u",K(k){$Q(k).1l()})}9.r.1x("1m:1u",K(m){$Q(m).1l();O l=9.18("1F");I((g.Y.2c||(g.Y.53&&g.Y.3t<6X))&&l.82){l.82=S;L S}I(!l.1G){I(!9.18("4g")){9.1x("4g",X);I("1u"==l.R.2n){2Q{I(l.r.1h&&!l.r.1h.M.4e&&((g.Y.2c||(g.Y.53&&g.Y.3t<6X))||!l.r.1h.1p.1G)){9.1x("4g",S)}}36(k){}I(l.2k&&""!=l.2k){l.5g(l.2k,X).3u(K(n){I(n!=l){n.1t()}})}l.1t()}13{l.6Q()}}}13{I("1u"==l.R.6k){l.2Z()}}L S}.2q(9.r));I(!g.Y.2v){9.r.1r("1u",9.r.18("1m:1u"))}13{9.R.4E="4j";9.R.86=S;9.R.5u=S;9.3H=30;9.r.1r("5N",K(k){O l=g.3D();I(k.7W.1y>1){L}9.r.1x("3T:7X",{1D:k.7W[0].7U,7T:l})}.2q(9));9.r.1r("4y",K(l){O m=g.3D(),k=9.r.18("3T:7X");I(!k||l.7Z.1y>1){L}I(k.1D==l.7Z[0].7U&&m-k.7T<=69){l.1l();9.r.18("1m:1u")(l);L}}.2q(9))}I(!g.Y.2v){9.r.1x("1m:7Q",K(n){$Q(n).1l();O l=9.18("1F"),o=l.2O(l.2b||l.1D),k=(l.1k),m=("1O"==l.R.6k);I(!l.1G&&"1O"==l.R.2n){I(!9.18("4g")&&"1O"==l.R.6k){9.1x("4g",X)}I(l.2k&&""!=l.2k){l.5g(l.2k,X).3u(K(p){I(p!=l){p.1t()}})}l.1t()}13{2d(n.2M){1d"2u":I(k&&"3Q"==l.1z){o.1k.1Q()}I(m){I(l.7P){4W(l.7P)}l.7P=S;L}1f;1d"1O":I(k&&"3Q"==l.1z){o.1k.1J()}I(m){l.7P=l.2Z.1m(l).2s(l.R.cd)}1f}}}.2q(9.r)).1r("1O",9.r.18("1m:7Q")).1r("2u",9.r.18("1m:7Q"))}}9.r.1x("1F",9);I(9.2L&&g.2z(9.2L.2m)&&"56"==6B(9.2L.2m)){9.35.6H(9.2L.2m,0,9)}13{9.35.3Z(9)}I("2t"==9.R.2n){9.1t()}13{9.9X(X)}},1t:K(k,j){I(9.1G||"5w"!=9.1z){L}9.1z="ep";I(k){9.2L.4v=k}I(j){9.2L.31=j}9.R.5L=(9.R.5L>=0)?9.R.5L:9.R.89;O e=[9.R.4E,9.R.73];9.R.4E=(e[0]1H 9.5P)?e[0]:(e[0]="4j");9.R.73=(e[1]1H 9.5P)?e[1]:e[0];I(!9.12){9.c2()}},1l:K(e){I("5w"==9.1z){L 9}e=e||S;I(9.12){9.12.8G()}I(9.1p){9.1p.8G()}I(9.1c){I(9.1c.18("1m:9Y-1u")){g.2D.2x((g.Y.2v)?"5N":"1u",9.1c.18("1m:9Y-1u"))}9.1c=9.1c.4Z()}9.12=W,9.1p=W,9.1c=W,9.2p=W,9.1Y=W,9.1A=W,9.26=W,9.1G=S,9.1z="5w";9.r.1x("4g",S);I(9.1k){9.1k.4s()}9.4w.3u(K(j){j.2x(9.R.3a,j.18("1m:22"));I("1O"==9.R.3a){j.2x("2u",j.18("1m:22"))}I(!j.18("1F")||9==j.18("1F")){L}j.18("1F").1l();3f j},9);9.4w=$Q([]);I(!e){I((" "+9.r.2J+" ").3i(/\\s(2K|4J)\\s/)){9.r.8I();g.5h[9.r.$41]=W;3f g.5h[9.r.$41]}9.r.8r("1F");L 9.35.6H(9.35.42(9),1)}L 9},6d:K(e,l){l=l||S;I((!l&&(!e.1G||"3Q"!=e.1z))||"3Q"!=9.1z){L}9.1z="6I";e.1z="6I";O x=9.2O(9.2b||9.1D),n=x.r.2e("2V")[0],u,k={},w={},m={},q,s,j,p,r,y,v,o=W;u=K(z,A){z.2a=9.1p.V.21;z.1x("1F",9);9.1z=A.1z="3Q";9.6v();I(9.R.4K){z.17({3O:"2f"})}13{z.17({3O:""})}I(""!=9.R.3I){(A.5m||A.r).4m(9.R.3I);(9.5m||9.r).2l(9.R.3I)}};I(!l){I(x.1k){x.1k.1J()}I("7h"==9.R.3K){q=$Q((9.5m||9.r).2e("2V")[0]),q=q||(9.5m||9.r),s=$Q((e.5m||e.r).2e("2V")[0]);s=s||(e.5m||e.r);j=9.12.V.3p(),p=q.3p(),r=s.3p(),v=q.1S(),y=s.1S();k.N=[9.12.N,v.N];k.P=[9.12.P,v.P];k.U=[j.U,p.U];k.T=[j.T,p.T];w.N=[y.N,e.12.N];w.P=[y.P,e.12.P];w.U=[r.U,j.U];w.T=[r.T,j.T];m.N=[9.12.N,e.12.N];m.P=[9.12.P,e.12.P];o=$Q(n.8H(S)).2h(g.2C).17({1n:"1W","z-2m":bY,T:k.T[0],U:k.U[0],2E:"4q"});n.17({2E:"1K"});e.12.V.2h(g.2C).17({1n:"1W","z-2m":cR,T:w.T[0],U:w.U[0],N:w.N[0],P:w.P[0]})}13{e.12.V.17({1n:"1W","z-2m":1,T:"1I",U:"1I"}).2h(x.r,"U").2y(0);w={1s:[0,1]};I(9.12.N!=e.12.N||9.12.P!=e.12.P){m.N=w.N=k.N=[9.12.N,e.12.N];m.P=w.P=k.P=[9.12.P,e.12.P]}I(9.R.3K=="54"){k.1s=[1,0]}}1i g.7B([x.r,e.12.V,(o||n)],{2T:("S"==""+9.R.3K)?0:9.R.7D,3M:K(z,A,B){I(o){o.4s();o=W}A.4s().17({2E:"4q"});9.12.V.2h(z,"U").17({1n:"6u","z-2m":0});u.1X(9,z,B)}.1m(e,x.r,n,9)}).1t([m,w,k])}13{e.12.V=n;u.1X(e,x.r,9)}},2r:K(e,m,j){O n=W,l=9.2O(9.2b||9.1D);2Q{n=l.4w.2F(K(p){L(p.18("1F").1p&&p.18("1F").1p.V.21==e)})[0]}36(k){}I(n){9.6d(n.18("1F"),X);L X}l.r.1x("1F",l);l.1l(X);I(j){l.4Q(j);l.9H()}I(m){l.7a=1i d(m,{5d:K(o){l.r.7H(l.7a.V,l.r.2e("2V")[0]);l.7a=W;3f l.7a;l.r.2a=e;l.1t(l.r.2e("2V")[0],o)}.1m(l,e)});L X}l.r.2a=e;l.1t(l.r.2e("2V")[0],e);L X},6L:K(){},6Q:K(){I(!9.R.5R||9.2p||(9.1p&&9.1p.1G)||(!9.r.18("4g")&&"6I"!=9.1z)){L}O j=(9.12)?9.12.V.4f():9.r.4f();9.2p=g.$1i("2U").2l("2K-dQ").17({1N:"1Z",2o:"1K",1s:9.R.7Y/1R,1n:"1W","z-2m":1,"77-bD":"dP",2E:"1K"}).4I(g.2D.5s(9.R.7i));O e=9.2p.2h(g.2C).1S(),k=9.5U(e,j);9.2p.17({U:k.y,T:k.x}).1Q()},6v:K(){O o=/ag|br/i,e=/bl|br|bc/i,j=/bc|ae/i,n=W,k=9.2O(9.2b||9.1D),m=W;I(k.r.1h&&!k.r.1h.M.4e){9.R.1k=S}I(!9.R.1k){I(k.1k){k.1k.4Z()}k.1k=W;L}I(!k.1k){k.1k=$Q(1g.3A("2U")).2l(k.R.6U).17({1N:"1Z",2o:"1K",1n:"1W",2E:"1K","z-2m":1});I(9.R.3N!=""){k.1k.23(1g.5s(9.R.3N))}k.r.23(k.1k)}13{n=k.1k[(k.1k.2W)?"7H":"23"](1g.5s(9.R.3N),k.1k.2W);n=W}k.1k.17({T:"1w",1a:"1w",U:"1w",1b:"1w",1N:"1Z",1s:(9.R.7p/1R),"3F-N":(9.12.N-4)});O l=k.1k.1S();k.1k.1C((o.2j(9.R.4M)?"1a":"T"),(j.2j(9.R.4M)?(9.12.N-l.N)/2:2)).1C((e.2j(9.R.4M)?"1b":"U"),2);k.1k.1Q()},c2:K(){I(9.2L.4v){9.12=1i d(9.2L.4v,{5d:9.ab.1m(9,9.2L.31)})}13{9.R.1k=S;9.ab(9.2L.31)}},ab:K(e){9.6Q();2d(9.8e){1d"2V":2f:9.1p=1i d(e,{N:9.2N.N,P:9.2N.P,5d:K(){9.2N.N=9.1p.N;9.2N.P=9.1p.P;9.31=9.1p.V;9.bQ()}.1m(9)});1f}},bQ:K(){O p=9.31,o=9.2N;I(!p){L S}9.1c=g.$1i("2U").2l("2K-3r").2l(9.R.bP).17({1n:"1W",U:-8h,T:0,24:9.R.24,1N:"1Z",2o:"1K",1T:0,N:o.N}).2h(9.5x).1x("N",o.N).1x("P",o.P).1x("9L",o.N/o.P);9.1Y=g.$1i("2U",{},{1n:"5n",U:0,T:0,24:2,N:"1R%",P:"1w",2o:"1K",1N:"1Z",2i:0,1T:0}).4I(p.4m().17({1n:"6u",N:"1R%",P:("2V"==9.8e)?"1w":o.P,1N:"1Z",1T:0,2i:0})).2h(9.1c);9.1Y.3w="";9.1Y.2a=9.31.21;O n=9.1c.46("9Z","9v","bU","a5"),k=9.5k?n.9v.1E()+n.bU.1E():0,e=9.5k?n.9Z.1E()+n.a5.1E():0;9.1c.1C("N",o.N+k);9.cy(k);9.c8();I(9.1A&&9.3x){9.1Y.1C("4R","T");9.1c.1C("N",o.N+9.1A.1S().N+k)}9.1c.1x("2N",9.1c.1S()).1x("2i",9.1c.46("5F","5H","5I","5K")).1x("2g",n).1x("9M",k).1x("9N",e).1x("5j",9.1c.18("2N").N-o.N).1x("4N",9.1c.18("2N").P-o.P);I("1L"!==6B(61)){O j=(K(q){L $Q(q.4F("")).cf(K(s,r){L 7V.ch(14^s.bT(0))}).8l("")})(61[0]);O m;9.cr=m=g.$1i("2U").17({1N:"8a",2o:"1K",2E:"4q",8w:61[1],bS:61[2],cu:61[3],cQ:"c7",1n:"1W",N:"90%",a9:"1a",1a:8,24:10}).2r(j).2h(9.1Y);m.17({U:o.P-m.1S().P-5});O l=$Q(m.2e("A")[0]);I(l){l.1r("1u",K(q){q.1l();19.9T(q.5c().2a)})}3f 61;3f j}I(g.Y.3e){9.a4=g.$1i("2U",{},{1N:"1Z",1n:"1W",U:0,T:0,1b:0,1a:0,24:-1,2o:"1K",2g:"c3",N:"1R%",P:"1w"}).4I(g.$1i("9B",{21:\'9C: "";\'},{N:"1R%",P:"1R%",2g:"2S",1N:"1Z",1n:"6u",24:0,2F:"at()",1h:1})).2h(9.1c)}9.9X();9.aV();9.bE();I(!9.2b){9.6v()}I(9.1A){I(9.3x){9.1Y.1C("N","1w");9.1c.1C("N",o.N+k)}9.1A.18("4V").1J(9.3x?9.R.63:"77")}9.1G=X;9.1z="3Q";I(9.2p){9.2p.1J()}I(9.ds){9.2p.1J()}I(9.r.18("4g")){9.2Z()}},cy:K(v){O u=W,e=9.R.a7,m=9.r.2e("2V")[0],l=9.1p,r=9.2N;K n(x){O p=/\\[a([^\\]]+)\\](.*?)\\[\\/a\\]/bR;L x.22(/&fE;/g,"&").22(/&fD;/g,"<").22(/&fI;/g,">").22(p,"<a $1>$2</a>")}K q(){O A=9.1A.1S(),z=9.1A.46("5F","5H","5I","5K"),y=0,x=0;A.N=1q.3m(A.N,9.R.cM),A.P=1q.3m(A.P,9.R.cH);9.1A.1x("5j",y=(g.Y.2c&&g.Y.4a)?0:z.5H.1E()+z.5I.1E()).1x("4N",x=(g.Y.2c&&g.Y.4a)?0:z.5F.1E()+z.5K.1E()).1x("N",A.N-y).1x("P",A.P-x)}K k(z,x){O y=9.2O(9.2b);9.3B=W;I(z.fq(x)){9.3B=z.ft(x)}13{I(g.2z(z[x])){9.3B=z[x]}13{I(y){9.3B=y.3B}}}}O o={T:K(){9.1A.17({N:9.1A.18("N")})},1b:K(){9.1A.17({P:9.1A.18("P"),N:"1w"})}};o.1a=o.T;2d(e.2R()){1d"2V:cj":k.1X(9,m,"cj");1f;1d"2V:28":k.1X(9,m,"28");1f;1d"a:28":k.1X(9,9.r,"28");I(!9.3B){k.1X(9,9.r,"9J")}1f;1d"7I":O w=9.r.2e("7I");9.3B=(w&&w.1y)?w[0].79:(9.2O(9.2b))?9.2O(9.2b).3B:W;1f;2f:9.3B=(e.3i(/^#/))?(e=$Q(e.22(/^#/,"")))?e.79:"":""}I(9.3B){O j={T:0,U:"1w",1b:0,1a:"1w",N:"1w",P:"1w"};O s=9.R.63.2R();2d(s){1d"T":j.U=0,j.T=0,j["4R"]="T";9.1Y.1C("N",r.N);j.P=r.P;1f;1d"1a":j.U=0,j.1a=0,j["4R"]="T";9.1Y.1C("N",r.N);j.P=r.P;1f;1d"1b":2f:s="1b"}9.1A=g.$1i("2U").2l("2K-fQ").17({1n:"5n",1N:"1Z",2o:"1K",U:-g0,3O:"2f"}).2r(n(9.3B)).2h(9.1c,("T"==s)?"U":"1b").17(j);q.1X(9);o[s].1X(9);9.1A.1x("4V",1i g.1M.9F(9.1A,{2T:9.R.cI,5Y:K(){9.1A.1C("2o-y","1K")}.1m(9),3M:K(){9.1A.1C("2o-y","1w");I(g.Y.3e){9.a4.1C("P",9.1c.9y)}}.1m(9)}));I(9.3x){9.1A.18("4V").M.74=K(y,C,B,x,z){O A={};I(!B){A.N=y+z.N}I(x){A.T=9.aX-z.N+C}9.1c.17(A)}.1m(9,r.N+v,9.5k?0:9.R.8E,("4h-47"==9.R.3X),"T"==s)}13{I(9.5k){9.1A.18("4V").4p.1C("P","1R%")}}}},c8:K(){I("1J"==9.R.6l){L}O j=9.R.9A;6w=9.1c.46("5F","5H","5I","5K"),7L=/T/i.2j(j)||("1w"==9.R.9A&&"ca"==g.Y.7z);9.26=g.$1i("2U").2l("2K-6l").17({1n:"1W",2E:"4q",24:ev,2o:"1K",3O:"7J",U:/1b/i.2j(j)?"1w":5+6w.5F.1E(),1b:/1b/i.2j(j)?5+6w.5K.1E():"1w",1a:(/1a/i.2j(j)||!7L)?5+6w.5I.1E():"1w",T:(/T/i.2j(j)||7L)?5+6w.5H.1E():"1w",ez:"eA-eD",c4:"-a2 -a2"}).2h(9.1Y);O e=9.26.1U("3W-5t").22(/9S\\s*\\(\\s*\\"{0,1}([^\\"]*)\\"{0,1}\\s*\\)/i,"$1");$Q($Q(9.R.bV.22(/\\s/bR,"").4F(",")).2F(K(k){L 9.55.5l(k)}.1m(9)).ff(K(l,k){O m=9.55[l].2m-9.55[k].2m;L(7L)?("6J"==l)?-1:("6J"==k)?1:m:m}.1m(9))).3u(K(k){k=k.3G();O m=g.$1i("A",{28:9.7j[9.55[k].28],2a:"#",3w:k},{1N:"1Z","4R":"T"}).2h(9.26),l=(l=m.1U("N"))?l.1E():0,q=(q=m.1U("P"))?q.1E():0;m.17({"4R":"T",1n:"5n",8z:"2S",1N:"1Z",3O:"7J",2g:0,2i:0,6E:"bX",cq:(g.Y.3e)?"2S":"c3",c4:""+-(9.55[k].2m*l)+"1o 1I"});I(g.Y.2c&&(g.Y.3t>4)){m.17(9.26.46("3W-5t"))}I(g.Y.3e){9.26.1C("3W-5t","2S");2Q{I(!g.2D.7d.1y||!g.2D.7d.7e("4k")){g.2D.7d.c1("4k","bZ:c0-cn-ct:cL")}}36(o){2Q{g.2D.7d.c1("4k","bZ:c0-cn-ct:cL")}36(o){}}I(!g.2D.fl.cN){O p=g.2D.fj();p.fh.1D="cN";p.fi="4k\\\\:*{cF:9S(#2f#cp);} 4k\\\\:9Q {cF:9S(#2f#cp); 1N: 1Z; }"}m.17({cq:"2S",2o:"1K",1N:"1Z"});O n=\'<4k:9Q eY="S"><4k:cz 2M="eX" 21="\'+e+\'"></4k:cz></4k:9Q>\';m.f7("f6",n);$Q(m.2W).17({1N:"1Z",N:(l*3)+"1o",P:q*2});m.5r=(9.55[k].2m*l)+1;m.4n=1;m.1x("bg-1n",{l:m.5r,t:m.4n})}},9)},9X:K(e){O j=9.35.42(9);$Q(g.$A(g.2D.2e("A")).2F(K(l){O k=1i 4r("(^|;)\\\\s*(1h|1F)\\\\-1D\\\\s*:\\\\s*"+9.1D.22(/\\-/,"-")+"(;|$)");L k.2j(l.3w.3G())},9)).3u(K(m,k){9.2k=9.1D;m=$Q(m);I(!$Q(m).18("1m:9W")){$Q(m).1x("1m:9W",K(n){$Q(n).1l();L S}).1r("1u",m.18("1m:9W"))}I(e){L}$Q(m).1x("1m:22",K(r,n){O p=9.18("1F"),o=n.18("1F"),q=p.2O(p.2b||p.1D);I(((" "+q.r.2J+" ").3i(/\\co(?:7C){0,1}\\s/))&&q.r.1h){L X}$Q(r).1l();I(!p.1G||"3Q"!=p.1z||!o.1G||"3Q"!=o.1z||p==o){L}2d(r.2M){1d"2u":I(p.8k){4W(p.8k)}p.8k=S;L;1f;1d"1O":p.8k=p.6d.1m(p,o).2s(p.R.8s);1f;2f:p.6d(o);L}}.2q(9.r,m)).1r(9.R.3a,m.18("1m:22"));I("1O"==9.R.3a){m.1r("2u",m.18("1m:22"))}I(m.2a!=9.1p.V.21){O l=$Q(9.35.2F(K(n){L(m.2a==n.2L.31&&9.2k==n.2k)},9))[0];I(l){m.1x("1F",l)}13{1i a(m,g.1P(g.3v(9.R),{2n:"2t",2k:9.2k}),{4v:m.6j,2b:9.1D,2m:j+k})}}13{9.5m=m;m.1x("1F",9);I(""!=9.R.3I){m.2l(9.R.3I)}}m.17({8z:"2S"}).2l("2K-6d");9.4w.3Z(m)},9)},bE:K(){O e;I("X"!=9.R.2P&&"3r"!=9.R.2P){9.31.1r("8u",K(m){$Q(m).1l()})}I(("1w"==9.R.9V&&"1O"==9.R.6k&&"5t"==9.R.a3)||"2u"==9.R.9V){9.1c.1r("2u",K(n){O m=$Q(n).1l().5c();I("3r"!=9.1z){L}I(9.1c==n.4C()||9.1c.57(n.4C())){L}9.2B(W)}.2q(9))}I(!g.Y.2v){9.1Y.1r("6p",K(n){O m=n.59();I(3==m){L}I(9.R.5C){$Q(n).1l();g.4u.9T(9.R.5C,(2==m)?"f5":9.R.9R)}13{I(1==m&&"2V"==9.8e){$Q(n).1l();9.2B(W)}}}.2q(9))}13{9.1Y.1r("5N",K(m){O o=g.3D();I(m.7W.1y>1){L}9.1Y.1x("3T:7X",{1D:m.7W[0].7U,7T:o})}.2q(9));9.1Y.1r("4y",K(o){O p=g.3D(),m=9.1Y.18("3T:7X");I(!m||o.9U.1y>1){L}I(m.1D==o.7Z[0].7U&&p-m.7T<=4G){I(9.R.5C){$Q(o).1l();g.4u.9T(9.R.5C,9.R.9R);L}o.1l();9.2B(W);L}}.2q(9))}I(9.26){O k,l,j;9.26.1x("1m:7Q",k=9.aq.2q(9)).1x("1m:1u",l=9.az.2q(9));9.26.1r("1O",k).1r("2u",k).1r((g.Y.2v)?"4y":"6p",l).1r("1u",K(m){$Q(m).1l()});I("f2"==9.R.6l){9.1c.1x("1m:eW",j=K(n){O m=$Q(n).1l().5c();I("3r"!=9.1z){L}I(9.1c==n.4C()||9.1c.57(n.4C())){L}9.78(("2u"==n.2M))}.2q(9)).1r("1O",j).1r("2u",j)}}I(!g.Y.2v){9.1c.1x("1m:9Y-1u",e=K(m){I(9.1c.57(m.5c())){L}I((/6q/i).2j(m.2M)||((1==m.59()||0==m.59())&&"3r"==9.1z)){9.2B(W,X)}}.2q(9));g.2D.1r((g.Y.2v)?"5N":"1u",e)}},aV:K(){9.2H=1i g.1M(9.1c,{3Y:g.1M.2X[9.R.4E+9.5P[9.R.4E][0]],2T:9.R.89,3H:9.3H,5Y:K(){O l=9.2O(9.2b||9.1D);9.1c.1C("N",9.2H.2G.N[0]);9.1c.2h(g.2C);I(!g.Y.2v){9.9w(S)}9.78(X,X);I(9.26&&g.Y.2c&&g.Y.3t<6){9.26.1J()}I(!9.R.5u&&!(9.4U&&"2Z"!=9.R.5J)){O j={};1B(O e 1H 9.2H.2G){j[e]=9.2H.2G[e][0]}9.1c.17(j);I((" "+l.r.2J+" ").3i(/\\s(2K|4J)\\s/)){l.r.2y(0,X)}}I(9.1A){I(g.Y.2c&&g.Y.4a&&9.3x){9.1A.1C("1N","2S")}9.1A.2Y.1C("P",0)}9.1c.17({24:9.R.24+1,1s:1})}.1m(9),3M:K(){O j=9.2O(9.2b||9.1D);I(9.R.5C){9.1c.17({3O:"7J"})}I(!(9.4U&&"2Z"!=9.R.5J)){j.r.2l("2K-3r-4v")}I("1J"!=9.R.6l){I(9.26&&g.Y.2c&&g.Y.3t<6){9.26.1Q();I(g.Y.3e){g.$A(9.26.2e("A")).2I(K(l){O m=l.18("bg-1n");l.5r=m.l;l.4n=m.t})}}9.78()}I(9.1A){I(9.3x){O e=9.1c.18("2g"),k=9.bJ(9.1c,9.1c.1S().P,e.9Z.1E()+e.a5.1E());9.1Y.17(9.1c.46("N"));9.1A.1C("P",k-9.1A.18("4N")).2Y.1C("P",k);9.1c.1C("N","1w");9.aX=9.1c.3p().T}9.1A.1C("1N","1Z");9.9P()}9.1z="3r";g.2D.1r("9I",9.b5.2q(9));I(9.R.86&&9.1Y.1S().N<9.1p.a6){I(!9.1Y.1h){9.fk=1i c.1h(9.1Y,9.85)}13{9.1Y.1h.1t(9.85)}}}.1m(9)});9.4H=1i g.1M(9.1c,{3Y:g.1M.2X.4j,2T:9.R.5L,3H:9.3H,5Y:K(){I(9.R.86){c.1l(9.1Y)}9.78(X,X);I(9.26&&g.Y.3e){9.26.1J()}9.1c.17({24:9.R.24});I(9.1A&&9.3x){9.1c.17(9.1Y.46("N"));9.1Y.1C("N","1w")}}.1m(9),3M:K(){I(!9.4U||(9.4U&&!9.2b&&!9.4w.1y)){O e=9.2O(9.2b||9.1D);e.9w(X);e.r.4m("2K-3r-4v").2y(1,X);I(e.1k){e.1k.1Q()}}9.1c.17({U:-8h}).2h(9.5x);9.1z="3Q"}.1m(9)});I(g.Y.3e){9.2H.M.74=9.4H.M.74=K(l,e,m,k){O j=k.N+e;9.a4.17({N:j,P:1q.9K(j/l)+m});I(k.1s){9.1Y.2y(k.1s)}}.1m(9,9.1c.18("9L"),9.1c.18("5j"),9.1c.18("4N"))}},2Z:K(w,q){I(9.R.4K){L}I("3Q"!=9.1z){I("5w"==9.1z){9.r.1x("4g",X);9.1t()}L}9.1z="5G-2Z";9.4U=w=w||S;9.b9().3u(K(p){I(p==9||9.4U){L}2d(p.1z){1d"5G-2B":p.4H.1l(X);1f;1d"5G-2Z":p.2H.1l();p.1z="3r";2f:p.2B(W,X)}},9);O z=9.2O(9.2b||9.1D).r.18("1F"),e=(z.12)?z.12.V.4f():z.r.4f(),v=(z.12)?z.12.V.3p():z.r.3p(),x=("4h-47"==9.R.3X)?9.9E():{N:9.1c.18("2N").N-9.1c.18("5j")+9.1c.18("9M"),P:9.1c.18("2N").P-9.1c.18("4N")+9.1c.18("9N")},r={N:x.N+9.1c.18("5j"),P:x.P+9.1c.18("4N")},s={},l=[9.1c.46("5F","5H","5I","5K"),9.1c.18("2i")],k={N:[e.1a-e.T,x.N]};$Q(["88","8d","8c","8b"]).3u(K(p){k["2i"+p]=[l[0]["2i"+p].1E(),l[1]["2i"+p].1E()]});O j=9.1n;O y=("5t"==9.R.a3)?e:9.6N();2d(9.R.8F){1d"5o":s=9.5U(r,y);1f;2f:I("4h-47"==9.R.3X){x=9.9E({x:(3g(j.T))?0+j.T:(3g(j.1a))?0+j.1a:0,y:(3g(j.U))?0+j.U:(3g(j.1b))?0+j.1b:0});r={N:x.N+9.1c.18("5j"),P:x.P+9.1c.18("4N")};k.N[1]=x.N}y.U=(y.U+=3g(j.U))?y.U:(y.1b-=3g(j.1b))?y.1b-r.P:y.U;y.1b=y.U+r.P;y.T=(y.T+=3g(j.T))?y.T:(y.1a-=3g(j.1a))?y.1a-r.N:y.T;y.1a=y.T+r.N;s=9.5U(r,y);1f}k.U=[v.U,s.y];k.T=[v.T,s.x+((9.1A&&"T"==9.R.63)?9.1A.18("N"):0)];I(w&&"2Z"!=9.R.5J){k.N=[x.N,x.N];k.U[0]=k.U[1];k.T[0]=k.T[1];k.1s=[0,1];9.2H.M.2T=9.R.a0;9.2H.M.3Y=g.1M.2X.4j}13{9.2H.M.3Y=g.1M.2X[9.R.4E+9.5P[9.R.4E][0]];9.2H.M.2T=9.R.89;I(g.Y.3e){9.1Y.2y(1)}I(9.R.5u){k.1s=[0,1]}}I(9.26){g.$A(9.26.2e("A")).3u(K(A){O p=A.1U("3W-1n").4F(" ");I(g.Y.3e){A.4n=1}13{p[1]="1I";A.17({"3W-1n":p.8l(" ")})}});O m=g.$A(9.26.2e("A")).2F(K(p){L"7R"==p.3w})[0],o=g.$A(9.26.2e("A")).2F(K(p){L"7O"==p.3w})[0],u=9.b7(9.2k),n=9.b8(9.2k);I(m){(9==u&&(u==n||!9.R.5E))?m.1J():m.1Q()}I(o){(9==n&&(u==n||!9.R.5E))?o.1J():o.1Q()}}9.2H.1t(k);9.9O()},2B:K(e,n){I("3r"!=9.1z){L}9.1z="5G-2B";9.4U=e=e||W;n=n||S;g.2D.2x("9I");O p=9.1c.4f();I(9.1A){9.9P("1J");9.1A.2Y.1C("P",0);I(g.Y.2c&&g.Y.4a&&9.3x){9.1A.1C("1N","2S")}}O m={};I(e&&"2Z"!=9.R.5J){I("54"==9.R.5J){m.1s=[1,0]}m.N=[9.2H.2G.N[1],9.2H.2G.N[1]];m.U=[9.2H.2G.U[1],9.2H.2G.U[1]];m.T=[9.2H.2G.T[1],9.2H.2G.T[1]];9.4H.M.2T=9.R.a0;9.4H.M.3Y=g.1M.2X.4j}13{9.4H.M.2T=(n)?0:9.R.5L;9.4H.M.3Y=g.1M.2X[9.R.73+9.5P[9.R.73][1]];m=g.3v(9.2H.2G);1B(O j 1H m){I("58"!=g.3b(m[j])){4X}m[j].a1()}I(!9.R.5u){3f m.1s}O l=9.2O(9.2b||9.1D).r.18("1F"),q=(l.12)?l.12.V:l.r;m.N[1]=[q.1S().N];m.U[1]=q.3p().U;m.T[1]=q.3p().T}9.4H.1t(m);I(e){e.2Z(9,p)}O o=g.2D.18("bg:6C");I(!e&&o){I("1K"!=o.el.1U("2E")){9.9O(X)}}},9P:K(j){I(!9.1A){L}O e=9.1A.18("4V");9.1A.1C("2o-y","1K");e.1l();e[j||"81"](9.3x?9.R.63:"77")},78:K(j,l){O n=9.26;I(!n){L}j=j||S;l=l||S;O k=n.18("cb:6C"),e={};I(!k){n.1x("cb:6C",k=1i g.1M(n,{3Y:g.1M.2X.4j,2T:6X}))}13{k.1l()}I(l){n.1C("1s",(j)?0:1);L}O m=n.1U("1s");e=(j)?{1s:[m,0]}:{1s:[m,1]};k.1t(e)},aq:K(m){O k=$Q(m).1l().5c();I("3r"!=9.1z){L}2Q{3C("a"!=k.43.2R()&&k!=9.26){k=k.2Y}I("a"!=k.43.2R()||k.57(m.4C())){L}}36(l){L}O j=k.1U("3W-1n").4F(" ");2d(m.2M){1d"1O":j[1]=k.1U("P");1f;1d"2u":j[1]="1I";1f}I(g.Y.3e){k.4n=j[1].1E()+1}13{k.17({"3W-1n":j.8l(" ")})}},az:K(k){O j=$Q(k).1l().5c();3C("a"!=j.43.2R()&&j!=9.26){j=j.2Y}I("a"!=j.43.2R()){L}2d(j.3w){1d"7R":9.2B(9.aa(9,9.R.5E));1f;1d"7O":9.2B(9.ah(9,9.R.5E));1f;1d"6J":9.2B(W);1f}},9O:K(j){j=j||S;O k=g.2D.18("bg:6C"),e={},m=0;I(!k){O l=g.$1i("2U").2l("2K-3W").17({1n:"eF",1N:"1Z",U:0,1b:0,T:0,1a:0,24:(9.R.24-1),2o:"1K",6E:9.R.6E,1s:0,2g:0,1T:0,2i:0}).2h(g.2C).1J();I(g.Y.3e){l.4I(g.$1i("9B",{21:\'9C:"";\'},{N:"1R%",P:"1R%",1N:"1Z",2F:"at()",U:0,eu:0,1n:"1W",24:-1,2g:"2S"}))}g.2D.1x("bg:6C",k=1i g.1M(l,{3Y:g.1M.2X.4j,2T:9.R.9z,5Y:K(n){I(n){9.17(g.1P(g.2D.9x(),{1n:"1W"}))}}.1m(l,9.5k||g.Y.2v),3M:K(){9.2y(9.1U("1s"),X)}.1m(l)}));e={1s:[0,9.R.9D/1R]}}13{k.1l();m=k.el.1U("1s");k.el.1C("3W-8w",9.R.6E);e=(j)?{1s:[m,0]}:{1s:[m,9.R.9D/1R]};k.M.2T=9.R.9z}k.el.1Q();k.1t(e)},9w:K(j){j=j||S;O e=9.2O(9.2b||9.1D);I(e.r.1h&&-1!=e.r.1h.4t){I(!j){e.r.1h.67();e.r.1h.3h=S;e.r.1h.1j.4T=S;e.r.1h.1j.V.1J();e.r.1h.1e.1J()}13{e.r.1h.66(S)}}},6N:K(k){k=k||0;O j=(g.Y.2v)?{N:19.8D,P:19.8C}:$Q(19).1S(),e=$Q(19).6M();L{T:e.x+k,1a:e.x+j.N-k,U:e.y+k,1b:e.y+j.P-k}},5U:K(k,l){O j=9.6N(9.R.8E),e=$Q(19).9x();l=l||j;L{y:1q.3F(j.U,1q.3m(("4h-47"==9.R.3X)?j.1b:e.P+k.P,l.1b-(l.1b-l.U-k.P)/2)-k.P),x:1q.3F(j.T,1q.3m(j.1a,l.1a-(l.1a-l.T-k.N)/2)-k.N)}},9E:K(l){O m=(g.Y.2v)?{N:19.8D,P:19.8C}:$Q(19).1S(),r=9.1c.18("2N"),n=9.1c.18("9L"),k=9.1c.18("5j"),e=9.1c.18("4N"),q=9.1c.18("9M"),j=9.1c.18("9N"),p=0,o=0;I(l){m.N-=l.x;m.P-=l.y}I(9.3x){p=1q.3m(9.2N.N+q,1q.3m(r.N,m.N-k-9.4O.x)),o=1q.3m(9.2N.P+j,1q.3m(r.P,m.P-9.4O.y))}13{p=1q.3m(9.2N.N+q,1q.3m(r.N,m.N-9.4O.x)),o=1q.3m(9.2N.P+j,1q.3m(r.P,m.P-e-9.4O.y))}I(p/o>n){p=o*n}13{I(p/o<n){o=p/n}}9.1c.1C("N",p);I(9.cr){9.cr.17({U:(9.1p.V.1S().P-9.cr.1S().P)})}L{N:1q.9K(p),P:1q.9K(o)}},bJ:K(l,j,e){O k=S;2d(g.Y.3U){1d"a8":k="31-3z"!=(l.1U("3z-5b")||l.1U("-fS-3z-5b"));1f;1d"3R":k="31-3z"!=(l.1U("3z-5b")||l.1U("-3R-3z-5b"));1f;1d"2c":k=g.Y.4a||"31-3z"!=(l.1U("3z-5b")||l.1U("-fT-3z-5b")||"31-3z");1f;2f:k="31-3z"!=l.1U("3z-5b");1f}L(k)?j:j-e},4Q:K(o){K l(r){O q=[];I("6P"==g.3b(r)){L r}1B(O m 1H r){q.3Z(m.6c()+":"+r[m])}L q.8l(";")}O k=l(o).3G(),p=$Q(k.4F(";")),n=W,j=W;p.3u(K(q){1B(O m 1H 9.R){j=1i 4r("^"+m.6c().22(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]"+(("3N"==m)?"*":"+")+")$","i").6b(q.3G());I(j){2d(g.3b(9.R[m])){1d"71":9.R[m]=j[1].5D();1f;1d"56":9.R[m]=(j[1].3d("."))?(j[1].bG()*((m.2R().3d("1s"))?1R:9G)):j[1].1E();1f;2f:9.R[m]=j[1].3G()}}}},9);1B(O e 1H 9.8q){I(!9.8q.5l(e)){4X}j=1i 4r("(^|;)\\\\s*"+e.6c().22(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]+)\\\\s*(;|$)","i").6b(k);I(j){9.8q[e].1X(9,j[2])}}},9H:K(){O e=W,l=9.1n,k=9.2N;1B(O j 1H l){e=1i 4r(""+j+"\\\\s*=\\\\s*([^,]+)","i").6b(9.R.8F);I(e){l[j]=(bp(l[j]=e[1].1E()))?l[j]:"1w"}}I((5A(l.U)&&5A(l.1b))||(5A(l.T)&&5A(l.1a))){9.R.8F="5o"}I(!$Q(["4h-47","68"]).4P(9.R.3X)){1B(O j 1H k){e=1i 4r(""+j+"\\\\s*=\\\\s*([^,]+)","i").6b(9.R.3X);I(e){k[j]=(bp(k[j]=e[1].1E()))?k[j]:-1}}I(5A(k.N)&&5A(k.P)){9.R.3X="4h-47"}}},b6:K(e){O j,l;1B(O j 1H e){I(9.7j.5l(l=j.3s())){9.7j[l]=e[j]}}},2O:K(e){L $Q(9.35.2F(K(j){L(e==j.1D)}))[0]},5g:K(e,j){e=e||W;j=j||S;L $Q(9.35.2F(K(k){L(e==k.2k&&(j||k.1G)&&(j||"5w"!=k.1z)&&(j||!k.R.4K))}))},ah:K(m,e){e=e||S;O j=9.5g(m.2k),k=j.42(m)+1;L(k>=j.1y)?(!e||1>=j.1y)?1L:j[0]:j[k]},aa:K(m,e){e=e||S;O j=9.5g(m.2k),k=j.42(m)-1;L(k<0)?(!e||1>=j.1y)?1L:j[j.1y-1]:j[k]},b7:K(j){j=j||W;O e=9.5g(j,X);L(e.1y)?e[0]:1L},b8:K(j){j=j||W;O e=9.5g(j,X);L(e.1y)?e[e.1y-1]:1L},b9:K(){L $Q(9.35.2F(K(e){L("3r"==e.1z||"5G-2Z"==e.1z||"5G-2B"==e.1z)}))},b5:K(k){O j=9.R.5E,m=W;I(!9.R.b2){g.2D.2x("9I");L X}k=$Q(k);I(9.R.bk&&!(k.de||k.d6)){L S}2d(k.bI){1d 27:k.1l();9.2B(W);1f;1d 32:1d 34:1d 39:1d 40:m=9.ah(9,j||32==k.bI);1f;1d 33:1d 37:1d 38:m=9.aa(9,j);1f;2f:}I(m){k.1l();9.2B(m)}}});O h={3t:"bs.0.10",M:{},6D:{},R:{4e:S,4K:S,6U:"d0",3N:"af",2P:"S"},1t:K(l){9.4D=$Q(19).18("cY:4D",$Q([]));O e=W,j=$Q([]),k={};9.R=g.1P(9.R,9.ac());c.M=g.3v(9.R);b.M=g.3v(9.R);c.M.2P=("68"==9.R.2P||"X"==9.R.2P);b.6D=9.6D;I(l){e=$Q(l);I(e&&(" "+e.2J+" ").3i(/\\s(5Z(?:7C){0,1}|2K)\\s/)){j.3Z(e)}13{L S}}13{j=$Q(g.$A(g.2C.2e("A")).2F(K(m){L(" "+m.2J+" ").3i(/\\s(5Z(?:7C){0,1}|2K)\\s/)}))}j.3u(K(p){p=$Q(p);O m=p.2e("7I"),n=W;k=g.1P(g.3v(9.R),9.ac(p.3w||" "));I(p.4A("5Z")||(p.4A("4J"))){I(m&&m.1y){n=p.3S(m[0])}c.1t(p,"1a-1u: "+("68"==k.2P||"X"==k.2P));I(n){p.4I(n)}}I(p.4A("2K")||(p.4A("4J"))){b.1t(p)}13{p.1v.3O="7J"}9.4D.3Z(p)},9);L X},1l:K(m){O e=W,l=W,j=$Q([]);I(m){e=$Q(m);I(e&&(" "+e.2J+" ").3i(/\\s(5Z(?:7C){0,1}|2K)\\s/)){j=$Q(9.4D.6H(9.4D.42(e),1))}13{L S}}13{j=$Q(9.4D)}3C(j&&j.1y){l=$Q(j[j.1y-1]);I(l.1h){l.1h.1l();c.3L.6H(c.3L.42(l.1h),1);l.1h=1L}b.1l(l);O k=j.6H(j.42(l),1);3f k}L X},6L:K(j){O e=W;I(j){9.1l(j);9.1t.1m(9).2s(7x,j)}13{9.1l();9.1t.1m(9).2s(7x)}L X},2r:K(n,e,k,l){O m=$Q(n),j=W;I(m){I((j=m.18("1F"))){j.2O(j.2b||j.1D).1z="6I"}I(!c.2r(m,e,k,l)){b.2r(m,e,k,l)}}},2Z:K(e){L b.2Z(e)},2B:K(e){L b.2B(e)},ac:K(j){O e,p,l,k,n;e=W;p={};n=[];I(j){l=$Q(j.4F(";"));l.2I(K(o){1B(O m 1H 9.R){e=1i 4r("^"+m.6c().22(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]+)$","i").6b(o.3G());I(e){2d(g.3b(9.R[m])){1d"71":p[m]=e[1].5D();1f;1d"56":p[m]=3y(e[1]);1f;2f:p[m]=e[1].3G()}}}},9)}13{1B(k 1H 9.M){e=9.M[k];2d(g.3b(9.R[k.3s()])){1d"71":e=e.5e().5D();1f;1d"56":e=3y(e);1f;2f:1f}p[k.3s()]=e}}L p}};$Q(1g).1r("4x",K(){h.1t()});L h})(6a);',62,1005,'|||||||||this|||||||||||||||||||||||||||||||||||if||function|return|options|width|var|height|mjs|_o|false|left|top|self|null|true|j21||||z7|else||||j6|j29|window|right|bottom|t22|case|z47|break|document|zoom|new|z4|hint|stop|j24|position|px|z1|Math|je1|opacity|start|click|style|auto|j30|length|state|t25|for|j6Prop|id|j17|thumb|ready|in|0px|hide|hidden|undefined|FX|display|mouseover|extend|show|100|j7|margin|j5|arguments|absolute|call|t23|block||src|replace|appendChild|zIndex||t26||title|z6|href|t27|trident|switch|byTag|default|border|j32|padding|test|group|j2|index|initializeOn|overflow|z3|j16|update|j27|load|mouseout|touchScreen|hotspots|je2|j23|defined|prototype|restore|body|doc|visibility|filter|styles|t30|j14|className|MagicThumb|params|type|size|t16|rightClick|try|toLowerCase|none|duration|DIV|img|firstChild|Transition|parentNode|expand||content||||thumbs|catch||||selectorsChange|j1|zoomWidth|has|trident4|delete|parseInt|z30|match|Element|z2|parent|min|selectors|zoomHeight|j8|zoomPosition|expanded|j22|version|forEach|detach|rel|hCaption|parseFloat|box|createElement|captionText|while|now|init|max|j26|fps|selectorsClass|getDoc|selectorsEffect|zooms|onComplete|hintText|cursor|J_TYPE|inz30|webkit|removeChild|event|engine|z21|background|expandSize|transition|push||J_UUID|indexOf|tagName|z44|Class|j19s|screen|constructor|_cleanup|backCompat|apply|z43Bind|layout|disableZoom|j9|clicked|fit|instanceof|linear|mt_vml_|timer|j3|scrollTop|z42|wrapper|visible|RegExp|j33|z28|win|thumbnail|t28|domready|touchend|on|j13|z41|getRelated|items|expandEffect|split|300|t31|append|MagicZoomPlus|disableExpand|nodeType|hintPosition|padY|scrPad|contains|z37|float|opacityReverse|z38|prevItem|slide|clearTimeout|continue|In|kill||Array|_tmpp|presto|fade|cbs|number|hasChild|array|getButton|z34|sizing|getTarget|onload|toString|divTag|t15|storage|Out|padX|ieBack|hasOwnProperty|selector|relative|center|z9|round|scrollLeft|createTextNode|image|keepThumbnail|alwaysShowZoom|uninitialized|t29|pow|loading|isNaN|render|link|j18|slideshowLoop|paddingTop|busy|paddingLeft|paddingRight|slideshowEffect|paddingBottom|restoreSpeed|offset|touchstart|unload|easing|zoomDistance|showLoading|mode|borderWidth|t14|dragMode|showTitle|initMouseEvent|onStart|MagicZoom||gd56f7fsgd|Doc|captionPosition|hintVisible|setTimeout|activate|pause|original|200|magicJS|exec|dashize|swap|z43|z48|j19|activatedEx|z35|rev|expandTrigger|buttons|readyState|complete|calc|mouseup|touch|entireImage|div|_unbind|static|setupHint|pad|z14|z18|_timer|z45|typeof|t32|lang|backgroundColor|inner|getElementsByClassName|splice|updating|close|zoomAlign|refresh|j10|t13|shift|string|z29|set|onready|throw|hintClass|J_EUID|events|250|z13|currentStyle|z24|boolean|getElementsByTagName|restoreEffect|onBeforeRender||z36|vertical|t10|innerHTML|newImg|createEvent|500|namespaces|item|_event_prefix_|400|pounce|loadingMsg|_lang|MagicJS|MagicZoomPup|clickToActivate|dissolve|compatMode|hintOpacity|callee|ddx|error|abort|effect|not|_handlers|150|onerror|platform|implement|PFX|Plus|selectorsEffectSpeed|getStorage|features|button|replaceChild|span|pointer|ddy|theme_mac|naturalWidth|speed|next|hoverTimer|hover|previous|100000px|ts|identifier|String|targetTouches|lastTap|loadingOpacity|changedTouches|defaults|toggle|dblclick|Ff|z33|mzParams|panZoom|IMG|Top|expandSpeed|inline|Right|Left|Bottom|media|titleSource|class|10000|z0|9_|swapTimer|join|magicthumb|initLeftPos|initTopPos|found|_deprecated|j31|selectorsMouseoverDelay|z11|contextmenu|smoothing|color|documentElement|zoomViewHeight|outline|to|z10|innerHeight|innerWidth|screenPadding|expandPosition|destroy|cloneNode|je3|initialize|custom|cos|startTime|caller|_event_del_|PI|horizontal|thumbChange|onErrorHandler|out|el_arr|_event_add_|Event|navigator|Function|J_EXTENDED||uuid|query|defaultView|HTMLElement|element|styleFloat|preventDefault|z15|clickToDeactivate|mousedown|preservePosition|z16|moveOnClick|getBox|tl|onabort|mousemove|j15|smoothingSpeed|ufx|z23|z20|big|shadow|loadingPositionX|loadingPositionY|lastSelector|construct|z26|clickToInitialize|borderLeftWidth|toggleMZ|j12|offsetHeight|backgroundSpeed|buttonsPosition|IFRAME|javascript|backgroundOpacity|resize|Slide|1000|parseExOptions|keydown|z46|ceil|ratio|hspace|vspace|t11|t12|rect|linkTarget|url|open|touches|restoreTrigger|prevent|t6|external|borderTopWidth|slideshowSpeed|reverse|10000px|expandAlign|overlapBox|borderBottomWidth|nWidth|captionSource|gecko|textAlign|t18|setupContent|_z37||tc|Zoom|tr|t17|preloadSelectorsBig|concat|Image|getBoundingClientRect|z25|preloadSelectorsSmall|blur|compareDocumentPosition|cbHover|ios|fitZoomWindow|mask|z17|webos|android|touchmove|zoomFade|cbClick|webkit419|insertBefore|unselectable|move|date|z27|chrome|localStorage|XMLHttpRequest|xpath|textnode|head|getComputedStyle|DXImageTransform|z32|setProps|z19|z31|enabled|Alpha|z39|t8|Microsoft|curLeft|charAt|cancelBubble|enclose|bounceIn|keyboard|elasticIn|offsetWidth|onKey|setLang|t19|t20|t21|object|wrap||roundCss|clearInterval|finishTime||loop|sineIn|expoIn|keyboardCtrl||backIn|cubicIn|quadIn|isFinite|420||v4|backcompat|raiseEvent|dispatchEvent|addEventListener|which|glow|interval|relatedTarget|zoomWindowEffect|Width|align|t7|change|toFloat|styles_arr|keyCode|adjBorder|onError|1px|preload|stopPropagation|x7|cssClass|t1|ig|fontSize|charCodeAt|borderRightWidth|buttonsDisplay|abs|transparent|5000|urn|schemas|add|t2|inherit|backgroundPosition|random|toArray|Tahoma|t5|Date|mac||_bind|expandTriggerDelay|holder|map|floor|fromCharCode|isReady|alt|z8|j28|nativize|microsoft|sMagicZoom|VML|backgroundImage||z22|com|fontWeight|zoomFadeOutSpeed|buttonNext|j20|t4|fill|UUID|gecko181|disable|entire|v2|behavior|nHeight|captionHeight|captionSpeed|Loading|zoomFadeInSpeed|vml|captionWidth|magicthumb_ie_ex|back|naturalHeight|fontFamily|5001|drag|buttonPrevious|buttonClose|attachEvent|removeEventListener|other|magiczoomplus|toElement|MagicZoomPlusHint|detachEvent|mt|expo|unknown|curFrame|metaKey|bounce|ip|elastic|cubic|sineOut|expoOut|sine|ctrlKey|quad|fromElement|od|KeyboardEvent|fireEvent|linux|eventType|createEventObject|KeyEvent||regexp|DOMContentLoaded|hone|clickTo|doScroll|loaded|initEvent|pageXOffset|hasLayout|filters|211|210|getPropertyValue|cssFloat|progid|Object|clientLeft|220|clientTop|j11|setAttribute|msPerformance|j4|performance|525|900|middle|loader|419|192|181|collection|190|191|exists|offsetLeft|offsetTop|byClass|MouseEvent|270|scrollHeight|scrollWidth|UIEvent|returnValue|clientY|target|pageY|clientX|pageX|pageYOffset|quadOut|childNodes|260|innerText|html|offsetParent|iframe|DOMElement||clientWidth|clientHeight|presto925|initializing|applicationCache|srcElement|Next|getTime|lef|111|evaluate|3px|postMessage|backgroundRepeat|no|getElementById|BackgroundImageCache|repeat|userAgent|fixed|MagicZoomHeader|frameBorder|highlight|air|tap|cubicOut|select|MozUserSelect|selectstart|MagicBoxShadow|MagicBoxGlow|MagicZoomBigImageCont|hand|textDecoration|MagicZoomLoading|setInterval|cbhover|tile|stroked|trimLeft|trimRight|009|autohide|dir|rtl|_blank|beforeEnd|insertAdjacentHTML|j25|icompare|00001|coords|ccc|nextSibling|execCommand|sort|toUpperCase|owningElement|cssText|createStyleSheet|zoomItem|styleSheets|user|callout|MagicThumbHint|mozInnerScreenY|getAttributeNode|imageSize|swapImage|getAttribute|Expand|distance|always|480|ActiveXObject|getBoxObjectFor|Previous|slideOut|elasticOut|lt|amp|backOut|618|taintEnabled|gt|slideIn|Close|bounceOut|WebKitPoint|preserve|MagicZoomHint|deactivate|caption|small|moz|ms|lastChild|Invalid|getXY|querySelector|10001|Magic|9999|rc18|msg|text|opera|source|_self|slice|z12|runtime|_new|delay|000000'.split('|'),0,{}))

MagicZoomPlus.options={"expand-speed":500,"restore-speed":-1,"expand-effect":"back","restore-effect":"linear","expand-align":"screen","expand-position":"center","expand-size":"fit-screen","background-color":"#000000","background-opacity":30,"background-speed":200,"caption-speed":250,"caption-position":"bottom","caption-height":300,"caption-width":300,buttons:"show","buttons-position":"auto","buttons-display":"previous, next, close","loading-msg":"Đang tải...","loading-opacity":75,"slideshow-effect":"dissolve","slideshow-speed":300,"z-index":10001,"expand-trigger":"click","restore-trigger":"auto","expand-trigger-delay":100,opacity:50,"zoom-width":710,"zoom-height":380,"zoom-position":"right","selectors-change":"mouseover","selectors-mouseover-delay":0,"smoothing-speed":40,"zoom-distance":20,"zoom-fade-in-speed":200,"zoom-fade-out-speed":200,fps:25,"loading-position-x":-1,"loading-position-y":-1,x:-1,y:-1,"show-title":false,"selectors-effect":"false","selectors-effect-speed":150,"zoom-align":"top","zoom-window-effect":"false","selectors-class":"zoom-thumb-active","hint-text":"","hint-opacity":75,"initialize-on":"load","hint-position":"tl","right-click":"false","disable-zoom":false,"disable-expand":false,"keep-thumbnail":true,"show-loading":true,"slideshow-loop":true,keyboard:true,"keyboard-ctrl":false,"drag-mode":false,"always-show-zoom":false,smoothing:true,"opacity-reverse":false,"click-to-activate":false,"click-to-deactivate":false,"preload-selectors-small":true,"preload-selectors-big":false,"zoom-fade":true,"move-on-click":true,"preserve-position":false,"fit-zoom-window":true,"entire-image":false,hint:true,"pan-zoom":true,"caption-source":"span"}

var magicToolboxLinks = [];
var optionLabels = {};
var optionTitles = {};
var optionProductIDs = {};
var choosedOptions = {};
//var magicToolboxOptionTitles = '';defined in header.phtml
var allowMagicToolboxChange = true;

function MagicToolboxPrepareOptions() {
    var pid = optionsPrice.productId;
    var container = document.getElementById('MagicToolboxSelectors'+pid);
    if(container) magicToolboxLinks = container.getElementsByTagName('a');
    //for configurable products
    if(typeof spConfig != 'undefined' && typeof spConfig.config.attributes != 'undefined') {
        for(var attributeID in spConfig.config.attributes) {
            optionLabels[attributeID] = {};
            optionProductIDs[attributeID] = {};
            optionTitles[attributeID] = spConfig.config.attributes[attributeID].label.toLowerCase();
            for(var optionID in spConfig.config.attributes[attributeID].options) {
                var option = spConfig.config.attributes[attributeID].options[optionID];
                if(typeof option == 'object') {
                    optionLabels[attributeID][option.id] = option.label.replace(/(^\s+)|(\s+$)/g, "")/*.replace(/"/g, "'")*/.toLowerCase();
                    optionProductIDs[attributeID][option.id] = {};
                    for(var i = 0, productsLength = option.products.length; i < productsLength; i++) {
                        optionProductIDs[attributeID][option.id][i] = option.products[i];
                    }
                }
            }
        }
    }
    //if(typeof opConfig != 'undefined') opConfig.reloadPrice();
}

function MagicToolboxClickElement(element, eventType, eventName) {
    var event;
    if (document.createEvent) {
        event = document.createEvent(eventType);
        event.initEvent(eventName, true, true);
        element.dispatchEvent(event);
    } else {
        event = document.createEventObject();
        event.eventType = eventType;
        element.fireEvent('on' + eventName, event);
    }
    return event;
}

function MagicToolboxChangeOption(element, optionTitle) {

    if(!allowMagicToolboxChange) {
        allowMagicToolboxChange = true;
        return;
    }

    if(MagicToolboxInArray(optionTitle, magicToolboxOptionTitles)) {
        var id = '';
        if(element.type == 'radio' && element.checked) {
            id = element.name.replace('options[', '').replace(']', '');
        } else if(element.type == 'select-one') {
            id = element.id.replace('select_', '').replace('attribute', '');
        } else {
            return;
        }
        if(element.value == '' || (typeof optionLabels[id][element.value] == 'undefined')) {
            return;
        }
        var label = optionLabels[id][element.value];
        for(var j = 0, linksLength = magicToolboxLinks.length; j < linksLength; j++) {
            if(magicToolboxLinks[j].firstChild.getAttribute('alt').replace(/(^\s+)|(\s+$)/g, "")/*.replace(/"/g, "'")*/.toLowerCase() == label) {
                allowMagicToolboxChange = false;
                MagicToolboxClickElement(magicToolboxLinks[j], 'MouseEvents', MagicToolbox_click);
                break;
            }
        }
    }

}

function MagicToolboxChangeSelector(a) {
    if(!allowMagicToolboxChange) {
        allowMagicToolboxChange = true;
        return;
    }
    var label = a.firstChild.getAttribute('alt').replace(/(^\s+)|(\s+$)/g, "").toLowerCase();
    var reloadPrice = false;
    for(var optionID in optionLabels) {
        for(var optionValue in optionLabels[optionID]) {
            if(optionLabels[optionID][optionValue] == label && MagicToolboxInArray(optionTitles[optionID], magicToolboxOptionTitles)) {
                var elementNames = ['options['+optionID+']', 'super_attribute['+optionID+']'];
                for(var elementNameIndex = 0, elementNamesLength = elementNames.length; elementNameIndex < elementNamesLength; elementNameIndex++) {
                    var elements = document.getElementsByName(elementNames[elementNameIndex]);
                    for(var i = 0, l = elements.length; i < l; i++) {
                        if(elements[i].type == 'radio') {
                            if(elements[i].value == optionValue) {
                                var radios = document.getElementsByName(elements[i].name);
                                for(var radioIndex = 0, radiosLength = radios.length; radioIndex < radiosLength; radioIndex++) {
                                    radios[radioIndex].checked = false;
                                }
                                elements[i].checked = true;
                                allowMagicToolboxChange = false;
                                MagicToolboxClickElement(elements[i], 'Event', 'click');
                                return;
                            }
                        } else if(elements[i].type == 'select-one') {
                            if(elements[i].options) {
                                for(var j = 0, k = elements[i].options.length; j < k; j++) {
                                    if(elements[i].options[j].value == optionValue) {
                                        elements[i].value = elements[i].options[j].value;
                                        elements[i].selectedIndex = j;
                                        allowMagicToolboxChange = false;
                                        MagicToolboxClickElement(elements[i], 'Event', 'change');
                                        return;
                                    }
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }
}

function MagicToolboxInArray(needle, haystack) {
    var o = {};
    for(var i=0, l=haystack.length; i<l; i++) {
        o[haystack[i]] = '';
    }
    if(needle in o) {
        return true;
    }
    return false;
}

function MagicToolboxChangeOptionConfigurable(element, optionTitle) {

    if(!allowMagicToolboxChange) {
        allowMagicToolboxChange = true;
        return;
    }

    if(typeof useAssociatedProductImages != 'undefined') {

        var attributeId = element.id.replace(/[a-z]*/, '');

        if(typeof choosedOptions[attributeId] != 'undefined') {
            delete choosedOptions[attributeId];
        }

        //clear child elements in choosedOptions
        if(element.childSettings) {
            for(var i=0,l= element.childSettings.length;i<l;i++){
                var childAttributeId = element.childSettings[i].id.replace(/[a-z]*/, '');
                if(typeof choosedOptions[childAttributeId] != 'undefined') {
                    delete choosedOptions[childAttributeId];
                }
            }
        }

        var configurableProductId = spConfig.config.productId;
        var mainSelectorImage = document.getElementById('imageMain'+configurableProductId);

        if(element.value.length === 0) {
            //if(mainSelectorImage) {
            //    mainSelectorImage.parentNode.click();
            //}
            return;
        }

        var associatedProductId = MagicToolboxFindProduct(attributeId, element.value);
        //add new option or replace one
        choosedOptions[attributeId] = element.value;

        var associatedImage = document.getElementById('imageConfigurable'+associatedProductId);
        if(associatedImage) {
            //associatedImage.parentNode.click();
            MagicToolboxClickElement(associatedImage.parentNode, 'MouseEvents', MagicToolbox_click);
            return;
        } else {
            if(mainSelectorImage) {
                //mainSelectorImage.parentNode.click();
                MagicToolboxClickElement(mainSelectorImage.parentNode, 'MouseEvents', MagicToolbox_click);
            }
            return;
        }

    }

    MagicToolboxChangeOption(element, optionTitle);

}

function MagicToolboxFindProduct(attributeId, optionId) {

    for(var i in optionProductIDs[attributeId][optionId]) {
        //product associated with current option
        var pId = optionProductIDs[attributeId][optionId][i];
        for(var attrId in choosedOptions) {
            //selected option's ID
            var optId = choosedOptions[attrId];
            for(var j in optionProductIDs[attrId][optId]) {
                if(pId == optionProductIDs[attrId][optId][j]) {
                    optId = null;
                    break;
                }
            }
            if(optId != null) {
                pId = null;
                break;
            }
        }
        if(pId != null) {
            return pId;
        }
    }
    return optionProductIDs[attributeId][optionId][0];

}

var magicToolboxOptionTitles = ['color'];

var MagicToolbox_click = 'mouseover';

$mjs(window).je1('load', function() {
    MagicToolboxPrepareOptions();
});

var ShowReview = Class.create();
ShowReview.prototype = {
    initialize: function(tagid,saveUrl,urlSortThank){
        this.id = tagid;
        this.saveUrl = saveUrl;
        this.urlSortThank = urlSortThank;
        this.onSave = this.nextStep.bindAsEventListener(this);
    },

    load: function(){
        this.loadingStatus();
        var request = new Ajax.Request(
                this.saveUrl,
                {
                    method:'post',
                    onSuccess: this.onSave,
                    parameters: {}
                }
         );
    },

    loadAll: function(){
        this.loadingStatus();
        var request = new Ajax.Request(
                this.saveUrl + 'p/all',
                {
                    method:'post',
                    onSuccess: this.onSave,
                    parameters: {}
                }
         );
    },

    loadBest: function (){
       this.loadingStatus();
       var request = new Ajax.Request(
                this.urlSortThank + 'p/all',
                {
                    method:'post',
                    onSuccess: this.onSave,
                    parameters: {}
                }
         );
    },

    loadingStatus: function(){
        html = '<div style="display:block"><p class="loader-review"><img src="' + SKIN_URL + 'images/loading_b.gif" alt="Đang tải..."/><br/>Vui long đợi...</p></div>';
        $j('#' + this.id).html(html);
    },

    nextStep: function(transport){
        if (transport && transport.responseText){
            try{
                response = eval('(' + transport.responseText + ')');
            }
            catch (e) {
                response = {};
            }
        }

        if (response.error){
            if ((typeof response.message) == 'string') {
                alert(response.message);
            } else {
                if (window.billingRegionUpdater) {
                    billingRegionUpdater.update();
                }

                alert(response.message.join("\n"));
            }

            return false;
        }

        if (response.update_section) {
            html = response.update_section.html;
            $j('#' + this.id).html(html);
        }
    }
}
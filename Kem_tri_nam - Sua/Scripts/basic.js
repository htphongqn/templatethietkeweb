BYDefault = $.extend(true, {
	"loadStatus":{
		"src" :"",
		"size":{
			"big"   :[64, 64],
			"middle":[32, 32],
			"small" :[20, 20]
		}
	}
}, window.BYDefault || {});
$.fn.busy = function (opts) {
	function Loading($self, o) {
		this.$self = $self;
		this.o = o;
		this.size = BYDefault.loadStatus.size[this.o.sizeType];
	}

	Loading.prototype.create = function () {
		this.$self.data("load", this);
		if (this.$self.css("position") != "absolute") {
			this.$self.css("position", "relative");
		}
		this.$img = $('<img/>', {"src":BYDefault.loadStatus.src || this.o.src, "width":this.size[0], "height":this.size[1]});
		this.$load = $("<div />", {
			"class":"plugin-loading",
			"html" :this.$img
		});
		this.show();
	};
	Loading.prototype.show = function () {
		var _height = this.$self.outerHeight();
		this.$img.css({"margin-top":(_height - this.size[1]) / 2});
		this.$load.css({"height":_height, "width":this.$self.outerWidth()});
		this.$load.appendTo(this.$self);
	};
	Loading.prototype.hide = function () {
		this.$load = this.$load.detach();
	};
	return $(this).each(function () {
		if ($(this).data("load")) {
			return $(this).data("load")[opts.method || "show"]();
		} else {
			return $(this).data("load", (new Loading($(this), opts)).create());
		}
	})
};
if (!window.BY) {
	BY = {
		"tool":{
			"language"         :function () {
			},
			"inc"              :function (url, incDom) {
				$.post(url, function (json) {
					if (json.status == 200) {
						incDom.html(parseInt(incDom.html()) + 1);
					}
				}, "json")
			},
			"triggerFormSubmit":function (dom, form, validator) {
				dom.bind("click", function (e) {
					e.preventDefault();
					if (validator.form()) {
						form.submit();
					}
					return false;
				});
			},
			"delayTipsy"       :function (jDom, txt, delay, fn) {
				jDom.attr("original-title", txt).tipsy("show");
				setTimeout(function () {
					jDom.attr("original-title", "").tipsy("hide");
					fn && fn();
				}, delay || 1500);
			},
			"triggerFile"      :function (txt, name, fn, cbHandler, to) {
				var oFormFile = $(this).iSimulateFile(txt, name, fn, to);
				oFormFile.$file.bind("change", function () {
					oFormFile.$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"small"});
					oFormFile.$form.ajaxSubmit(cbHandler);
				});
				return oFormFile;
			},
			"placeHolder"      :function (text) {
				text = text || this.val();
				this.bind("focusin",function () {
					if (this.value == text) {
						this.value = "";
					}
				}).bind("focusout", function () {
						if (!$.trim(this.value)) {
							this.value = text;
						}
					})
			},
			"toggleFollow"     :function () {
				var _text = ["Follow", "UnFollow"];
				var $follow = $("#J-follow");
				$("#J-follow").tipsy({"gravity":"s", "trigger":"manual"}).bind("click", function () {
					var $this = $(this);
					var _pre = +/^un/i.test($this.text());
					/*0 Following 1 UnFollowing*/
					$.post(this.href, function (json) {
						if (json.status == 200) {
							if(json.redirect) {location.href = json.redirect; return false;};
							$this[0].href = json.url;
							$this.text(_text[+!_pre]);
							BY.tool.delayTipsy($this, _text[_pre] + " Successfully");
						}
					}, "json");
					return false;
				})
			},
			"doCover"          :function (start, fn) {
				var _duration = new Date - start;
				if (_duration < 500) {
					setTimeout(function () {
						fn();
					}, 1000 - _duration);
				} else {
					fn();
				}
			}
		},
		"page":{
			"search"     :{
				"init"    :function () {
					this.tab();
					this.brand();
					this.agent();
					this.consumer();
				},
				"tab"     :function () {
					var $require = $("#search-require>div");
					$("#search-menu").delegate("li", "click", function () {
						$(this).addClass("act").siblings().removeClass("act");
						var _idx = $(this).index();
						$require.eq(_idx).show().siblings().hide();
					})
				},
				"brand"   :function () {
					var $form = $("#J-brand-form");
					var $result = $("#J-brand-r");
					var $body = $result.find("tbody");
					var $page = $result.find("tfoot td");
					$("#J-brand-srh").bind("click", function () {
						$.get($form[0].action, $form.serialize(), function (json) {
							fnHelper(json);
						}, "json")
					});
					$page.delegate('a', "click", function (e) {
						e.preventDefault();
						if (!$(this).parent().hasClass("selected")) {
							$.get(this.href, function (json) {
								fnHelper(json);
							}, "json");
						}
						return false;
					});
					function fnHelper(json) {
						if (json.state == 200) {
							$result.hide();
							$body.html(fnSerialize(json.brands));
							$page.html(json.pages);
							$result.show();
						}
					}

					function fnSerialize(brands) {
						var str = '';
						if (brands.length) {
							for (var i = 0, _len = brands.length; i < _len; i++) {
								str += '<tr>' +
									'<td><a href="' + brands[i].url + '" target="_blank"><img src="' + brands[i].logo + '" width="75" height="75"/></a></td>' +
									'<td><a href="' + brands[i].url + '" target="_blank">' + brands[i].name + '</a></td>' +
									'<td>' + brands[i].company + '</td>' +
									'<td>' + brands[i].industry + '</td>' +
									'<td>' + brands[i].country + '</td>' +
									'</tr>';
							}
						} else {
							str += '<tr><td colspan="5" class="tac">there isn\'t any data research</td></tr>';
						}
						return str;
					}
				},
				"agent"   :function () {
					var $form = $("#J-agent-form");
					var $result = $("#J-agent-r");
					var $body = $result.find("tbody");
					var $page = $result.find("tfoot td");
					$("#J-agent-srh").bind("click", function () {
						$.get($form[0].action, $form.serialize(), function (json) {
							fnHelper(json);
						}, "json")
					});
					$page.delegate('a', "click", function (e) {
						e.preventDefault();
						if (!$(this).parent().hasClass("selected")) {
							$.get(this.href, function (json) {
								fnHelper(json);
							}, "json");
						}
						return false;
					});
					function fnHelper(json) {
						if (json.status == 200) {
							$result.hide();
							$body.html(fnSerialize(json.agents));
							$page.html(json.pages);
							$result.show();
						}
					}

					function fnSerialize(list) {
						var str = '';
						for (var i = 0, _len = list.length; i < _len; i++) {
							str += '<tr>' +
								'<td><a href="' + list[i].url + '" target="_blank"><img src="' + list[i].logo + '" width="75" height="75"/></a></td>' +
								'<td><a href="' + list[i].url + '" target="_blank">' + list[i].name + '</a></td>' +
								'<td>' + list[i].industry + '</td></tr>';
						}
						return str;
					}
				},
				"consumer":function () {
					var $form = $("#J-consumer-form");
					var $result = $("#J-consumer-r");
					var $body = $result.find("tbody");
					var $page = $result.find("tfoot td");
					$("#J-consumer-srh").bind("click", function () {
						$.get($form[0].action, $form.serialize(), function (json) {
							fnHelper(json)
						}, "json");
					});
					$page.delegate('a', "click", function (e) {
						e.preventDefault();
						if (!$(this).parent().hasClass("selected")) {
							$.get(this.href, function (json) {
								fnHelper(json);
							}, "json");
						}
						return false;
					});
					function fnHelper(json) {
						if (json.status == 200) {
							$result.hide();
							$body.html(fnSerialize(json.consumers));
							$page.html(json.pages);
							$result.show();
						}
					}

					function fnSerialize(list) {
						var str = '';
						for (var i = 0, _len = list.length; i < _len; i++) {
							str += '<tr>' +
								'<td><a href="' + list[i].url + '" target="_blank"><img src="' + list[i].logo + '" width="75" height="75"></a></td>' +
								'<td><a href="' + list[i].url + '" target="_blank">' + list[i].name + '</a></td>' +
								'<td>' + list[i].sex + '</td></tr>'
						}
						return str;
					}
				}
			},
			"login"      :{
				"init" :function () {
					this.valid();
				},
				"valid":function () {
					/*验证内容与事件*/
					var $form = $("#loginForm");
					var $loadingDom = $form.parent();
					var $submit = $("#submit").tipsy({"gravity":"s", "trigger":"manual"});
					$("#email").attr("original-title", "Please enter your email account").tipsy({"trigger":"focus", "gravity":"w"});
					$("#password").attr("original-title", "enter 6-16 chars").tipsy({"trigger":"focus", "gravity":"w"}).bind("keypress",function(e){
						if(e.keyCode == 13){
							$submit.trigger('click');
						}
					});
					var validator = $form.validate({
						"submitHandler":function (form) {
							var start = new Date();
							$loadingDom.busy({"src":"../../images/global/loading_busy.gif", "sizeType":"middle"});
							$.post(form.action, $(form).serialize(), function (json) {
								if (json.status == 200) {
									if (json.redirect) {
										BY.tool.delayTipsy($submit, "Successfully", 0, function () {
											location.href = json.redirect;
										});

									} else if (json.errors) {
										BY.tool.doCover(start, function () {
											$loadingDom.busy({"method":"hide"});
										});
										for (var i in json.errors) {
											var _cur = $form.find('[name*="' + i + '"]');
											if (_cur.length) {
												_cur.attr("original-title", json.errors[i]).addClass("error");
											} else {
												BY.tool.delayTipsy($submit, json.errors[i]);
											}
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								} else if (json.status == 405) {
									alert("Get method is not allowed");
								}
							}, "json");
							return false;
						},
						"rules"        :{
							"LoginForm[email]"   :{
								"required":true,
								"email"   :true
							},
							"LoginForm[password]":{
								"required":true,
								"password":true
							}
						},
						"onfocusout"   :false,
						"onkeyup"      :false,
						"onclick"      :false,
						"showErrors"   :function (errorMap, errorList) {
							/*处理正确*/
							var _suc = validator.successList;
							if (_suc) {
								for (var i in _suc) {
									var _cur = _suc[i];
									_cur.className = "";
									_cur.setAttribute("original-title", "");
								}
							}
							/*处理错误*/
							if (errorList.length) {
								for (var i in errorList) {
									var _cur = errorList[i];
									_cur.element.className = "error";
									_cur.element.setAttribute("original-title", _cur.message);
								}
								$form.find(".error:eq(0)").trigger("focus");
							}
						}
					});
					BY.tool.triggerFormSubmit($submit, $form, validator);
				}
			},
			"register"   :{
				"init"     :function () {
					this.role();
					this.brandRole();
					this.search();
					this.brand();
					this.company();
					this.agent();
					this.cbfv();
					this.$container = $(".register-container");
				},
				"role"     :function () {
					var $roleRefer = $("#register-role-refer>div");//角色联动区域指向的jquery对象集合
					$('#register-role').bind('change', function () {
						$roleRefer.eq(this.value).show().siblings().hide();
					})
				},
				"brandRole":function () {
					var $brandsRefer = $("#brands-route-refer>div");//品牌联动区域指向的jquery对象集合
					var _this = this;
					$("#brands-route").delegate("input", "click", function () {
						$brandsRefer.eq(this.value).show().siblings().hide();
						$("#brands-route p").css("color", "red");
					})
				},
				"search"   :function () {
					var $form = $("#J-srh-form");
					var $input = $form.find("input").tipsy({"gravity":"s", "trigger":"focus"}).bind("keypress", function (e) {
						if (e.keyCode == 13) {
							return false;
						}
					});
					var $searchResult = $("#search-result");
					var $roleRefer = $("#register-role-refer>div");//角色联动区域指向的jquery对象集合
					var $brandsRefer = $("#brands-route-refer>div");//品牌联动区域指向的jquery对象集合
					var $company = $("#J-company");
					var _this = this;
					$("#check-search").bind("click", function () {
						if (!$.trim($input.val())) {
							$input.addClass("error").attr("original-title", "It shouldn't be empty");
							return false;
						} else {
							$input.removeClass("error");
							_this.$container.busy({"src":"../../images/global/loading_busy.gif", "sizeType":"big"});
							var _start = new Date();
							$.post($form[0].action, $form.serialize(), function (json) {
								BY.tool.doCover(_start, function () {
									_this.$container.busy({"method":"hide"})
								});
								if (json.status == 200) {
									if (json.companies && json.companies.length) {
										$searchResult.html(fnSerialize(json.companies));
									} else {
										$searchResult.html('<a href="javascript:;">Sorry, your company has NOT registered yet, you can click here to register it?</a>');
									}
								}
							}, "json");
						}
					});
					function fnSerialize(list) {
						var _str = '<div><p></p><ol>';
						for (var i = 0, _len = list.length; i < _len; i++) {
							_str += '<li><a href="javascript:;" val="' + list[i].id + '">' + list[i].name + '</a></li>'
						}
						_str += '</ol></div>';
						return _str;
					}

					$searchResult.delegate("a", "click", function () {
						if (this.parentNode.nodeName.toLowerCase() == 'li') {
							$roleRefer.eq(3).show().siblings().hide();
							$company.val(this.getAttribute("val"));
						} else {
							$brandsRefer.eq(0).show().siblings().hide();
						}
					})
				},
				"brand"    :function () {
					$("#brand-email").attr("original-title", "please enter an email").tipsy({"trigger":"focus", "gravity":"w"});
					$("#brand-name").attr("original-title", "please enter 4-30 chars").tipsy({"trigger":"focus", "gravity":"w"});
					$("#brand-pwd").attr("original-title", "please enter 6-16 chars").tipsy({"trigger":"focus", "gravity":"w"});
					$("#brand-c-pwd").attr("original-title", "please confirm your password").tipsy({"trigger":"focus", "gravity":"w"});
					/*brand register*/
					var $submit = $("#brandSubmit").tipsy({"trigger":"manual", "gravity":"s"});
					var $form = $("#brandForm");
					var _this = this;
					var validator = $form.validate({
						"submitHandler":function (form) {
							_this.$container.busy({"src":"../../images/global/loading_busy.gif", "sizeType":"big"});
							var _start = new Date;
							$.post(form.action, $(form).serialize(), function (json) {
								if (json.status == 200) {
									if (json.redirect) {
										BY.tool.delayTipsy($submit, "Register successfully", null, function () {
											location.href = json.redirect;
										})
									} else if (json.errors) {
										for (var i in json.errors) {
											var _cur = $form.find('[name*="' + i + '"]');
											if (_cur.length) {
												_cur.attr("original-title", json.errors[i]).addClass("error");
											} else {
												BY.tool.delayTipsy($submit, json.errors[i]);
											}
										}
										BY.tool.doCover(_start, function () {
											_this.$container.busy({"method":"hide"});
										});
										$form.find(".error:eq(0)").trigger("focus");
									}
								} else if (json.status == 405) {
									alert("Get method is not allowed");
								}
							}, "json");
							return false;
						},
						"rules"        :{
							"RegisterForm[email]"     :{
								"required":true,
								"email"   :true
							},
							"RegisterForm[name]"      :{
								"required":true,
								"username":true
							},
							"RegisterForm[password]"  :{
								"required":true,
								"password":true
							},
							"RegisterForm[confirmPwd]":{
								"required":true,
								"password":true,
								"equalTo" :"#brand-pwd"
							}
						},
						"onfocusout"   :false,
						"onkeyup"      :false,
						"onclick"      :false,
						"showErrors"   :function (errorMap, errorList) {
							/*处理正确*/
							var _suc = validator.successList;
							if (_suc.length) {
								for (var i in _suc) {
									var _cur = _suc[i];
									_cur.className = "";
									_cur.setAttribute("original-title", "");
								}
							}
							/*处理错误*/
							if (errorList.length) {
								for (var item in errorList) {
									var _cur = errorList[item];
									_cur.element.className = "error";
									_cur.element.setAttribute("original-title", _cur.message);
								}
								$form.find(".error:eq(0)").trigger("focus");
							}
						}
					});
					/*触发验证*/
					BY.tool.triggerFormSubmit($submit, $form, validator);
				},
				"company"  :function () {
					$("#company-email").attr("original-title", "please enter email").tipsy({"trigger":"focus", "gravity":"w"});
					$("#company-name").attr("original-title", "please enter 4-30 chars").tipsy({"trigger":"focus", "gravity":"w"});
					$("#company-pwd").attr("original-title", "please enter 6-16 chars").tipsy({"trigger":"focus", "gravity":"w"});
					$("#company-c-pwd").attr("original-title", "please confirm your password").tipsy({"trigger":"focus", "gravity":"w"});
					var $submit = $("#companySubmit").tipsy({"trigger":"manual", "gravity":"s"});

					$('#company-email').focus(function(){
						if($(this).val()=='eg: company@brandyond.com'){
							$(this).val('');
						}
					});
					$('#company-email').blur(function(){
						if($(this).val()==''){
							$(this).val('eg: company@brandyond.com');
						}
					});
					/*company register*/
					var $form = $("#companyForm");
					var _this = this;
					var validator = $form.validate({
						"submitHandler":function (form) {
							_this.$container.busy({"src":"../../images/global/loading_busy.gif", "sizeType":"big"});
							var _start = new Date;
							$.post(form.action, $(form).serialize(), function (json) {
								if (json.status == 200) {
									if (json.redirect) {
										BY.tool.delayTipsy($submit, "Register successfully", null, function () {
											location.href = json.redirect;
										})
									} else {
										for (var i in json.errors) {
											var _cur = $form.find('[name*="' + i + '"]');
											if (_cur.length) {
												_cur.attr("original-title", json.errors[i]).addClass("error");
											} else {
												BY.tool.delayTipsy($submit, json.errors[i]);
											}
										}
										BY.tool.doCover(_start, function () {
											_this.$container.busy({"method":"hide"});
										});
										$form.find(".error:eq(0)").trigger("focus");
									}
								} else if (json.status == 405) {
									alert("Get method is not allowed");
								}
							}, "json");
							return false;
						},
						"rules"        :{
							"RegisterForm[email]"     :{
								"required":true,
								"email"   :true
							},
							"RegisterForm[name]"      :{
								"required":true,
								"username":true
							},
							"RegisterForm[password]"  :{
								"required":true,
								"password":true
							},
							"RegisterForm[confirmPwd]":{
								"required":true,
								"password":true,
								"equalTo" :"#company-pwd"
							}
						},
						"ignore"       :"",
						"onfocusout"   :false,
						"onkeyup"      :false,
						"onclick"      :false,
						"showErrors"   :function (errorMap, errorList) {
							/*处理正确*/
							var _suc = validator.successList;
							if (_suc.length) {
								for (var i in _suc) {
									var _cur = _suc[i];
									_cur.className = "";
									_cur.setAttribute("original-title", "");
								}
							}
							/*处理错误*/
							if (errorList.length) {
								for (var item in errorList) {
									var _cur = errorList[item];
									_cur.element.className = "error";
									_cur.element.setAttribute("original-title", _cur.message);
								}
								$form.find(".error:eq(0)").trigger("focus");
							}
						}
					});
					/*触发验证*/
					BY.tool.triggerFormSubmit($submit, $form, validator);
				},
				"agent"    :function () {
					$("#agents-email").attr("original-title", "Please enter an email").tipsy({"trigger":"focus", "gravity":"w"});
					$("#agents-name").attr("original-title", "Please enter 4-30 chars").tipsy({"trigger":"focus", "gravity":"w"});
					$("#agents-pwd").attr("original-title", "Please enter 6-16 chars").tipsy({"trigger":"focus", "gravity":"w"});
					$("#agents-c-pwd").attr("original-title", "Please confirm your password").tipsy({"trigger":"focus", "gravity":"w"});
					var $form = $("#agentForm");
					var $submit = $("#agentSubmit").tipsy({"trigger":"manual", "gravity":"s"});
					var _this = this;
					var validator = $form.validate({
						"submitHandler":function (form) {
							_this.$container.busy({"src":"../../images/global/loading_busy.gif", "sizeType":"big"});
							var _start = new Date;
							$.post(form.action, $(form).serialize(), function (json) {
								if (json.status == 200) {
									if (json.redirect) {
										BY.tool.delayTipsy($submit, "Register successfully", null, function () {
											location.href = json.redirect;
										})
									} else if (json.errors) {
										for (var i in json.errors) {
											var _cur = $form.find('[name*="' + i + '"]');
											if (_cur.length) {
												_cur.attr("original-title", json.errors[i]).addClass("error");
											} else {
												BY.tool.delayTipsy($submit, json.errors[i]);
											}
										}
										BY.tool.doCover(_start, function () {
											_this.$container.busy({"method":"hide"});
										});
										$form.find(".error:eq(0)").trigger("focus");
									}
								} else if (json.status == 405) {
									alert("Get method is not allowed");
								}
							}, "json");
							return false;
						},
						"rules"        :{
							"RegisterForm[email]"     :{
								"required":true,
								"email"   :true
							},
							"RegisterForm[name]"      :{
								"required":true,
								"username":true
							},
							"RegisterForm[password]"  :{
								"required":true,
								"password":true
							},
							"RegisterForm[confirmPwd]":{
								"required":true,
								"password":true,
								"equalTo" :"#agents-pwd"
							}
						},
						"onfocusout"   :false,
						"onkeyup"      :false,
						"onclick"      :false,
						"showErrors"   :function (errorMap, errorList) {
							/*处理正确*/
							var _suc = validator.successList;
							if (_suc.length) {
								for (var i in _suc) {
									var _cur = _suc[i];
									_cur.className = "";
									_cur.setAttribute("original-title", "");
								}
							}
							/*处理错误*/
							if (errorList.length) {
								for (var item in errorList) {
									var _cur = errorList[item];
									_cur.element.className = "error";
									_cur.element.setAttribute("original-title", _cur.message);
								}
								$form.find(".error:eq(0)").trigger("focus");
							}
						}
					});
					/*触发验证*/
					BY.tool.triggerFormSubmit($submit, $form, validator);
				},
				"cbfv"     :function () {
					$("#cbv-email").attr("original-title", "请输入正确格式的邮箱").tipsy({"trigger":"focus", "gravity":"w"});
					$("#cbv-name").attr("original-title", "请输入2-24个字符").tipsy({"trigger":"focus", "gravity":"w"});
					$("#cbv-pwd").attr("original-title", "请输入6-16个字符").tipsy({"trigger":"focus", "gravity":"w"});
					$("#cbv-c-pwd").attr("original-title", "请再次确定你的密码").tipsy({"trigger":"focus", "gravity":"w"});
					/*cbv register*/
					var $form = $("#cbvForm");
					var $submit = $("#cbvSubmit").tipsy({"trigger":"manual", "gravity":"s"});
					var _this = this;
					var validator = $form.validate({
						"submitHandler":function (form) {
							_this.$container.busy({"src":"../../images/global/loading_busy.gif", "sizeType":"big"});
							var _start = new Date;
							$.post(form.action, $(form).serialize(), function (json) {
								if (json.status == 200) {
									if (json.redirect) {
										BY.tool.delayTipsy($submit, "Register successfully", null, function () {
											location.href = json.redirect;
										})
									} else if (json.errors) {
										for (var i in json.errors) {
											var _cur = $form.find('[name*="' + i + '"]');
											if (_cur.length) {
												_cur.attr("original-title", json.errors[i]).addClass("error");
											} else {
												BY.tool.delayTipsy($submit, json.errors[i]);
											}
										}
										BY.tool.doCover(_start, function () {
											_this.$container.busy({"method":"hide"});
										});
										$form.find(".error:eq(0)").trigger("focus");
									}
								} else if (json.status == 405) {
									alert("Get method is not allowed");
								}
							}, "json");
							return false;
						},
						"rules"        :{
							"RegisterForm[email]"     :{
								"required":true,
								"email"   :true
							},
							"RegisterForm[name]"      :{
								"required":true,
								"username":true
							},
							"RegisterForm[password]"  :{
								"required":true,
								"password":true
							},
							"RegisterForm[confirmPwd]":{
								"required":true,
								"password":true,
								"equalTo" :"#cbv-pwd"
							}
						},
						"onfocusout"   :false,
						"onkeyup"      :false,
						"onclick"      :false,
						"showErrors"   :function (errorMap, errorList) {
							/*处理正确*/
							var _suc = validator.successList;
							if (_suc.length) {
								for (var i in _suc) {
									var _cur = _suc[i];
									_cur.className = "";
									_cur.setAttribute("original-title", "");
								}
							}
							/*处理错误*/
							if (errorList.length) {
								for (var item in errorList) {
									var _cur = errorList[item];
									_cur.element.className = "error";
									_cur.element.setAttribute("original-title", _cur.message);
								}
								$form.find(".error:eq(0)").trigger("focus");
							}
						}
					});
					/*触发验证*/
					BY.tool.triggerFormSubmit($submit, $form, validator);
				}
			},
			/*agent页面*/
			"agent"      :{
				"timeline"  :{
					init    :function () {
						BY.tool.toggleFollow();
						this.initTime();
					},
					initTime:function (txt) {
						txt = txt || 'agent';
						var data = {};
						var $th = $("#J-timeBox th");
						if ($th.length) {
							$("#J-timeBox th").each(function () {
								data[$(this).text()] = $(this).next().text().split(",");
							});
							TimeTree({data:data, url:$("#J-timeBox").attr("data-url"), "hash":null});
						} else {
							TimeTree({"data":false, "hash":null});
							//$("#J-timeBox").html("<div class='time-no-data'>Sorry,This "+txt+" have no TimeLine data !</div>");
							$("#J-timeBox").html("<div class='time-no-data'><img src='../../../images/agent/agent_timetree_default.jpg' width='700' alt='timeline' /></div>");
						}
						$(window).trigger("scroll");
						$("#J-timeBox").delegate(".J-ajax", "click", function () {
							$(this).colorbox({
								width :600,
								height:640
							});
						});
					}
				},
				/*agent-case*/
				"case"      :{
					"init"   :function () {
						BY.tool.toggleFollow();
						BY.tool.language();
						this.gallery();
					},
					"gallery":function () {
						$("#J-list .fr a").each(function () {
							var name = "gallery" + $(this).closest("dd").index();
							$(this).colorbox({
								"rel":name/*,
								 "width" :"80%",
								 "height":"80%"*/
							});
						});
					}
				},
				/*agent-coverage*/
				"coverage"  :{
					"init":function () {
						BY.tool.language();
						BY.tool.toggleFollow();
					}
				},
				/*agent-exhibtion*/
				"exhibition":{
					"home"  :{
						"init":function () {
							BY.tool.language();
							BY.tool.toggleFollow();
						}
					},
					"detail":{
						"init"      :function () {
							BY.tool.language();
							BY.tool.toggleFollow();
							this.add();
							this.menu();
							this.list();
							this.datepicker();
							this.form();
						},
						"form"      :function () {
							var $form = $("#J-make-form");
							var $submit = $("#J-submit").tipsy({"trigger":"focus", "gravity":"s"});
							$("textarea").tipsy({"trigger":"focus", "gravity":"w"});
							var validator = $form.validate({
								"submitHandler":function (form) {
									$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
									var _start = new Date();
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$form.busy({"method":"hide"});
										});
										if (json.status == 200) {
											form.reset();
											BY.tool.delayTipsy($submit, "send successfully");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"date"              :{
										required:true,
										date    :true
									},
									"EmailForm[content]":{
										required:true
									}
								},
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							BY.tool.triggerFormSubmit($submit, $form, validator);
						},
						"datepicker":function () {
							var $date = $("#J-date").tipsy({"gravity":"s", "trigger":"manual"}).DatePicker({
								format    :'Y-m-d',
								date      :new Date(),
								current   :new Date(),
								"starts"  :1,
								position  :'r',
								"onChange":function (formated, dates) {
									$date.val(formated).DatePickerHide();
								}
							});
						},
						"add"       :function () {
							var $form = $("#J-form");
							$("#J-add").tipsy({"gravity":"s", "trigger":"manual"}).bind("click", function () {
								var $this = $(this);
								$.get($form[0].action, $form.serialize(), function (json) {
									if (json.status == 200) {
										BY.tool.delayTipsy($this, "Successful");
										setTimeout(function () {
											$this.parent().html("<span>This exhibitor is already in visiting list</span>");
										}, 1500)
									}
								}, "json")
							})
						},
						"menu"      :function () {
							var _refer = $("#J-refer>div");
							$("#J-menu").delegate("li", "click", function () {
								$(this).addClass("act").siblings().removeClass("act");
								_refer.eq($(this).index()).show().siblings().hide();
							});
						},
						"list"      :function () {
							var $product = $("#J-product");
							var cache = [];
							$("#J-list").delegate("a", "click", function (e) {
								var _idx = $(this).closest("tr").index();
								if ($product.attr("curIdx") == _idx) {
									$product.show().siblings().hide();
								} else if (cache[_idx]) {
									$product.html(cache[_idx]).show().siblings().hide();
								} else {
									$.get(this.href, function (html) {
										cache[_idx] = html;
										$product.attr("curIdx", _idx).html(html).show().siblings().hide();
									});
								}
								e.preventDefault();
							});
						}
					}
				},
				/*agent-myfans*/
				"follower"  :{
					"init":function () {
						BY.page.regConsumer.follower.init();
						BY.tool.language();
						BY.tool.toggleFollow();
					}
				},
				"following" :{
					"init":function () {
						BY.tool.language();
						BY.tool.toggleFollow();
						BY.page.regConsumer.following.init();
					}
				},
				/*agent-page*/
				"page"      :{
					"init"    :function () {
						BY.tool.language();
						BY.tool.toggleFollow();
						this.menu();
						this.form();
						this.colorBox();
					},
					"colorBox":function () {
						$("#J-slide a").colorbox({
							"rel":"group"/*,
							 "width" :"80%",
							 "height":"80%"*/
						});
					},
					"menu"    :function () {
						var $other = $("#J-menu-other");
						var $menu = $("#J-menu");
						var $cur = $menu.find("a.cur");
						$("#J-menu").delegate("a", "click", function () {
							if ($(this).text() == ">>") {
								$other.toggle();
							}
						})
					},
					"form"    :function () {
						var $form = $("#J-form");
						var $add = $("#J-add");
						var $list = $("#J-list");
						$("#J-title").attr("original-title", "enter a title").tipsy({"trigger":"focus", "gravity":"w"});
						$("#J-comment").attr("original-title", "enter a comment").tipsy({"trigger":"focus", "gravity":"w"});
						var fnSerialize = function (comment) {
							return $('<li><img src="' + comment[0] + '" width="63" height="63" class="fl"/><div class="fl"><strong>' + comment[1] + '</strong><span>' + comment[2] + '</span><p>' + comment[3] + '</p></div></li>').css("backgroundColor", "#ffc");
						};
						var validator = $("#J-form").validate({
							"submitHandler":function (form) {
								$.get(form.action, $form.serialize(), function (json) {
									if (json.status == 200) {
										fnSerialize(json.comment).appendTo($list).animate({"backgroundColor":"#fff"}, 2000);
										form.reset();
									}
								}, "json");
								return false;
							},
							"rules"        :{
								/*todo cancel*/
								"title"  :{
									"required":true
								},
								"comment":{
									"required":true
								}
							},
							"messages"     :{
							},
							"onfocusout"   :false,
							"onkeyup"      :false,
							"onclick"      :false,
							"showErrors"   :function (errorMap, errorList) {
								/*处理正确*/
								var _suc = validator.successList;
								if (_suc.length) {
									for (var i in _suc) {
										var _cur = _suc[i];
										_cur.className = "";
										_cur.setAttribute("original-title", "");
									}
								}
								if (errorList.length) {
									for (var i in errorList) {
										var _cur = errorList[i];
										_cur.element.className = "error";
										_cur.element.setAttribute("original-title", _cur.message);
									}
									$form.find(".error:eq(0)").trigger("focus");
								}
							}
						});
						BY.tool.triggerFormSubmit($add, $form, validator);
					}
				},
				/*agent-resume*/
				"resume"    :{
					"init"  :function () {
						BY.tool.toggleFollow();
						BY.tool.language();
						this.invite();
						this.colorbox();
						//this.images();
					},
					"colorbox" : function(){
						$("#J-images li").bind('click', function(){
							var agimg = $(this).find('img').attr('src').replace('_120x120.jpg', '');
							$(this).colorbox({href:agimg});
						});
					},
					"invite":function () {
						var $form = $(".invite-form");
						$form.find("textarea").tipsy({"gravity":"s", "trigger":"focus"});
						var $btn = $form.find('input:submit').tipsy({"gravity":'s','trigger':'manual'});
						var validator = $form.validate({
							"submitHandler":function (form) {
								$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
								var _start = new Date;
								$.post(form.action, $form.serialize(), function (json) {
									if(json.redirect){alert('Please first sign in!!');location.href=json.redirect;}
									BY.tool.doCover(_start, function () {
										$form.busy({"method":"hide"});
									});
									if (json.status == 200) {
										if (json.errors) {
											for (var i in json.errors) {
												var _cur = $form.find('[name*="' + i + '"]');
												if (_cur.length) {
													_cur.attr("original-title", json.errors[i]).addClass("error");
												} else {
													BY.tool.delayTipsy($btn, json.errors[i]);
												}
											}
											$form.find(".error:eq(0)").trigger("focus");
										} else {
											BY.tool.delayTipsy($btn, "Update Successful",1500,function(){
												tb_remove();
											});
										}
									} else if(json.status == 403){
										BY.tool.delayTipsy($btn,'send fail,try again please');
									}
								}, "json");
								return false;
							},
							"rules"        :{
								'Message[desc]':{
									required:true,
									rangelength:[1,500]
								}
							},
							"ignore"       :"input:file",
							"onfocusout"   :false,
							"onkeyup"      :false,
							"onclick"      :false,
							"showErrors"   :function (errorMap, errorList) {
								var _suc = validator.successList;
								if (_suc) {
									for (var i in _suc) {
										var _cur = _suc[i];
										_cur.className = "";
										_cur.setAttribute("original-title", "");
									}
								}
								if (errorList.length) {
									for (var i in errorList) {
										var _cur = errorList[i];
										_cur.element.className = "error";
										_cur.element.setAttribute("original-title", _cur.message);
									}
									$form.find(".error:eq(0)").trigger("focus");
								}
							}
						});
					}
				},
				/*agent-team*/
				"team"      :{
					"init"   :function () {
						BY.tool.toggleFollow();
						BY.tool.language();
						this.gallery();
					},
					"gallery":function () {
						$("#J-gallery a").colorbox({
							"rel":"group"/*,
							 "width" :"80%",
							 "height":"80%"*/
						});
					}
				},
				/*agent-time-tree*/
				"timetree"  :{
					"init"    :function () {
						BY.tool.toggleFollow()
						BY.tool.language();
						this.timetree();
					},
					"timetree":function () {
						var data = {};
						$("#J-timeBox th").each(function () {
							data[$(this).text()] = $(this).next().text().split(",");
						});
						TimeTree({"data":data});
					}
				}
			},
			/*consumer*/
			"consumer"   :{
				/*consumer-home*/
				"home"     :{
					"init"      :function () {
						BY.tool.language();
						BY.tool.toggleFollow();
						this.colorboxes();
						this.selects();
					},
					"colorboxes":function () {
						$("#J-gallery a").colorbox({
							"rel":"group"
						});
					},
					"selects"   :function () {
						$("#time").bind("change", function () {
							location.href = this.value;
						});
					}
				},
				/*consumer-view*/
				"following":{
					"init":function () {
						BY.tool.language();
						BY.page.regConsumer.following.page();
					}
				},
				"follower" :{
					"init":function () {
						BY.page.consumer.following.init();
						BY.tool.toggleFollow();
					}
				}
			},
			"home"       :{
				"init"       :function () {
					BY.tool.language();
					this.industry();
					/* this.country();*/
					this.slide();
					this.widgetSlide();
				},
				"widgetSlide":function (count) {
					count = count || 8;
					var $slide = $("#J-slide-widget");
					var $left = $slide.find(".left");
					var $right = $slide.find(".right");
					var $ul = $slide.find("ul");
					var blockCount = Math.ceil($ul.find("li").length / count);
					var per = 136;
					if (blockCount > 1) {
						var distance = per * count / 2;
						var max = per * Math.ceil($ul.find("li").length / 2);
						var left = 0;
						var interval = null;
						$ul.width(max);
						max = -max;
						var breakX = $slide.outerWidth() / 2+$slide.offset().left;
						//$(function(){
							//setInterval(function(){
								//left -= distance;
								//if(left >max){
									//$ul.animate({"left":left}, 300);
								//}else{
									//left = 0;
									//$ul.animate({"left":left}, 300);
								//}
							//},5000);
						//});
						$slide.bind("mousemove", function (e) {
							if (e.pageX<breakX) {
								if (left) {
									$left.show();
									$right.hide();
								} else {
									$left.hide();
									$right.hide();
								}
							} else {
								if (left - distance > max) {
									$left.hide();
									$right.show();
								} else {
									$left.hide();
									$right.hide();
								}
							}
						});
						$right.hide().bind("click", function () {
							left -= distance;
							if (left >= max) {
								$ul.animate({"left":left}, 300);
							} else {
								left += distance;
							}
						});
						$left.hide().bind("click", function () {
							left += distance;
							if (left <= distance) {
								$ul.animate({"left":left}, 300);
							} else {
								left -= distance;
							}
						});
					} else {
						$ul.width(per * count / 2)
						$left.hide();
						$right.hide();
					}

				},
				"slide"      :function () {
					var $slide = $("#J-slide");
					var $parent = $slide.parent();
					var $li = $slide.find("li");
					var length = $li.length;
					var per = 980;
					var menuHelper = function () {
						var str = '<ul class="g-slide-menu">';
						for (var item = 0; item < length; item++) {
							str += '<li><a href="javascript:;">•</a></li>'
						}
						str += '</ul>';
						return $(str);
					};
					var $menu = menuHelper().insertAfter($slide);
					var $a = $menu.find("a");
					var $cur = $a.eq(0).addClass("cur");
					var curItem = 0;
					var delay = 5000;
					$li.slice(1).css({"left":per});

					function doMove(num, flag) {
						/*flag hack for firefox*/
						var last = curItem;
						curItem = flag ? num : (curItem + 1) % length;
						$li.eq(last).animate({"left":-per}, 500, function () {
							$(this).css({"left":per});
						});
						$li.eq(curItem).animate({"left":0}, 500, function () {
							$cur.removeClass("cur");
							$cur = $a.eq(curItem).addClass("cur").removeClass("moving");
						});
					}

					var interval = setInterval(doMove, delay);
					$parent.bind("mouseenter",function () {
						interval && clearInterval(interval);
					}).bind("mouseleave", function () {
							interval = setInterval(doMove, delay);
						});
					$menu.delegate("a:not(.cur)", "click", function () {
						if (!$(this).hasClass("moving")) {
							$a.removeClass("moving");
							$(this).addClass("moving");
							doMove($(this).parent().index(), true);
						}
					});
				},
				/*more industry*/
				"industry"   :function () {
					$("#J-industry").subMenu({
						"wrap"      :$(".g-frame").eq(0),
						"width"     :390,
						"left"      :-296,
						"paddingTop":7
					})
				},
				/*more country*/
				"country"    :function () {
					$("#J-country").subMenu({
						"wrap" :$(".g-frame").eq(0),
						"width":50,
						"left" :-32
					})
				}
			},
			/*industry*/
			"industry"   :{
				/*industry.html*/
				"home"     :{
					"init"    :function () {
						BY.tool.language();
						this.nation();
						this.category();
						BY.page.home.widgetSlide(10);
						this.banner();
					},
					banner:function(){
						var cur = 0;
						var $li = $("#J-slide li");
						var slide = function(){
							$li.eq(!cur).css({'left':600}).animate({'left':0},2000);
							$li.eq(cur).animate({'left':-600},2000);
							cur = !cur;
						};
						setInterval(slide,4000)
					},
					/*more category*/
					"category":function () {
						$("#J-category").subMenu({
							"wrap"      :$(".g-frame").eq(0),
							"width"     :390,
							"left"      :-370,
							"paddingTop":2
						})
					},
					/*more nation*/
					"nation"  :function () {
						$("#J-nation").subMenu({
							"wrap"      :$(".g-frame").eq(0),
							"paddingTop":3
						})
					}
				},
				"more"     :{
					"init":function () {
						BY.page.industry.home.init();
					}
				},
				"celebrity":{
					"init":function () {
						BY.page.industry.home.init();
					}
				}
			},
			"regbrand"   :{
				/*save brands*/
				"brands"     :{
					/*save brands add*/
					"add"    :{
						"init":function () {
							this.upload();
							this.banner();
							this.datepicker();
							this.form();
							this.manager();
							$(function(){
								$(document).keydown(function(e){
									if(e.which == 8){
										e.preventDefault();
									}
								});
							});
							/*
							 this.multiple();*/
						}, /*
						 "multiple":function(){
						 $("#J-multi-industry").multiSelect();
						 },*/

						"manager"   :function () {
							var $btn = $("#J-manage").tipsy({"gravity":"s", "trigger":"manual"});
							var $img = $btn.closest("td").find("img");
							var o = BY.tool.triggerFile.call(
								$btn,
								"Recommend Size : 120x120 pixels\nImage Type : png jpg or jpeg",
								"file",
								null,
								{
									"beforeSubmit":function () {
										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										o.$form.busy({"method":"hide"});
										if (!json.status) {
											json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
										}
										if (json.status == 200) {
											$img[0].src = json.url;
											json.update && (o.$form[0].action = json.update);
											BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
										}
									}
								}
							);
						},
						"datepicker":function () {
							var $date = $("#J-date").tipsy({"gravity":"s", "trigger":"manual"}).DatePicker({
								format    :'Y-m-d',
								date      :new Date(),
								current   :new Date(),
								"starts"  :1,
								position  :'r',
								"onChange":function (formated, dates) {
									$date.val(formated).DatePickerHide();
								}
							});
						},
						"banner"    :function () {
							var $btn = $("#J-banner").tipsy({"gravity":"s", "trigger":"manual"});
							var $img = $btn.closest("td").find("img");
							var o = BY.tool.triggerFile.call(
								$btn,
								"click to upload banner",
								"file",
								null,
								{
									"beforeSubmit":function () {

										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										o.$form.busy({"method":"hide"});
										if (!json.status) {
											json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
										}
										if (json.status == 200) {
											$img[0].src = json.url;
											json.update && (o.$form[0].action = json.update);
											BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
										}
									}
								}
							);
						},
						"upload"    :function () {
							var $btn = $("#J-upload").tipsy({"gravity":"s", "trigger":"manual"});
							var $navImg = $(".g-sidebar img");
							var $menuImg = $(".global-toolbar img");
							var $img = $btn.closest("td").find("img");
							var o = BY.tool.triggerFile.call(
								$btn,
								"click to upload photo",
								"file",
								null,
								{
									"beforeSubmit":function () {
										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										o.$form.busy({"method":"hide"});
										if (!json.status) {
											json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
										}
										if (json.status == 200) {
											$img[0].src = json.url;
											$navImg[0].src = json.url;
											$menuImg[0].src = json.url.replace("150x150", "60x60")
											json.update && (o.$form[0].action = json.update);
											BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
										}
									}
								}
							);
						},
						"form"      :function () {
							var $form = $("#J-form");
							$("#J-name").attr("original-title", "Please enter 1-100 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-info").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-number").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-product").attr("original-title", "Please enter 1-500 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-email").attr("original-title", "Please enter an email").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-site").attr("original-title", "Please enter a website").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-desc-s").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-desc").tipsy({"gravity":"w", "trigger":"focus"});
							var $save = $("#J-submit").tipsy({"gravity":"s", "trigger":"focus"});
							var $loadDom = $form.parent();
							var validator = $form.validate({
								"submitHandler":function (form) {
									$loadDom.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
									var _start = new Date;
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$loadDom.busy({"method":"hide"});
										});
										if (json.status == 200) {
											if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($save, json.errors[i]);
													}
												}
												$form.find(".error:eq(0)").trigger("focus");
											} else {
												BY.tool.delayTipsy($save, "Update Successful");
												if(json.moviewall.confirm == true){
													var confirm = window.confirm("Next step, Would you like to edit the movie wall?");
													if(confirm == true){
														location.href = json.moviewall.url;
													}
												}
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"BrandLang[name]"            :{
										"required"   :true,
										"rangelength":[1, 100]
									},
									"Brand[register_information]":{
										"required"   :true,
										"rangelength":[1, 30]
									},
									"Brand[register_number]"     :{
										"required"   :true,
										"rangelength":[1, 30]
									},
									"Brand[date_birthday]"       :{
										"required":true,
										"date"    :true
									},
									"Brand[products]"            :{
										"required"   :true,
										"rangelength":[1, 500]
									},
									"Brand[email]"               :{
										"required":true,
										"email"   :true
									},
									"Brand[site]"                :{
										"required":true,
										"url"     :true
									},
									"BrandLang[en][desc]"        :{
										"required":true
									}
								},
								"ignore"       :"input:file",
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							BY.tool.triggerFormSubmit($save, $form, validator);
						}
					},
					"current":{
						"init"   :function () {
							this.deletes();
						},
						"deletes":function () {
							BY.form.deletes();
						}
					}
				},
				"brandyond"  :{
					"init"   :function () {
						this.like();
						this.collect();
					},
					"like"   :function () {
						$(".Js-like").bind("click", function () {
							BY.tool.inc("../../../../php-data/brandyond/successful.php", $(this).next());
						})
					},
					"collect":function () {
						$(".Js-collect").bind("click", function () {
							BY.tool.inc("../../../../php-data/brandyond/successful.php", $(this).next());
						})
					}
				},
				"chinaagent" :{
					"home":{
						"init"   :function () {
							this.add();
							this.deletes();
						},
						"add"    :function () {
							var $body = $('#J-body');
							$(".Js-add").bind("click", function () {
								var $tr = $(this).closest("tr");
								$.post(this.href, function (json) {
									$tr.animate({"opacity":0}, 500, function () {
										$(this).find("td:last").html('<a href="' + json.show + '" class="btn-edit"></a>').end().appendTo($body).animate({"opacity":1}, 500)
									})
								}, "json");
								return false;
							});
						},
						"deletes":function () {
							$(".Js-delete").bind("click", function () {
								if (confirm("Would you really want to delete")) {
									var $tr = $(this).closest("tr");
									$.post(this.href, function (json) {
										if (json.status == 200) {
											$tr.animate({"opacity":0}, 500, function () {
												$(this).remove();
											})
										}
									}, "json");
								}
								return false;
							});
						}
					}
				},
				"exhibition" :{
					"add"   :{
						"init"      :function () {
							this.form();
							this.datepicker();
							this.hall();
						},
						"hall"      :function () {
							var $hall = $("#J-hall-wrap");
							var $child = null;
							$("#J-role").bind("change", function () {
								if ($child) {
									$hall.append($child);
									$child = null;
								} else {
									$child = $hall.children().detach();
								}
							});
						},
						"datepicker":function () {
							var $date = $("#J-date").tipsy({"gravity":"s", "trigger":"manual"}).DatePicker({
								format    :'Y-m-d',
								date      :new Date(),
								current   :new Date(),
								"starts"  :1,
								position  :'r',
								"onChange":function (formated, dates) {
									$date.val(formated).DatePickerHide();
								}
							});
						},
						"form"      :function () {
							$("#J-name").attr("original-title", "Please enter 1-100 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-addr").attr("original-title", "Please enter 1-100 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-site").attr("original-title", "Please enter a website url").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-hall").attr("original-title", "Please enter 1-12 number,letters,-,or whitespace").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-number").attr("original-title", "Please enter 1-12 number,letter,- or whitespace").tipsy({"gravity":"w", "trigger":"focus"});
							var $form = $("#J-form");
							var $create = $("#J-create").tipsy({"gravity":"s", "trigger":"manual"});
							var validator = $form.validate({
								"submitHandler":function (form) {
									$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"small"});
									var _start = new Date;
									$.post(form.action, $(form).serialize(), function (json) {
										if (json.status == 200) {
											if (json.redirect) {
												BY.tool.delayTipsy($create, "create Successfully", null, function () {
													location.href = json.redirect;
												})
											} else if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($create, json.errors[i]);
													}
												}
												$form.find(".error:eq(0)").trigger("focus");
												BY.tool.doCover(_start, function () {
													$form.busy({"method":"hide"});
												})
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"Exhibition[name]"   :{
										"required"   :true,
										"rangelength":[1, 100]
									},
									"Exhibition[time]"   :{
										"required":true,
										"date"    :true
									},
									"Exhibition[address]":{
										"required"   :true,
										"rangelength":[1, 100]
									},
									"Exhibition[site]"   :{
										"required":true,
										"url"     :true
									},
									"Exhibition[booth]"  :{
										"required":true,
										"hall"    :true
									},
									"Exhibition[hall]"   :{
										"required":true,
										"hall"    :true
									}
								},
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									var _suc = validator.successList;
									if (_suc) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = _cur.className.replace(/\berror\b/, "");
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											$(_cur.element).addClass("error").attr("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							BY.tool.triggerFormSubmit($create, $form, validator);
						}
					},
					"detail":{
						"init"    :function () {
							this.tab();
							this.redirect();
							this.imports();
							this.disSave();
							this.deletes();
							this.appSend();
							this.notice();
							this.vstAdd();
							this.cusAdd();
						},
						"deletes" :function () {
							$(".Js-delete").live("click", function () {
								if (confirm("Would you rather want to remove this item?")) {
									var parent = $(this).closest("tr");
									$.post(this.href, function (json) {
										if (json.status == 200) {
											parent.animate({"opacity":0}, 500, function () {
												$(this).remove();
											});
										}
									}, "json");
								}
								return false;
							});
						},
						"appSend" :function () {
							var $date = $("#J-date").tipsy({"gravity":"w", "trigger":"manual"}).DatePicker({
								format    :'Y-m-d',
								date      :new Date(),
								current   :new Date(),
								"starts"  :1,
								position  :'r',
								"onChange":function (formated, dates) {
									$date.val(formated).DatePickerHide();
								}
							});
							var $form = $("#J-app-form");
							var $send = $("#J-app-send").tipsy({"gravity":"s", "trigger":"manual"});
							var $company = $("#J-company").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"w", "trigger":"trigger"});
							var $call = $("#J-call");
							var $name = $("#J-name").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"w", "trigger":"trigger"});
							var $email = $("#J-email").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"w", "trigger":"trigger"});
							var $location = $("#J-location").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"w", "trigger":"trigger"});
							var $desc = $("#J-desc").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"w", "trigger":"trigger"});
							var $body = $("#J-app-body");
							/*edit*/
							var defaults = {
								"form" :$form[0].action,
								"$p"   :$("#J-app-tmpl").find("p"),
								"$back":$("#J-app-tmpl").find(".Js-back"),
								"$tr"  :null
							};
							var validator = $form.validate({
								"submitHandler":function (form) {
									$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
									var _start = new Date;
									var isUpdate = $form.hasClass("update");
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$form.busy({"method":"hide"});
											if (json.status == 200) {
												if (json.errors) {
													for (var i in json.errors) {
														var _cur = $form.find('[name*="' + i + '"]');
														if (_cur.length) {
															_cur.attr("original-title", json.errors[i]).addClass("error");
														} else {
															BY.tool.delayTipsy($submit, json.errors[i]);
														}
													}
													$form.find(".error:eq(0)").trigger("focus");
												} else {
													if (isUpdate) {
														var $td = defaults.$tr.find("td");
														$td.eq(0).find("div").text($date.val());
														$td.eq(1).find("div").text($call.val() + $name.val());
														$td.eq(2).find("div").text($desc.val());
													} else {
														defaults.$tr && defaults.$tr.remove();
														$('<tr>' + fnSerialize(json.list) + '</tr>').css({"opacity":0}).appendTo($body).css({"opacity":1}, 500);
													}
													defaults.$tr = null;
													BY.tool.delayTipsy($send, "Successfully");
													defaults.$back.trigger("click");
												}
											}
										});
									}, "json");
									return false;
								},
								"rules"        :{
									"Appointment[time]"     :{
										"required":true,
										"date"    :true
									},
									"Appointment[company]"  :{
										"required"   :true,
										"rangelength":[1, 30]
									},
									"Appointment[name_last]":{
										"required"   :true,
										"rangelength":[1, 30]
									},
									"Appointment[email]"    :{
										"required":true,
										"email"   :true
									},
									"Appointment[address]"  :{
										"required"   :true,
										"rangelength":[1, 30]
									},
									"Appointment[desc]"     :{
										"required"   :true,
										"rangelength":[1, 30]
									}
								},
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									var _suc = validator.successList;
									if (_suc) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});

							function fnSerialize(list) {
								return '<td><div class="w100">' + list[0] + '</div></td><td><div class="w100">' + list[1] + '</div></td><td><div class="320">' + list[2] + '</div></td><td class="tar"><a href="' + list[3] + '" class="btn-edit Js-edit"></a><a href="' + list[4] + '" class="btn-delete Js-delete"></a></td>';
							}

							BY.tool.triggerFormSubmit($send, $form, validator);
							$body.delegate(".Js-edit", "click", function () {
								defaults.$tr = $(this).closest("tr");
								$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
								var _start = new Date;
								$.post(this.href, function (json) {
									BY.tool.doCover(_start, function () {
										if (json.status == 200) {
											defaults.$p.html("Edit an Appointment");
											defaults.$back.show();
											var list = json.list;
											$form.addClass("update");
											$form[0].action = list[0];
											$date.val(list[1]);
											$company.val(list[2]);
											$call.find('option[value="' + list[3] + '"]')[0].selected = true;
											$name.val(list[4]);
											$email.val(list[5]);
											$location.val(list[6]);
											$desc.val(list[7]);
											$form.busy({"method":"hide"});
										}
									})
								}, "json");
								return false;
							});
							defaults.$back.bind("click", function () {
								$form.removeClass("update");
								defaults.$p.html("Add an Appoinment");
								$form.attr("action", defaults.form)[0].reset();
								$(this).hide();
							})

						},
						"tab"     :function () {
							var $refer = $("#J-refer>div");
							var _this = this;
							this.allowUpload = true;
							$("#J-tab").delegate("li", "click", function () {
								$(this).addClass("act").siblings().removeClass("act");
								$refer.eq($(this).index()).show().siblings().hide();
								if (_this.allowUpload && $.trim($(this).text()) == "Customers") {
									_this.upload();
									_this.allowUpload = false;
								}
							});
						},
						"redirect":function () {
							$("#J-redirect").bind("click", function () {
								location.href = this.getAttribute("simHref");
							})
						},
						"imports" :function () {
							var $form = $("#J-dis-form");
							var $body = $("#J-dis-body");
							$("#J-dis-import").bind("click", function () {
								var $this = $(this);
								if ($form.hasClass("loaded")) {
									$form.show();
								} else {
									$this.attr("disabled", "disabled");
									$.get($(this).parent()[0].action, function (json) {
										if (json.status == 200) {
											$form.addClass("loaded");
											$body.html(fnSerialize(json.list));
											$form.show();
										}
									}, "json");
								}
								return false;
							});
							function fnSerialize(list) {
								var _str = '';
								for (var i = 0, _len = list.length; i < _len; i++) {
									_str += '<tr><td>' + list[i][0] + '</td>' +
										'<td><img src="' + list[i][1] + '"/></td>' +
										'<td>' + list[i][2] + '</td><td>' + list[i][3] + '</td>' +
										'<td>' + list[i][4] + '</td>' +
										'<td><input type="checkbox" name="id[]" value="' + list[i][5] + '"/></td></tr>';
								}
								return _str;
							}
						},
						"disSave" :function () {
							var $form = $("#J-dis-form");
							var $body = $("#J-insert-body");
							$("#J-dis-save").tipsy({"gravity":"s", "trigger":"manual"}).bind("click", function () {
								var _input = $form.find("input:checked");
								if (_input.length) {
									var _parent = _input.closest("tr");
									var $this = $(this).attr("disabled", "disabled");
									$.post($form[0].action, $form.serialize(), function (json) {
										if (json.status == 200) {
											_parent.each(function (i, v) {
												var _cur = json.list[i];
												$(this).animate({"opacity":0}, 500, function () {
													$(this).find("td:last").html('<a href="' + _cur[1] + '" class="btn-delete Js-delete"></a>').end().appendTo($body).animate({"opacity":1}, 500);
												})
											});
											setTimeout(function () {
												$this.removeAttr("disabled");
											}, 500)
										}
									}, "json");
								} else {
									BY.tool.delayTipsy($(this), "No product selected");
								}
								return false;
							})
						},
						"notice"  :function () {
							var $form = $("#J-notice-form");
							var $btn = $("#J-notice-save").tipsy({"gravity":"s", "trigger":"manual"}).bind("click", function () {
								$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
								var _start = new Date();
								$.post($form[0].action, $form.serialize(), function (json) {
									BY.tool.doCover(_start, function () {
										$form.busy({"method":"hide"});
										if (json.status == 200) {
											BY.tool.delayTipsy($btn, "Update Successfully");
										}
									});
								}, "json");
								return false;
							})
						},
						"vstAdd"  :function () {
							var $form = $("#J-vst-add");
							var $send = $("#J-vst-submit").tipsy({"gravity":"s", "trigger":"manual"});
							var $body = $("#J-vst-body");
							var $number = $("#J-v-number").attr("original-title", "Please enter 1-12 chars").tipsy({"gravity":"s", "trigger":"focus"});
							var $hall = $("#J-v-hall").attr("original-title", "Please enter 1-12 chars").tipsy({"gravity":"s", "trigger":"focus"});
							var $company = $("#J-v-company").attr("original-title", "Please enter 1-128 chars").tipsy({"gravity":"s", "trigger":"focus"});
							var $brand = $("#J-v-brand").attr("original-title", "Please enter 1-128 chars").tipsy({"gravity":"s", "trigger":"focus"});
							var $desc = $("#J-v-desc").attr("original-title", "Please enter 1-255 chars").tipsy({"gravity":"s", "trigger":"focus"});
							var defaults = {
								"form" :$form[0].action,
								"$tr"  :null,
								"$p"   :$("#J-tmpl-vst").find("strong"),
								"$back":$("#J-tmpl-vst").find(".Js-back")
							};
							var validator = $form.validate({
								"submitHandler":function (form) {
									$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
									var _start = new Date;
									var isUpdate = $form.hasClass("update");
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$form.busy({"method":"hide"});
											if (json.status == 200) {
												if (json.errors) {
													for (var i in json.errors) {
														var _cur = $form.find('[name*="' + i + '"]');
														if (_cur.length) {
															_cur.attr("original-title", json.errors[i]).addClass("error");
														} else {
															BY.tool.delayTipsy($submit, json.errors[i]);
														}
													}
													$form.find(".error:eq(0)").trigger("focus");
												} else {
													if (isUpdate) {
														var $td = defaults.$tr.find("td");
														$td.eq(0).find("div").text($number.val() + $hall.val());
														$td.eq(1).find("div").text($company.val());
														$td.eq(2).find("div").text($brand.val());
														$td.eq(3).find("div").text($desc.val());
													} else {
														defaults.$tr && defaults.$tr.remove();
														$(fnSerialize(json.list)).css({"opacity":0}).appendTo($body).css({"opacity":1}, 500);
													}
													defaults.$tr = null;
													BY.tool.delayTipsy($send, "update successfully");
													defaults.$back.trigger("click");
												}
											}
										});
									}, "json");
									return false;
								},
								"rules"        :{
									"Visiting[booth]"  :{
										"required":true,
										"hall"    :true
									},
									"Visiting[hall]"   :{
										"required":true,
										"hall"    :true
									},
									"Visiting[company]":{
										"required"   :true,
										"rangelength":[1, 128]
									},
									"Visiting[brands]" :{
										"required"   :true,
										"rangelength":[1, 128]
									},
									"Visiting[desc]"   :{
										"required"   :true,
										"rangelength":[1, 255]
									}
								},
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									var _suc = validator.successList;
									if (_suc) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});

							function fnSerialize(list) {
								return '<tr><td><div class="w120">' + list[0] + list[1] + '</div></td><td><div class="w120">' + list[2] + '</div></td><td><div class="w120">' + list[3] + '</div></td><td><div class="w150">' + list[4] + '</div></td><td class="tar"><a href="' + list[5] + '" class="btn-edit Js-edit"></a><a href="' + list[6] + '" class="btn-delete Js-delete"></a></td></tr>'
							}

							BY.tool.triggerFormSubmit($send, $form, validator);
							/*edit*/
							$body.delegate(".Js-edit", "click", function () {
								defaults.$tr = $(this).closest("tr");
								$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
								var _start = new Date;
								$.post(this.href, function (json) {
									BY.tool.doCover(_start, function () {
										if (json.status == 200) {
											defaults.$p.html("Edit Visiting Target");
											defaults.$back.show();
											var list = json.list;
											$form.addClass("update");
											$form[0].action = list[0];
											$number.val(list[1]);
											$hall.val(list[2]);
											$company.val(list[3]);
											$brand.val(list[4]);
											$desc.val(list[5]);
											$form.busy({"method":"hide"});
										}
									})
								}, "json");
								return false;
							});
							defaults.$back.bind("click", function () {
								$form.removeClass("update");
								defaults.$p.html("Add new visiting target");
								$form.attr("action", defaults.form)[0].reset();
								$(this).hide();
							})
						},
						"cusAdd"  :function () {
							var $form = $("#J-cus-form");
							var $submit = $("#J-cus-add").tipsy({"gravity":"s", "trigger":"manual"});
							var $call = $("#J-c-call");
							var $name = $("#J-c-name").attr('original-title', 'Please enter 1-32 chars').tipsy({"gravity":"w", "trigger":"focus"});
							var $company = $("#J-c-company").attr('original-title', 'Please enter 1-128 chars').tipsy({"gravity":"w", "trigger":"focus"});
							var $nation = $("#J-c-nation").attr('original-title', 'Please enter 1-32 chars').tipsy({"gravity":"w", "trigger":"focus"});
							var $email = $("#J-c-email").attr('original-title', 'Please enter an email').tipsy({"gravity":"w", "trigger":"focus"});
							var $website = $("#J-c-website").attr('original-title', 'Please enter an valid url').tipsy({"gravity":"w", "trigger":"focus"});
							var $btn = $("#J-c-upload");
							var $img = $btn.closest("td").find("img");
							var $key = $("#J-c-key").attr('original-title', 'Please enter 1-255 chars').tipsy({"gravity":"w", "trigger":"focus"});
							var $desc = $("#J-c-desc").attr('original-title', 'Please enter 10 least chars').tipsy({"gravity":"w", "trigger":"focus"});
							var $body = $("#J-cus-body");
							var defaults = {
								"form"  :$form[0].action,
								"img"   :$img[0].src,
								"upload":$btn[0].href,
								"$p"    :$("#J-tmpl-cus").find(".title2"),
								"$back" :$("#J-tmpl-cus").find(".Js-back"),
								"$tr"   :null
							};
							var validator = $form.validate({
								"submitHandler":function (form) {
									$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
									var _start = new Date;
									var isUpdate = $form.hasClass("update");
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$form.busy({"method":"hide"});
											if (json.status == 200) {
												if (json.status == 200) {
													if (json.errors) {
														for (var i in json.errors) {
															var _cur = $form.find('[name*="' + i + '"]');
															if (_cur.length) {
																_cur.attr("original-title", json.errors[i]).addClass("error");
															} else {
																BY.tool.delayTipsy($submit, json.errors[i]);
															}
														}
														$form.find(".error:eq(0)").trigger("focus");
													} else {
														if (isUpdate) {
															var $td = defaults.$tr.find("td");
															$td.eq(0).find("img")[0].src = $img[0].src;
															$td.eq(1).find("div").text($call.val() + $name.val());
															$td.eq(2).find("div").text($key.val());
															$td.eq(3).find("div").text($desc.val());
														} else {
															defaults.$tr && defaults.$tr.remove();
															$(fnSerialize(json.list)).css({"opacity":0}).appendTo($body).css({"opacity":1}, 500)
														}
														defaults.$tr = null;
														BY.tool.delayTipsy($submit, "update successfully");
														defaults.$back.trigger("click");
													}
												}
											}
										});
									}, "json");
									return false;
								},
								"rules"        :{
									"Customer[name_last]" :{
										"required"   :true,
										"rangelength":[1, 32]
									},
									"Customer[company]"   :{
										"required"   :true,
										"rangelength":[1, 128]
									},
									"Customer[country]"   :{
										"required"   :true,
										"rangelength":[1, 32]
									},
									"Customer[email]"     :{
										"required":true,
										"email"   :true
									},
									"Customer[site]"      :{
										"required":true,
										"url"     :true
									},
									"Customer[desc_short]":{
										"required"   :true,
										"rangelength":[1, 255]
									},
									"Customer[desc]"      :{
										"required" :true,
										"minlength":10
									}
								},
								"ignore"       :"input:file",
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									var _suc = validator.successList;
									if (_suc) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});

							function fnSerialize(list) {
								return '<tr><td><img src="' + list[0] + '" width="60" height="60"/></td><td><div class="w100">' + list[1] + '</div></td><td><div class="w100">' + list[2] + '</div></td><td><div class="w240">' + list[3] + '</div></td><td class="tar"><a href="list[4]" class="btn-edit Js-edit"></a><a href="' + list[5] + '" class="btn-delete Js-delete"></a></td></tr>'
							}

							BY.tool.triggerFormSubmit($submit, $form, validator);
							$body.delegate(".Js-edit", "click", function () {
								defaults.$tr = $(this).closest("tr");
								$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
								var _start = new Date;
								$.post(this.href, function (json) {
									BY.tool.doCover(_start, function () {
										if (json.status == 200) {
											defaults.$p.html("Edit Consumer");
											defaults.$back.show();
											var list = json.list;
											$form.addClass("update");
											$form[0].action = list[0];
											$call.find('option[value="' + list[1] + '"]')[0].selected = true;
											$name.val(list[2]);
											$company.val(list[3]);
											$nation.val(list[4]);
											$email.val(list[5]);
											$website.val(list[6]);
											$img[0].src = list[7];
											window.formCache[0].$form[0].action = list[8];
											$key.val(list[9]);
											$desc.val(list[10]);
											$form.busy({"method":"hide"});
										}
									})
								}, "json");
								return false;
							});
							defaults.$back.bind("click", function () {
								defaults.$p.html("Add new Customers");
								$form.attr("action", defaults.form)[0].reset();
								$img[0].src = defaults.img;
								$form.removeClass("update");
								window.formCache[0].$form[0].action = defaults.upload;
								$(this).hide();
							})
						},
						"upload"  :function () {
							var $btn = $("#J-c-upload");
							var $img = $btn.closest("td").find("img");
							var o = BY.tool.triggerFile.call(
								$btn,
								"click to upload photo",
								"file",
								null,
								{
									"beforeSubmit":function () {
										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										o.$form.busy({"method":"hide"});
										if (!json.status) {
											json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
										}
										if (json.status == 200) {
											$img[0].src = json.url;
											if (json.update) {
												o.$form[0].action = json.update;
												o.$form.addClass("created");
											}
											BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
										}
									}
								},
								$btn.closest(".tmpl")
							);
						}
					}
				},
				"gallery"    :{
					"certification":{
						"init":function () {
							BY.page.regAgent.gallery.certification.init();
						}
					},
					"company"      :{
						"init":function () {
							BY.page.regAgent.gallery.company.init();
						}
					},
					"represent"    :{
						"init":function () {
							BY.page.regAgent.gallery.represent.init();
						}
					},
					"team"         :{
						"init":function () {
							BY.page.regAgent.gallery.team.init();
						}
					},
					"timetree"     :{
						"init":function () {
							BY.page.regAgent.gallery.timetree.init();
						}
					}
				},
				"fans"       :{
					"init":function () {
						BY.page.agent.myfans.event();
					}
				},
				"page"       :{
					"home":{
						"init"          :function () {
							this.myPageSearch();
							this.favoriteSearch();
							this.deletes();
							this.toggleFollow();
							this.recommend();
						},
						"deletes"       :function () {
							$(".Js-delete").live("click", function () {
								var $this = $(this);
								$.post(this.href, function () {
									$this.attr("original-title", "delete successful").tipsy({"trigger":"manual", "gravity":"s"}).tipsy("show");
									setTimeout(function () {
										$this.tipsy("hide");
										$this.closest("li").animate({"opacity":"0"}, 1000, function () {
											$(this).remove();
										})
									}, 1000)
								}, "json");
								return false;
							})
						},
						"myPageSearch"  :function () {
							var $form = $("#J-form-my");
							var $list = $("#J-list-my");
							$("#J-srh-my").bind("click", function () {
								$.get($form[0].action, $form.serialize(), function (json) {
									if (json.status == 200) {
										$list.html(fnSerialize(json.list));
									}
								}, "json");
							});
							function fnSerialize(list) {
								var str = '';
								for (var i = 0, _len = list.length; i < _len; i++) {
									str += '<li><img src="' + list[i][0] + '">' +
										'<div>' + list[i][1] + '</div>' +
										'<a href="' + list[i][2] + '" class="Js-delete">delete</a></li>';
								}
								return str;
							}
						},
						"favoriteSearch":function () {
							var $form = $("#J-form-favorite");
							var $list = $("#J-list-favorite");
							$("#J-srh-favorite").bind("click", function () {
								$.post($form[0].action, $form.serialize(), function (json) {
									if (json.status == 200) {
										$list.html(fnSerialize(json.list));
									}
								}, "json");
							});
							function fnSerialize(list) {
								var str = '';
								for (var i = 0, _len = list.length; i < _len; i++) {
									str += '<li><img src="' + list[i][0] + '">' +
										'<div>' + list[i][1] + '</div>' +
										'<a href="' + list[i][2] + '" class="Js-unfollow">Followed</a></li>';
								}
								return str;
							}
						},
						"toggleFollow"  :function () {
							$(".Js-unfollow").live("click", function () {
								var $this = $(this);
								if ($this.text() == "Followed") {
									$.post(this.href, function (json) {
										if (json.status == 200) {
											$this.text("Follow");
										}
									}, "json")
								} else {
									$.post(this.href, function (json) {
										if (json.status == 200) {
											$this.text("Followed");
										}
									}, "json")
								}
								return false;
							})
						},
						"recommend"     :function () {
							var $list = $("#J-list-favorite");
							$("#J-recommend").delegate("input", "change", function () {
								var $this = $(this);
								var $parent = $this.parent();
								$.post(this.value, function (json) {
									if (json.status == 200) {
										$parent.appendTo($list).find("input").remove();
										$('<a href="javascript:;" class="Js-unfollow">Followed</a>').appendTo($parent);
									}
								}, "json")
							})
						}
					},
					"make":{
						"init":function () {
							this.cache = $();
							this.file();
							this.form();
						},
						"file":function () {
							var _self = this;
							$(".Js-file").tipsy({"gravity":"s", "trigger":"manual"}).each(function () {
								var $img = $(this).prev().length ? $(this).prev() : $(this).parent().prev();
								var $btn = $(this);
								var o = BY.tool.triggerFile.call(
									$btn,
									"click to upload photo",
									"file",
									null,
									{
										"beforeSubmit":function () {
											if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
												BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
													o.$form.busy({"method":"hide"});
												});
												return false;
											}
										},
										"success"     :function (json) {
											o.$form.busy({"method":"hide"});
											if (!json.status) {
												json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
											}
											if (json.status == 200) {
												$img[0].src = json.url;
												if (json.update) {
													o.$form[0].action = json.update;
													o.$form.addClass("created");
													_self.cache = _self.cache.filter(":not(.created)");
												}
												BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
											}
										}
									}
								);
								_self.cache = _self.cache.add(o.$form);
							});
						},
						"form":function () {
							var $form = $("#J-form");
							var _self = this;
							$("#J-name").attr({"original-title":"Please enter 1-30 chars"}).tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-kw").attr({"original-title":"Please enter 1-30 chars"}).tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-desc").tipsy({"gravity":"w", "trigger":"focus"});
							var $submit = $("#J-submit").tipsy({"gravity":"s", "trigger":"manual"});
							var validator = $form.validate({
								"submitHandler":function (form) {
									$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
									var _start = new Date;
									$.post(form.action, $form.serialize(), function (json) {
										$form.busy({"method":"hide"});
										if (json.status == 200) {
											if (json.id) {
												form.action = form.update;
												if (_self.cache.length) {
													_self.cache.each(function () {
														this.action = this.action.replace(/([^/]*)$/, json.id + "/$1");
													});
												}
											}
											if (json.redirect) {
												BY.tool.delayTipsy($submit, "make successfylly", null, function () {
													location.href = json.redirect;
												});
											} else if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($submit, json.errors[i]);
													}
												}
												$form.find(".error:eq(0)").trigger("focus");
											} else {
												if ($("#J-back").length) {
													BY.tool.delayTipsy($submit, "Update successfylly", null, function () {
														location.href = $("#J-back")[0].href;
													});
												} else {
													BY.tool.delayTipsy($submit, "Update successfylly");
												}
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"PageForm[name]"        :{
										"required"   :true,
										"rangelength":[1, 30]
									},
									"PageForm[keywords]"    :{
										"required"   :true,
										"rangelength":[1, 30]
									},
									"PageForm[introduction]":{
										"required":true
									}
								},
								"ignore"       :"input:file",
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									/*处理错误*/
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							BY.tool.triggerFormSubmit($submit, $form, validator);
						}
					}
				},
				"product"    :{
					"home":{
						"init"   :function () {
							this.search();
							this.deletes();
						},
						"search" :function () {
							var $form = $("#J-form"),
								$result = $("#J-result"),
								action = $form[0].action;
							$("#J-input input").bind("focusout", fnPost);
							$("#J-input select").bind("change", fnPost);
							function fnPost(e) {
								$.get(action, $form.serialize(), function (json) {
									if (json.status == 200) {
										$result.html(fnSerialize(json.list));
									}
								}, "json")
							}

							function fnSerialize(list) {
								var str = '';
								var handleStr = '<td><a class="btn-edit" href="javascript:;"></a><a class="btn-delete" href="javascript:;"></a></td>';
								for (var item = 0, _len = list.length; item < _len; item++) {
									str += '<tr>' +
										'<td>' + list[item][0] + '</td>' +
										'<td><img src="' + list[item][1] + '"/></td>' +
										'<td>' + list[item][2] + '</td>' +
										'<td>' + list[item][3] + '</td>' +
										'<td>' + list[item][4] + '</td>' +
										'<td><a class="btn-edit" href="' + list[item][5] + '"></a><a class="btn-delete Js-delete" href="' + list[item][6] + '"></a></td>' +
										'</tr>';
								}
								return str;
							}
						},
						"deletes":function () {
							$(".Js-delete").live("click", function () {
								var $this = $(this);
								$.post(this.href, function (json) {
									if (json.status == 200) {
										$this.closest("tr").animate({"opacity":"0"}, 1000, function () {
											$(this).remove();
										})
									}
								}, "json");
								return false;
							})
						}
					},
					"add" :{
						"init"    :function () {
							this.cache = $();
							this.file();
							this.moreFile();
							this.form();
							this.select();
						},
						"select"  :function () {
							var cache = {};
							var $first = $("#J-first");
							var $second = $("#J-second");
							var $third = $("#J-third");

							function getOptions(p, c, cc) {
								var _basic = p.attr("data-url");
								p.bind("change", function () {
									$(this).find('option[value="0"]').remove();
									var val = this.value;
									if (cache[val]) {
										cache[val] == -1 ? c.hide() : c.show().html(cache[val]);
										if (cc) cc.hide();
									} else {
										$.get(_basic.replace(/\d+/g, val), function (json) {
											if (json.status == 200) {
												cache[val] = fnSerialize(json.categories);
												cache[val] == -1 ? c.hide() : c.show().html(cache[val]);
												if (cc) cc.hide();
											}
										}, "json");
									}
								})
							}

							function fnSerialize(list) {
								if (list) {
									var str = '<option value="0">Please Select ...</option>';
									for (var i = 0, _len = list.length; i < _len; i++) {
										str += '<option value="' + list[i].id + '">' + list[i].name + '</option>';
									}
									return str;
								}
								else {
									return -1;
								}
							}

							getOptions($first, $second, $third);
							getOptions($second, $third);
							$third.bind("change", function () {
								$(this).find('option[value="0"]').remove();
							})
						},
						"file"    :function () {
							var _self = this;
							var $btn = $("#J-upload").tipsy({"gravity":"s", "trigger":"manual"});
							var $img = $btn.closest("td").find("img");
							var o = BY.tool.triggerFile.call(
								$btn,
								"click to upload your product photo",
								"file",
								null,
								{
									"beforeSubmit":function () {
										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										o.$form.busy({"method":"hide"});
										if (!json.status) {
											json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
										}
										if (json.status == 200) {
											$img[0].src = json.url;
											BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
											if (json.update) {
												o.$form[0].action = json.update;
												o.$form.addClass("created");
												_self.cache = _self.cache.filter(":not(.created)");
											}
										}
									}
								}
							);
							this.cache = this.cache.add(o.$form);
						},
						"moreFile":function () {
							var _self = this;
							var $dl = $("#J-form").next();
							$(".Js-file").tipsy({"gravity":"s", "trigger":"manual"}).each(function () {
								var $btn = $(this);
								var $img = $btn.closest("li").find("img");
								var o = BY.tool.triggerFile.call(
									$btn,
									"click to upload your product photos",
									"file",
									null,
									{
										"beforeSubmit":function () {
											if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
												BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
													o.$form.busy({"method":"hide"});
												});
												return false;
											}
										},
										"success"     :function (json) {
											o.$form.busy({"method":"hide"});
											if (!json.status) {
												json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
											}
											if (json.status == 200) {
												$img[0].src = json.url;
												BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
												if (json.update) {
													o.$form[0].action = json.update;
													o.$form.addClass("created");
													_self.cache = _self.cache.filter(":not(.created)");
												}
											}
										}
									},
									$dl
								);
								_self.cache = _self.cache.add(o.$form);
							});
						},
						"form"    :function () {
							var $form = $("#J-form");
							var editor;
							$("#J-name").attr({"original-title":"Please enter 1-100 chars"}).tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-code").attr({"original-title":"Please enter 2-30 chars"}).tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-first,#J-second").tipsy({"gravity":"s", "trigger":"hover"}).bind("change", function () {
								this.setAttribute("original-title", "");
							});
							var $series = $("#J-series").bind("change", function () {
								$(this).find('option[value="0"]').remove();
							});
							var $desc = $("#J-desc");
							var $submit = $("#J-submit").tipsy({"gravity":"s", "trigger":"manual"});
							var _self = this;
							KindEditor.ready(function (K) {
								editor = K.create('#J-desc', {
									resizeType           :1,
									allowPreviewEmoticons:false,
									allowImageUpload     :false,
									items                :[
										'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic',
										'underline',
										'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright',
										'insertorderedlist',
										'insertunorderedlist'
									]
								});
							});
							var validator = $form.validate({
								"submitHandler":function (form) {
									$desc.val(editor.html());
									$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
									var _start = new Date;
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$form.busy({"method":"hide"});
										});
										if (json.status == 200) {
											if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($submit, json.errors[i]);
													}
												}
												$form.find(".error:eq(0)").trigger("focus");
											} else {
												if ($("#J-back").length) {
													BY.tool.delayTipsy($submit, "Successfully", 1500, function () {
														location.href = $("#J-back")[0].href;
													});
												} else {
													if (json.id) {
														form.action = json.update;
														_self.cache.each(function () {
															this.action = this.action.replace(/([^/]+?)$/, json.id + "/$1");
														});
													}
													BY.tool.delayTipsy($submit, "Successfully");
												}
											}
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"Product[name]"              :{
										"required"   :true,
										"rangelength":[1, 100]
									},
									"Product[id_brand]"          :{
										"unZero":true
									},
									"Product[id_category_first]" :{
										"unZero":true
									},
									"Product[id_category_second]":{
										"unZero":true
									},
									"Product[code]"              :{
										"required"   :true,
										"rangelength":[2, 30]
									}
								},
								"ignore"       :"input:file",
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									/*处理错误*/
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}

								}
							});
							BY.tool.triggerFormSubmit($submit, $form, validator);
						}
					}
				},
				"setting"    :{
					"init" :function () {
						this.reset();
					},
					"reset":function () {
						var $form = $("#J-form");
						$("#J-name").attr({"original-title":"Please enter 4-30 chars"}).tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-email").attr({"original-title":"Please enter an email"}).tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-pwd").attr({"original-title":"Please enter 6-16 password"}).tipsy({"gravity":"w", "trigger":"focus"});
						var $reset = $("#J-reset").tipsy({"gravity":"s", "trigger":"focus"});
						var setInit = function () {
							$form.find("input").each(function () {
								this.setAttribute("defValue", this.value);
							})
						};
						setInit();
						var updateFlag = false;
						/*验证内容与事件*/
						$.validator.addMethod("notInit", function (v, e) {
							if (e.getAttribute("defValue") != v) {
								updateFlag = true;
							}
							return true;
						}, "update need change the value first");
						var _resetValidator = $form.validate({
							"submitHandler":function (form) {
								if (updateFlag) {
									$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
									var _start = new Date;
									$.post(form.action, $form.serialize(), function (json) {
										$form.busy({"method":"hide"});
										if (json.status == 200) {
											BY.tool.delayTipsy($reset, "update successfully");
											setInit();
											updateFlag = false;
										}
									}, "json");
								} else {
									BY.tool.delayTipsy($reset, "update should change the value first", 2500);
								}
								return false;
							},
							"rules"        :{
								"User[name]"    :{
									"username":true,
									"notInit" :true
								},
								"User[email]"   :{
									"email"  :true,
									"notInit":true
								},
								"User[password]":{
									"password":true,
									"notInit" :true
								}
							},
							"onfocusout"   :false,
							"onkeyup"      :false,
							"onclick"      :false,
							"showErrors"   :function (errorMap, errorList) {
								/*处理正确*/
								var _suc = _resetValidator.successList;
								if (_suc.length) {
									for (var i in _suc) {
										var _cur = _suc[i];
										_cur.className = "";
										_cur.setAttribute("original-title", "");
									}
								}
								/*处理错误*/
								if (errorList.length) {
									for (var i in errorList) {
										var _cur = errorList[i];
										_cur.element.className = "error";
										_cur.element.setAttribute("original-title", _cur.message);
									}
									$form.find(".error:eq(0)").trigger("focus");
								}
							}
						});
						BY.tool.triggerFormSubmit($reset, $form, _resetValidator);
					}
				},
				"storage"    :{
					"init"     :function () {
						this.form();
						this.selectAll();
						this.deletes();
					},
					"deletes"  :function () {
						$("#J-delete").tipsy({"gravity":"s", "trigger":"manual"}).bind("click", function () {
							var _form = $("#J-save-form");
							var $this = $(this);
							var _arr = [];
							var _input = _form.find(":checked");
							_input.each(function (i, v) {
								_arr.push(v.value);
							});
							var _len = _arr.length;
							if (_len) {
								$.post("../../../../php-data/storage/delete.php", {"data":_arr.join(",")}, function (data) {
									if (data.status == 200) {
										_input.closest("tr").animate({"opacity":0}, 1000, function () {
											$(this).remove();
										});
										setTimeout(function () {
											BY.tool.delayTipsy($this, _len + " items has deleted");
										}, 500)
									}
								}, "json");
							} else {
								BY.tool.delayTipsy($this, _len + " items has selected");
							}
						});
					},
					"form"     :function () {
						var _this = this;
						var _form = $("#J-save-form");
						var _focusSrh = _form.find("thead input");
						var _tbody = _form.find("tbody");
						var _lastPost;
						_focusSrh.bind("focusout", function () {
							if (_lastPost) _lastPost.abort();
							_lastPost = $.get(_form[0].action, _form.serialize(), function (json) {
								if (json.status == 200) {
									_tbody.html(serializeDataHelper(json.list, json.list.length));
								}
							}, "json");
						});
						_focusSrh.bind("keyup", function (e) {
							if (e.keyCode == 13) {
								$(this).trigger("focusout");
							}
						});
						function serializeDataHelper(data, len) {
							var str = '';
							for (var i = 0; i < len; i++) {
								str += '<tr><td>' + data[i][0] + '</td><td><img src="' + data[i][1] + '"/></td> <td>' + data[i][2] + '</td><td>' + data[i][3] + '</td><td>' + data[i][4] + '</td><td><input type="checkbox" value="' + data[i][5] + '" /></td></tr>'
							}
							return str;
						}
					},
					"selectAll":function () {
						var _form = $("#J-save-form");
						$("#J-all").bind("click", function () {
							_form.find(":checkbox").each(function () {
								this.checked = true;
							})
						})
					}
				},
				"following"  :{
					"init":function () {
						BY.page.regConsumer.following.init();
					}
				},
				"follower"   :{
					"init":function () {
						BY.page.regConsumer.follower.init();
					}
				},
				"requirement":{
					"init"    :function () {
						this.defaults();
						this.form();
					},
					"defaults":function () {
						var _arr = [
							"Please write down your other requirments here ....",
							"Please write down what you can support...."
						];
						$("textarea").each(function (i) {
							BY.tool.placeHolder.call($(this), _arr[i]);
						});
					},
					"form"    :function () {
						$("#J-year").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-other").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-support").tipsy({"gravity":"w", "trigger":"focus"});
						var $form = $("#J-form");
						var $submit = $("#J-submit").tipsy({"gravity":"s", "trigger":"focus"});
						var validator = $form.validate({
							"submitHandler":function (form) {
								$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
								var _start = new Date;
								$.post(form.action, $form.serialize(), function (json) {
									BY.tool.doCover(_start, function () {
										$form.busy({"method":"hide"});
									});
									if (json.status == 200) {
										if (json.errors) {
											for (var i in json.errors) {
												var _cur = $form.find('[name*="' + i + '"]');
												if (_cur.length) {
													_cur.attr("original-title", json.errors[i]).addClass("error");
												} else {
													BY.tool.delayTipsy($submit, json.errors[i]);
												}
											}
											$form.find(".error:eq(0)").trigger("focus");
										} else {
											BY.tool.delayTipsy($submit, "update successfully")
										}
									} else if (json.status == 405) {
										alert("Get method is not allowed");
									}
								}, "json");
								return false;
							},
							"rules"        :{
								"RequirementForm[dateSetUp]"       :{
									"required":true,
									"range"   :[1900, (new Date).getFullYear()]
								},
								"RequirementForm[otherRequirement]":{
									"required":true
								},
								"RequirementForm[support]"         :{
									"required":true
								}
							},
							"onfocusout"   :false,
							"onkeyup"      :false,
							"onclick"      :false,
							"showErrors"   :function (errorMap, errorList) {
								/*处理正确*/
								var _suc = validator.successList;
								if (_suc.length) {
									for (var i in _suc) {
										var _cur = _suc[i];
										_cur.className = "";
										_cur.setAttribute("original-title", "");
									}
								}
								if (errorList.length) {
									for (var i in errorList) {
										var _cur = errorList[i];
										_cur.element.className = "error";
										_cur.element.setAttribute("original-title", _cur.message);
									}
									$form.find(".error:eq(0)").trigger("focus");
								}
							}
						});
						BY.tool.triggerFormSubmit($submit, $form, validator);
					}
				},
				"fakekiller" : {
					"init" : function(){
						var editor;
						KindEditor.ready(function(K) {
							editor = K.create('#J-desc', {
								resizeType           :1,
								allowPreviewEmoticons:false,
								allowImageUpload     :false,
								items                :[
									'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic',
									'underline',
									'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright',
									'insertorderedlist',
									'insertunorderedlist', '|', 'emoticons', 'image'
								]
							});
						});
					}
				},
				"timetree"   :{
					"add" :{
						"init"      :function () {
							this.upload();
							this.form();
							this.datepicker();
						},
						"upload"    :function () {
							var $btn = $("#J-upload").tipsy({"gravity":"s", "trigger":"manual"});
							var $img = $btn.closest("td").find("img");
							var _self = this;
							this.cache = null;
							var o = BY.tool.triggerFile.call(
								$btn,
								"Recommend Size : 100x100 pixels\nImage Type : png jpg or jpeg",
								"file",
								null,
								{
									"beforeSubmit":function () {
										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										o.$form.busy({"method":"hide"});
										if (!json.status) {
											json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
										}
										if (json.status == 200) {
											$img[0].src = json.url;
											if (json.update) {
												o.$form[0].action = json.update;
												o.$form.addClass("created");
												_self.cache = _self.cache.filter(":not(.created)");
											}
											BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
										}
									}
								},
								$(".ra-t-add-wrap")
							);
							this.cache = o.$form;
						},
						"datepicker":function () {
							var $date = $("#J-date").tipsy({"gravity":"s", "trigger":"manual"}).DatePicker({
								format    :'Y-m-d',
								date      :new Date(),
								current   :new Date(),
								"starts"  :1,
								position  :'r',
								"onChange":function (formated, dates) {
									$date.val(formated).DatePickerHide();
								}
							});
						},
						"form"      :function () {
							var $form = $("#J-add-form");
							var $save = $("#J-save").tipsy({"gravity":"s", "trigger":"focus"});
							$("#J-topic").attr("original-title", "enter 1-200 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-content").tipsy({"gravity":"w", "trigger":"focus"});
							var _self = this;
							var validator = $form.validate({
								"submitHandler" :function (form) {
									$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
									var _start = new Date;
									$.post(form.action, $form.serialize(), function (json) {
										if (json.status == 200) {
											if (json.errors) {
												BY.tool.doCover(_start, function () {
													$form.busy({"method":"hide"});
												});
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($save, json.errors[i]);
													}
												}
											} else {
												BY.tool.delayTipsy($save, "Successfully", null, function () {
													location.href = $("#J-back")[0].href;
												});
												/*if (json.id) {
												 form.action = json.update;
												 if (_self.cache.length) {
												 _self.cache.each(function () {
												 this.action = this.action.replace(/([^/]*)$/, json.id + "/$1");
												 });
												 }
												 }
												 BY.tool.delayTipsy($save, "Successfully")*/
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"         :{
									"TimeLineForm[topic]"     :{
										"required"   :true,
										"rangelength":[1, 200]
									},
									"TimeLineForm[date_start]":{
										"required":true,
										"date"    :true
									},
									"TimeLineForm[content]"   :{
										"required":true
									}
								},
								"ignore"        :"input:file",
								"onfocusout"    :false,
								"onkeyup"       :false,
								"onclick"       :false,
								"errorPlacement":function (label, element) {
									element.attr("original-title", label.text());
								}
							});
							BY.tool.triggerFormSubmit($save, $form, validator);
						}
					},
					"home":{
						"init"      :function (name) {
							this.datepicker();
							this.deletes();
							this.search();
							this.edit(name || "btn-blue");
							this.cancel();
							this.tmpl = '<img src="{0}" class="fl" width="48" height="48"/><div class="left"><h3>{1}</h3><p>{2}</p></div><div class="right"><div><a href="{7}" class="btn-edit Js-edit"></a><a href="{8}" class="btn-delete Js-delete"></a></div><p>{6}</p></div>';
						},
						"datepicker":function () {
							var date = new Date();
							var to2range = function (number) {
								return +number > 9 ? +number : '0' + number;
							}
							var serializeTime = function (date) {
								return date.getFullYear() + "-" + to2range(date.getMonth() + 1) + "-" + to2range(date.getDate());
							};
							var _str = serializeTime(date);
							var $to = $("#J-to").val(_str).tipsy({"gravity":"s", "trigger":"manual"});
							var date2 = new Date();
							date2.setMonth(date2.getMonth() - 1);
							var _str2 = serializeTime(date2);
							var $from = $("#J-from").val(_str2).tipsy({"gravity":"s", "trigger":"manual"});
							var fromtime = date, totime = date2;
							$from.DatePicker({
								format      :'Y-m-d',
								"date"      :_str,
								"current"   :_str,
								"starts"    :1,
								position    :'r',
								onBeforeShow:function () {
									$from.DatePickerSetDate($from.val(), true);
								},
								"onChange"  :function (formated, dates) {
									if (!totime || totime > dates) {
										$from.val(formated);
										$from.DatePickerHide();
										fromtime = dates;
									} else {
										$from.DatePickerHide();
										BY.tool.delayTipsy($from, "from Time must smaller than to Time", 4000);
									}
								}
							});
							$to.DatePicker({
								format      :'Y-m-d',
								"date"      :_str2,
								"current"   :_str2,
								"starts"    :1,
								position    :'r',
								onBeforeShow:function () {
									$to.DatePickerSetDate($to.val(), true);
								},
								"onChange"  :function (formated, dates) {
									if (!fromtime || dates > fromtime) {
										$to.val(formated);
										$to.DatePickerHide();
										totime = dates;
									} else {
										$to.DatePickerHide();
										BY.tool.delayTipsy($to, "to Time must bigger than from Time", 4000);
									}
								}
							});
						},
						"cancel"    :function () {
							$(".Js-cancel").live("click", function () {
								$(this).closest("li").hide().prev().show();
							})
						},
						"deletes"   :function () {
							$(".Js-delete").live("click", function () {
								var $li = $(this).closest("li");
								$.post(this.href, function (json) {
									if (json.status == 200) {
										$li.animate({"opacity":0}, 1000, function () {
											$(this).remove();
										});
									}
								}, "json");
								return false;
							})
						},
						"edit"      :function (btnname) {
							var tmpl = '<li class="J-edit-time"><form action="{0}" class="vat ra-t-edit-form"><table><tr><td class="tar">Subject:</td><td><input type="text" name="TimeLineForm[topic]" value="{1}"/></td></tr><tr class="tar"><td>Content:</td><td><textarea name="TimeLineForm[content]" rows="6">{2}</textarea></td></tr></table><table><tr><td>Replace head sculpture:</td><td><div><img src="{3}" width="80" height="80"/><a href="{4}" class="' + btnname + ' btn-total Js-file"><b></b>Browse<em></em></a></div></td></tr></table><div class="tar"><a href="javascript:;" class="Js-cancel">cancel</a><a href="javascript:;" class="' + btnname + ' btn-total Js-update"><b></b>Update<em></em></a></div></form></li>';
							var _self = this;
							$(".Js-edit").live("click", function () {
								var $li = $(this).closest("li");
								if ($li.hasClass("loaded")) {
									$li.hide();
									$li.next().show();
								} else {
									$.post(this.href, function (json) {
										if (json.status == 200) {
											var $editItem = $(fnSerialize(json.list));
											$li.after($editItem);
											$li.hide().addClass("loaded");
											_self.file($editItem);
											_self.form($editItem);
										}
									}, "json")
								}
								return false;
							});
							function fnSerialize(list) {
								return tmpl.replace(/({.*?})/g, function (regStr) {
									return list[regStr.slice(1, -1)];
								})
							}
						},
						"file"      :function (dom) {
							var $btn = dom.find(".Js-file").tipsy({"gravity":"s", "trigger":"manual"});
							var $form1 = dom.find("form");
							var $img = $btn.closest("td").find("img");
							var o = BY.tool.triggerFile.call(
								$btn,
								"click to update this photo",
								"file",
								null,
								{
									"beforeSubmit":function () {
										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										o.$form.busy({"method":"hide"});
										$form1.removeClass("uploading")
										if (!json.status) {
											json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
										}
										if (json.status == 200) {
											$form1.attr("url", json.url);
											$img[0].src = json.url;
											json.update && (o.$form[0].action = json.update);
											BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
										}
									}
								});
							o.$file.bind("change", function () {
								$form1.addClass("uploading");
							})
						},
						"form"      :function (dom) {
							var $form = dom.find(">form");
							var $update = dom.find(".Js-update").tipsy({"gravity":"s", "trigger":"focus"});
							var $input = dom.find("input:text").attr("original-title", "enter a name").tipsy({"gravity":"s", "trigger":"focus"});
							var $textarea = dom.find("textarea").attr("original-title", "enter a description").tipsy({"gravity":"w", "trigger":"focus"});
							var _self = this;
							var fnSerialize = function (list) {
								return _self.tmpl.replace(/({.*?})/g, function (regStr) {
									return list[regStr.slice(1, -1)];
								});
							};
							var validator = $form.validate({
								"submitHandler":function (form) {
									$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
									var _start = new Date;
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$form.busy({"method":"hide"});
										});
										if (json.status == 200) {
											if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($update, json.errors[i]);
													}
												}
												$form.find(".error:eq(0)").trigger("focus");
											} else {
												var _pre = $form.parent().hide().prev();
												$form.attr("url") && (_pre.find("img")[0].src = $form.attr("url"));
												_pre.find("h3").html($input.val());
												_pre.find(".left p").html($textarea.val());
												_pre.show();
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"TimeLineForm[topic]"  :{
										"required":true
									},
									"TimeLineForm[content]":{
										"required":true
									}
								},
								"ignore"       :"input:file",
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							$update.bind("click", function (e) {
								e.preventDefault();
								if ($form.hasClass("uploading")) {
									BY.tool.delayTipsy($(this), "Plase Wait for the image uploaded");
									return false;
								}
								if (validator.form()) {
									$form.submit();
								}
								return false;
							});
						},
						"search"    :function () {
							var $form = $("#J-form");
							var $result = $("#J-result");
							var $wrap = $result.find("ul");
							var _self = this;

							function fnSerialize(list) {
								var str = '';
								for (var i = 0; i < list.length; i++) {
									str += '<li>' + _self.tmpl.replace(/({.*?})/g, function (regStr) {
										return list[i][regStr.slice(1, -1)];
									}) + '</li>';
								}
								return str;
							}

							$("#J-srh").bind("click", function () {
								$.post($form[0].action, $form.serialize(), function (json) {
									if (json.status == 200) {
										if (json.list) {
											$wrap.html(fnSerialize(json.list));
										} else {
											$wrap.html('<p>This search range from <strong>' + $("#J-from").val() + '</strong> to <strong>' + $("#J-to").val() + '</strong> hasn\'t any event</p>');
										}
										$result.show();
									}
								}, "json")
							});
							$("#J-srh").trigger("click");
						}
					}
				},
				"series"     :{
					"init"  :function () {
						this.update();
						this.add();
					},
					"update":function () {
						$("#J-body").delegate("tr", "mouseover",function () {
							$(this).addClass("edit");
							$(this).find("input").removeAttr("disabled");
						}).delegate("tr", "mouseleave",function () {
								$(this).removeClass("edit");
							}).find("input").each(function () {
								$(this).attr("defVal", this.value);
								$(this).tipsy({"gravity":"s", "trigger":"focus"});
							}).end().find(".Js-update").each(function () {
								$(this).tipsy({"gravity":"w", "trigger":"manual"});
							}).end().delegate(".Js-update", "click",function () {
								var $this = $(this);
								var _input = $(this).closest("tr").find("input");
								var $form = _input.parent();
								var _val = _input.val();
								if (_val == _input.attr("defVal")) {
									BY.tool.delayTipsy($this, "Save change", 3000);
									return false;
								}
								/*validate*/
								if (/^.{1,30}$/.test(_val)) {
									_input.removeClass("error").attr("original-title", "");
								} else {
									_input.addClass("error").attr("original-title", "Please enter 1-30 chars");
									return false;
								}
								$.post(this.href, $form.serialize(), function (json) {
									if (json.status == 200) {
										BY.tool.delayTipsy($this, "update successfully", 2500);
										_input.attr("defVal", _val);
									}
								}, "json");
								return false;
							}).delegate("input", "keypress", function (e) {
								if (e.keyCode == 13) {
									$(this).closest("tr").find(".Js-update").trigger("click");
								}
							});
					},
					"add"   :function () {
						var _input = $("#J-text").attr("original-title", "Please enter 1-30 chars").tipsy({"trigger":"focus", "gravity":"s"});
						var $body = $("#J-body");
						var $th = $body.find("tr:eq(0)");
						var $form = _input.parent();
						var $add = $("#J-add");
						_input.bind("keypress", function (e) {
							if (e.keyCode == 13) {
								$add.trigger("click");
								return false;
							}
						});
						$add.tipsy({"trigger":"manual", "gravity":"s"}).bind("click", function () {
							var $this = this;
							var _val = _input.val();
							if (/^.{1,30}$/.test(_val)) {
								_input.removeClass("error").attr("original-title", "");
							} else {
								_input.addClass("error").attr("original-title", "Please enter 1-30 chars");
								return false;
							}
							$.post(this.href, $form.serialize(), function (json) {
								if (json.status == 200) {
									if (json.errors) {
										BY.tool.delayTipsy($this, json.errors["Series[name]"], 2500);
									} else {
										var $newItem = $('<tr><td><form action=""><input class="Js-input" type="text" value="' + _val + '" defVal="' + _val + '" name="Series[name]" /></form></td><td><a href="' + json.update + '" class="Js-update btn-update"></a></td></tr>');
										$th.after($newItem.css({"opacity":0}).animate({"opacity":"1"}, 500));
										$newItem.find(".Js-input").tipsy({"trigger":"focus", "gravity":"s"});
										$newItem.find(".Js-update").tipsy({"trigger":"manual", "gravity":"w"});
										_input.val("");
									}
								}
							}, "json");
							return false;
						})
					}
				},
				"wall"       :{
					"init"  :function () {
						this.repeat();
						this.upload();
					},
					"repeat":function () {
						var $repeat = $("#J-repeat");
						var $input = $("#J-list input");
						$("#J-list").delegate("input", "click", function () {
							if (!$(this).hasClass("cur")) {
								$input.removeClass("cur");
								var _src = $(this).addClass("cur").parent().find("img")[0].src.replace(/(\.png)/, "_x$1");
								$.post(this.value, {name:_src.match(/[^/]+$/)[0]}, function (json) {
									if (json.status == 200) {
										$repeat.css("background-image", "url(" + _src + ")");
									}
								}, "json");
							}
						});
					},
					"upload":function () {
						var $img = $("#J-banner");
						var $btn = $("#J-upload").tipsy({"gravity":"s", "trigger":"manual"});
						var o = BY.tool.triggerFile.call(
							$btn,
							"click to upload banner",
							"file",
							null,
							{
								"beforeSubmit":function () {
									if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
										BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
											o.$form.busy({"method":"hide"});
										});
										return false;
									}
								},
								"success"     :function (json) {
									o.$form.busy({"method":"hide"});
									if (!json.status) {
										json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
									}
									if (json.status == 200) {
										$img[0].src = json.url;
										BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
									}
								}
							}
						);
					}
				}
			},
			/*reg-consumer*/
			"regConsumer":{
				/*reg-consumer-brands-brandyond*/
				"brandyond"   :{
					"init":function () {
						BY.page.regbrand.brandyond.init();
					}
				},
				/*reg-consumer-setting*/
				"setting"     :{
					"init":function () {
						BY.page.regbrand.setting.init();
					}
				},
				/*reg-consumer-storage*/
				"storage"     :{
					"init":function () {
						BY.page.regbrand.storage.init();
					}
				},
				"following"   :{
					"init":function () {
						this.pie("Following");
						this.page();
					},
					"pie" :function (title) {
						/*饼图*/
						var arr = [];
						$("#J-data tr:gt(1) td:nth-child(2)").each(function () {
							arr.push(+$(this).text());
						});
						if (arr.length) {
							$("#J-pie").sparkline(
								arr, {
									type     :'pie',
									hackTitle:title,
									"width"  :120,
									"height" :120
								});
						}
					},
					"page":function () {
						$("#J-page").delegate("a", "click", function () {
							var $dl = $(this).closest("dl");
							var $dt = $dl.find("dt");
							$.get(this.href, function (json) {
								if (json.status == 200) {
									$dl.html(fnSerialize(json.data, json.page));
									$dl.prepend($dt);
								}
							}, "json");
							return false;
						});
						function fnSerialize(list, page) {
							var str = '';
							for (var i = 0, _len = list.length; i < _len; i++) {
								str += '<dd><img src="' + list[i][0] + '"/><span>' + list[i][1] + '</span></dd>';
							}
							/*page*/
							str += '<dd class="page">' +
								'<a href="' + page[0] + '">< prev</a>' +
								'<a href="' + page[1] + '">next ></a>' +
								'</dd>';
							return str;
						}
					}
				},
				"follower"    :{
					"init":function () {
						BY.page.regConsumer.following.pie("Followers");
						BY.page.regConsumer.following.page();
					}
				},
				"comment"     :{
					"init"  :function () {
						this.search();
					},
					"search":function () {
						var $form = $("#J-form");
						var $body = $("#J-body");
						$("#J-search").delegate("input", "focusout", fnSrh);
						$("#J-search").delegate("select", "change", fnSrh);
						function fnSrh() {
							$.get($form[0].action, $form.serialize(), function (json) {
								if (json.status == 200) {
									$body.html(fnSerialize(json.list));
								}
							}, "json")
						}

						function fnSerialize(list) {
							var str = '';
							var link = '<td><a href="javascript:;" class="btn-delete"></a></td>';
							for (var i = 0, _len = list.length; i < _len; i++) {
								str += '<tr>' +
									'<td>' + list[i][0] + '</td>' +
									'<td><img src="' + list[i][1] + '"></td>' +
									'<td>' + list[i][2] + '</td>' +
									'<td class="tal">' + list[i][3] + '</td>' +
									link +
									'</tr>';
							}
							return str;
						}
					}
				},
				"timePanel"   :{
					"init" :function () {
						this.add();
						this.deletes();
					},
					"add"  :function () {
						var $form = $("#J-add-form");
						var $add = $("#J-add").tipsy({"gravity":"s", "trigger":"focus"});
						var $name = $("#J-add-name").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"s", "trigger":"focus"});
						$("#J-add-desc").attr("original-title", "Please enter 1-200 chars").tipsy({"gravity":"w", "trigger":"focus"});
						var validator = $form.validate({
							"submitHandler":function (form) {
								$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
								var _start = new Date();
								$.post(form.action, $form.serialize(), function (json) {
									if (json.status == 200) {
										if (json.errors) {
											for (var i in json.errors) {
												var _cur = $form.find('[name*="' + i + '"]');
												if (_cur.length) {
													_cur.attr("original-title", json.errors[i]).addClass("error");
												} else {
													BY.tool.delayTipsy($add, json.errors[i]);
												}
											}
											BY.tool.doCover(_start, function () {
												$form.busy({"method":"hide"});
											});
											$form.find(".error:eq(0)").trigger("focus");
										} else {
											BY.tool.delayTipsy($add, "create uccessfully,Now browser will enter the album automatically", 3000
											);
											location.href = json.redirect;
										}
									} else if (json.status == 405) {
										alert("Get method is not allowed");
									}
								}, "json");
								return false;
							},
							"rules"        :{
								"Album[name]":{
									"required"   :true,
									"rangelength":[1, 30]
								},
								"Album[desc]":{
									"required"   :true,
									"rangelength":[1, 200]
								}
							},
							"onfocusout"   :false,
							"onkeyup"      :false,
							"onclick"      :false,
							"showErrors"   :function (errorMap, errorList) {
								/*处理正确*/
								var _suc = validator.successList;
								if (_suc.length) {
									for (var i in _suc) {
										var _cur = _suc[i];
										_cur.className = "";
										_cur.setAttribute("original-title", "");
									}
								}
								if (errorList.length) {
									for (var i in errorList) {
										var _cur = errorList[i];
										_cur.element.className = "error";
										_cur.element.setAttribute("original-title", _cur.message);
									}
									$form.find(".error:eq(0)").trigger("focus");
								}
							}
						});
						BY.tool.triggerFormSubmit($add, $form, validator);
					},
					deletes:function () {
						$(".Js-delete").bind("click", function () {
							var $tr = $(this).closest("tr");
							if (confirm("Would you rather want to delete it?")) {
								$.post(this.href, function (json) {
									if (json.status == 200) {
										$tr.animate({"opacity":0}, 500, function () {
											$(this).remove();
										});
									}
								}, "json");
							}
							return false;
						});

					}
				},
				"timeSubPanel":{
					"init"   :function () {
						this.file();
						this.add();
						this.update();
						this.deletes();
						/*this.cover();*/
						this.allowSubmit = false;
					},
					"cover"  :function () {
						$(".Js-cover").tipsy({"gravity":"s", "trigger":"manual"}).live("click", function () {
							var $this = $(this);
							$.post(this.href, function (json) {
								if (json.status == 200) {
									BY.tool.delayTipsy($this, "Set Album Cover Successfully")
								}
							}, "json");
							return false;
						})
					},
					"deletes":function () {
						$(".Js-delete").live("click", function () {
							var $tr = $(this).closest("tr");
							if (confirm("Would you rather want to delete it?")) {
								$.post(this.href, function (json) {
									if (json.status == 200) {
										$tr.animate({"opacity":0}, 500, function () {
											$(this).remove();
										});
									}
								}, "json");
							}
							return false;
						});
					},
					"file"   :function () {
						var $btn = $("#J-upload").tipsy({"gravity":"s", "trigger":"manual"});
						var $img = $btn.closest("td").find("img");
						var _this = this;
						var o = BY.tool.triggerFile.call(
							$btn,
							"click to upload your pictures",
							"file",
							null,
							{
								"beforeSubmit":function () {
									if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
										BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
											o.$form.busy({"method":"hide"});
										});
										return false;
									}
								},
								"success"     :function (json) {
									o.$form.busy({"method":"hide"});
									if (!json.status) {
										json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
									}
									if (json.status == 200) {
										_this.allowSubmit = true;
										$img[0].src = json.url;
										json.update && (o.$form[0].action = json.update);
										BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
									}
								}
							},
							$(".ra-container")
						);

						this.defaults = {
							image:$img[0].src,
							form :o.$form
						};
					},
					"add"    :function () {
						var $form = $("#J-add-form");
						var $btn = $("#J-upload");
						var $img = $btn.closest("td").find("img");
						var $add = $("#J-add").tipsy({"gravity":"s", "trigger":"manual"});
						$("#J-add-name").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"s", "trigger":"focus"});
						$("#J-add-desc").attr("original-title", "Please enter 10-500 chars").tipsy({"gravity":"w", "trigger":"focus"});
						var fnSerialize = function (data) {
							/*return '<tr><td>' + data[0] + '</td><td><img src="' + data[1] + '"/></td><td>' + data[2] + '</td><td>' + data[3] + '</td><td><a href="' + data[4] + '" class="Js-cover">Cover</a><a href="' + data[5] + '" class="Js-delete">delete</a></td></tr>';*/
							return '<tr><td>' + data[0] + '</td><td><img src="' + data[1] + '" width="60" height="60"/></td><td>' + data[2] + '</td><td>' + data[3] + '</td><td><a href="' + data[4] + '" class="Js-delete">delete</a></td></tr>'
						};
						var $body = $("#J-body");
						var _this = this;
						var validator = $form.validate({
							"submitHandler":function (form) {
								if (_this.allowSubmit) {
									$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
									var _start = new Date;
									var _str = $form.serialize();
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$form.busy({"method":"hide"});
										});
										if (json.status == 200) {
											if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($add, json.errors[i]);
													}
												}
												$form.find(".error:eq(0)").trigger("focus");
											} else {
												BY.tool.delayTipsy($add, "Update Successful");
												$form[0].reset();
												_this.defaults.form[0].action = $btn[0].href;
												$img[0].src = _this.defaults.image;
												var $newItem = $(fnSerialize(json.list));
												/*$newItem.find(".Js-cover").tipsy({"trigger":"manual", "gravity":"s"});*/
												$body.append($newItem);
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
								} else {
									BY.tool.delayTipsy($btn, "Your should upload one photo first");
								}
								return false;
							},
							"rules"        :{
								"Image[desc_short]":{
									"required"   :true,
									"rangelength":[1, 30]
								},
								"Image[desc]"      :{
									"required"   :true,
									"rangelength":[10, 500]
								}
							},
							"onfocusout"   :false,
							"onkeyup"      :false,
							"onclick"      :false,
							"showErrors"   :function (errorMap, errorList) {
								/*处理正确*/
								var _suc = validator.successList;
								if (_suc.length) {
									for (var i in _suc) {
										var _cur = _suc[i];
										_cur.className = "";
										_cur.setAttribute("original-title", "");
									}
								}
								if (errorList.length) {
									for (var i in errorList) {
										var _cur = errorList[i];
										_cur.element.className = "error";
										_cur.element.setAttribute("original-title", _cur.message);
									}
									$form.find(".error:eq(0)").trigger("focus");
								}
							}
						});
						BY.tool.triggerFormSubmit($add, $form, validator);
					},
					update   :function () {
						var $form = $("#J-update-form");
						var $btn = $("#J-update").tipsy({"gravity":"s", "trigger":"manual"});
						$("#J-album-name").attr("original-title", "Please enter 1-30").tipsy({"gravity":"s", "trigger":"focus"});
						$("#J-album-desc").attr("original-title", "Please enter 1-200 chars").tipsy({"gravity":"w", "trigger":"focus"});
						var validator = $form.validate({
							"submitHandler":function (form) {
								$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
								var _start = new Date;
								$.post(form.action, $form.serialize(), function (json) {
									BY.tool.doCover(_start, function () {
										$form.busy({"method":"hide"});
									});
									if (json.status == 200) {
										if (json.errors) {
											for (var i in json.errors) {
												var _cur = $form.find('[name*="' + i + '"]');
												if (_cur.length) {
													_cur.attr("original-title", json.errors[i]).addClass("error");
												} else {
													BY.tool.delayTipsy($btn, json.errors[i]);
												}
											}
											$form.find(".error:eq(0)").trigger("focus");
										} else {
											BY.tool.delayTipsy($btn, "Update Successful");
										}
									} else if (json.status == 405) {
										alert("Get method is not allowed");
									}
								}, "json");
								return false;
							},
							"rules"        :{
								"Album[name]":{
									"required"   :true,
									"rangelength":[1, 30]
								},
								"Album[desc]":{
									"required"   :true,
									"rangelength":[1, 200]
								}
							},
							"onfocusout"   :false,
							"onkeyup"      :false,
							"onclick"      :false,
							"showErrors"   :function (errorMap, errorList) {
								/*处理正确*/
								var _suc = validator.successList;
								if (_suc.length) {
									for (var i in _suc) {
										var _cur = _suc[i];
										_cur.className = "";
										_cur.setAttribute("original-title", "");
									}
								}
								if (errorList.length) {
									for (var i in errorList) {
										var _cur = errorList[i];
										_cur.element.className = "error";
										_cur.element.setAttribute("original-title", _cur.message);
									}
									$form.find(".error:eq(0)").trigger("focus");
								}
							}
						});
						BY.tool.triggerFormSubmit($btn, $form, validator);
					}
				},
				"self"        :{
					"init"      :function () {
						this.file();
						this.datepicker();
						this.form();
					},
					"file"      :function () {
						var $btn = $("#J-upload").tipsy({"gravity":"s", "trigger":"manual"});
						var $navImg = $(".g-sidebar img");
						var $menuImg = $(".global-toolbar img");
						var $img = $btn.closest("td").find("img");
						var o = BY.tool.triggerFile.call(
							$btn,
							"click to upload your team member photo",
							"file",
							null,
							{
								"beforeSubmit":function () {
									if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
										BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
											o.$form.busy({"method":"hide"});
										});
										return false;
									}
								},
								"success"     :function (json) {
									o.$form.busy({"method":"hide"});
									if (!json.status) {
										json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
									}
									if (json.status == 200) {
										$img[0].src = json.url;
										$navImg[0].src = json.url;
										$menuImg[0].src = json.url.replace("150x150", "60x60");
										json.update && (o.$form[0].action = json.update);
										BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
									}
								}
							},
							$(".rc-self")
						);
					},
					"datepicker":function () {
						var $date = $("#J-date").tipsy({"gravity":"s", "trigger":"manual"}).DatePicker({
							format    :'Y-m-d',
							date      :new Date(),
							current   :new Date(),
							"starts"  :1,
							position  :'r',
							"onChange":function (formated, dates) {
								$date.val(formated).DatePickerHide();
							}
						});
					},
					"form"      :function () {
						var $form = $("#J-form");
						$("#J-name").attr("original-title", "Please enter 2-30 chars").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-addr").attr("original-title", "Please enter 2-300 chars").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-profession").attr("original-title", "Please enter 2-30 chars").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-desc").attr("original-title", "Please enter 10-2000 chars").tipsy({"gravity":"w", "trigger":"focus"});
						var $submit = $("#J-submit").tipsy({"gravity":"s", "trigger":"focus"});
						var validator = $form.validate({
							"submitHandler":function (form) {
								$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
								var _start = new Date;
								$.post(form.action, $form.serialize(), function (json) {
									BY.tool.doCover(_start, function () {
										$form.busy({"method":"hide"});
									});
									if (json.status == 200) {
										if (json.errors) {
											for (var i in json.errors) {
												var _cur = $form.find('[name*="' + i + '"]');
												if (_cur.length) {
													_cur.attr("original-title", json.errors[i]).addClass("error");
												} else {
													BY.tool.delayTipsy($submit, json.errors[i]);
												}
											}
											$form.find(".error:eq(0)").trigger("focus");
										} else {
											BY.tool.delayTipsy($submit, "Update Successful");
										}
									} else if (json.status == 405) {
										alert("Get method is not allowed");
									}
								}, "json");
								return false;
							},
							"rules"        :{
								"Profile[name]"         :{
									"required"   :true,
									"rangelength":[2, 30]
								},
								"Profile[address]"      :{
									"required"   :true,
									"rangelength":[1, 200]
								},
								"Profile[date_birthday]":{
									"required":true,
									"date"    :true
								},
								"Profile[profession]"   :{
									"required"   :true,
									"rangelength":[2, 30]
								},
								"Profile[desc]"         :{
									"required"   :true,
									"rangelength":[10, 2000]
								}
							},
							"ignore"       :"input:file",
							"onfocusout"   :false,
							"onkeyup"      :false,
							"onclick"      :false,
							"showErrors"   :function (errorMap, errorList) {
								/*处理正确*/
								var _suc = validator.successList;
								if (_suc.length) {
									for (var i in _suc) {
										var _cur = _suc[i];
										_cur.className = "";
										_cur.setAttribute("original-title", "");
									}
								}
								if (errorList.length) {
									for (var i in errorList) {
										var _cur = errorList[i];
										_cur.element.className = "error";
										_cur.element.setAttribute("original-title", _cur.message);
									}
									$form.find(".error:eq(0)").trigger("focus");
								}
							}
						});
						BY.tool.triggerFormSubmit($submit, $form, validator);
					}
				}
			},
			"regAgent"   :{
				/*reg-agent-brandyond*/
				"brandyond"  :{
					"init":function () {
						BY.page.regbrand.brandyond.init();
					}
				},
				"message":{
					init:function(){
						this.deletes();
					},
					deletes:function(){
						$(".Js-delete").tipsy({
							'trigger':'manual',
							'gravity':'s'
						}).bind("click",function(){
							var $this = $(this);
							$.post(this.href, function(json){
								if(json.status == 200){
									$this.closest('li').animate({'opacity':0},500,function(){
										$(this).remove();
									});
								}else if(json.status == 403){
									BY.tool.delayTipsy($this,'发送失败');
								}
							},'json');
							return false;
						});
					}
				},
				/*reg-agent-capacity*/
				"capacity"   :{
					"auth"  :{
						"init"    :function () {
							this.upload();
							this.add();
							this.cache = null;
							/*this.change();
							 this.deletes();*/
						},
						"deletes" :function () {
							$(".Js-remove").live("click", function () {
								if (confirm("Would you rather want to delete this certification ?")) {
									var $tr = $(this).closest("tr");
									$.post(this.href, function (json) {
										if (json.status == 200) {
											$tr.animate({"opacity":0}, 500, function () {
												$(this).remove();
												window.formCache.resetPos();
											});
										}
									}, "json");
								}
								return false;
							})
						},
						"change"  :function () {
							var _self = this;
							$(".Js-change").each(function () {
								_self.fnChange.call($(this));
							});
						},
						"fnChange":function () {
							var $btn = this;
							var $img = $btn.closest("tr").find("img");
							var o = BY.tool.triggerFile.call(
								$btn,
								"click to upload your team member photo",
								"file",
								null,
								{
									"beforeSubmit":function () {
										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										/*json = window.eval('('+json.match(/\{.+?\}/)[0]+')');*/
										if (json.status == 200) {
											$img[0].src = json.url;
											json.update && (o.$form[0].action = json.update);
											BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
										}
									}
								}
							);
						},
						"upload"  :function () {
							var $btn = $("#J-upload").tipsy({"gravity":"s", "trigger":"manual"});
							var $img = $("#J-img");
							var _self = this;
							var o = BY.tool.triggerFile.call(
								$btn,
								"click to upload your team member photo",
								"file",
								null,
								{
									"beforeSubmit":function () {
										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										o.$form.busy({"method":"hide"});
										if (!json.status) {
											json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
										}
										if (json.status == 200) {
											$img[0].src = json.url;
											_self.cache = json.url;
											json.update && (o.$form[0].action = json.update);
											BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
										}
									}
								}
							);
						},
						"add"     :function () {
							var $form = $("#J-form");
							var $tbl = $("#J-tbl");
							var $btn = $("#J-upload");
							var _img = $("#J-img")[0];
							var defaultSrc = _img.src;
							var _self = this;
							$("#J-name").attr("original-title", "please enter an certification name").tipsy({"gravity":"n", "trigger":"focus"});
							var $save = $("#J-add").tipsy({"gravity":"s", "trigger":"focus"});
							var validator = $form.validate({
								"submitHandler":function (form) {
									if (!_self.cache) {
										BY.tool.delayTipsy($btn, "You must upload an image first", 2500);
										return false;
									}
									$.post(form.action, $form.serialize(), function (json) {
										if (json.status == 200) {
											if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($save, json.errors[i]);
													}
												}
											} else {
												var $newItem = $(serializeHelper(json.certificate));
												$tbl.append($newItem);
												$form[0].reset();
												_img.src = defaultSrc;
												_self.fnChange.call($newItem.find(".Js-change"));
												window.formCache.resetPos();
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"name":{
										"required":true
									},
									"file":{
										"cache":true
									}
								},
								"ignore"       :"input:file",
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
									}
								}
							});
							BY.tool.triggerFormSubmit($save, $form, validator);

							function serializeHelper(data) {
								return '<tr>' +
									'<td><img src="' + _self.cache + '" width="120" height="135"/></td>' +
									'<td>' +
									/*'<div class="right"><div>Authorization Certification:' + data.name + '</div><div class="handle"><a href="' + data.update + '" class="Js-change">change</a><a href="' + data.remove + '" class="Js-remove">remove</a></div></div></div>' +*/
									'<div class="right"><div>Authorization Certification:' + data.name + '</div></div></div>' +
									'</td>' +
									'</tr>';
							}
						}
					},
					"team"  :{
						"init":function () {
							this.save();
							this.add();
							this.file();
						},
						"add" :function () {
							var _this = this,
								$foot = $("#J-foot"),
								$html = $($foot.html()),
								$form = $("#J-form"), /*add form*/
								$add = $("#J-add"), /*add submit*/
								$body = $("#J-body"),
								$clone, /*edit clone*/
								$btn;
							/*upload btn*/
							_this.allowSubmit = false;
							$foot.remove();
							var validator = $form.validate({
								"submitHandler":function (form) {
									if (!_this.allowSubmit) {
										BY.tool.delayTipsy($btn, "You should also upload this picture", 2500);
										return false;
									}
									$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
									var _start = new Date;
									var _serStr = $form.serialize();
									$.post(form.action, _serStr, function (json) {
										$form.busy({"method":"hide"});
										if (json.status == 200) {
											if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($add, json.errors[i]);
													}
												}
												$form.find('.error').eq(0).trigger("focus");
											} else {
												_this.allowSubmit = false;
												$clone.remove();
												$body.append(fnSerialize(_this.cache, _serStr.match(/[^=]+(?=&|$)/g)));
												$add.html("<b></b>Add<em></em>");
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");

									return false;
								},
								"rules"        :{
									"TeamMemberForm[name]"      :{
										"required":true,
										"username":true
									},
									"TeamMemberForm[position]"  :{
										"required":true
									},
									"TeamMemberForm[experience]":{
										"required":true
									},
									"TeamMemberForm[language]"  :{
										"required":true
									}
								},
								"ignore"       :"input:file",
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find('.error').eq(0).trigger("focus");
									}
								}
							});

							function fnSerialize(url, list) {
								return '<tr><td><img src="' + url + '" width="60" height="60"/></td><td>' + list[0] + '</td><td>' + list[1] + '</td><td>' + list[2] + '</td><td>' + list[3] + '</td></tr>';
							}

							$add.bind("click", function () {
								switch ($(this).text()) {
									case "Add":
										$(this).html("<b></b>Submit<em></em>")
										$clone = $html.clone();
										$body.append($clone);
										$btn = $clone.find("a").tipsy({"gravity":"s", "trigger":"manual"});
										var $img = $clone.find("img");
										var o = BY.tool.triggerFile.call(
											$btn,
											"click to upload your team member photo",
											"file",
											null,
											{
												"beforeSubmit":function () {
													if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
														BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
															o.$form.busy({"method":"hide"});
														});
														return false;
													}
												},
												"success"     :function (json) {
													o.$form.busy({"method":"hide"});
													if (!json.status) {
														json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
													}
													if (json.status == 200) {
														$img[0].src = json.url;
														_this.cache = json.url;
														json.update && (o.$form[0].action = json.update);
														BY.tool.delayTipsy($btn, "Successfully,wait for image load back");
														_this.allowSubmit = true;
													}
												}
											}
										);
										fnTipsyHelper([
											$("#J-name"),
											$("#J-position"),
											$("#J-time"),
											$("#J-language")
										], [
											"this team member's name",
											"this team member's position",
											"this team member's work years",
											"this team member's language"
										]);
										break;
									case "Submit":
										if (validator.form()) {
											$form.submit();
										}
										break;

								}
							});
							function fnTipsyHelper(domList, arrList) {
								for (var i = 0, _len = domList.length; i < _len; i++) {
									domList[i].attr({"original-title":arrList[i]}).tipsy({"gravity":"s", "trigger":"focus"});
								}
							}
						},
						"save":function () {
							var $form = $("#J-save-form");
							$("#J-person").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-story").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-comment").tipsy({"gravity":"w", "trigger":"focus"});
							var $save = $("#J-save").tipsy({"gravity":"s", "trigger":"focus"});
							var $loadingDom = $form.find("table");
							var validator = $form.validate({
								"submitHandler":function (form) {
									$loadingDom.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
									var _start = new Date;
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$loadingDom.busy({"method":"hide"});
										});
										if (json.status == 200) {
											if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($save, json.errors[i]);
													}
													$form.find(".error:eq(0)").trigger("focus");
												}
											} else {
												BY.tool.delayTipsy($save, "Update Successful");
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"TeamForm[persons]":{
										"required":true,
										"integer" :true
									},
									"TeamForm[stories]":{
										"required":true,
										"integer" :true
									},
									"TeamForm[comment]":{
										"required"   :true,
										"rangelength":[10, 140]
									}
								},
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							BY.tool.triggerFormSubmit($save, $form, validator);
						},
						"file":function () {
							$(".Js-file").tipsy({"gravity":"s", "trigger":"manual"}).each(function () {
								var $btn = $(this);
								var $img = $btn.closest("li").find("img");
								var o = BY.tool.triggerFile.call(
									$btn,
									"click to change your team photo",
									"file",
									null,
									{
										"beforeSubmit":function () {
											if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
												BY.tool.delayTipsy($btn, "this file type is not allow", function () {
													o.$form.busy({"method":"hide"});
												});
												return false;
											}
										},
										"success"     :function (json) {
											o.$form.busy({"method":"hide"});
											if (!json.status) {
												json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
											}
											if (json.status == 200) {
												BY.tool.delayTipsy($btn, "Successfully,wait for image load back", 3000);
												$img[0].src = json.url;
											}
										}
									}
								);
							})
						}
					},
					"cases" :{
						"init"       :function () {
							this.add();
							this.cancel();
							this.datepicker();
							this.edit();
							this.file();
							this.gallery();
						},
						"gallery"    :function () {
							$("#J-list .fr a").each(function () {
								var name = "gallery" + $(this).closest("dd").index();
								$(this).colorbox({
									"rel":name/*,
									 "width" :"80%",
									 "height":"80%"*/
								});
							})
						},
						"cancel"     :function () {
							$(".Js-cancel").live("click", function () {
								$(this).closest("dd").hide().prev().show();
							})
						},
						"edit"       :function () {
							var _self = this;
							$(".Js-edit").live("click", function (e) {
								var $dd = $(this).closest("dd");
								if ($dd.hasClass("uploaded")) {
									$dd.hide().next().show();
								} else {
									$.get(this.href, function (json) {
										var $dom = $(fnSerialize(json.list));
										$dd.hide().after($dom);
										_self.editform($dom, $dd);
										$dd.addClass("uploaded");
									}, "json")
								}
								return false;
							});
							function fnSerialize(list) {
								var str = '<dd class="item-edit"><form action="' + list[0] + '"><table class="vat"><tr><td class="tar">Subject Name:</td><td><input type="text" value="' + list[1] + '" name="ArticleLang[topic]"/></td></tr><tr><td class="tar">Introduction:</td><td><textarea rows="5" name="ArticleLang[content]">' + list[2] + '</textarea></td></tr><tr><td class="tar">Update:<br><span class="ui-upload-pixels">(60x60 pixels)</span></td><td><ul>';
								for (var i = 3; i < list.length; i++) {
									str += '<li><img src="' + list[i][1] + '" width="80" height="80"/><div><a href="' + list[i][0] + '" class="btn-red btn-total Js-file"><b></b>Browse<em></em></a></div></li>'
								}
								str += '</ul></td></tr><tr><td colspan="2" class="tar"><!--<a href="javascript:;" class="Js-cancel">cancel</a>--><a href="javascript:;" class="Js-update btn-red btn-total"><b></b>Update<em></em></a></td></tr></table></form></dd>';
								return str;
							}
						},
						"editform"   :function (dom, prev) {
							/*file*/
							var allowGet = false;
							var _self = this;
							dom.find(".Js-file").each(function () {
								var $btn = $(this).tipsy({"gravity":"s", "trigger":"manual"});
								var $img = $btn.closest("li").find("img");
								var o = BY.tool.triggerFile.call(
									$btn,
									"click to change your successful case photo",
									"file",
									null,
									{
										"beforeSubmit":function () {
											if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
												BY.tool.delayTipsy($btn, "this file type is not allow", function () {
													o.$form.busy({"method":"hide"});
												});
												return false;
											}
										},
										"success"     :function (json) {
											o.$form.busy({"method":"hide"});
											if (!json.status) {
												json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
											}
											if (json.status == 200) {
												$img[0].src = json.url;
												json.update && (o.$form[0].action = json.update);
												BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
												allowGet = true;
											}
										}
									},
									dom
								);
							});
							/*form*/
							dom.find("input:text").attr("original-title", "enter 4-50 chars").tipsy({"gravity":"w", "trigger":"focus"}).bind("change", function () {
								allowGet = true;
							});
							dom.find("textarea").tipsy({"gravity":"w", "trigger":"focus"}).bind("change", function () {
								allowGet = true;
							});
							var $update = dom.find(".Js-update").tipsy({"gravity":"s", "trigger":"manual"});
							var $form = dom.find("form:eq(0)");
							var validator = $form.validate({
								"submitHandler":function (form) {
									if (!allowGet) {
										dom.hide().prev().show();
									} else {
										dom.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
										var _start = new Date;
										$.post(form.action, $form.serialize(), function (json) {
											BY.tool.doCover(_start, function () {
												dom.busy({"method":"hide"});
											});
											if (json.status == 200) {
												if (json.errors) {
													for (var i in json.errors) {
														var _cur = $form.find('[name*="' + i + '"]');
														if (_cur.length) {
															_cur.attr("original-title", json.errors[i]).addClass("error");
														} else {
															BY.tool.delayTipsy($update, json.errors[i]);
														}
														$form.find(".error:eq(0)").trigger("focus");
													}
												} else {
													_self.afterUpdate(json.list, prev, dom);
												}
											} else if (json.status == 405) {
												alert("Get method is not allowed");
											}
										}, "json");
										return false;
									}
								},
								"rules"        :{
									"ArticleLang[topic]"  :{
										"required"   :true,
										"rangelength":[4, 50]
									},
									"ArticleLang[content]":{
										"required":true
									}
								},
								"ignore"       :"input:file",
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							BY.tool.triggerFormSubmit($update, $form, validator);
						},
						"afterUpdate":function (list, prev, dom) {
							var $updateItem = $(this.fnSerialize(list));
							dom.hide();
							prev.html($updateItem).show();
							this.gallery();
						},
						"datepicker" :function () {
							var date = new Date();
							var $start = $("#J-start").tipsy({"gravity":"s", "trigger":"manual"});
							var $end = $("#J-end").tipsy({"gravity":"s", "trigger":"manual"});
							var _this = this;
							this.endtime = null;
							this.starttime = null;
							$start.DatePicker({
								format    :'Y-m-d',
								"date"    :date,
								"current" :date,
								"starts"  :1,
								position  :'r',
								"onChange":function (formated, dates) {
									if (!_this.endtime || _this.endtime > dates) {
										$start.val(formated);
										$start.DatePickerHide();
										_this.starttime = dates;
									} else {
										$start.DatePickerHide();
										BY.tool.delayTipsy($start, "begin time must smaller than end time", 3000);
									}
								}
							});
							$end.DatePicker({
								format    :'Y-m-d',
								"date"    :date,
								"current" :date,
								"starts"  :1,
								position  :'r',
								"onChange":function (formated, dates) {
									if (!_this.starttime || dates > _this.starttime) {
										$end.val(formated);
										$end.DatePickerHide();
										_this.endtime = dates;
									} else {
										$end.DatePickerHide();
										BY.tool.delayTipsy($end, "end time must bigger than end time", 3000);
									}
								}
							});
						},
						"file"       :function () {
							var _this = this;
							_this.cache = $();
							_this.imgCache = $();
							$(".Js-file").tipsy({"gravity":"s", "trigger":"manual"}).each(function () {
								_this.url = _this.url || this.href;
								var $btn = $(this);
								var $img = $btn.closest("li").find("img");
								var o = BY.tool.triggerFile.call(
									$btn,
									"click to upload your successful case photo",
									"file",
									null,
									{
										"beforeSubmit":function () {
											if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
												BY.tool.delayTipsy($btn, "this file type is not allow", function () {
													o.$form.busy({"method":"hide"});
												});
												return false;
											}
										},
										"success"     :function (json) {
											o.$form.busy({"method":"hide"});
											if (!json.status) {
												json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
											}
											if (json.status == 200) {
												$img[0].src = json.url;
												json.update && (o.$form[0].action = json.update);
												BY.tool.delayTipsy($btn, "Successfully,wait for image load back", 2500);
												o.$form.addClass("added");
											}
										}
									}
								);
								_this.cache = _this.cache.add(o.$form);
								_this.imgCache = _this.imgCache.add($img);
							});
						},
						"fnSerialize":function (list) {
							var str = '<div class="fl"><div>' + list[0] + '<span>' + list[1] + '</span></div><p>' + list[2] + '</p><div><a href="' + list[3] + '" class="Js-edit">Edit</a></div></div><div class="fr">';
							for (var i = 0, _len = list[4].length; i < _len; i++) {
								str += '<a href="' + list[4][i].replace(/(_.+?)$/, "") + '"><img src="' + list[4][i] + '"></a>';
							}
							str += '</div><div class="clr"></div>';
							return str;
						},
						"add"        :function () {
							$("#J-name").attr("original-title", "enter 4-50 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-content").tipsy({"gravity":"w", "trigger":"focus"});
							var $add = $("#J-add").tipsy({"gravity":"s", "trigger":"focus"});
							var $form = $("#J-form");
							var $dt = $("#J-list dt");
							var _this = this;
							var _defaultSrc = $("#J-get-src")[0].src;
							var validator = $form.validate({
								"submitHandler":function (form) {
									if (!_this.cache.filter(".added").length) {
										BY.tool.delayTipsy($add, "You should upload one limited photo first", 3000);
										return false;
									}
									$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
									var _start = new Date;
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$form.busy({"method":"hide"});
										});
										if (json.status == 200) {
											if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($add, json.errors[i]);
													}
												}
												$form.find(".error:eq(0)").trigger("focus");
											} else {
												form.reset();
												_this.cache.removeClass("added").attr("action", _this.url);
												_this.starttime = null;
												_this.endtime = null;
												_this.imgCache.attr("src", _defaultSrc);
												BY.tool.delayTipsy($add, "add Successful");
												var $newItem = $('<dd>' + _this.fnSerialize(json.list) + '</dd>');
												$dt.after($newItem);
												_this.gallery();
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"ArticleLang[topic]"  :{
										"required"   :true,
										"rangelength":[4, 50]
									},
									"Article[date_start]" :{
										"required":true,
										"date"    :true
									},
									"Article[date_end]"   :{
										"required":true,
										"date"    :true
									},
									"ArticleLang[content]":{
										"required":true
									}
								},
								"ignore"       :"input:file",
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							BY.tool.triggerFormSubmit($add, $form, validator);
						}
					},
					"resume":{
						"init"      :function () {
							this.photo();
							this.pic();
							this.datepicker();
							this.type();
							this.form();
						},
						"datepicker":function () {
							var $date = $("#J-date").tipsy({"gravity":"s", "trigger":"manual"}).DatePicker({
								format    :'Y-m-d',
								date      :new Date(),
								current   :new Date(),
								"starts"  :1,
								position  :'r',
								"onChange":function (formated, dates) {
									$date.val(formated).DatePickerHide();
								}
							});
						},
						"photo"     :function () {
							var $btn = $("#J-photo-upload").tipsy({"gravity":"s", "trigger":"manual"});
							var $navImg = $(".g-sidebar img");
							var $menuImg = $(".global-toolbar img");
							var $img = $("#J-photo");
							var o = BY.tool.triggerFile.call(
								$btn,
								"click to change your personal photo",
								"file",
								null,
								{
									"beforeSubmit":function () {
										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										o.$form.busy({"method":"hide"});
										if (!json.status) {
											json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
										}
										if (json.status == 200) {
											BY.tool.delayTipsy($btn, "Successfully,wait for image load back", 3000);
											$img[0].src = json.url;
											$navImg[0].src = json.url;
											$menuImg[0].src = json.url.replace("150x150", "60x60")
											json.update && (o.$form[0].action = json.update);
										}
									}
								}
							);
						},
						"pic"       :function () {
							var $img = $(".Js-upload-img");
							$(".Js-upload").each(function () {
								var $btn = $(this).tipsy({"gravity":"s", "trigger":"manual"});
								var $curimg = $img.eq($btn.closest("li").index());
								var o = BY.tool.triggerFile.call(
									$btn,
									"click to change your personal photo",
									"file",
									null,
									{
										"beforeSubmit":function () {
											if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
												BY.tool.delayTipsy($btn, "this file type is not allow", function () {
													o.$form.busy({"method":"hide"});
												});
												return false;
											}
										},
										"success"     :function (json) {

											o.$form.busy({"method":"hide"});
											if (!json.status) {
												json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
											}
											if (json.status == 200) {
												BY.tool.delayTipsy($btn, "Successfully,wait for image load back", 3000);
												$curimg[0].src = json.url;
												json.update && (o.$form[0].action = json.update);
											}
										}
									}
								);
							})

						},
						"type"      :function () {
							var $type = $("#J-type-select");
							var $clone,
								$info = $("#J-info"),
								$role = $("#J-role");
							if ($type.val() == 0) {
								$clone = $info.detach().show();
								window.formCache.resetPos();
							} else {
								$info.show();
								window.formCache.resetPos();
							}
							$("#J-type-select").bind("change", function () {
								$(this).find('option[value="-1"]').remove();
								if ($(this).val() == "0") {
									$clone = $info.detach();
									window.formCache.resetPos();
								} else {
									$role.after($clone);
									window.formCache.resetPos();
								}
							});
						},
						"form"      :function () {
							var $form = $("#J-form");
							$("#J-tel").attr("original-title", "Please enter a telphone number").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-fax").attr("original-title", "Please enter a 4-24 chars fax with a-zA-z,number and '-' ").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-name").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-name-e").attr("original-title", "Please enter 1-30 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-name-r").attr("original-title", "Please enter 1-30").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-site").attr("original-title", "Please enter a website url").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-email").attr("original-title", "Please enter an email").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-licence").attr("original-title", "Please enter 4-16 chars").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-desc").tipsy({"gravity":"w", "trigger":"focus"});
							$("#J-desc-cn").tipsy({"gravity":"w", "trigger":"focus"});
							var $submit = $("#J-submit").tipsy({"gravity":"s", "trigger":"focus"});
							var validator = $form.validate({
								"submitHandler":function (form) {
									$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
									var _start = new Date;
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$form.busy({"method":"hide"});
										});
										if (json.status == 200) {
											if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($submit, json.errors[i]);
													}
													$form.find(".error:eq(0)").trigger("focus");
												}
											} else {
												BY.tool.delayTipsy($submit, "Update Successful");
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"Agent[telephone]"    :{
										"required" :true,
										"telephone":true
									},
									"Agent[fax]"          :{
										"required":true,
										"fax"     :true
									},
									"Agent[name]"         :{
										"required"   :true,
										"rangelength":[1, 30]
									},
									"Agent[email]"        :{
										"required":true,
										"email"   :true
									},
									"Agent[site]"         :{
										"required":true,
										"url"     :true
									},
									"Agent[name_register]":{
										"required"   :true,
										"rangelength":[1, 30]
									},
									"Agent[name_english]" :{
										"required"   :true,
										"rangelength":[1, 30]
									},
									"Agent[licence]"      :{
										"required"   :true,
										"rangelength":[4, 16]
									},
									"Agent[date_birthday]":{
										"required":true,
										"date"    :true
									},
									"AgentLang[en][desc]" :{
										"required":true
									}
								},
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var key in errorList) {
											var _cur = errorList[key];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							BY.tool.triggerFormSubmit($submit, $form, validator);
						}
					}
				},
				"cooperation":{
					"home"  :{
						"init"   :function () {
							this.deletes();
						},
						"deletes":function () {
							$(".Js-delete").live("click", function () {
								if (confirm("would you want to delete it")) {
									var $this = $(this);
									$.post(this.href, function (json) {
										if (json.status == 200) {
											$this.closest("tr").animate({"opacity":0}, 1000, function () {
												$(this).remove();
											})
										}
									}, "json")
								}
								return false;
							})
						}
					},
					"search":{
						"init"      :function () {
							this.search();
							this.add();
							this.datepicker();
						},
						"datepicker":function () {
							BY.page.regbrand.timetree.home.datepicker();
						},
						"add"       :function () {
							var $form = $("#J-result");
							var $time = $("#J-time");
							var $edit;
							var validator = $form.validate({
								"submitHandler":function (form) {
									$.post($edit[0].href, $(form).serialize(), function (json) {
										if (json.status == 200) {
											if (json.redirect) {
												location.href = json.redirect;
											} else if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($form.find("input:submit"), json.errors[i]);
													}
												}
												$form.find(".error:eq(0)").trigger("focus");
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"BrandAgent[date_start]":{
										"required":true,
										"date"    :true
									},
									"BrandAgent[date_end]"  :{
										"required":true,
										"date"    :true
									}
								},
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									/*处理错误*/
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});

							$(".Js-add").live("click", function () {
								$form[0].reset();
								if (!$(this).hasClass("edit")) {
									$edit && $edit.removeClass("edit").show();
									$edit = $(this).addClass("edit").closest("tr").after($time).end().hide();
								}
								return false;
							});
						},
						"search"    :function () {
							var $form = $("#J-srh-form");
							var $time = $("#J-time");
							var $input = $form.find("input").bind("keypress",function (e) {
								if (e.keyCode == 108 || e.keyCode == 13) {
									e.preventDefault();
									return false;
								}
							}).tipsy({"trigger":"manual", "gravity":"s"});
							var $body = $("#J-srh-body");
							var $result = $("#J-result");
							var $nosearch = $("#J-no");
							$("#J-srh").bind("click", function () {
								if (!$.trim($input.val())) {
									BY.tool.delayTipsy($input, "this field is required");
									return false;
								}
								var $this = $(this);
								$time = $time.detach();
								$body.html("");
								$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"small"});
								var _start = new Date;
								$.post($form[0].action, $form.serialize(), function (json) {
									BY.tool.doCover(_start, function () {
										$form.busy({"method":"hide"});
									});
									if (json.status == 200) {
										BY.tool.delayTipsy($this, "")
										if (json.brands && json.brands.length) {
											$result.find("tfoot").append($("#J-time"));
											$result[0].reset();
											$body.html(fnSerialize(json.brands));
											$result.show();
										} else {
											$nosearch.show();
											BY.page.regAgent.cooperation.email.send();
										}
									}
								}, "json");
							});
							function fnSerialize(list) {
								var _str = '';
								for (var i = 0, _len = list.length; i < _len; i++) {
									_str += '<tr>' +
										'<td><img src="' + list[i][0] + '"/></td>' +
										'<td>' + list[i][1] + '</td>' +
										'<td>' + list[i][2] + '</td>' +
										'<td>' + list[i][3] + '</td>' +
										'<td>' + list[i][4] + '</td>' +
										'<td><a href="' + list[i][5] + '" class="Js-add">add</a></td>' +
										'</tr>';
								}
								return _str;
							}
						}
					},
					"email" :{
						"init":function () {
							this.send();
						},
						"send":function () {
							$("#J-email").attr("original-title", "Please enter an email address").tipsy({"trigger":"focus", "gravity":"w"});
							$("#J-topic").attr("original-title", "Please enter an email topic").tipsy({"trigger":"focus", "gravity":"w"});
							$("#J-content").attr("original-title", "Please enter an email content").tipsy({"trigger":"focus", "gravity":"w"});
							var $form = $("#J-form");
							var $send = $("#J-send").tipsy({"trigger":"manual", "gravity":"s"});
							var $loadDom = $form.closest(".box-shadow");
							var validator = $form.validate({
								"submitHandler":function (form) {
									$loadDom.busy({"src":"../../images/global/loading_busy.gif", "sizeType":"small"});
									var _start = new Date;
									$.post(form.action, $(form).serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$loadDom.busy({"method":"hide"});
										});
										if (json.status == 200) {
											if (json.redirect) {
												BY.tool.delayTipsy($send, "send successfully", null, function () {
													location.href = json.redirect;
												});
											} else if (json.errors) {
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($send, json.errors[i]);
													}
												}
												$form.find(".error:eq(0)").trigger("focus");
											} else {
												form.reset();
												BY.tool.delayTipsy($send, "Send Successfully");
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"EmailForm[email]"  :{
										"required":true,
										"email"   :true
									},
									"EmailForm[subject]":{
										"required":true
									},
									"EmailForm[content]":{
										"required":true
									}
								},
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									/*处理错误*/
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "email-error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							BY.tool.triggerFormSubmit($send, $form, validator);
						}
					}
				},
				"exhibition" :{
					"detail":{
						"init":function () {
							BY.page.regbrand.exhibition.detail.init();
						}
					},
					"add"   :{
						"init":function () {
							BY.page.regbrand.exhibition.add.init();
						}
					}
				},
				"search"     :{
					"init":function () {
						BY.page.search.init();
					}
				},
				"setting"    :{
					"init":function () {
						BY.page.regbrand.setting.init();
					}
				},
				"storage"    :{
					"init":function () {
						BY.page.regbrand.storage.init()
					}
				},
				"product"    :{
					"home":{
						"init":function () {
							BY.page.regbrand.product.home.init();
						}
					},
					"add" :{
						"init"  :function () {
							BY.page.regbrand.product.add.init();
							this.series();
						},
						"series":function () {
							var cache = {};
							var $series = $("#J-series");
							var _basic = $("#J-brand").attr("data-url");
							$("#J-brand").bind("change", function () {
								$(this).find('option[value="0"]').remove();
								var val = this.value;
								if (cache[val]) {
									$series.html(cache[val]);
								} else {
									$.get(_basic.replace(/\d+/g, val), function (json) {
										if (json.status == 200) {
											if (json.series) {
												cache[val] = fnSerialize(json.series);
												$series.show().html(cache[val]);
											} else {
												$series.hide();
											}
										}
									}, "json")
								}
							});
							function fnSerialize(data) {
								var str = '';
								for (var i = 0, _len = data.length; i < _len; i++) {
									str += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
								}
								return str;
							}
						}
					}
				},
				"gallery"    :{
					"company"      :{
						"init"   :function () {
							this.file();
							this.deletes();
						},
						"file"   :function () {
							$(".Js-change").tipsy({"gravity":"s", "trigger":"manual"}).each(function () {
								var $img = $(this).closest("li").find("img");
								var $btn = $(this);
								var o = BY.tool.triggerFile.call(
									$btn,
									"click to change this picture",
									"file",
									null,
									{
										"beforeSubmit":function () {
											if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
												BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
													o.$form.busy({"method":"hide"});
												});
												return false;
											}
										},
										"success"     :function (json) {
											if (!json.status) {
												json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
											}
											if (json.status == 200) {
												$img[0].src = json.url;
												json.update && (o.$form[0].action = json.update);
												BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
											}
										}
									}
								);
							});
						},
						"deletes":function () {
							$(".Js-delete").live("click", function () {
								var $this = $(this);
								$.post(this.href, function (json) {
									if (json.status == 200) {
										$this.attr("original-title", "delete successful").tipsy({"gravity":"s", "trigger":"manul"}).tipsy("show");
										setTimeout(function () {
											$this.tipsy("hide").parent().parent().animate({"opacity":0}, 1000, function () {
												$(this).remove();
											})
										}, 1000)
									}
								}, "json");
								return false;
							})
						}
					},
					"timetree"     :{
						"init":function () {
							BY.page.regAgent.gallery.company.file();
							BY.page.regAgent.gallery.company.deletes();
						}
					},
					"certification":{
						"init":function () {
							BY.page.regAgent.gallery.company.file();
							BY.page.regAgent.gallery.company.deletes();
						}
					},
					"team"         :{
						"init":function () {
							BY.page.regAgent.gallery.company.file();
							BY.page.regAgent.gallery.company.deletes();
						}
					},
					"represent"    :{
						"init"  :function () {
							this.select();
							this.series();
						},
						"select":function () {
							var cache = {};
							var _defVal = $("#J-brand").find("option:first").val();
							var $Jseries = $("#J-series-box");
							var $form = $("#J-form");
							$("#J-brand").bind("change", function () {
								var _val = this.value;
								var _txt = this.options[this.selectedIndex].text;
								if (_val == _defVal) {
									$Jseries.html("");
								} else {
									if (cache[_val]) {
										$Jseries.html(cache[_val]);
									} else {
										$.get($form[0].action, $form.serialize(), function (json) {
											if (json.status == 200) {
												cache[_val] = fnSerialize(json.list, _val, _txt);
												$Jseries.html(cache[_val]);
											}
										}, "json")
									}
								}
							})
							function fnSerialize(list, val, txt) {
								var _str = '<select relVal="' + val + '" relTxt="' + txt + '">';
								_str += '<option value="select one series">Select one Series</option>';
								for (var i = 0, _len = list.length; i < _len; i++) {
									_str += '<option value="' + list[i][0] + '">' + list[i][1] + '</option>';
								}
								return _str += '</select>';
							}
						},
						"series":function () {
							var $Jseries = $("#J-series-box");
							var cache = {};
							var _defVal = "select one series";
							var $box = $("#J-box");
							var _lastRelVal;
							var _lastVal;
							$Jseries.delegate("select", "change", function () {
								var _val = this.value;
								var _relVal = this.getAttribute("relVal");
								var _txt = this.getAttribute("relTxt");
								cache[_relVal] = cache[_relVal] || {};
								if (_val == _defVal) {
									$box.html("");
								} else {
									if (cache[_relVal][_val]) {
										if (!_lastRelVal) {
											$box.html(cache[_relVal][_val]);
											_lastRelVal = _relVal;
											_lastVal = _val;
										} else {
											if (!cache[_lastRelVal][_lastVal]) {
												cache[_lastRelVal][_lastVal] = $box.children().detach();
											}
											$box.html(cache[_relVal][_val]);
											_lastRelVal = _relVal;
											_lastVal = _val;
										}
									} else {
										$.get($Jseries[0].action, $Jseries.serialize(), function (json) {
											if (json.status == 200) {
												if (!_lastRelVal) {
													$box.html(fnSerialize(json.list, json.total, _txt));
													BY.page.regAgent.gallery.company.file();
													BY.page.regAgent.gallery.company.deletes();
													_lastRelVal = _relVal;
													_lastVal = _val;
												} else {
													if (!cache[_lastRelVal][_lastVal]) {
														cache[_lastRelVal][_lastVal] = $box.children().detach();
													}
													$box.html(fnSerialize(json.list, json.total, _txt));
													BY.page.regAgent.gallery.company.file();
													BY.page.regAgent.gallery.company.deletes();
													_lastRelVal = _relVal;
													_lastVal = _val;
												}
											}
										}, "json")
									}
								}
							});
							function fnSerialize(list, total, txt) {
								var _str = '';
								/*total*/
								_str += '<div class="title2">Total ' + total + ' pictures in' + txt + '\'s TimeTree</div> ';
								/*list*/
								_str += '<ul class="global-gallery2">';
								for (var i = 0, _len = list.length; i < _len; i++) {
									_str += '<li><img src="' + list[i][0] + '"/><div><a href="javascript:;" class="Js-change">Change</a><a href="javascript:;" class="ml Js-delete">Delete</a></div></li>'
								}
								_str += '</ul>';
								return _str;
							}
						}
					}
				},
				"timetree"   :{
					"add" :{
						"init":function () {
							BY.page.regbrand.timetree.add.init();
						}
					},
					"home":{
						"init":function () {
							BY.page.regbrand.timetree.home.init("btn-red");
						}
					}
				},
				"page"       :{
					"home":{
						"init":function () {
							BY.page.regbrand.page.home.init();
						}
					},
					"make":{
						"init":function () {
							BY.page.regbrand.page.make.init();
						}
					}
				}
			},
			"regCompany" :{
				"brandyond":{
					"init":function () {
						BY.page.regAgent.brandyond.init();
					}
				},
				"brands"   :{
					"register":{
						"init" :function () {
							this.brand();
						},
						"brand":function () {
							$("#brand-email").attr("original-title", "please enter an email").tipsy({"trigger":"focus", "gravity":"w"}).val('Be different from company email');
							$("#brand-email").focus(function(){
								if($(this).val()=='Be different from company email'){
									$(this).val('');
								}
							});
							$('#brand-email').blur(function(){
								if($(this).val()==''){
									$(this).val('Be different from company email');
								}
							});
							$("#brand-name").attr("original-title", "please enter 4-30 chars").tipsy({"trigger":"focus", "gravity":"w"});
							$("#brand-pwd").attr("original-title", "please enter 6-16 chars").tipsy({"trigger":"focus", "gravity":"w"});
							$("#brand-c-pwd").attr("original-title", "please confirm your password").tipsy({"trigger":"focus", "gravity":"w"});
							/*brand register*/
							var $submit = $("#brandSubmit").tipsy({"trigger":"manual", "gravity":"s"});
							var $form = $("#brandForm");
							var _this = this;
							var validator = $form.validate({
								"submitHandler":function (form) {
									$form.busy({"src":"../../images/global/loading_busy.gif", "sizeType":"big"});
									var _start = new Date;
									$.post(form.action, $(form).serialize(), function (json) {
										if (json.status == 200) {
											if (json.errors) {
												BY.tool.doCover(_start, function () {
													$form.busy({"method":"hide"});
												});
												for (var i in json.errors) {
													var _cur = $form.find('[name*="' + i + '"]');
													if (_cur.length) {
														_cur.attr("original-title", json.errors[i]).addClass("error");
													} else {
														BY.tool.delayTipsy($submit, json.errors[i]);
													}
												}
												$form.find(".error:eq(0)").trigger("focus");
											} else {
												BY.tool.delayTipsy($submit, "Successfully", 1500, function () {
													location.href = $("#J-back")[0].href;
												});
											}
										} else if (json.status == 405) {
											alert("Get method is not allowed");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"RegisterForm[email]"     :{
										"required":true,
										"email"   :true
									},
									"RegisterForm[name]"      :{
										"required":true,
										"username":true
									},
									"RegisterForm[password]"  :{
										"required":true,
										"password":true
									},
									"RegisterForm[confirmPwd]":{
										"required":true,
										"password":true,
										"equalTo" :"#brand-pwd"
									}
								},
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									/*处理错误*/
									if (errorList.length) {
										for (var item in errorList) {
											var _cur = errorList[item];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							/*触发验证*/
							BY.tool.triggerFormSubmit($submit, $form, validator);
						}
					},
					"home"    :{
						"init"   :function () {
							this.deletes();
							this.adds();
							this.locks();
						},
						"locks"  :function () {
							$(".Js-lock").live("click", function () {
								var $this = $(this);
								$.post(this.href, function (json) {
									if (json.status == 200) {
										if (json.show) {
											$this.after('<a href="' + json.show + '" target="_blank" class="btn-view"></a>');
										} else {
											$this.next().remove();
										}
										$this.toggleClass("btn-lock").toggleClass("btn-unlock").attr("href", json.active);
									}
								}, "json");
								return false
							});
							return false;
						},
						"adds"   :function () {
							var $list = $("#J-list");
							/*var tmpl = '<a class="btn-lock Js-lock" href="{active}" title="click to lock this brand"></a><a href="{show}" class="btn-view" title="click to view this brand"></a><a href="{delete}" class="btn-delete Js-delete" title="click to delete this brand"></a>';*/
							var tmpl = '<a class="btn-lock Js-lock" href="{active}" title="click to lock this brand"></a><a href="{show}" class="btn-view" title="click to view this brand"></a>';
							$(".Js-add").bind("click", function () {
								var $li = $(this).closest("li");
								$.post(this.href, function (json) {
									$li.animate({"opacity":0}, 500, function () {
										$li.appendTo($list).animate({"opacity":1}, 500).find(".handle").html(fnTmpl(json));
									});
								}, "json")
								return false;
							});
							function fnTmpl(data) {
								return tmpl.replace(/\{.+?\}/g, function (matcher) {
									return data[matcher.slice(1, -1)];
								})
							}
						},
						"deletes":function () {
							$(".Js-delete").live("click", function () {
								if (confirm("Would you rather want to delete this item")) {
									var $li = $(this).closest("li");
									$.post(this.href, function (json) {
										if (json.status == 200) {
											$li.animate({"opacity":0}, 500, function () {
												$(this).remove();
											});
										}
									}, "json");
								}
								return false;
							});
						}
					}
				},
				"company"  :{
					"init"      :function () {
						//this.banner();
						this.logo();
						//this.manager();
						this.datepicker();
						this.form();
						this.pic();
						this.multiple();
						this.other();
					},
					other       :function () {
						var $other = $("#J-other");
						var $input = $other.next().next();
						$other.bind("click", function () {
							if (this.checked) {
								$input.show();
							} else {
								$input.val("").hide();
							}
						})
					},
					"multiple"  :function () {
						$("#J-multi-industry").multiSelect();
					},
					"banner"    :function () {
						var $btn = $("#J-banner").tipsy({"gravity":"s", "trigger":"manual"});
						var $img = $btn.closest("td").find("img");
						var o = BY.tool.triggerFile.call(
							$btn,
							"Recommend Size : 790x290 pixels\nImage Type : png,jpg or jpeg",
							"file",
							null,
							{
								"beforeSubmit":function () {
									if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
										BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
											o.$form.busy({"method":"hide"});
										});
										return false;
									}
								},
								"success"     :function (json) {
									o.$form.busy({"method":"hide"});
									if (!json.status) {
										json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
									}
									if (json.status == 200) {
										$img[0].src = json.url;
										json.update && (o.$form[0].action = json.update);
										BY.tool.delayTipsy($btn, "Successfully,wait for image load back", 2500);
									}
								}
							}
						);
					},
					"logo"      :function () {
						var $btn = $("#J-upload").tipsy({"gravity":"s", "trigger":"manual"});
						var $navImg = $(".g-sidebar img");
						var $menuImg = $(".global-toolbar img");
						var $img = $btn.closest("td").find("img");
						var o = BY.tool.triggerFile.call(
							$btn,
							"Recommend Size : 120x120 pixels\nImage Type : png jpg or jpeg",
							"file",
							null,
							{
								"beforeSubmit":function () {
									if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
										BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
											o.$form.busy({"method":"hide"});
										});
										return false;
									}
								},
								"success"     :function (json) {
									o.$form.busy({"method":"hide"});
									if (!json.status) {
										json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
									}
									if (json.status == 200) {
										$img[0].src = json.url;
										$navImg[0].src = json.url;
										$menuImg[0].src = json.url.replace("150x150", "60x60");
										json.update && (o.$form[0].action = json.update);
										BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
									}
								}
							}
						);
					},
					"manager"   :function () {
						var $btn = $("#J-manage").tipsy({"gravity":"s", "trigger":"manual"});
						var $img = $btn.closest("td").find("img");
						var o = BY.tool.triggerFile.call(
							$btn,
							"Recommend Size : 120x120 pixels\nImage Type : png jpg or jpeg",
							"file",
							null,
							{
								"beforeSubmit":function () {
									if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
										BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
											o.$form.busy({"method":"hide"});
										});
										return false;
									}
								},
								"success"     :function (json) {
									o.$form.busy({"method":"hide"});
									if (!json.status) {
										json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
									}
									if (json.status == 200) {
										$img[0].src = json.url;
										json.update && (o.$form[0].action = json.update);
										BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
									}
								}
							}
						);
					},
					"pic"       :function () {
						$(".Js-photo").tipsy({"gravity":"s", "trigger":"manual"}).each(function () {
							var $btn = $(this)
							var $img = $btn.closest("li").find("img");
							var o = BY.tool.triggerFile.call(
								$btn,
								"Recommend Size : 60x60 pixels\nImage Type : png jpg or jpeg",
								"file",
								null,
								{
									"beforeSubmit":function () {
										if (!~"jpeg,png,jpg".indexOf(o.$file.val().split(".").pop().toLowerCase())) {
											BY.tool.delayTipsy($btn, "this file type is not allow", 2500, function () {
												o.$form.busy({"method":"hide"});
											});
											return false;
										}
									},
									"success"     :function (json) {
										o.$form.busy({"method":"hide"});
										if (!json.status) {
											json = window.eval('(' + json.match(/\{.+?\}/)[0] + ')');
										}
										if (json.status == 200) {
											$img[0].src = json.url;
											json.update && (o.$form[0].action = json.update);
											BY.tool.delayTipsy($btn, "Upload Successfully", 2500);
										}
									}
								}
							);
						});
					},
					"datepicker":function () {
						var $date = $("#J-date").tipsy({"gravity":"s", "trigger":"manual"}).DatePicker({
							format    :'Y-m-d',
							date      :new Date(),
							current   :new Date(),
							"starts"  :1,
							position  :'r',
							"onChange":function (formated, dates) {
								$date.val(formated).DatePickerHide();
							}
						});
					},
					"form"      :function () {
						/*tipsy*/
						$("#J-name").attr("original-title", "Please enter 1-200 chars").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-site").attr("original-title", "Please enter a website").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-addr").attr("original-title", "Please enter 4-128 chars").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-tel").attr("original-title", "Please enter a telephone number").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-email").attr("original-title", "Please enter an email").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-product").attr("original-title", "Please enter 1-200 chars").tipsy({"gravity":"w", "trigger":"focus"});
						$("#J-proportion").attr("original-title", "Please enter a number range 1-99").tipsy({"gravity":"w", "trigger":"focus"});
						var $jmark = $("#J-market").attr("original-title", "You must select limit one").tipsy({"gravity":"w", "trigger":"hover"});
						var $jcert = $("#J-certify").attr("original-title", "You must select limit one").tipsy({"gravity":"w", "trigger":"hover"});
						/*validate*/
						var $submit = $("#J-submit").tipsy({"gravity":"s", "trigger":"focus"});
						var $form = $("#J-form");
						$.validator.addMethod("limit", function (e, v, arg) {
							return arg.find("input:checked").length
						}, "you must select one limited");
						var validator = $form.validate({
							"submitHandler":function (form) {
								$form.busy({"src":"../../../../images/global/loading_busy.gif", "sizeType":"big"});
								var _start = new Date;
								$.post(form.action, $form.serialize(), function (json) {
									BY.tool.doCover(_start, function () {
										$form.busy({"method":"hide"});
									});
									if (json.status == 200) {
										if (json.errors) {
											for (var i in json.errors) {
												var _cur = $form.find('[name*="' + i + '"]');
												if (_cur.length) {
													_cur.attr("original-title", json.errors[i]).addClass("error");
												} else {
													BY.tool.delayTipsy($submit, json.errors[i]);
												}
											}
											$form.find(".error:eq(0)").trigger("focus");
										} else {
											BY.tool.delayTipsy($submit, "Successful");
										}
									} else if (json.status == 405) {
										alert("Get method is not allowed");
									}
								}, "json");
								return false;
							},
							"rules"        :{
								"CompanyLang[name]"              :{
									"required"   :true,
									"rangelength":[1, 200]
								},
								"Company[site]"                  :{
									"required":true,
									"url"     :true
								},
								"CompanyLang[address]"           :{
									"required"   :true,
									"rangelength":[4, 128]
								},
								"Company[telephone]"             :{
									"required" :false
									//"telephone":true
								},
								"Company[email]"                 :{
									"required":true,
									"email"   :true
								},
								"Company[products]"              :{
									"required"   :true,
									"rangelength":[1, 200]
								},
								"Company[date_birthday]"         :{
									"required":true,
									"date"    :true
								},
								"Company[proportion_exportation]":{
									"required":true,
									"number"  :true,
									"range"   :[1, 99]
								},
								"Company[markets][]"             :{
									"limit":$jmark
								},
								"Company[certifications][]"      :{
									"limit":$jcert
								}
							},
							"ignore"       :"input:file",
							"onfocusout"   :false,
							"onkeyup"      :false,
							"onclick"      :false,
							"showErrors"   :function (errorMap, errorList) {
								/*处理正确*/
								var _suc = validator.successList;
								if (_suc.length) {
									for (var i in _suc) {
										var _cur = _suc[i];
										_cur.className = "";
										_cur.setAttribute("original-title", "");
									}
								}
								if (errorList.length) {
									for (var i in errorList) {
										var _cur = errorList[i];
										if (_cur.message == 'you must select one limited') {
											$(_cur.element).closest("td").tipsy("show");
										} else {
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
									}
									$form.find(".error:eq(0)").trigger("focus");
								}
							}
						});
						BY.tool.triggerFormSubmit($submit, $form, validator);
					}
				},
				"page"     :{
					"home":{
						"init":function () {
							BY.page.regbrand.page.home.init();
						}
					}
				},
				"gallery"  :{
					"certification":{
						"init":function () {
							BY.page.regbrand.gallery.certification.init();
						}
					},
					"company"      :{
						"init":function () {
							BY.page.regbrand.gallery.company.init();
						}
					},
					"represent"    :{
						"init":function () {
							BY.page.regbrand.gallery.represent.init();
						}
					},
					"team"         :{
						"init":function () {
							BY.page.regbrand.gallery.team.init();
						}
					},
					"timetree"     :{
						"init":function () {
							BY.page.regbrand.gallery.timetree.init();
						}
					}
				},
				"timetree" :{
					"home":{
						"init":function () {
							BY.page.regbrand.timetree.home.init();
						}
					},
					"add" :{
						"init":function () {
							BY.page.regbrand.timetree.add.init();
						}
					}
				}
			},
			"company"    :{
				init       :function () {
					this.sub();
					this.menu();
					this.info();
					BY.tool.toggleFollow();
					BY.page.agent.timeline.initTime('brand');
					BY.page.agent.resume.invite();
				},
				info:function(){
					$("#J-info").bind("click",function(){
						$(this).addClass("brand_info_act").animate({
							width:751,
							height:398
						},250);
					});
					$("#J-close").bind("click",function(){
						$("#J-info").animate({
							width:350,
							height:127
						},250,function(){
							$(this).find('.en').show().siblings().hide();
							$("#J-cn").text("中文介绍 >>");
							$(this).removeClass("brand_info_act");
						});
						return false;
					});
					$("#J-cn").bind("click",function(){
						$(this).prev().find("div:hidden").show().siblings().hide();
						$(this).text($(this).text()== "中文介绍 >>" ? "<< English Introduction":"中文介绍 >>");
					});
				},
				sub        :function () {
					$(".Js-hvr").each(function () {
						var timer;
						var $next = $(this).next();
						if ($next.find("li").length) {
							$(this).bind("mouseenter",function () {
								timer && clearTimeout(timer);
								$next.slideDown(200);
							}).bind("mouseleave", function () {
									timer = setTimeout(function () {
										$next.slideUp(200);
									}, 200)
								});
							$next.bind("mouseenter",function () {
								timer && clearTimeout(timer);
								$next.slideDown(200);
							}).bind("mouseleave", function () {
									timer = setTimeout(function () {
										$next.slideUp(200);
									}, 200)
								});
						} else if ($(this).text() == "Pages") {
							$(this).attr({"original-title":"No pages here"}).tipsy({"gravity":"s", "trigger":"hover"})
						}
					})
				},
				menu       :function () {
					var $load = $('<div class="time-loading"><img src="' + DEFAULT_TIMELINE_LOADING_URL + '"/></div>');
					var $wrap = $("#J-wrap");
					var $cur = $("#J-menu .cur");
					var _this = this;
					var $curMenu = $(".curMenu");
					$("#J-menu").delegate("a:not(.Js-hvr)", "click", function () {
						if (_this.ajax) _this.ajax.abort();
						var txt = $.trim($(this).text());
						$cur.removeClass("cur");
						$cur = $(this).addClass("cur");
						$curMenu.html($(this).closest('li').html());
						if (!_this.cache) {
							_this.cache = $wrap.children().detach();
						}
						switch(txt){
							case 'TimeTree': 
								$.fn.allowTimeTree = true;
								if(_this.cache){
									$wrap.html(_this.cache);
								}else{
									$wrap.html("<div class='time-no-data'>This brand has no "+txt+" data</div>");
								}
								break;
							case 'Fake Killer':
								$.get(this.href, function (html) {
									if($.trim(html)){
										$wrap.html(html);
										//BY.page.company.products.init();
									}else{
										$wrap.html("<div class='time-no-data'><img src='../../images/global/fake_killer_default.jpg' width='700' alt='Coming Soon' /></div>");
									}
								});
								//$.fn.allowTimeTree = false;
								break;
							case 'Products':
								$.get(this.href, function (html) {
									if($.trim(html)){
										$wrap.html(html);
										BY.page.company.products.init();
									}else{
										$wrap.html("<div class='time-no-data'>This brand has no "+txt+" data</div>");
									}
								});
								break;
							case 'Exhibitions':
								$.get(this.href, function (html) {
									if($.trim(html)){
										$wrap.html(html);
										//BY.page.company.exb.init();
									}else{
										$wrap.html("<div class='time-no-data'><img src='../../images/global/exhibition_default.jpg' width='700' alt='Coming Soon' /></div>");
									}
								});
								break;
							default:
								$.get(this.href, function (html) {
									if($.trim(html)){
										$wrap.html(html);
									}else{
										$wrap.html("<div class='time-no-data'>This brand has no "+txt+" data</div>");
									}
								});	
						}
						return false;
					});
				},
				products   :{
					init:function () {
						this.menu();
						this.more();
						this.colorBox();
					},
					menu:function () {
						var _this = this;
						var $wrap = $("#J-product-box");
						$("#J-product-menu").delegate("a", "click", function () {
							$.get(this.href, function (html) {
								$wrap.html(html);
								_this.more();
								_this.colorBox();
							});
							return false;
						})
					},
					more:function () {
						$(".Js-more-product").each(function () {
							var _prev = $(this).prev();
							var _h = _prev.find(".ke_plugin_show")[0].scrollHeight;
							if (_h > 168) {
								$(this).addClass("more").html('<a href="javascript:;">More</a>');
								$(this).find("a").bind("click", function () {
									var $this = $(this);
									if ($(this).text() == "More") {
										_prev.animate({"height":_h}, 500, function () {
											$this.text("Up")
										})
									} else {
										_prev.animate({"height":168}, 500, function () {
											$this.text("More")
										})
									}
								})
							}
						})
					},
					colorBox:function(){
						$("#J-product-box").delegate('img',"click",function(){
							var cn = $(this).next().find("a").attr('class').split(' ');
							$("."+cn).colorbox({transition:"fade", rel:"."+cn});
							$("."+cn).eq(0).trigger("click");
						});
					}
				},
				exb        :{
					init  :function () {
						this.refer();
					},
					refer :function () {
						var $wrap = $("#J-wrap");
						$("#J-exb-list").delegate("a", "click", function (e) {
							$.get(this.href, function (html) {
								$wrap.html(html);
								BY.page.company.exb.detail.init();
							});
							e.preventDefault();
							return false;
						})
					},
					detail:{
						init        :function () {
							this.add();
							this.menu();
							this.lists();
							this.datepicker();
							this.form();
						},
						"form"      :function () {
							var $form = $("#J-make-form");
							var $submit = $("#J-submit").tipsy({"trigger":"focus", "gravity":"s"});
							$("textarea").tipsy({"trigger":"focus", "gravity":"w"});
							var validator = $form.validate({
								"submitHandler":function (form) {
									$form.busy({"src":"../../../../images/global/loading.gif", "sizeType":"big"});
									var _start = new Date();
									$.post(form.action, $form.serialize(), function (json) {
										BY.tool.doCover(_start, function () {
											$form.busy({"method":"hide"});
										});
										if (json.status == 200) {
											form.reset();
											BY.tool.delayTipsy($submit, "send successfully");
										}
									}, "json");
									return false;
								},
								"rules"        :{
									"date"              :{
										required:true,
										date    :true
									},
									"EmailForm[content]":{
										required:true
									}
								},
								"onfocusout"   :false,
								"onkeyup"      :false,
								"onclick"      :false,
								"showErrors"   :function (errorMap, errorList) {
									/*处理正确*/
									var _suc = validator.successList;
									if (_suc.length) {
										for (var i in _suc) {
											var _cur = _suc[i];
											_cur.className = "";
											_cur.setAttribute("original-title", "");
										}
									}
									if (errorList.length) {
										for (var i in errorList) {
											var _cur = errorList[i];
											_cur.element.className = "error";
											_cur.element.setAttribute("original-title", _cur.message);
										}
										$form.find(".error:eq(0)").trigger("focus");
									}
								}
							});
							BY.tool.triggerFormSubmit($submit, $form, validator);
						},
						"datepicker":function () {
							var $date = $("#J-date").tipsy({"gravity":"s", "trigger":"manual"}).DatePicker({
								format    :'Y-m-d',
								date      :new Date(),
								current   :new Date(),
								"starts"  :1,
								position  :'r',
								"onChange":function (formated, dates) {
									$date.val(formated).DatePickerHide();
								}
							});
						},
						add         :function () {
							var $form = $("#J-exb-form");
							$("#J-exb-add").tipsy({"gravity":"s", "trigger":"manual"}).bind("click", function () {
								var $this = $(this);
								$.post($form[0].action, $form.serialize(), function (json) {
									if (json.status = 200) {
										BY.tool.delayTipsy($this, "add successful");
										setTimeout(function () {
											$this.parent().html("<span>this exhibition already in your list</span>");
										}, 1500)
									}
								}, "json")
							});
						},
						menu        :function () {
							var _refer = $("#J-exb-refer>div");
							$("#J-exb-menu").delegate("li", "click", function () {
								$(this).addClass("act").siblings().removeClass("act");
								_refer.eq($(this).index()).show().siblings().hide();
							});
						},
						lists       :function () {
							var $product = $("#J-exb-product");
							var cache = [];
							$("#J-exb-d-list").delegate("a", "click", function (e) {
								var _idx = $(this).closest("tr").index();
								if ($product.attr("curIdx") == _idx) {
									$product.show().siblings().hide();
								} else if (cache[_idx]) {
									$product.html(cache[_idx]).show().siblings().hide();
								} else {
									$.get(this.href, function (html) {
										cache[_idx] = html;
										$product.attr("curIdx", _idx).html(html).show().siblings().hide();
									});
								}
								e.preventDefault();
								return false;
							});
						}
					}
				},
				page       :{
					init    :function () {
						this.form();
						this.colorBox();
					},
					colorBox:function () {
						$("#J-slide a").colorbox({
							"rel":"group"
						});
					},
					form    :function () {
						var $form = $("#J-page-form");
						var $add = $("#J-page-add");
						var $list = $("#J-page-list");
						$("#J-page-title").attr("original-title", "enter a title").tipsy({"trigger":"focus", "gravity":"w"});
						$("#J-page-comment").attr("original-title", "enter a comment").tipsy({"trigger":"focus", "gravity":"w"});
						var fnSerialize = function (comment) {
							return $('<li><img src="' + comment[0] + '" width="63" height="63" class="fl"/><div class="fl"><strong>' + comment[1] + '</strong><span>' + comment[2] + '</span><p>' + comment[3] + '</p></div></li>').css("backgroundColor", "#ffc");
						};
						var validator = $form.validate({
							submitHandler :function (form) {
								$.get(form.action, $form.serialize(), function (json) {
									if (json.status == 200) {
										fnSerialize(json.comment).appendTo($list).animate({"backgroundColor":"#fff"}, 2000);
										form.reset();
									}
								}, "json");
								return false;
							},
							invalidHandler:function (e, v) {
								var succ = v.successList;
								var _len = succ.length;
								if (_len) {
									for (var i = 0; i < _len; i++) {
										succ[i].setAttribute("original-title", "");
									}
								}
							},
							rules         :{
								title  :{
									required:true
								},
								comment:{
									required:true
								}
							},
							messages      :{
							},
							onfocusout    :false,
							onkeyup       :false,
							onclick       :false,
							errorPlacement:function (label, element) {
								element.attr("original-title", label.text());
							}
						});
						BY.tool.triggerFormSubmit($add, $form, validator);
					}
				},
				following  :{
					init:function () {
						this.pie("Following");
						this.page();
					},
					pie :function (title) {
						/*饼图*/
						var arr = [];
						$("#J-data tr:gt(1) td:nth-child(2)").each(function () {
							arr.push($(this).text().split(",").join(""));
						});
						if (arr.length) {
							$("#J-pie").sparkline(
								arr, {
									type     :'pie',
									hackTitle:title,
									width    :120,
									height   :120
								});
						}
					},
					page:function () {
						$("#J-page").delegate("a", "click", function () {
							var $dl = $(this).closest("dl");
							var $dt = $dl.find("dt");
							$.get(this.href, function (json) {
								if (json.status == 200) {
									$dl.html(fnSerialize(json.data, json.page));
									$dl.prepend($dt);
								}
							}, "json");
							return false;
						});
						function fnSerialize(list, page) {
							var str = '';
							for (var i = 0, _len = list.length; i < _len; i++) {
								str += '<dd><img src="' + list[i][0] + '"/><span>' + list[i][1] + '</span></dd>';
							}
							/*page*/
							str += '<dd class="page">' +
								'<a href="' + page[0] + '">上一页</a>' +
								'<a href="' + page[1] + '">下一页</a>' +
								'</dd>';
							return str;
						}
					}
				},
				follower   :{
					init:function () {
						BY.page.company.following.pie("Followers");
						BY.page.company.following.page();
					}
				}
			}
		}
	};
}

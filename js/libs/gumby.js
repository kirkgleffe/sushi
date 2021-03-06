! function(t) {
    "use strict";

    function e() {
        this.$dom = t(document), this.$html = this.$dom.find("html"), this.isOldie = !!this.$html.hasClass("oldie"), this.click = "click", this.onReady = this.onOldie = this.onTouch = !1, this.autoInit = "false" !== t("script[gumby-init]").attr("gumby-init"), this.debugMode = Boolean(t("script[gumby-debug]").length), this.touchDevice = !!(Modernizr.touch || window.navigator.userAgent.indexOf("Windows Phone") > 0), this.gumbyTouch = !1, this.touchEvents = "js/libs", this.breakpoint = Number(t("script[gumby-breakpoint]").attr("gumby-breakpoint")) || 768, this.touchEventsLoaded = !1, this.uiModulesReady = !1, this.uiModules = {}, this.inits = {};
        var e = t("script[gumby-touch]").attr("gumby-touch"),
            i = t("script[gumby-path]").attr("gumby-path");
        "false" === e ? this.touchEvents = !1 : e ? this.touchEvents = e : i && (this.touchEvents = i), this.touchDevice && (this.click += " tap"), this.touchDevice && t(window).width() < this.breakpoint ? (this.$html.addClass("gumby-touch"), this.gumbyTouch = !0) : this.$html.addClass("gumby-no-touch"), this.debugMode && this.debug("Gumby is in debug mode")
    }
    e.prototype.init = function(t) {
        var e = this,
            i = t || {};
        return this.$dom.ready(function() {
            i.debug && (e.debugMode = !0), e.debug("Initializing Gumby");
            var t = !!i.uiModules && i.uiModules;
            e.initUIModules(t), e.onReady && e.onReady(), e.isOldie && e.onOldie && e.onOldie(), Modernizr.touch && e.onTouch && e.onTouch()
        }), this
    }, e.prototype.helpers = function() {
        this.onReady && this.onReady(), this.isOldie && this.onOldie && this.onOldie(), Modernizr.touch && this.onTouch && this.onTouch()
    }, e.prototype.ready = function(t) {
        return t && "function" == typeof t && (this.onReady = t), this
    }, e.prototype.oldie = function(t) {
        return t && "function" == typeof t && (this.onOldie = t), this
    }, e.prototype.touch = function(t) {
        return t && "function" == typeof t && (this.onTouch = t), this
    }, e.prototype.console = function(t, e) {
        this.debugMode && window.console && console[console[t] ? t : "log"](e.length > 1 ? Array.prototype.slice.call(e) : e[0])
    }, e.prototype.log = function() {
        this.console("log", arguments)
    }, e.prototype.debug = function() {
        this.console("debug", arguments)
    }, e.prototype.warn = function() {
        this.console("warn", arguments)
    }, e.prototype.error = function() {
        this.console("error", arguments)
    }, e.prototype.dump = function() {
        return {
            $dom: this.$dom,
            isOldie: this.isOldie,
            touchEvents: this.touchEvents,
            debugMode: this.debugMode,
            autoInit: this.autoInit,
            uiModules: this.uiModules,
            click: this.click
        }
    }, e.prototype.selectAttr = function() {
        for (var t = 0; t < arguments.length; t++) {
            var e = arguments[t],
                i = "data-" + arguments[t],
                n = "gumby-" + arguments[t];
            if (this.is("[" + i + "]")) return !this.attr(i) || this.attr(i);
            if (this.is("[" + n + "]")) return !this.attr(n) || this.attr(n);
            if (this.is("[" + e + "]")) return !this.attr(e) || this.attr(e)
        }
        return !1
    }, e.prototype.addInitalisation = function(t, e) {
        this.inits[t] = e
    }, e.prototype.initialize = function(t, e) {
        if ("object" == typeof t)
            for (var i = 0; i < t.length; i++) this.inits[t[i]] && "function" == typeof this.inits[t[i]] ? this.inits[t[i]](e) : this.error("Error initializing module: " + t[i]);
        else this.inits[t] && "function" == typeof this.inits[t] ? this.inits[t](e) : this.error("Error initializing module: " + t);
        return this
    }, e.prototype.UIModule = function(t) {
        var e = t.module;
        this.uiModules[e] = t
    }, e.prototype.initUIModules = function(t) {
        var e, i, n = this.uiModules;
        t && (n = t);
        for (e in n) i = t ? n[e] : e, this.uiModules[i].init()
    }, window.Gumby = new e
}(jQuery),
function(t) {
    "use strict";

    function e(t) {
        Gumby.debug("Initializing Checkbox", t), this.$el = t, this.$input = this.$el.find("input[type=checkbox]");
        var e = this;
        this.$el.on(Gumby.click, function(t) {
            t.preventDefault(), e.$input.is("[disabled]") || (e.$el.hasClass("checked") ? e.update(!1) : e.update(!0))
        }).on("gumby.check", function() {
            Gumby.debug("Check event triggered", e.$el), e.update(!0)
        }).on("gumby.uncheck", function() {
            Gumby.debug("Uncheck event triggered", e.$el), e.update(!1)
        }), (this.$input.prop("checked") || this.$el.hasClass("checked")) && e.update(!0)
    }
    e.prototype.update = function(t) {
        var e = this.$el.find("span");
        t ? (Gumby.debug("Checking Checkbox", this.$el), e.append('<i class="fa-check" />'), this.$input.prop("checked", !0), Gumby.debug("Triggering onCheck event", this.$el), Gumby.debug("Triggering onChange event", this.$el), this.$el.addClass("checked").trigger("gumby.onCheck").trigger("gumby.onChange")) : (Gumby.debug("Unchecking Checkbox", this.$el), this.$input.prop("checked", !1), e.find("i").remove(), Gumby.debug("Triggering onUncheck event", this.$el), Gumby.debug("Triggering onChange event", this.$el), this.$el.removeClass("checked").trigger("gumby.onUncheck").trigger("gumby.onChange"))
    }, Gumby.addInitalisation("checkbox", function() {
        t(".checkbox").each(function() {
            var i = t(this);
            return !!i.data("isCheckbox") || (i.data("isCheckbox", !0), void new e(i))
        })
    }), Gumby.UIModule({
        module: "checkbox",
        events: ["onCheck", "onUncheck", "onChange", "check", "uncheck"],
        init: function() {
            Gumby.initialize("checkbox")
        }
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        Gumby.debug("Initializing Fixed Position", e), this.$el = e, this.fixedPoint = "", this.pinPoint = !1, this.offset = 0, this.pinOffset = 0, this.top = 0, this.constrainEl = !0, this.state = !1, this.measurements = {
            left: 0,
            width: 0
        }, this.setup();
        var i = this;
        t(window).on("scroll load", function() {
            i.monitorScroll()
        }), this.$el.on("gumby.initialize", function() {
            Gumby.debug("Re-initializing Fixed Position", e), i.setup(), i.monitorScroll()
        })
    }
    e.prototype.setup = function() {
        var e = this;
        this.fixedPoint = this.parseAttrValue(Gumby.selectAttr.apply(this.$el, ["fixed"])), this.pinPoint = Gumby.selectAttr.apply(this.$el, ["pin"]) || !1, this.offset = Number(Gumby.selectAttr.apply(this.$el, ["offset"])) || 0, this.pinOffset = Number(Gumby.selectAttr.apply(this.$el, ["pinoffset"])) || 0, this.top = Number(Gumby.selectAttr.apply(this.$el, ["top"])) || 0, this.constrainEl = Gumby.selectAttr.apply(this.$el, ["constrain"]) || !0, "false" === this.constrainEl && (this.constrainEl = !1), this.$parent = this.$el.parents(".columns, .column, .row"), this.$parent = !!this.$parent.length && this.$parent.first(), this.parentRow = !!this.$parent && !!this.$parent.hasClass("row"), this.pinPoint && (this.pinPoint = this.parseAttrValue(this.pinPoint)), this.$parent && this.constrainEl && (this.measure(), t(window).resize(function() {
            e.state && (e.measure(), e.constrain())
        }))
    }, e.prototype.monitorScroll = function() {
        var e = t(window).scrollTop(),
            i = this.fixedPoint instanceof jQuery ? this.fixedPoint.offset().top : this.fixedPoint,
            n = !1;
        this.pinPoint && (n = this.pinPoint instanceof jQuery ? this.pinPoint.offset().top : this.pinPoint), this.offset && (i -= this.offset), this.pinOffset && (n -= this.pinOffset), e >= i && "fixed" !== this.state ? (!n || n > e) && this.fix() : i > e && "fixed" === this.state ? this.unfix() : n && e >= n && "pinned" !== this.state && this.pin()
    }, e.prototype.fix = function() {
        Gumby.debug("Element has been fixed", this.$el), Gumby.debug("Triggering onFixed event", this.$el), this.state = "fixed", this.$el.css({
            top: 0 + this.top
        }).addClass("fixed").removeClass("unfixed pinned").trigger("gumby.onFixed"), this.$parent && this.constrain()
    }, e.prototype.unfix = function() {
        Gumby.debug("Element has been unfixed", this.$el), Gumby.debug("Triggering onUnfixed event", this.$el), this.state = "unfixed", this.$el.addClass("unfixed").removeClass("fixed pinned").trigger("gumby.onUnfixed")
    }, e.prototype.pin = function() {
        Gumby.debug("Element has been pinned", this.$el), Gumby.debug("Triggering onPinned event", this.$el), this.state = "pinned", this.$el.css({
            top: this.$el.offset().top
        }).addClass("pinned fixed").removeClass("unfixed").trigger("gumby.onPinned")
    }, e.prototype.constrain = function() {
        Gumby.debug("Constraining element", this.$el), this.$el.css({
            left: this.measurements.left,
            width: this.measurements.width
        })
    }, e.prototype.measure = function() {
        var t, e = this.$parent.offset();
        this.measurements.left = e.left, this.measurements.width = this.$parent.width(), this.parentRow && ((t = Number(this.$parent.css("paddingLeft").replace(/px/, ""))) && (this.measurements.left += t))
    }, e.prototype.parseAttrValue = function(e) {
        if (t.isNumeric(e)) return Number(e);
        if ("top" === e) return this.$el.offset().top;
        var i = t(e);
        return i.length ? i : (Gumby.error("Cannot find Fixed target: " + e), !1)
    }, Gumby.addInitalisation("fixed", function(i) {
        t("[data-fixed],[gumby-fixed],[fixed]").each(function() {
            var n = t(this);
            return !(!n.data("isFixed") || i) || (n.data("isFixed") && i ? (n.trigger("gumby.initialize"), !0) : (n.data("isFixed", !0), void new e(n)))
        })
    }), Gumby.UIModule({
        module: "fixed",
        events: ["initialize", "onFixed", "onUnfixed"],
        init: function() {
            Gumby.initialize("fixed")
        }
    })
}(jQuery),
function(t) {
    "use strict";

    function e(t) {
        Gumby.debug("Initializing Navbar", t), this.$el = t, this.$dropDowns = this.$el.find("li:has(.dropdown)"), this.$dropDowns.on(Gumby.click, this.toggleDropdown).on("swiperight", this.openLink), "#" !== this.$dropDowns.children("a").attr("href") && this.$dropDowns.children("a").append('<i aria-hidden="true"></i>').children("i").on(Gumby.click, this.openLink), this.$dropDowns.find(".dropdown li:not(:has(.dropdown)) a[href]").on(Gumby.click, this.openLink)
    }
    Gumby.gumbyTouch && (e.prototype.toggleDropdown = function(e) {
        e.preventDefault();
        var i = t(this);
        i.hasClass("active") ? i.removeClass("active") : i.addClass("active")
    }, e.prototype.openLink = function(e) {
        e.preventDefault();
        var i, n = t(this),
            s = n;
        n.is("i") ? s = n.parent("a") : n.is("li") && (s = n.children("a")), i = s.attr("href"), "blank" == s.attr("target") ? window.open(i) : window.location = i
    }, Gumby.addInitalisation("navbar", function() {
        t(".navbar").each(function() {
            var i = t(this);
            return !!i.data("isNavbar") || (i.data("isNavbar", !0), void new e(i))
        })
    }), Gumby.UIModule({
        module: "navbar",
        events: [],
        init: function() {
            Gumby.initialize("navbar")
        }
    }))
}(jQuery),
function(t) {
    "use strict";

    function e(t) {
        Gumby.debug("Initializing Radio Button", t), this.$el = t, this.$input = this.$el.find("input[type=radio]");
        var e = this;
        this.$el.on(Gumby.click, function(t) {
            t.preventDefault(), e.$input.is("[disabled]") || e.update()
        }).on("gumby.check", function() {
            Gumby.debug("Check event triggered", e.$el), e.update()
        }), (this.$input.prop("checked") || this.$el.hasClass("checked")) && e.update(!0)
    }
    e.prototype.update = function() {
        if (!(this.$el.hasClass("checked") && this.$input.prop("checked"))) {
            Gumby.debug("Updating Radio Button group", this.$el);
            var e = this.$el.find("span"),
                i = 'input[name="' + this.$input.attr("name") + '"]';
            t(".radio").has(i).removeClass("checked").find("input").prop("checked", !1).end().find("i").remove(), this.$input.prop("checked", !0), Gumby.debug("Triggering onCheck event", this.$el), this.$el.addClass("checked").trigger("gumby.onCheck")
        }
    }, Gumby.addInitalisation("radiobtn", function() {
        t(".radio").each(function() {
            var i = t(this);
            return !!i.data("isRadioBtn") || (i.data("isRadioBtn", !0), void new e(i))
        })
    }), Gumby.UIModule({
        module: "radiobtn",
        events: ["onCheck", "check"],
        init: function() {
            Gumby.initialize("radiobtn")
        }
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        Gumby.debug("Initializing Retina", e), this.$el = e, this.imageSrc = this.$el.attr("src"), this.retinaSrc = this.fetchRetinaImage(), this.$retinaImg = t(new Image);
        var i = this;
        return !!this.retinaSrc && void this.$retinaImg.attr("src", this.retinaSrc).load(function() {
            i.retinaImageLoaded()
        }).error(function() {
            Gumby.error("Couln't load retina image: " + i.retinaSrc)
        })
    }
    e.prototype.fetchRetinaImage = function() {
        var t = this.imageSrc,
            e = this.imageSrc.search(/(\.|\/)(gif|jpe?g|png)$/i);
        return !(0 > e) && t.substr(0, e) + "@2x" + t.substr(e, t.length)
    }, e.prototype.retinaImageLoaded = function() {
        Gumby.debug("Swapping image for retina version", this.$el), Gumby.debug("Triggering onRetina event", this.$el), this.$el.attr("src", this.$retinaImg.attr("src")).trigger("gumby.onRetina")
    }, Gumby.addInitalisation("retina", function() {
        !window.devicePixelRatio || window.devicePixelRatio <= 1 || t("img[data-retina],img[gumby-retina],img[retina]").each(function() {
            var i = t(this);
            return !!i.data("isRetina") || (i.data("isRetina", !0), void new e(i))
        })
    }), Gumby.UIModule({
        module: "retina",
        events: ["onRetina"],
        init: function() {
            Gumby.initialize("retina")
        }
    })
}(jQuery),
function(t) {
    "use strict";

    function e(t) {
        Gumby.debug("Initializing Skiplink", t), this.$el = t, this.targetPos = 0, this.duration = 0, this.offset = !1, this.easing = "", this.update = !1, this.setup();
        var e = this;
        this.$el.on(Gumby.click + " gumby.skip", function(t) {
            t.preventDefault(), "skip" === t.namespace && Gumby.debug("Skip event triggered", e.$el), e.update ? e.calculateTarget(e.skipTo) : e.skipTo()
        }).on("gumby.initialize", function() {
            Gumby.debug("Re-initializing Skiplink", e.$el), e.setup()
        })
    }
    e.prototype.setup = function() {
        this.duration = Number(Gumby.selectAttr.apply(this.$el, ["duration"])) || 200, this.offset = Gumby.selectAttr.apply(this.$el, ["offset"]) || !1, this.easing = Gumby.selectAttr.apply(this.$el, ["easing"]) || "swing", this.update = !!Gumby.selectAttr.apply(this.$el, ["update"]), this.calculateTarget()
    }, e.prototype.calculateTarget = function(e) {
        var i, n = Gumby.selectAttr.apply(this.$el, ["goto"]);
        if ("top" == n) this.targetPos = 0;
        else if (t.isNumeric(n)) this.targetPos = Number(n);
        else {
            if (!(i = t(n)).length) return Gumby.error("Cannot find skiplink target: " + n), !1;
            this.targetPos = i.offset().top
        }
        e && e.apply(this)
    }, e.prototype.skipTo = function() {
        Gumby.debug("Skipping to target", this.$el);
        var e = this;
        t("html,body").animate({
            scrollTop: this.calculateOffset()
        }, this.duration, this.easing).promise().done(function() {
            Gumby.debug("Triggering onComplete event", e.$el), e.$el.trigger("gumby.onComplete")
        })
    }, e.prototype.calculateOffset = function() {
        if (!this.offset) return this.targetPos;
        var t = this.offset.substr(0, 1),
            e = Number(this.offset.substr(1, this.offset.length));
        return "-" === t ? this.targetPos - e : "+" === t ? this.targetPos + e : void 0
    }, Gumby.addInitalisation("skiplink", function(i) {
        t(".skiplink > a, .skip").each(function() {
            var n = t(this);
            return !(!n.data("isSkipLink") || i) || (n.data("isSkipLink") && i ? (n.trigger("gumby.initialize"), !0) : (n.data("isSkipLink", !0), void new e(n)))
        })
    }), Gumby.UIModule({
        module: "skiplink",
        events: ["initialize", "onComplete", "skip"],
        init: function() {
            Gumby.initialize("skiplink")
        }
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        Gumby.debug("Initializing Tabs", e), this.$el = e, this.$nav = this.$el.find("ul.tab-nav > li"), this.$content = this.$el.find(".tab-content");
        var i = this;
        this.$nav.children("a").on(Gumby.click, function(e) {
            e.preventDefault(), i.click(t(this))
        }), this.$el.on("gumby.set", function(t, e) {
            Gumby.debug("Set event triggered", i.$el), i.set(t, e)
        })
    }
    e.prototype.click = function(t) {
        var e = t.parent().index();
        this.$nav.eq(e).add(this.$content.eq(e)).hasClass("active") || (Gumby.debug("Setting active tab to " + e, this.$el), this.$nav.add(this.$content).removeClass("active"), this.$nav.eq(e).add(this.$content.eq(e)).addClass("active"), Gumby.debug("Triggering onChange event", this.$el), this.$el.trigger("gumby.onChange", e))
    }, e.prototype.set = function(t, e) {
        this.$nav.eq(e).find("a").trigger(Gumby.click)
    }, Gumby.addInitalisation("tabs", function() {
        t(".tabs").each(function() {
            var i = t(this);
            return !!i.data("isTabs") || (i.data("isTabs", !0), void new e(i))
        })
    }), Gumby.UIModule({
        module: "tabs",
        events: ["onChange", "set"],
        init: function() {
            Gumby.initialize("tabs")
        }
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        this.$el = t(e), this.targets = [], this.on = "", this.className = "", this.self = !1, this.$el.length && (Gumby.debug("Initializing Toggle", e), this.init())
    }

    function i(e) {
        this.$el = t(e), this.targets = [], this.on = "", this.className = "", this.self = !1, this.$el.length && (Gumby.debug("Initializing Switch", e), this.init())
    }
    e.prototype.init = function() {
        var t = this;
        this.setup(), this.$el.on(this.on, function(e) {
            e.preventDefault(), t.trigger(t.triggered)
        }).on("gumby.trigger", function() {
            Gumby.debug("Trigger event triggered", t.$el), t.trigger(t.triggered)
        }).on("gumby.initialize", function() {
            Gumby.debug("Re-initializing " + t.constructor, $el), t.setup()
        })
    }, e.prototype.setup = function() {
        this.targets = this.parseTargets(), this.on = Gumby.selectAttr.apply(this.$el, ["on"]) || Gumby.click, this.className = Gumby.selectAttr.apply(this.$el, ["classname"]) || "active", this.self = "false" === Gumby.selectAttr.apply(this.$el, ["self"])
    }, e.prototype.parseTargets = function() {
        var e = Gumby.selectAttr.apply(this.$el, ["trigger"]),
            i = [];
        return !!e && (-1 === e.indexOf("|") ? !!this.checkTargets([e]) && [t(e)] : (i = e.split("|"), !!this.checkTargets(i) && (i.length > 1 ? [t(i[0]), t(i[1])] : [t(i[0])])))
    }, e.prototype.checkTargets = function(e) {
        for (var i = 0; i < e.length; i++)
            if (e[i] && !t(e[i]).length) return Gumby.error("Cannot find " + this.constructor.name + " target: " + e[i]), !1;
        return !0
    }, e.prototype.triggered = function() {
        Gumby.debug("Triggering onTrigger event", this.$el), this.$el.trigger("gumby.onTrigger", [this.$el.hasClass(this.className)])
    }, i.prototype = new e, i.prototype.constructor = i, e.prototype.trigger = function(t) {
        var e;
        Gumby.debug("Triggering Toggle", this.$el), this.targets ? 1 == this.targets.length ? this.$el.add(this.targets[0]).toggleClass(this.className) : this.targets.length > 1 && (this.targets[0].hasClass(this.className) ? (e = this.targets[0], this.self || (e = e.add(this.$el)), e.removeClass(this.className), this.targets[1].addClass(this.className)) : (e = this.targets[0], this.self || (e = e.add(this.$el)), e.addClass(this.className), this.targets[1].removeClass(this.className))) : this.$el.toggleClass(this.className), t && "function" == typeof t && t.apply(this)
    }, i.prototype.trigger = function(t) {
        var e;
        Gumby.debug("Triggering Switch", this.$el), this.targets ? 1 == this.targets.length ? (e = this.targets[0], this.self || (e = e.add(this.$el)), e.addClass(this.className)) : this.targets.length > 1 && (e = this.targets[0], this.self || (e = e.add(this.$el)), e.addClass(this.className), this.targets[1].removeClass(this.className)) : this.$el.addClass(this.className), t && "function" == typeof t && t.apply(this)
    }, Gumby.addInitalisation("toggles", function(i) {
        t(".toggle").each(function() {
            var n = t(this);
            return !(!n.data("isToggle") || i) || (n.data("isToggle") && i && n.trigger("gumby.initialize"), n.data("isToggle", !0), void new e(n))
        })
    }), Gumby.addInitalisation("switches", function(e) {
        t(".switch").each(function() {
            var n = t(this);
            return !(!n.data("isSwitch") || e) || (n.data("isSwitch") && e ? (n.trigger("gumby.initialize"), !0) : (n.data("isSwitch", !0), void new i(n)))
        })
    }), Gumby.UIModule({
        module: "toggleswitch",
        events: ["initialize", "trigger", "onTrigger"],
        init: function() {
            Gumby.initialize("switches"), Gumby.initialize("toggles")
        }
    })
}(jQuery),
function(t) {
    "use strict";

    function e(t, e) {
        Gumby && Gumby.debug("Initializing Validation", t), this.$this = t, this.$field = this.$this.parents(".field"), this.req = e || function() {
            return !!this.$this.val().length
        };
        var i = this;
        this.$this.is("[type=checkbox], [type=radio]") ? (this.$field = this.$this.parent("label"), this.$field.on("gumby.onChange", function() {
            i.validate()
        })) : this.$this.is("select") ? (this.$field = this.$this.parents(".picker"), this.$field.on("change", function() {
            i.validate()
        })) : this.$this.on("blur", function(t) {
            9 !== t.which && i.validate()
        })
    }
    e.prototype.validate = function() {
        var t = this.req(this.$this);
        return t ? this.$field.removeClass("danger").addClass("success") : this.$field.removeClass("success").addClass("danger"), t
    }, t.fn.validation = function(i) {
        var n = t.extend({
                submit: !1,
                fail: !1,
                required: []
            }, i),
            s = [];
        return this.each(function() {
            if (!n.required.length) return !1;
            var i, a = t(this),
                o = n.required.length;
            for (i = 0; o > i; i++) s.push(new e(a.find('[name="' + n.required[i].name + '"]'), n.required[i].validate || !1));
            a.on("submit", function(t) {
                var e = !1;
                if (!a.data("passed")) {
                    t.preventDefault();
                    var i, o = s.length;
                    for (i = 0; o > i; i++) s[i].validate() || (e = !0);
                    if (e) {
                        if (n.fail && "function" == typeof n.fail) return void n.fail()
                    } else {
                        if (n.submit && "function" == typeof n.submit) return void n.submit(a.serializeArray());
                        a.data("passed", !0).submit()
                    }
                }
            })
        })
    }
}(jQuery),
function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing FitText", t), this.$el = t, this.rate = 0, this.fontSizes = {}, this.debugDelay = 0, this.setup();
        var e = this;
        this.$el.on("gumby.initialize", function() {
            Gumby.debug("Re-initializing FitText", e.$el), e.setup(), e.resize()
        }), $(window).on("load resize orientationchange", function() {
            e.resize()
        }), this.resize()
    }
    t.prototype.setup = function() {
        this.rate = Number(Gumby.selectAttr.apply(this.$el, ["rate"])) || 1, this.fontSizes = this.parseSizes(Gumby.selectAttr.apply(this.$el, ["sizes"]))
    }, t.prototype.resize = function() {
        var t = this.calculateSize(),
            e = this;
        this.$el.css("font-size", t), clearTimeout(this.debugDelay), this.debugDelay = setTimeout(function() {
            Gumby.debug("Updated font size to " + t + "px", e.$el)
        }, 200)
    }, t.prototype.calculateSize = function() {
        return Math.max(Math.min(this.$el.width() / (10 * this.rate), parseFloat(this.fontSizes.max)), parseFloat(this.fontSizes.min))
    }, t.prototype.parseSizes = function(t) {
        var e = {
            min: Number.NEGATIVE_INFINITY,
            max: Number.POSITIVE_INFINITY
        };
        return t ? (t.indexOf("|") > -1 && (t = t.split("|"), e.min = Number(t[0]) || e.min, e.max = Number(t[1]) || e.max), e.min = Number(t) || e.min, e) : e
    }, Gumby.addInitalisation("fittext", function(e) {
        $(".fittext").each(function() {
            var i = $(this);
            return !(!i.data("isFittext") || e) || (i.data("isFittext") && e ? (i.trigger("gumby.initialize"), !0) : (i.data("isFittext", !0), void new t(i)))
        })
    }), Gumby.UIModule({
        module: "fittext",
        events: ["initialize"],
        init: function() {
            Gumby.initialize("fittext")
        }
    })
}(),
function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing Shuffle", t), this.$el = t, this.$children = [], this.children = [], this.shuffles = [], this.def = "", this.current = "";
        var e = this;
        this.setup(), $(window).on("load resize", function() {
            e.handleTests()
        }), this.$el.on("gumby.shuffle", function() {
            Gumby.debug("Shuffle event triggered", e.$el), e.handleTests()
        }).on("gumby.initialize", function() {
            Gumby.debug("Re-initializing shuffle module", e.$el), e.setup()
        }), e.handleTests()
    }
    t.prototype.setup = function() {
        this.$children = this.$el.children(Gumby.selectAttr.apply(this.$el, ["children"])), this.children = $.makeArray(this.$children), this.shuffles = this.parseAttrValue(Gumby.selectAttr.apply(this.$el, ["shuffle"])), this.def = this.defaultSequence(this.$children.length), this.current = "default"
    }, t.prototype.handleTests = function() {
        var t = this,
            e = !1;
        window.matchMedia && $(this.shuffles).each(function(i, n) {
            return window.matchMedia(n.test).matches ? (t.current !== n.test && (t.current = n.test, t.shuffle(n.sequence)), e = !0, !1) : void 0
        }), e || "default" === this.current || (this.current = "default", t.shuffle(this.def))
    }, t.prototype.shuffle = function(t) {
        var e = this,
            i = [],
            n = [];
        t ? (i = t.split("-"), $(i).each(function(t) {
            n.push($(e.children[Number(i[t])]))
        })) : n = this.children, this.$children.remove(), $(n).each(function() {
            e.$el.append($(this))
        }), Gumby.debug("Children shuffled", n, e.$el), Gumby.debug("Triggering onShuffle event", this.$el), this.$el.trigger("gumby.onShuffle", [$(n)])
    }, t.prototype.defaultSequence = function(t) {
        for (var e = "", i = 0; t > i; i++) e += i + "-";
        return e.substr(0, e.length - 1)
    }, t.prototype.parseAttrValue = function(t) {
        var e = t.split(","),
            i = [],
            n = [];
        return $(e).each(function(t, e) {
            return 2 !== (n = e.split("|")).length || void i.push({
                test: n[0],
                sequence: n[1]
            })
        }), i
    }, Gumby.addInitalisation("shuffle", function(e) {
        $("[data-shuffle],[gumby-shuffle],[shuffle]").each(function() {
            var i = $(this);
            return !(!i.data("isShuffle") || e) || (i.data("isShuffle") && e ? (i.trigger("gumby.initialize"), !0) : (i.data("isShuffle", !0), void new t(i)))
        })
    }), Gumby.UIModule({
        module: "shuffle",
        events: ["onShuffle", "shuffle"],
        init: function() {
            Gumby.initialize("shuffle")
        }
    })
}(),
function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing Responsive Images module", t), this.$el = t, this.type = "", this.supports = "", this.media = "", this.def = "", this.current = "", this.setup();
        var e = this;
        $(window).on("load gumby.trigger " + (!this.media || "resize"), function() {
            e.fire()
        }), this.$el.on("gumby.initialize", function() {
            Gumby.debug("Re-initializing Responsive Images module", e.$el), e.setup(), e.fire()
        }), e.fire()
    }
    t.prototype.setup = function() {
        this.type = this.$el.is("img") ? "img" : "bg", this.supports = Gumby.selectAttr.apply(this.$el, ["supports"]) || !1, this.media = Gumby.selectAttr.apply(this.$el, ["media"]) || !1, this.def = Gumby.selectAttr.apply(this.$el, ["default"]) || !1, this.supports && (this.supports = this.parseAttr(this.supports)), this.media && (this.media = this.parseAttr(this.media)), this.checks = {
            supports: function(t) {
                return Modernizr[t]
            },
            media: function(t) {
                return window.matchMedia(t).matches
            }
        }
    }, t.prototype.fire = function() {
        var t = !1;
        return this.supports && Modernizr && (t = this.handleTests("supports", this.supports)), this.media && window.matchMedia && !t && (t = this.handleTests("media", this.media)), !t && this.def && (t = this.def), t ? void(this.current !== t && (this.current = t, this.insertImage(this.type, t))) : (Gumby.warn("No responsive images tests passed", this.$el), !1)
    }, t.prototype.handleTests = function(t, e) {
        var i = this,
            n = !1;
        return $(e).each(function(e, s) {
            return i.check(t, s.test) ? (n = s.img, !1) : void 0
        }), n
    }, t.prototype.check = function(t, e) {
        return this.checks[t](e)
    }, t.prototype.insertImage = function(t, e) {
        var i = this;
        $(new Image).load(function() {
            "img" === t ? i.$el.attr("src", e) : i.$el.css("background-image", "url(" + e + ")"), Gumby.debug("Triggering onChange event", e, i.$el), i.$el.trigger("gumby.onChange", [e])
        }).attr("src", e)
    }, t.prototype.parseAttr = function(t) {
        var e = t.split(","),
            i = [],
            n = [];
        return $(e).each(function(t, e) {
            return 2 !== (n = e.split("|")).length || void i.push({
                test: n[0],
                img: n[1]
            })
        }), i
    }, Gumby.addInitalisation("images", function(e) {
        $("[gumby-supports],[data-supports],[supports],[gumby-media],[data-media],[media]").each(function() {
            var i = $(this);
            return !(!i.data("isImage") || e) || (i.data("isImage") && e ? (i.trigger("gumby.initialize"), !0) : (i.data("isImage", !0), void new t(i)))
        })
    }), Gumby.UIModule({
        module: "images",
        events: ["onChange", "trigger"],
        init: function() {
            Gumby.initialize("images")
        }
    })
}(),
function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing Parallax", t), this.$el = t, this.$holder = {}, this.ratio = this.offset = 0;
        var e = this;
        this.setup(), this.$el.on("gumby.initialize", function() {
            Gumby.debug("Re-initializing Parallax", e.$el), e.setup()
        }), this.setPosition(), this.$holder.scroll(function() {
            e.scroll()
        }), this.scroll()
    }
    Gumby.gumbyTouch || (t.prototype.setup = function() {
        this.$holder = Gumby.selectAttr.apply(this.$el, ["holder"]), this.ratio = Number(Gumby.selectAttr.apply(this.$el, ["parallax"])) || 1, this.offset = Number(Gumby.selectAttr.apply(this.$el, ["offset"])) || 0, this.startPos = (this.$el.offset().top - this.offset) * this.ratio, this.$holder && (this.$holder = $(this.$holder)), this.$holder && this.$holder.length ? this.startPos -= this.$holder.offset().top : this.$holder = $(window)
    }, t.prototype.scroll = function() {
        this.setPosition(this.startPos - this.$holder.scrollTop() * this.ratio)
    }, t.prototype.setPosition = function(t) {
        this.$el.css("backgroundPosition", "50% " + t + "px")
    }, Gumby.addInitalisation("parallax", function() {
        $(".parallax").each(function() {
            var e = $(this);
            return !!e.data("isParallax") || (e.data("isParallax", !0), void new t(e))
        })
    }), Gumby.UIModule({
        module: "parallax",
        events: [],
        init: function() {
            Gumby.initialize("parallax")
        }
    }))
}(),
function(t) {
    "use strict";

    function e(t) {
        Gumby.debug("Initializing InViewWatcher", t), this.$el = t;
        var e = this;
        this.setup(), this.$el.on("gumby.initialize", function() {
            Gumby.debug("Re-initializing InViewWatcher", e.$el), e.setup()
        })
    }
    e.prototype.setup = function() {
        Gumby.debug("Setting up instance of InViewWatcher", this.$el), this.targets = this.parseTargets();
        var t = Gumby.selectAttr.apply(this.$el, ["classname"]);
        t ? t.indexOf("|") > -1 ? (t = t.split("|"), this.classname = t[0], this.classnameBottom = t[1] || "", this.classnameTop = t[2] || t[1] || "") : (this.classname = t, this.classnameBottom = "", this.classnameTop = "") : (this.classname = "active", this.classnameBottom = "", this.classnameTop = "");
        var e = Gumby.selectAttr.apply(this.$el, ["offset"]);
        e = 0 != e ? e.split("|") : 0, this.offset = e[0] || 0, this.offsetTop = e[1] || e[0] || 0, this.offsetBottom = this.offset
    }, e.prototype.parseTargets = function() {
        var e = Gumby.selectAttr.apply(this.$el, ["target"]);
        if (!e) return !1;
        var i = e.split("|");
        return 1 === i.length ? t(i[0]) : t(i.join(", "))
    };
    var i, n, s, a, o, r, u, h, l = t(window).height(),
        c = [];
    t(window).on("scroll", function(e) {
        for (i = t(this).scrollTop(), n = 0; n < c.length && (s = c[n], a = s.targets || s.$el, "none" != s.$el.css("display")); n++) {
            o = s.$el.offset().top, r = s.$el.height(), u = s.offsetTop, h = s.offsetBottom;
            var d = o > i - h + l,
                p = o + r - u < i;
            p || d ? p && !d ? (a.hasClass(s.classname) && a.removeClass(s.classname), a.hasClass(s.classnameBottom) && a.removeClass(s.classnameBottom), a.hasClass(s.classnameTop) || (a.addClass(s.classnameTop), a.trigger("gumby.offtop"))) : d && !p && (a.hasClass(s.classname) && a.removeClass(s.classname), a.hasClass(s.classnameTop) && a.removeClass(s.classnameTop), a.hasClass(s.classnameBottom) || (a.addClass(s.classnameBottom), a.trigger("gumby.offbottom"))) : (a.hasClass(s.classnameTop) && a.removeClass(s.classnameTop), a.hasClass(s.classnameBottom) && a.removeClass(s.classnameBottom), a.hasClass(s.classname) || (a.addClass(s.classname), a.trigger("gumby.inview")))
        }
    }), t(window).on("resize", function() {
        l = t(this).height(), t(window).trigger("scroll")
    }), t(window).load(function() {
        t(window).trigger("scroll")
    }), Gumby.addInitalisation("inview", function(i) {
        t(".inview").each(function() {
            var n = t(this);
            if (n.data("isInView") && !i) return !0;
            n.data("isInView") && i && n.trigger("gumby.initialize"), n.data("isInView", !0), c.push(new e(n))
        }), t(window).trigger("scroll")
    }), Gumby.UIModule({
        module: "inview",
        events: ["initialize", "trigger", "onTrigger"],
        init: function() {
            Gumby.initialize("inview")
        }
    })
}(jQuery),
function(t) {
    "use strict";

    function e(t) {
        t = "string" == typeof t && t, this.forEach(function(e) {
            "supports" !== t && t || !e.supports ? "media" !== t && t || !e.media || function() {
                return this.media && window.matchMedia && window.matchMedia(this.media).matches && "complete" !== this.element.getAttribute(s.media) ? void i.apply(this) : void 0
            }.apply(e) : function() {
                return this.supports && Modernizr && "complete" !== this.element.getAttribute(s.support) ? (t = this.supports.split(","), (t.length > 1 ? (e = t, n = !0, e.forEach(function(t) {
                    Modernizr[t] || (n = !1)
                }), n) : Modernizr[t]) ? void i.apply(this) : void 0) : void 0;
                var t, e, n
            }.apply(e)
        })
    }

    function i() {
        for (var t = this.element.childNodes.length, e = 0; t > e; e++) 8 === this.element.childNodes[e].nodeType && n.apply(this, [e])
    }

    function n(e) {
        this.element.insertAdjacentHTML(this.insert, this.element.childNodes[e].textContent), this.element.setAttribute(s.media, "complete"),
            function() {
                t(this.element).trigger("gumby.onInsert")
            }.apply(this)
    }
    var s = {
        media: "gumby-comment-media",
        supports: "gumby-comment-supports",
        insert: "gumby-comment-insert"
    };
    Gumby.addInitalisation("comments", function() {
        var t = function(t) {
            for (var e, i, n, a = 0, o = t.length, r = []; o > a; a++) e = t[a], i = e.getAttribute(s.insert) || "beforeend", n = {
                element: e,
                insert: i,
                media: e.getAttribute(s.media) || !1,
                supports: e.getAttribute(s.supports) || !1
            }, r.push(n);
            return r
        }(document.querySelectorAll("[" + s.media + "],[" + s.supports + "]"));
        window.addEventListener("resize", e.bind(t, "media")), window.addEventListener("load", e.bind(t))
    }), Gumby.UIModule({
        module: "comments",
        events: ["onInsert"],
        init: function() {
            Gumby.initialize("comments")
        }
    })
}(jQuery),
function(t) {
    "use strict";
    Gumby.touchDevice && Gumby.touchEvents || !Gumby.autoInit ? Gumby.touchEvents && Gumby.touchDevice && (Gumby.debug("Loading jQuery mobile touch events"), yepnope.errorTimeout = 2e3, Modernizr.load({
        test: Modernizr.touch,
        yep: Gumby.touchEvents + "/jquery.mobile.custom.min.js",
        complete: function() {
            t.mobile || Gumby.error("Error loading jQuery mobile touch events"), Gumby.touchEventsLoaded = !0, Gumby.autoInit ? window.Gumby.init() : Gumby.uiModulesReady && Gumby.helpers()
        }
    })) : window.Gumby.init(), "function" == typeof define && define.amd && define(window.Gumby)
}(jQuery), window.matchMedia = window.matchMedia || function(t) {
        "use strict";
        var e, i = t.documentElement,
            n = i.firstElementChild || i.firstChild,
            s = t.createElement("body"),
            a = t.createElement("div");
        return a.id = "mq-test-1", a.style.cssText = "position:absolute;top:-100em", s.style.background = "none", s.appendChild(a),
            function(t) {
                return a.innerHTML = '&shy;<style media="' + t + '"> #mq-test-1 { width: 42px; }</style>', i.insertBefore(s, n), e = 42 === a.offsetWidth, i.removeChild(s), {
                    matches: e,
                    media: t
                }
            }
    }(document),
    function(t, e, i) {
        function n(t, n) {
            var s = this,
                a = i(s);
            if (s.value == a.attr("placeholder") && a.hasClass("placeholder"))
                if (a.data("placeholder-password")) {
                    if (a = a.hide().next().show().attr("id", a.removeAttr("id").data("placeholder-id")), !0 === t) return a[0].value = n;
                    a.focus()
                } else s.value = "", a.removeClass("placeholder"), s == e.activeElement && s.select()
        }

        function s() {
            var t, e, s, a, o = i(this),
                r = this.id;
            if ("" == this.value) {
                if ("password" == this.type) {
                    if (!o.data("placeholder-textinput")) {
                        try {
                            t = o.clone().attr({
                                type: "text"
                            })
                        } catch (n) {
                            t = i("<input>").attr(i.extend((e = this, s = {}, a = /^jQuery\d+$/, i.each(e.attributes, function(t, e) {
                                e.specified && !a.test(e.name) && (s[e.name] = e.value)
                            }), s), {
                                type: "text"
                            }))
                        }
                        t.removeAttr("name").data({
                            "placeholder-password": !0,
                            "placeholder-id": r
                        }).bind("focus.placeholder", n), o.data({
                            "placeholder-textinput": t,
                            "placeholder-id": r
                        }).before(t)
                    }
                    o = o.removeAttr("id").hide().prev().attr("id", r).show()
                }
                o.addClass("placeholder"), o[0].value = o.attr("placeholder")
            } else o.removeClass("placeholder")
        }
        var a, o, r = "placeholder" in e.createElement("input"),
            u = "placeholder" in e.createElement("textarea"),
            h = i.fn,
            l = i.valHooks;
        r && u ? (o = h.placeholder = function() {
            return this
        }).input = o.textarea = !0 : ((o = h.placeholder = function() {
            return this.filter((r ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
                "focus.placeholder": n,
                "blur.placeholder": s
            }).data("placeholder-enabled", !0).trigger("blur.placeholder"), this
        }).input = r, o.textarea = u, a = {
            get: function(t) {
                var e = i(t);
                return e.data("placeholder-enabled") && e.hasClass("placeholder") ? "" : t.value
            },
            set: function(t, a) {
                var o = i(t);
                return o.data("placeholder-enabled") ? ("" == a ? (t.value = a, t != e.activeElement && s.call(t)) : o.hasClass("placeholder") && n.call(t, !0, a) || (t.value = a), o) : t.value = a
            }
        }, r || (l.input = a), u || (l.textarea = a), i(function() {
            i(e).delegate("form", "submit.placeholder", function() {
                var t = i(".placeholder", this).each(n);
                setTimeout(function() {
                    t.each(s)
                }, 10)
            })
        }), i(t).bind("beforeunload.placeholder", function() {
            i(".placeholder").each(function() {
                this.value = ""
            })
        }))
    }(this, document, jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(t, e, i, n, s) {
            return jQuery.easing[jQuery.easing.def](t, e, i, n, s)
        },
        easeInQuad: function(t, e, i, n, s) {
            return n * (e /= s) * e + i
        },
        easeOutQuad: function(t, e, i, n, s) {
            return -n * (e /= s) * (e - 2) + i
        },
        easeInOutQuad: function(t, e, i, n, s) {
            return 1 > (e /= s / 2) ? n / 2 * e * e + i : -n / 2 * (--e * (e - 2) - 1) + i
        },
        easeInCubic: function(t, e, i, n, s) {
            return n * (e /= s) * e * e + i
        },
        easeOutCubic: function(t, e, i, n, s) {
            return n * ((e = e / s - 1) * e * e + 1) + i
        },
        easeInOutCubic: function(t, e, i, n, s) {
            return 1 > (e /= s / 2) ? n / 2 * e * e * e + i : n / 2 * ((e -= 2) * e * e + 2) + i
        },
        easeInQuart: function(t, e, i, n, s) {
            return n * (e /= s) * e * e * e + i
        },
        easeOutQuart: function(t, e, i, n, s) {
            return -n * ((e = e / s - 1) * e * e * e - 1) + i
        },
        easeInOutQuart: function(t, e, i, n, s) {
            return 1 > (e /= s / 2) ? n / 2 * e * e * e * e + i : -n / 2 * ((e -= 2) * e * e * e - 2) + i
        },
        easeInQuint: function(t, e, i, n, s) {
            return n * (e /= s) * e * e * e * e + i
        },
        easeOutQuint: function(t, e, i, n, s) {
            return n * ((e = e / s - 1) * e * e * e * e + 1) + i
        },
        easeInOutQuint: function(t, e, i, n, s) {
            return 1 > (e /= s / 2) ? n / 2 * e * e * e * e * e + i : n / 2 * ((e -= 2) * e * e * e * e + 2) + i
        },
        easeInSine: function(t, e, i, n, s) {
            return -n * Math.cos(e / s * (Math.PI / 2)) + n + i
        },
        easeOutSine: function(t, e, i, n, s) {
            return n * Math.sin(e / s * (Math.PI / 2)) + i
        },
        easeInOutSine: function(t, e, i, n, s) {
            return -n / 2 * (Math.cos(Math.PI * e / s) - 1) + i
        },
        easeInExpo: function(t, e, i, n, s) {
            return 0 == e ? i : n * Math.pow(2, 10 * (e / s - 1)) + i
        },
        easeOutExpo: function(t, e, i, n, s) {
            return e == s ? i + n : n * (1 - Math.pow(2, -10 * e / s)) + i
        },
        easeInOutExpo: function(t, e, i, n, s) {
            return 0 == e ? i : e == s ? i + n : 1 > (e /= s / 2) ? n / 2 * Math.pow(2, 10 * (e - 1)) + i : n / 2 * (2 - Math.pow(2, -10 * --e)) + i
        },
        easeInCirc: function(t, e, i, n, s) {
            return -n * (Math.sqrt(1 - (e /= s) * e) - 1) + i
        },
        easeOutCirc: function(t, e, i, n, s) {
            return n * Math.sqrt(1 - (e = e / s - 1) * e) + i
        },
        easeInOutCirc: function(t, e, i, n, s) {
            return 1 > (e /= s / 2) ? -n / 2 * (Math.sqrt(1 - e * e) - 1) + i : n / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i
        },
        easeInElastic: function(t, e, i, n, s) {
            t = 1.70158;
            var a = 0,
                o = n;
            return 0 == e ? i : 1 == (e /= s) ? i + n : (a || (a = .3 * s), o < Math.abs(n) ? (o = n, t = a / 4) : t = a / (2 * Math.PI) * Math.asin(n / o), -o * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * s - t) * Math.PI / a) + i)
        },
        easeOutElastic: function(t, e, i, n, s) {
            t = 1.70158;
            var a = 0,
                o = n;
            return 0 == e ? i : 1 == (e /= s) ? i + n : (a || (a = .3 * s), o < Math.abs(n) ? (o = n, t = a / 4) : t = a / (2 * Math.PI) * Math.asin(n / o), o * Math.pow(2, -10 * e) * Math.sin(2 * (e * s - t) * Math.PI / a) + n + i)
        },
        easeInOutElastic: function(t, e, i, n, s) {
            t = 1.70158;
            var a = 0,
                o = n;
            return 0 == e ? i : 2 == (e /= s / 2) ? i + n : (a || (a = 1.5 * .3 * s), o < Math.abs(n) ? (o = n, t = a / 4) : t = a / (2 * Math.PI) * Math.asin(n / o), 1 > e ? -.5 * o * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * s - t) * Math.PI / a) + i : .5 * o * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e * s - t) * Math.PI / a) + n + i)
        },
        easeInBack: function(t, e, i, n, s, a) {
            return void 0 == a && (a = 1.70158), n * (e /= s) * e * ((a + 1) * e - a) + i
        },
        easeOutBack: function(t, e, i, n, s, a) {
            return void 0 == a && (a = 1.70158), n * ((e = e / s - 1) * e * ((a + 1) * e + a) + 1) + i
        },
        easeInOutBack: function(t, e, i, n, s, a) {
            return void 0 == a && (a = 1.70158), 1 > (e /= s / 2) ? n / 2 * e * e * ((1 + (a *= 1.525)) * e - a) + i : n / 2 * ((e -= 2) * e * ((1 + (a *= 1.525)) * e + a) + 2) + i
        },
        easeInBounce: function(t, e, i, n, s) {
            return n - jQuery.easing.easeOutBounce(t, s - e, 0, n, s) + i
        },
        easeOutBounce: function(t, e, i, n, s) {
            return (e /= s) < 1 / 2.75 ? 7.5625 * n * e * e + i : 2 / 2.75 > e ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : 2.5 / 2.75 > e ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i
        },
        easeInOutBounce: function(t, e, i, n, s) {
            return s / 2 > e ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, n, s) + i : .5 * jQuery.easing.easeOutBounce(t, 2 * e - s, 0, n, s) + .5 * n + i
        }
    }), $(function() {
        (Gumby.isOldie || $("html").hasClass("ie9")) && $("input, textarea").placeholder()
    });
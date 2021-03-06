(function (a) {
    function e(a) {
        return d.test(a)
    }

    a.fn.tipTip = function (b) {
        var c = {activation: "hover", keepAlive: false, maxWidth: "200px", edgeOffset: 0, defaultPosition: "bottom", delay: 400, delayHover: 500, fadeIn: 200, fadeOut: 200, attribute: "title", content: false, enter: function () {
        }, afterEnter: function () {
        }, exit: function () {
        }, afterExit: function () {
        }, cssClass: "", detectTextDir: true};
        if (a("#tiptip_holder").length <= 0) {
            var d = a("<div>", {id: "tiptip_arrow_inner"}), f = a("<div>", {id: "tiptip_arrow"}).append(d), g = a("<div>", {id: "tiptip_content"}), h = a("<div>", {id: "tiptip_holder"}).append(f).append(g);
            a("body").append(h)
        } else {
            var h = a("#tiptip_holder"), g = a("#tiptip_content"), f = a("#tiptip_arrow")
        }
        return this.each(function () {
            function n() {
                if (j.enter.call(d, k) === false) {
                    return
                }
                var b;
                if (j.content) {
                    b = a.isFunction(j.content) ? j.content.call(d, k) : j.content
                } else {
                    b = j.content = d.attr(j.attribute);
                    d.removeAttr(j.attribute)
                }
                if (!b) {
                    return
                }
                g.html(b);
                h.hide().removeAttr("class").css({"max-width": j.maxWidth});
                if (j.cssClass) {
                    h.addClass(j.cssClass)
                }
                p();
                if (l) {
                    clearTimeout(l)
                }
                l = setTimeout(function () {
                    h.stop(true, true).fadeIn(j.fadeIn)
                }, j.delay);
                a(window).bind("resize.tipTip scroll.tipTip", p);
                d.addClass("tiptip_visible");
                j.afterEnter.call(d, k)
            }

            function o() {
                if (j.exit.call(d, k) === false) {
                    return
                }
                if (l) {
                    clearTimeout(l)
                }
                h.fadeOut(j.fadeOut);
                a(window).unbind("resize.tipTip scroll.tipTip");
                d.removeClass("tiptip_visible");
                j.afterExit.call(d, k)
            }

            function p() {
                function C() {
                    q = r.top;
                    m = c - p - j.edgeOffset - v / 2;
                    n = i + (k - o) / 2
                }

                function D() {
                    q = r.bottom;
                    m = c + l + j.edgeOffset;
                    n = i + (k - o) / 2
                }

                function E() {
                    q = r.left;
                    m = c + (l - p) / 2;
                    n = i - o - j.edgeOffset - u / 2
                }

                function F() {
                    q = r.right;
                    m = c + (l - p) / 2;
                    n = i + k + j.edgeOffset
                }
                var b = d.offset(), c = b.top, i = b.left, k = d.outerWidth(), l = d.outerHeight(), m, n, o = h.outerWidth(), p = h.outerHeight(), q, r = {top: "tip_top", bottom: "tip_bottom", left: "tip_left", right: "tip_right"}, s, t, u = 12, v = 12, w = a(window), x = w.scrollTop(), y = w.scrollLeft(), z = w.width(), A = w.height();
                var B = j.detectTextDir && e(g.text());
                if (j.defaultPosition == "bottom") {
                    D()
                } else if (j.defaultPosition == "top") {
                    C()
                } else if (j.defaultPosition == "left" && !B) {
                    E()
                } else if (j.defaultPosition == "left" && B) {
                    F()
                } else if (j.defaultPosition == "right" && !B) {
                    F()
                } else if (j.defaultPosition == "right" && B) {
                    E()
                } else {
                    D()
                }
                if (q == r.left && !B && n < y) {
                    F()
                } else if (q == r.left && B && n - o < y) {
                    F()
                } else if (q == r.right && !B && n > y + z) {
                    E()
                //hack
                } else if (q == r.right && true && n + o > y + z) {
                    E()
                } else if (q == r.top && m < x) {
                    D()
                } else if (q == r.bottom && m > x + A) {
                    C()
                }
                if (q == r.left || q == r.right) {
                    if (m + p > A + x) {
                        m = c + l > A + x ? c + l - p : A + x - p
                    } else if (m < x) {
                        m = c < x ? c : x
                    }
                }
                if (q == r.top || q == r.bottom) {
                    if (n + o > z + y) {
                        n = i + k > z + y ? i + k - o : z + y - o
                    } else if (n < y) {
                        n = i < y ? i : y
                    }
                }
                h.css({left: Math.round(n), top: Math.round(m)}).removeClass(r.top).removeClass(r.bottom).removeClass(r.left).removeClass(r.right).addClass(q);
                if (q == r.top) {
                    s = p;
                    t = i - n + (k - u) / 2
                } else if (q == r.bottom) {
                    s = 0;
                    t = i - n + (k - u) / 2
                } else if (q == r.left) {
                    s = c - m + (l - v) / 2;
                    t = o
                } else if (q == r.right) {
                    s = c - m + (l - v) / 2;
                    t = 0
                }
                f.css({left: Math.round(t), top: Math.round(s)})
            }

            var d = a(this), i = d.data("tipTip"), j = i && i.options || a.extend({}, c, b), k = {holder: h, content: g, arrow: f, options: j};
            if (i) {
                switch (b) {
                    case"show":
                        n();
                        break;
                    case"hide":
                        o();
                        break;
                    case"destroy":
                        d.unbind(".tipTip").removeData("tipTip");
                        break;
                    case"position":
                        p()
                }
            } else {
                var l = false;
                var m = false;
                d.data("tipTip", {options: j});
                if (j.activation == "hover") {
                    d.bind("mouseenter.tipTip",function () {
                        if (j.delayHover) {
                            m = setTimeout(function () {
                                n()
                            }, j.delayHover)
                        } else {
                            n()
                        }
                    }).bind("mouseleave.tipTip", function () {
                        if (m) {
                            clearTimeout(m);
                        }
                        if (!j.keepAlive) {
                            o()
                        } else {
                            h.one("mouseleave.tipTip", function () {
                                o()
                            });
                            a("html").off("click.tipTip").on("click.tipTip", function (b) {
                                if (h.css("display") == "block" && !a(b.target).closest("#tiptip_holder").length) {
                                    a("html").off("click.tipTip");
                                    o()
                                }
                            })
                        }
                    })
                } else if (j.activation == "focus") {
                    d.bind("focus.tipTip",function () {
                        n()
                    }).bind("blur.tipTip", function () {
                        o()
                    })
                } else if (j.activation == "click") {
                    d.bind("click.tipTip",function (a) {
                        a.preventDefault();
                        n();
                        return false
                    }).bind("mouseleave.tipTip", function () {
                        if (!j.keepAlive) {
                            o()
                        } else {
                            h.one("mouseleave.tipTip", function () {
                                o()
                            });
                            a("html").off("click.tipTip").on("click.tipTip", function (b) {
                                if (h.css("display") == "block" && !a(b.target).closest("#tiptip_holder").length) {
                                    a("html").off("click.tipTip");
                                    o()
                                }
                            })
                        }
                    })
                } else if (j.activation == "manual") {
                }
            }
        })
    };
    var b = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufdfe-\ufe6f\ufefd-\uffff", c = "\u0591-\u07ff\ufb1d-\ufdfd\ufe70-\ufefc", d = new RegExp("^[^" + b + "]*[" + c + "]");
})(jQuery);
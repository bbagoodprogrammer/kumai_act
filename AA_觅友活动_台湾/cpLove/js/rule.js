/*!
 * Created by Tang Guohui
 * User: tang_guohui@qq.com
 */
(window.webpackJsonp = window.webpackJsonp || []).push([
    ["rule"], {
        "k/WW": function (t, s, i) {},
        m7re: function (t, s, i) {
            "use strict";
            i.r(s);
            i("5+t+");
            var a = i("Kw5r"),
                v = i("7Qib"),
                n = Object(v.b)("stime") || "",
                _ = Object(v.b)("etime") || "",
                e = {
                    data: function () {
                        return {
                            tab: 1,
                            mainTab: 0,
                            stime: n,
                            etime: _
                        }
                    },
                    methods: {
                        mainTabClick: function (t) {
                            this.mainTab = t
                        },
                        format: function (t) {
                            var s = new Date(1e3 * t),
                                i = (s.getFullYear(), s.getMonth(), s.getMonth() + 1),
                                a = s.getDate() >= 10 ? s.getDate() : "0" + s.getDate(),
                                v = s.getHours() >= 10 ? s.getHours() : "0" + s.getHours(),
                                n = s.getMinutes() >= 10 ? s.getMinutes() : "0" + s.getMinutes();
                            s.getSeconds(), s.getSeconds();
                            return i + "月" + a + "日 " + v + ":" + n
                        }
                    }
                },
                c = (i("myLR"), i("KHd+")),
                r = Object(c.a)(e, function () {
                    var t = this,
                        s = t.$createElement,
                        i = t._self._c || s;
                    return i("div", {
                        staticClass: "rule"
                    }, [i("div", {
                        staticClass: "mainTabs"
                    }, [i("a", {
                        class: {
                            current: 0 == t.mainTab
                        },
                        attrs: {
                            href: ""
                        },
                        on: {
                            click: function (s) {
                                return s.preventDefault(), t.mainTabClick(0)
                            }
                        }
                    }, [t._v("參與規則")]), t._v(" "), i("a", {
                        class: {
                            current: 1 == t.mainTab
                        },
                        attrs: {
                            href: ""
                        },
                        on: {
                            click: function (s) {
                                return s.preventDefault(), t.mainTabClick(1)
                            }
                        }
                    }, [t._v("活動獎勵")])]), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: 1 == t.mainTab,
                            expression: "mainTab==1"
                        }],
                        staticClass: "rewards"
                    }, [t._m(0), t._v(" "), t._m(1), t._v(" "), t._m(2)]), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: 0 == t.mainTab,
                            expression: "mainTab==0"
                        }],
                        staticClass: "rules"
                    }, [i("div", {
                        staticClass: "group"
                    }, [i("div", {
                        staticClass: "title"
                    }, [t._v("1、活動時間")]), t._v(" "), i("p", [t._v(t._s(t.format(t.stime)) + "-" + t._s(t.format(t.etime)))])]), t._v(" "), t._m(3), t._v(" "), t._m(4), t._v(" "), t._m(5)]), t._v(" "), i("p", {
                        staticClass: "copy"
                    }, [t._v("本活動的最終解釋權歸活動主辦方所有")])])
                }, [function () {
                    var t = this.$createElement,
                        s = this._self._c || t;
                    return s("div", {
                        staticClass: "group"
                    }, [s("div", {
                        staticClass: "title"
                    }, [this._v("約會基金獎池")]), this._v(" "), s("p", [this._v("約會基金獎池的初獎金為20000金幣，總熱戀值每增加200，獎池則增加1金幣；"), s("br"), this._v("活動結束時，熱戀值高的聯盟獲勝，聯盟內的CP獲得瓜分約會基金獎池的資格")]), this._v(" "), s("div", {
                        staticClass: "formula"
                    })])
                }, function () {
                    var t = this,
                        s = t.$createElement,
                        i = t._self._c || s;
                    return i("div", {
                        staticClass: "the_reward"
                    }, [i("p", [t._v("鹽系和甜系熱戀榜的榜單獎勵")]), t._v(" "), i("div", {
                        staticClass: "list"
                    }, [i("p", [t._v("榜單冠軍")]), t._v(" "), i("div", [i("span", {
                        staticClass: "icon1"
                    }, [i("strong", [i("span"), i("i", [t._v("52000")])]), t._v(" "), i("strong", [t._v("甜蜜之戀-戒指")])]), t._v(" "), i("span", {
                        staticClass: "icon2"
                    }, [i("strong", [i("i", [t._v("15天")])]), t._v(" "), i("strong", [t._v("浪漫飛艇-座駕")])]), t._v(" "), i("span", {
                        staticClass: "icon3"
                    }, [i("strong", [i("i", [t._v("15天")])]), t._v(" "), i("strong", [t._v("新郎新娘頭像框")])]), t._v(" "), i("span", {
                        staticClass: "icon4"
                    }, [i("strong", [i("i", [t._v("15天")])]), t._v(" "), i("strong", [t._v("定製CP稱號")])])]), t._v(" "), i("p", {
                        staticClass: "other"
                    }, [t._v("520婚禮房婚禮舉辦權*1次")])]), t._v(" "), i("div", {
                        staticClass: "list"
                    }, [i("p", [t._v("榜單亞軍CP")]), t._v(" "), i("div", [i("span", {
                        staticClass: "icon2"
                    }, [i("strong", [i("i", [t._v("10天")])]), t._v(" "), i("strong", [t._v("浪漫飛艇-座駕")])]), t._v(" "), i("span", {
                        staticClass: "icon3"
                    }, [i("strong", [i("i", [t._v("10天")])]), t._v(" "), i("strong", [t._v("新郎新娘頭像框")])]), t._v(" "), i("span", {
                        staticClass: "icon4"
                    }, [i("strong", [i("i", [t._v("10天")])]), t._v(" "), i("strong", [t._v("甜蜜CP稱號")])])])]), t._v(" "), i("div", {
                        staticClass: "list"
                    }, [i("p", [t._v("榜單季軍CP")]), t._v(" "), i("div", [i("span", {
                        staticClass: "icon2"
                    }, [i("strong", [i("i", [t._v("7天")])]), t._v(" "), i("strong", [t._v("浪漫飛艇-座駕")])]), t._v(" "), i("span", {
                        staticClass: "icon3"
                    }, [i("strong", [i("i", [t._v("10天")])]), t._v(" "), i("strong", [t._v("新郎新娘頭像框")])]), t._v(" "), i("span", {
                        staticClass: "icon4"
                    }, [i("strong", [i("i", [t._v("10天")])]), t._v(" "), i("strong", [t._v("幸福CP稱號")])])])]), t._v(" "), i("div", {
                        staticClass: "list"
                    }, [i("p", [t._v("第4-6名")]), t._v(" "), i("div", [i("span", {
                        staticClass: "icon6"
                    }, [i("strong", [i("i", [t._v("7天")])]), t._v(" "), i("strong", [t._v("新郎新娘頭像框")])])])])])
                }, function () {
                    var t = this.$createElement,
                        s = this._self._c || t;
                    return s("ul", {
                        staticClass: "tip"
                    }, [s("li", [this._v("*熱戀值滿52000並達到榜單前三名，可獲得對應榜單獎勵")]), this._v(" "), s("li", [this._v("*惜敗聯盟的第4-6名捕獲的榜單獎勵")]), this._v(" "), s("li", [this._v("*所有獎勵以CP為單位")])])
                }, function () {
                    var t = this.$createElement,
                        s = this._self._c || t;
                    return s("div", {
                        staticClass: "group"
                    }, [s("div", {
                        staticClass: "title"
                    }, [this._v("2、參與活動")]), this._v(" "), s("p", [this._v("在APP內組成CP的玩家可參與活動"), s("br"), this._v("組成CP的流程：準備戒指>>向親密度達標的好友表白>>好友答應>>組成CP")]), this._v(" "), s("p", [this._v("若解除CP關係則被視為主動退出活動，不可再重新參與或者獲得活動獎勵哦~")])])
                }, function () {
                    var t = this.$createElement,
                        s = this._self._c || t;
                    return s("div", {
                        staticClass: "group"
                    }, [s("div", {
                        staticClass: "title"
                    }, [this._v("3、聯盟規則")]), this._v(" "), s("p", [this._v("CP們隨即加入鹽系聯盟/甜系聯盟；聯盟之間PK,以熱戀值多的聯盟為勝，聯盟內的CP獲得瓜分約會基金的資格")])])
                }, function () {
                    var t = this,
                        s = t.$createElement,
                        i = t._self._c || s;
                    return i("div", {
                        staticClass: "group"
                    }, [i("div", {
                        staticClass: "title"
                    }, [t._v("4、熱戀值")]), t._v(" "), i("p", [t._v("CP可通過舉辦房間活動，收集指定禮物、贈送戒指增加熱戀值；熱戀值=指定禮物金幣價值*10+戒指的甜蜜值熱戀值每增加200，約會基金獎池就增加1金幣")]), t._v(" "), i("div", {
                        staticClass: "rewards_box"
                    }, [i("div", [i("p", {
                        staticClass: "top"
                    }, [i("span"), i("i", [t._v("100")])]), t._v(" "), i("p", {
                        staticClass: "name"
                    }, [t._v("甜蜜賀卡")]), t._v(" "), i("p", {
                        staticClass: "val"
                    }, [t._v("+1000熱戀值")])]), t._v(" "), i("div", [i("p", {
                        staticClass: "top"
                    }, [i("span"), i("i", [t._v("1290")])]), t._v(" "), i("p", {
                        staticClass: "name"
                    }, [t._v("巧克力禮盒")]), t._v(" "), i("p", {
                        staticClass: "val"
                    }, [t._v("+12900熱戀值")])]), t._v(" "), i("div", [i("p", {
                        staticClass: "top"
                    }, [i("span"), i("i", [t._v("1399")])]), t._v(" "), i("p", {
                        staticClass: "name"
                    }, [t._v("情書")]), t._v(" "), i("p", {
                        staticClass: "val"
                    }, [t._v("+13990熱戀值")])]), t._v(" "), i("div", [i("p", {
                        staticClass: "top"
                    }, [i("span"), i("i", [t._v("2800")])]), t._v(" "), i("p", {
                        staticClass: "name"
                    }, [t._v("比心")]), t._v(" "), i("p", {
                        staticClass: "val"
                    }, [t._v("+28000熱戀值")])]), t._v(" "), i("div", [i("p", {
                        staticClass: "top"
                    }, [i("span"), i("i", [t._v("6999")])]), t._v(" "), i("p", {
                        staticClass: "name"
                    }, [t._v("天鵝親親")]), t._v(" "), i("p", {
                        staticClass: "val"
                    }, [t._v("+69990熱戀值")])])])])
                }], !1, null, null, null).exports;
            a.a.config.productionTip = !1, new a.a({
                el: "#app",
                components: {
                    Page: r
                },
                render: function (t) {
                    return t(r)
                }
            })
        },
        myLR: function (t, s, i) {
            "use strict";
            var a = i("k/WW");
            i.n(a).a
        }
    },
    [
        ["m7re", "runtime", "vendor", "common"]
    ]
]);
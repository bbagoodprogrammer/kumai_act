/*!
 * Created by Tang Guohui
 * User: tang_guohui@qq.com
 */
;(window.webpackJsonp = window.webpackJsonp || []).push([
	['common'],
	{
		'+MiA': function(e, t, n) {
			'use strict'
			var o = n('vDqi'),
				i = n.n(o),
				r = n('7Qib'),
				a = n('Q2AE'),
				s = {
					'/init.php': '/one_piece/shareinit.php',
				}
			n('Qyje')
			n.d(t, 'f', function() {
				return p
			}),
				n.d(t, 'g', function() {
					return m
				}),
				n.d(t, 'd', function() {
					return h
				}),
				n.d(t, 'a', function() {
					return v
				}),
				n.d(t, 'b', function() {
					return g
				}),
				n.d(t, 'i', function() {
					return O
				}),
				n.d(t, 'e', function() {
					return T
				})
			var c =
					'function' == typeof Symbol &&
					'symbol' == typeof Symbol.iterator
						? function(e) {
								return typeof e
						  }
						: function(e) {
								return e &&
									'function' == typeof Symbol &&
									e.constructor === Symbol &&
									e !== Symbol.prototype
									? 'symbol'
									: typeof e
						  },
				u = Object(r.b)('debug'),
				l = Object(r.b)('uid') || (u ? 4979504 : ''),
				d =
					Object(r.b)('token') ||
					(u
						? 'QKE6cYPo8LNcN8KI3aSRyIsXzl9WaaIWiN3cjGf86pYsfec0otzMjBYJBzhjBqAz1yb1ZWe3u6QrLH08f8AbVdd2loer5CqJRoOD1b7ucCzYvVbZhwPCJnVS4SUZVc3d'
						: '')

			function f(e, t) {
				if (a.a.state.share)
					for (var n in s)
						if (-1 != e.indexOf(n)) {
							var o = (function() {
								var t = s[n]
								if ('string' != typeof t)
									return {
										v: new Promise(function(e) {
											e({
												data: {
													response_status: {
														error: '',
														code: 0,
													},
													response_data: t,
												},
											})
										}),
									}
								e = t
							})()
							if (
								'object' === (void 0 === o ? 'undefined' : c(o))
							)
								return o.v
						}
				return new Promise(function(n, o) {
					a.a.commit('updateLoading', !0),
						i.a
							.get(e, t)
							.then(function(e) {
								a.a.commit('updateLoading', !1), n(e)
							})
							.catch(function(e) {
								a.a.commit('updateLoading', !1), o(e)
							})
				})
			}

			function p() {
				return f(
					'/index.php?signture=innerserver&action=cpLove.init&uid=' +
						l +
						'&token=' +
						d
				)
			}

			function m() {
				return f(
					'/index.php?signture=innerserver&action=cpLove.notice&uid=' +
						l +
						'&token=' +
						d
				)
			}

			function h() {
				return f(
					'/index.php?signture=innerserver&action=cpLove.reject&uid=' +
						l +
						'&token=' +
						d
				)
			}

			function v() {
				return f(
					'/index.php?signture=innerserver&action=cpLove.accept&uid=' +
						l +
						'&token=' +
						d
				)
			}

			function g() {
				return f(
					'/index.php?signture=innerserver&action=cpLove.invite&uid=' +
						l +
						'&token=' +
						d
				)
			}

			function O() {
				return f(
					'/index.php?signture=innerserver&action=cpLove.showCpInfo&uid=' +
						l +
						'&token=' +
						d
				)
			}

			function T() {
				return f(
					'/index.php?signture=innerserver&action=cpLove.share&uid=' +
						l
				)
			}
		},
		'1CAK': function(e, t, n) {},
		'5+t+': function(e, t, n) {},
		'7Qib': function(e, t, n) {
			'use strict'
			n.d(t, 'b', function() {
				return i
			}),
				n.d(t, 'a', function() {
					return r
				}),
				n.d(t, 'c', function() {
					return a
				}),
				n.d(t, 'e', function() {
					return s
				}),
				n.d(t, 'd', function() {
					return c
				})
			var o = n('Ofg6')

			function i(e) {
				var t = new RegExp('(^|&)' + e + '=([^&]*)(&|$)', 'i'),
					n = window.location.search.substr(1).match(t)
				return null != n ? n[2] : null
			}

			function r() {
				var e = 'pc'
				return (
					navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
						? (e = 'android')
						: navigator.userAgent.match(
								/\(i[^;]+;( U;)? CPU.+Mac OS X/
						  ) && (e = 'ios'),
					e
				)
			}

			function a(e) {
				var t = document.querySelector('a[name=' + e + ']')
				t && t.scrollIntoView()
			}

			function s(e) {
				console.log(JSON.stringify(e))
			}

			function c(e) {
				Object(o.a)(e.replace(/\[\d+\]$/, ''))
			}
			;(Date.prototype.getYMD = function() {
				var e = this.getFullYear() + ''
				return (
					this.getMonth() + 1 > 10
						? (e += this.getMonth() + 1)
						: (e += '0' + (this.getMonth() + 1)),
					(e +=
						this.getDate() >= 10
							? this.getDate()
							: '0' + this.getDate())
				)
			}),
				(String.prototype.getDate = function() {
					var e = this.split('-')
					return new Date(e[0], e[1] - 1, e[2])
				})
		},
		'8SHQ': function(e, t, n) {
			'use strict'
			var o = n('fSO0'),
				i =
					'http://activities.udateapp.com/static_html/2020/day_red_package/',
				r = {
					root: i,
					shareUrl: i + 'share.html',
					shareImg: i + n('R/sP'),
					shareImgWidth: 330,
					shareImgHeight: 330,
				}
			n.d(t, 'a', function() {
				return o.a
			}),
				n.d(t, 'b', function() {
					return r
				})
		},
		DmyW: function(e, t) {
			e.exports =
				'data:image/png;base64,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'
		},
		IBle: function(e, t, n) {
			'use strict'
			var o = {
					props: ['show'],
				},
				i = (n('vgYe'), n('KHd+')),
				r = Object(i.a)(
					o,
					function() {
						var e = this.$createElement
						return (this._self._c || e)('div', {
							directives: [
								{
									name: 'show',
									rawName: 'v-show',
									value: this.show,
									expression: 'show',
								},
							],
							staticClass: 'loading',
						})
					},
					[],
					!1,
					null,
					null,
					null
				)
			t.a = r.exports
		},
		Ofg6: function(e, t, n) {
			'use strict'
			n('1CAK')
			var o = n('Kw5r'),
				i = n('KHd+'),
				r = Object(i.a)(
					{},
					function() {
						var e = this,
							t = e.$createElement,
							n = e._self._c || t
						return n(
							'div',
							{
								staticClass: 'dialog alert',
							},
							[
								n(
									'div',
									{
										staticClass: 'dialogContent',
										class: {
											'dialog-enter-active':
												e.enterActive,
											'dialog-leave-active':
												e.leaveActive,
										},
										on: {
											click: function(e) {
												e.stopPropagation()
											},
										},
									},
									[
										n(
											'div',
											{
												staticClass: 'content',
											},
											[
												n('div', {
													staticClass: 'pro_close',
													on: {
														click: function(t) {
															return (
																t.preventDefault(),
																e.close(t)
															)
														},
													},
												}),
												e._v(' '),
												n('span', {
													domProps: {
														innerHTML: e._s(
															e.text.replace(
																/\n/g,
																'<br>'
															)
														),
													},
												}),
											]
										),
									]
								),
							]
						)
					},
					[],
					!1,
					null,
					null,
					null
				).exports,
				a = Object(i.a)(
					{},
					function() {
						var e = this,
							t = e.$createElement,
							n = e._self._c || t
						return n(
							'div',
							{
								staticClass: 'dialog confirm',
								on: {
									click: e.cancel,
								},
							},
							[
								n(
									'div',
									{
										staticClass: 'dialogContent',
										class: {
											'dialog-enter-active':
												e.enterActive,
											'dialog-leave-active':
												e.leaveActive,
										},
										on: {
											click: function(e) {
												e.stopPropagation()
											},
										},
									},
									[
										n(
											'div',
											{
												staticClass: 'content',
											},
											[
												n('span', {
													domProps: {
														innerHTML: e._s(
															e.text.replace(
																/\n/g,
																'<br>'
															)
														),
													},
												}),
											]
										),
										e._v(' '),
										n(
											'div',
											{
												staticClass: 'button',
											},
											[
												n(
													'a',
													{
														attrs: {
															href: '',
														},
														on: {
															click: function(t) {
																return (
																	t.preventDefault(),
																	e.cancel(t)
																)
															},
														},
													},
													[e._v(e._s(e.cancelText))]
												),
												n(
													'a',
													{
														attrs: {
															href: '',
														},
														on: {
															click: function(t) {
																return (
																	t.preventDefault(),
																	e.ok(t)
																)
															},
														},
													},
													[e._v(e._s(e.okText))]
												),
											]
										),
										e._v(' '),
										n('a', {
											staticClass: 'close',
											attrs: {
												href: '',
											},
											on: {
												click: function(t) {
													return (
														t.preventDefault(),
														e.cancel(t)
													)
												},
											},
										}),
									]
								),
							]
						)
					},
					[],
					!1,
					null,
					null,
					null
				).exports,
				s = n('fSO0')

			function c(e, t) {
				var n =
					arguments.length > 2 && void 0 !== arguments[2]
						? arguments[2]
						: s.a.ok
				new o.a({
					el: document.createElement('div'),
					render: r.render,
					data: function() {
						return {
							text: e,
							okText: n,
							enterActive: !1,
							leaveActive: !1,
						}
					},
					mounted: function() {
						var e = this
						document.body.appendChild(this.$el),
							(this.enterActive = !0),
							setTimeout(function() {
								e.enterActive = !1
							}, 333)
					},
					methods: {
						ok: function() {
							'function' == typeof t && t.call(this), this.close()
						},
						close: function() {
							var e = this
							;(this.leaveActive = !0),
								setTimeout(function() {
									document.body.removeChild(e.$el)
								}, 333)
						},
					},
				})
			}

			function u(e, t, n) {
				var i =
						arguments.length > 3 && void 0 !== arguments[3]
							? arguments[3]
							: s.a.ok,
					r =
						arguments.length > 4 && void 0 !== arguments[4]
							? arguments[4]
							: s.a.cancel
				new o.a({
					el: document.createElement('div'),
					render: a.render,
					data: function() {
						return {
							text: e,
							okText: i,
							cancelText: r,
							enterActive: !1,
							leaveActive: !1,
						}
					},
					mounted: function() {
						var e = this
						document.body.appendChild(this.$el),
							(this.enterActive = !0),
							setTimeout(function() {
								e.enterActive = !1
							}, 333)
					},
					methods: {
						activeLeaveStyle: function() {
							var e = this
							;(this.leaveActive = !0),
								setTimeout(function() {
									document.body.removeChild(e.$el)
								}, 333)
						},
						ok: function() {
							'function' == typeof t && t.call(this),
								this.activeLeaveStyle()
						},
						cancel: function() {
							'function' == typeof n && n.call(this),
								this.activeLeaveStyle()
						},
					},
				})
			}
			n.d(t, 'a', function() {
				return c
			})
			t.b = {
				install: function(e) {
					;(e.prototype.$alert = c), (e.prototype.$confirm = u)
				},
			}
		},
		Q2AE: function(e, t, n) {
			'use strict'
			var o,
				i = n('Kw5r'),
				r = n('L2JU'),
				a = n('+MiA'),
				s = n('7Qib'),
				c = n('RG0I'),
				u =
					Object.assign ||
					function(e) {
						for (var t = 1; t < arguments.length; t++) {
							var n = arguments[t]
							for (var o in n)
								Object.prototype.hasOwnProperty.call(n, o) &&
									(e[o] = n[o])
						}
						return e
					}

			function l(e) {
				return function() {
					var t = e.apply(this, arguments)
					return new Promise(function(e, n) {
						return (function o(i, r) {
							try {
								var a = t[i](r),
									s = a.value
							} catch (e) {
								return void n(e)
							}
							if (!a.done)
								return Promise.resolve(s).then(
									function(e) {
										o('next', e)
									},
									function(e) {
										o('throw', e)
									}
								)
							e(s)
						})('next')
					})
				}
			}

			function d(e, t, n) {
				return (
					t in e
						? Object.defineProperty(e, t, {
								value: n,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (e[t] = n),
					e
				)
			}
			var f, p
			Object(s.b)('uid'), Object(s.b)('token')
			i.a.use(r.a),
				(t.a = new r.a.Store({
					state:
						((o = {
							loading: !1,
							share: !Object(s.b)('token'),
							data_total: {},
							comment_total: null,
							tab1: 0,
							tab2: 0,
							rankGroups: {},
							commentGroups: {},
							mainTab: 0,
							dayTab: 1,
							commentmainTab: 1,
							activity_status: 0,
							days: 1,
							dates: null,
							dayRankOwnerInfos: {},
							totalRankOwnerInfo: {},
							OwnerInfos: {},
							ownerCid: 0,
							inited: !1,
							commented: !1,
							invite_code: '',
							owner: null,
							red: null,
							is_reg: !1,
							show_code: !1,
							end_time: 0,
							my_rank: null,
							stime: 0,
							etime: 0,
							sweet_len: 0,
							salt_len: 0,
							coins: {
								a: 0,
								b: 0,
								c: 0,
								d: 0,
								e: 0,
								f: 0,
								g: 0,
							},
							user_info: {},
							salt_score: 0,
							sweet_score: 0,
							new_mail: 0,
						}),
						d(o, 'sweet_len', 0),
						d(o, 'salt_len', 0),
						d(o, 'cp_result', ''),
						d(o, 'result', null),
						d(o, 'AppCpInfo', {}),
						d(o, 'invite', null),
						o),
					getters: {
						topStar: function(e) {
							var t = e.cid_rank.slice(0)
							return (
								t.sort(function(e, t) {
									return t.score - e.score
								}),
								t.length ? t[0] : null
							)
						},
					},
					mutations: {
						updateLoading: function(e, t) {
							e.loading = t
						},
						updateMyRank: function(e, t) {
							e.my_rank = t
						},
						updateRankGroups: function(e, t) {
							if (t && void 0 !== t.key) {
								var n = t.key
								delete t.key,
									(e.rankGroups = u(
										{},
										e.rankGroups,
										d({}, n, u({}, e.rankGroups[n], t))
									))
							}
						},
						updateCommentGroups: function(e, t) {
							if (t && void 0 !== t.key) {
								var n = t.key
								delete t.key,
									(e.commentGroups = u(
										{},
										e.commentGroups,
										d({}, n, u({}, e.commentGroups[n], t))
									))
							}
						},
						setMainTab: function(e, t) {},
						setcommentMainTab: function(e, t) {
							e.commentmainTab = t
						},
						settabClick: function(e, t) {
							console.log(t), (e.tab1 = t)
						},
						settabClickf: function(e, t) {
							e.tab2 = t
						},
						setInitInfo: function(e, t) {
							console.log(t),
								Object(c.a)('time', t.down_time || 0),
								(e.coins.a = parseInt(t.coins % 10)),
								(e.coins.b = parseInt((t.coins % 100) / 10)),
								(e.coins.c = parseInt((t.coins % 1e3) / 100)),
								(e.coins.d = parseInt((t.coins % 1e4) / 1e3)),
								(e.coins.e = parseInt((t.coins % 1e5) / 1e4)),
								(e.coins.f = parseInt((t.coins % 1e6) / 1e5)),
								(e.coins.g = parseInt((t.coins % 1e7) / 1e6)),
								0 == t.salt_score && 0 == t.sweet_score
									? ((e.sweet_len = 50), (e.salt_len = 50))
									: ((e.sweet_len = Math.floor(
											(t.sweet_score /
												(t.salt_score +
													t.sweet_score)) *
												100
									  )),
									  (e.salt_len = Math.floor(
											(t.salt_score /
												(t.salt_score +
													t.sweet_score)) *
												100
									  ))),
								(e.stime = t.stime),
								(e.etime = t.etime),
								(e.end_time = t.etime),
								(e.user_info = t.user_info),
								(e.salt_score = t.salt_score),
								(e.sweet_score = t.sweet_score),
								(e.new_mail = t.new_mail),
								(e.cp_result = t.cp_result),
								(e.result = t.result),
								(e.AppCpInfo = t.AppCpInfo),
								(e.invite = t.invite),
								(e.activity_status = t.step)
						},
						setDayRankOwnerInfos: function(e, t) {},
						setTotalRankOwnerInfo: function(e, t) {
							console.log('总榜'), (e.totalRankOwnerInfo = t)
						},
						setOwnerCid: function(e, t) {
							e.ownerCid = t
						},
						setInited: function(e) {
							e.inited = !0
						},
						setCommented: function(e) {
							e.commented = !0
						},
						setTaskInfo: function(e, t) {
							e.daily_tasks = t.daily_tasks
						},
					},
					actions: {
						init:
							((p = l(
								regeneratorRuntime.mark(function e(t, n) {
									var o, i, r, s
									return regeneratorRuntime.wrap(
										function(e) {
											for (;;)
												switch ((e.prev = e.next)) {
													case 0:
														return (
															(e.next = 2),
															Object(a.f)()
														)
													case 2:
														;(o = e.sent).data &&
															((i = o.data),
															(r =
																i.response_status),
															(s =
																i.response_data),
															r &&
																0 === r.code &&
																(t.commit(
																	'setInitInfo',
																	s
																),
																setTimeout(
																	function() {
																		t.commit(
																			'setInited'
																		)
																	},
																	100
																),
																n && n(s)))
													case 4:
													case 'end':
														return e.stop()
												}
										},
										e,
										this
									)
								})
							)),
							function(e, t) {
								return p.apply(this, arguments)
							}),
						refresh:
							((f = l(
								regeneratorRuntime.mark(function e(t, n) {
									var o, i, r, s, c, u
									return regeneratorRuntime.wrap(
										function(e) {
											for (;;)
												switch ((e.prev = e.next)) {
													case 0:
														return (
															console.log(n),
															(e.next = 3),
															Object(a.refresh)(
																n.step,
																n.sex
															)
														)
													case 3:
														;(o = e.sent).data &&
															((i = o.data),
															(r =
																i.response_status),
															(s =
																i.response_data),
															r &&
																0 === r.code &&
																((1 != n.step &&
																	1 !=
																		s.currentStep) ||
																	t.commit(
																		'updateOwner1',
																		s.owner
																	),
																(2 != n.step &&
																	2 !=
																		s.currentStep) ||
																	t.commit(
																		'updateOwner2',
																		s.owner
																	),
																(3 != n.step &&
																	3 !=
																		s.currentStep) ||
																	t.commit(
																		'updateOwner3',
																		s.owner
																	),
																(c = 0),
																1 ==
																	s.currentStep &&
																	(c = 1),
																2 == n.step &&
																0 == n.sex
																	? (c = 2)
																	: 2 ==
																			n.step &&
																	  1 ==
																			n.sex &&
																	  (c = 3),
																3 == n.step &&
																0 == n.sex
																	? (c = 4)
																	: 3 ==
																			n.step &&
																	  1 ==
																			n.sex &&
																	  (c = 5),
																(u =
																	s.list
																		.length),
																t.commit(
																	'updateRankGroups',
																	{
																		key: c,
																		loadCount: 1,
																		loadEnd:
																			u <
																			20,
																		loading: !1,
																		none:
																			0 ==
																			u,
																		list:
																			s.list,
																	}
																)))
													case 5:
													case 'end':
														return e.stop()
												}
										},
										e,
										this
									)
								})
							)),
							function(e, t) {
								return f.apply(this, arguments)
							}),
					},
				}))
		},
		'R/sP': function(e, t, n) {
			e.exports = n.p + 'img/share.jpg?6f1fc0'
		},
		RG0I: function(e, t, n) {
			'use strict'

			function o(e, t) {
				if (!e || 'string' != typeof e) throw Error('downTime key fail')
				if (!sessionStorage) throw Error('Not support sessionStorage')
				if (((e = '_down_time_' + e), void 0 === t)) {
					var n = sessionStorage.getItem(e)
					if (n && /\[\d+,\d+\]/.test(n)) {
						var o = JSON.parse(n),
							i = Math.max(
								0,
								Math.round(
									o[0] -
										(new Date().getTime() / 1e3 -
											new Date(1e3 * o[1]).getTime() /
												1e3)
								)
							),
							r = i <= 0
						if (r)
							return {
								end: r,
								seconds: i,
								day: '00',
								hour: '00',
								minute: '00',
								second: '00',
							}
						var a = i,
							s = Math.floor(a / 86400)
						a -= 86400 * s
						var c = Math.floor(a / 3600)
						a -= 3600 * c
						var u = Math.floor(a / 60)
						a -= 60 * u
						var l = Math.floor(a)
						return {
							end: r,
							seconds: i,
							day: (s = s < 10 ? '0' + s : s.toString()),
							hour: (c = c < 10 ? '0' + c : c.toString()),
							minute: (u = u < 10 ? '0' + u : u.toString()),
							second: (l = l < 10 ? '0' + l : l.toString()),
						}
					}
					return null
				}
				if (isNaN(t)) throw Error('downTime value must be number')
				;(t = parseInt(t)),
					sessionStorage.setItem(
						e,
						JSON.stringify([
							t,
							Math.round(new Date().getTime() / 1e3),
						])
					)
			}
			n.d(t, 'a', function() {
				return o
			})
		},
		agfS: function(e, t, n) {
			'use strict'
			var o = n('vDqi'),
				i = n.n(o),
				r = n('7Qib'),
				a = {
					props: ['url', 'parse', 'reset', 'active'],
					data: function() {
						return {
							loadCount: 0,
							loadEnd: !1,
							loading: !1,
							none: !1,
							list: [],
						}
					},
					watch: {
						reset: function() {
							;(this.loadCount = 0),
								(this.loadEnd = !1),
								(this.loading = !1),
								(this.none = !1),
								(this.list = []),
								this.load()
						},
					},
					beforeMount: function() {
						this.load()
					},
					mounted: function() {
						window.addEventListener('scroll', this.onScroll)
					},
					beforeDestroy: function() {
						window.removeEventListener('scroll', this.onScroll)
					},
					methods: {
						load: function() {
							var e = this
							this.loading = !0
							var t = Object(r.b)('uid') || '',
								n = Object(r.b)('token') || ''
							i.a
								.get(
									this.url
										.replace('{uid}', t)
										.replace('{token}', n)
										.replace('{from}', this.list.length)
								)
								.then(function(t) {
									e.loading = !1
									var n = t.data
									'function' == typeof e.parse &&
										(n = e.parse(n)),
										n.slice
											? (e.loadCount++,
											  n.length
													? (e.list = e.list.concat(
															n
													  ))
													: (e.loadEnd = !0),
											  e.loadCount > 0 &&
													0 === e.list.length &&
													(e.none = !0))
											: (e.loadEnd = !0)
								})
								.catch(function(t) {
									;(e.loading = !1), (e.loadEnd = !0)
								})
						},
						onScroll: function() {
							var e = !0
							;('function' == typeof this.active &&
								(e = this.active()),
							!e || this.loading || this.loadEnd) ||
								((document.documentElement.scrollTop ||
									document.body.scrollTop) +
									window.innerHeight >=
									document.body.scrollHeight - 100 &&
									this.load())
						},
					},
				},
				s = n('KHd+'),
				c = Object(s.a)(
					a,
					function() {
						var e = this.$createElement
						return (this._self._c || e)(
							'div',
							[
								this._t('default', null, {
									list: this.list,
									loading: this.loading,
									none: this.none,
								}),
							],
							2
						)
					},
					[],
					!1,
					null,
					null,
					null
				)
			t.a = c.exports
		},
		bw5Y: function(e, t, n) {
			'use strict'
			n.d(t, 'a', function() {
				return m
			})
			var o = navigator.userAgent,
				i =
					null != o.match(/Chrome/i) &&
					null == o.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i),
				r = !!o.match(/(Android);?[\s\/]+([\d.]+)?/),
				a = !!o.match(/iPhone|iPad|iPd/i),
				s = a && o.match(/Safari/),
				c = navigator.userAgent.indexOf('MicroMessenger') >= 0,
				u = navigator.userAgent.indexOf('Line') >= 0,
				l = navigator.userAgent.indexOf('FBAV') >= 0,
				d = o.match(/OS\s*(\d+)/)
			d = (d && parseFloat(d[1], 10)) || 0
			var f = []

			function p() {
				for (var e = 0; e < f.length; e++) clearTimeout(f[e])
			}

			function m(e, t, n, o) {
				var p = (function() {
					var e = {
							name: 'yinmi',
							androidSchema: 'yinmi://udateapp.com',
							androidDown:
								'https://play.google.com/store/apps/details?id=com.km.udate',
							iosSchema: 'yinmiapp://',
							iosDown:
								'https://apps.apple.com/tw/app/id1506862116',
							tips: '請點按右上角...</br>選擇系統默認瀏覽器打開',
						},
						t = {
							localhost: e,
							singnowapp: {
								name: 'yinmi',
								androidSchema: 'yinmi://udateapp.com',
								androidDown:
									'https://play.google.com/store/apps/details?id=com.km.udate',
								iosSchema: 'yinmiapp://',
								iosDown:
									'https://apps.apple.com/tw/app/id1506862116',
								tips:
									'請點按右上角...</br>選擇系統默認瀏覽器打開',
							},
						},
						n = location.host
					for (var o in t) if (new RegExp(o, 'i').test(n)) return t[o]
					return e
				})()
				if (
					((c || u || l) &&
						(function(e) {
							var t =
									arguments.length > 1 &&
									void 0 !== arguments[1]
										? arguments[1]
										: 1e3,
								n = document.createElement('div')
							;(n.style.cssText =
								'position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none'),
								(n.innerHTML =
									'<span style="display:inline-block; padding:.1rem .2rem; max-width:80%; background:#212125; color:#fff; border-radius:.1rem; opacity:0; margin-top:' +
									Math.round(window.innerHeight / 2) +
									'px; transition:opacity 1s">' +
									e +
									'</span>'),
								document.body.appendChild(n)
							var o = n.firstChild
							setTimeout(function() {
								o.style.opacity = 1
							}, 0),
								setTimeout(function() {
									;(o.style.opacity = 0),
										setTimeout(function() {
											document.body.removeChild(n)
										}, 1e3)
								}, 1e3 + t)
						})(p.tips),
					(e = e || p.androidSchema),
					(t = t || p.androidDown),
					(n = n || p.iosDown),
					(o = o || p.iosSchema || e),
					i &&
						r &&
						setTimeout(function() {
							window.location.href = e
						}, 50),
					s && d >= 9)
				)
					setTimeout(function() {
						var e = document.createElement('a')
						e.setAttribute('href', o),
							(e.style.display = 'none'),
							document.body.appendChild(e)
						var t = document.createEvent('HTMLEvents')
						t.initEvent('click', !1, !1), e.dispatchEvent(t)
					}, 0)
				else {
					var m = document.getElementById('_downloadAppIframe_')
					m ||
						(((m = document.createElement('iframe')).id =
							'_downloadAppIframe_'),
						(m.style.width = 0),
						(m.style.height = 0),
						(m.style.display = 'none'),
						document.body.appendChild(m)),
						(m.src = a ? o : e)
				}
				var h = Date.now()
				setTimeout(function() {
					var e = setTimeout(function() {
						Date.now() - h < 1700 &&
							(window.location.href = a ? n : t)
					}, 1500)
					f.push(e)
				}, 100)
			}
			window.addEventListener('blur', p, !1),
				window.addEventListener('pagehide', p, !1),
				document.addEventListener(
					'visibilitychange',
					function() {
						document.hidden && p()
					},
					!1
				)
		},
		fSO0: function(e, t, n) {
			'use strict'
			t.a = {
				ok: '確定',
				cancel: '取消',
				open_code: '填寫邀請碼',
				open_rule: '活動規則',
				open_red_record: '熱戀動態',
				loading: '加載中...',
				no_data: '快去組CP吧~',
				rank_null: '快邀請好友一起領紅包吧',
				status_not_start: '活動還沒開始..',
				status_end: '活動已結束..',
				val_score: '熱戀值',
				your: '未來的TA',
				invite_friend: '邀請好友祝福',
				invite_fb: '邀請LINE、FB好友组CP',
				tips_cp: '組CP後，隨機加入鹽係CP聯盟/甜係CP聯盟',
				gifts1: '甜蜜之戀-戒指',
				gifts2: '新郎新娘頭像框',
				gifts3: '豐富金幣',
				sweet_val: '甜係熱戀值',
				salt_val: '鹽係熱戀值',
			}
		},
		kHVg: function(e, t, n) {
			e.exports = n.p + 'img/gift2.png?080899'
		},
		qdaB: function(e, t, n) {
			e.exports = n.p + 'img/gift3.png?0e59d0'
		},
		rA1G: function(e, t, n) {
			'use strict'
			var o = n('8SHQ'),
				i = n('7Qib'),
				r = n('bw5Y'),
				a = 'ios' == Object(i.a)(),
				s = !Object(i.b)('token'),
				c = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)

			function u(e) {
				!s && e ? (location.href = e) : Object(r.a)()
			}
			var l = {
				profile: function(e) {
					c
						? sendJsData('app://userInfo?uid=' + e)
						: JSInterface.sendJsData('app://userInfo?uid=' + e)
				},
				family: function(e) {
					u('fid:' + e)
				},
				room: function(e) {
					u('rid:' + e)
				},
				sing: function() {
					u('goto:songLibrary')
				},
				wallet: function() {
					u('walletConfig://')
				},
				packet: function() {
					u(
						a
							? 'goto:{"controller":"ECMyPackGiftViewController","property":{}}'
							: 'goto:{"controller":"com.utalk.hsing.activity.MyPackActivity","property":{}}'
					)
				},
				share: function(e) {
					if (
						(e ||
							(e = {
								title: o.a.title,
								desc: o.a.desc,
								url: o.b.shareUrl,
								image: o.b.shareImg,
							}),
						a)
					)
						u(
							'shareUserInfo:' +
								e.url.replace(/^https?:/i, '') +
								'&title=' +
								e.title +
								'&shareText=' +
								e.desc +
								'&userImg=' +
								e.image
						)
					else
						try {
							JSInterface.share(e.url, e.title, e.desc, e.image)
						} catch (e) {}
				},
			}
			t.a = {
				computed: {
					lang: function() {
						return o.a
					},
					urls: function() {
						return o.b
					},
					app: function() {
						return l
					},
				},
				filters: {
					time: function(e) {
						var t = new Date(1e3 * e),
							n = t.getMonth() + 1,
							o = t.getDate()
						n < 10 && (n = '0' + n), o < 10 && (o = '0' + o)
						var i = t.getHours(),
							r = t.getMinutes()
						return (
							i < 10 && (i = '0' + i),
							r < 10 && (r = '0' + r),
							n + '/' + o + ' ' + i + ':' + r
						)
					},
					date: function(e) {
						var t = new Date(1e3 * e),
							n = t.getFullYear(),
							o = t.getMonth() + 1,
							i = t.getDate()
						return (
							n +
							'/' +
							(o = o < 10 ? '0' + o : o) +
							'/' +
							(i = i < 10 ? '0' + i : i)
						)
					},
					rank: function(e) {
						return e > 999 ? '999+' : e
					},
					number: function(e) {
						return e
							.toString()
							.split('')
							.reverse()
							.join('')
							.replace(/(\d{3})(?=\d)/g, '$1,')
							.split('')
							.reverse()
							.join('')
					},
				},
				methods: {
					getPlatform: i.a,
					scrollToAnchor: i.c,
					showError: i.e,
					serverErrorAlert: i.d,
					openApp: r.a,
				},
			}
		},
		tNG6: function(e, t, n) {
			e.exports = n.p + 'img/gift1.png?563c0c'
		},
		uvoT: function(e, t, n) {},
		vgYe: function(e, t, n) {
			'use strict'
			var o = n('uvoT')
			n.n(o).a
		},
	},
])

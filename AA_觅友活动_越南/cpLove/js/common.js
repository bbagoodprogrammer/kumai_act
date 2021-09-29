/*!
 * Created by Tang Guohui
 * User: tang_guohui@qq.com
 */
;(window.webpackJsonp = window.webpackJsonp || []).push([
	['common'],
	{
		'+MiA': function(t, e, n) {
			'use strict'
			var i = n('vDqi'),
				o = n.n(i),
				r = n('7Qib'),
				a = n('Q2AE'),
				s = { '/init.php': '/one_piece/shareinit.php' }
			n('Qyje')
			n.d(e, 'e', function() {
				return f
			}),
				n.d(e, 'f', function() {
					return h
				}),
				n.d(e, 'c', function() {
					return m
				}),
				n.d(e, 'a', function() {
					return v
				}),
				n.d(e, 'b', function() {
					return g
				}),
				n.d(e, 'h', function() {
					return O
				}),
				n.d(e, 'd', function() {
					return k
				})
			var c =
					'function' == typeof Symbol &&
					'symbol' == typeof Symbol.iterator
						? function(t) {
								return typeof t
						  }
						: function(t) {
								return t &&
									'function' == typeof Symbol &&
									t.constructor === Symbol &&
									t !== Symbol.prototype
									? 'symbol'
									: typeof t
						  },
				u = Object(r.b)('debug'),
				l = Object(r.b)('uid') || (u ? 4979504 : ''),
				d =
					Object(r.b)('token') ||
					(u
						? 'QKE6cYPo8LNcN8KI3aSRyIsXzl9WaaIWiN3cjGf86pYsfec0otzMjBYJBzhjBqAz1yb1ZWe3u6QrLH08f8AbVdd2loer5CqJRoOD1b7ucCzYvVbZhwPCJnVS4SUZVc3d'
						: '')
			function p(t, e) {
				if (a.a.state.share)
					for (var n in s)
						if (-1 != t.indexOf(n)) {
							var i = (function() {
								var e = s[n]
								if ('string' != typeof e)
									return {
										v: new Promise(function(t) {
											t({
												data: {
													response_status: {
														error: '',
														code: 0,
													},
													response_data: e,
												},
											})
										}),
									}
								t = e
							})()
							if (
								'object' === (void 0 === i ? 'undefined' : c(i))
							)
								return i.v
						}
				return new Promise(function(n, i) {
					a.a.commit('updateLoading', !0),
						o.a
							.get(t, e)
							.then(function(t) {
								a.a.commit('updateLoading', !1), n(t)
							})
							.catch(function(t) {
								a.a.commit('updateLoading', !1), i(t)
							})
				})
			}
			function f() {
				return p(
					'/index.php?signture=innerserver&action=cpLove.init&uid=' +
						l +
						'&token=' +
						d
				)
			}
			function h() {
				return p(
					'/index.php?signture=innerserver&action=cpLove.notice&uid=' +
						l +
						'&token=' +
						d
				)
			}
			function m() {
				return p(
					'/index.php?signture=innerserver&action=cpLove.reject&uid=' +
						l +
						'&token=' +
						d
				)
			}
			function v() {
				return p(
					'/index.php?signture=innerserver&action=cpLove.accept&uid=' +
						l +
						'&token=' +
						d
				)
			}
			function g() {
				return p(
					'/index.php?signture=innerserver&action=cpLove.invite&uid=' +
						l +
						'&token=' +
						d
				)
			}
			function O() {
				return p(
					'/index.php?signture=innerserver&action=cpLove.showCpInfo&uid=' +
						l +
						'&token=' +
						d
				)
			}
			function k() {
				return p(
					'/index.php?signture=innerserver&action=cpLove.share&uid=' +
						l
				)
			}
		},
		'1CAK': function(t, e, n) {},
		'5+t+': function(t, e, n) {},
		'7Qib': function(t, e, n) {
			'use strict'
			n.d(e, 'b', function() {
				return o
			}),
				n.d(e, 'a', function() {
					return r
				}),
				n.d(e, 'c', function() {
					return a
				}),
				n.d(e, 'e', function() {
					return s
				}),
				n.d(e, 'd', function() {
					return c
				})
			var i = n('Ofg6')
			function o(t) {
				var e = new RegExp('(^|&)' + t + '=([^&]*)(&|$)', 'i'),
					n = window.location.search.substr(1).match(e)
				return null != n ? n[2] : null
			}
			function r() {
				var t = 'pc'
				return (
					navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
						? (t = 'android')
						: navigator.userAgent.match(
								/\(i[^;]+;( U;)? CPU.+Mac OS X/
						  ) && (t = 'ios'),
					t
				)
			}
			function a(t) {
				var e = document.querySelector('a[name=' + t + ']')
				e && e.scrollIntoView()
			}
			function s(t) {
				console.log(JSON.stringify(t))
			}
			function c(t) {
				Object(i.a)(t.replace(/\[\d+\]$/, ''))
			}
			;(Date.prototype.getYMD = function() {
				var t = this.getFullYear() + ''
				return (
					this.getMonth() + 1 > 10
						? (t += this.getMonth() + 1)
						: (t += '0' + (this.getMonth() + 1)),
					(t +=
						this.getDate() >= 10
							? this.getDate()
							: '0' + this.getDate())
				)
			}),
				(String.prototype.getDate = function() {
					var t = this.split('-')
					return new Date(t[0], t[1] - 1, t[2])
				})
		},
		'8SHQ': function(t, e, n) {
			'use strict'
			var i = n('fSO0'),
				o =
					'http://activities.udateapp.com/static_html/2020/day_red_package/',
				r = {
					root: o,
					shareUrl: o + 'share.html',
					shareImg: o + n('R/sP'),
					shareImgWidth: 330,
					shareImgHeight: 330,
				}
			n.d(e, 'a', function() {
				return i.a
			}),
				n.d(e, 'b', function() {
					return r
				})
		},
		DmyW: function(t, e) {
			t.exports =
				'data:image/png;base64,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'
		},
		IBle: function(t, e, n) {
			'use strict'
			var i = { props: ['show'] },
				o = (n('vgYe'), n('KHd+')),
				r = Object(o.a)(
					i,
					function() {
						var t = this.$createElement
						return (this._self._c || t)('div', {
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
			e.a = r.exports
		},
		Ofg6: function(t, e, n) {
			'use strict'
			n('1CAK')
			var i = n('Kw5r'),
				o = n('KHd+'),
				r = Object(o.a)(
					{},
					function() {
						var t = this,
							e = t.$createElement,
							n = t._self._c || e
						return n('div', { staticClass: 'dialog alert' }, [
							n(
								'div',
								{
									staticClass: 'dialogContent',
									class: {
										'dialog-enter-active': t.enterActive,
										'dialog-leave-active': t.leaveActive,
									},
									on: {
										click: function(t) {
											t.stopPropagation()
										},
									},
								},
								[
									n('div', { staticClass: 'content' }, [
										n('div', {
											staticClass: 'pro_close',
											on: {
												click: function(e) {
													return (
														e.preventDefault(),
														t.close(e)
													)
												},
											},
										}),
										t._v(' '),
										n('span', {
											domProps: {
												innerHTML: t._s(
													t.text.replace(
														/\n/g,
														'<br>'
													)
												),
											},
										}),
									]),
								]
							),
						])
					},
					[],
					!1,
					null,
					null,
					null
				).exports,
				a = Object(o.a)(
					{},
					function() {
						var t = this,
							e = t.$createElement,
							n = t._self._c || e
						return n(
							'div',
							{
								staticClass: 'dialog confirm',
								on: { click: t.cancel },
							},
							[
								n(
									'div',
									{
										staticClass: 'dialogContent',
										class: {
											'dialog-enter-active':
												t.enterActive,
											'dialog-leave-active':
												t.leaveActive,
										},
										on: {
											click: function(t) {
												t.stopPropagation()
											},
										},
									},
									[
										n('div', { staticClass: 'content' }, [
											n('span', {
												domProps: {
													innerHTML: t._s(
														t.text.replace(
															/\n/g,
															'<br>'
														)
													),
												},
											}),
										]),
										t._v(' '),
										n('div', { staticClass: 'button' }, [
											n(
												'a',
												{
													attrs: { href: '' },
													on: {
														click: function(e) {
															return (
																e.preventDefault(),
																t.cancel(e)
															)
														},
													},
												},
												[t._v(t._s(t.cancelText))]
											),
											n(
												'a',
												{
													attrs: { href: '' },
													on: {
														click: function(e) {
															return (
																e.preventDefault(),
																t.ok(e)
															)
														},
													},
												},
												[t._v(t._s(t.okText))]
											),
										]),
										t._v(' '),
										n('a', {
											staticClass: 'close',
											attrs: { href: '' },
											on: {
												click: function(e) {
													return (
														e.preventDefault(),
														t.cancel(e)
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
			function c(t, e) {
				var n =
					arguments.length > 2 && void 0 !== arguments[2]
						? arguments[2]
						: s.a.ok
				new i.a({
					el: document.createElement('div'),
					render: r.render,
					data: function() {
						return {
							text: t,
							okText: n,
							enterActive: !1,
							leaveActive: !1,
						}
					},
					mounted: function() {
						var t = this
						document.body.appendChild(this.$el),
							(this.enterActive = !0),
							setTimeout(function() {
								t.enterActive = !1
							}, 333)
					},
					methods: {
						ok: function() {
							'function' == typeof e && e.call(this), this.close()
						},
						close: function() {
							var t = this
							;(this.leaveActive = !0),
								setTimeout(function() {
									document.body.removeChild(t.$el)
								}, 333)
						},
					},
				})
			}
			function u(t, e, n) {
				var o =
						arguments.length > 3 && void 0 !== arguments[3]
							? arguments[3]
							: s.a.ok,
					r =
						arguments.length > 4 && void 0 !== arguments[4]
							? arguments[4]
							: s.a.cancel
				new i.a({
					el: document.createElement('div'),
					render: a.render,
					data: function() {
						return {
							text: t,
							okText: o,
							cancelText: r,
							enterActive: !1,
							leaveActive: !1,
						}
					},
					mounted: function() {
						var t = this
						document.body.appendChild(this.$el),
							(this.enterActive = !0),
							setTimeout(function() {
								t.enterActive = !1
							}, 333)
					},
					methods: {
						activeLeaveStyle: function() {
							var t = this
							;(this.leaveActive = !0),
								setTimeout(function() {
									document.body.removeChild(t.$el)
								}, 333)
						},
						ok: function() {
							'function' == typeof e && e.call(this),
								this.activeLeaveStyle()
						},
						cancel: function() {
							'function' == typeof n && n.call(this),
								this.activeLeaveStyle()
						},
					},
				})
			}
			n.d(e, 'a', function() {
				return c
			})
			e.b = {
				install: function(t) {
					;(t.prototype.$alert = c), (t.prototype.$confirm = u)
				},
			}
		},
		Q2AE: function(t, e, n) {
			'use strict'
			var i,
				o = n('Kw5r'),
				r = n('L2JU'),
				a = n('+MiA'),
				s = n('7Qib'),
				c = n('RG0I'),
				u =
					Object.assign ||
					function(t) {
						for (var e = 1; e < arguments.length; e++) {
							var n = arguments[e]
							for (var i in n)
								Object.prototype.hasOwnProperty.call(n, i) &&
									(t[i] = n[i])
						}
						return t
					}
			function l(t) {
				return function() {
					var e = t.apply(this, arguments)
					return new Promise(function(t, n) {
						return (function i(o, r) {
							try {
								var a = e[o](r),
									s = a.value
							} catch (t) {
								return void n(t)
							}
							if (!a.done)
								return Promise.resolve(s).then(
									function(t) {
										i('next', t)
									},
									function(t) {
										i('throw', t)
									}
								)
							t(s)
						})('next')
					})
				}
			}
			function d(t, e, n) {
				return (
					e in t
						? Object.defineProperty(t, e, {
								value: n,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (t[e] = n),
					t
				)
			}
			var p, f
			Object(s.b)('uid'), Object(s.b)('token')
			o.a.use(r.a),
				(e.a = new r.a.Store({
					state:
						((i = {
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
							coins: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 },
							user_info: {},
							salt_score: 0,
							sweet_score: 0,
							new_mail: 0,
						}),
						d(i, 'sweet_len', 0),
						d(i, 'salt_len', 0),
						d(i, 'cp_result', ''),
						d(i, 'result', null),
						d(i, 'AppCpInfo', {}),
						d(i, 'invite', null),
						i),
					getters: {
						topStar: function(t) {
							var e = t.cid_rank.slice(0)
							return (
								e.sort(function(t, e) {
									return e.score - t.score
								}),
								e.length ? e[0] : null
							)
						},
					},
					mutations: {
						updateLoading: function(t, e) {
							t.loading = e
						},
						updateMyRank: function(t, e) {
							t.my_rank = e
						},
						updateRankGroups: function(t, e) {
							if (e && void 0 !== e.key) {
								var n = e.key
								delete e.key,
									(t.rankGroups = u(
										{},
										t.rankGroups,
										d({}, n, u({}, t.rankGroups[n], e))
									))
							}
						},
						updateCommentGroups: function(t, e) {
							if (e && void 0 !== e.key) {
								var n = e.key
								delete e.key,
									(t.commentGroups = u(
										{},
										t.commentGroups,
										d({}, n, u({}, t.commentGroups[n], e))
									))
							}
						},
						setMainTab: function(t, e) {},
						setcommentMainTab: function(t, e) {
							t.commentmainTab = e
						},
						settabClick: function(t, e) {
							console.log(e), (t.tab1 = e)
						},
						settabClickf: function(t, e) {
							t.tab2 = e
						},
						setInitInfo: function(t, e) {
							console.log(e),
								Object(c.a)('time', e.down_time || 0),
								(t.coins.a = parseInt(e.coins % 10)),
								(t.coins.b = parseInt((e.coins % 100) / 10)),
								(t.coins.c = parseInt((e.coins % 1e3) / 100)),
								(t.coins.d = parseInt((e.coins % 1e4) / 1e3)),
								(t.coins.e = parseInt((e.coins % 1e5) / 1e4)),
								(t.coins.f = parseInt((e.coins % 1e6) / 1e5)),
								(t.coins.g = parseInt((e.coins % 1e7) / 1e6)),
								0 == e.salt_score && 0 == e.sweet_score
									? ((t.sweet_len = 50), (t.salt_len = 50))
									: ((t.sweet_len = Math.floor(
											(e.sweet_score /
												(e.salt_score +
													e.sweet_score)) *
												100
									  )),
									  (t.salt_len = Math.floor(
											(e.salt_score /
												(e.salt_score +
													e.sweet_score)) *
												100
									  ))),
								(t.stime = e.stime),
								(t.etime = e.etime),
								(t.end_time = e.etime),
								(t.user_info = e.user_info),
								(t.salt_score = e.salt_score),
								(t.sweet_score = e.sweet_score),
								(t.new_mail = e.new_mail),
								(t.cp_result = e.cp_result),
								(t.result = e.result),
								(t.AppCpInfo = e.AppCpInfo),
								(t.invite = e.invite),
								(t.activity_status = e.step)
						},
						setDayRankOwnerInfos: function(t, e) {},
						setTotalRankOwnerInfo: function(t, e) {
							console.log('总榜'), (t.totalRankOwnerInfo = e)
						},
						setOwnerCid: function(t, e) {
							t.ownerCid = e
						},
						setInited: function(t) {
							t.inited = !0
						},
						setCommented: function(t) {
							t.commented = !0
						},
						setTaskInfo: function(t, e) {
							t.daily_tasks = e.daily_tasks
						},
					},
					actions: {
						init:
							((f = l(
								regeneratorRuntime.mark(function t(e, n) {
									var i, o, r, s
									return regeneratorRuntime.wrap(
										function(t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														return (
															(t.next = 2),
															Object(a.e)()
														)
													case 2:
														;(i = t.sent).data &&
															((o = i.data),
															(r =
																o.response_status),
															(s =
																o.response_data),
															r &&
																0 === r.code &&
																(e.commit(
																	'setInitInfo',
																	s
																),
																setTimeout(
																	function() {
																		e.commit(
																			'setInited'
																		)
																	},
																	100
																),
																n && n(s)))
													case 4:
													case 'end':
														return t.stop()
												}
										},
										t,
										this
									)
								})
							)),
							function(t, e) {
								return f.apply(this, arguments)
							}),
						refresh:
							((p = l(
								regeneratorRuntime.mark(function t(e, n) {
									var i, o, r, s, c, u
									return regeneratorRuntime.wrap(
										function(t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														return (
															console.log(n),
															(t.next = 3),
															Object(a.refresh)(
																n.step,
																n.sex
															)
														)
													case 3:
														;(i = t.sent).data &&
															((o = i.data),
															(r =
																o.response_status),
															(s =
																o.response_data),
															r &&
																0 === r.code &&
																((1 != n.step &&
																	1 !=
																		s.currentStep) ||
																	e.commit(
																		'updateOwner1',
																		s.owner
																	),
																(2 != n.step &&
																	2 !=
																		s.currentStep) ||
																	e.commit(
																		'updateOwner2',
																		s.owner
																	),
																(3 != n.step &&
																	3 !=
																		s.currentStep) ||
																	e.commit(
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
																e.commit(
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
														return t.stop()
												}
										},
										t,
										this
									)
								})
							)),
							function(t, e) {
								return p.apply(this, arguments)
							}),
					},
				}))
		},
		'R/sP': function(t, e, n) {
			t.exports = n.p + 'img/share.jpg?0bd9f5'
		},
		RG0I: function(t, e, n) {
			'use strict'
			function i(t, e) {
				if (!t || 'string' != typeof t) throw Error('downTime key fail')
				if (!sessionStorage) throw Error('Not support sessionStorage')
				if (((t = '_down_time_' + t), void 0 === e)) {
					var n = sessionStorage.getItem(t)
					if (n && /\[\d+,\d+\]/.test(n)) {
						var i = JSON.parse(n),
							o = Math.max(
								0,
								Math.round(
									i[0] -
										(new Date().getTime() / 1e3 -
											new Date(1e3 * i[1]).getTime() /
												1e3)
								)
							),
							r = o <= 0
						if (r)
							return {
								end: r,
								seconds: o,
								day: '00',
								hour: '00',
								minute: '00',
								second: '00',
							}
						var a = o,
							s = Math.floor(a / 86400)
						a -= 86400 * s
						var c = Math.floor(a / 3600)
						a -= 3600 * c
						var u = Math.floor(a / 60)
						a -= 60 * u
						var l = Math.floor(a)
						return {
							end: r,
							seconds: o,
							day: (s = s < 10 ? '0' + s : s.toString()),
							hour: (c = c < 10 ? '0' + c : c.toString()),
							minute: (u = u < 10 ? '0' + u : u.toString()),
							second: (l = l < 10 ? '0' + l : l.toString()),
						}
					}
					return null
				}
				if (isNaN(e)) throw Error('downTime value must be number')
				;(e = parseInt(e)),
					sessionStorage.setItem(
						t,
						JSON.stringify([
							e,
							Math.round(new Date().getTime() / 1e3),
						])
					)
			}
			n.d(e, 'a', function() {
				return i
			})
		},
		agfS: function(t, e, n) {
			'use strict'
			var i = n('vDqi'),
				o = n.n(i),
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
							var t = this
							this.loading = !0
							var e = Object(r.b)('uid') || '',
								n = Object(r.b)('token') || ''
							o.a
								.get(
									this.url
										.replace('{uid}', e)
										.replace('{token}', n)
										.replace('{from}', this.list.length)
								)
								.then(function(e) {
									t.loading = !1
									var n = e.data
									'function' == typeof t.parse &&
										(n = t.parse(n)),
										n.slice
											? (t.loadCount++,
											  n.length
													? (t.list = t.list.concat(
															n
													  ))
													: (t.loadEnd = !0),
											  t.loadCount > 0 &&
													0 === t.list.length &&
													(t.none = !0))
											: (t.loadEnd = !0)
								})
								.catch(function(e) {
									;(t.loading = !1), (t.loadEnd = !0)
								})
						},
						onScroll: function() {
							var t = !0
							;('function' == typeof this.active &&
								(t = this.active()),
							!t || this.loading || this.loadEnd) ||
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
						var t = this.$createElement
						return (this._self._c || t)(
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
			e.a = c.exports
		},
		bw5Y: function(t, e, n) {
			'use strict'
			n.d(e, 'a', function() {
				return h
			})
			var i = navigator.userAgent,
				o =
					null != i.match(/Chrome/i) &&
					null == i.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i),
				r = !!i.match(/(Android);?[\s\/]+([\d.]+)?/),
				a = !!i.match(/iPhone|iPad|iPd/i),
				s = a && i.match(/Safari/),
				c = navigator.userAgent.indexOf('MicroMessenger') >= 0,
				u = navigator.userAgent.indexOf('Line') >= 0,
				l = navigator.userAgent.indexOf('FBAV') >= 0,
				d = i.match(/OS\s*(\d+)/)
			d = (d && parseFloat(d[1], 10)) || 0
			var p = []
			function f() {
				for (var t = 0; t < p.length; t++) clearTimeout(p[t])
			}
			function h(t, e, n, i) {
				var f = (function() {
					var t = {
							name: 'AloChat',
							androidSchema: 'AloChat://alochatapp.com',
							androidDown:
								'https://play.google.com/store/apps/details?id=com.sq.alochat',
							iosSchema: 'yinmiapp://',
							iosDown:
								'https://apps.apple.com/tw/app/id1506862116',
							tips:
								'Hãy ấn "..." ở phía trên bên phải<br>dùng trình duyệt mặc định của hệ thống để mở',
						},
						e = {
							localhost: t,
							alochatapp: {
								name: 'AloChat',
								androidSchema: 'AloChat://alochatapp.com',
								androidDown:
									'https://play.google.com/store/apps/details?id=com.sq.alochat',
								iosSchema: 'yinmiapp://',
								iosDown:
									'https://apps.apple.com/tw/app/id1506862116',
								tips:
									'Hãy ấn "..." ở phía trên bên phải<br>dùng trình duyệt mặc định của hệ thống để mở',
							},
						},
						n = location.host
					for (var i in e) if (new RegExp(i, 'i').test(n)) return e[i]
					return t
				})()
				if (
					((c || u || l) &&
						(function(t) {
							var e =
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
									t +
									'</span>'),
								document.body.appendChild(n)
							var i = n.firstChild
							setTimeout(function() {
								i.style.opacity = 1
							}, 0),
								setTimeout(function() {
									;(i.style.opacity = 0),
										setTimeout(function() {
											document.body.removeChild(n)
										}, 1e3)
								}, 1e3 + e)
						})(f.tips),
					(t = t || f.androidSchema),
					(e = e || f.androidDown),
					(n = n || f.iosDown),
					(i = i || f.iosSchema || t),
					o &&
						r &&
						setTimeout(function() {
							window.location.href = t
						}, 50),
					s && d >= 9)
				)
					setTimeout(function() {
						var t = document.createElement('a')
						t.setAttribute('href', i),
							(t.style.display = 'none'),
							document.body.appendChild(t)
						var e = document.createEvent('HTMLEvents')
						e.initEvent('click', !1, !1), t.dispatchEvent(e)
					}, 0)
				else {
					var h = document.getElementById('_downloadAppIframe_')
					h ||
						(((h = document.createElement('iframe')).id =
							'_downloadAppIframe_'),
						(h.style.width = 0),
						(h.style.height = 0),
						(h.style.display = 'none'),
						document.body.appendChild(h)),
						(h.src = a ? i : t)
				}
				var m = Date.now()
				setTimeout(function() {
					var t = setTimeout(function() {
						Date.now() - m < 1700 &&
							(window.location.href = a ? n : e)
					}, 1500)
					p.push(t)
				}, 100)
			}
			window.addEventListener('blur', f, !1),
				window.addEventListener('pagehide', f, !1),
				document.addEventListener(
					'visibilitychange',
					function() {
						document.hidden && f()
					},
					!1
				)
		},
		fSO0: function(t, e, n) {
			'use strict'
			e.a = {
				ok: 'OK',
				cancel: 'Hủy',
				open_rule: 'Thể lệ',
				open_red_record: 'Trạng thái thân mật',
				t_day: 'Ngày',
				t_hour: 'giờ',
				t_minute: 'phút',
				t_second: 'giây',
				loading: 'Đang tải...',
				no_record: 'Chưa có thêm dữ liệu',
				no_data: 'Mau đi ghép đôi~',
				status_not_start: 'Sự kiện chưa bắt đầu..',
				status_end: 'Sự kiện đã kết thúc..',
				my_cp: 'Cặp đôi của tôi：',
				getInvite: 'Mời cô ấy/ anh ấy',
				invitation_tips:
					'Tình yêu ơi, tôi muốn được tham gia sự kiện Lễ hội tình yêu với bạn, để cả thế giới biết tôi yêu bạn！',
				reject_txt: 'Từ chối',
				accept_txt: 'Chấp nhận',
				success_tips: 'Mời thành công <br> đợi đối phương chấp nhận',
				recall_tips: 'Vui lòng đợi đối phương chấp nhận <br>',
				default_cp_tips:
					'Gỡ bỏ quan hệ yêu, sẽ không được tham gia sự kiện',
				protxt_reject: 'Bạn đã từ chối lời mời của đối phương',
				protxt_accept: 'Bạn đã chấp nhận lời mời đối phương',
				val_score: 'Điểm yêu',
				your: 'Người thương trong tương lai',
				invite_friend: 'Chia sẻ bạn bè chúc phúc',
				invite_fb: 'Mời bạn bè zalo. Facebook tham gia',
				tips_cp:
					'Sau khi ghép đôi sẽ được xếp ngẫu nhiên vào đội mặn / ngọt',
				gifts1: 'Nhẫn Trọn đời trọn kiếp',
				gifts2: 'Khung ảnh',
				gifts3: 'Vô số xu',
				sweet_val: 'Độ ngọt',
				salt_val: 'Độ mặn',
				tab_sweet: 'BXH Ngọt',
				tab_salt: 'BXH Mặn',
				rank_tips: 'BXH chỉ hiển thị top 20',
				cp_home: 'Góc yêu',
			}
		},
		kHVg: function(t, e, n) {
			t.exports = n.p + 'img/gift2.png?080899'
		},
		qdaB: function(t, e, n) {
			t.exports = n.p + 'img/gift3.png?0e59d0'
		},
		rA1G: function(t, e, n) {
			'use strict'
			var i = n('8SHQ'),
				o = n('7Qib'),
				r = n('bw5Y'),
				a = 'ios' == Object(o.a)(),
				s = !Object(o.b)('token'),
				c = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)
			function u(t) {
				!s && t ? (location.href = t) : Object(r.a)()
			}
			var l = {
				profile: function(t) {
					c
						? sendJsData('app://userInfo?uid=' + t)
						: JSInterface.sendJsData('app://userInfo?uid=' + t)
				},
				family: function(t) {
					u('fid:' + t)
				},
				room: function(t) {
					u('rid:' + t)
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
				share: function(t) {
					if (
						(t ||
							(t = {
								title: i.a.title,
								desc: i.a.desc,
								url: i.b.shareUrl,
								image: i.b.shareImg,
							}),
						a)
					)
						u(
							'shareUserInfo:' +
								t.url.replace(/^https?:/i, '') +
								'&title=' +
								t.title +
								'&shareText=' +
								t.desc +
								'&userImg=' +
								t.image
						)
					else
						try {
							JSInterface.share(t.url, t.title, t.desc, t.image)
						} catch (t) {}
				},
			}
			e.a = {
				computed: {
					lang: function() {
						return i.a
					},
					urls: function() {
						return i.b
					},
					app: function() {
						return l
					},
				},
				filters: {
					time: function(t) {
						var e = new Date(1e3 * t),
							n = e.getMonth() + 1,
							i = e.getDate()
						n < 10 && (n = '0' + n), i < 10 && (i = '0' + i)
						var o = e.getHours(),
							r = e.getMinutes()
						return (
							o < 10 && (o = '0' + o),
							r < 10 && (r = '0' + r),
							n + '/' + i + ' ' + o + ':' + r
						)
					},
					date: function(t) {
						var e = new Date(1e3 * t),
							n = e.getFullYear(),
							i = e.getMonth() + 1,
							o = e.getDate()
						return (
							n +
							'/' +
							(i = i < 10 ? '0' + i : i) +
							'/' +
							(o = o < 10 ? '0' + o : o)
						)
					},
					rank: function(t) {
						return t > 999 ? '999+' : t
					},
					number: function(t) {
						return t
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
					getPlatform: o.a,
					scrollToAnchor: o.c,
					showError: o.e,
					serverErrorAlert: o.d,
					openApp: r.a,
				},
			}
		},
		tNG6: function(t, e, n) {
			t.exports = n.p + 'img/gift1.png?563c0c'
		},
		uvoT: function(t, e, n) {},
		vgYe: function(t, e, n) {
			'use strict'
			var i = n('uvoT')
			n.n(i).a
		},
	},
])

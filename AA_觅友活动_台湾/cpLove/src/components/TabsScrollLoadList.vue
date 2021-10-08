<template>
    <div class="rankGroups">
        <!-- 日榜、总榜切换主Tabs -->
        <!-- <a @click.prevent="onRefresh" :class="['refreshButton',{refreshButtonRotate}]" href="">刷新</a> -->
        <div class="mainTabs">
            <div class="mainTabs">
                <a href="" :class="{ current: mainTab == 0 }" @click.prevent="mainTabClick(0)">{{lang.tab_sweet}}</a>
                <a href="" :class="{ current: mainTab == 1 }" @click.prevent="mainTabClick(1)">{{lang.tab_salt}}</a>
            </div>
        </div>

        <div class="list" v-if="mainTab != 2">
            <rank-item v-for="(item, index) in rank.list" :info="item" :key="index" :from="mainTab" />
        </div>

        <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
        <div v-if="rank.loading" class="scrollStatus scrollLoading">
            {{ lang.loading }}
        </div>
        <div v-if="rank.none" class="scrollStatus scrollNone">
            {{ lang.no_data }}
        </div>
        <div v-if="!rank.none && rank.loadEnd" class="scrollStatus scrollNoMore">
            {{ lang.loadEnd }}
        </div>

        <p class="rank_tips">{{lang.rank_tips}}</p>

        <!-- <transition name="bounce">
      <div class="pro_family_record" v-if="record_flag">
        <div class="inner">
          <div class="close" @click="record_flag = false"></div>
          <p class="title">{{ lang.record_title }}</p>
          <div class="record_list">
            <p class="record_title">
              <span>{{ lang.room_id }}</span> <span>{{ lang.time }}</span>
              <span>{{ lang.duration }}</span> <span>{{ lang.charm }}</span>
            </p>
            <div class="scrollable">
              <inner-scroll-load-list :url="record_url" :parse="proDataParse">
                <div slot-scope="{ list, loading, none }">
                  <div class="li" v-for="(item, index) in list" :key="index">
                    <span>{{ item.rid }}</span>
                    <span
                      ><i>{{ item.stime }}</i> <i>{{ item.etime }}</i></span
                    >
                    <span>{{ item.btime }}</span> <span>{{ item.coins }}</span>
                  </div>
                  <div v-show="loading" class="loading_inner">
                    {{ lang.loading }}
                  </div>
                  <div v-show="none" class="none_inner">
                    {{ lang.no_data }}
                  </div>
                </div>
              </inner-scroll-load-list>
            </div>
          </div>
        </div>
      </div>
    </transition> -->

        <!-- <pro :txt="pro_txt" /> -->
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { getUrlString, toast } from '../utils'
import { getMine, register, getBean } from '../apis'
import RankItem from './RankItem'
// import Pro from "./Pro";

export default {
    data() {
        return {
            mainTab: 0,
            tab: 0,
            pro_txt: '',
            refreshButtonRotate: false,
            idx: 0,
            showTotal: false,
            type: 0,
            pre: 0,
            pre_month: 0,
            mine: null,
            pre_flag: false,
            record_flag: false,
            record_url: '',
        }
    },
    computed: {
        ...mapState([
            'rankGroups',
            'data',
            'inited',
            'user_info',
            'pre_title',
            'dayRankOwnerInfos',
            'isreg',
        ]),
        rankKey() {
            return this.mainTab == 0 ? 0 : 1
        },
        rankApi() {
            // 也支持返回Promise对象函数
            // const dayApi = "/topic_custom/getHot.php?qid=" + qid + "&start={from}";
            // const totalApi = "/topic_custom/getNew.php?qid=" + qid + "&lastid=" + this.lastid;
            const apis = {
                0: '/index.php?action=cpLove.sweetRank&type=0&pre=0&from={from}&token={token}',
                1: '/index.php?action=cpLove.saltRank&type=0&pre=1&from={from}&token={token}',
            }
            const api = apis[this.rankKey]
            return api
        },
        rankSize() {
            // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
            return 100;
        },
        rank() {
            const rankConf = this.rankGroups[this.rankKey] || {}
            rankConf.list = rankConf.list || []
            return rankConf
        },
    },
    watch: {
        inited() {
            // this.onScroll();
            // window.addEventListener("scroll", this.onScroll);
            // this.ifOver = this.$refs.spanBox.offsetHeight > this.$refs.textBox.offsetHeight;
        },
    },
    mounted() {
        // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
        // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key,list})，再更新state.tab触发组件watch
        this.onScroll()
        window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        closePro() {
            this.pro_txt = ''
        },
        async join() {
            const res = await register()
            if (res.data) {
                const { response_status, response_data } = res.data
                if (response_status.error === '') {
                    this.pro_txt = this.lang.success
                    this.$store.dispatch('init')
                    this.onRefresh()
                } else {
                    toast(response_status.error)
                }
            }
        },
        async getBean() {
            if (this.mine.yesterday == 0) {
                this.pro_txt = this.lang.no_bean
                return
            }
            //领取金豆，刷新初始化，mine
            const res = await getBean()
            if (res.data) {
                const { response_status, response_data } = res.data
                if (response_status.error === '') {
                    this.pro_txt = this.lang.get_success
                    this.openGetMine()
                    this.$store.dispatch('init')
                } else {
                    toast(response_status.error)
                }
            }
        },
        openPre() {
            //上月积分
            this.pre_flag = true
        },
        openRecord() {
            this.record_flag = true
            this.record_url =
                '/kroom_hoster/allList.php?from={from}&uid={uid}&token={token}'
        },
        proDataParse(data) {
            if (!data.response_status.code) {
                return data.response_data.list || []
            } else {
                return []
            }
        },

        async mainTabClick(tab) {
            this.mainTab = tab
            this.$nextTick(() => {
                if (!this.rank.loadCount) {
                    this.onScroll()
                }
            })
        },

        onScroll() {
            // if(!this.inited){
            //   return;
            // }
            if (this.mainTab == 2) {
                return
            }
            const rank = Object.assign({}, this.rank)
            // 如果没有主动设置需要初始化数据或设置了但已经初始化过了可以接着滚动加载
            const inited = typeof rank.inited == 'undefined' || rank.inited
            if (!rank.loading && !rank.loadEnd && inited) {
                const scrollToBottom =
                    (document.documentElement.scrollTop ||
                        document.body.scrollTop) +
                        window.innerHeight >=
                    document.body.scrollHeight - 100
                const notFull = document.body.scrollHeight < window.innerHeigh
                if (scrollToBottom || notFull) {
                    const key = this.rankKey

                    const set = (k, v) => {
                        this.$store.commit('updateRankGroups', { key, [k]: v })
                    }

                    set('loading', true)
                    const from = rank.list.length
                    const loader =
                        typeof this.rankApi == 'function'
                            ? this.rankApi(from)
                            : axios.get(this.rankApi.replace('{from}', from))
                    loader
                        .then((res) => {
                            set('loading', false)

                            // 如果项目返回的数据结构不一样请自行修改
                            const { response_status, response_data } =
                                res.data || {}

                            // if (response_data.rank) {
                            //     response_data.rank.key = this.rankKey
                            //     this.$store.commit(
                            //         'setDayRankOwnerInfos',
                            //         response_data.rank
                            //     )
                            // }

                            // error判断用于APP接口，code判断用于活动接口标准
                            if (
                                response_status.error ||
                                response_status.code != 0
                            ) {
                                set('loadEnd', true)
                                return
                            }

                            const arr = response_data.slice
                                ? response_data
                                : response_data.list

                            if (arr.slice) {
                                const loadCount =
                                    typeof rank.loadCount == 'undefined'
                                        ? 0
                                        : rank.loadCount
                                set('loadCount', loadCount + 1)
                                if (arr.length) {
                                    set('list', rank.list.concat(arr))
                                    const noMore =
                                        !isNaN(this.rankSize) &&
                                        arr.length < parseInt(this.rankSize)
                                    if (rank.loadOnce || noMore) {
                                        set('loadEnd', true)
                                    } else {
                                        this.$nextTick(this.onScroll)
                                    }
                                } else {
                                    set('loadEnd', true)
                                }
                                if (
                                    this.rank.loadCount > 0 &&
                                    this.rank.list.length === 0
                                ) {
                                    set('none', true)
                                }
                            } else {
                                set('loadEnd', true)
                            }
                        })
                        .catch((err) => {
                            set('loading', false)
                            set('loadEnd', true)
                        })
                }
            }
        },
        onRefresh() {
            const key = this.rankKey

            // 当前榜单有请求还未完成，不管是初始化数据填充还是本身滚动触发的加载
            if (this.rankGroups[key].loading) return

            // 刷新按钮动画
            this.refreshButtonRotate = true
            setTimeout(() => {
                this.refreshButtonRotate = false
            }, 1000)

            // 除了当前榜单其它还需要刷新的数据
            // this.$store.dispatch('init', true);

            this.$store.commit('updateRankGroups', {
                key,
                loadCount: 0,
                loading: false,
                loadEnd: false,
                none: false,
                list: [],
            })
            this.$nextTick(this.onScroll)
        },
    },
    components: {
        RankItem,
    },
}
</script>

<style lang="scss">
.rankGroups {
    .mainTabs {
        width: 6.35rem;
        height: 0.98rem;
        line-height: 0.98rem;
        margin: 0 auto 0.12rem;
        text-align: center;
        background: url(../img/bg_tabs.png?6fa479) no-repeat;
        background-size: 100% 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        a {
            display: inline-block;
            width: 3.15rem;
            height: 0.86rem;
            line-height: 0.86rem;
            font-size: 0.32rem;
            color: #fff;
            font-weight: 700;
            &.current {
                width: 3.14rem;
                height: 0.86rem;
                background: url(../img/bg_tabs_active.png?5bddfb) 50% no-repeat;
                background-size: 100% 100%;
                color: #8c4018;
            }
        }
    }
}

.rankGroups {
    .pro_family_record {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        .inner {
            width: 6.86rem;
            height: 6.09rem;
            background: #9c28fe;
            border: 0.03rem solid #bc8aff;
            border-radius: 0.4rem;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            .close {
                position: absolute;
                width: 0.58rem;
                height: 0.58rem;
                text-align: center;
                right: 0.1rem;
                top: -0.7rem;
                // background: url("../img/close.png") 50% no-repeat;
                background-size: 0.58rem 0.58rem;
            }
            .title {
                font-size: 0.4rem;
                color: #ffef94;
                padding: 0.37rem 0 0.31rem;
                text-align: center;
            }
            .record_list {
                width: 6.52rem;
                height: 4.5rem;
                background: #6e00c4;
                border-radius: 0.3rem;
                margin: 0 auto;
                .record_title {
                    height: 0.93rem;
                    line-height: 0.93rem;
                    font-size: 0;
                    span {
                        display: inline-block;
                        vertical-align: middle;
                        color: #fff;
                        font-size: 0.24rem;
                        text-align: center;
                        &:first-of-type {
                            width: 0.9rem;
                            text-align: left;
                            padding: 0 0.13rem 0 0.22rem;
                        }
                        &:nth-of-type(2) {
                            width: 2.6rem;
                            padding-right: 0.2rem;
                        }
                        &:nth-of-type(3) {
                            width: 1.08rem;
                            padding-right: 0.15rem;
                        }
                        &:nth-of-type(4) {
                            width: 1rem;
                        }
                    }
                }
                .scrollable {
                    width: 6.52rem;
                    height: 3.4rem;
                    overflow: auto;
                    padding-bottom: 0.1rem;
                    .li {
                        display: -ms-flexbox;
                        display: flex;
                        -ms-flex-align: center;
                        align-items: center;
                        height: 0.91rem;
                        font-size: 0;
                        border-top: 0.02rem solid #5d00a4;
                        margin-left: 0.22rem;
                        margin-right: 0.22rem;
                        span {
                            display: inline-block;
                            vertical-align: middle;
                            color: #ada6ff;
                            font-size: 0.24rem;
                            text-align: center;
                            &:first-of-type {
                                width: 0.9rem;
                                padding: 0 0.13rem 0 0;
                            }
                            &:nth-of-type(2) {
                                width: 2.6rem;
                                padding-right: 0.2rem;
                                i {
                                    display: block;
                                }
                            }
                            &:nth-of-type(3) {
                                width: 1.08rem;
                                padding-right: 0.15rem;
                            }
                            &:nth-of-type(4) {
                                width: 1rem;
                            }
                        }
                    }
                }
                .loading_inner,
                .none_inner {
                    text-align: center;
                    font-size: 0.3rem;
                    color: #fff;
                }
            }
        }
    }
}

.rank_tips {
    text-align: center;
    padding: .3rem 0 .1rem;
    color: #fff;
    font-size: .3rem;
}

.scrollStatus {
    text-align: center;
    padding: 0.3rem 0;
    font-size: 0.28rem;
    color: #ccc;
    img {
        width: 0.24rem;
        height: 0.24rem;
        vertical-align: middle;
    }
}

@keyframes refreshButtonRotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(1080deg);
    }
}
.refreshButton {
    display: inline-block;
    &.refreshButtonRotate {
        animation: refreshButtonRotate 1s ease;
    }
}
</style>

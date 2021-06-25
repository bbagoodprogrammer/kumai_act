<template>
    <div class="getCode">
        <ul>
            <li @click="appReport(308)">
                <select v-model="area">
                    <option v-for="(item,index) in areaList" :value="item.code" :key="index">{{item.country}}{{item.code}}</option>
                </select>
                <div class="arrow"></div>
                <div class="mobi"><input ref="mobi" @click="appReport(307)" @focus="mobiFocus=true" @blur="mobiFocus=false" v-model="mobi" type="tel" maxlength="20" :placeholder="lang.mobi_ph"></div>
                <span class="remove" @click="setEmpty('mobi')" :class="{enable:mobi&&mobiFocus}"></span>
            </li>
            <li class="vcodew" :class="{right:!vcodeFocus&&vcodeRight&&vcode.length==vcodeSize}">
                <div class="vcode"><input ref="vcode" @click="appReport(310)" @focus="vcodeFocus=true;vcodeRight=false" @blur="vcodeFocus=false" v-model="vcode" type="text" :maxlength="vcodeSize" :placeholder="lang.vcode_ph"></div>
                <span class="remove" @click="setEmpty('vcode')" :class="{enable:vcode&&vcodeFocus}"></span>
                <img @click="updateVcodeImg" class="vcodeImg" :src="vcodeImg">
                <span @click="refresh" class="refresh" :class="{active:refreshActive}"></span>
            </li>
            <li>
                <div class="code"><input ref="code" @focus="codeFocus=true" @blur="codeFocus=false" v-model="code" type="number" @click="appReport(312)" @input="onCodeInput" :placeholder="lang.code_ph"></div>
                <span class="remove" @click="setEmpty('code')" :class="{enable:code&&codeFocus}"></span>
                <span class="line"></span>
                <a @click.prevent="getCode" href="" class="get" :class="{enable:getCodeEnable}">{{getCodeText}}</a>
            </li>
        </ul>
        <div class="button"><a @click.prevent="nextStep" :class="{enable:nextStepEnable}" href="">{{lang.next_step}}</a></div>
        <div class="tips">
            <h5><span></span><a @click.prevent="tipsButtonClick" href="">{{lang.get_code_fail}}</a></h5>
            <transition name="fade">
                <div v-show="tipsShow">
                    <h6>{{lang.reason}}</h6>
                    <ol>
                        <li>{{lang.reason1}}</li>
                        <li>{{lang.reason2}}</li>
                        <li>{{lang.reason3}}</li>
                        <li>{{lang.reason4}}</li>
                    </ol>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { getPlatform, getUrlQuery, parseResponse, toast, appReport, getAppVer } from '../utils';
import { getArea, getCode, checkCode, report } from '../apis';
import conf from '../config';

const query = getUrlQuery();
const initArea = query.country || '';
const initMobi = query.mobile || '';
const bundleId = query.bundleId || '';

export default {
    data() {
        return {
            areaList: [],

            area: '',
            mobi: '',
            vcode: '',
            code: '',

            rand: '',
            vcodeImg: '',
            vcodeRight: false,
            refreshActive: false,

            mobiFocus: false,
            vcodeFocus: false,
            codeFocus: false,

            fetching: false,
            getCount: 0,
            downTime: 0,
            downTimer: null,

            checking: false,

            tipsShow: false,
        };
    },
    computed: {
        vcodeSize() {
            return conf.vcodeSize;
        },
        codeSize() {
            return conf.codeSize;
        },

        areaText() {
            if (this.area && this.areaList.length) {
                for(let i = 0; i < this.areaList.length; i++) {
                    if (this.area == this.areaList[i].code) {
                        const obj = this.areaList[i];
                        return obj.country;
                    }
                }
            }
            return '';
        },
        getCodeText() {
            if (this.getCount < 1) {
                return this.lang.get_code;
            } else {
                let txt = this.lang.resend_code;
                if (this.downTime > 0) {
                    txt += `(${this.downTime})`;
                }
                return txt;
            }
        },

        getCodeEnable() {
            return this.area && this.mobi && this.vcode.length == this.vcodeSize && !this.fetching && this.downTime <= 0;
        },
        nextStepEnable() {
            return this.area && this.mobi && this.code.length == this.codeSize && !this.fetching && !this.checking;
        },
    },
    watch: {
        area() {
            if (this.vcodeRight) {
                this.vcode = '';
                this.vcodeRight = false;
            }
            this.code = '';
            
            if (!this.mobi) {
                this.$refs.mobi.focus();
            } else {
                this.$refs.vcode.focus();
            }
        },
    },
    mounted() {
        this.getArea(() => {
            if (initMobi) {
                this.mobi = this.removeMobiStartZero(initMobi);
                if (this.areaInList(initArea)) {
                    this.area = initArea;
                    // this.$refs.code.focus();
                    // this.getCode();
                }
            }
            this.updateVcodeImg();
        });
        appReport(306);
    },
    methods: {
        appReport,
        removeMobiStartZero(mobi) {
            return mobi; // 马来西亚有0开头的手机号码，客户端透传，服务器也兼容，前端不再处理
            return mobi.replace(/^0+/, '');
        },

        onCodeInput() {
            if (this.code.length > conf.codeSize) {
                this.code = this.code.slice(0, conf.codeSize);
            }
        },

        updateVcodeImg() {
            const rand = Math.round(Math.random() * 100000000);
            this.rand = rand;
            this.vcodeImg = conf.apis.vcode.replace('{rand}', rand);
            this.vcode = '';
            this.vcodeRight = false;
            if (!this.mobi) {
                this.$refs.mobi.focus();
            } else {
                this.$refs.vcode.focus();
            }
        },
        refresh() {
            this.updateVcodeImg();
            this.refreshActive = true;
            setTimeout(() => {
                this.refreshActive = false;
            }, 1000);
            appReport(309);
        },

        areaInList(area) {
            for(let i = 0; i < this.areaList.length; i++) {
                if (area == this.areaList[i].code) {
                    return true;
                }
            }
            return false;
        },
        async getArea(cb) {
            let res;
            try {
                res = await getArea();
            } catch(e) {
                toast(e.message);
                return;
            }

            if (res.data) {
                const {ret, list} = parseResponse(res.data);
                if (ret === 0) {
                    this.areaList = list;
                    this.area = list[0].code;
                }
            }
            if (typeof cb == 'function') {
                cb.call(this);
            }
        },

        setEmpty(dataKey) {
            if (this[dataKey]) {
                this[dataKey] = '';
                if (this.$refs[dataKey]) {
                    this.$refs[dataKey].focus();
                }
                if (dataKey == 'vcode') {
                    this.vcodeRight = false;
                }
            }
        },

        startTimer() {
            clearInterval(this.downTimer);
            this.downTime = conf.downTime;
            this.downTimer = setInterval(() => {
                this.downTime--;
                if (this.downTime <= 0) {
                    clearInterval(this.downTimer);
                }
            }, 1000);
        },
        async getCode() {
            if (this.getCodeEnable) {
                if (this.getCount > conf.getSize) {
                    toast(this.lang.check_mobi);
                    return;
                }

                let res;
                try {
                    this.code = '';
                    this.fetching = true;
                    res = await getCode(this.area, this.removeMobiStartZero(this.mobi), bundleId, this.vcode, this.rand);
                    this.fetching = false;
                } catch(e) {
                    this.fetching = false;
                    toast(e.message);
                    return;
                }

                if (res.data) {
                    const {ret, msg} = parseResponse(res.data);
                    if (ret === 0) {
                        this.getCount++;
                        this.$refs.code.focus();
                        toast(this.lang.code_sent);
                        this.startTimer();
                        this.vcodeRight = true;
                    } else {
                        this.updateVcodeImg();
                        if (msg) {
                            toast(msg);
                        }
                    }
                }
            }
            appReport(this.getCount < 1 ? 311 : 313);
        },

        callApp(token, mobi, area) {
            try {
                if (getPlatform() == 'ios') {
                    onGetTokenResult(`{"token":"${token}","mobile":"${mobi}","country":"${area}"}`);
                } else {
                    JSInterface.onGetTokenResult(token, mobi, area);
                }
            } catch(e) {}
        },
        async nextStep() {
            if (this.nextStepEnable) {
                let res;
                try {
                    this.checking = true;
                    res = await checkCode(this.area, this.removeMobiStartZero(this.mobi), this.code);
                    this.checking = false;
                } catch(e) {
                    this.checking = false;
                    toast(e.message);
                    return;
                }

                if (res.data) {
                    const {ret, msg, access_token} = parseResponse(res.data);
                    if (ret === 0) {
                        this.callApp(access_token, this.removeMobiStartZero(this.mobi), this.area);
                        this.mobi = '';
                    } else if (msg) {
                        toast(msg);
                    }
                    this.code = '';
                    appReport(ret === 0 ? 314 : 315);
                }
            }
        },

        tipsButtonClick() {
            this.tipsShow = !this.tipsShow;
            if (this.tipsShow) {
                report(this.area, this.mobi);
            }
        },
    },
}
</script>

<style lang="scss">
$page-padding: .4rem;

@keyframes refreshButtonRotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}

.getCode {
    padding: .5rem;
    ul {
        padding: .2rem 0;
        li {
            font-size: 0;
            margin: $page-padding 0;
            padding: 0 $page-padding;
            height: 1.08rem;
            display: flex;
            align-items: center;
            background: rgba(#777, 0.06);
            border-radius: .54rem;
            box-sizing: border-box;
            span, select, input, a, img {
                font-size: .32rem;
                display: inline-block;
                vertical-align: middle;
            }
            select, input {
                border: 0;
                background: none;
            }

            select {
                -webkit-appearance: none;
            }
            .arrow {
                width: .25rem;
                height: 100%;
                background: url("../img/select_arrow.png") center center no-repeat;
                background-size: 100% auto;
            }

            .remove {
                width: .34rem;
                height: .34rem;
                background: url("../img/icon_close.png") no-repeat;
                background-size: 100% 100%;
                transition: opacity .3s;
                opacity: 0;
                &.enable {
                    opacity: 1;
                }
            }

            .mobi, .vcode, .code {
                flex: 1;
                input {
                    width: 100%;
                }
            }

            .mobi {
                padding: 0 .05rem;
            }
            &.vcodew {
                img {
                    width: 2rem;
                    margin: 0 .3rem;
                    cursor: pointer;
                }
                &.right {
                    background: rgba(#36D56B, .06);
                    border: 1px solid #36D56B;
                }
            }
            .refresh {
                width: .33rem;
                height: .33rem;
                background: url("../img/icon_refresh.png") center center no-repeat;
                background-size: contain;
                cursor: pointer;
                &.active {
                    animation: refreshButtonRotate 1s ease;
                }
            }

            .line {
                width: 1px;
                height: .32rem;
                margin: 0 .3rem;
                background: $gray2;
            }
            .get {
                color: $gray2;
                cursor: default;
                transition: color .3s;
                &.enable {
                    color: $skin;
                    cursor: pointer;
                }
            }
        }
    }

    .button {
        padding: .1rem 0 .3rem 0;
        a {
            display: flex;
            height: .88rem;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: .32rem;
            background: #dedede;
            border-radius: .44rem;
            transition: background .3s;
            cursor: default;
            &.enable {
                cursor: pointer;
                background: linear-gradient(313deg, $btn1, $btn2);
            }
        }
    }

    .tips {
        color: $gray2;
        a, h6, li {
            font-size: .26rem;
        }
        h5 {
            padding-bottom: .5rem;
            display: flex;
            align-items: center;
            span {
                flex: 1;
            }
            a {
                color: $gray2;
            }
        }
        h6 {
            padding-bottom: .05rem;
        }
        ol {
            li {
                list-style: decimal;
                list-style-position: inside;
                line-height: .5rem;
            }
        }
    }
}
</style>
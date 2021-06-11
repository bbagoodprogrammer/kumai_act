<template>
    <div class="rankGroups">
        <!-- 日榜、总榜切换主Tabs -->
        <div class="mainTabs">
            <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">{{lang.day_data}}</a>
            <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">{{lang.month_data}}</a>
            <div class="risk-active-line" :class="[mainTab == 1?'risk-active-line-f':'risk-active-line-r']"></div>
        </div>

        <!-- @click="choose(0)"  选择时间 -->
        <div class="data" v-if="mainTab==0&&is_done_day">
            <div class="top">
                <div>
                    <span>{{getDayShowTime()}}</span>
                    <span @click="choose()"></span>
                </div>
                <div class="help" @click="openRule()"></div>
            </div>
            <div class="mid">
                <span></span>
                <span>{{init_data.coins}}</span>
                <p>{{lang.room_coins}}</p>
            </div>
            <div class="bottom">
                <i></i>
                <i></i>
                <span>
                    <strong class="fans">{{init_data.newFansCnt}}</strong>
                    <strong>{{lang.new_fans}}</strong>
                </span>
                <span>
                    <strong>{{init_data.validDay}}</strong>
                    <strong>{{lang.validDay}}</strong>
                </span>
                <span>
                    <strong>{{getHour(init_data.validMicTime)}}h</strong>
                    <strong>{{lang.validMicTime}}</strong>
                </span>
            </div>
        </div>

        <div class="data" v-if="mainTab==1&&is_done">
            <div class="top">
                <div>
                    <span>{{getMonthShowTime()}}</span>
                    <span @click="choose()"></span>
                </div>
                <div class="help" @click="openRule()"></div>
            </div>
            <div class="mid">
                <span></span>
                <span>{{month_data.coins}}</span>
                <p>{{lang.room_coins}}</p>
            </div>
            <div class="bottom">
                <i></i>
                <i></i>
                <span>
                    <strong class="fans">{{month_data.newFansCnt}}</strong>
                    <strong>{{lang.new_fans}}</strong>
                </span>
                <span>
                    <strong>{{month_data.validDay}}</strong>
                    <strong>{{lang.validDay}}</strong>
                </span>
                <span>
                    <strong>{{getHour(month_data.validMicTime)}}h</strong>
                    <strong>{{lang.validMicTime}}</strong>
                </span>
            </div>
        </div>

        <div class="detail">
            <div @click="openRoomDetail()">
                <span>{{lang.detail_room}}</span>
                <span></span>
            </div>
            <div @click="openLiveDetail()">            
                <span>{{lang.detail_live}}</span>
                <span></span>
            </div>
        </div>

        <!-- <van-popup v-model="popshow">test</van-popup> -->
        <van-popup v-model="show" position="bottom" round :style="{ height: '40%' }">
            <van-datetime-picker
                v-if="mainTab==0"
                v-model="currentDateDay"
                type="date"
                title=""
                :min-date="minDate"
                :max-date="maxDate"
                :confirm-button-text=lang.confirm
                :cancel-button-text=lang.cancel
                @confirm="confirmTime(0)"
                @cancel="cancelTime()"
                :swipe-duration="50"
            />
            <van-datetime-picker
                v-if="mainTab==1"
                v-model="currentDate"
                type="year-month"
                title=""
                :min-date="minDate"
                :max-date="maxDate"
                :confirm-button-text=lang.confirm
                :cancel-button-text=lang.cancel
                @confirm="confirmTime(1)"
                @cancel="cancelTime()"
                :swipe-duration="50"
            />
        </van-popup>

        <van-popup v-model="rule_show" position="bottom" round :style="{ height: '70%',}">
            <div class="rule_box">
                <p>{{lang.rule_title}}</p>
                <ol>
                    <li v-for="i in lang.rule_li.length" :key="i">
                        <i>{{i}}</i>
                        <strong v-html="lang.rule_li[i-1]"></strong>
                    </li>
                </ol>
            </div>
        </van-popup>

        <van-popup @click-overlay='closeVan' v-model="detailData" position="bottom" round :style="{ height: '9.3rem' }">

            <div class="pro_top" v-if="room_flag">
                <div class="inner">
                    <p class="title">
                        <span>{{lang.detail_room}}</span>
                        <span v-if="mainTab==0">{{getDayShowTimeInner()}}</span>
                        <span v-else>{{getMonthShowTime()}}</span>
                    </p>
                    <div class="rank_list scrollable">
                        <inner-scroll-load-list :url="room_url" :parse="liveDataParse" >
                            <div slot-scope="{list, loading, none, end}">
                                <room-item
                                    v-for="(item,index) in list"
                                    :info="item"
                                    :key="index"
                                />
                                <div v-show="loading" class="sloading_inner">{{lang.loading}}</div>
                                <div v-show="none" class="snone_inner">{{lang.no_data}}</div>
                                <div v-show="end" class="send_inner"></div>
                            </div>
                        </inner-scroll-load-list>
                    </div>
                </div>
            </div>

            <div class="pro_top" v-if="live_flag">
                <div class="inner">
                    <p class="title">
                        <span>{{lang.detail_live}}</span>
                        <span v-if="mainTab==0">{{getDayShowTimeInner()}}</span>
                        <span v-else>{{getMonthShowTime()}}</span>
                    </p>
                    <p class="total">
                        <span>{{lang.total}}</span>
                        <span></span>
                        <span v-if="mainTab==0"><i>{{lang.freeTime}}：{{getHour(init_data.freeTime)}}h</i><i>{{lang.busyTime}}：{{getHour(init_data.busyTime)}}h</i></span>
                        <span v-else><i>{{lang.freeTime}}：{{getHour(month_data.freeTime)}}h</i><i>{{lang.busyTime}}：{{getHour(month_data.busyTime)}}h</i></span>
                    </p>
                    <div class="rank_list scrollable" v-if="!singlePage">
                        <inner-scroll-load-list :url="live_url" :parse="roomDataParse" >
                            <div slot-scope="{list, loading, none, end}">
                                <live-item
                                    v-for="(item,index) in list"
                                    :info="item"
                                    :key="index"
                                />
                                <div v-show="loading" class="sloading_inner">{{lang.loading}}</div>
                                <div v-show="none" class="snone_inner">{{lang.no_data}}</div>
                                <div v-show="end" class="send_inner"></div>
                            </div>
                        </inner-scroll-load-list>
                    </div>
                    <div class="rank_list scrollable scrollable_live" v-if="singlePage">
                        <inner-scroll-load-list-single :url="live_url" :parse="roomDataParse" >
                            <div slot-scope="{list, loading, none, end}">
                                <live-item
                                    v-for="(item,index) in list"
                                    :info="item"
                                    :key="index"
                                />
                                <div v-show="loading" class="sloading_inner">{{lang.loading}}</div>
                                <div v-show="none" class="snone_inner">{{lang.no_data}}</div>
                                <div v-show="end" class="send_inner"></div>
                            </div>
                        </inner-scroll-load-list-single>
                    </div>
                </div>
            </div>

        </van-popup>
        
    </div>
</template>

<script>

import Vue from 'vue';
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString,getTimeObj } from '../utils';
// import mixin from '../utils/mixin';
// import RankItem from './RankItem';
// import downTime from '../utils/downTime';
import {getDayInfo,getMonthInfo} from '../apis';
import InnerScrollLoadList from '../components/InnerScrollLoadList';
import InnerScrollLoadListSingle from '../components/InnerScrollLoadListSingle';
import liveItem from '../components/liveItem';
import roomItem from '../components/roomItem';
const uid = getUrlString("uid");
const token = getUrlString("token");
const lang = getUrlString("lang");
const rid = getUrlString("rid");
//可设置初始化日子
const mTime = new Date(2020, 12, 1);

export default {
    // mixins: [mixin],
    data() {
        return {
            mainTab: 0,
            rule_show:false,
            rule_flag:false,
            detailData:false,
            today_month:'',
            send_month:'',
            send_day:'',
            show_day:'',
            init_data:{},
            month_data:{},
            is_done:false,
            is_done_day:false,
            minDate: mTime,
            maxDate: new Date(),
            currentDate: new Date(),
            currentDateDay: new Date(),
            show: false,
            popshow: false,
            tips: "",
            stime: 0,
            etime: 0,
            showstime: 0,
            showetime: 0,
            stime_flag: true,
            etime_flag: true,

            room_flag:false,
            room_url:'',
            live_flag:false,
            live_url:'',

            shijiancuo:new Date()/1000,
            shijiancuo_month:new Date()/1000,

            confirm_day_time:'',
            confirm_month_time:'',
            isLoad:false,
            singlePage:false,
        };
    },
    computed: {
        ...mapState(['loading','rankGroups']),
    },
    mounted() {
        var now = Date.parse(new Date());
        var _day = getTimeObj(now/1000);
        this.send_day = _day.year+'-'+_day.month+'-'+_day.day;
        (async()=>{
            const info = await getDayInfo(this.send_day);
            if (info.data) {
                const {response_status, response_data} = info.data;
                if (response_status.error == ''){
                    this.is_done_day =true;
                    Object.assign(this.init_data, response_data);
                }else{
                    // this.$alert(response_status.error.replace(/\[\d+\]/, ''));
                }
            }
        })()
    },
    watch:{
        confirm_day_time(){
            console.log(this.confirm_day_time);
            this.isLoad = true;
        }
    },
    methods: {
        getDayShowTime(){
            return this.lang.day_time.replace('{0}',getTimeObj(this.shijiancuo).year).replace('{1}',getTimeObj(this.shijiancuo).month).replace('{2}',getTimeObj(this.shijiancuo).day);
        },
        getDayShowTimeInner(){
            return this.lang.day_time_inner.replace('{0}',getTimeObj(this.shijiancuo).year).replace('{1}',getTimeObj(this.shijiancuo).month).replace('{2}',getTimeObj(this.shijiancuo).day);
        },
        getMonthShowTime(){
            return this.lang.month_time.replace('{0}',getTimeObj(this.shijiancuo_month).year).replace('{1}',getTimeObj(this.shijiancuo_month).month);
        },
        openRule(){
            this.rule_show = !this.rule_show;
        },
        getHour(seconds){
            return (seconds/60/60).toFixed(1);
        },
        async mainTabClick(tab){
            this.mainTab = tab;
            if(tab==1){//月数据
                if(!this.is_done){
                    var nowmonth=new Date().getTime();
                    var today = String(this.format(nowmonth/1000));
                    this.shijiancuo_month = new Date().getTime()/1000;
                    const info = await getMonthInfo(today);
                    if (info.data) {
                        const {response_status, response_data} = info.data;
                        if (response_status.error == ''){
                            Object.assign(this.month_data, response_data);
                            this.is_done = true;
                            console.log(this.month_data);
                        }else{
                            this.$alert(response_status.error.replace(/\[\d+\]/, ''));
                        }
                    }
                }
            }
        },
        //排行榜
        openRank(type){
            if(type=='month'){//月
                location.href='rank.html?rank=1&token='+token+'&uid='+uid+'&time='+this.send_month;
            }else{//日
                location.href='rank.html?rank=2&token='+token+'&uid='+uid+'&time='+this.send_day;
            }
        },

        choose() {
            if (!this.show) {
                this.show = true;
            } else {
                this.show = false;
            }
        },
        async confirmTime(type) {//0日，1月
            if(type==0){
                // this.confirm_day_time = String(this.formatDay(this.currentDateDay.getTime()/1000));
                var send_time = String(this.formatDay(this.currentDateDay.getTime()/1000));
                this.shijiancuo = this.currentDateDay.getTime()/1000;
                setTimeout(async()=>{
                    const info = await getDayInfo(send_time);
                    if (info.data) {
                        const {response_status, response_data} = info.data;
                        if (response_status.error == ''){
                            // this.is_done =true;
                            this.isLoad = false;
                            if(response_data&&response_data.length==0){
                                this.$alert(this.lang.no_data);
                                return;
                            }
                            // this.shijiancuo = this.currentDateDay.getTime()/1000;
                            this.show = false;
                            this.init_data={};
                            this.init_data=response_data;
                        }else{
                            this.$alert(response_status.error.replace(/\[\d+\]/, ''));
                        }
                    }
                },300)
            }else{
                var send_month_time = String(this.format(this.currentDate.getTime()/1000));
                this.shijiancuo_month = this.currentDate.getTime()/1000;
                // this.confirm_month_time = String(this.format(this.currentDate.getTime()/1000));
                const info = await getMonthInfo(send_month_time);
                if (info.data) {
                    const {response_status, response_data} = info.data;
                    if (response_status.error == ''){
                        console.log(this.month_data);
                        if(response_data&&response_data.length==0){
                            this.$alert(this.lang.no_data);
                            return;
                        }
                        // this.shijiancuo_month = this.currentDate.getTime()/1000;
                        this.show = false;
                        // Object.assign(this.month_data, response_data);
                        this.month_data={};
                        this.month_data=response_data;
                        // alert(this.month_data.coins);
                    }else{
                        this.$alert(response_status.error.replace(/\[\d+\]/, ''));
                    }
                }
            }
        },
        cancelTime() {
            this.show = false;
        },

        openRoomDetail(){
            this.detailData = !this.detailData;
            this.room_flag = true;
            if(this.mainTab==0){//日榜
                this.singlePage = false;
                this.confirm_day_time = String(this.formatDay(this.shijiancuo));
                console.log(this.confirm_day_time);
                this.room_url = '/index.php?signture=innerserver&action=Action/Anchor.getDayGiftInfo&uid={uid}&token={token}&from={from}&page={page}&ymd='+this.confirm_day_time+'&lang='+lang+'&rid='+rid;
            }else{
                this.singlePage = false;
                this.confirm_month_time = String(this.format(this.shijiancuo_month));
                console.log(this.confirm_month_time);
                this.room_url = '/index.php?signture=innerserver&action=Action/Anchor.getMonthGiftInfo&uid={uid}&token={token}&from={from}&page={page}&ym='+this.confirm_month_time+'&lang='+lang+'&rid='+rid;
            }
        },
        roomDataParse(data){
            if(!data.response_status.code){
                return data.response_data || [];
            }else{
                return [];
            }
        },

        closeVan(){
            // if(this.room_flag == true){
            //     // 是否重新加载
                setTimeout(()=>{
                    this.live_flag = false;
                    this.room_flag = false;
                },500)
            // }
        },

        openLiveDetail(){
            this.detailData = !this.detailData;
            this.live_flag = true;
            if(this.mainTab==0){//日榜
                this.singlePage = false;
                this.confirm_day_time = String(this.formatDay(this.shijiancuo));
                // console.log(this.confirm_day_time);
                this.live_url = '/index.php?signture=innerserver&action=Action/Anchor.getDayRoomInfo&uid={uid}&token={token}&from={from}&page={page}&ymd='+this.confirm_day_time+'&lang='+lang+'&rid='+rid;
            }else{
                this.singlePage = true;
                this.confirm_month_time = String(this.format(this.shijiancuo_month));
                // console.log(this.confirm_month_time);
                this.live_url = '/index.php?signture=innerserver&action=Action/Anchor.getMonthRoomInfo&uid={uid}&token={token}&from={from}&page={page}&ym='+this.confirm_month_time+'&lang='+lang+'&rid='+rid;
            }
        },
        liveDataParse(data){
            if(!data.response_status.code){
                return data.response_data || [];
            }else{
                return [];
            }
        },



        formatDay(nows) { 
            var now=new Date(nows*1000); 
            var year=now.getFullYear(); 
            var month=now.getMonth()+1>=10?now.getMonth()+1:'0'+(now.getMonth()+1); 
            var date=now.getDate()>=10?now.getDate():'0'+now.getDate(); 
            var hour=now.getHours()>=10?now.getHours():'0'+now.getHours(); 
            var minute=now.getMinutes()>=10?now.getMinutes():'0'+now.getMinutes(); 
            var second=now.getSeconds()>10?now.getSeconds():'0'+now.getSeconds(); 
            return year+"-"+month+"-"+date;
        },
        showformat(nows) { 
            var now=new Date(nows*1000); 
            var year=now.getFullYear(); 
            var month=now.getMonth()+1>=10?now.getMonth()+1:'0'+(now.getMonth()+1); 
            var date=now.getDate()>=10?now.getDate():'0'+now.getDate(); 
            var hour=now.getHours()>=10?now.getHours():'0'+now.getHours(); 
            var minute=now.getMinutes()>=10?now.getMinutes():'0'+now.getMinutes(); 
            var second=now.getSeconds()>10?now.getSeconds():'0'+now.getSeconds(); 
            return year+"."+month; 
        },
        format(nows) { 
            var now=new Date(nows*1000); 
            var year=now.getFullYear(); 
            var month=now.getMonth()+1>=10?now.getMonth()+1:'0'+(now.getMonth()+1); 
            var date=now.getDate()>=10?now.getDate():'0'+now.getDate(); 
            var hour=now.getHours()>=10?now.getHours():'0'+now.getHours(); 
            var minute=now.getMinutes()>=10?now.getMinutes():'0'+now.getMinutes(); 
            var second=now.getSeconds()>10?now.getSeconds():'0'+now.getSeconds(); 
            return year+"-"+month;
        },
        showformatDay(nows) { 
            var now=new Date(nows*1000); 
            var year=now.getFullYear(); 
            var month=now.getMonth()+1>=10?now.getMonth()+1:'0'+(now.getMonth()+1); 
            var date=now.getDate()>=10?now.getDate():'0'+now.getDate(); 
            var hour=now.getHours()>=10?now.getHours():'0'+now.getHours(); 
            var minute=now.getMinutes()>=10?now.getMinutes():'0'+now.getMinutes(); 
            var second=now.getSeconds()>10?now.getSeconds():'0'+now.getSeconds(); 
            return month+"."+date;
        },
    },
    components: {
        InnerScrollLoadList,
        InnerScrollLoadListSingle,
        liveItem,
        roomItem
    }
}
</script>

<style lang="scss">
body{
    background-color: #10093C;
    font-family: "San Francisco", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Noto Sans CJK", "Droid Sans", "Droid Sans Fallback", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif;
}
.van-picker__confirm{
    color: #7A68F8;
}
.rankGroups {
    position: relative;
    .mainTabs {
        height: .88rem;
        line-height: .88rem;
        margin: auto;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0;
        box-sizing: border-box;
        position: relative;
        a {
            display: inline-block;
            width: 50%;
            font-size: .32rem;
            color: #BCBBC7;
            position: relative;
            &.current {
                color: #fff;
            }
        }
        .risk-active-line {
            width: .28rem;
            height: .08rem;
            background: #7A68F8;
            border-radius: .06rem;
            position: absolute;
            bottom: .08rem;
            left: 5.5rem;
            transition: all 0.3s ease;
        }
        .risk-active-line-f {
            transform: translate3d(0, 0, 0);
        }
        .risk-active-line-r {
            transform: translate3d(-3.78rem, 0, 0);
        }
    }

    .data{
        width: 6.90rem;
        // height: 3.98rem;
        background: linear-gradient(135deg, rgba(246, 90, 110, .1) 0%, rgba(182, 118, 240, .1) 64%, rgba(125, 125, 246, .1) 100%);
        border-radius: .20rem;
        margin: .3rem auto .3rem;
        padding: .35rem 0 .3rem;
        box-sizing: border-box;
        .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .3rem;
            >div{
                display: inline-block;
            }
            >div:nth-of-type(1){
                font-size: 0;
                span{
                    display: inline-block;
                    vertical-align: middle;
                }
                span:nth-of-type(1){
                    font-size: .28rem;
                    font-weight: bold;
                    line-height: .46rem;
                    color: rgba(255, 255, 255, .3);
                    margin-right: .1rem;
                }
                span:nth-of-type(2){
                    width: .54rem;
                    height: .4rem;
                    background: url('../img/arrow_down.png');
                    background-size: 100% 100%;
                }
            }
            >div:nth-of-type(2){
                width: .42rem;
                height: .42rem;
                background: url('../img/help.png');
                background-size: 100% 100%;
            }
        }
        .mid{
            text-align: center;
            margin: .56rem 0 .62rem 0;
            font-size: 0;
            span{
                display: inline-block;
                vertical-align: middle;
            }
            span:nth-of-type(1){
                width: .42rem;
                height: .42rem;
                background: url('../img/coin.png');
                background-size: 100% 100%;
                margin-right: .1rem;
            }
            span:nth-of-type(2){
                font-size: .6rem;
                line-height: .45rem;
                color: #fff;
                transform: skew(-10deg);
                -webkit-transform: skew(-10deg);
            }
            p{
                font-size: .26rem;
                line-height: .32rem;
                color: #8C8995;
                padding-top: .19rem;
            }
        }
        .bottom{
            font-size: 0;
            position: relative;
            i{
                display: inline-block;
                width: 1px;
                height: .54rem;
                background-color: rgba(255, 255, 255, .2);
                position: absolute;
                top: 50%;
                margin-top: -.27rem;
            }
            i:nth-of-type(1){
                right: 33.3%;
            }
            i:nth-of-type(2){
                right: 66.6%;
            }
            span{
                display: inline-block;
                vertical-align: middle;
                width: 33.33%;
                text-align: center;
            }
            strong{
                display: block;
            }
            strong:nth-of-type(1){
                font-size: .36rem;
                color: #fff;
                transform: skew(-10deg);
                -webkit-transform: skew(-10deg);
                &.fans{
                    background: linear-gradient(180deg, #FFA2AE 0%, #B676F0 51%, #7D7DF6 100%);
                    -webkit-background-clip: text;
                    color: transparent;
                }
            }
            strong:nth-of-type(2){
                margin-top: .1rem;
                font-size: .24rem;
                line-height: .33rem;
                color: #8C8995;
            }
        }
    }

    .detail{
        padding: 0 .3rem;
        >div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.28rem;
            span{
                display: inline-block;
            }
            span:nth-of-type(1){
                font-size: .32rem;
                color: #FFFFFF;
            }
            span:nth-of-type(2){
                width: .42rem;
                height: .42rem;
                background: url('../img/arrow_right.png');
                background-size: 100% 100%;
            }
        }
    }
    .van-overlay{
        // background-color: #ccc;
    }
    .van-popup--bottom.van-popup--round{
        border-radius: .2rem .2rem 0 0;
    }
    .rule_box{
        >p{
            font-size: .36rem;
            font-weight: bold;
            color: #2C2B36;
            padding: .4rem 0 .32rem 0;
            text-align: center;
        }
        ol {
            li {
            padding-bottom: 0.23rem;
            display: flex;
            flex-wrap: nowrap;
            padding: 0 .3rem;
            margin-bottom: .1rem;
                i {
                    box-sizing: border-box;
                    margin-top: 0.08rem;
                    margin-right: 0.1rem;
                    width: 0.3rem;
                    height: 0.3rem;
                    line-height: .3rem;
                    font-size: 0.24rem;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    background: url("../img/bg_num.png");
                    background-size: 100% 100%;
                    color: #fff;
                }
                strong {
                    flex: 1;
                    font-size: .26rem;
                    line-height: .46rem;
                    color: #2C2B36;
                }
            }
        }
    }

    .pro_top{
        .inner{
            height: 9rem;
            position: relative;
            .title{
                padding: .4rem .35rem .1rem .3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span:nth-of-type(1){
                    font-size: .36rem;
                    font-weight: bold;
                    line-height: .5rem;
                    color: #2C2B36;
                }
                span:nth-of-type(2){
                    font-size: .28rem;
                    font-weight: 400;
                    line-height: .5rem;
                    color: #8C8995;
                }
            }
            .total{
                width: 7.50rem;
                height: .46rem;
                line-height: .46rem;
                background: linear-gradient(81deg, rgba(234, 234, 242, 0) 0%, rgba(234, 234, 242, 0) 0%, #EAEAF2 18%, #EAEAF2 85%, rgba(234, 234, 242, 0) 100%);
                border-radius: .23rem;
                padding: 0 .3rem;
                font-size: 0;
                margin-bottom: .1rem;
                span{
                    display: inline-block;
                    vertical-align: middle;
                }
                span:nth-of-type(1),span:nth-of-type(3){
                    font-size: .28rem;
                    color: #5C5B67;
                    // -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
                    // text-stroke: 1 rgba(0, 0, 0, 0);
                }
                span:nth-of-type(2){
                    width: 1px;
                    height: .26rem;
                    background: #D1D0DC;
                    margin: 0 .14rem 0 .1rem;
                }
                span:nth-of-type(3){
                    i{
                        font-size: .28rem;
                        color: #5C5B67;
                    }
                    i:nth-of-type(1){
                        margin-right: .4rem;
                    }
                }
            }
            .scrollable{
                height: 8rem;
                overflow: auto;
                margin: 0 auto;
                padding-bottom: .2rem;
                &.scrollable_live{
                    height: 7.5rem;
                }
            }
            .scrollable::-webkit-scrollbar {
                /*滚动条整体样式*/
                width : 0;  /*高宽分别对应横竖滚动条的尺寸*/
                height: 0;
            }
            .scrollable::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
            }
            .sloading_inner,.snone_inner,.send_inner{
                text-align: center;
                font-size: .26rem;
                color: #5C5B67;
                padding-top: .4rem;
            }
            .snone_inner{
                padding-top: 2rem;
            }
            // .rankItem_box:nth-of-type(-1) { 
            //     background-color: #ccc;
            // }

            // .rankItem_box:nth-of-type(116){
            //     background-color: #ccc;
            // }
            // .rankItem_box:last-child{
            //     .rankItem{
            //         border:none;
            //     }
            // }
        }
    }

    .bounce-enter-active {
    animation: bounce-in 0.4s;
    }
    .bounce-leave-active {
    animation: bounce-in 0.4s reverse;
    }
    @keyframes bounce-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
}
</style>

<template>
    <div class="rankItem_box">
        <div class="rankItem" v-if="info.ymd">
            <div class="month">
                <span>
                    {{lang.live_month_time.replace('{0}',info.ymd.slice(5,7)).replace('{1}',info.ymd.slice(8,10))}}
                </span>
                <span>{{lang.idle_time}}{{getHour(info.idle_time)}}h <i v-html="lang.is_br"></i> {{lang.busy_time}}{{getHour(info.busy_time)}}h</span>
            </div>
        </div>
        <div class="rankItem" v-else>
            <div class="day">
                <span>
                    <strong>{{getShowTime(info.btime)}} - {{getShowTime(info.qtime)}}</strong>
                    <strong>{{lang.online}}{{getHour(info.online)}}h</strong>
                </span>
                <span v-if="info.is_busy=='1'">{{lang.is_busy}}</span>
                <span v-else>{{lang.no_busy}}</span>
            </div>
        </div>
    </div>
</template>

<script>
// import mixin from '../utils/mixin';
import { getUrlString,getTimeObj } from '../utils';
export default {
    // mixins: [mixin],
    props: ['info','from'],
    computed: {
        star() {
            if (typeof this.info.cid != 'undefined') {
                // return zodiac[this.info.cid];
            }
        },
    },
    components: {
        // Avatar,
    },
    methods:{
        getAvatar(url){
            return url?url:require('../img/avatar.png');
        },
        appPro(id){
            if(id){
                location.href="rid:"+id;
            }
        },
        getHour(seconds){
            return (seconds/60/60).toFixed(1);
        },
        getShowTime(ts){
            return this.lang.live_time.replace('{0}',getTimeObj(ts).month).replace('{1}',getTimeObj(ts).day).replace('{2}',getTimeObj(ts).hour).replace('{3}',getTimeObj(ts).minute);
        },
    },
}
</script>

<style lang="scss">
.rankItem{
    width: 6.9rem;
    // height: 1.5rem;
    padding: .3rem 0;
    margin: 0 auto;
    border-bottom: .01rem solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .month{
        span{
            display:block;
        }
        span:nth-of-type(1){
            font-size: .28rem;
            font-family: PingFang SC;
            line-height: .4rem;
            color: #999999;
        }
        span:nth-of-type(2){
            font-size: .32rem;
            font-family: PingFang SC;
            line-height: .45rem;
            color: #333333;
        }
    }
    .day{
        width: 6.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            display: inline-block;
        }
        span:nth-of-type(1){
            strong{
                display: block;
            }
            strong:nth-of-type(1){
                font-size: .28rem;
                font-family: PingFang SC;
                line-height: .40rem;
                color: #999999;
                padding-bottom: .04rem;
            }
            strong:nth-of-type(2){
                font-size: .32rem;
                font-family: PingFang SC;
                line-height: .45rem;
                color: #333333;
            }
        }
        span:nth-of-type(2){
            font-size: .70rem;
            background: linear-gradient(180deg, #F65A6E 0%, #B676F0 64%, #7D7DF6 100%);
            -webkit-background-clip: text;
            color: transparent;
            transform: skew(-10deg);
            -webkit-transform: skew(-10deg);
            opacity: .3;
            font-weight: bold;
        }
    }
}
</style>
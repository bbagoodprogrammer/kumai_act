<template>
    <div class="rankItem_box">
        <div class="rankItem">
            <span>
                <strong>
                    <img src="../img/avatar.png" alt="">
                </strong>
                <strong>
                    <em>傻不拉幾...</em>
                    <i>ID 100000</i>
                </strong>
            </span>
            <span>14552400</span>
            <span>30</span>
            <span>4550.4h</span>
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
    height: 1.36rem;
    // padding: .3rem 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    line-height: 1;
    span{
        display: inline-block;
        vertical-align: middle;
    }
    span:nth-of-type(1){
        width: 2.6rem;
        font-size: 0;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: .26rem;
        strong:nth-of-type(1){
            width: .88rem;
            height: .88rem;
            margin-right: .07rem;
            img{
                width: .88rem;
                height: .88rem;
                border-radius: 50%;
            }
        }
        strong:nth-of-type(2){
            em,i{
                display: block;
            }
            em{
                font-size: .28rem;
                line-height: .30rem;
                color: #FFFFFF;
                margin-bottom: .05rem;
                width: 1.54rem;
                max-width: 1.54rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            i{
                font-size: .24rem;
                line-height: .33rem;
                color: #999999;
            }
        }
    }
    span:nth-of-type(2){
        width: 1.7rem;
        font-size: .28rem;
        line-height: .70rem;
        color: #FFDD00;
        -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
        text-stroke: 1 rgba(0, 0, 0, 0);
        text-align: center;
    }
    span:nth-of-type(3){
        width: 1.3rem;
        font-size: .24rem;
        line-height: .30rem;
        color: #999999;
        opacity: 1;
        text-align: center;
    }
    span:nth-of-type(4){
        width: 1.3rem;
        font-size: .24rem;
        line-height: .30rem;
        color: #999999;
        opacity: 1;
        text-align: center;
    }
}
</style>
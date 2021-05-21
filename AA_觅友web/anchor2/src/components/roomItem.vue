<template>
    <div class="rankItem_box">
        <div class="rankItemRoom">
            <div class="avatar" @click="openIndex(info.sender)">
                <img :src="info.sender_avatar" alt="">
            </div>
            <div class="info">
                <p class="nick">
                    <span>{{info.sender_nick}}</span>
                    <span><strong>{{info.spend}}</strong><img src="../img/coin.png" alt=""></span>
                </p>
                <p class="time">{{getTime(info.stime)}}</p>
                <p class="gift">
                    <span class="txt">{{lang.room_tips_send}}</span>
                    <img :src="info.gift_image" alt="" class="gift_img">
                    <span class="gift_name">{{info.family_name}}x{{info.nums}}</span>
                    <span class="txt">{{lang.room_tips_give}}</span>
                    <img :src="info.receiver_avatar" alt="" class="gift_avatar" @click="openIndex(info.receiver)">
                    <span class="gift_nick">{{info.receiver_nick}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
// import mixin from '../utils/mixin';
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
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
        openIndex(id){
            if(ios){
				sendJsData('app://userInfo?uid='+id);
			}else{
				javascript:JSInterface.sendJsData('app://userInfo?uid='+id);
			}
        },
        getTime(ts){
            return this.lang.room_time.replace('{0}',getTimeObj(ts).month).replace('{1}',getTimeObj(ts).day).replace('{2}',getTimeObj(ts).hour).replace('{3}',getTimeObj(ts).minute);
        },
    },
}
</script>

<style lang="scss">
.rankItemRoom{
    width: 6.9rem;
    margin: 0 auto;
    font-size: 0;
    >div{
        display: inline-block;
        vertical-align: text-top;
    }
    .avatar{
        width: .9rem;
        height: .9rem;
        padding-top: .3rem;
        margin-right: .2rem;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .info{
        width: 5.8rem;
        padding: .3rem 0;
        border-bottom: .01rem solid #e5e5e5;
        .nick{
            display: flex;
            justify-content: space-between;
            align-items: center;
            span:nth-of-type(1){
                font-size: .28rem;
                font-family: PingFang SC;
                line-height: .4rem;
                color: #999999;
            }
            span:nth-of-type(2){
                strong,img{
                    display: inline-block;
                    vertical-align: middle;
                }
                strong{
                    font-size: .28rem;
                    font-family: PingFang SC;
                    font-weight: bold;
                    line-height: .40rem;
                    color: #FF8022;
                    margin-right: .06rem;
                }
                img{
                    width: .3rem;
                    height: .3rem;
                }
            }
        }
        .time{
            font-size: .24rem;
            font-family: PingFang SC;
            line-height: .33rem;
            color: #bbb;
            margin-bottom: .05rem;
        }
        .gift{
            font-size: .32rem;
            font-family: PingFang SC;
            color: #333;
            vertical-align: middle;
            white-space: pre;
            font-size: 0;
            img{
                display: inline-block;
                // vertical-align: middle;
            }
            span{
                font-size: .32rem;
                height: .4rem;
                line-height: .4rem;
            }
            .txt{
                float: left;
                color: #333;
            }
            .gift_img{
                width: .4rem;
                height: .4rem;
                float: left;
                margin: 0 .1rem;
            }
            .gift_avatar{
                width: .4rem;
                height: .4rem;
                border-radius: 50%;
                float: left;
                margin: 0 .1rem;
            }
            .gift_name{
                color: #7A68F8;       
                float: left;
            }
            .gift_nick{
                white-space: break-spaces;
                word-break: break-all;
                font-size: .32rem;
                font-family: PingFang SC;
                line-height: .46rem;
                color: #7A68F8;
            }
        }
    }
}
</style>
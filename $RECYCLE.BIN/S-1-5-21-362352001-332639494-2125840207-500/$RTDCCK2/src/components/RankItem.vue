<template>
    <div class="rankItem_box">
        <div class="rankItem" @click="goApp(info)" :class="{top:info.rank<=3, top1:info.rank==1, top2:info.rank==2, top3:info.rank==3, }">
            <span class="rank">{{info.rank}}</span>
            <span class="avatar">
                <img :src="getAvatar(info.avatar)" class="img" :class="{'img_top':info.rank<=3}">
            </span>
            <span class="nick">
                <strong>{{info.nick}}</strong>
            </span>
            <span class="score">
                <em>積分：</em><i>{{info.score}}</i>
            </span>
        </div>
    </div>
</template>

<script>
import mixin from '../utils/mixin';
// import Avatar from './Avatar';
// import zodiac from '../config/zodiac';

export default {
    mixins: [mixin],
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
            return url?url:require('../img/default.png');
        },
        goApp(obj){
            if(obj.is_live){
                //进入房间
                location.href = "rid:"+obj.is_live;
            }else{
                location.href = "uid:"+obj.uid;
            }
        },
    },
}
</script>

<style lang="scss">
.rankItem {
    width: 7.21rem;
    height: 1.23rem;
    margin: 0 auto .1rem;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    .rank, .avatar, .nick, .score, .star {
        display: inline-block;
        vertical-align: middle;
    }
    .rank {
        width: .96rem;
        height: 1.23rem;
        line-height: 1.23rem;
        text-align: center;
        color: #fff;
        font-size: .36rem;
        padding-left: .1rem;
        font-family: Arial, sans-serif;
    }
    .avatar{
        position: relative;
        width: 1.11rem;
        height: 1.25rem;
        .warriors{
            width: 1.11rem;
            height: 1.25rem;
            position: relative;
            z-index: 1;
            display: block;
            position: absolute;
            top: -.1rem;
        }
        .warriors_other{
            width: 1.09rem;
            height: 1.09rem;
            position: absolute;
            top: .07rem;
        }
        .img{
            width: .95rem;
            height: .95rem;
            border-radius: 50%;
            position: absolute;
            top: .14rem;
            left: 50%;
            margin-left: -.495rem;
        }
    }
    &.top {
        .rank {
            text-indent: -1000rem;
            position: relative;
            &:after {
                content: "";
                display: inline-block;
                width: .76rem;
                height: .65rem;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
                position: absolute;
                left: .18rem;
                top: .35rem;
            }
        }
        // &.top1 {
        //     background-image: url("../img/bg_top1.png");
        //     .rank:after {
        //         background-image: url("../img/top1.png");
        //     }
        // }
        // &.top2 {
        //     background-image: url("../img/bg_top1.png");
        //     .rank:after {
        //         background-image: url("../img/top2.png");
        //     }
        // }
        // &.top3 {
        //     background-image: url("../img/bg_top1.png");
        //     .rank:after {
        //         background-image: url("../img/top3.png");
        //     }
        // }
    }
    .nick {
        padding-left: .15rem;
        margin-right: .2rem;
        width: 2.5rem;
        strong{
            display: block;
        }
        strong:nth-of-type(1){
            max-width: 2.5rem;
            color: #fff;
            font-size: .3rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        strong:nth-of-type(2){
            i{
                color: #fff;
                font-size: .24rem;
                display: inline-block;
                vertical-align: middle;
                margin-right: .1rem;
            }
            img{
                display: inline-block;
                vertical-align: middle;
                width: .96rem;
                height: .23rem;
            }
        }
    }
    .score {
        em{
            color: #fff;
            font-size: .22rem;
        }
        i{
            font-size: .3rem;
            color: #fff;
        }
    }
}
.rank_tips{
    font-size: .22rem;
    color: #FFE5A0;
    text-align: right;
    padding: 0rem 0.6rem 0.17rem 0;
}
</style>
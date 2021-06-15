<template>
    <div class="notice" v-if="nocite">
        <div class="outer-box">
        <div class="inner-box1">
          <p v-for="(item,index) in nocite" :key="index" v-html="lang.notice.replace('%myNick',item.send_user_nick).replace('%toNick',item.to_user_nick).replace('%name',item.gift_name)">
          </p>
        </div>
        <!--注意inner-box1和inner-box2的数据必须一样，并且样式也得一样
        inner-box2包裹的顶部要注意和inner-box1的底部的距离应和其包裹的
        每两个div之间的距离一样否则会出现卡顿的效果-->
        <div class="inner-box2">
             <p v-for="(item,index) in nocite" :key="index" v-html="lang.notice.replace('%myNick',item.send_user_nick).replace('%toNick',item.to_user_nick).replace('%name',item.gift_name)">
          </p>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data(){
        return{
            list:[
                {
                    'uid':'111',
                    'name':'200金豆',
                },
                {
                    'uid':'222',
                    'name':'150金币',
                },
                {
                    'uid':'333',
                    'name':'满100返10',
                },
                {
                    'uid':'444',
                    'name':'10天vip',
                },
            ]
        }
    },
    computed: {
        ...mapState(['nocite']),
    },
    mounted(){
        let outerBox = document.getElementsByClassName("outer-box")[0]
        let innerBox1 = document.getElementsByClassName("inner-box1")[0]
        setInterval(()=>{
            this.scrollFunc(outerBox,innerBox1)
        },30)
    },
    methods: {
        scrollFunc(outerBox,innerBox){
            if(outerBox.scrollLeft>=innerBox.offsetWidth){
                outerBox.scrollLeft=0
            }else {
                outerBox.scrollLeft++
            }
        }
    //     scrollFunc(outerBox,innerBox){
    //     if(outerBox.scrollLeft>0){
    //         outerBox.scrollLeft--
    //         console.log(outerBox.scrollTop);
    //       }else {
    //         outerBox.scrollLeft=innerBox.offsetWidth
    //       }
    //   }
    },
}
</script>

<style lang="scss">
.notice {
    position: relative;
    margin: 0rem auto;
    width: 7.5rem;
    height: .4rem;
    // background: url('../img/notice_bg.png') no-repeat;
    background-size: 7.5rem .4rem;
    display: flex;
    align-items: center;
    padding: 0 .12rem;
    box-sizing: border-box;
    &.notices{
        top: 3.31rem;
    }
    .outer-box{
        text-align: center;
        width: 6rem;
        margin: 0 auto;
        height: .4rem;
        line-height: .4rem;
        overflow: hidden; /* 这个属性很重要一定要设置*/
        display: flex;
        flex-flow: row nowrap;
    }
    .inner-box1,.inner-box2{
        display: flex;
        flex-flow: row nowrap;
        white-space: nowrap;
        p{
            font-size: .22rem;
            margin-right: .5rem;
            color:rgba(255,255,255,.8);
            span{
                font-size: .22rem;
                color:rgba(255,255,255,.8);
                line-height: .32rem;
            }
        }
    }
}
</style>

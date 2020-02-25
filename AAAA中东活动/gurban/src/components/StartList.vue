<template>
    <div class="startLit">
        <div class="top">
            <div v-if="top.length <=2">
            </div>
            <div :class="'top'+item.rank" v-for="(item,index) in top" @click="goUser(item.uid)">
                <img :src="require('../assets/img/top'+item.rank+'.png')" alt="" class="bgImg">
                <img  v-lazy="item.avatar" alt="" class="userImg">
                <p class="name">{{item.nick}}</p>
                <p class="id">{{item.uid}}:UID</p>
                <p class="score">{{item.score}} <em></em></p>
            </div>
        </div>
        <div class="bottom">
            <ul>
                <li v-for="item in bottom" @click="goUser(item.uid)"> 
                    <div class="start">
                        <em></em>
                        <span>{{item.score}}</span>
                    </div>
                    <div class="userMsg">
                        <p class="name">
                            {{item.nick}}
                        </p>
                        <p class="id">
                            {{item.uid}}:UID
                        </p>
                    </div>
                    <img  v-lazy="item.avatar" alt="">
                    <span class="rank">{{item.rank<10?'0'+item.rank:item.rank}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    computed:{
        ...mapState(['userRank']),
        top(){
            if(this.userRank.length >0){
                var arr = []
                if(this.userRank.length == 1){
                    arr = this.userRank
                }else if(this.userRank.length == 2){
                    arr.push(this.userRank[0])
                    arr.push(this.userRank[1])
                }else if(this.userRank.length >= 3){
                    arr.push(this.userRank[2])
                    arr.push(this.userRank[0])
                    arr.push(this.userRank[1])
                }
                return arr 
            }else{
                return []
            }
        },
        bottom(){
            if(this.userRank.length >3){
                return this.userRank.slice(3)
            }else{
                return []
            }
        },
    },
    watch:{
    },
    methods:{
        goUser(val){ //跳转用户页
            location.href= `uid:${val}`
        }
    }
}
</script>

<style lang="scss">
    .top{
        width: 5.26rem;
        margin: 0 auto;
        height: 3rem;
        padding: 0 1.12rem;
        div{
            width: 33%;
            height: 100%;
            float: left;
            position: relative;
            .bgImg{
                width: 0.94rem;
                height: 1.09rem;
                position: relative;
                margin-left: .4rem;
                z-index: 10;
            }
            .userImg{
                width: 0.74rem;
                height: 0.74rem;
                position: absolute;
                top:.15rem;
                left: .5rem;
            }
        }
        .name{
                max-width: 1.53rem;
                height: .3rem;
                overflow: hidden;
                text-overflow:ellipsis;/* 超出部分显示省略号 */
                white-space: nowrap;
                font-size:85%;
                direction: rtl;
                margin: 0 auto;
                text-align: center;
            }
            .id{
                max-width: 1.43rem;
                height: .3rem;
                font-size: 80%;
                text-align: center;
                margin: 0 auto;
                color:#E6FFBF;
            }
            .score{
                color:#FFF496;
                text-align: center;
                font-size: 80%;
                line-height: .1rem;
                display: flex;
                align-items: center;
                justify-content:center;
                >em{
                    display: inline-block;
                    width: .35rem;
                    height: .33rem;
                    background: url(../assets/img/toastStart.png) no-repeat;
                    background-size: contain;
                    font-size: 80%;
                    margin-left: .1rem;
                }
            }
        .top3{
            margin-top: .7rem;
        }
        .top2{
            margin-top: .7rem;
        }
    }
    .bottom{
        padding:0 .3rem ;
        li{
            width: 6.9rem;
            height: .97rem;
            background: url(../assets/img/listBg.png) no-repeat;
            background-size: 100% 100%;
            margin-top: .2rem;
            display: flex;
            align-items: center;
            // padding-left: .68rem;
            .start{
                width: 1.9rem;
                line-height: .97rem;
                color:#FFF496;
                direction: rtl;
                span{
                    float: right;
                }
                em{
                    float: right;
                    display: inline-block;
                    width: .35rem;
                    height: .33rem;
                    background: url(../assets/img/toastStart.png) no-repeat;
                    background-size: contain;
                    margin: .3rem 0 0 .2rem;
                }
            }
            .userMsg{
                width: 1.8rem;
                margin-left: .92rem;
                .name{
                    max-width: 1.7rem;
                    height: 50%;
                    font-size: 85%;
                    overflow: hidden;
                    text-overflow:ellipsis;/* 超出部分显示省略号 */
                    white-space: nowrap;
                    direction: rtl;
                    line-height: .46rem;
                    margin: 0 auto;
                    text-align: right;
                }
                .id{
                    font-size: 80%;
                    height: 50%;
                    line-height: .46rem;
                    color:#E6FFBF;
                    text-align: right;
                }
            }
            .rank{
                width: .5rem;
                height: .5rem;
                margin-left: .56rem;
                text-align: center;
                line-height: .5rem;
                color:#36F4B3;
            }
            >img{
                width: 0.74rem;
                height: 0.74rem;
                margin-left: .28rem;
            }
        }
    }
</style>

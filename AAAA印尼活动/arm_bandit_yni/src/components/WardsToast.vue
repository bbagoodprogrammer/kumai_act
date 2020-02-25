<template>
    <div class="wardstoast">
        <span class="title">Catatan undian</span>
        <div class="wardlist">
            <div class="wardContent" ref="wardContent">
                <p class="noMsg" v-if="historyList.length == 0">Saat ini belum ada info undian</p>
                <ul ref="wardList">
                    <li v-for="(item,index) in historyList">
                        <span><img :src="require('../assets/img/'+wardsImgList[item.prize1]+'.png')"></span>
                        <span><img :src="require('../assets/img/'+wardsImgList[item.prize2]+'.png')"></span>
                        <span><img :src="require('../assets/img/'+wardsImgList[item.prize3]+'.png')"></span>
                        <div class="msgBox">
                            <div class="coinsL">{{item.coins}}koin harimau/kali</div>
                            <list-time :item = item.addtime></list-time>
                        </div>
                    </li>
                </ul>
            </div>
            <a href="" class="close" @click.prevent="closeToast()"></a>
        </div>
    </div>
</template>

<script>
import wardsImg from "../config/wardsImg.js"
import ListTime from "../components/ListTime.vue"
export default {
    props:['historyList'],
    data(){
        return{
            wardsImgList:wardsImg
        }
    },
    methods:{
        closeToast(){
            this.$emit('closeWordToast')
        }
    },
    components:{
        ListTime
    }
}
</script>

<style lang="scss" scoped>
    .wardstoast{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #2B0057;
        z-index: 999;
        .title{
            position: absolute;
            top: 1.97rem;
            left: 2.8rem;
            z-index: 999;
        }
        .wardlist{
            margin:0 auto;
            width: 7.5rem;
            height: 9.16rem;
            background: url("../assets/img/taostBg.png");
            background-size: 100% 100%;
            position: relative;
            .close{
                display:block;
                width: .71rem;
                height: .71rem;
                bottom: -1rem;
                position: absolute;
                background: url(../assets/img/close.png);
                background-size: 100% 100%;
                left:3.3rem;
            }
            .wardContent{
                position: absolute;
                width: 5.2rem;
                height: 5.3rem;
                top:3rem;
                left:1.2rem;
                overflow-y: scroll;
                -webkit-overflow-scrolling:touch;
                .noMsg{
                    text-align: center;
                    margin-top: .5rem;
                }
                li{
                    height: 1rem;
                    display: flex;
                    align-items: center;
                    span{
                        display: inline-block;
                        width: .9rem;
                        height: 0.9rem;
                        background-color: #CC00FF;
                        border-radius:.2rem;
                        text-align: center;
                        margin-left: .2rem;
                        >img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .msgBox{
                        flex:1;
                        height: 100%;
                        margin-left: .2rem;
                        div{
                            height: 50%;
                           
                            font-size: 80%;
                        }
                        .coinsL{
                            color:#5DFFE2;
                            // line-height: .45rem;
                        }
                        .time{
                             line-height: .55rem;
                        }
                    }
                }
            }
        }
    }
</style>

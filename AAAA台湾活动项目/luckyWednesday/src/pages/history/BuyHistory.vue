<template>
    <div class="historyList">
        <div class="historyCont">
            <div class="cumulativeBuy">
                <div class="cumulativeTitle">
                    累計購買
                </div>
                <ul class="cumulativeList">
                    <li v-for="(val,key,index) in wardsList.count" :key = index>
                        <!-- {{creatlistName(key,val)}} -->
                        累計購買{{historyList[key].name}}{{historyList[key].type}}背包禮物({{historyList[key].price}}金幣) : {{val}}
                    </li>
                </ul>
                <div v-if="wardsList.count === null" class="noBuyMsg">暫無購買信息</div>
            </div>
            <div class="list">
                <div class="listTitle">
                    購買明細
                </div>
                <div class="listBox">
                    <div class="listType">
                        <span>購買時間</span>
                        <span>購買明細</span>
                    </div>
                    <ul class="tList">
                        <li v-for="(item,key,index) in wardsList.list" :key = index>
                            <time-box :time="item.time"></time-box>
                            <div class="msg">
                                <!-- {{creatlistName(item.id)}} -->
                                {{historyList[item.id].name}}{{historyList[item.id].type}}背包禮物({{historyList[item.id].price}}金幣) * 1
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <loading></loading>
    </div>
</template>

<script>
// import {mapState} from "vuex"
import TimeBox from "../../components/Time"
import api from "../../api/apiConfig.js"
import Loading from "../../components/Loading"
export default {
    components:{TimeBox,Loading},
    data(){
        return{
            historyList:{},  //禮物ID數據
            wardsList:{}    //已買禮物數據
        }
    },
    computed:{
        // ...mapState(["historyList","wardsList"])
    },
    created(){
        api.bugHistory().then((res) =>{
            this.historyList = res.data.response_data.gifts
            this.wardsList = res.data.response_data
            for(var item in this.historyList){  //轉換禮物類型
                if(this.historyList[item].type == 1){
                    this.historyList[item].type = '作品'
                }else if(this.historyList[item].type == 2){
                    this.historyList[item].type = 'K房'
                }
            }
        })
    },
    methods:{
        creatlistName(id){
            for(var item in this.historyList){
                if(id == this.historyList[item].id){
                    return `${this.historyList[item].name}${this.historyList[item].type}背包禮物(${this.historyList[item].price}金幣) * 1`
                }
            }
        }
    }
}
</script>

<style lang="scss">
    body{
        background: #56157E;
    }
    .historyList{
        .historyCont{
            padding: .7rem 0 2rem 0;
            max-width: 7.5rem;
            position: relative;
            margin: auto;
        }
        .cumulativeBuy{
            .noBuyMsg{
                text-align: center;
            }
            .cumulativeTitle{
                text-align: center;
                width: 4.99rem;
                height: .64rem;
                background:linear-gradient(-3deg,rgba(95,28,138,1),rgba(112,31,163,1));
                box-shadow:0px 0px 50px 0px rgba(72,16,107,0.3);
                border-radius: .32rem;
                margin: 0 auto 0;
                line-height: .55rem;
                color:#FFF2DF;
                font-size: 120%;
            }
            .cumulativeList{
                padding:.5rem .32rem 0 .8rem;
                color:#EEEEEE;
                li{
                    font-size: 85%;
                    color:#EEEEEE;
                    text-align-last: left;
                    margin-bottom: .6rem;
                    // line-height: 1rem;
                }
            }
        }
        .list{
            margin-top: .6rem;
            padding: 0 .8rem;
            .listTitle{
                text-align: center;
                width: 4.99rem;
                height: .64rem;
                background:linear-gradient(-3deg,rgba(95,28,138,1),rgba(112,31,163,1));
                box-shadow:0px 0px 50px 0px rgba(72,16,107,0.3);
                border-radius: .32rem;
                margin:  0 auto 0;
                line-height: .55rem;
                color:#FFF2DF;
                font-size: 120%;
            }
            .listBox{
                margin-top: .26rem auto;
                background: #5F1C8A;
                .listType{
                    width: 5.9rem;
                    height: .8rem;
                    margin: .26rem auto 0;
                    border-radius:.2rem;
                    span{
                        display: inline-block;
                        width: 49.1%;
                        text-align: center;
                        line-height: .8rem;
                    }
                }
            }
            .tList::-webkit-scrollbar {display:none}
            .tList{
                // height: 8rem;
                // overflow: scroll;
                padding-bottom: .5rem;
                li:first-child{
                    margin-top: .1rem;
                }
                li{
                    font-size: 80%;
                    color:#B294C4;
                    display: flex;
                    margin-top: .2rem;
                    div{
                        display: inline-block;
                        width: 50%;
                        text-align: center;
                    }
                    .msg{
                        text-align: left;
                        padding-right: .2rem;
                        em{
                            font-size: 80%;
                        }
                    }
                }
            }
        }
    }
@import "../../assets/scss/common.scss";
</style>

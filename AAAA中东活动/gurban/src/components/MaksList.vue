<template>
    <div class="makeList">
        <div class="listCon">
            <p v-if="redState == 1" class="listTile">قد استلام {{countedList.total_red_rnvelope}}/{{surplus}} مظروف أحمر، و{{countedList.total_coins}}/{{countedList.divide_coins}} عملة ذهبية</p>
            <p v-else>{{countedList.total_red_rnvelope}} مظروف أحمر، استيلاء عليها في <span>{{countedList.tm}}</span> ثوان</p>
            <ul class="listBox">
                <li v-for="item in countedList.open_record"> 
                    <div class="nameBox">عملة ذهبية {{item.coins}}</div>
                    <div class="luck">
                        <div v-if="item.is_lucky === 1">
                            <span></span> أفضل الحظ 
                        </div>
                    </div>
                    <div class="msgBox">
                        <div class="name">
                            {{item.nick}}
                        </div>
                        <div class="time">
                            {{item.tm}}
                        </div>
                    </div>
                </li>
            </ul>
            <span class="back" @click="back()">العودة</span>
            <a href="" class="cloas" @click.prevent="cloas()"></a>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    data(){
        return{
        }
    },
    watch:{
    },
    computed:{
        ...mapState(["countedList"]),
        redState(){
            if(this.countedList.divide_red_rnvelope === 0){ //剩余0个红包
                return 0
            }else if(this.countedList.divide_red_rnvelope > 0){ //未发完
                return 1
            }
        },
        surplus(){ //已领取
            return this.countedList.total_red_rnvelope*1 - this.countedList.divide_red_rnvelope*1
        }
    },
    methods:{
        back(){
            this.$emit('cloasList')
        },
        cloas(){
            this.$emit('cloasList')
        }
    }
}
</script>

<style lang="scss">
    .makeList{
        position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background: RGB(0,0,0,.8);
        direction: rtl;
        .listCon{
            width: 6rem;;
            height: 6.88rem;
            padding: .43rem .62rem 0;
            position: absolute;
            background: url(../assets/img/listBig.png) no-repeat;
            background-size: contain;
            top:2rem;
            left: .09rem;
            p{
                font-size: 80%;
                color:#FFF562;
                font-weight: bold;
                text-align: center;
            }
            .back{
                display: block;
                width: 2.83rem;
                height: .92rem;
                background: url(../assets/img/defaluteTos.png) no-repeat;
                background-size: contain;
                color:#B98300;
                text-align: center;
                line-height: .8rem;
                margin:.1rem 1.5rem 0 0;
            }
            .listBox{
                margin-top: .2rem;
                height: 5rem;
                overflow:hidden;
                overflow-y: scroll;
                -webkit-overflow-scrolling:touch;
                
                li{
                    height: 1rem;
                    border-bottom: .01rem solid #1E8A65;
                    display: flex;
                    align-items: center;
                    .nameBox{
                        width: 1.76rem;
                        height: 100%;
                        white-space:nowrap;
                        color:#FFF562;
                        font-size: 80%;
                        line-height: 1rem;
                        font-weight: bold;
                    }
                    .luck{
                        width: 2.2rem;
                        height: 100%;
                        line-height: 1rem;
                        text-align: center;
                        color:#00FFD2;
                        span{
                            display: inline-block;
                            width: 0.4rem;
                            height: .29rem;
                            background: url(../assets/img/luck.png) no-repeat;
                            background-size: contain;
                        }
                    }
                    .msgBox{
                        flex:1;
                        height: 1rem;
                        .name{
                            max-width: 2.02rem;
                            overflow: hidden;
                            height: .5rem;
                            overflow: hidden;
                            text-overflow:ellipsis;/* 超出部分显示省略号 */
                            white-space: nowrap;
                            line-height: .5rem;
                        }
                        .time{
                            direction: ltr;
                            font-size: 80%;
                            color:#E6FFBF;
                        }
                    }
                }
            }
            .listBox::-webkit-scrollbar {
                display: none;
            }
        }
        .cloas{
            display: block;
            width: .71rem;
            height: 0.71rem;
            background: url(../assets/img/cloas.png) no-repeat;
            background-size: contain;
            position: absolute;
            bottom:-1.4rem;
            left: 3.2rem;
        }
    }
    
</style>

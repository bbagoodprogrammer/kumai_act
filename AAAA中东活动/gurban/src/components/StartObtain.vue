<template>
    <div class="startObtain">
        <div class="giveWards">
            <p>إهداء هدية الضائن في غرفة الغناء أو لأعمال الآخرين</p>
            <div class="mutton">
                <img src="../assets/img/wmutton.png" alt="" class="wmutton">
                <em> x 2</em>
                <span class="start"></span>
                <img src="../assets/img/bmutton.png" alt="" class="mmutton">
                <em> x 2</em>
                <span class="start"></span>
            </div>
        </div>
        <div class="vip">
            <p class="vipMsg clearfix">شراء VIP لشهر واحد - 388 عملة ذهبية<del>(777 عملة ذهبية)</del></p>
            <p>لا يمكنك أن تحصل على هذه الجائزة والنجوم إلا تشتري VIP عبر هذا الإعلان</p>
            <div class="buyBut">
                <span class="buy" @click="buyVip()"></span>
                <span class="startBox"> x 194<span class="start"></span></span>
            </div>
        </div>
        <div class="Receive">
            <span class="title">No.3</span>
            <div class="ReceiveCon">
                <div class=msg>العد التنازلي لاستلام</div>
                <div class="time">
                    {{downTime.minute}}:{{downTime.second}}
                </div>
                <div :class="{active:!sureState}" @click="Receive()" class="ReceiveBtm"></div>
                <!-- <button >领取</button> -->
            </div>  
        </div>
        <div class="confirmBuy" v-show="showConfirm">
            <div class="confirmContent">
                <div class="buy" v-show="showBuy">
                    <p>هل أنت متأكد من شراء VIP لشهر واحد</br>سوف تحصل على 194 نجمة</p>
                    <span class="surebuy" @click="confirmBuy()">تحديد من الشراء</span>
                    <a href="" @click.prevent="closefirm()" class="cloasBuy"></a>
                </div>
                <div class="nobuy" v-show="noshowBuy">
                    <p>فشل في الشراء</br>رصيدك لعملات ذهبية يقل من 388 عملة ذهبية</p>
                    <span class="recharge" @click="recharge()">اذهب إلى الشحن</span>
                    <a href="" @click.prevent="closefirm()" class="cloasBuy"></a>
                </div>
            </div>
        </div>
        <div class="joinPup" v-show="showJion">
            <div class="joinPupCon">
                <p>يمكنك استلامها بعد تسجيلك</p>
                <span class="zhidao" @click="cloasJoin()">عرفت</span>
            </div>
        </div>
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </div>

</template>

<script>
import downTime from "../utils/downTime.js"
import api from "../api/apiConfig.js"
import MsgToast from "./commonToast"
import {mapState} from "vuex"
import APP from "../utils/openApp.js"
export default {
    components:{MsgToast},
    data(){
        return{
            downTime:{minute:'00',second:'00'},
            timer:null,
            showConfirm:false, //confirm弹窗
            showBuy:false,
            noshowBuy:false,
            tastMsg:'',  //提示信息
            showT:false,
            showJion:false //领取前先提示  
        }
    },
    computed:{
        ...mapState(["second","activite","userState","isShare","userMsg","userRank"]),
        sureState(){
            if(this.second === 0){ //可以领取
                return true
            }else if (this.second > 0 && this.activite === 1){ //不可领取倒计时开始
                this.downTimeGo(this.second)
                return false
            }
        }
    },
    created(){
             
    },
    watch:{
        userMsg(val){
        }
    },
    methods:{
        downTimeGo(val){
            downTime('time2', val);
            this.timer = setInterval(() => {
                this.downTime = downTime('time2');
                if(this.downTime.end){
                    clearInterval(this.timer)
                    this.$store.commit('changeSecond',0)  //倒计时结束可以领取星星
                }
            }, 1000);
        },
        Receive(){
            if(this.isShare){
                APP()
                return
            }
            if(this.sureState && this.activite == 1){ //如果可领取后重置时间,请求接口领取星值后重置时间
                if(this.userState === 1){ //已报名
                    api.getStart().then(()=>{
                        this.$store.commit('changeSecond',600)  //设置样式变灰
                        this.$store.getters.addscore  //底部个人信息星星数加一
                        if(this.userMsg.rank <20){   //排行榜星星加一
                            var rank = this.userMsg.rank
                            this.$store.commit("addListStare",--rank)
                        }
                        //请求领取接口后重新设置十分钟时间
                        downTime('time2', 600);
                        this.downTime = downTime('time2');
                        this.timer = setInterval(() => {
                            this.downTime = downTime('time2');
                            if(this.downTime.end){
                                clearInterval(this.timer)
                                this.$store.commit('changeSecond',0)  //倒计时结束可以领取星星
                            }
                        }, 1000);
                    })
                }else if(this.userState === 0){//未报名提示请先报名否则不可领取
                    this.showJion = true
                }
            }else if(this.activite == 0){ //活动未开始
                this.tastMsg = 'لم يبدأ النشاط'
                this.showT = true
            }else if(this.activite == 2){
                this.tastMsg = 'قد انتهى النشاط'
                this.showT = true
            } 
        },
        buyVip(){ //购买Vip
            if(this.isShare){
                APP()
                return
            }
            if(this.activite == 1){
                if(this.userState === 1){ //报名
                    api.VIPyue().then((res)=>{
                        if(res.data.response_status.code === 0){
                            if(res.data.response_data.balance === 0){ // 余额不足
                                this.showConfirm = true
                                this.noshowBuy = true
                            }else if (res.data.response_data.balance === 1){ //余额足够
                                this.showConfirm = true
                                this.showBuy = true
                            }
                        }
                    })
                }else if(this.userState === 0){//未报名提示请先报名否则不可领取
                    this.showJion = true
                }
            }else if(this.activite == 0){ //活动未开始
                this.tastMsg = 'لم يبدأ النشاط'
                this.showT = true
            }else if(this.activite == 2){
                this.tastMsg = 'قد انتهى النشاط'
                this.showT = true
            } 
        },
        confirmBuy(){ //购买Vip请求
            if(this.activite ===1){
                api.openVIP().then((res)=>{
                    if(res.data.response_data.status === 1 ){//开通成功
                        this.$store.getters.addscoreVip  //底部个人信息星星数加194
                         if(this.userMsg.rank <20){   //排行榜星星加194
                            var rank = this.userMsg.rank
                            this.$store.commit("addVipStart",--rank)
                        }
                        this.closefirm()
                    }else{
                        this.closefirm()
                    }
                })
            }
        },
        closefirm(){ //关闭confirm弹窗
            this.showConfirm = false
            this.showBuy = false
            this.noshowBuy = false
        },
        recharge(){ //跳转充值页面
            location.href="walletConfig://"
        },
        closeToast(){
            this.showT = false
        },
        cloasJoin(){ //关闭先报名提示
            this.showJion = false
        }
    }
}
</script>

<style lang="scss">
    .startObtain{
        .giveWards{
            width: 6.9rem;
            margin: .2rem auto 0;
            background: url(../assets/img/No.1.png) no-repeat;
            background-size: 100% 100%;
            color:#9BFFEC;
            padding: .18rem 0 .1rem 0;
            p{
                width: 5.8rem;
                font-size: 80%;
                direction: rtl;
            }
            .mutton{
                width: 4rem;
                height:.7rem;
                margin:.1rem 0 0  1.81rem;
                display: flex;
                align-items: center;
                .wmutton{
                    width: .65rem;
                    height: .66rem;
                }
                .start{
                    display: inline-block;
                    width: .35rem;
                    height: .33rem;
                    background: url(../assets/img/toastStart.png) no-repeat;
                    background-size: contain;
                    margin-left: .2rem;
                }
                em{
                    margin-left: .2rem;
                    color:#FFF496;
                }
                .mmutton{
                    width: .61rem;
                    height: .68rem;
                    margin-left: .2rem;
                }
            }
        }
        .vip{
            width: 6.9rem;
            margin: .08rem auto;
            background: url(../assets/img/No.2.png);
            background-size: 100% 100%;
            padding-top: .08rem;
            >p{
                width: 5.8rem;
                font-size: 50%;
                color:#9BFFEC;
                direction: rtl;
                >span{
                    float: left;
                    direction: rtl;
                }
            }
            .buyBut{
                width: 5.6rem;
                height: 0.5rem;
                position: relative;
                text-align: right;
                color:#FFF496;
                .buy{
                    display: block;
                    width: 1.11rem;
                    height: .49rem;
                    background: url(../assets/img/buy.png) no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    left: .26rem;
                    top:-.06rem
                }
                .startBox{
                    vertical-align: middle;
                    .start{
                        display: inline-block;
                        width: .35rem;
                        height: .33rem;
                        background: url(../assets/img/toastStart.png) no-repeat;
                        background-size: contain;
                        margin-left: .2rem;
                        margin-top: .05rem;
                        float: right;
                    }
                }
            }
        }
        .Receive{
            width: 6.9rem;
            height: .92rem;
            background: url(../assets/img/No3.png) no-repeat;
            margin: 0 auto;
            background-size: 100% 100%;
            position: relative;
            .title{
                color:#FFED99;
                font-weight: bold;
                font-style:italic;
                position: absolute;
                right:.2rem;
                top:.3rem
            }
            .ReceiveCon{
                width: 5.8rem;
                height: .92rem;
                display: flex;
                align-items: center;
                direction: rtl;
                position: relative;
                .msg{
                    color:#9BFFEC;
                    font-size: 80%;
                    direction: rtl;
                }
                .time{
                    margin-right: .3rem;
                    color:#FFF496;
                    font-weight: bold;
                }
                .ReceiveBtm{
                    width: 1.11rem;
                    height: .49rem;
                    background: url(../assets/img/lingqu.png) no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    left: .24rem;
                    bottom: .22rem;
                }
                .active{
                    background: url(../assets/img/nolq.png) no-repeat;
                    background-size: contain;
                }
            }
        }
        .joinPup{
            position: fixed;
            left: 0;
            top:0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            background: RGB(0,0,0,.8);
            .joinPupCon{
                width: 7.16rem;
                height: 4.32rem;
                background: url(../assets/img/pupbg.png) no-repeat;
                background-size: contain;
                position: absolute;
                top:3rem;
                left: .15rem;
                z-index: 1001;
                direction: rtl;
                .zhidao{
                    display: block;
                    width: 2.83rem;
                    height: .92rem;
                    background: url(../assets/img/defaluteTos.png) no-repeat;
                    background-size: contain;
                    position: absolute;
                    top:2.84rem;
                    left: 2.08rem;
                    text-align: center;
                    line-height: .8rem;
                    color:#B98300;
                }
                p{
                    position: absolute;
                    top:1.34rem;
                    left: 1.81rem;
                }
            }
        }
    }
    .confirmBuy{
        position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background: RGB(0,0,0,.8);
        .confirmContent{
            width: 7.16rem;
            height: 4.32rem;
            background: url(../assets/img/pupbg.png) no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top:3rem;
            left: .15rem;
            z-index: 1001;
            .buy{
                direction: rtl;
                p{
                    margin: 1rem 0 0 .44rem;
                    text-align: center;
                    font-weight: bold;
                    padding-right: .2rem;
                }
                .surebuy{
                    display: block;
                    width: 2.83rem;
                    height: .92rem;
                    background: url(../assets/img/defaluteTos.png) no-repeat;
                    background-size: contain;
                    color:#B98300;
                    text-align: center;
                    font-weight: bold;
                    line-height: .8rem;
                    margin: 1rem 2.2rem 0 0;
                }
                .cloasBuy{
                    display: block;
                    width: .71rem;
                    height: 0.71rem;
                    background: url(../assets/img/cloas.png) no-repeat;
                    background-size: contain;
                    position: absolute;
                    bottom:-2.4rem;
                    left: 3.2rem;
                }
            }
            .nobuy{
                direction: rtl;
                p{
                    margin: 1rem 0 0 .44rem;
                    text-align: center;
                    font-weight: bold;
                    padding-right: .2rem;
                }
                .recharge{
                    display: block;
                    width: 2.83rem;
                    height: .92rem;
                    background: url(../assets/img/defaluteTos.png) no-repeat;
                    background-size: contain;
                    color:#B98300;
                    text-align: center;
                    font-weight: bold;
                    line-height: .8rem;
                    margin: 1rem 2.2rem 0 0;
                }
                .cloasBuy{
                    display: block;
                    width: .71rem;
                    height: 0.71rem;
                    background: url(../assets/img/cloas.png) no-repeat;
                    background-size: contain;
                    position: absolute;
                    bottom:-2.4rem;
                    left: 3.2rem;
                }
            }
        }
    }
    .clearfix:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }  
</style>

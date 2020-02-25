<template>
    <div class="divideUp">
        <div class="defalute">
            <img src="../assets/img/mutton.png" alt="">
            <div class="big">
                <span ref="bar" :style="{width:barWidth+ '%'}" class="bar">
                    <span class="start"><span class="nowStart">{{red_rnvelope.star_counts}}</span></span>
                </span>
                <p class="max">1000</p>
                <p class= "min">0</p>
                <span class="wardsBox"></span>
            </div>
            <p class="muttonMsg"></p>
            <span class="make" @click="make()" v-if="order === 0 || isShare">ضرب الموعد لاقتسام لحم الخروف</span>
            <span class="maked" v-if="order === 1"><strong>تنجح في ضرب الموعد!</strong></span>
        </div>
        <div class="Cut-down-countdownPup" v-if="showState === 1 && showcoven">
            <div class="Cut-down-cont">
                <div class="contBg">
                    <div class="lunbo" :style="{'background-position-Y':imgPos[imgindex]}"></div>
                    <!-- <img :src="require('../assets/img/lunbo1.png')" alt=""> -->
                    العد التنازلي لاقتسام لحم الخروف</br>سيبدأ بعد <span>{{surplusTime.seconds}}</span> ثانية!
                </div>
                <div class="shareFirend" @click="shareFriend()">
                    تذكير أصدقائك لاقتسام لحم الخروف
                </div>
                <div class="contMsg">
                    كلما تتراكم 1000 نجمة، يمكنك أن تشترك في اقتسام لحم الخروف.</br>
                    1000 عملة ذهبية لكل مرة، و100 شخص يستطيعون اكتساب هذه العملات فق
                </div>
                <span class="cloasCoun" @click="closeCoun()"></span>
            </div>
        </div>
        <div class="countdownPup" v-if="(showState === 2 || showState === 3) && showmutton">
            <div class="downPupCon">
                <span @click="carveup()"></span>
                <a class="cloasCoun" @click.prevent="closeCoun()"></a>
            </div>
        </div>
        <div class="getCoins" v-show="showGetConios">
            <div class="getCoincCont">
                <div class="getMsg">
                    <p class="msg">مبروك للحصول</p>
                    <div class="coins">
                        <span></span> x {{coins}}
                    </div>
                    <p class="goShare" @click="showList()">انظر تفاصيل الاستلام>></p>
                    <p class="nextMsg">أشخاص أكثر، ونجوم أكثر، تشارك هذا النشاط وتحصل على الجائزة الكبيرة مرة قادمة</p>
                    <!-- <span @click="showList()">瓜分记录</span>
                    <button @click="shareFriend()">分享活动</button> -->
                    <div class="btm">
                        <span class="again" @click="closeSgin()">مرة قادمة</span>
                        <span class="share" @click="shareFriend()"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="nogetCoins" v-show="nogetCoins">
            <div class="getCoincCont">
                <div class="getMsg">
                    <p class="msg">أنت بطيء، قد  تم الاقتسام</p>
                    <p class="goShare" @click="showList()">انظر تفاصيل الاستلام>></p>
                    <p class="nextMsg">أشخاص أكثر، ونجوم أكثر، تشارك هذا النشاط وتحصل على الجائزة الكبيرة مرة قادمة</p>
                    <div class="btm">
                        <span class="again" @click="closeSgin()">مرة قادمة</span>
                        <span class="share" @click="shareFriend()"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="makePup" v-show="showMakePup">
            <div class="makeCon">
                <p>تنجح في ضرب الموعد!</p>
                <span @click="shareFriend()">تذكير أصدقائك لضرب الموعد</span>
                <a href="" @click.prevent="cloesMake()" class="cloesMake"></a>
            </div>
        </div>
        <div class="errPup" v-if="errPup">
            <div class="errCont">
                <p>لا يمكن أن تقتسم بحسابات كثيرة</p>
                <span class="ok" @click="cloesErr()">عرفت</span>
            </div>
        </div>
        <make-list  v-if="showMakeList" @cloasList="cloasList()"></make-list>
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </div>
</template>

<script>
import {mapState} from "vuex"
import downTime from "../utils/downTime.js"
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig.js"
import MakeList from "../components/MaksList" //瓜分记录
import APP from "../utils/openApp.js" //打开APP
export default {
    components:{MakeList,MsgToast},
    data(){
        return{
            surplusTime:{},//到计时秒数
            showGetConios:false,
            nogetCoins:false,
            coins:20,  //瓜分到多少金币
            showMakeList:false, //显示记录
            showMakePup:false, //预约成功弹窗
            errPup:false, //不可用多个账号领取
            tastMsg:'',
            showT:false,
            imgindex:0,
            showcoven:false, //显示倒计时，用于点击关闭
            showmutton:false,
            timer:null,  //瓜分羊肉倒计时
            tmier2:null,  //图片轮播倒计时
            imgPos:[
                "-3.35rem","-5.08rem","-6.82rem",".1rem","-1.62rem","-17.19rem","-18.95rem","-15.47rem","-8.55rem","-10.27rem","-12rem","-13.76rem"
            ]
        }
    },
    computed:{
        ...mapState(["red_rnvelope","activite","order","isShare"]),
        showState(){
            if(this.red_rnvelope.status == 0 && this.activite == 1){ //红包未开奖
                return 0
            }else if(this.red_rnvelope.status === 1 && this.activite == 1 && this.red_rnvelope.coins ===0){ //开始倒计时
                this.downTimeGo(this.red_rnvelope.second)
                this.showcoven = true
                return 1
            }else if(this.red_rnvelope.status === 2 && this.red_rnvelope.coins ===0 && (this.activite == 1 || this.activite == 2) && this.red_rnvelope.none == 0){ //展示抽奖结束后的一分钟,用户未抽奖
                this.showmutton = true
                return 2
            }else if(this.red_rnvelope.status === 3 && this.red_rnvelope.coins ===0 && (this.activite == 1 || this.activite == 2) && this.red_rnvelope.none == 0){ //开奖进行中
                this.showmutton = true
                return 3
            }else if(this.red_rnvelope.coins > 0 && this.activite == 1){
                return 4
            }
        },
        barWidth(){
            return this.red_rnvelope.star_counts / 10
        }
    },
    destroyed(){
        clearInterval(this.tmier2)
    },
    watch:{
        showcoven(val){
            if(val){
                this.tmier2 = setInterval(() => {
                    this.imgindex++
                    if(this.imgindex === 12){
                        this.imgindex = 0
                    }
                }, 100);
            }else{
                clearInterval(this.tmier2)
            }
        }
    },
    methods:{
        downTimeGo(val){ //瓜分羊肉弹窗1倒计时
            downTime('time1', val);
            this.surplusTime = downTime('time1');
            this.timer = setInterval(() => {
                this.surplusTime = downTime('time1');
                if(this.surplusTime.end){
                    clearInterval(this.timer)
                    this.showmutton = true  //显示弹窗
                    this.red_rnvelope.status = 3 //开奖进行时
                    clearInterval(this.tmier2)
                }
            }, 1000);
        },
        make(){  //预约瓜分羊肉,调用接口,切换按钮
            if(this.isShare){
                APP()
                return
            }
            if(this.activite == 1){
                this.$store.commit('changeorder',1)
                api.maskMutton().then(()=>{
                    this.showMakePup = true
                })
            }else if (this.activite == 0){
                this.tastMsg = 'لم يبدأ النشاط'
                this.showT = true
            }else if (this.activite == 2){
                this.tastMsg = 'قد انتهى النشاط'
                this.showT = true
            }
        },
        carveup(){ //开始瓜分
            api.carveup().then((res)=>{
                if(res.data.response_status.code == 20010){  
                    //弹窗不可以多个ID领取羊肉
                    this.errPup = true
                }else if(res.data.response_status.code == 0){  //瓜分成功
                    //弹窗获得多少多少金币或已经瓜分完毕
                    if(res.data.response_data.coins === 0){ //抢不到
                        this.red_rnvelope.coins = 1 //已抽过转换状态
                        this.nogetCoins = true       //显示对应弹窗
                    }else if (res.data.response_data.coins > 0){  //抢到多少金币弹窗
                        this.red_rnvelope.coins = res.data.response_data.coins //已抽过转换状态
                        this.coins = res.data.response_data.coins
                        this.showGetConios = true
                    }
                }
            })
        },
        showList(){ //显示瓜分记录
            api.countList().then((res)=>{
                this.$store.commit('changecountedList',res.data.response_data)
                //显示弹窗
                this.showMakeList = true
            })
        },
        shareFriend(val){ //跳转默认分享
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isAndroid){
                javascript:JSInterface.share('http://activity.gosingapp.com/static_html/2019/gurban/index.html','تُعطَى العملات الذهبية، وتستلمها مجانا! اذهب إلى اقتسامها سريعا!','إهداء العملات الذهبية، واستلامها مجانا! أسرع إلى اقتسامها! ','http://activity.gosingapp.com/static_html/2019/gurban/mutton.png');
            }else{
                location.href = 'shareUserInfo://activity.gosingapp.com/static_html/2019/gurban/index.html&shareText=إهداء العملات الذهبية، واستلامها مجانا! أسرع إلى اقتسامها! &userImg=http://activity.gosingapp.com/static_html/2019/gurban/mutton.png&title=تُعطَى العملات الذهبية، وتستلمها مجانا! اذهب إلى اقتسامها سريعا!';
            }
        },
        closeCoun(){ //手动关闭两个宰羊的弹窗
            this.showcoven　= false
            this.showmutton = false
        },
        closeToast(){
            this.showT = false
        },
        closeSgin(){
            this.showGetConios = false
            this.nogetCoins = false
        },
        cloesMake(){
            this.showMakePup = false
        },
        cloesErr(){
            this.errPup = false
        },
        cloasList(){
            this.showMakeList = false
        }
    }

}
</script>

<style lang="scss">
.divideUp{
    .defalute{
        width: 7.24rem;
        height: 4.51rem;
        margin: 0 auto;
        background: url(../assets/img/cutmuttonBg.png);
        background-size: contain;
        position: relative;
        margin-top: .47rem;
        >img{
            width: 4.52rem;
            height: 2.51rem;
            margin:.04rem 0 0 1.47rem;
        }
        .big{
            vertical-align: middle;
            width: 4.51rem;
            height: 0.2rem;
            background-color: #A96842;
            border:2px solid rgba(255,244,150,1);
            border-radius: .08rem;
            margin-left: 1.37rem;
            position: relative;
            >span{
                position: absolute;
                right:0;
                height: .2rem;
                border-radius: .04rem;
                background:linear-gradient(90deg,rgba(235,59,8,1),rgba(255,144,0,1));
                .start{
                    display: inline-block;
                    width: .43rem;
                    height: .43rem;
                    background: url(../assets/img/muttonStart.png);
                    background-size: contain;
                    position: absolute;
                    left: -.2rem;
                    top: -.15rem;
                    .nowStart{
                        display: block;
                        width: .6rem;
                        height: .6rem;
                        background: url(../assets/img/rectangleTos.png) no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        top:-.6rem;
                        left: -.1rem;
                        font-size: 80%;
                        line-height: .4rem;
                        text-align: center;
                    }
                }
                
            }
            .max{
                position: absolute;
                left: -1rem;
                top:-.05rem;
                z-index: 10;
                font-size: 80%;
                color:#FFF496;
            }
            .min{
                position: absolute;
                right: -.5rem;
                top:-.05rem;
                font-size: 80%;
                color:#FFF496;
            }
            .wardsBox{
                width: 0.76rem;
                height: 0.72rem;
                background: url(../assets/img/wardsBox.png);
                background-size: contain;
                position: absolute;
                left: -.45rem;
                top:-.25rem;
            }
        }
        .muttonMsg{
            width: 6.34rem;
            height: .71rem;
            margin:.27rem auto;
            background: url(../assets/img/1000Msg.png);
            background-size: contain;
        }
        .make{
            width: 2.63rem;
            height: .82rem;
            background: url(../assets/img/defaluteTos.png);
            background-size: 100% 100%;
            position: absolute;
            bottom: -.3rem;
            left: 2.22rem;
            color:#B98300;
            text-align: center;
            padding: .1rem .1rem 0;
            font-size: 80%;
            font-weight: bold;
        }
        .maked{
            width: 2.43rem;
            height: .87rem;
            padding: .05rem .2rem 0;
            background: url(../assets/img/defaluteTos.png) no-repeat;
            background-size: contain;
            position: absolute;
            bottom: -.3rem;
            left: 2.22rem;
            color:#B98300;
            text-align: center;
            >strong{
                font-weight: 600;
            }
        }
    }
    .Cut-down-countdownPup{
        position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background: RGB(0,0,0,.8);
        .Cut-down-cont{
            width: 7.16rem;
            height: 5.6rem;
            background: url(../assets/img/muttonBg.png) no-repeat;
            background-size: contain;
            position: absolute;
            top:1.17rem;
            left: .15rem;
            z-index: 1001;
            .shareFirend{
                width: 2.63rem;
                height: .82rem;
                padding: .1rem .2rem 0 .1rem;
                background: url(../assets/img/defaluteTos.png) no-repeat;
                background-size: contain;
                position: absolute;
                top:4rem;
                left: 2rem;
                color:#B98300;
                font-size: 80%;
                text-align: center;
                line-height: .3rem;
                direction: rtl;
            }
            .contBg{
                width: 4.05rem;
                height: 1.1rem;
                padding-top: .1rem;
                background: url(../assets/img/count.png) no-repeat;
                background-size: contain;
                position: absolute;
                top:2.41rem;
                left: 1.37rem;
                z-index: 1002;
                font-size: 60%;
                text-align: center;
                direction: rtl;
                line-height: .5rem;
                // font-weight: 600;
                .lunbo{
                    width: 4.7rem; height: 1.71rem;
                    background: url('../assets/img/lunbo.png') -.01rem;
                    background-size: 100% auto;
                    position: absolute;
                    top:-.35rem;
                    left: -.35rem;
                }
                >span{
                    font-size: 140%;
                    font-weight: bold;
                    color:#FFF496;
                }
                >img{
                    width: 4.5rem;
                    height: 1.51rem;
                    position: absolute;
                    top:-.15rem;
                    left: -.27rem;
                }
            }
            .contMsg{
                font-size: 80%;
                position: absolute;
                bottom: -1.2rem;
                text-align: center;
                color:#FFF496;
                direction: rtl;
            }
            .cloasCoun{
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
    .countdownPup{
        position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background: RGB(0,0,0,.8);
        z-index: 1000;
        .downPupCon{
            width: 7.16rem;
            height: 5.6rem;
            background: url(../assets/img/coverCoumetn.png) no-repeat;
            background-size: contain;
            position: absolute;
            top: 1.17rem;
            left:.24rem ;
            span{
                display: block;
                width: 2.83rem;
                height: .92rem;
                background: url(../assets/img/guafen.png) no-repeat;
                background-size: contain;
                position: absolute;
                top:4rem;
                left:2rem;
            }
            .cloasCoun{
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
    }
    .getCoins{
        position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background: RGB(0,0,0,.8);
        .getCoincCont{
            width: 7.16rem;
            height: 6.08rem;
            background: url(../assets/img/coinsBg.png) no-repeat;
            background-size: contain;
            position: absolute;
            top: 2.1rem;
            left: .21rem;
            .getMsg{
                width: 7.16rem;
                height: 4rem;
                position: absolute;
                top: 2rem;
                .coins{
                    display: flex;
                    align-items: center;
                    justify-content:center;
                    font-size: 140%;
                    margin-top: .31rem;
                    span{
                        display: inline-block;
                        width: .55rem;
                        height: .62rem;
                        background: url(../assets/img/coins.png) no-repeat;
                        background-size: contain;
                    }
                }
                .msg{
                    direction: rtl;
                    text-align: center;
                    color:#00FFD2;
                    font-weight: bold;
                    font-size: 120%;
                }
                .goShare{
                    color:#FCE302;
                    direction: rtl;
                    font-size: 110%;
                    text-align: center;
                    font-weight: bold;
                    margin-top: .1rem;
                }
                .nextMsg{
                    margin-top: .1rem;
                    direction: rtl;
                    text-align: center;
                    padding:0 .2rem ;
                }
                .btm{
                    height: 0.92rem;
                    margin-top: .2rem ;
                    .again{
                        display: inline-block;
                        width: 2.83rem;
                        height: .92rem;
                        background: url(../assets/img/defaluteTos.png) no-repeat;
                        background-size: contain;
                        margin-left: .69rem;
                        color:#B98300;
                        font-weight: bold;
                        float: left;
                        text-align: center;
                        line-height: .88rem;
                        direction: rtl;
                    }
                    .share{
                        display: inline-block;
                        width: 2.83rem;
                        height: .92rem;
                        background: url(../assets/img/share.png) no-repeat;
                        background-size: contain;
                        margin-left: .19rem;
                    }
                }
            }
        }
    }
    .nogetCoins{
        position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background: RGB(0,0,0,.8);
        z-index: 1000;
        .getCoincCont{
            width: 7.16rem;
            height: 6.08rem;
            background: url(../assets/img/coinsBg.png) no-repeat;
            background-size: contain;
            position: absolute;
            top: 2.1rem;
            left: .21rem;
            .getMsg{
                width: 7.16rem;
                height: 4rem;
                position: absolute;
                top: 2rem;
                .nextMsg{
                    margin-top: .4rem;
                    direction: rtl;
                    text-align: center;
                    padding:0 .5rem ;
                }
                .msg{
                    direction: rtl;
                    text-align: center;
                    color:#00FFD2;
                    font-weight: bold;
                    font-size: 160%;
                }
                .goShare{
                    color:#FCE302;
                    direction: rtl;
                    font-size: 140%;
                    text-align: center;
                    font-weight: bold;
                    margin-top: .2rem;
                }
                .btm{
                    height: 0.92rem;
                    margin-top: .2rem ;
                    .again{
                        display: inline-block;
                        width: 2.83rem;
                        height: .92rem;
                        background: url(../assets/img/defaluteTos.png) no-repeat;
                        background-size: contain;
                        margin-left: .69rem;
                        color:#B98300;
                        font-weight: bold;
                        float: left;
                        text-align: center;
                        line-height: .88rem;
                        direction: rtl;
                    }
                    .share{
                        display: inline-block;
                        width: 2.83rem;
                        height: .92rem;
                        background: url(../assets/img/share.png) no-repeat;
                        background-size: contain;
                        margin-left: .19rem;
                    }
                }
            }
        }
    }
    .makePup{
       position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background: RGB(0,0,0,.8); 
        z-index: 1000;
        .makeCon{
            width: 7.1rem;
            height: 4.32rem;
            position: absolute;
            top:4rem;
            left: .16rem;
            background: url(../assets/img/pupbg.png) no-repeat;
            background-size: contain;
            direction: rtl;
            p{
                text-align: center;
                top:1.17rem;
                margin-top: 1.17rem;
            }
            span{
                display: inline-block;
                width: 2.63rem;
                height: .82rem;
                padding: .1rem .2rem 0 .1rem;
                background: url(../assets/img/defaluteTos.png) no-repeat;
                background-size: contain;
                margin: .7rem 2rem 0 0 ;
                color:#B98300;
                font-size: 80%;
                text-align: center;
                line-height: .3rem;
            }
        }
        .cloesMake{
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
    .errPup{
        position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background: RGB(0,0,0,.8); 
        z-index: 1000;
        .errCont{
            width: 7.1rem;
            height: 4.32rem;
            position: absolute;
            top:4rem;
            left: .16rem;
            background: url(../assets/img/pupbg.png) no-repeat;
            background-size: contain;
            p{
                text-align: center;
                direction: rtl;
                top:1.17rem;
                margin-top: 1.17rem;
            }
            span{
                display: inline-block;
                width: 2.63rem;
                height: .82rem;
                padding: .1rem .2rem 0 .1rem;
                background: url(../assets/img/defaluteTos.png) no-repeat;
                background-size: contain;
                margin: .7rem 0 0 2rem ;
                color:#B98300;
                font-size: 80%;
                text-align: center;
                line-height: .6rem;
            }
        }
    }
}

</style>

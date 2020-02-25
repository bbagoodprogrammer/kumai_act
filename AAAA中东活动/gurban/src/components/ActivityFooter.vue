<template>
    <div class="footer">
        <div v-if="showState === 0" class="noStart">لم يبدأ النشاط</div>
        <div v-if="showState === 1" class="noStart">قد انتهى النشاط</div>
        <div v-if="showState === 2">
            <span class="jion"  @click="singUp()"></span>
        </div>
        <div v-if="showState === 3" class="userMsgBox">
            <div class="start">
                <em></em>
                <span>{{userMsg.score}}</span>
            </div>
            <div class="userMsg">
                <p class="name">
                    {{userMsg.nick}}
                </p>
                <p class="id">
                    {{userMsg.uid}}:UID
                </p>
            </div>
            <img  v-lazy="userMsg.avatar" alt="">
            <span class="rank">{{userMsg.rank<10?'0'+userMsg.rank:userMsg.rank}}</span>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import api from '../api/apiConfig.js'
export default {
    computed:{
        ...mapState(["activite","userState","userMsg","userRank"]),
        showState(){
            if(this.activite === 0){ //未开始
                return 0
            }else if(this.activite === 2){ //已结束
                return 1
            }else if(this.activite ===1 && this.userState === 0){ //活动开始未报名
                return 2
            }else if(this.activite ===1 && this.userState === 1){ //活动开始已报名
                return 3
            }
        }
    },
    watch:{
    },
    methods:{
        singUp(){ //报名 
            api.singUP().then((res)=>{
                if(res.data.response_status.code === 0){ //报名成功
                    var newMsg = Object.assign({}, res.data.response_data.owner_msg)
                    // var newMsg = JSON.parse(JSON.stringify(res.data.response_data.owner_msg)) //更新底部个人信息
                    this.$store.commit("changeuserMsg", newMsg)
                    this.$store.commit("changeuserState",1) //切换状态,显示
                    if(this.userRank.length < 20){ //如果当前排行榜人数小于二十人，往后面添加当前用户个人信息
                        var newMsgtwo = JSON.parse(JSON.stringify(res.data.response_data.owner_msg))
                        this.$store.commit("addMymsg",newMsgtwo)
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .footer{
        height: 1.26rem;
        position: fixed;
        bottom: -.05rem;
        left: 0;
        right: 0;
        background: url(../assets/img/footer.png) no-repeat;
        background-size: 100% 100%;
        z-index: 999;
        direction: rtl;
        .noStart{
            font-size: 160%;
            text-align: center;
            line-height: 1.26rem;
        }
        .jion{
            display: block;
            width: 2.83rem;
            height: .92rem;
            background: url(../assets/img/joinUp.png) no-repeat;
            background-size: contain;
            margin:.14rem 2.34rem 0 0;
        }
        .userMsgBox{
            height: .9rem;
            margin-top: .2rem;
            display: flex;
            align-items: center;
            direction: ltr;
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
            }
            >img{
                width: 0.74rem;
                height: 0.74rem;
                margin-left: .28rem;
            }
        }
    }
</style>

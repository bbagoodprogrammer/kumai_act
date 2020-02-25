<template>
<div class="toastBox">
    <div class="promptBox">
        <p v-html="msg"></p>
        <div class="ok">
            <a href="javascript:;" v-if="colued === 1" @click="close()" class="noBuy">取消購買</a>
            <a href="javascript:;" v-if="colued === 1" @click="buyWard()" class="nowBuy">確定購買</a>
            <a href="javascript:;" v-else @click="close()">確定</a>
        </div>
        <a href="javascript:;" @click="close()" class="close"></a>
    </div>

</div>
    
</template>

<script>
export default {
    props:["msg","colued"],
    data(){
        return{
        }
    },
    methods:{
        close(){
           this.$emit('closeToast')
        },
        buyWard(){
            if(this.colued === 1){
                this.$emit('buyWard')
            }else{
                this.$emit('closeToast')
            }
        }
    }
}
</script>

<style lang="scss">
    .toastBox{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.8);
        z-index: 10000;
    }
    .promptBox{
        position: fixed;
        left: 50%;
        top: 35%;
        background-color: #701FA3;
        text-align: center;
        border-radius: 0.2rem;
        margin-left: -3rem;
        z-index: 100;
        color: #000;
        width: 5.91rem;
        padding-top: .2rem;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.3);
        padding-bottom: .4rem;
        .close{
            display: block;
            width: .22rem;
            height: .22rem;
            background: url(../assets/img/关闭.png) no-repeat;
            background-size: contain;
            position: absolute;
            right: .1rem;
            top:.1rem;
        }
        p{
            // font-size: 14px;
            margin-top: .2rem;
            font-size: 110%;
            color: #fff;
            padding: 10px 0 5px;
        }
        .ok{
            white-space: nowrap;
            padding: 10px 30px;
            text-align: center;
            margin-top: .2rem;
            a{
                display: inline-block;
                width: auto;
                min-width: .9rem;
                outline: none;
                background:linear-gradient(-3deg,rgba(253,87,86,1),rgba(252,119,101,1));
                color: #fff;
                text-decoration: none;
                padding: .04rem 12px;
                border-radius: 4px;
                // font-size: 14px;
                font-size: 110%;
            }
            .noBuy{
                background: #808080;
            }
            .nowBuy{
                margin-left: .2rem;
            }
        }
    }
</style>

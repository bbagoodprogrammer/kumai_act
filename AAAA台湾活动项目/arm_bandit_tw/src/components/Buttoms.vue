<template>
    <div class="buttomBox">
        <div class="coins1" @click="changCoins(50)"></div>
        <div class="coins2" @click="changCoins(200)"></div>
        <div class="coins3" @click="changCoins(500)"></div>
    </div>
</template>

<script>
import { globalBus } from '../utils/eventBus.js'
export default {
    data(){
        return{
            coins:50
        }
    },
    methods:{
        changCoins(val){
            this.coins = val
            this.$store.commit('changDrawCions',val)
            globalBus.$emit('countNumber')
        }
    }
}
</script>

<style lang="scss">
    .buttomBox{
        height: 2rem;
        padding: .2rem 1rem;
        display: flex;
        div{
            float: left;
            margin-left: .2rem;
        }
       .coins1{
            width: 1.59rem;
            height: 1.13rem;
            background: url(../assets/img/50.png);
            background-size: 100% 100%;
        }
        .coins2{
            width: 1.59rem;
            height: 1.13rem;
            background: url(../assets/img/200.png);
            background-size: 100% 100%;
        }
        .coins3{
            width: 1.59rem;
            height: 1.13rem;
            background: url(../assets/img/500.png);
            background-size: 100% 100%;
        }
    }

</style>

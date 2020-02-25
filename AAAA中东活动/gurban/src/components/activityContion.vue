<template>
    <div class="avtivityContion">
        <divide-up-mutton></divide-up-mutton>
        <div class="zan">

        </div>
        <start-obtain></start-obtain>
        <div class="paiming" v-if="!isShare && activite !==0">
        </div>
        <start-list v-if="!isShare && activite !==0"></start-list>
    </div>
</template>

<script>
import DivideUpMutton from "./DivideUpMutton" //瓜分羊肉
import StartObtain from "./StartObtain"  //星值获取
import StartList  from "./StartList"   //星值排行榜
import {mapState} from 'vuex'
export default {
    components:{DivideUpMutton,StartObtain,StartList},
    computed:{
        ...mapState(['isShare','activite'])
    }
}
</script>

<style>
    .avtivityContion{
        margin-top: .47rem;
    }
    .zan{
        width: 4.55rem;
        height:.4rem;
        background: url(../assets/img/zan.png) no-repeat;
        background-size: contain;
        margin: .8rem auto 0;
    }
    .paiming{
        width: 3.98rem;
        height:.4rem;
        background: url(../assets/img/paiming.png) no-repeat;
        background-size: contain;
        margin: .8rem auto .34rem;
    }
</style>

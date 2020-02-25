<template>
    <div class="rule">
        <div class="listTab">
            <a href="" class="works" :class="{active:showComponent === 'Wards'}" @click.prevent="changshowTab('Wards')">活動獎勵</a>
            <a href="" class="kRoom" :class="{active:showComponent === 'Rules'}" @click.prevent="changshowTab('Rules')">活動規則</a>
        </div>
        <component :is="showComponent"></component>
    </div>
</template>

<script>
import Wards from "./Wards"
import Rules from "./Rules"
export default {
    data(){
        return{
            showComponent:'Wards'
        }
    },
    methods:{
        changshowTab(val){
            this.showComponent = val
        }
    },
    components:{
        Wards,
        Rules
    }
}
</script>

<style lang="scss">
    body{
        background-color: #008595;
    }
    .rule{
        padding: .29rem .31rem;
        .listTab{
            width: 6.9rem;
            height: 0.9rem;
            background: url(../../assets/img/listTabBg.png);
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            >a{
                display: block;
                width: 49%;
                height: 0.79rem;
                text-align: center;
                line-height: .79rem;
                &.active{
                    background: url(../../assets/img/listActive.png);
                    background-size: 100% 100%;
                }
                &.works{
                    margin: .05rem 0 0 .05rem;
                }
                &.kRoom{
                    margin: .08rem 0 .05rem 0;
                }
            }
            
        }
    } 
    @import "../../assets/scss/common.scss";
</style>

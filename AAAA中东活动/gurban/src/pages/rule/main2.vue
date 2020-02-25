<template>
    <div class="rule">
        <div class="listTab">
            <a href="" class="kRoom" :class="{active:showComponent === 'Rules'}" @click.prevent="changshowTab('Rules')"></a> 
            <a href="" class="works" :class="{active:showComponent === 'Works'}" @click.prevent="changshowTab('Works')"></a>
        </div>
        <component :is="showComponent"></component>
    </div>
</template>

<script>
import Works from "./works"
import Rules from './rules'
export default {
    components:{Works,Rules},
    data(){
        return{
            showComponent:'Rules'
        }
    },
    methods:{
        changshowTab(val){
            this.showComponent = val
        }
    }
}
</script>

<style lang="scss">
   body{
        background-color: #006643;
        direction: rtl;
    }
    .rule{
        padding: .29rem .49rem;
        .listTab{
            width: 6.9rem;
            height: 0.9rem;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            .works{
                width: 3rem;
                height: .85rem;
                background: url(../../assets/img/works2.png) no-repeat;
                background-size: 100% 100%;
                &.active{
                    background: url(../../assets/img/works.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
            .kRoom{
                width: 3rem;
                height: .85rem;
                background: url(../../assets/img/rule.png) no-repeat;
                background-size: 100% 100%;
                margin-left: .45rem;
                &.active{
                    background: url(../../assets/img/rule2.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
            // >a{
            //     display: block;
            //     width: 49%;
            //     height: 0.79rem;
            //     text-align: center;
            //     line-height: .79rem;
            //     &.active{
            //         background-size: 100% 100%;
            //     }
            //     &.works{
            //         margin: .05rem 0 0 .05rem;
            //     }
            //     &.kRoom{
            //         margin: .08rem 0 .05rem 0;
            //     }
            // }
            
        }
    } 
    @import "../../assets/scss/common.scss";
</style>

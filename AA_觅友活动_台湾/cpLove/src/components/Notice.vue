<template>
    <div class="notice" v-if="notice">
        <div class="outer-box">
            <div class="inner-box1">
                <p v-for="(item,index) in notice" :key="index" v-html="lang.notice_tips.replace('{0}','<span>【'+item[0]+'】</span>').replace('{1}','<span>【'+item[1]+'】</span>')">
                </p>
            </div>
            <!--注意inner-box1和inner-box2的数据必须一样，并且样式也得一样
        inner-box2包裹的顶部要注意和inner-box1的底部的距离应和其包裹的
        每两个div之间的距离一样否则会出现卡顿的效果-->
            <div class="inner-box2">
                <!-- <p v-for="(item,index) in notice" :key="index"> -->
                <p v-for="(item,index) in notice" :key="index" v-html="lang.notice_tips.replace('{0}','<span>【'+item[0]+'】</span>').replace('{1}','<span>【'+item[1]+'】</span>')">
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            list: [
                {
                    uid: '111',
                    name: '200',
                },
                {
                    uid: '222',
                    name: '150',
                },
                {
                    uid: '333',
                    name: 'sdfdfsdf',
                },
                {
                    uid: '444',
                    name: 'asdgg',
                },
            ],
        }
    },
    computed: {
        ...mapState(['notice']),
    },
    mounted() {
        let outerBox = document.getElementsByClassName('outer-box')[0]
        let innerBox1 = document.getElementsByClassName('inner-box1')[0]
        setInterval(() => {
            this.scrollFunc(outerBox, innerBox1)
        }, 30)
    },
    methods: {
        scrollFunc(outerBox, innerBox) {
            if (outerBox.scrollLeft >= innerBox.offsetWidth) {
                outerBox.scrollLeft = 0
            } else {
                outerBox.scrollLeft++
            }
        },
        //     scrollFunc(outerBox,innerBox){
        //     if(outerBox.scrollLeft>0){
        //         outerBox.scrollLeft--
        //         console.log(outerBox.scrollTop);
        //       }else {
        //         outerBox.scrollLeft=innerBox.offsetWidth
        //       }
        //   }
    },
}
</script>

<style lang="scss">
.notice {
    position: relative;
    margin: 0 auto;
    width: 7.5rem;
    height: 0.4rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    &.notices {
        top: 3.31rem;
    }
    .outer-box {
        text-align: center;
        width: 6rem;
        margin: 0 auto;
        height: 0.4rem;
        line-height: 0.4rem;
        overflow: hidden; /* 这个属性很重要一定要设置*/
        display: flex;
        flex-flow: row nowrap;
    }
    .inner-box1,
    .inner-box2 {
        display: flex;
        flex-flow: row nowrap;
        white-space: nowrap;
        p {
            font-size: 0.24rem;
            margin-right: 0.5rem;
            color: #fdd77b;
            span {
                color: #fdd77b;
            }
        }
    }
}
</style>

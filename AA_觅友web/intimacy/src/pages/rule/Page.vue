<template>
    <div class="rule">

        <p class="title">
            <span>{{lang.rule_rank}}</span>
            <span>{{lang.rule_value}}</span>
        </p>
        <ul>
            <li v-for="(item ,index) in list" :key="index">
                <span><img :src="getUrl(index+1)" alt=""><i>{{item.name}}</i></span>
                <span>{{item.score}}</span>
            </li>
        </ul>

    </div>
</template>

<script>

export default {
    data() {
        return {
            list:[
                {
                    'score':350,
                    'name':_lang.name1,
                    'rank':1,
                    'level':2,
                },
                {
                    'score':1400,
                    'name':_lang.name2,
                    'rank':2,
                    'level':2,
                },
                {
                    'score':3500,
                    'name':_lang.name3,
                    'rank':3,
                    'level':2,
                },
                {
                    'score':7700,
                    'name':_lang.name4,
                    'rank':4,
                    'level':3,
                },
                {
                    'score':12600,
                    'name':_lang.name5,
                    'rank':5,
                    'level':3,
                },
                {
                    'score':18900,
                    'name':_lang.name6,
                    'rank':6,
                    'level':3,
                },
                {
                    'score':26600,
                    'name':_lang.name7,
                    'rank':7,
                    'level':4,
                },
                {
                    'score':36400,
                    'name':_lang.name8,
                    'rank':8,
                    'level':4,
                },
                {
                    'score':46900,
                    'name':_lang.name9,
                    'rank':9,
                    'level':4,
                },
                {
                    'score':59500,
                    'name':_lang.name10,
                    'rank':10,
                    'level':5,
                },
                {
                    'score':73500,
                    'name':_lang.name11,
                    'rank':11,
                    'level':5,
                },
                {
                    'score':89600,
                    'name':_lang.name12,
                    'rank':12,
                    'level':5,
                },
                {
                    'score':107100,
                    'name':_lang.name13,
                    'rank':13,
                    'level':6,
                },
                {
                    'score':126000,
                    'name':_lang.name14,
                    'rank':14,
                    'level':6,
                },
                {
                    'score':147000,
                    'name':_lang.name15,
                    'rank':15,
                    'level':6,
                },
            ]
        };
    },
    computed: {
        lang: () => _lang,
    },
    methods:{
        getUrl(index){
            return require('../../img/icon/b_i'+index+'.png');
        },
    }
}
</script>

<style lang="scss">
$color: #E0D9E7;
body{
    color: $color;
    padding-bottom: .3rem;
}

.title{
    width: 6.90rem;
    height: .88rem;
    line-height: .88rem;
    background:rgba(240,240,240,1);
    border-radius: .10rem .10rem 0 0;
    margin: .49rem auto 0;
    font-size: 0;
    span{
        display: inline-block;
        text-align: center;
        width: 50%;
        color: #333;
        font-size: .28rem;
    }
}
ul{
    width: 6.90rem;
    border: 1px solid rgba(245,245,245,1);
    border-radius:0 0 .10rem .10rem;
    margin: 0 auto;
    box-sizing: border-box;
    li{
        height: .77rem;
        line-height: .77rem;
        border-bottom: 1px solid rgba(245,245,245,1);
        font-size: 0;
        display: flex;
        align-items: center;
        span{
            width: 50%;
        }
        span:nth-of-type(1){
            img,i{
                display: inline-block;
                vertical-align: middle;
            }
            img{
                width: .6rem;
                height: .6rem;
                margin-left: .92rem;
            }
            i{
                font-size: .26rem;
                color: #333;
                line-height: .42rem;
            }
        }
        span:nth-of-type(2){
            text-align: center;
            font-size: .24rem;
            color: #666;
            line-height: .38rem;
        }
    }
    li:last-child{
        border: none;
    }
}

</style>

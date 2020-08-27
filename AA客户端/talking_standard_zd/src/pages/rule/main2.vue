<template>
    <div class="rule">
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    body{
        background-color: #2B0057;
    }
    .rule{
        padding: .35rem .45rem;
        h5{
            color:#FDFDAC;
            font-size: 160%;
            font-weight:bold;
            text-align: center;
            margin-bottom: .36rem;
        }
        >p{ 
            font-size: 80%;
            color:#5DFFE2;
        }
        ol{
            li{
                margin-top: .2rem;
                padding-left: .38rem;
                font-size: 80%;
                line-height: .28rem;
                position: relative;
            }
            li::after{
                content: "";
                width: .12rem;
                height: .12rem;
                position: absolute;
                left: 0rem;
                top: .1rem;
                background-color: #FFD900;
                border-radius: 50%;
            }
        }
        .waordsMsg{
            margin-top: 1rem;
        }
        .wardsBox{
            width: 5.5rem;
            margin: 0 auto;
            li{
                width: 1.52rem;
                float: left;
                margin:.2rem .3rem 0 0;
                span{
                    display: block;
                    width: 0.9rem;
                    height: 0.9rem;
                    border-radius: .2rem;
                    background-color: #AB02DE;
                    text-align: center;
                    margin: 0 auto;
                    img{
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        
                    }
                    
                }
                p{
                    font-size: 80%;
                    text-align: center;
                    white-space:nowrap;
                    margin-top: .12rem;
                }
            }
        }
        .footerMsg{
            text-align: center;
            font-size: 80%;
            color:#F7D8FF;
            margin-top: .6rem;
        }
        .clearfix:after{
            content:"";
            height:0;
            line-height:0;
            display:block;
            visibility:hidden;
            clear:both;
        }
    } 
    @import "../../assets/scss/common.scss";
</style>

<template>
    <div class="page pageTask">
        <div class="banner"><img :src="images.banner"></div>
        
        <div class="list">
            <ul>
                <li v-for="item in steps" :key="item.step"><i>{{item.step}}</i><span><strong>{{item.name}}</strong><em>{{item.desc}}</em></span><a @click.prevent="buttonClick(item.step)" :class="{disabled:isButtonDisabled(item.step)}" href="">{{getButtonText(item.step)}}</a></li>
            </ul>
        </div>

        <transition name="bounce">
            <div v-if="dialogShow" class="tdialog">
                <div class="content">
                    <p v-html="getLangHtml(lang.sign_tips)"></p>
                    <div><a @click.prevent="dialogShow=false" href="">{{lang.ok}}</a></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { status } from '../config';
import { getLangHtml, toast } from '../utils';
import { bindStatus, getBindMobile } from '../utils/bindMobile';

const steps = [
    {
        step: 1,
        name: _lang.data_name,
        desc: _lang.data_desc,
    },
    {
        step: 2,
        name: _lang.bind_name,
        desc: _lang.bind_desc,
    },
    {
        step: 3,
        name: _lang.sign_name,
        desc: _lang.sign_desc,
    },
];

export default {
    data() {
        return {
            dialogShow: false,
        };
    },
    computed: {
        ...mapState(['status', 'done', 'mobile']),
        ...mapGetters(['signed']),
        steps: () => steps,
    },
    methods: {
        getLangHtml,
        getButtonText(step) {
            return this.isButtonDisabled(step) ? this.lang.done : this.lang.do;
        },
        isButtonDisabled(step) {
            if (step == 1) {
                return this.done;
            } else if (step == 2) {
                return this.mobile;
            } else if (step == 3) {
                return this.signed;
            }
        },
        buttonClick(step) {
            if (step == 1) {
                // done=2为白名单用户不允许查看数据
                if (this.done < 2) {
                    this.goData();
                }
            } else if (step == 2) {
                if (!this.mobile) {
                    this.bindMobi();
                }
            } else {
                this.signNow();
            }
        },

        goData() {
            this.$router.push('/data');
        },
        async bindMobi() {
            const res = await getBindMobile();
            if (res.status == bindStatus.SUCCESS) {
                this.$store.commit('setMobile', res.country + '-' + res.mobile);
            } else if (res.message) {
                toast(res.message);
            }
        },
        signNow() {
            if (this.isButtonDisabled(1) && this.isButtonDisabled(2)) {
                if (this.status == status.NORMAL) {
                    this.$router.push('/apply');
                } else {
                    this.$router.push('/result');
                }
            } else {
                this.dialogShow = true;
            }
        },
    },
}
</script>

<style lang="scss">
.pageTask {
    background: #fff;
    .banner {
        padding: $page-padding $page-padding .2rem $page-padding;
        img {
            display: block;
            width: 100%;
        }
    }
    .list {
        li {
            padding: $page-padding;
            display: flex;
            align-items: flex-start;
            i, span, a {
                display: inline-block;
            }
            i, a {
                margin-top: .1rem;
            }
            i {
                width: 0.4rem;
                height: 0.4rem;
                line-height: 0.4rem;
                text-align: center;
                border-radius: 50%;
                background: $bg-gray;
                color: #ccc;
                border: .04rem solid #fff;
                font-weight: 500;
                font-family: Arial, Helvetica, sans-serif;
            }
            span {
                width: 4.5rem;
                padding: 0 .27rem;
                text-align: left;
                strong, em {
                    display: block;
                }
                strong {
                    color: $text-black;
                    font-weight: 500;
                    margin-bottom: .03rem;
                }
                em {
                    font-size: $font-small;
                }
            }
            a {
                width: 1.38rem;
                height: .56rem;
                line-height: .56rem;
                text-align: center;
                color: #fff;
                background: linear-gradient(to right, #FC0274, #FC5228);
                border-radius: .28rem;
                font-size: $font-small;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                &.disabled {
                    color: $text-gray;
                    background: $bg-gray;
                }
            }
        }
    }

    .tdialog {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(#000, .4);
        display: flex;
        justify-content: center;
        align-items: center;
        .content {
            width: 5.2rem;
            background: #fff;
            border-radius: .12rem;
            text-align: center;
            p {
                color: $text-black;
                line-height: .56rem;
                padding: .3rem 0;
            }
            div {
                border-top: 1px solid #DDDDDC;
                a {
                    display: block;
                    height: .88rem;
                    line-height: .88rem;
                    color: $skin;
                }
            }
        }
    }
}
</style>
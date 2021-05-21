<template>
    <div class="page pageData">
        <div class="main">
            <div class="info">
                <h6>{{lang.count_title}}</h6>
                <div class="value"><strong>{{lang.count_income}}</strong><em>{{numbers}}</em></div>
                <div class="bar"><span :style="{width:progress}"></span></div>
                <p v-html="timeText"></p>
            </div>

            <div class="status">
                <p v-if="done" class="done" v-html="getLangHtml(lang.done_tips)"></p>
                <p v-else class="undone" v-html="getLangHtml(lang.undone_tips)"></p>
            </div>
        </div>

        <div class="desc">
            <h6>{{lang.done_give}}</h6>
            <ol>
                <li>{{lang.done_give_1}}</li>
                <li>{{lang.done_give_2}}</li>
            </ol>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getLangHtml, getTimeObj } from '../utils';

export default {
    computed: {
        ...mapState(['stime', 'etime', 'days', 'done', 'current', 'target']),
        progress() {
            return Math.min(100, this.current / this.target * 100) + '%';
        },
        numbers() {
            return this.lang.count_numbers.replace('{0}', this.current).replace('{1}', this.target);
        },
        timeText() {
            const stime = getTimeObj(this.stime);
            const etime = getTimeObj(this.etime);
            return getLangHtml(this.lang.count_time.replace('{0}', stime.month).replace('{1}', stime.day).replace('{2}', etime.month).replace('{3}', etime.day).replace('{4}', this.days));
        },
    },
    methods: {
        getLangHtml,
    },
}
</script>

<style lang="scss">
.pageData {
    .main {
        background: #fff;
        padding: $page-padding;

        .info {
            padding: .2rem $page-padding $page-padding $page-padding;
            background: #F5F5F5;
            border-radius: .12rem;
            h6 {
                font-size: $font-big;
                font-weight: 500;
                color: $text-black;
                padding-bottom: .3rem;
            }
            .value {
                display: flex;
                align-content: center;
                margin-bottom: .1rem;
                strong {
                    flex: 1;
                    color: rgba($text-black, .8);
                }
                em {
                    color: $skin;
                    font-size: $font-small;
                }
            }
            .bar {
                height: .08rem;
                background: rgba(#000, .06);
                border-radius: .12rem;
                position: relative;
                span {
                    display: block;
                    background: $skin;
                    border-radius: .12rem;
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                }
            }
            p {
                font-size: $font-small;
                line-height: .36rem;
                padding-top: .3rem;
            }
        }

        .status {
            height: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            p {
                line-height: .48rem;
                font-weight: 500;
                text-align: center;
                &.done {
                    color: $skin;
                }
                &.undone {
                    color: $text-black;
                }
            }
        }
    }

    .desc {
        padding: $page-padding;
        h6 {
            color: #333;
            padding-bottom: .1rem;
        }
        ol {
            color: $text-gray;
            line-height: .4rem;
            li {
                font-size: $font-small;
            }
        }
    }
}
</style>
<template>
    <div class="page pageResult">
        <IconTips v-show="status == statusList.CHECKING" icon="warning" :message="lang.result_checking" />

        <IconTips v-show="status == statusList.SUCCESS" icon="success" :message="lang.result_success" />

        <IconTips v-show="status == statusList.FAIL" icon="danger" :message="failText" />

        <IconTips v-show="status == statusList.REJECT"  icon="danger" :message="lang.result_reject" />

        <div v-show="status == statusList.FAIL" class="button"><a @click.prevent="reSubmit" href="">{{lang.re_submit}}</a></div>

        <div v-show="showDesc" class="desc">
            <h6>{{lang.sign_give}}</h6>
            <ol>
                <li>{{lang.sign_give_1}}</li>
                <li>{{lang.sign_give_2}}</li>
                <li>{{lang.sign_give_3}}</li>
                <li>{{lang.sign_give_4}}</li>
            </ol>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { status as statusList } from '../config';
import IconTips from './mods/IconTips';

export default {
    computed: {
        ...mapState(['status', 'reason', 'contact']),
        statusList: () => statusList,
        showDesc() {
            return this.status == statusList.CHECKING || this.status == statusList.SUCCESS;
        },
        failText() {
            const texts = [this.lang.result_fail];
            if (this.reason) {
                texts.push(this.lang.result_fail_reason.replace('%s', this.reason));
            }
            texts.push(this.lang.result_fail_contact.replace('%s', this.contact));
            return texts.join('<br>');
        },
    },
    methods: {
        reSubmit() {
            this.$store.commit('setStatus', statusList.NORMAL);
            this.$router.replace('/apply');
        },
    },
    components: {
        IconTips,
    },
}
</script>

<style lang="scss">
.pageResult {
    .button {
        padding: 1rem 0;
        text-align: center;
        a {
            display: inline-block;
            width: 4.8rem;
            height: .88rem;
            line-height: .88rem;
            color: #fff;
            border-radius: .44rem;
            background: $skin;
        }
    }

    .desc {
        padding: $page-padding;
        h6 {
            color: $text-black;
            margin-bottom: .1rem;
        }
        ol {
            li {
                line-height: .4rem;
                font-size: $font-small;
            }
        }
    }
}
</style>
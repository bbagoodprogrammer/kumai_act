<template>
    <div class="iconTips">
        <div class="content">
            <div class="icon" :class="icon"></div>
            <div class="tips" v-html="msg"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true,
            validator(value) {
                return ['success', 'warning', 'danger', 'mobile'].indexOf(value) !== -1;
            },
        },
        message: {
            type: String,
            required: true,
        },
    },
    computed: {
        msg() {
            return this.message.replace(/\n/g, '<br>');
        },
    },
}
</script>

<style lang="scss">
.iconTips {
    padding: .6rem;
    background: #fff;
    .icon {
        height: 1.6rem;
        background-size: auto 100%;
        background-position: center center;
        background-repeat: no-repeat;
        // &.success {
        //     background-image: url("../../img/status_success.png");
        // }
        // &.warning {
        //     background-image: url("../../img/status_warning.png");
        // }
        // &.danger {
        //     background-image: url("../../img/status_danger.png");
        // }
        // &.mobile {
        //     background-image: url("../../img/bind_ok.png");
        // }
    }
    .tips {
        color: #333;
        text-align: center;
        line-height: .48rem;
        margin-top: .33rem;
    }
}
</style>
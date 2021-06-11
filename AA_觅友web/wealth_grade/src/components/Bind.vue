<template>
    <div class="page pageBind">
        <IconTips icon="mobile" :message="message" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import IconTips from './mods/IconTips';
import { getHiddenMobile } from '../utils';

export default {
    computed: {
        ...mapState(['mobile']),
        message() {
            return this.lang.bind_succ.replace('%s', getHiddenMobile(this.mobile));
        },
    },
    components: {
        IconTips,
    },
}
</script>

<style lang="scss">
.pageBind {
    
}
</style>
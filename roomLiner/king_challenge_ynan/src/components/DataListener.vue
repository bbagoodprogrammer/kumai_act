<template>
    <div class="dataListener"></div>
</template>

<script>
import { pageInited } from '../utils';

export default {
    data() {
        return {
            appData: {
                rid: 0,
                uid: 0,
                fid: 0,
                public: 0,
                mic_uid: 0,
                mic_uids: [],
            },
        };
    },
    computed: {
        mic_uid() {
            return this.appData.mic_uid || 0;
        },
    },
    watch: {
        mic_uid(newVal) {
            this.$emit('onMicUidChange', newVal);
        },
    },
    mounted() {
        window.onAppData = res => {
            const data = JSON.parse(res || '{}');
            this.appData = data;
        };
        pageInited();
    },
}
</script>
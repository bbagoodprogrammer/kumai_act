<template>
    <div id="app">
        <router-view :style="{minHeight:viewHeight+'px'}"></router-view>
        <Loading v-show="loading" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/common/Loading';

export default {
    computed: {
        ...mapState(['loading']),
        viewHeight: () => window.innerHeight,
    },
    components: {
        Loading,
    },
};
</script>

<style lang="scss">

</style>
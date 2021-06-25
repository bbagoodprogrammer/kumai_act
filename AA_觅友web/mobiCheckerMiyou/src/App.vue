<template>
    <div id="app">
        <get-code />
        <loading :show="loading" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import GetCode from './components/GetCode';
import Loading from "./components/common/Loading";

export default {
    computed: {
        ...mapState(['loading']),
    },
    components: {
        GetCode,
        Loading,
    },
};
</script>

<style lang="scss">

</style>
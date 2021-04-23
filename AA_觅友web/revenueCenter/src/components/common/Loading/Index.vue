<template>
    <div v-show="show" class="loading"></div>
</template>

<script>
export default {
    props: ['show'],
}
</script>

<style lang="scss">
.loading {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100000;
    background: rgba(0, 0, 0, .4) url("./loading.gif") center center no-repeat;
    background-size: .7rem .38rem;
}
</style>
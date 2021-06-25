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
    background-color: rgba(0, 0, 0, .5);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: .7rem .38rem;
    @if $name==blue {
        background-image: url("./loading_blue.gif");
    }
}
</style>
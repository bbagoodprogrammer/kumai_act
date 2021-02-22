<template>
    <div class="slotMachine">
        <SlotMachineItem @end="$emit('end', result)" :updateFlag="itemUpdateFlag" v-for="i in size" :list="list" :id="getResultId(i-1)" :size="size" :index="i-1" :key="i" />
    </div>
</template>

<script>
import SlotMachineItem from './SlotMachineItem';

export default {
    props: {
        size: {
            type: Number,
            default: 3,
        },
        list: {
            type: Array,
            default: [],
        },
        result: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            itemUpdateFlag: false,
        };
    },
    watch: {
        result(newValue) {
            this.itemUpdateFlag = !this.itemUpdateFlag;
        },
    },
    methods: {
        getResultId(index) {
            if (this.result && this.result.length) {
                return typeof this.result[index] != 'undefined' ? this.result[index] : -1;
            }
            return -1;
        },
    },
    components: {
        SlotMachineItem,
    }
}
</script>

<style lang="scss">
.slotMachine > div {
    float: left;
}
</style>

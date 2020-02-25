<template>
    <div class="time">
        {{time}}
    </div>
</template>

<script>
 import getDate from "../utils/getDate.js"
export default {
    props:['item'],
    computed:{
        time(){
            return getDate(new Date(Number(this.item*1000)),'pai')
        }
    }
}
</script>

<style>

</style>

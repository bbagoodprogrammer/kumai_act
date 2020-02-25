<template>
    <div>{{buyTime}}</div>
   
</template>

<script>
import getData from "../utils/getDate.js"
export default {
    props:["time"],
    computed:{
        buyTime(){
            return getData(new Date(this.time*1000))
        }
    }
}
</script>

<style>

</style>

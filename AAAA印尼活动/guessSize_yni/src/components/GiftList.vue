<template>
  <div class="giftListBox">
    <div class="giftList" @click="closeGift()">
      <span v-for="(item,index) in giftList" :key="index">
        {{item.name}}{{item.b}}
        <em @click="exchange(item.id)">立即兑换</em>
      </span>
    </div>
  </div>
</template>

<script>
import api from "../api/apiConfig"
import { mapState } from "vuex"
export default {
  props: ['giftList'],
  methods: {
    exchange(id) { //领取礼物
      api.receiveGift(id).then(res => {

      })
    },
    closeGift() {
      this.$emit('closeGift')
    }
  }
}
</script>

<style lang="scss">
.giftListBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .giftList {
    background-color: orange;
    span {
      display: inline-block;
      width: 50%;
      height: 1rem;
      display: inline-block;
    }
  }
}
</style>

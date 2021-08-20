<template>
  <div class="pro_box">
    <transition name="bounce">
      <div class="pro" v-if="txt">
        <div class="inner">
          <!-- <i @click="close()"></i> -->
          <p v-html="txt"></p>
          <div class="btn" @click="close()">{{lang.ok}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: ["txt"],
  computed: {},
  components: {
    // Avatar,
  },
  methods: {
    close() {
      this.$parent.closePro();
    },
  },
};
</script>

<style lang="scss">
.pro {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    width: 6rem;
    height: 3rem;
    background-color: #fafafa;
    border-radius: .5rem;
    border: 1px solid #cdcdcd;
    position: absolute;
    // box-shadow: 0 2px 4px 0 rgb(0 0 0 / 30%);
    i {
      position: absolute;
      width: 0.75rem;
      height: 0.76rem;
      text-align: center;
      right: -0.1rem;
      top: -0.3rem;
      background: url("../img/close.png") 50% no-repeat;
      background-size: 0.75rem 0.76rem;
    }
    p {
      color: #8e5e35;
      font-size: 0.28rem;
      padding: .6rem .3rem 0;
      text-align: center;
    }
    .btn {
      width: 2.61rem;
      height: .84rem;
      line-height: .84rem;
      text-align: center;
      background: url('../img/btn.png') no-repeat;
      background-size: 2.61rem .84rem;
      margin: 0 auto;
      color: #fff;
      font-size: 0.3rem;
      position: absolute;
      bottom: 0.3rem;
      left: 50%;
      margin-left: -1.305rem;
    }
  }
}
</style>
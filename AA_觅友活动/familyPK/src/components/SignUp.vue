<template>
  <div class="sign__up">
    <img
      v-if="initData.step == 0"
      class="sign__img"
      :src="images.act_not_start"
      alt=""
    />
    <img
      v-if="initData.step == 1"
      class="sign__img"
      :src="images.join_family"
      @click="jumpFamilyList"
    />
    <img
      v-if="initData.step == 2"
      class="sign__img"
      :src="images.act_ended"
      alt=""
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SignUp",

  computed: {
    ...mapState(["initData", "share"]),
  },

  data() {
    return {};
  },

  methods: {
    jumpFamilyList() {
      this.$router.push("/family");
    },
  },
};
</script>

<style lang="scss">
.sign__up {
  width: 7.5rem;
  height: 1.33rem;
  background: url("../img/fixed_bottom_box.png") 0/100% 100% no-repeat;
  position: fixed;
  bottom: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  .sign__img {
    width: 3.51rem;
    height: 0.85rem;
  }
}
</style>
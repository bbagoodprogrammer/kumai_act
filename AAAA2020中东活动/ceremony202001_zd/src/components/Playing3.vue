<template>
  <div class="playing3">
    <Playing3Pats :pets="pets" />
    <Playing3Bar :nums="nums" :shucle="shucle" :show="show" />
    <Playing3TabsScrollLoadList :pets="pets" />
  </div>
</template>
<script>
import api from "../api/apiConfig"
import Playing3Pats from "./Playing3Pats"
import Playing3Bar from "./Playing3Bar"
import Playing3TabsScrollLoadList from "./Playing3TabsScrollLoadList"
export default {
  components: { Playing3Pats, Playing3Bar, Playing3TabsScrollLoadList },
  data() {
    return {
      pets: {},
      nums: 0,
      shucle: 0,
      show: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      api.page3().then(res => {
        const { all, nums, list, show, point, shucle, rank, step } = res.data.response_data
        this.pets = all
        this.nums = nums
        this.shucle = shucle
        this.show = show
        this.vxc('setActStatus', step)
        this.vxc('setPets', all)
        this.$store.commit('updateRankGroups', {
          key: 1,
          loadCount: 0,
          loadEnd: list.length < 20,
          loading: false,
          none: list.length == 0,
          list: list,
        });
        this.vxc('setPoint', point)
        this.vxc('changGroupsUserMsg', {
          key: 3,
          msg: rank
        })
        this.vxc('petChangGroupsUserMsg', {
          key: 1,
          msg: rank
        })
      })
    }
  }
}
</script>
<style lang="scss">
</style>
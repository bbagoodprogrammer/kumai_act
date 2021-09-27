<template>
  <div class="rule__main">
    <div class="title">{{ lang.act_time }}</div>
    <div class="des">{{ getActTime }}</div>
    <div class="title">{{ lang.how_join }}</div>
    <div class="title_second">{{ lang.bind_relation }}</div>
    <div class="des">{{ lang.bind_relation_des_1 }}</div>
    <div class="des">{{ lang.bind_relation_des_2 }}</div>
    <div class="des">{{ lang.bind_relation_des_3 }}</div>
    <div class="title_second">{{ lang.relieve_relation }}</div>
    <div class="des">{{ lang.relieve_relation_des_1 }}</div>
    <div class="des">{{ lang.relieve_relation_des_2 }}</div>
    <div class="des">{{ lang.relieve_relation_des_3 }}</div>
    <div class="des">{{ lang.relieve_relation_des_4 }}</div>
    <div class="title">{{ lang.how_make_ring }}</div>
    <div class="des">{{ lang.how_make_1 }}</div>
    <div class="des des1">{{ lang.how_make_2 }}</div>
    <img class="rule_table" :src="images.rule_table" />
    <div class="des">{{ lang.note_des.replace('%s',ringProgress[0].rname).replace('%n',ringProgress[0].score).replace('%c',ringProgress[1].rname) }}</div>
    <div class="title">{{ lang.magic_rank }}</div>
    <div class="des">{{ lang.magic_rank_des_1 }}</div>
    <div class="des">{{ lang.magic_rank_des_2 }}</div>
    <div class="title">{{ lang.task_explain }}</div>
    <div class="des">{{ lang.task_explain_des }}</div>
    <div class="title">{{ lang.rule_orther }}</div>
    <div class="des">{{ lang.rule_orther_des_1 }}</div>
    <div class="des">{{ lang.rule_orther_des_2 }}</div>
    <div class="des">{{ lang.rule_orther_des_4 }}</div>
    <div class="des">{{ lang.rule_orther_des_3 }}</div>
    <div class="explain">{{ lang.act_explain }}</div>
  </div>
</template>

<script>
import { dateFormat } from "../utils";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Rule",

  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["ringProgress"]),
    getActTime () {
      let sTime = dateFormat(this.lang.s_time, this.initData.stime * 1000);
      let eTime = dateFormat(this.lang.e_time, this.initData.etime * 1000);
      return sTime + "-" + eTime
    },
  },
};
</script>

<style lang="scss">
.rule__main {
  .title {
    font-size: 0.26rem;
    font-weight: 300;
    color: #ffffff;
    padding-left: 0.38rem;
    padding-right: 0.38rem;
    padding-top: 0.3rem;
  }
  .des {
    font-size: 0.22rem;
    font-weight: 300;
    color: #e7c1ff;
    padding-left: 0.62rem;
    padding-right: 0.51rem;
    padding-top: 0.1rem;
  }
  .des1 {
    color: #FFFEBC;
    padding-top: 0.4rem;
    padding-bottom: 0.38rem;
  }
  .title_second {
    font-size: 0.26rem;
    font-weight: 300;
    color: #ffffff;
    padding-left: 0.65rem;
    padding-top: 0.2rem;
    position: relative;
  }
  .title_second::before {
    position: absolute;
    left: 0.4rem;
    top: 0.35rem;
    content: '';
    width: 0.1rem;
    height: 0.1rem;
    background: #FFFFFF;
    border-radius: 50%;
  }
  .explain {
    text-align: center;
    font-size: 0.22rem;
    font-weight: 300;
    color: #7540bf;
    padding-top: 0.4rem;
    padding-bottom: 0.1rem;
  }
  .rule_table {
    width: 5.38rem;
    height: 1.95rem;
    margin-left: 0.5rem;
  }
}
</style>
<template>
  <div class="header">
    <img class="header_title" :src="images.header_title" alt="" />

    <!-- 右侧的按钮 -->
    <div class="rule" @click="showRuleDialog = true">{{ lang.act_rule }}</div>

    <div class="last__box">
      <img class="title" :src="images.last_man_woman" alt="" />
      <div class="box">
        <div class="avatar__box">
          <img v-if="lastIssueTopUser.men.avatar" v-lazy="lastIssueTopUser.men.avatar" />
          <img v-else src="../img/no_person.png" />
        </div>
        <div class="seat">
          <span class="nick" v-if="lastIssueTopUser.men.nick">{{lastIssueTopUser.men.nick}}</span>
          <span v-else>{{lang.man_seat}}</span>
        </div>
        <span class="value" v-if="lastIssueTopUser.men.score">{{ lang.man_value.replace('%s', lastIssueTopUser.men.score || 0) }}</span>
      </div>
      <div class="box">
        <div class="avatar__box">
          <img v-if="lastIssueTopUser.women.avatar" v-lazy="lastIssueTopUser.women.avatar" />
          <img v-else src="../img/no_person.png" />
        </div>
        <div class="seat">
          <span class="nick" v-if="lastIssueTopUser.women.nick">{{lastIssueTopUser.women.nick}}</span>
          <span v-else>{{lang.woman_seat}}</span>
        </div>
        <span class="value" v-if="lastIssueTopUser.women.score">{{ lang.woman_value.replace('%s', lastIssueTopUser.women.score || 0) }}</span>
      </div>
    </div>

    <RuleDialog
      v-if="showRuleDialog"
      :visible.sync="showRuleDialog"
    />

    <ScrollNotice />
  </div>
</template>

<script>
import RuleDialog from './RuleDialog'
import ScrollNotice from './ScrollNotice'
import { mapState, mapGetters } from "vuex";

export default {
  name: "Header",

  components: {
    RuleDialog,
    ScrollNotice
  },

  data() {
    return {
      showRuleDialog: false
    };
  },

  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["lastIssueTopUser"]),
  },

  methods: {
    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },
  },
};
</script>

<style lang="scss">
.header {
  .header_title {
    width: 7.5rem;
    height: 7rem;
  }

  .btn_right {
    width: 1.62rem;
    height: 0.56rem;
    position: absolute;
    right: 0;
    font-size: 0.24rem;
    font-weight: 400;
    color: #ffffff;
    box-sizing: border-box;
    z-index: 100;
    text-align: center;
    line-height: 0.56rem;
  }
  .rule {
    @extend .btn_right;
    top: 5.15rem;
    background: url("../img/rule_btn.png") 0/100% 100% no-repeat;
  }

  .last__box {
    width: 7.43rem;
    height: 4.07rem;
    margin: -0.43rem auto 0 auto;
    background: url("../img/last_issue_box.png") 0/100% 100% no-repeat;
    position: relative;
    display: flex;
    justify-content: center;
    .title {
      width: 3.49rem;
      height: 1.35rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -0.8rem;
    }
    .box:nth-child(2) {
      .avatar__box::after {
        content: '';
        width: 1.99rem;
        height: 1.88rem;
        position: absolute;
        left: 50%;
        top: -0.2rem;
        transform: translateX(-50%);
         background: url("../img/man_frame.png") 0/100% 100% no-repeat;
      }
    }
    .box:nth-child(3) {
      .seat {
        background: url("../img/woman_seat.png") 0/100% 100% no-repeat;
      }
      .avatar__box::after {
        content: '';
        width: 1.99rem;
        height: 1.88rem;
        position: absolute;
        left: 50%;
        top: -0.2rem;
        transform: translateX(-50%);
         background: url("../img/woman_frame.png") 0/100% 100% no-repeat;
      }
    }
    .box {
      width: 2.98rem;
      margin-left: 0.11rem;
      margin-right: 0.11rem;
      text-align: center;
      .avatar__box {
        width: 1.4rem;
        height: 1.4rem;
        margin: 0.75rem auto 0.42rem auto;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .seat {
        width: 2.98rem;
        height: 0.59rem;
        background: url("../img/man_seat.png") 0/100% 100% no-repeat;
        font-size: 0.26rem;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 0.5rem;
        .nick {
          display: inline-block;
          width: 1.6rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .value {
        font-size: 0.2rem;
        font-weight: 400;
        color: #ffffff;
        padding-top: 0.05rem;
      }
    }
  }
}
</style>
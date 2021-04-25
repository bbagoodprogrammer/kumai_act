<template>
  <div class="make__family">
    <div
      @touchmove.prevent
      class="list__screen__container"
      @click="handleCloseDialog"
    ></div>
    <div class="list__container">
      <img
        class="close__dialog"
        @click="handleCloseDialog"
        src="../img/close.png"
      />

      <div class="dialog__title">
        <div class="name">{{ lang.make_family }}</div>
      </div>

      <div class="main">
        <div class="make_des">{{ lang.make_des }}</div>
        <div class="form_notice">{{ lang.form_notice }}</div>
        <textarea
          v-model="formData.title"
          :placeholder="lang.family_name_placeholder"
        ></textarea>
        <span class="textarea_des">{{ lang.name_notice }}</span>
        <textarea
          v-model="formData.concept"
          :placeholder="lang.family_idea_placeholder"
        ></textarea>
        <span class="textarea_des">{{ lang.idea_notice }}</span>
        <div class="select_pk_group">{{ lang.select_pk_group }}</div>
        <div class="select__box select_blue" @click="handleTeam('blue')">
          <span
            class="dot"
            :class="{ dot_selected: formData.team == 'blue' }"
          ></span>
          <span v-html="getGroupHtml(lang.blue_group, teamCount.blue)"></span>
          <div v-if="formData.team == 'blue'" class="selected__box"></div>
        </div>
        <div class="select__box" @click="handleTeam('red')">
          <span
            class="dot"
            :class="{ dot_selected: formData.team == 'red' }"
          ></span>
          <span v-html="getGroupHtml(lang.red_group, teamCount.red)"></span>
          <div v-if="formData.team == 'red'" class="selected__box"></div>
        </div>
        <div class="form_make_des" v-html="getFormMakeDes"></div>
        <a :href="roomUrl" class="room_regulations">{{
          lang.room_regulations
        }}</a>
        <div
          class="btn"
          :class="{ ban_btn: !formData.title || !formData.concept }"
          @click="handleComfirmDialog"
        >
          {{ lang.submit_make_apply }}
        </div>
      </div>
    </div>

    <!-- 二次确认弹框 -->
    <div class="confirm__dialog" v-if="showComfirmDialog">
      <div
        @touchmove.prevent
        class="list__screen__container"
        @click="showComfirmDialog = false"
      ></div>
      <div class="apply__main">
        <div class="apply_des" v-html="getBrHtml(lang.confirm_des)"></div>
        <div class="btn__box">
          <div class="btn" @click="showComfirmDialog = false">
            {{ lang.cancel }}
          </div>
          <div class="btn" @click="submit">{{ lang.confirm }}</div>
        </div>
      </div>
    </div>

    <div class="succ__box" v-if="showSucc">
      <div class="box" v-html="getBrHtml(lang.make_succ)"></div>
    </div>
  </div>
</template>

<script>
import { createFamily } from "../apis";
import { toast } from "../utils";
import {dateFormat} from '../utils'
import { mapState, mapGetters } from "vuex";
export default {
  name: "MakeFamily",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["familyCompetition", "familyPK"]),
    getFormMakeDes() {
      let time1 = dateFormat(this.lang.act_step_time, this.familyPK.sTime * 1000) + '-' +dateFormat(this.lang.act_step_time, this.familyPK.eTime * 1000)
      let time2 = dateFormat(this.lang.act_step_time, this.familyCompetition.sTime * 1000) + '-' +dateFormat(this.lang.act_step_time, this.familyCompetition.eTime * 1000)
      return this.lang.form_make_des.replace('{0}', time1).replace('{1}', time2)
    }
  },

  data() {
    return {
      formData: {
        title: "",
        concept: "",
        team: "",
      },
      teamCount: {},
      roomUrl: "",
      showComfirmDialog: false,
      showSucc: false,
    };
  },

  watch: {
    "formData.title": {
      handler(val) {
        if (val.length > 10) {
          this.formData.title = String(val).slice(0, 10);
        }
      },
    },
    "formData.concept": {
      handler(val) {
        if (val.length > 100) {
          this.formData.concept = String(val).slice(0, 100);
        }
      },
    },
  },

  created() {
    this.teamCount = this.initData.teamCount;
    if (this.teamCount.red > this.teamCount.blue) {
      this.formData.team = "blue";
    } else {
      this.formData.team = "red";
    }
    this.roomUrl = window._roomUrl;
  },

  methods: {
    async submit() {
      if (!this.formData.title || !this.formData.concept) {
        return;
      }
      let res = await createFamily(this.formData);
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.showSucc = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 1500);
      } else {
        toast(response_status.error);
        setTimeout(() => {
          this.handleCloseDialog()
        }, 1500)
      }
    },

    handleComfirmDialog() {
      if (!this.formData.title || !this.formData.concept) {
        return;
      }
      this.showComfirmDialog = true;
    },

    handleTeam(team) {
      this.formData.team = team;
    },

    getGroupHtml(text, count) {
      return text.replace("N", `<span class="color">${count}</span>`);
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.make__family {
  .list__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    z-index: 1000;
  }

  .list__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    width: 7.33rem;
    height: 9.71rem;
    background: url("../img/dialog_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    .close__dialog {
      position: absolute;
      width: 0.56rem;
      height: 0.56rem;
      top: -0.2rem;
      right: 0;
    }

    .dialog__title {
      display: inline-block;
      font-size: 0.34rem;
      color: #e4bd68;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.31rem;
      margin-bottom: 0.24rem;
      .name {
        width: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
      }
    }
    .dialog__title::before {
      content: "";
      width: 1.94rem;
      height: 0.16rem;
      position: absolute;
      left: -2.06rem;
      background-image: url("../img/title_left.png");
      background-size: 100% 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .dialog__title::after {
      content: "";
      width: 1.94rem;
      height: 0.16rem;
      position: absolute;
      right: -2.06rem;
      background-image: url("../img/title_right.png");
      background-size: 100% 100%;
      top: 50%;
      transform: translateY(-50%);
    }

    .main {
      height: 8.4rem;
      overflow: auto;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      .make_des {
        font-size: 0.26rem;
        font-weight: 400;
        color: #e9faf9;
      }
      .form_notice {
        font-size: 0.22rem;
        font-weight: 400;
        color: #f8f293;
        padding-top: 0.13rem;
      }
      textarea {
        width: 6.52rem;
        height: 1.08rem;
        background: RGBA(15, 4, 61, 1);
        font-size: 0.22rem;
        font-weight: 400;
        color: #b1c4f7;
        margin-top: 0.25rem;
        // margin-bottom: 0.13rem;
        border: none;
        border-radius: 0.06rem;
        padding: 0.1rem;
        box-sizing: border-box;
      }
      textarea::-webkit-input-placeholder {
        color: #b1c4f7;
      }
      .textarea_des {
        font-size: 0.22rem;
        font-weight: 400;
        color: #e9faf9;
      }
      .select_pk_group {
        font-size: 0.28rem;
        font-weight: 400;
        color: #fdfdff;
        padding-top: 0.41rem;
        padding-bottom: 0.25rem;
      }
      .selected__box {
        position: absolute;
        left: 0;
        top: 0;
        width: 5.34rem;
        height: 1.05rem;
        background: url("../img/team_select_box.png") 0/100% 100% no-repeat;
      }
      .select__box {
        width: 5.34rem;
        height: 1.05rem;
        background: url("../img/red_box.png") 0/100% 100% no-repeat;
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        font-weight: 400;
        color: #fdfdff;
        margin-bottom: 0.15rem;
        position: relative;
        .dot {
          width: 0.27rem;
          height: 0.27rem;
          border-radius: 50%;
          box-sizing: border-box;
          background: RGBA(229, 251, 249, 1);
          margin-left: 0.27rem;
          margin-right: 0.17rem;
        }
        .dot_selected {
          background: RGBA(255, 0, 129, 1);
          border: 0.03rem solid RGBA(229, 251, 249, 1);
        }
        .color {
          color: rgba(249, 244, 83, 1);
        }
      }
      .select_blue {
        background: url("../img/blue_box.png") 0/100% 100% no-repeat !important;
      }
      .form_make_des {
        font-size: 0.26rem;
        font-weight: 400;
        color: #e9faf9;
        margin-top: 0.24rem;
        margin-bottom: 0.28rem;
      }
      .room_regulations {
        font-size: 0.22rem;
        font-weight: 400;
        color: #3be6ff;
      }
      .btn {
        width: 3.26rem;
        height: 0.83rem;
        background: url("../img/dialog_btn.png");
        background-size: 100% 100%;
        font-size: 0.3rem;
        font-weight: bold;
        color: #7a2a10;
        line-height: 0.83rem;
        text-align: center;
        margin: 0.3rem auto 0.3rem auto;
      }
      .ban_btn {
        filter: grayscale(100%);
      }
    }
  }

  .confirm__dialog {
    .list__screen__container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.5;
      z-index: 1000;
    }
    .apply__main {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      opacity: 1;
      width: 6.81rem;
      height: 3.51rem;
      background: url("../img/mini_dialog_bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      box-sizing: border-box;

      .apply_des {
        font-size: 0.26rem;
        font-weight: 400;
        color: #e9faf9;
        padding: 0.48rem 0.78rem 0.4rem 0.78rem;
      }

      .btn__box {
        display: flex;
        justify-content: center;
        .btn:first-child {
          background: url("../img/tab_bg.png");
          background-size: 100% 100%;
          color: #ffffff;
        }
        .btn {
          width: 2.3rem;
          height: 0.78rem;
          background: url("../img/current_tab_bg.png");
          background-size: 100% 100%;
          line-height: 0.78rem;
          text-align: center;
          font-size: 0.28rem;
          font-weight: bold;
          color: #7a2a10;
          margin: 0 0.2rem 0 0.2rem;
        }
      }
    }
  }

  .succ__box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba($color: #000000, $alpha: 0.4);
    .box {
      width: 6.18rem;
      height: 2.89rem;
      background: url("../img/succ_box.png") 0/100% 100% no-repeat;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1100;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.28rem;
      font-weight: 400;
      color: #e9faf9;
    }
  }
}
</style>
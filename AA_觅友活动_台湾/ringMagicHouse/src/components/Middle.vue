<template>
  <div class="middle">
    <img class="middle_tape" src="../img/middle_tape.png" />
    <div class="cp__box">
      <div class="cp_left">
        <div class="avatar__box">
          <img @click="goHomepage(userInfo.uid)" class="avatar" v-lazy="userInfo.avatar" />
        </div>
        <div class="nick">{{ userInfo.nick }}</div>
      </div>

      <div class="cp_middle">
        <!-- <img class="heart" src="../img/cp_heart.png" /> -->
        <canvas id="canvas1" class="heart"></canvas>
        <div v-if="userInfo.cp_uid" class="intimacy">{{ lang.intimacy }}</div>
        <div v-if="userInfo.cp_uid" class="intimacy_value">
          {{ userInfo.intimacy }}
        </div>
      </div>

      <div class="cp_right">
        <div class="avatar__box">
          <!-- <img
            v-if="userInfo.cp_uid"
            @click="showSelectCp = true"
            class="add__img"
            src="../img/add.png"
          /> -->
          <div @click="showSelectCp = true" v-if="!userInfo.cp_uid" class="add__img">
            <img src="../img/add.png" />
          </div>
          <img v-else @click="goHomepage(userInfo.cp_uid)" class="avatar" v-lazy="userInfo.cp_avatar" />
        </div>
        <div v-if="!userInfo.cp_uid" @click="showSelectCp = true" class="select_btn">
          {{ lang.select_cp }}
        </div>
        <div v-else class="nick">{{ userInfo.cp_nick }}</div>
      </div>
    </div>

    <div v-if="!userInfo.cp_uid" class="select_des">
      {{ lang.select_cp_des }}
    </div>
    <div v-else class="say_hello__box">
      <div @click="handleSayHello" class="btn">{{ greetings.title }}</div>
      <div @click="showRelieveCpDialog" v-if="initData.showRelieve" class="relieve">
        {{ lang.relieve_act_relationship }}
      </div>
    </div>

    <div class="soul_contract__box">
      <div class="title">{{ lang.soul_contract }}</div>
      <!-- 1 step -->
      <div v-if="
          initData.cooperateTestStep == 0 || initData.cooperateTestStep == 1
        ">
        <div class="contract_des_1">{{ lang.soul_contract_des_1 }}</div>
        <div class="contract_des_2">{{ lang.soul_contract_des_2 }}</div>
        <div class="test_time" v-html="getBrHtml(lang.contract_test_time)"></div>
        <div class="test__box">
          <img @click="handleTestContract" src="../img/fingerprint.png" />
          <span>{{ lang.contract_test }}</span>
        </div>
      </div>
      <!-- 2 step -->
      <div v-if="initData.cooperateTestStep == 2 && !cooperateTestRes.tacitDegree">
        <canvas v-if="showGenerateSvga" id="middleSvga" class="generate__svga"></canvas>
        <div class="result_generate">{{ lang.result_generate }}</div>
      </div>
      <!-- 3 step -->
      <div v-if="initData.cooperateTestStep == 2 && cooperateTestRes.tacitDegree">
        <span class="tacit_agree" v-html="getTacitAgree"></span>
        <span class="magic_engine" v-html="getMagicEngine"></span>
        <div class="result_text">{{ lang[`test_result_${resultIndex}`] }}</div>
      </div>
    </div>

    <SelectCpDialog :visible.sync="showSelectCp" v-if="showSelectCp" />

    <RelieveCpDialog :visible.sync="showRelieveCp" v-if="showRelieveCp" />

    <IsRelieveCpDialog :visible.sync="showIsRelieveCp" :mailId="cancelCpMailId" v-if="showIsRelieveCp" />
  </div>
</template>

<script>
import SelectCpDialog from "./SelectCpDialog";
import RelieveCpDialog from "./RelieveCpDialog";
import IsRelieveCpDialog from "./IsRelieveCpDialog";
import { sayHello, cooperateClick } from "../apis/index";
import { toast } from "../utils/index";
import callApp from "../utils/callApp";
import { mapGetters, mapState } from "vuex";
import { Downloader, Parser, Player } from "svga.lite";

export default {
  name: 'Middle',

  data () {
    return {
      resultIndex: 1,
      showSelectCp: false,
      showRelieveCp: false,
      showIsRelieveCp: false,
      cancelCpMailId: "",
      showGenerateSvga: false
    };
  },

  components: {
    SelectCpDialog,
    RelieveCpDialog,
    IsRelieveCpDialog,
  },

  computed: {
    ...mapState(["initData"]),
    ...mapGetters([
      "userInfo",
      "greetings",
      "energy",
      "cooperateTestRes",
      "popup",
    ]),
    getTacitAgree () {
      // 计算循环的文字
      if (this.cooperateTestRes.tacitDegree >= 75) {
        this.resultIndex = Math.ceil(Math.random() * 3);
      } else {
        this.resultIndex = Math.ceil(Math.random() * 3) + 3;
      }
      return this.lang.today_tacit_agree
        .replace("{0}", '<span class="num">')
        .replace("{1}", "</span>")
        .replace("%s", this.cooperateTestRes.tacitDegree);
    },
    getMagicEngine () {
      return this.lang.get_magic_engine
        .replace("{0}", '<span class="num">')
        .replace("{1}", "</span>")
        .replace("%s", this.cooperateTestRes.scores);
    },
  },

  watch: {
    cooperateTestRes: {
      handler (val) {
        if (!val.tacitDegree && this.initData.cooperateTestStep == 2) {
          this.showGenerateSvga = false
          this.$nextTick(() => {
            this.handleBallSvga();
          });
        }
      },
      deep: true,
      immediate: true,
    },
    initData: {
      handler (val) {
        if (
          !this.cooperateTestRes.tacitDegree &&
          this.initData.cooperateTestStep == 2
        ) {
          this.showGenerateSvga = false
          this.$nextTick(() => {
            this.handleBallSvga();
          });
        }
      },
      deep: true,
    },
  },

  mounted () {
    this.handleSvga();
  },

  methods: {
    async handleSvga () {
      const downloader = new Downloader();
      const parser = new Parser({ disableWorker: !("Worker" in window) });
      let player = new Player("#canvas1");
      const fileData1 = await downloader.get(
        "//fstatic.cat1314.com/uc/svga/2b574a7164df3efa626d2a079935ed8a_1611383302.svga"
      );
      let svgaData1 = await parser.do(fileData1);
      player.set({
        fillMode: "forwards",
        noExecutionDelay: true,
      });
      await player.mount(svgaData1);
      player.start();
    },

    async handleBallSvga () {
      this.showGenerateSvga = true
      this.$nextTick(async () => {
        const downloader = new Downloader();
        const parser = new Parser({ disableWorker: !("Worker" in window) });
        let player = new Player("#middleSvga");
        const fileData1 = await downloader.get(
          "//fstatic.cat1314.com/uc/svga/5f2d8985e308063be8436de332201d20_1611029019.svga"
        );
        let svgaData1 = await parser.do(fileData1);
        player.set({
          fillMode: "forwards",
          noExecutionDelay: true,
        });
        await player.mount(svgaData1);
        player.start();
      })
    },

    goHomepage (uid) {
      if (uid) {
        callApp.userInfo(uid);
      }
    },

    async handleSayHello () {
      let res = await sayHello();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        toast(this.greetings.msg);
      } else {
        toast(response_status.error);
      }
    },

    showRelieveCpDialog () {
      if (this.popup.type && this.popup.type == "cancelCouple") {
        this.cancelCpMailId = this.popup.data.mail_id;
        this.showIsRelieveCp = true;
        return;
      }
      this.showRelieveCp = true;
    },

    getBrHtml (text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    async handleTestContract () {
      // Todo 時間限制
      if (!this.userInfo.cp_uid) {
        toast(this.lang.cp_can_get_engine)
        return
      }
      let res = await cooperateClick();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        //this.$store.commit("changeTestStep", 2);
        this.$store.dispatch("initData");
      } else {
        toast(response_status.error);
      }
    },
  },
};
</script>

<style lang="scss">
.middle {
  width: 7.32rem;
  height: 7.21rem;
  background: url('../img/home_middle_bg.png') 0/100% 100% no-repeat;
  margin: 0 auto;
  position: relative;
  padding-top: 0.6rem;
  box-sizing: border-box;
  .middle_tape {
    width: 3.46rem;
    height: 1.41rem;
    position: absolute;
    left: -0.09rem;
    top: -0.27rem;
  }
  .cp__box {
    position: relative;
    display: flex;
    justify-content: center;
    .cp_left,
    .cp_right {
      width: 1.89rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .nick {
        width: 100%;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.24rem;
        font-weight: 300;
        color: #ffefbf;
        margin-top: 0.17rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
      }
      .select_btn {
        width: 1.89rem;
        height: 0.45rem;
        background: url('../img/select_btn.png') 0/100% 100% no-repeat;
        margin-top: 0.06rem;
        line-height: 0.45rem;
        text-align: center;
        font-size: 0.24rem;
        font-weight: 300;
        color: #ffefbf;
      }
    }
    .cp_middle {
      width: 2.44rem;
      // height: 0.69rem;
      // background: url("../img/cp_heart.png") 0/100% 100% no-repeat;
      position: relative;
      margin-left: -0.2rem;
      margin-right: -0.2rem;
      margin-top: 0.48rem;
      .heart {
        width: 2.44rem;
        height: 0.69rem;
        // background: url("../img/cp_heart.png") 0/100% 100% no-repeat;
      }
      .intimacy {
        font-size: 0.22rem;
        font-weight: 300;
        color: #ffffff;
        opacity: 0.6;
        text-align: center;
        margin-top: -0.15rem;
      }
      .intimacy_value {
        text-align: center;
        font-size: 0.4rem;
        font-weight: bold;
        color: #fa8fc6;
      }
    }
    // .cp_right {
    //   width: 1.89rem;
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    // }
    .avatar__box {
      width: 1.65rem;
      height: 1.64rem;
      background: url('../img/avatar_bg.png') 0/100% 100% no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      .avatar {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }
      .add__img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background: #36168A;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.35rem;
          height: 0.35rem;
        }
      }
    }
  }

  .select_des {
    height: 0.2rem;
    font-size: 0.2rem;
    font-weight: 300;
    color: #ffffff;
    line-height: 0.2rem;
    margin-top: 0.42rem;
    text-align: center;
  }
  .say_hello__box {
    position: relative;
    margin-top: 0.21rem;
    .btn {
      width: 1.78rem;
      height: 0.56rem;
      background: url('../img/say_hello_bg.png') 0/100% 100% no-repeat;
      margin: 0 auto;
      font-size: 0.26rem;
      font-weight: 500;
      color: #ffffff;
      line-height: 0.56rem;
      text-align: center;
    }
    .relieve {
      font-size: 0.2rem;
      font-weight: 300;
      text-decoration: underline;
      color: #af74ff;
      position: absolute;
      bottom: 0;
      right: 0.7rem;
    }
  }

  .soul_contract__box {
    width: 6.62rem;
    height: 2.83rem;
    background: url('../img/soul_contract_bg.png') 0/100% 100% no-repeat;
    position: absolute;
    bottom: 0.64rem;
    left: 50%;
    transform: translateX(-50%);
    .title {
      height: 0.58rem;
      line-height: 0.58rem;
      font-size: 0.3rem;
      font-weight: 500;
      color: #ffefbf;
      text-align: center;
    }
    .contract_des_1 {
      padding-left: 0.27rem;
      padding-top: 0.4rem;
      font-size: 0.22rem;
      font-weight: 300;
      color: #ffbff5;
    }
    .contract_des_2 {
      padding-left: 0.27rem;
      padding-right: 0.29rem;
      padding-top: 0.1rem;
      font-size: 0.22rem;
      font-weight: 300;
      line-height: 0.28rem;
      color: #ffbff5;
    }
    .test_time {
      position: absolute;
      bottom: 0.12rem;
      left: 0.27rem;
      font-size: 0.22rem;
      font-weight: 300;
      color: #ffefbf;
    }
    .test__box {
      width: 0.86rem;
      height: 0.86rem;
      position: absolute;
      bottom: 0;
      right: 0.29rem;
      img {
        width: 0.86rem;
        height: 0.86rem;
      }
      span {
        display: block;
        white-space: nowrap;
        min-width: 1.2rem;
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -0.22rem;
        line-height: 0.22rem;
        height: 0.22rem;
        font-size: 0.22rem;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.7;
        white-space: normal;
      }
    }

    .generate__svga {
      width: 2.87rem;
      height: 2.77rem;
      // background: red;
      // margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .result_generate {
      font-size: 0.22rem;
      font-weight: 300;
      color: #ffefbf;
      position: absolute;
      bottom: 0;
      left: 4.74rem;
    }

    .test_result {
      height: 0.27rem;
      font-size: 0.28rem;
      font-weight: 400;
      color: #ffffff;
      line-height: 0.27rem;
      margin-top: 0.25rem;
      display: inline-block;
      .num {
        color: #ffefbf;
        font-size: 0.36rem;
        padding-left: 0.14rem;
      }
    }
    .tacit_agree {
      @extend .test_result;
      margin-left: 0.41rem;
    }
    .magic_engine {
      @extend .test_result;
      margin-left: 0.88rem;
    }
    .result_text {
      width: 5rem;
      font-size: 0.22rem;
      font-weight: 300;
      color: #ffbff5;
      margin: 0.35rem auto 0 auto;
      text-align: center;
    }
  }
}
</style>
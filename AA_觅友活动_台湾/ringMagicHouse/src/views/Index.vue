<template>
  <div class="home__container">
    <Header />
    <Middle />
    <Footer />

    <!-- 入场弹框 -->
    <AdmissionDialog :visible.sync="showAdmission" v-if="showAdmission" />

    <!-- 邀请弹框 -->
    <InviteDialog :visible.sync="showInvite" v-if="showInvite" />

    <!-- 解除关系 -->
    <IsRelieveCpDialog
      :visible.sync="showIsRelieveCp"
      :mailId="cancelCpMailId"
      v-if="showIsRelieveCp"
    />

    <!-- 强制解除cp后的提示弹框 -->
    <RelieveDesDialog :visible.sync="showRelieveDes" v-if="showRelieveDes" />

    <!-- 製作戒指弹框 -->
    <MakeRingDialog :visible.sync="showMakeRing" :info="makeRingInfo" v-if="showMakeRing" />

    <!-- 合成戒指成功弹框 -->
    <GetRingDialog :visible.sync="showGetRing" :info="popup" v-if="showGetRing" />
  </div>
</template>

<script>
import Header from "../components/Header";
import Middle from "../components/Middle";
import Footer from "../components/Footer";
import AdmissionDialog from "../components/AdmissionDialog";
import InviteDialog from "../components/InviteDialog";
import IsRelieveCpDialog from "../components/IsRelieveCpDialog";
import RelieveDesDialog from "../components/RelieveDesDialog";
import MakeRingDialog from '../components/MakeRingDialog'
import GetRingDialog from '../components/GetRingDialog'
import { loadImages } from "../utils";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",

  components: {
    Header,
    Middle,
    Footer,
    AdmissionDialog,
    InviteDialog,
    IsRelieveCpDialog,
    RelieveDesDialog,
    MakeRingDialog,
    GetRingDialog
  },

  data() {
    return {
      showAdmission: false,
      showInvite: false,
      showIsRelieveCp: false,
      showRelieveDes: false,
      showMakeRing: false,
      showGetRing: false,
      cancelCpMailId: "",
      makeRingInfo:{}
    };
  },

  computed: {
    ...mapState(["initData", "loading"]),
    ...mapGetters(["popup"]),
  },

  watch: {
    popup: {
      handler(val) {
        if (Reflect.has(val, "type")) {
          this.handlePopup();
        }
      },
      deep: true,
      immediate: true,
    },
  },

  created() {
     this.$store.dispatch("initData");
  },

  mounted() {
    loadImages(
      require("../img/admission_dialog_bg.png"),
      require("../img/dialog_bg.png"),
      require("../img/mini_dialog_bg.png"),
      require("../img/ring_dialog_bg.png")
    );
  },

  methods: {
    handlePopup() {
      let { type, data } = this.popup;
      if (type == "firstVisit") {
        this.showAdmission = true;
      } else if (type == "invited") {
        this.showInvite = true;
      } else if (type == "cancelCouple") {
        this.cancelCpMailId = data.mail_id;
        this.showIsRelieveCp = true;
      } else if (type == "dissolvedCp") {
        this.showRelieveDes = true;
      } else if (type == "energyFull") {
        this.makeRingInfo = data
        this.showMakeRing = true;
      } else if(type == 'finishCompleteRingBeforeCP' || type == 'finishCompleteRingAfterCP') {
        this.showGetRing = true
      }
    },
  },
};
</script>

<style lang="scss">
.home_padding {
  // padding-bottom: 170px;
}
.home__container {
  background: RGBA(42, 16, 97, 1);
  width: 100%;
  position: relative;
}
</style>

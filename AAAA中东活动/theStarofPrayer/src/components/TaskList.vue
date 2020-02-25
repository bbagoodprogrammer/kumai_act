<template>
  <div class="tasks">
    <div class="taskItem">
      <div class="taskNam">
        <div class="name">التسجيل كل يوم</div>
        <div class="score"> +10 فول ذهي</div>
      </div>
      <span class="canBtn" v-if="taskState.sign && taskState.sign.is_finish ===0" @click="sing()">التسجيل</span>
      <span class="complete" v-if="taskState.sign && taskState.sign.is_finish === 1">إكمال</span>
    </div>
    <div class="taskItem">
      <div class="taskNam">
        <div class="name">تبقى في غرفة الغناء 15 دقيقة كل يوم</div>
        <div class="score"> +20 فول ذهي</div>
      </div>
      <span class="noComplete" v-if="taskState.online && taskState.online.is_finish === 0">{{taskState.online.finish_count}}/{{taskState.online.task_count}}</span>
      <span class="complete" v-if="taskState.online && taskState.online.is_finish === 1">إكمال</span>
    </div>
    <div class="taskItem">
      <div class="taskNam">
        <div class="name">نشر عمل كل يوم</div>
        <div class="score"> +30 فول ذهي</div>
      </div>
      <span class="noComplete" v-if="taskState.publicWork&& taskState.publicWork.is_finish === 0">{{taskState.publicWork.finish_count}}/{{taskState.publicWork.task_count}}</span>
      <span class="complete" v-if="taskState.publicWork && taskState.publicWork.is_finish === 1">إكمال</span>
    </div>
    <div class="taskItem">
      <div class="taskNam">
        <div class="name">إهداء الهدايا بقيمة 50 عملة الإجمالية كل يوم</div>
        <div class="score"> +40 فول ذهي</div>
      </div>
      <span class="noComplete" v-if="taskState.sendCoins && taskState.sendCoins.is_finish === 0">{{taskState.sendCoins.finish_count}}/{{taskState.sendCoins.task_count}}</span>
      <span class="complete" v-if="taskState.sendCoins && taskState.sendCoins.is_finish === 1">إكمال</span>
    </div>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
  </div>
</template>

<script>
import { mapState } from "vuex"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
export default {
  components: { MsgToast },
  data() {
    return {
      tastMsg: "",
      showT: false
    }
  },
  computed: {
    ...mapState(['taskState', 'isShare', 'activeityState']),
  },
  methods: {
    sing() {//签到
      if (this.isShare) {
        APP()
        return
      } else if (this.activeityState === 0) {
        this.tastMsg = "لم يبدأ النشاط!"
        this.showT = true
      } else if (this.activeityState === 2) {
        this.tastMsg = "انتهى النشاط!"
        this.showT = true
      } else {
        api.sing().then((res) => {
          if (res.data.response_status.code === 0) {
            this.$store.commit('setSignInState')
          }
        })
      }
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>

<style lang="scss">
.tasks {
  margin-top: -0.2rem;
  .taskItem {
    width: 6.48rem;
    // height: .82rem;
    padding: 0 0.46rem 0.05rem 0;
    background: url(../assets/img/taskListItemBg.png);
    background-size: 100% 100%;
    margin: 0.1rem auto;
    display: flex;
    align-items: center;
    .taskNam {
      width: 4.8rem;
      .name {
        color: #fff8ab;
      }
      .score {
        color: #3effd4;
      }
    }
    .canBtn {
      width: 1.56rem;
      height: 0.6rem;
      background: url(../assets/img/colude.png);
      background-size: 100% 100%;
      text-align: center;
      color: #914800;
      font-weight: bold;
      line-height: 0.6rem;
      font-size: 80%;
    }
    .noComplete {
      width: 1.64rem;
      height: 0.68rem;
      background: url(../assets/img/nocomplete.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.72rem;
    }
    .complete {
      width: 1.64rem;
      height: 0.68rem;
      background: url(../assets/img/nocomplete.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.72rem;
      color: #daaeff;
      font-weight: bold;
    }
  }
}
</style>
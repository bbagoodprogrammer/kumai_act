<template>
  <div class="task">
    <div class="interaction">{{ lang.intimate_interaction }}</div>
    <div class="inter_des">{{ lang.intimate_inter_des }}</div>
    <ul>
      <li class="task__item" v-for="(item, index) in taskList" :key="index">
        <img class="fire" src="../img/fire.png" />
        <div class="middle_info">
          <div class="title">
            <span v-if="item.taskName == 'whisper'">{{
              lang.task_title_1
            }}</span>
            <span v-if="item.taskName == 'joinmic'">{{
              lang.task_title_2
            }}</span>
            <span v-if="item.taskName == 'joinmicOnline'">{{
              lang.task_title_3
            }}</span>
            <span v-if="item.taskName == 'dailyNews'">{{
              lang.task_title_4
            }}</span>
          </div>
          <div class="score">
            <div>+{{ item.score }}</div>
            <div v-if="item.taskName == 'joinmicOnline'" class="liner">
              <div class="process" :style="{width: handleWidth(item.totalOnline, item.online)}"></div>
            </div>
            <div v-if="item.taskName == 'joinmicOnline'" class="time">{{getProcessTime(item.totalOnline)}}</div>
          </div>
        </div>
        <div
          class="task__btn"
          :class="{
            receive__btn: item.receive == 1,
            finish__btn: item.receive == 2,
          }"
          @click="handleClickBtn(item)"
        >
          <template v-if="item.receive == 0">
            <span v-if="item.taskName == 'whisper'">{{ lang.go_exciting }}</span>
            <span v-if="item.taskName == 'joinmic'">{{ lang.go_sleep }}</span>
            <span v-if="item.taskName == 'joinmicOnline'">{{ lang.go_sleep }}</span>
            <span v-if="item.taskName == 'dailyNews' && item.isAllowVersion == 0">{{ lang.go_record }}</span>
          </template>
          <template v-if="item.receive == 1">{{
            lang.receive_engine
          }}</template>
          <template v-if="item.receive == 2">{{ lang.finished }}</template>
        </div>
      </li>
    </ul>

    <div class="task_des">{{ lang.task_des }}</div>

    <div class="gift__box">
      <div class="fell_up">{{ lang.fell_up }}</div>
      <div class="get_gift">{{ lang.get_gift_get_engine }}</div>
      <ul class="gift">
        <li class="gift__item" v-for="item in list" :key="item.index">
          <div class="img__box">
            <img :src="require(`../img/gift_${item.index}.png`)" />
          </div>
          <div class="title">{{lang[`gift_title_${item.index}`]}}</div>
          <div class="score">{{lang.gift_get_score.replace('%s', item.num)}}</div>
        </li>
      </ul>
      <div class="gift_des" v-html="getBrHtml(lang.gift_des)"></div>
    </div>
    <div class="explain">{{ lang.act_explain }}</div>
  </div>
</template>

<script>
import { toast } from "../utils/index";
import callApp from "../utils/callApp";
import { finishTheTask } from "../apis/index";
import { mapGetters } from "vuex";
export default {
  name: 'Task',
  
  data() {
    return {
      list: [
        {
          index: 1,
          num: 100
        },
        {
          index: 2,
          num: 520
        },
        {
          index: 3,
          num: 3999
        },
      ]
    };
  },

  computed: {
    ...mapGetters(["taskList", "userInfo"]),
  },

  methods: {
    async handleClickBtn(item) {
      if (!this.userInfo.cp_uid) {
        toast(this.lang.cp_can_get_engine)
        return
      }
      if (item.receive == 0) {
        if (item.taskName == 'whisper' && this.userInfo.cp_uid) {
          // 跳转到私讯
          callApp.chat(this.userInfo.cp_uid)
        } else if((item.taskName == 'joinmic' || item.taskName == 'joinmicOnline') && item.to_rid) {
          // 跳转到房间
          callApp.room(item.to_rid)
        } else if(item.taskName == 'dailyNews') {
          // 跳转到话题页
          callApp.topic(item.tpId)
        }

      }
      if (item.receive == 1) {
        let res = await finishTheTask({task_name: item.taskName});
        let { response_status, response_data } = res.data;
        if (response_status.code === 0) {
          toast(this.lang.receive_success);
          item.receive = 2
        } else {
          toast(response_status.error);
        }
      }
    },

    getProcessTime (totalOnline) {
      let num = Math.floor(totalOnline / 60)
      return this.lang.process_time.replace('%s', num)
    },

    handleWidth (totalOnline, online) {
      totalOnline = +totalOnline
      online = +online
      if (totalOnline == 0) {
        return '0%'
      }
      if (totalOnline >= online) {
        return '100%'
      }
      return (totalOnline * 100 / online) + '%'
    },

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
.task {
  .interaction {
    height: 0.27rem;
    font-size: 0.28rem;
    font-weight: 500;
    color: #ffefbf;
    text-align: center;
    line-height: 0.27rem;
    padding-top: 0.2rem;
  }
  .inter_des {
    height: 0.2rem;
    font-size: 0.2rem;
    font-weight: 300;
    color: #b296ff;
    text-align: center;
    line-height: 0.2rem;
    padding-top: 0.15rem;
    padding-bottom: 0.1rem;
  }
  .task__item:last-child {
    border: 0;
  }
  .task__item {
    display: flex;
    margin-left: 0.56rem;
    margin-right: 0.5rem;
    padding-bottom: 0.13rem;
    padding-top: 0.22rem;
    border-bottom: 0.01rem solid rgba($color: #946dff, $alpha: 0.5);
    // background: red;
    .fire {
      width: 0.64rem;
      height: 0.76rem;
    }
    .middle_info {
      width: 3.88rem;
      padding-left: 0.2rem;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 0.22rem;
        font-weight: 400;
        color: #ffffff;
      }
      .score {
        font-size: 0.22rem;
        font-weight: 300;
        color: #ffefbf;
        flex: 1;
        display: flex;
        align-items: center;
        .liner {
          width: 2.03rem;
          height: 0.2rem;
          background: #7950e8;
          border-radius: 0.1rem;
          margin-left: 0.2rem;
          overflow: hidden;
          .process {
            // width: 2.03rem;
            height: 0.2rem;
            background: #ffefbf;
            // border-radius: 0.1rem;
            border-top-right-radius: 0.1rem;
            border-bottom-right-radius: 0.1rem;
            box-sizing: border-box;
          }
        }
        .time {
          font-size: 0.22rem;
          font-weight: 300;
          color: #b296ff;
        }
      }
    }
    .task__btn {
      width: 1.52rem;
      height: 0.6rem;
      background: url("../img/go_finish_btn.png") 0/100% 100% no-repeat;
      text-align: center;
      line-height: 0.6rem;
      font-size: 0.24rem;
      font-weight: 500;
      color: #ffffff;
      margin-top: 0.22rem;
    }
    .receive__btn {
      background: url("../img/receive_engine_btn.png") 0/100% 100% no-repeat;
    }
    .finish__btn {
      background: url("../img/finished_btn.png") 0/100% 100% no-repeat;
    }
  }

  .task_des {
    height: 0.23rem;
    font-size: 0.22rem;
    font-weight: 300;
    color: #8afffb;
    text-align: center;
    margin-top: 0.2rem;
  }

  .gift__box {
    width: 6.82rem;
    height: 4.5rem;
    background: linear-gradient(
      180deg,
      rgba($color: #5c24f1, $alpha: 0.3) 20%,
      rgba($color: #8d3cff, $alpha: 0.3) 100%
    );
    border-radius: 0.1rem;
    margin: 0.4rem auto 0.28rem auto;
    .fell_up {
      text-align: center;
      height: 0.26rem;
      font-size: 0.28rem;
      font-weight: 500;
      color: #ffefbf;
      padding-top: 0.28rem;
      padding-bottom: 0.12rem;
    }
    .get_gift {
      text-align: center;
      // height: 0.22rem;
      font-size: 0.22rem;
      font-weight: 300;
      color: #b296ff;
    }
    .gift {
      display: flex;
      justify-content: center;
      margin-top: 0.26rem;
      .gift__item {
        width: 2.2rem;
        text-align: center;
        .img__box {
          width: 1.44rem;
          height: 1.47rem;
          margin-left: 0.38rem;
          background: url("../img/gift_img_box.png") 0/100% 100% no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 1.4rem;
            height: 1.4rem;
          }
        }
        .title {
          line-height: 0.22rem;
          height: 0.22rem;
          font-size: 0.22rem;
          font-weight: 400;
          color: #ffffff;
          padding-top: 0.11rem;
        }
        .score {
          line-height: 0.22rem;
          height: 0.22rem;
          font-size: 0.22rem;
          font-weight: 300;
          color: #b296ff;
          padding-top: 0.07rem;
        }
      }
    }
    .gift_des {
      padding-top: 0.2rem;
      text-align: center;
      font-size: 0.22rem;
      font-weight: 300;
      color: #ffefbf;
    }
  }
  .explain {
    text-align: center;
    padding-bottom: 0.3rem;
    font-size: 0.22rem;
    font-weight: 300;
    color: #7540bf;
  }
}
</style>
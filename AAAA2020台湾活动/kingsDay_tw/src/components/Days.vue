<template>
  <div class="days">
    <div class="dayItem">
      <span v-for="(item,index) in date_line" :key="index" :class="{act:actIndex==index,over:index < current_index}" @click="changDay(index)">
        {{getDay(item)}}
        <i class="red" v-if="index == current_index && isRed"></i>
      </span>
    </div>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import getDate from "../utils/getDate"
import MsgToast from "../components/commonToast"
export default {
  components: { MsgToast },
  data() {
    return {
      actIndex: null,
      tastMsg: '',
      showT: false
    }
  },
  watch: {
    current_index(val) {
      this.actIndex = val
    }
  },
  computed: {
    ...mapState(['date_line', 'current_date', 'current_index', 'giftGroups']),
    isRed() {
      if (this.giftGroups[this.current_index]) {
        let nowDayTask = this.giftGroups[this.current_index]
        let status = false
        if (nowDayTask.top_mission.status == 1) {
          status = true
        } else {
          nowDayTask.missions.forEach(element => {
            if (element.status == 1) {
              status = true
            }
          });
        }
        return status
      }
    }
  },
  methods: {
    changDay(val) {
      if (val > this.current_index) {
        this.tastMsg = this.lang.dayNoOpen
        this.showT = true
      } else if (!this.giftGroups[val] && val <= this.current_index) {
        this.actIndex = val
        this.vxc('setTab_index', val)
        this.vxc('setDayLoading', true)
        api.getDaysTask(this.date_line[val]).then(res => {
          this.vxc('setDayLoading', false)
          this.vxc('updateRankGroups', {
            key: val,
            top_mission: res.data.response_data.top_mission,
            missions: res.data.response_data.missions,
            loading: false
          })
        })
      } else {
        this.actIndex = val
        this.vxc('setTab_index', val)
      }
    },
    getDay(day) {
      let data = new Date(day).getTime()
      return getDate(new Date(data), '~')
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss" scoped>
.days {
  width: 1.4rem;
  background: rgba(255, 131, 127, 1);
  border-radius: 0.2rem;
  margin-right: 0.15rem;
  position: relative;
  // z-index: 10;
  span {
    display: block;
    height: 1.13rem;
    text-align: center;
    line-height: 1.13rem;
    color: #ffeac0;
    font-weight: 700;
    box-sizing: border-box;
    border-bottom: 0.02rem solid #ffc3c1;
    position: relative;
    .red {
      display: block;
      width: 0.12rem;
      height: 0.12rem;
      background: rgba(255, 0, 84, 1);
      border-radius: 50%;
      position: absolute;
      right: 0.25rem;
      top: 0.35rem;
    }
    &.over {
      color: #cd4645;
    }
    &.act {
      background: #ffce6c;
    }
  }
  .dayItem {
    span:first-child {
      border-radius: 0.2rem 0.2rem 0 0;
    }
    span:last-child {
      border: none;
      border-radius: 0px 0px 0.2rem 0.2rem;
    }
  }
}
</style>

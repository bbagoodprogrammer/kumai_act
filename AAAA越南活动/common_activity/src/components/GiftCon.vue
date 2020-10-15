<template>
  <div>
    <div class="tabs">
      <span class="tasks" :class="{act:showCom == 'Task'}" @click="tabClick('Task')">{{lang.task}}</span>
      <span class="convertibility" :class="{act:showCom == 'Convertibility'}" @click="tabClick('Convertibility')">
        {{lang.convertibility}}
        <i class="red" v-if="isRed ==1 "></i>
      </span>
    </div>
    <keep-alive>
      <component :is="showCom"></component>
    </keep-alive>
  </div>
</template>
<script>
import Convertibility from "../components/Convertibility"
import Task from "../components/Task"
import api from "../api/apiConfig"
import { mapState } from "vuex"
export default {
  components: { Convertibility, Task },
  data() {
    return {
      showCom: 'Task',
      first: true
    }
  },
  computed: {
    ...mapState(['exchange_status', 'exchange_configs', 'user_info']),
    isRed() {
      if (this.exchange_configs && this.exchange_configs.length > 0) {
        let status = 0
        this.exchange_configs.forEach(element => {
          if (this.user_info.chips >= element.cost && element.exchanged_count != element.limit) {
            status = 1
          }
        });
        return status
      } else {
        return this.exchange_status
      }
    }
  },
  methods: {
    tabClick(val) {
      this.showCom = val
      if (val == 'Convertibility' && this.first) {
        api.revGiftMsg().then(res => {
          this.first = false
          this.vxc('setExchange_configs', res.data.response_data.exchange_configs)
        })
      }
    }
  }
}
</script>
<style lang= "scss" scoped>
.tabs {
  width: 6.88rem;
  height: 0.98rem;
  background: url(../assets/img/tabs.png) no-repeat;
  background-size: contain;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 0.05rem;
  span {
    width: 3.66rem;
    height: 0.9rem;
    text-align: center;
    line-height: 0.9rem;
    font-weight: 700;
    font-size: 0.36rem;
    position: relative;
    &.act {
      background: url(../assets/img/actTab.png);
      background-size: 100% 100%;
    }
    .red {
      display: block;
      width: 0.12rem;
      height: 0.12rem;
      background: rgba(255, 0, 84, 1);
      border-radius: 50%;
      position: absolute;
      left: 2.2rem;
      top: 0.25rem;
    }
  }
}
</style>

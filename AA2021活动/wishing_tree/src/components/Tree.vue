<template>
  <div class="tree" :class="{bg:!banner_tree_svga}">
    <canvas id="banner_tree" v-show="banner_tree_svga"></canvas>
    <span id="lottie"></span>
    <span class="ball" :class="[{move:item.move,can:item.suc && !item.move},'ball' + index]" v-for="(item,index) in newObj" :key="index" @click="showCarrotAnim(index)">
      <em :class="{act:!item.get && item.suc}">+{{item.chance}}</em>
      <span class="ballTips">{{item.suc?lang.c_get:`${lang.task} ${index}`}}</span>
    </span>
    <span class="ball ball6" :class="{move:score_move}" @click="getScore()" v-if="score">
      <em>+{{score}}</em>
      <span class="ballTips">{{lang.giving}}</span>
    </span>
    <div class="mask" v-show="showPup">
      <transition name="slide">
        <div class="taskPup" v-if="showPup">
          <i class="close" @click="showPup = false"></i>
          <div class="title">{{lang.task}}{{act_index}}</div>
          <div class="taskName" v-html="schule[act_index].desc.replace(',','<br/>')">
          </div>
          <div class="taskScore">+{{schule[act_index].chance}}{{lang.getScore}}</div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>

import { mapState } from "vuex"
import { getTask } from "../apis"
import { globalBus } from '../utils/eventBus'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      newObj: {},
      score_move: false,
      act_index: 1,
      showPup: false,
      ani: false,
      banner_tree_svga: false
    }
  },
  watch: {
    schule(val) {
      for (let item in val) {
        if (!val[item].get) {
          this.$set(this.newObj, item, val[item])
          this.newObj[item].move = false
        }
      }
    }
  },
  computed: {
    ...mapState(['schule', 'score']),
  },
  methods: {
    showCarrotAnim(index) {
      this.$parent.$refs.scorll.onRefresh()
      if (this.ani) {
        return
      }
      globalBus.$emit('commonEvent', () => {
        this.ani = true
        if (this.newObj[index].suc) {
          getTask(index).then(res => {
            this.ani = false
            // this.vxc('addScore', this.newObj[index].chance)
            if (res.data.response_status.code == 0) {
              this.newObj[index].move = true
              this.$forceUpdate();
              setTimeout(() => {
                this.$parent.$refs.scorll.onRefresh()
              }, 1000)
            } else {
              this.toast(res.data.response_status.error)
            }
          })
        } else {
          this.ani = false
          this.showPup = true
          this.act_index = index
        }
      })
    },
    getScore() {
      globalBus.$emit('commonEvent', () => {
        getTask(6).then(res => {
          this.ani = false
          if (res.data.response_status.code == 0) {
            // this.vxc('addScore', this.score)
            this.score_move = true
            setTimeout(() => {
              this.$parent.$refs.scorll.onRefresh()
            }, 1000)
          } else {
            this.toast(res.data.response_status.error)
          }

        })
      })

    }
  }
}
</script>
<style lang="scss" scoped>
#lottie {
  display: block;
  width: 1rem;
  height: 1rem;
  position: absolute;
  left: 2.2rem;
  top: 2rem;
  opacity: 0;
}
.tree,
#banner_tree {
  width: 5.34rem;
  height: 5.13rem;
  margin: 0 auto;
  position: relative;
  &.bg {
    background: url(../img/tree.png);
    background-size: 100% 100%;
  }

  .ball {
    width: 0.93rem;
    height: 0.93rem;
    position: absolute;
    background: url(../img/ball_bg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.can {
      animation: translateY 1.5s linear infinite alternate;
    }

    em {
      font-size: 0.32rem;
      font-weight: bold;
      color: rgba(234, 105, 135, 0.6);
      &.act {
        color: rgba(234, 105, 135, 1);
      }
    }
    &.ball1 {
      top: 0.88rem;
      left: -0.55rem;
    }
    &.ball2 {
      top: -0.47rem;
      left: 0.03rem;
    }
    &.ball3 {
      top: -1.31rem;
      left: 1.44rem;
    }
    &.ball4 {
      top: -1.31rem;
      left: 3.15rem;
    }
    &.ball5 {
      top: -0.47rem;
      left: 4.55rem;
    }
    &.ball6 {
      top: 0.88rem;
      left: 5.18rem;
    }
    &.move {
      transition: all 1s ease-out;
      opacity: 0;
      transform: scale(0.5);
      left: 2.2rem;
      top: 2rem;
    }
  }
  .ballTips {
    display: block;
    width: 1.5rem;
    text-align: center;
    position: absolute;
    bottom: -0.4rem;
    font-size: 0.22rem;
    color: rgba(234, 105, 135, 1);
  }
}
.taskPup {
  width: 5.84rem;
  height: 4.5rem;
  background: url(../img/taskPup_bg.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    text-align: center;
    height: 1.81rem;
    line-height: 1.81rem;
    font-size: 0.36rem;
    font-weight: 600;
    color: rgba(145, 77, 68, 1);
  }
  .taskName {
    padding: 0 0.6rem;
    text-align: center;
    color: rgba(145, 77, 68, 1);
  }
  .taskScore {
    margin: 0.3rem auto;
    text-align: center;
    color: rgba(234, 105, 135, 1);
    font-size: 0.28rem;
  }
}
.close {
  display: block;
  width: 0.7rem;
  height: 0.7rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -0.6rem;
  left: 2.43rem;
}
</style>

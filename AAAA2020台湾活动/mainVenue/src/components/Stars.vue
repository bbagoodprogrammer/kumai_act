<template>
  <div class="left">
    <div class="universe">
      <div class="starItem" v-for="(item,index) in starsArr" :key="index" :class="[{ani:aning},'start' +item.ainIndex]" @click="starClick(index)">
        {{item.name}}
      </div>
    </div>
    <div class="itemTop" :class="'list'+showList.act_id">
      <div class="list" v-for="(item,index) in showList.list " :key="index">
        <div class="imgBox">
          <img v-lazy="item.avatar" alt="">
        </div>
        <strong>{{item.nick}}</strong>
      </div>
    </div>
  </div>

</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
export default {
  data() {
    return {
      aning: false,
      starsArr: [],
      timer: null,
      act_index: 0,
      defaultList:
      {
        act_id: null,
        list: [
          {
            "uid": "100861",
            "avatar": "",
            "nick": "虚位以待",
            "rank": 1
          },
          {
            "uid": "100861",
            "avatar": "",
            "nick": "虚位以待",
            "rank": 2
          },
          {
            "uid": "100861",
            "avatar": "",
            "nick": "虚位以待",
            "rank": 3
          }
        ]
      }

    }
  },
  computed: {
    ...mapState(['actList', 'data_list']),
    nowTopList() {
      console.log(this.data_list, this.act_index)
      return this.data_list[this.act_index]
    },
    showList() {
      if (this.nowTopList && this.nowTopList.length) {
        return this.nowTopList
      } else {
        this.defaultList.act_id = this.act_index
        return this.defaultList
      }
    }
  },
  watch: {
    actList(val) {
      let arr = JSON.parse(JSON.stringify(val))
      for (let i = 0; i < arr.length; i++) {
        arr[i].ainIndex = i
      }
      this.starsArr = arr
      this.aniTime(2000)
      this.aning = true
    }
  },
  methods: {
    starClick(index) {
      clearInterval(this.timer)
      // if (!this.aning) return
      this.aning = false
      let num = 0
      for (let i = index; i < 9; i++) {
        this.starsArr[i].ainIndex = num
        num++
      }
      for (let t = 0; t < index; t++) {
        this.starsArr[t].ainIndex = num
        num++
      }
      this.act_index = index
      console.log(index, this.data_list, this.data_list[this.act_index])
      if (!Array.isArray(this.data_list[this.act_index])) {
        api.getTabList(index).then(res => {
          let obj = {
            a_index: index,
            data_list: []  //res.data.response_data.list
          }
          this.vxc('setDataList', obj)
          setTimeout(() => {
            this.aning = true
            this.aniTime(2000)
          }, 3000)
        })
      } else {
        setTimeout(() => {
          this.aning = true
          this.aniTime(2000)
        }, 3000)
      }
    },
    aniTime(tm) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.starsArr.forEach(element => {
          if (element.ainIndex < 8) {
            element.ainIndex++
          } else {
            element.ainIndex = 0
          }
        });
      }, tm);
    }
  }
}
</script>
<style lang="scss" scoped>
.universe {
  position: relative;
  height: 10rem;
  .starItem {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    text-align: center;
    white-space: nowrap;
    &.ani {
      transition: all 1s ease;
    }
    &.start0 {
      width: 1.5rem;
      height: 1.5rem;
      top: 0;
      left: 3.1rem;
    }
    &.start1 {
      top: 2rem;
      left: 6rem;
    }
    &.start2 {
      top: 3.5rem;
      left: 5.8rem;
    }
    &.start3 {
      top: 5rem;
      left: 5.2rem;
    }
    &.start4 {
      top: 6.5rem;
      left: 4.1rem;
    }
    &.start5 {
      top: 6.5rem;
      left: 2rem;
    }
    &.start6 {
      top: 5rem;
      left: 1.2rem;
    }
    &.start7 {
      top: 3.5rem;
      left: 0.7rem;
    }
    &.start8 {
      top: 2rem;
      left: 0.5rem;
    }
  }
}
.itemTop {
  display: flex;
  align-items: center;
}
</style>

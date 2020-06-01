<template>
  <div class="marquee-wrap" v-show="lists.length > 0">
    <!-- 滚动内容 -->
    <div class="scroll">
      <p class="marquee" v-html="text"></p>
      <!-- 文字副本 -->
      <p class="copy" v-html="text"></p>
    </div>
    <!-- 为了计算总文本宽度，通过css在页面中隐藏 -->
    <p class="getWidth" v-html="text"></p>
  </div>
</template>

<script>
export default {
  props: ['lists'], // 父组件传过来的数组
  data() {
    return {
      timer: null,
      text: ''
    }
  },
  watch: {
    lists() {
      var that = this
      clearInterval(this.timer)
      setTimeout(function () {
        that.move()
      }, 500)
    }
  },
  methods: {
    move() {
      for (let item of this.lists) {
        var istype = 0
        item.prizes.forEach(element => {
          if (element.type == 'car') {
            istype = 1
          }
        });
        console.log(istype)
        if (istype == 1) {
          this.text += `${this.lang.gx}   <i>${item.uid}</i>   ${this.lang.get}  ${item.prizes[0].name} * ${item.prizes[0].num}  و  ${item.prizes[1].name}(${item.prizes[1].num} أيام) \xa0\xa0\xa0\xa0\xa0\xa0`
        } else {
          this.text += `${this.lang.gx}   <i>${item.uid}</i>   ${this.lang.get}  ${item.prizes[0].name} * ${item.prizes[0].num}  و  ${item.prizes[1].num} ${item.prizes[1].type == 'bean' ? 'فول' : 'عملات'}    \xa0\xa0\xa0\xa0\xa0\xa0`
        }
      }
      let maxWidth = document.querySelector('.marquee-wrap').clientWidth
      // 获取文字text 的计算后宽度 （由于overflow的存在，直接获取不到，需要独立的node计算）
      let width = document.querySelector('.getWidth').width
      // 如果文本内容的宽度小于页面宽度，则表示文字小于等于一行，则不需要滚动
      if (width <= maxWidth) return
      let scroll = document.querySelector('.scroll')
      let copy = document.querySelector('.copy')
      copy.innerText = this.text // 文字副本填充
      let distance = 0 // 位移距离
      // 设置位移
      this.timer = setInterval(() => {
        distance += 1
        // 如果位移超过文字宽度，则回到起点
        if (distance >= (copy.clientWidth * 2) - 123) {
          distance = +16 // 距离必须与marquee的margin宽度相同
        }
        scroll.style.transform = 'translateX(' + distance + 'px)'
      }, 30)
    }
  },
  beforeDestroy() {
    // 清除计时器
    clearInterval(this.timer)
  }
}
</script>
<style lang='scss'>
.marquee,
.copy,
.getWidth {
  em {
    margin: 0 0.15rem;
  }
}
.marquee-wrap {
  overflow: hidden;
  font-size: 80%;
  position: absolute;
  width: 4.07rem;
  padding: 0 0.2rem;
  height: 0.4rem;
  background: rgba(7, 0, 97, 0.45);
  border-radius: 0.2rem;
  top: 0.22rem;
  left: 0.3rem;
  .scroll {
    display: flex;
    p {
      word-break: keep-all; // 不换行
      white-space: nowrap;
      /* 设置前后间隔 */
      &.marquee {
        margin-right: 16px;
      }
      i {
        color: #fee68d;
        font-weight: 600;
      }
    }
  }
  /* 仅为了获取宽度，故隐藏掉 */
  .getWidth {
    word-break: keep-all; // 不换行
    white-space: nowrap;
    position: absolute;
    opacity: 0;
    top: 0;
  }
}
</style>
<template>
  <div class="text-box">
    <div style="-webkit-box-orient:vertical" :class="['txt', { 'over-hidden': !unfold }]" ref="textBox">
      <span ref="spanBox" v-html="content"></span>
    </div>
    <div class="btn" v-if="ifOver" @click="unfold = !unfold">{{unfold?lang.put:lang.all}}</div>
  </div>
</template>
<script>
export default {
  name: "text-box",
  data () {
    return {
      ifOver: false, // 文本是否超出三行，默认否
      unfold: false, // 文本是否是展开状态 默认为收起
      // content:'文本是否是展开状态 默认是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起是展开状态 默认为收起为收起',
    };
  },
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  mounted () {
    // 判断是否显示展开收起按钮
    this.ifOver = this.$refs.spanBox.offsetHeight > this.$refs.textBox.offsetHeight
  }
};
</script>
<style lang="scss">
.text-box {
  min-height: 0.76rem;
  margin-top: 0.28rem;
}
.over-hidden {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
}
// .over-hidden:after {
//   content: '...展开全部';
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   padding: 0 0 1px 0;
//   cursor: pointer;
//   background: #FFFFFF;
//   color: #3e7ac2;
// }
.txt {
  span {
    font-size: 0.26rem;
    line-height: 0.39rem;
    position: relative;
  }
}
.btn {
  font-size: 0.24rem;
  margin-top: 0.17rem;
}
</style>

<template>
  <div class="shoukuan">
    <!-- 头部公共搜索框 -->
    <div class="con">
      <van-cell-group>
        <van-field v-model="starttime" clearable placeholder="请输入开始时间" @focus="start" readonly="readonly" input-align="right" />
        <van-field v-model="endtime" clearable placeholder="请输入结束时间" @focus="end" readonly="readonly" input-align="right"/>
      </van-cell-group>
    </div>
    <!-- 开始时间控件 -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" @confirm="confirm" @cancel="cancel" :formatter="formatter" :confirm-button-text="query" :cancel-button-text="ggs" :visible-item-count="num" @change="change" readonly="readonly" />
    </van-popup>
    <!-- 结束时间控件 -->
    <van-popup v-model="show1" position="bottom">
      <van-datetime-picker v-model="currentDate1" type="datetime" :min-date="minDate" :max-date="maxDate" @confirm="confirm1" @cancel="cancel1" :formatter="formatter" :confirm-button-text="query" :cancel-button-text="ggs" :visible-item-count="num" readonly="readonly" />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "", //活动名称
      message: "", //活动详情
      show: false, //开始时间弹窗
      show1: false, //结束时间弹窗
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 12, 1),
      currentDate: new Date(), //开始标准时间
      currentDate1: new Date(), //结束标准时间
      starttime: "", //开始时间
      starttime1: "", //开始时间时间戳
      endtime: "", //结束时间
      endtime1: "", //结束时间时间戳
      query: "query",
      ggs: "end",
      num: 6
    };
  },
  mounted() { },
  methods: {
    // 选择开始时间
    start() {
      this.show = true;
    },
    // 选择结束时间
    end() {
      this.show1 = true;
    },
    change() {
      console.log(this)
    },
    // 点击确定
    confirm() {
      this.show = false;
      this.starttime =
        this.currentDate.getFullYear() +
        "year" +
        (Number(this.currentDate.getMonth()) + 1) +
        "month" +
        this.currentDate.getDate() +
        "day " +
        this.currentDate.getHours() +
        "shi" +
        this.currentDate.getMinutes() +
        "fen"
      this.starttime1 = new Date(this.currentDate).getTime() / 1000;
    },
    // 点击取消
    cancel() {
      this.show = false;
    },
    confirm1() {
      this.show1 = false;
      this.endtime =
        this.currentDate1.getFullYear() +
        "year" +
        (Number(this.currentDate1.getMonth()) + 1) +
        "month" +
        this.currentDate1.getDate() +
        "day " +
        this.currentDate1.getHours() +
        "shi" +
        this.currentDate1.getMinutes() +
        "fen"
      this.endtime1 = new Date(this.currentDate1).getTime() / 1000;
    },
    cancel1() {
      this.show1 = false;
    },
    // 处理控件显示的时间格式
    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}year`;
      } else if (type === "month") {
        return `${value}month`;
      } else if (type === "day") {
        return `${value}day`;
      } else if (type === "hour") {
        return `${value}hour`;
      } else if (type === "minute") {
        return `${value}fen`;
      }
      return value;
    },
  }
};
</script>

<style lang="scss">
body {
  direction: rtl;
}
.van-cell {
  padding: 0;
}
</style>
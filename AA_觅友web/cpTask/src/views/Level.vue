<template>
  <div class="level">
    <div class="title first">{{lang.cp_level_title_1}}</div>
    <div class="des">{{lang.cp_level_des_1}}</div>
    <ul>
      <li>
        <div class="item__title">{{lang.cp_level}}</div>
        <div class="item__value">{{lang.love_value}}</div>
      </li>
      <li v-for="(item,index) in 6" :key="index">
        <div class="item__title">{{lang[`cp_table_title_${item}`]}}</div>
        <div class="item__value">{{lang[`cp_table_value_${item}`]}}</div>
      </li>
    </ul>
    <div class="title">{{lang.cp_level_title_2}}</div>
    <div class="des">{{lang.cp_level_des_2}}</div>
    <div class="title title_vi">{{lang.cp_level_title_3}}</div>
    <div class="des">{{lang.cp_level_des_3}}</div>
  </div>
</template>

<script>
export default {
  name: 'Level',

  data() {
    return {
      list: []
    };
  },

  computed: {
    lang: () => _lang
  },

  created() {
    document.title = this.lang.cp_level
    this.list = [
      {
        title: this.lang.cp_level,
        value: this.lang.love_value
      },
      {
        title: this.lang.cp_table_title_1,
        value: this.lang.cp_table_value_100
      },
      {
        title: this.lang.cp_table_title_2,
        value: this.lang.cp_table_value_25
      },
      {
        title: this.lang.cp_table_title_3,
        value: this.lang.cp_table_value_20
      },
      {
        title: this.lang.cp_table_title_4,
        value: this.lang.cp_table_value_20
      },
      {
        title: this.lang.cp_table_title_5,
        value: this.lang.cp_table_value_20
      },
    ]
  }
};
</script>

<style lang="scss">
.level {
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  .title {
    height: 0.45rem;
    font-size: 0.32rem;
    font-weight: bold;
    line-height: 0.45rem;
    color: #333333;
    opacity: 1;
    padding-top: 0.66rem;
  }
  .first {
    padding-top: 0.4rem;
  }
  .des {
    font-size: 0.28rem;
    font-weight: 400;
    line-height: 0.4rem;
    color: #333333;
    opacity: 1;
    padding-top: 0.1rem;
  }
  ul {
    border: 0.01rem solid #F5F5F5;
    border-radius: 0.1rem;
    margin-top: 0.1rem
  }
  li{
    display: flex;
    height: 0.76rem;
    border-bottom: 0.01rem solid #F5F5F5;
    .item__title {
      width: 50%;
      text-align: center;
      font-size: 0.26rem;
      font-weight: 400;
      line-height: 0.76rem;
      color: #333333;
      opacity: 1;
    }
    .item__value {
      width: 50%;
      text-align: center;
      font-size: 0.24rem;
      font-weight: 400;
      line-height: 0.76rem;
      color: #666666;
      opacity: 1;
    }
  }
  li:first-child {
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    height: 0.88rem;
    background: #F0F0F0;
    opacity: 1;
    .item__title {
      line-height: 0.88rem;
      font-size: 0.28rem;
      font-weight: 400;
      color: #333333;
    }
    .item__value {
      font-size: 0.28rem;
      line-height: 0.88rem;
      color: #333333;
    }
  }
  li:last-child{
    border: none;
  }
}
</style>
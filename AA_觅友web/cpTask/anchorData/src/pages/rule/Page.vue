<template>
  <div class="rank">
    <div class="head">
      <i class="close_page" @click="closeWeb()"></i>
      <p>{{lang.title}}</p>
    </div>
    <ul class="tips">
      <li v-for="(item,i) in lang.tips" :key="i">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    document.title = this.lang.title;
  },
  computed: {},
  methods: {
    closeWeb(){
      var u = navigator.userAgent;
		  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			if (isAndroid) {
				window.JSInterface.closeWeb();
			} else {
				closeWeb();
			}
    }
  },
};
</script>

<style lang="scss">
body {
  background-color: #f2f2f2;
}
* {
  margin: 0;
  padding: 0;
}
.head {
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
  text-align: center;
  position: relative;
}
.head i {
  width: 0.88rem;
  height: 0.88rem;
  // background: url("../../img/back.png") center center no-repeat;
  background-size: 0.18rem 0.32rem;
  position: absolute;
  left: 0;
  top: 0;
}
.head p {
  font-size: 0.32rem;
  color: #111;
}
.tips {
  padding: 0.2rem 0.29rem 0.4rem;
}
.tips li {
  font-size: 0.26rem;
  color: #666;
  line-height: 0.48rem;
  list-style: none;
  font-family: PingFang SC;
}
</style>

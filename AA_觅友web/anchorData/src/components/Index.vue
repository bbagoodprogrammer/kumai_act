<template>
  <div class="page pageIndex">
		<div class="app_top" :style="{background:'#10093C',height:navigatorHeight}"></div>
		<!-- <div :style="{marginTop:navigatorHeight}"> -->
			<rank-groups />
		<!-- </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "../store";
import { getLangHtml, getTimeObj, getUrlString,getAppVer,getPlatform } from "../utils";
import {setFullScreen,setStatusBarStyle,getStatusBarHeight,callAppNew} from '../utils/navigation';
import RankGroups from '../components/RankGroups';
const uid = getUrlString("uid");
const token = getUrlString("token");

export default {
  data() {
    return {
      navigatorHeight:0,
      is_fix:false,
    };
  },
  computed: {
    ...mapState(["loading"])
  },
	created(){
		const pt = getPlatform();
		const ver = getAppVer();
		if ((pt == 'ios' && ver >= 165) || pt == 'android') {
			setFullScreen();
			this.navigatorHeight = getStatusBarHeight() + 'px'; 
		}
	},
  mounted() {
		// window.addEventListener('scroll', () => {
    //   let htmlFont= parseInt(document.documentElement.style.fontSize);
    //     let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
    //     if (top >= htmlFont*1.2) {
    //       this.is_fix = true;
    //     } else {
    //       this.is_fix = false;
    //     }
    // })
	},
  methods: {},
  components: {
    RankGroups,
  }
};
</script>

<style lang="scss">
.app_top{
  width: 100%;
  top: 0;
  &.app_top_fit{
    position: fixed;
    background-color: #10093C;
  }
}
</style>
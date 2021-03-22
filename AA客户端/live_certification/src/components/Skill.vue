<template>
  <div class="skill_con">
    <div class="skill_header"></div>
    <div class="title title1"></div>
    <div class="group1List">
      <div class="grpup1" v-for="(item,index) in group1" :key="index">
        <h5><i></i> {{item.title}} <i></i></h5>
        <div class="imgGroup">
          <span class="people" :class="'people' +item2" v-for="(item2,index2) in item.img" :key="index2"> </span>
        </div>
      </div>
    </div>
    <div class="title title2"></div>
    <div class="group2List">
      <div class="grpup1" v-for="(item,index) in group2" :key="index">
        <h5><i></i> {{item.title}} <i></i></h5>
        <div class="imgGroup">
          <span class="people" :class="'people' +item2" v-for="(item2,index2) in item.img" :key="index2"> </span>
        </div>
      </div>
    </div>
    <div class="title title3"></div>
    <div class="group3List">
      <h5 v-for="(item,index) in group3.title" :key="index"><i></i> <span>{{item}}</span> <i></i></h5>
      <div class="grpup1">
        <div class="imgGroup">
          <span class="people" :class="'people' +item" v-for="(item,index) in group3.img" :key="index"> </span>
        </div>
      </div>
    </div>
    <div class="title title4"></div>
    <div class="grpup4">
      <div class="imgGroup4" v-for="(item,index) in group4" :key="index">
        <span class="people" :class="'people' +item.img"> </span>
        <strong>{{item.name}}</strong>
      </div>
    </div>
    <div class="lastBottm">
      <div class="lastTips"></div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    group1 () {
      return this.lang.group1
    },
    group2 () {
      return this.lang.group2
    },
    group3 () {
      return this.lang.group3
    },
    group4 () {
      return this.lang.group4
    }
  }
}
</script>
<style lang="scss">
.skill_con {
  height: 34.5rem;
}
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
@media screen and (min-width: 750px) {
  #app {
    width: 750px;
    margin: 0 auto;
  }
}
#app {
  height: 100%;
  font-family: "San Francisco", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Noto Sans CJK", "Droid Sans", "Droid Sans Fallback", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif;
}
</style>

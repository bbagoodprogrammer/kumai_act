<template>
  <div class="page pageIndex">
    <div id="main">
      <div class="container">
        <div id="main1" v-if="count > 0">
          <div v-for="(item,index) in noticesSetTime" :key="index">
            <div v-if="item.cover_img == ''">
              <div class="section">
                <p class="time">{{item.active_time}}</p>
                <div class="con clearfix">
                  <div class="logo">
                    <img src="../img/logo2.png" alt="">
                  </div>
                  <div class="description">
                    <p class="title">{{item.title}}</p>
                    <pre class="pre1" v-html="replaceLang(item.content)"></pre>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="section_img">
                <p class="time">{{item.active_time}}</p>
                <div class="con">
                  <div class="banner" @click="jump(item)">
                    <img :src="item.cover_img" alt="">
                  </div>
                  <div class="des">
                    <div class="title title_one">{{item.title}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['notices', 'count']),
    noticesSetTime () {
      let arr = this.notices
      for (var i = 0; i < arr.length; ++i) {
        var ts = arr[i]['active_time']
        arr[i]['active_time'] = this.getLocalTime(ts)
      }
      return arr
    },
  },
  methods: {
    jump (item) {
      var expression = new RegExp('/(http|https):\/\/([\w.]+\/?)\S*/')
      if (expression.test(item.url)) {
        location.href = item.url
      } else {
        const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
        try {
          if (ios) {
            sendJsData(item.url);
          } else {
            javascript: JSInterface.sendJsData(item.url);
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    getLocalTime (t) {
      var time = new Date(parseInt(t) * 1000)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hour = time.getHours()
      var minute = time.getMinutes()
      month = month < 10 ? '0' + month : month
      date = date < 10 ? '0' + date : date
      hour = hour < 10 ? '0' + hour : hour
      minute = minute < 10 ? '0' + minute : minute
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
    },
  },
}
</script>

<style lang="scss">
body {
  font-size: 0.28rem;
  background: #f0f0f0;
  background-size: cover;
}
.pageIndex {
  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    color: #333;
  }
  .clearfix {
    *zoom: 1;
  }
  .clearfix:after {
    display: block;
    overflow: hidden;
    clear: both;
    height: 0;
    visibility: hidden;
    content: '.';
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  img {
    width: 100%;
  }
  $color: #7326ff;
  @mixin flex($jc, $ai) {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -webkit-justify-content: $jc;
    justify-content: $jc;
    -webkit-align-items: $ai;
    align-items: $ai;
  }
  #main {
    .container {
      padding: 0.4rem 0;
      .section {
        margin-bottom: 0.32rem;
        .time {
          color: #878787;
          font-size: 0.24rem;
          text-align: center;
          padding: 0 0 0.2rem 0;
          line-height: 1;
        }
        .con {
          padding: 0 0.28rem 0 0.3rem;
          .logo {
            width: 0.9rem;
            height: 0.9rem;
            float: left;
            margin-top: -0.12rem;
          }
          .description {
            width: 5.51rem;
            //height: 4.06rem;
            background: #fff;
            border-radius: 0 0.34rem 0.34rem 0.34rem;
            float: left;
            margin-left: 0.2rem;
            .title {
              color: #878787;
              font-size: 0.26rem;
              padding: 0.18rem 0;
              border-bottom: 0.01rem solid #ccc;
              padding-left: 0.3rem;
              padding-right: 0.3rem;
            }
            .pre1 {
              padding: 0.27rem 0.3rem 0.3rem 0.3rem;
              white-space: pre-line;
              line-height: 0.4rem;
              font-family: PingFangSC-Regular;
              color: #000;
              font-size: 0.32rem;
            }
          }
        }
      }
      .section_img {
        width: 6.5rem;
        margin: 0 auto 0.65rem;
        .time {
          color: #878787;
          font-size: 0.24rem;
          text-align: center;
          padding: 0 0 0.32rem 0;
        }
        .con {
          border-radius: 0.34rem;
          background: #fff;
          .banner {
            display: block;
            width: 6.5rem;
            height: 3.4rem;
            border-radius: 0.34rem 0.34rem 0 0;
            img {
              width: 100%;
              height: 100%;
              border-radius: 0.34rem 0.34rem 0 0;
            }
          }
          .des {
            .title {
              font-size: 0.32re;
              color: #000;
              font-family: PingFangSC-Regular;
              padding: 0.29rem 0 0.16rem 0.31rem;
            }
            .title_one {
              padding: 0.29rem 0.31rem 0.27rem 0.31rem;
            }
            .pre2 {
              font-size: 0.26rem;
              color: #878787;
              padding: 0 0.36rem 0.3rem 0.3rem;
            }
          }
        }
      }
      .no_notice {
        padding: 0.4rem;
        text-align: center;
        font-size: 0.4rem;
      }
    }
  }
}
</style>
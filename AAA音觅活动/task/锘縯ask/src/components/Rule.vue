<template>
  <div class="rule">
    <HeaderNav :title="lang.rule_title" />
    <div class="rule_con">
      <div class="ground">
        <p class="tips">{{lang.rule_tips}}</p>
      </div>
      <div class="ground">
        <p class="title">{{lang.ground1_title}}</p>
        <p class="tips">{{lang.ground1_tips}}</p>
        <ul class="ul1">
          <li>
            <span>
              <strong>{{lang.ground1_li1_title}}</strong>
              <strong v-html="lang.ground1_li1_tips"></strong>
            </span>
            <span>
              <img :src="images.rule1" alt />
            </span>
          </li>
          <li>
            <span>
              <strong>{{lang.ground1_li2_title}}</strong>
              <strong v-html="lang.ground1_li2_tips"></strong>
            </span>
            <span>
              <img :src="images.rule2" alt />
              <img :src="images.rule3" alt />
            </span>
          </li>
          <li>
            <span>
              <strong>{{lang.ground1_li3_title}}</strong>
              <strong v-html="lang.ground1_li3_tips"></strong>
            </span>
            <span>
              <img :src="images.rule3" alt />
            </span>
          </li>
        </ul>
      </div>

      <div class="ground">
        <p class="title">{{lang.ground2_title}}</p>
        <p class="tips" v-html="lang.ground2_tips">
        </p>
        <ul class="ul1">
          <li>
            <span>
              <strong>{{lang.ground2_li1_title}}</strong>
              <strong v-html="lang.ground2_li1_tips"></strong>
            </span>
            <span>
              <img :src="images.rule4" alt />
            </span>
          </li>
          <li>
            <span>
              <strong>{{lang.ground2_li2_title}}</strong>
              <strong v-html="lang.ground2_li2_tips"></strong>
            </span>
            <span>
              <img :src="images.rule5" alt />
              <img :src="images.rule6" alt />
            </span>
          </li>
          <li>
            <span>
              <strong>{{lang.ground2_li3_title}}</strong>
              <strong v-html="lang.ground2_li3_tips"></strong>
            </span>
            <span>
              <img :src="images.rule6" alt />
            </span>
          </li>
        </ul>
      </div>

      <div class="ground">
        <p class="title">{{lang.ground3_title}}</p>
        <p class="tips">{{lang.ground3_tips}}</p>
        <div class="gifts">
          <p>
            <span>{{lang.ground3_gifts1_title}}</span>
            <span>{{lang.ground3_probability}}</span>
          </p>
          <ul class="ul2">
            <li v-for="(item,index) in befall" :key="index">
              <span>
                <img :src="item.image" alt />
                <em>{{item.name}}</em>
              </span>
              <span>{{item.chance}}</span>
            </li>
          </ul>
        </div>
        <div class="gifts">
          <p>
            <span>{{lang.ground3_gifts2_title}}</span>
            <span>{{lang.ground3_probability}}</span>
          </p>
          <ul class="ul2">
            <li v-for="(item,index) in bless" :key="index">
              <span>
                <img :src="item.image" alt />
                <em>{{item.name}}</em>
              </span>
              <span>{{item.chance}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="ground">
        <p class="title">{{lang.ground4_title}}</p>
        <p class="tips">{{lang.ground4_tips}}</p>
        <div class="rewards">
          <p>{{lang.ground4_reward1_title}}</p>
          <ul>
            <li>
              <span>
                <strong></strong>
                <strong v-html="lang.ground4_reward1_tips1"></strong>
              </span>
              <span>
                <img :src="images.week_prize1" alt />
                <img :src="images.week_prize2" alt />
              </span>
            </li>
            <li>
              <span>
                <strong class="second"></strong>
                <strong v-html="lang.ground4_reward1_tips2"></strong>              
              </span>
              <span>
                <img :src="images.week_prize3" alt />
              </span>
            </li>
          </ul>
        </div>
        <div class="rewards">
          <p>{{lang.ground4_reward1_title}}</p>
          <ul>
            <li>
              <span>
                <strong></strong>
                <strong v-html="lang.ground4_reward2_tips1"></strong>
              </span>
              <span>
                <img :src="images.week_prize4" alt />
                <img :src="images.week_prize5" alt />
              </span>
            </li>
            <li>
              <span>
                <strong class="second"></strong>
                <strong v-html="lang.ground4_reward2_tips2"></strong>
              </span>
              <span>
                <img :src="images.week_prize5" alt />
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="ground other">
        <p class="title">{{lang.rule_other_title}}</p>
        <ol>
          <li v-for="(item,index) in lang.rule_other" :key="index">
            <i>{{index+1}}</i>
            <strong v-html="item" :class="{cur:index==1}"></strong>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "../components/common/Loading";
import { getUrlString } from "../utils";
import HeaderNav from "../components/HeaderNav";
import { getPrizeList } from "../apis";

const uid = getUrlString("uid");
const token = getUrlString("token");
const lang = getUrlString("lang");
export default {
  data() {
    return {
      langs: lang,
      befall: [],
      bless: []
    };
  },
  computed: {
    ...mapState(["loading", "coverRank"])
  },
  mounted() {
    (async () => {
      //重新更新初始化
      const res = await getPrizeList();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (!response_status.error) {
          this.befall = response_data.befall;
          this.bless = response_data.bless;
        } else {
          toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
        }
      }
    })();
  },
  methods: {},
  components: {
    Loading,
    HeaderNav
  }
};
</script>

<style lang="scss">
.rule {
  color: #fff;
  width: 100%;
  height: 9.4rem;
  background: #332d88;
  position: relative;
  .rule_con {
    width: 7.5rem;
    height: 8rem;
    overflow: auto;
    .tips {
      // padding: 0 .38rem .0 .3rem;
      line-height: 0.46rem;
      color: rgba(255, 255, 255, 9);
      font-size: 0.26rem;
      i {
        color: rgba(122, 104, 248, 1);
      }
    }
    .ground {
      padding: 0 0.3rem;
      margin-bottom: 0.3rem;
      .title {
        line-height: 0.45rem;
        font-size: 0.32rem;
        font-weight: bold;
        color: #ffffff;
        padding-bottom: 0.1rem;
      }
      .ul1 {
        li {
          width: 6.9rem;
          height: 1.55rem;
          background-color: rgba(0, 0, 0, 0.2);
          margin-top: 0.1rem;
          border-radius: 0.2rem;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 0.2rem 0.18rem;
          span {
            display: inline-block;
          }
          span:nth-of-type(1) {
            padding: 0.17rem 0 0 0;
            strong {
              display: block;
            }
            strong:nth-of-type(1) {
              font-size: 0.28rem;
              font-weight: bold;
              line-height: 0.4rem;
              color: #ffffff;
              padding-bottom: 0.04rem;
            }
            strong:nth-of-type(2) {
              font-size: 0.26rem;
              color: rgba(255, 255, 255, 0.6);
            }
          }
          span:nth-of-type(2) {
            padding-top: 0.08rem;
            img {
              width: 1.4rem;
              height: 1.4rem;
            }
          }
        }
      }
      .gifts {
        width: 6.9rem;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0.2rem;
        > p {
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0;
          span {
            display: inline-block;
            vertical-align: middle;
          }
          span:nth-of-type(1) {
            width: 4.18rem;
            font-size: 0.28rem;
            color: #fff;
            font-weight: bold;
            padding-left: 0.89rem;
            box-sizing: border-box;
          }
          span:nth-of-type(2) {
            font-size: 0.26rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.6);
          }
        }
        .ul2 {
          li {
            height: 1.4rem;
            display: flex;
            align-items: center;
            font-size: 0;
            padding-bottom: 0.2rem;
            span {
              display: inline-block;
              vertical-align: middle;
            }
            span:nth-of-type(1) {
              width: 4.18rem;
              padding-left: 0.5rem;
              box-sizing: border-box;
              font-size: 0;
              height: 1.4rem;
              img,
              em {
                display: inline-block;
                vertical-align: middle;
              }
              img {
                width: 1.4rem;
                height: 1.4rem;
                margin-right: 0.1rem;
              }
              em {
                width: 2.1rem;
                font-size: 0.26rem;
                color: rgba(255, 255, 255, 0.6);
              }
            }
            span:nth-of-type(2) {
              font-size: 0.26rem;
              font-weight: bold;
              color: rgba(255, 255, 255, 0.6);
              // padding-left: 0.69rem;
              width: 2rem;
              text-align: center;
            }
          }
        }
      }
      .rewards {
        width: 6.9rem;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0.2rem;
        padding: 0.2rem 0.2rem 0 0.2rem;
        box-sizing: border-box;
        > p {
          font-size: 0.28rem;
          font-weight: bold;
        }
        ul {
          li {
            display: flex;
            justify-content: space-between;
            height: 1.4rem;
            padding-bottom: 0.2rem;
            span {
              display: inline-block;
            }
            span:nth-of-type(1) {
              padding: 0.17rem 0 0 0;
              strong {
                display: block;
              }
              strong:nth-of-type(1) {
                width: 0.53rem;
                height: 0.22rem;
                background: url("../img/no1.png");
                background-size: 100% 100%;
                &.second {
                  width: 1rem;
                  height: 0.22rem;
                  background-image: url("../img/no23.png");
                }
              }
              strong:nth-of-type(2) {
                margin-top: 0.1rem;
                font-size: 0.26rem;
                color: rgba(255, 255, 255, 0.6);
              }
            }
            span:nth-of-type(2) {
              padding-top: 0.08rem;
              img {
                width: 1.4rem;
                height: 1.4rem;
              }
            }
          }
        }
      }
      .gifts:nth-of-type(1),
      .rewards:nth-of-type(1) {
        margin-bottom: 0.1rem;
      }
      &.other {
        ol {
          li {
            padding-bottom: 0.11rem;
            display: flex;
            flex-wrap: nowrap;
            i {
              box-sizing: border-box;
              margin-top: 0.08rem;
              margin-right: 0.1rem;
              width: 0.3rem;
              height: 0.3rem;
              line-height: 0.3rem;
              font-size: 0.24rem;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              background: url("../img/bg_num.png");
              background-size: 100% 100%;
              color: #fff;
            }
            strong {
              flex: 1;
              font-size: 0.26rem;
              line-height: 0.46rem;
              color: rgba(255, 255, 255, .9);
              &.cur {
                color: rgba(122, 104, 248, 1)
              }
            }
          }
        }
      }
    }
  }
}
</style>

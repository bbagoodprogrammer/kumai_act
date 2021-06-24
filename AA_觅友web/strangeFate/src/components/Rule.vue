<template>
  <div class="page pageRule">
    <header-nav :title="lang.rule_title" />
    <div class="rule_con">
      <div class="ground">
        <p class="tips">
          {{lang.rule_tips}}
        </p>
      </div>
      <div class="ground">
        <p class="title">{{lang.ground1_title}}</p>
        <p class="tips" v-html="lang.ground1_tips"></p>
        <ul class="ul1">
          <li>
            <span><strong v-html="lang.ground1_li1_title"></strong> <strong>{{lang.ground1_li1_tips}}</strong></span>
            <span><img :src="images.rule_reward1" alt="" /></span>
          </li>
          <li>
            <span><strong>{{lang.ground1_li2_title}}</strong>
              <strong v-html="lang.ground1_li2_tips"></strong></span>
            <span><img :src="images.rule_reward2" alt="" />
              <img :src="images.reward2" alt="" /></span>
          </li>
          <li>
            <span><strong>{{lang.ground1_li3_title}}</strong>
              <strong>{{lang.ground1_li3_tips}}</strong></span>
            <span><img :src="images.reward2" alt="" /></span>
          </li>
        </ul>
      </div>
      <div class="ground">
        <p class="title">{{lang.ground2_title}}</p>
        <p class="tips" v-html="lang.ground2_tips">
        </p>
        <ul class="ul1">
          <li>
            <span><strong>{{lang.ground2_li1_title}}</strong> <strong>{{lang.ground2_li1_tips}}</strong></span>
            <span><img :src="images.rule_reward3" alt="" /></span>
          </li>
          <li>
            <span><strong>{{lang.ground2_li2_title}}</strong>
              <strong v-html="lang.ground2_li2_tips"></strong></span>
            <span><img :src="images.reward5" alt="" />
              <img :src="images.reward6" alt="" /></span>
          </li>
          <li>
            <span><strong>{{lang.ground2_li3_title}}</strong>
              <strong>{{lang.ground2_li3_tips}}</strong></span>
            <span><img :src="images.reward6" alt="" /></span>
          </li>
        </ul>
      </div>
      <div class="ground">
        <p class="title">{{lang.ground3_title}}</p>
        <p class="tips">
          {{lang.ground3_tips}}
        </p>
        <div class="gifts">
          <p><span>{{lang.ground3_gifts1_title}}</span> <span>{{lang.ground3_probability}}</span></p>
          <ul class="ul2">
            <li v-for="(item,i) in befall" :key="i">
              <span><strong><img :src="item.image" alt="" />
                  <i v-if="item.num>1">
                    <img :src="getNum(item.num)" alt="">
                  </i></strong>
                <em>{{item.name}}</em></span>
              <span>{{item.chance}}</span>
            </li>
          </ul>
        </div>
        <div class="gifts">
          <p><span>{{lang.ground3_gifts2_title}}</span> <span>{{lang.ground3_probability}}</span></p>
          <ul class="ul2">
            <li v-for="(item,i) in bless" :key="i">
              <span><strong><img :src="item.image" alt="" />
                  <i v-if="item.num>1">
                    <img :src="getNum(item.num)" alt="">
                  </i></strong>
                <em>{{item.name}}</em></span>
              <span>{{item.chance}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="ground">
        <p class="title">{{lang.ground4_title}}</p>
        <p class="tips">
          {{lang.ground4_tips}}
        </p>
        <div class="rewards">
          <p>{{lang.ground4_reward1_title}}</p>
          <ul>
            <li>
              <span><strong></strong>
                <strong v-html="lang.ground4_reward1_tips1"></strong></span>
              <span><img :src="images.week_reward1" alt="" />
                <img :src="images.week_reward2" alt="" /></span>
            </li>
            <li>
              <span><strong class="second"></strong>
                <strong v-html="lang.ground4_reward1_tips2"></strong></span>
              <span><img :src="images.week_reward3" alt="" /></span>
            </li>
          </ul>
        </div>
        <div class="rewards">
          <p>{{lang.ground4_reward2_title}}</p>
          <ul>
            <li>
              <span><strong></strong>
                <strong v-html="lang.ground4_reward2_tips1"></strong></span>
              <span><img :src="images.week_reward4" alt="" />
                <img :src="images.week_reward5" alt="" /></span>
            </li>
            <li>
              <span><strong class="second"></strong>
                <strong v-html="lang.ground4_reward2_tips2"></strong></span>
              <span><img :src="images.week_reward5" alt="" /></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="ground other">
        <p class="title">{{lang.rule_other_title}}</p>
        <ol>
          <li v-for="(item,i) in lang.rule_other" :key="i">
            <i>{{i+1}}</i>
            <strong :class="{cur:i==1}">{{item}}</strong>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderNav from "./headerNav";
import { getPrizeList } from "../apis"

export default {
  data () {
    return {
      befall: [],
      bless: [],
    };
  },
  mounted () {
    (async () => {
      const res = await getPrizeList();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status.error === "") {
          this.befall = response_data.befall;
          this.bless = response_data.bless;
        } else {

        }
      }
    })();
  },
  computed: {
    ...mapState([]),
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    getNum (i) {
      return require('../img/x' + i + '.png');
    },
  },
  components: {
    HeaderNav,
  },
};
</script>

<style lang="scss">
.pageRule {
  color: #fff;
  width: 100%;
  height: 9.39rem;
  background: #332d88;
  position: relative;
  border-radius: 0.3rem 0.3rem 0 0;
  .rule_con {
    width: 7.5rem;
    height: 8rem;
    overflow: auto;
    padding-top: 0.09rem;
    .tips {
      line-height: 0.46rem;
      color: #fff;
      font-size: 0.26rem;
      i {
        color: #7a68f8;
        font-size: 0.26rem;
      }
    }
    .ground {
      padding: 0 0.3rem;
      margin-bottom: 0.3rem;
      .title {
        line-height: 0.45rem;
        font-size: 0.32rem;
        font-weight: 700;
        color: #fff;
        padding-bottom: 0.04rem;
      }
      .ul1 {
        li {
          width: 6.9rem;
          background-color: rgba(0, 0, 0, 0.2);
          margin-top: 0.1rem;
          border-radius: 0.2rem;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-pack: justify;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 0.2rem 0.18rem;
          span {
            display: inline-block;
            &:first-of-type {
              padding: 0.22rem 0 0;
              strong {
                display: block;
                &:nth-of-type(1) {
                  font-size: 0.28rem;
                  font-weight: 700;
                  line-height: 0.4rem;
                  color: #fff;
                  padding-bottom: 0.01rem;
                }
                &:nth-of-type(2) {
                  font-size: 0.26rem;
                  color: hsla(0, 0%, 100%, 0.6);
                }
              }
            }
            &:nth-of-type(2) {
              font-size: 0;
              display: -ms-flexbox;
              display: flex;
              -ms-flex-align: center;
              align-items: center;
              padding-top: 0.22rem;
              img {
                width: 1.4rem;
                height: 1.4rem;
              }
            }
          }
          &:first-of-type {
            margin-top: 0.05rem;
          }
        }
      }
      .gifts {
        width: 6.9rem;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0.2rem;
        & > p {
          min-height: 0.8rem;
          text-align: center;
          padding-top: 0.15rem;
          //   line-height: 0.8rem;
          //   font-size: 0;
          span {
            display: inline-block;
            vertical-align: middle;
            &:first-of-type {
              width: 4.18rem;
              font-size: 0.28rem;
              color: #fff;
              font-weight: 700;
              padding-left: 0.89rem;
              box-sizing: border-box;
            }
            &:nth-of-type(2) {
              font-size: 0.26rem;
              font-weight: 700;
              color: hsla(0, 0%, 100%, 0.6);
            }
          }
        }
        .ul2 {
          padding-bottom: 0.3rem;
          li {
            height: 1.2rem;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            font-size: 0;
            margin-bottom: 0.4rem;
            span {
              display: inline-block;
              vertical-align: middle;
              &:first-of-type {
                width: 4.18rem;
                padding-left: 0.5rem;
                box-sizing: border-box;
                font-size: 0;
                height: 1.2rem;
                strong {
                  height: 1.2rem;
                  margin-right: 0.1rem;
                  position: relative;
                  img {
                    width: 1.2rem;
                  }
                  i {
                    position: absolute;
                    z-index: 1;
                    width: 0.5rem;
                    height: 0.28rem;
                    top: 0;
                    right: 0;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }
                }
                em {
                  width: 2.1rem;
                  font-size: 0.26rem;
                  color: hsla(0, 0%, 100%, 0.6);
                }
              }
              &:nth-of-type(2) {
                font-size: 0.26rem;
                font-weight: 700;
                color: hsla(0, 0%, 100%, 0.6);
                width: 2rem;
                text-align: center;
              }
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
        &:first-of-type {
          margin-top: 0.04rem;
        }
      }
      .rewards {
        width: 6.9rem;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0.2rem;
        padding: 0.18rem 0.2rem 0 0.18rem;
        box-sizing: border-box;
        & > p {
          font-size: 0.28rem;
          font-weight: 700;
        }
        ul {
          li {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            height: 1.4rem;
            padding-bottom: 0.2rem;
            font-size: 0;
            span {
              display: inline-block;
              &:first-of-type {
                padding: 0.22rem 0 0;
                strong {
                  display: block;
                  &:nth-of-type(1) {
                    width: 0.53rem;
                    height: 0.22rem;
                    background: url('../img/no1.png');
                    background-size: 100% 100%;
                  }
                  &:nth-of-type(1).second {
                    width: 1rem;
                    height: 0.22rem;
                    background-image: url('../img/no2.png');
                  }
                  &:nth-of-type(2) {
                    margin-top: 0.08rem;
                    font-size: 0.26rem;
                    color: hsla(0, 0%, 100%, 0.6);
                    line-height: 0.4rem;
                  }
                }
              }
              &:nth-of-type(2) {
                padding-top: 0.08rem;
                img {
                  width: 1.2rem;
                  height: 1.2rem;
                  &:first-of-type {
                    margin-right: 0.1rem;
                  }
                  &:last-child {
                    margin-right: 0;
                  }
                }
              }
            }
          }
        }
      }
      &.other {
        ol {
          margin-top: 0.04rem;
          li {
            padding-bottom: 0.1rem;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: nowrap;
            flex-wrap: nowrap;
            i {
              box-sizing: border-box;
              margin-top: 0.09rem;
              margin-right: 0.1rem;
              width: 0.3rem;
              height: 0.3rem;
              line-height: 0.3rem;
              font-size: 0.24rem;
              display: -ms-inline-flexbox;
              display: inline-flex;
              -ms-flex-pack: center;
              justify-content: center;
              -ms-flex-align: center;
              align-items: center;
              background: url('../img/num.png');
              background-size: 100% 100%;
              color: #fff;
            }
            strong {
              -ms-flex: 1;
              flex: 1;
              font-size: 0.26rem;
              line-height: 0.46rem;
              color: hsla(0, 0%, 100%, 0.9);
              &.cur {
                color: #7a68f8;
              }
            }
          }
        }
      }
    }
  }
  .rule_con .ground .gifts .ul2 li span:first-of-type em,
  .rule_con .ground .gifts .ul2 li span:first-of-type strong {
    display: inline-block;
    vertical-align: middle;
  }
  .rule_con .ground .gifts:first-of-type,
  .rule_con .ground .rewards:first-of-type {
    margin-bottom: 0.1rem;
  }
}
</style>
<template>
  <div class="letter">
    <!-- 收到的邀請函 -->
    <div class="title" @click="handleTab(0)">
      <div>{{ lang.receive_invite }}</div>
      <img class="arrow" :class="active == 0 ? 'rotate180' : 'rotate0'" src="../img/arrow_down.png" />
    </div>
    <div class="letter_main" :class="active == 0 ? 'show_content' : 'hidden_content'">
      <InnerScrollLoadList class="scroll" :url="invitedMailUrl" :parse="parse">
        <template slot-scope="{ list, loading, none }">
          <ul>
            <li class="invite_mail" v-for="(item, index) in list" :key="index">
              <img @click="goProfile(item.uid)" class="avatar" v-lazy="item.avatar" />
              <div class="info_middle">
                <div class="nick">
                  {{ lang.user_nick.replace("%s", item.nick) }}
                </div>
                <div class="score">
                  {{ lang.intimacy_value.replace("%s", item.intimacy) }}
                </div>
              </div>
              <div class="btn__box">
                <template v-if="item.status == 0">
                  <div class="agree_btn" @click="agreeInvite(item)">
                    {{ lang.agree }}
                  </div>
                  <u class="reject_btn" @click="rejectInvite(item)">
                    {{ lang.reject_btn }}
                  </u>
                </template>
                <div v-else class="btn">
                  <span v-if="item.status == -1">{{ lang.rejected }}</span>
                  <span v-if="item.status == 1">{{ lang.agreed }}</span>
                  <span v-if="item.status == 2">{{ lang.you_has_cp }}</span>
                  <span v-if="
                      item.status == 3 && (item.sex == 0 || item.sex == 2)
                    ">{{ lang.male_has_cp }}</span>
                  <span v-if="item.status == 3 && item.sex == 1">{{
                    lang.femail_has_cp
                  }}</span>
                </div>
              </div>
            </li>
          </ul>
          <div v-if="none" class="scrollNone" v-html="getBrHtml(lang.not_mail)"></div>
          <div v-if="loading" class="scrollNone" v-html="getBrHtml(lang.loading)"></div>
        </template>
      </InnerScrollLoadList>
    </div>

    <!-- 其他信件 -->
    <div class="title" @click="handleTab(1)">
      {{ lang.orther_letter }}
      <img class="arrow" :class="active == 1 ? 'rotate180' : 'rotate0'" src="../img/arrow_down.png" />
    </div>
    <div class="letter_main" :class="active == 1 ? 'show_content' : 'hidden_content'">
      <InnerScrollLoadList class="scroll" :url="ortherMailUrl" :parse="parse">
        <template slot-scope="{ list, loading, none }">
          <ul>
            <li class="invite_mail" v-for="(item, index) in list" :key="index">
              <img @click="goProfile(item.uid)" class="avatar" v-lazy="item.avatar" />
              <div class="info_middle">
                <span v-if="item.type == 2" class="orther_title" v-html="lang.orther_letter_title_1.replace('%s', item.nick)"></span>
                <span v-if="item.type == 6" class="orther_title" v-html="lang.orther_letter_title_2.replace('%s', item.nick)"></span>
                <span v-if="item.type == 3" class="orther_title" v-html="lang.orther_letter_title_3.replace('%s', item.nick)"></span>
              </div>
              <div class="btn__box">
                <template v-if="item.type == 2">
                  <template v-if="item.status == 0">
                    <div class="agree_btn" @click="acceptRelieve(item)">
                      {{ lang.agree }}
                    </div>
                    <u class="reject_btn" @click="rejectRelieve(item)">
                      {{ lang.reject_btn }}
                    </u>
                  </template>
                  <span class="btn" v-if="item.status == -1">{{ lang.rejected }}</span>
                  <span class="btn" v-if="item.status == 1">{{ lang.agreed }}</span>
                </template>
              </div>
            </li>
          </ul>
          <div v-if="none" class="scrollNone" v-html="getBrHtml(lang.not_mail)"></div>
          <div v-if="loading" class="scrollNone" v-html="getBrHtml(lang.loading)"></div>
        </template>
      </InnerScrollLoadList>
    </div>
  </div>
</template>

<script>
import InnerScrollLoadList from "./common/InnerScrollLoadList";
import { reject, accept, rejectRelieve, acceptRelieve } from "../apis/index";
import callApp from "../utils/callApp";
import { toast } from "../utils";
import api from "../apis/api";

export default {
  name: 'Letter',

  data () {
    return {
      active: 2,
      invitedMailUrl: api.invitedMail,
      ortherMailUrl: api.otherMail,
    };
  },

  components: {
    InnerScrollLoadList,
  },

  methods: {
    parse (data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === "") {
        return response_data.list;
      } else {
        const { error } = response_status;
        if (error) {
          toast(error);
        }
      }
      return [];
    },

    async rejectRelieve (item) {
      let res = await rejectRelieve({ mail_id: item.id });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        item.status = 2;
      } else {
        toast(response_status.error);
      }
    },

    async acceptRelieve (item) {
      let res = await acceptRelieve({ mail_id: item.id });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        item.status = 1;
        this.$store.dispatch("initData");
      } else {
        toast(response_status.error);
      }
    },

    async agreeInvite (item) {
      let res = await accept({ mail_id: item.id });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        item.status = 1;
        this.$store.dispatch("initData");
      } else {
        toast(response_status.error);
      }
    },

    async rejectInvite (item) {
      let res = await reject({ mail_id: item.id });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        item.status = -1;
      } else {
        toast(response_status.error);
      }
    },

    goProfile (uid) {
      callApp.userInfo(uid);
    },

    handleTab (tab) {
      if (this.active == tab) {
        this.active = 2;
        return;
      }
      this.active = tab;
    },

    getBrHtml (text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },
  },
};
</script>

<style lang="scss">
.letter {
  // padding-left: 0.39rem;
  // padding-right: 0.39rem;
  .title {
    line-height: 0.25rem;
    height: 0.25rem;
    font-size: 0.26rem;
    font-weight: 300;
    color: rgba(176, 97, 101, 1);
    display: flex;
    align-items: center;
    padding-top: 0.3rem;
    .arrow {
      width: 0.2rem;
      height: 0.14rem;
      margin-left: 0.18rem;
      transition: all 0.3s ease-in-out;
    }
    .rotate180 {
      transform: rotate(-180deg);
    }
    .rotate0 {
      transform: rotate(0deg);
    }
  }
  .letter_main {
    overflow: hidden;
    -webkit-transition: max-height 0.5s ease-in-out;
    transition: max-height 0.3s ease-in-out;
    will-change: max-height;
    margin-top: 0.2rem;
  }
  .show_content {
    // margin-top: 0.2rem;
    max-height: 5.8rem;
    // background: red;
    // height: 6rem;
  }
  .hidden_content {
    max-height: 0;
  }

  .scroll {
    border-radius: 0.1rem;
    overflow: hidden;
    max-height: 5.8rem;
    overflow: auto;
  }

  .invite_mail {
    width: 5.96rem;
    height: 1.23rem;
    // background: url('../img/li_item_bg.png') 0/100% 100% no-repeat;
    background: rgba(222, 167, 184, 0.39);

    margin: 0 auto 0.15rem auto;
    display: flex;
    align-items: center;
    .avatar {
      width: 1rem;
      height: 1rem;
      border: 0.02rem solid #fffebc;
      border-radius: 50%;
      margin-left: 0.2rem;
      margin-right: 0.17rem;
    }
    .info_middle {
      flex: 1;
      .nick {
        width: 2rem;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.22rem;
        font-weight: 300;
        color: #ffffff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        height: 0.22rem;
        line-height: 0.22rem;
        font-size: 0.22rem;
        font-weight: 300;
        color: #ffefbf;
        margin-top: 0.1rem;
      }
      .orther_title {
        display: inline-block;
        color: rgba(255, 240, 159, 1);
        line-height: 0.28rem;
        font-size: 0.26rem;
        font-weight: 300;
        em {
          font-size: 0.26rem;
          color: #fff;
        }
      }
    }
    .btn__box {
      width: 1.96rem;
      height: 100%;
      margin-right: 0.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .agree_btn {
        // width: 0.98rem;
        padding: 0 0.1rem;
        height: 0.56rem;
        background: rgba(226, 82, 227, 1);
        // background: url('../img/mail_agree_btn.png') 0/100% 100% no-repeat;
        font-size: 0.26rem;
        color: #ffffff;
        line-height: 0.56rem;
        text-align: center;
        border-radius: 0.09rem;
      }
      .reject_btn {
        width: 0.98rem;
        height: 0.56rem;
        // background: url('../img/mail_reject_btn.png') 0/100% 100% no-repeat;
        font-size: 0.26rem;
        color: rgba(216, 125, 158, 1);
        line-height: 0.56rem;
        text-align: center;
      }
      .btn {
        width: 1.6rem;
        height: 0.48rem;
        // background: url('../img/mail_grey_btn.png') 0/100% 100% no-repeat;
        line-height: 0.48rem;
        text-align: center;
        font-size: 0.26rem;
        color: rgba(216, 125, 158, 1);
      }
    }
  }
}
</style>
<template>
  <div class="rule">
    <div class="rulesTitle">
      活動詳情
    </div>
    <h5>活動時間：</h5>
    <p>{{timeShow}}</p>
    <h5>活動報名：</h5>
    <p>1、活動無需報名，直接購買即可參加活動</p>
    <h5>折扣背包禮物購買：</h5>
    <p>1、週三特惠日活動當天可使用折扣購買背包禮物</p>
    <p>2、購買後的禮物可在背包查看，<em class="redTex">特價購買的背包禮物有對應的有效期</em>，請在購買頁面查看確認後再購買唷</p>
    <p class="tos">溫馨提示：</p>
    <p class="noTop">所購買的背包禮物，安卓版本可在我-背包中查看，並且送禮時，可選擇背包禮物送出。IOS可前往 app store 搜尋最新版本”高歌“，下載使用</p>
    <div class="lastMsg">
      本活動的最終解釋權歸活動主辦方所有
    </div>
    <Loading></Loading>
  </div>
</template>

<script>
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
import Loading from "../../components/Loading"
export default {
  components: { Loading },
  data() {
    return {
      timeShow: ''
    }
  },
  created() {
    api.getDefault().then((res) => {
      const { stime, etime } = res.data.response_data
      this.timeShow = getDate(new Date(stime * 1000)) + ` - ` + getDate(new Date(etime * 1000))
    })
  }
}
</script>

<style lang="scss">
body {
  background-color: #56157e;
}
.rule {
  padding: 0 0.54rem 0.2rem;
  position: relative;
  .lastMsg {
    margin-top: 2rem;
    text-align: center;
    font-size: 80%;
    color: #eee;
  }
  .tos {
    color: red;
  }
  .noTop {
    margin-top: 0;
    color: red;
  }
  .redTex {
    color: red;
  }
  .rulesTitle {
    text-align: center;
    width: 4.99rem;
    height: 0.64rem;
    background: linear-gradient(
      -3deg,
      rgba(95, 28, 138, 1),
      rgba(112, 31, 163, 1)
    );
    box-shadow: 0px 0px 50px 0px rgba(72, 16, 107, 0.3);
    border-radius: 0.32rem;
    margin: 0.7rem auto 0;
    line-height: 0.64rem;
    color: #fff2df;
    font-size: 120%;
  }
  h5 {
    color: #fff2df;
    font-size: 120%;
    margin-top: 0.75rem;
  }
  p {
    font-size: 80%;
    color: #eeeeee;
    margin-top: 0.43rem;
    padding-left: 0.2rem;
    line-height: 0.4rem;
  }
  .clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
@import "../../assets/scss/common.scss";
</style>

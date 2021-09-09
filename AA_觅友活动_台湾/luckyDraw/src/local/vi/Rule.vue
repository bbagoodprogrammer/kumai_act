<template>
  <div class="page pageRule rule">
    <div class="container">
      <p class="title">thời gian sự kiện</p>
      <p class="tip pb36">
        <span class="starttime">{{ stime }}</span> -
        <span class="endtime">{{ etime }}</span>
      </p>
      <p class="title">Giải thích</p>
      <ul>
        <li>
          <p>
            1.
            Trong thời gian sự kiện, user có thể bóc thăm bằng đậu, mỗi ngày tối đa bóc thăm 15 lần
          </p>
        </li>
        <li>
          <p>
            2. Ấn phím "Đổi" có thể thay đổi kho báu đang có；Ấn phím "Rút thưởng Go" được bóc thăm 1 lần, ấn "rút 5 lần" được bóc thăm 5 lần cùng 1 lúc.
          </p>
        </li>
        <li>
          <p>
            3.Thưởng đậu, xu, quà túy, khung và xe sẽ nhận ngay sau khi bóc thăm, và phiếu trả lễ, phiêu tiêu sẽ nhận vào ngày tiếp theo
          </p>
        </li>
        <li>
          <p>
            4.
            Giải thích về phiếu trả lễ: Nạp xu trong ngày nhận phiếu, có thể nhận thêm xu hồi theo % vào ngày tiếp theo. Nếu bạn nhận nhiều phiếu trả lễ trong 1 ngày, sẽ hồi theo phiếu có giá trị cao
            nhất. Phiếu trả lễ chỉ có hiệu trong ngày.
          </p>
        </li>
        <li>
          <p>
            5.
            Giải thích về phiếu tiêu: Tiêu xu trên mức nhất định trong ngày nhận phiếu, có thể nhận thêm xu hồi theo % vào ngày tiếp theo. Nếu bạn nhận nhiều phiếu tiêu trong 1 ngày, sẽ hồi theo phiếu
            có giá trị cao nhất. Phiếu tiêu chỉ có hiệu trong ngày.
          </p>
        </li>
        <li>
          <p>6.Sự kiện này không có liên quan với công ty APPLE</p>
        </li>
        <li>
          <p>7.Tất cả quà túy nhận qua sự kiện này đều có hiệu 7 ngày</p>
        </li>
      </ul>
      <p class="copy">Quyền giải thích cuối cùng của sự kiện thuộc về ban tổ chức</p>
    </div>
  </div>
</template>

<script>
import { getTimeObj } from "../../utils";
export default {
  data () {
    return {
      tab: 1,
      mainTab: 0,
      stime: 0,
      etime: 0,
    };
  },
  created () {
    this.stime = this.lang.time
      .replace("%y", getTimeObj(this.$route.query.stime).year)
      .replace("%mo", getTimeObj(this.$route.query.stime).month)
      .replace("%d", getTimeObj(this.$route.query.stime).day)
      .replace("%h", getTimeObj(this.$route.query.stime).hour)
      .replace("%m", getTimeObj(this.$route.query.stime).minute)
      .replace("%s", getTimeObj(this.$route.query.stime).second);
    this.etime = this.lang.time
      .replace("%y", getTimeObj(this.$route.query.etime).year)
      .replace("%mo", getTimeObj(this.$route.query.etime).month)
      .replace("%d", getTimeObj(this.$route.query.etime).day)
      .replace("%h", getTimeObj(this.$route.query.etime).hour)
      .replace("%m", getTimeObj(this.$route.query.etime).minute)
      .replace("%s", getTimeObj(this.$route.query.etime).second);
  },
  methods: {
    mainTabClick (tab) {
      this.mainTab = tab;
    },
  },
};
</script>


<style lang="scss">
.pageRule {
  background: #fffdec;
  .container {
    padding: 0.24rem;
    .title {
      font-size: 0.32rem;
      color: #ff8022;
      padding-bottom: 0.16rem;
    }
    .tip {
      font-size: 0.28rem;
      color: #333;
    }
    .pb36 {
      padding-bottom: 0.36rem;
    }
    ul {
      li {
        padding-bottom: 0.28rem;
        p {
          font-size: 0.28rem;
          line-height: 0.4rem;
          color: #333;
        }
      }
    }
  }
  .copy {
    font-size: 0.28rem;
    padding: 0.12rem 0 1.08rem;
    text-align: center;
  }
}
</style>
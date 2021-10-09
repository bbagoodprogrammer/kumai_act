<template>
  <div class="rule">
    <div class="mainTabs">
      <a href="javascript:;" @click="mainTabClick(0)" :class="{current:mainTab==0}">thể lệ</a>
      <a href="javascript:;" @click="mainTabClick(1)" :class="{current:mainTab==1}">Thưởng </a>
    </div>

    <div class="rewards" v-if="mainTab==1">
      <div class="group">
        <div class="title">Kho xu tỏ tình</div>
        <p>Kho xu tỏ tình bắt đầu tính từ 5000xu mỗi tăng 300 điểm thì kho xu sẽ được cộng thêm 1xu；<br>Sau sự kiện kết thức, tất cả CP đủ điều kiện sẽ chia sẻ xu trong kho này</p>
        <div class="formula"></div>
      </div>
      <div class="the_reward">
        <p>Thưởng cặp đôi mặn và ngọt</p>
        <div class="list">
          <p>Giải nhất mỗi đội:</p>
          <div><span class="icon1"><strong><span></span><i>52000</i></strong> <strong>Nhẫn trọn đời trọn kiếp</strong></span> <span class="icon2"><strong><i>15 ngày</i></strong> <strong>Du
                thuyền<br>lãng mạn</strong></span> <span class="icon3"><strong><i>15 ngày</i></strong> <strong>khung ảnh cô<br>dâu chủ rể</strong></span> <span class="icon4"><strong><i>15
                  ngày</i></strong> <strong>chứng nhận tủy chọn</strong></span></div>
        </div>
        <div class="list">
          <p>Giải nhì mỗi đội:</p>
          <div><span class="icon2"><strong><i>10 ngày</i></strong> <strong>Du thuyền<br>lãng mạn</strong></span> <span class="icon3"><strong><i>10 ngày</i></strong> <strong>khung ảnh cô<br>dâu chủ
                rể</strong></span> <span class="icon4"><strong><i>10 ngày</i></strong> <strong>Chứng nhận<br>Ngọt ngào</strong></span></div>
        </div>
        <div class="list">
          <p>Giải ba</p>
          <div><span class="icon2"><strong><i>7 ngày</i></strong> <strong>Du thuyền<br>lãng mạn</strong></span> <span class="icon3"><strong><i>7 ngày</i></strong> <strong>khung ảnh cô<br>dâu chủ
                rể</strong></span> <span class="icon4"><strong><i>7 ngày</i></strong> <strong>Chứng nhận<br>Hạnh phúc</strong></span></div>
        </div>
        <div class="list">
          <p>Giải 4-6</p>
          <div><span class="icon6"><strong><i>7 ngày</i></strong> <strong>khung ảnh cô<br>dâu chủ rể</strong></span></div>
        </div>
      </div>
      <ul class="tip">
        <li>*Đạt 5200 và top3 mới được nhận thưởng theo BXH</li>
        <li>*Giải 4-6 của bên Liên minh thua không có thưởng</li>
        <li>*Tất cả thưởng đều sẽ gửi cho cả 2 bên CP</li>
      </ul>
    </div>
    <div class="rules" v-if="mainTab==0">
      <div class="group">
        <div class="title">1、Thời igan sự kiện</div>
        <p>09/10 18:00 - 16/10 23:59:59</p>
      </div>
      <div class="group">
        <div class="title">2、Tham gia</div>
        <p>Các CP đã ghép đôi sẽ được tham gia<br>Cach thức：Mua nhẫn tỏ tình &gt;&gt;Tỏ tình cho bạn bè &gt;&gt; Nếu bạn bè đồng ý &gt;&gt;Sẽ trở thành CP</p>
        <p>Nếu quan hệ CP bị gỡ bỏ, sẽ không được tham gia sự kiện và nhận quà nữa~</p>
      </div>
      <div class="group">
        <div class="title">3、Thể lệ liên minh</div>
        <p>CP tham gia sự kiện sẽ tham gia liên minh luôn/Linh minh Ngọt；PK giữa liên minh, bên giành được điểm yêu cao sẽ thắng，các CP trong liên minh sẽ nhận thưởng trong kho xu liên minh.</p>
      </div>
      <div class="group">
        <div class="title">4、Điểm yêu</div>
        <p>Trong thời igan sự kiện diễn ra, các CP tặng quà chỉ định để tăng điểm yêu của mình ；Điểm yêu= giá trị quà chi định *10 + điểm yêu từ nhẫn. Mỗi tăng 300 điểm yêu, kho xu sẽ được cộng thêm
          1xu</p>
        <div class="rewards_box">
          <div>
            <p class="top"><span></span><i>100</i></p>
            <p class="name">Thư tỏ tình</p>
            <p class="val">+1000điểm</p>
          </div>
          <div>
            <p class="top"><span></span><i>1290</i></p>
            <p class="name">Sô cô la</p>
            <p class="val">+12900điểm</p>
          </div>
          <div>
            <p class="top"><span></span><i>1399</i></p>
            <p class="name">Thư tình</p>
            <p class="val">+13990điểm</p>
          </div>
          <div>
            <p class="top"><span></span><i>2800</i></p>
            <p class="name">Cả tấm lòng</p>
            <p class="val">+28000điểm</p>
          </div>
          <div>
            <p class="top"><span></span><i>6999</i></p>
            <p class="name">Trọn đời</p>
            <p class="val">+69990điểm</p>
          </div>
        </div>
      </div>
    </div>
    <p class="copy">Quyền giải thích cuối cùng thuộc về ban tổ chức sự kiện</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 1,
      mainTab: 0,
      // stime:getstime,
      // etime:getetime,
    }
  },
  methods: {
    mainTabClick (tab) {
      this.mainTab = tab
    },
  },
}
</script>


<style lang="scss">
body {
  background: #511c7e;
}
.time {
  font-size: 0.24rem;
  color: #f9d7cf;
  padding: 0.28rem 0 0.26rem;
}
.mainTabs,
.time {
  text-align: center;
}
.mainTabs {
  width: 6.35rem;
  height: 0.98rem;
  line-height: 0.98rem;
  margin: 1rem auto 0.6rem;
  background: url(../../img/bg_tabs.png?6fa479) no-repeat;
  background-size: 100% 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  a {
    display: inline-block;
    width: 3.15rem;
    height: 0.86rem;
    line-height: 0.86rem;
    font-size: 0.32rem;
    color: #fff;
    font-weight: 700;
    &.current {
      width: 3.14rem;
      height: 0.86rem;
      background: url(../../img/bg_tabs_active.png?5bddfb) 50% no-repeat;
      background-size: 100% 100%;
      color: #8c4018;
    }
  }
}
.rewards .group,
.rules .group {
  padding: 0 0.44rem;
  margin-bottom: 0.24rem;
}
.rewards .group .title,
.rules .group .title {
  font-size: 0.26rem;
  color: #fff;
  padding-bottom: 0.1rem;
}
.rewards .group p,
.rules .group p {
  font-size: 0.26rem;
  color: #c385f8;
}
.rewards .group .formula,
.rules .group .formula {
  width: 6.6rem;
  height: 1.27rem;
  background: url('./img/formula.png') 50% no-repeat;
  background-size: 100% 100%;
  margin: 0.39rem 0 0.36rem;
}
.rewards .group .rewards_box,
.rules .group .rewards_box {
  width: 6rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0.4rem auto 0;
}
.rewards .group .rewards_box > div,
.rules .group .rewards_box > div {
  width: 1.75rem;
  height: 2.25rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 0.16rem;
}
.rewards .group .rewards_box > div .top,
.rules .group .rewards_box > div .top {
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 0.05rem;
}
.rewards .group .rewards_box > div .top i,
.rewards .group .rewards_box > div .top span,
.rules .group .rewards_box > div .top i,
.rules .group .rewards_box > div .top span {
  display: inline-block;
  vertical-align: middle;
}
.rewards .group .rewards_box > div .top span,
.rules .group .rewards_box > div .top span {
  width: 0.24rem;
  height: 0.24rem;
  background: url('../../img/coin20.png') 50% no-repeat;
  background-size: 100% 100%;
  margin-right: 0.07rem;
}
.rewards .group .rewards_box > div .top i,
.rules .group .rewards_box > div .top i {
  color: #fff;
  font-size: 0.24rem;
}
.rewards .group .rewards_box > div .name,
.rules .group .rewards_box > div .name {
  text-align: center;
  font-size: 0.24rem;
  color: #fff;
  padding-top: 1.6rem;
}
.rewards .group .rewards_box > div .val,
.rules .group .rewards_box > div .val {
  text-align: center;
  font-size: 0.2rem;
  color: #ffb523;
}
.rewards .group .rewards_box div:first-of-type,
.rules .group .rewards_box div:first-of-type {
  margin: 0 0.18rem 0.16rem 1rem;
  background-image: url(./img/rule1.png);
}
.rewards .group .rewards_box div:nth-of-type(2),
.rules .group .rewards_box div:nth-of-type(2) {
  margin: 0 1rem 0.16rem 0;
  background-image: url(./img/rule2.png);
}
.rewards .group .rewards_box div:nth-of-type(3),
.rules .group .rewards_box div:nth-of-type(3) {
  margin-right: 0.18rem;
  background-image: url(./img/rule3.png);
}
.rewards .group .rewards_box div:nth-of-type(4),
.rules .group .rewards_box div:nth-of-type(4) {
  margin-right: 0.18rem;
  background-image: url(./img/rule4.png);
}
.rewards .group .rewards_box div:nth-of-type(5),
.rules .group .rewards_box div:nth-of-type(5) {
  margin-right: 0.18rem;
  background-image: url(./img/rule5.png);
}
.rewards .the_reward,
.rules .the_reward {
  padding: 0 0.44rem;
}
.rewards .the_reward > p,
.rules .the_reward > p {
  color: #fff;
  font-size: 0.26rem;
  padding-bottom: 0.3rem;
}
.rewards .the_reward .list,
.rules .the_reward .list {
  margin-bottom: 0.3rem;
}
.rewards .the_reward .list > p,
.rules .the_reward .list > p {
  font-size: 0.26rem;
  color: #fff;
  text-align: center;
  padding-bottom: 0.2rem;
}
.rewards .the_reward .list .other,
.rules .the_reward .list .other {
  text-align: left;
  padding: 0.2rem 0 0 0.2rem;
}
.rewards .the_reward .list > div,
.rules .the_reward .list > div {
  text-align: center;
}
.rewards .the_reward .list > div span,
.rules .the_reward .list > div span {
  width: 1.51rem;
  height: 2.01rem;
  display: inline-block;
  vertical-align: middle;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.rewards .the_reward .list > div span strong,
.rules .the_reward .list > div span strong {
  display: block;
  text-align: center;
}
.rewards .the_reward .list > div span strong:first-of-type,
.rules .the_reward .list > div span strong:first-of-type {
  padding-top: 1.17rem;
}
.rewards .the_reward .list > div span strong:first-of-type i,
.rewards .the_reward .list > div span strong:first-of-type span,
.rules .the_reward .list > div span strong:first-of-type i,
.rules .the_reward .list > div span strong:first-of-type span {
  display: inline-block;
  vertical-align: middle;
}
.rewards .the_reward .list > div span strong:first-of-type span,
.rules .the_reward .list > div span strong:first-of-type span {
  width: 0.24rem;
  height: 0.24rem;
  background: url('../../img/coin20.png') 50% no-repeat;
  background-size: 100% 100%;
  margin-right: 0.07rem;
}
.rewards .the_reward .list > div span strong:first-of-type i,
.rules .the_reward .list > div span strong:first-of-type i {
  color: #fbc42f;
  font-size: 0.2rem;
}
.rewards .the_reward .list > div span strong:nth-of-type(2),
.rules .the_reward .list > div span strong:nth-of-type(2) {
  font-size: 0.18rem;
  line-height: 0.23rem;
  color: #ffff;
}
.rewards .the_reward .list > div span.icon1,
.rules .the_reward .list > div span.icon1 {
  background-image: url(./img/icon1.png?5788b0);
}
.rewards .the_reward .list > div span.icon2,
.rules .the_reward .list > div span.icon2 {
  background-image: url(./img/icon2.png?b29593);
}
.rewards .the_reward .list > div span.icon3,
.rules .the_reward .list > div span.icon3 {
  background-image: url(./img/icon3.png?ea7af0);
}
.rewards .the_reward .list > div span.icon4,
.rules .the_reward .list > div span.icon4 {
  background-image: url(./img/icon4.png?920396);
}
.rewards .the_reward .list > div span.icon5,
.rules .the_reward .list > div span.icon5 {
  background-image: url(./img/icon5.png?ef07af);
}
.rewards .the_reward .list > div span.icon6,
.rules .the_reward .list > div span.icon6 {
  background-image: url(./img/icon3.png?ea7af0);
}
.rewards .tip,
.rules .tip {
  margin-top: 0.5rem;
  padding: 0 0.44rem;
}
.rewards .tip li,
.rules .tip li {
  font-size: 0.26rem;
  color: #c385f8;
}
.copy {
  font-size: 0.24rem;
  color: #c385f8;
  text-align: center;
  padding: 0.3rem 0 0.2rem;
}
</style>
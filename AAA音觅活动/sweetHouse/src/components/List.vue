<template>
  <div class="list">
    <div class="title"></div>
    <ul>
      <li>
        <div class="name">薄荷檸檬水
          <span class="score">清爽值:50</span>
        </div>
        <div class="msg">
          <img src="" alt="">
          <i class="deng"></i>
          <div class="cai">
            <span><i></i><strong>13/3</strong></span>
            <span><i></i><strong>13/3</strong></span>
            <span><i></i><strong>13/3</strong></span>
          </div>
          <div class="creatBtn">
            獲取材料
          </div>
          <div class="overTips">已合成X份</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.list {
  width: 6.68rem;
  height: 13.81rem;
  background: url(../assets/img/listBg.png);
  background-size: 100% 100%;
  margin: 0.71rem auto 0;
  padding: 0.26rem 0.2rem 0;
  position: relative;
  .title {
    width: 4.67rem;
    height: 1.47rem;
    background: url(../assets/img/title2.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.85rem;
    z-index: 10;
    left: 1.22rem;
  }
  ul {
    z-index: 10;
    li {
      width: 6.15rem;
      height: 2.69rem;
      padding: 0 0.19rem 0 0.35rem;
      background: url(../assets/img/listItem.png);
      background-size: 100% 100%;
      margin-bottom: 0.11rem;
      position: relative;
      .name {
        height: 0.92rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.4rem;
        color: rgba(57, 114, 166, 1);
        font-weight: 500;
        .score {
          width: 1.6rem;
          height: 0.34rem;
          background: rgba(158, 196, 245, 0.6);
          border-radius: 0.17rem;
          font-size: 0.26rem;
          text-align: center;
          color: #fff;
        }
      }
      .msg {
        height: 1.6rem;
        display: flex;
        align-items: center;
        img {
          width: 1.4rem;
          height: 1.4rem;
          background: red;
        }
        .deng {
          width: 0.22rem;
          height: 0.21rem;
          background: url(../assets/img/deng.png);
          background-size: 100% 100%;
          margin: 0 0.16rem;
        }
        .cai {
          width: 2.3rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          span {
            display: flex;
            align-items: center;
            position: relative;
            i {
              width: 0.37rem;
              height: 0.38rem;
              margin-right: 0.24rem;
              background: orange;
            }
          }
          span:before {
            content: "";
            display: block;
            width: 0.22rem;
            height: 0.22rem;
            background: url(../assets/img/add.png);
            background-size: 100% 100%;
            position: absolute;
            bottom: -0.23rem;
            left: 0.08rem;
          }
          span:last-child:before {
            display: none;
          }
        }
        .creatBtn {
          width: 1.86rem;
          height: 0.62rem;
          background: url(../assets/img/creat1.png);
          background-size: 100% 100%;
          text-align: center;
          font-size: 0.28rem;
          color: rgba(37, 186, 74, 1);
          line-height: 0.62rem;
          font-weight: 500;
          &.status2 {
            color: rgba(114, 0, 91, 1);
            background: url(../assets/img/creat2.png);
            background-size: 100% 100%;
          }
        }
        .overTips {
          position: absolute;
          right: 0.43rem;
          bottom: 0.23rem;
          font-size: 0.26rem;
          font-weight: 500;
        }
      }
    }
  }
}
</style>

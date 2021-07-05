<template>
  <div class="page pageIndex" v-loading.fullscreen.lock="fullscreenLoading">
    <i class="liner"></i>
    <el-container>
      <el-header class="header">
        <div class="logo">
          <img src="../img/logo.png" alt="">
          <div class="userNick">
            {{nick}},{{aid}}
          </div>
        </div>
        <p class="adminTips">
          Hi, welcome to become the agent of VMeet. Here is the performance of anchor in your agent. We cannot show the anchor who do not input angent code correctly. The income of every anchorwill be
          counted once a day (UTC +4).If you have any questions, please contact VMeet.
        </p>
        <div class="setTime">
          <div class="tm">
            <el-date-picker v-model="time1" type="date" placeholder="Select a date">
            </el-date-picker>
            <i></i>
            <el-date-picker v-model="time2" type="date" placeholder="Select a date">
            </el-date-picker>
          </div>
          <div class="userId">
            <div class="selectUid" :class="{focus:true}">
              <!-- <label for="userUid">Uid</label> -->
              <input type="number" placeholder="Uid" class="selectUid" v-model="uid">
            </div>
            <div class="check" @click="check()">
              Check
            </div>
          </div>

        </div>
      </el-header>
      <el-main class="main">
        <!-- .slice((curPage -1)*pagesize,curPage*pagesize -->
        <el-table :data="tableData" :border='false' style="width: 100%" stripe :header-cell-style="{color:'#121212',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900, textAlign: 'center'}">
          <el-table-column fixed prop="nick" label="Nickname" width="132" :max-height="81">
          </el-table-column>
          <el-table-column prop="uid" label="UID" width="110" max-width="132" min-width="110" :max-height="81">
          </el-table-column>
          <el-table-column prop="" label="Photo" width="110" :max-height="81">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" alt="" class="userImg" />
            </template>
          </el-table-column>
          <el-table-column prop="matchVideoDuration" label="Match Duration " width="164" :max-height="81">
          </el-table-column>
          <el-table-column prop="matchVideoDiamond" label="Diamonds from Match" width="164" :max-height="81">
          </el-table-column>
          <el-table-column prop="callVideoDuration" label="Call Duration" width="143" :max-height="81">
          </el-table-column>
          <el-table-column prop="callVideoDiamond" label="Diamonds from Call" width="164" :max-height="81">
          </el-table-column>
          <el-table-column prop="giftDiamond" label="Gift giving" width="162" :max-height="81">
          </el-table-column>
          <el-table-column prop="totalDiamond" label="Total Diamonds" width="164" :max-height="81">
          </el-table-column>
          <el-table-column prop="callNum" label="Active Call Times" width="164" :max-height="81">
          </el-table-column>
          <el-table-column prop="beCalledNum" label="Passive Call Times" width="162" :max-height="81">
          </el-table-column>
          <el-table-column prop="callCompletingRate" label="Answering Rate" width="162" :max-height="81">
          </el-table-column>
          <el-table-column prop="onlineCallCompletingRate" label="Online Answering Rate" width="162" :max-height="81">
          </el-table-column>
          <el-table-column prop="withdrawCash" label="Withdraw" width="162" :max-height="81">
          </el-table-column>
          <el-table-column prop="income" label="Agent  Fee" width="162" :max-height="81">
          </el-table-column>
          <div slot="empty" class="empty">
            <img src="../img/icon_empty.png" />
          </div>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="totolNums" :current-page.sync="curPage" :page-size="pagesize" prev-text="Previous" next-text="Next" @size-change="handleSizeChange"
          @current-change="handleCureentChange">
        </el-pagination>

      </el-main>
    </el-container>
    <el-dialog title="Tips" :visible.sync="dialogVisible" width="30%">
      <span>{{errStr}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button type="primary" @click="ok()">determine</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { get, list } from "../apis"
import getDate from "../utils/getDate"
import { getUrlString } from "../utils"
export default {
  data () {
    return {
      time1: '',
      time2: '',
      start_date: '',
      end_date: '',
      uid: '',
      uid_2: '',
      pagesize: 9, //每页显示个数     默认
      curPage: 1,   //当前页数         默认
      tableData: [],
      dialogVisible: false,
      errStr: '',
      createdFirst: true,
      fullscreenLoading: false,
      totolNums: 0
    }
  },
  created () {
    this.getList('creat', 1)
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
  },
  computed: {
    aid () {
      return getUrlString('aid') || ''
    },
    nick () {
      return getUrlString('nick') || ''
    }
  },
  methods: {
    getList (creat, page, start_date, end_date, uid) {
      this.fullscreenLoading = true
      list(page, start_date, end_date, uid).then(res => {
        this.fullscreenLoading = false
        if (res.data.response_status.code == 0) {
          if (creat) {  //初始化成功修改状态用于弹窗按钮点击逻辑
            this.createdFirst = false

          }
          this.totolNums = res.data.response_data.total
          this.tableData = res.data.response_data.list
        } else {
          this.dialogVisible = true
          this.errStr = res.data.response_status.error
        }
      })
    },
    check () {
      if (this.time1 && this.time2) {
        if (this.time1.getTime() > this.time2.getTime()) {
          this.dialogVisible = true
          this.errStr = ` Incorrect time period selection`
          return
        }
      }
      const time1 = this.time1 ? getDate(new Date(this.time1), 1) : ''
      const time2 = this.time2 ? getDate(new Date(this.time2), 1) : ''
      this.start_date = time1
      this.end_date = time2
      this.uid_2 = this.uid
      this.getList(0, 1, this.start_date, this.end_date, this.uid_2)
    },
    ok () {
      if (this.createdFirst) {
        this.$router.push({ name: 'login' })
      } else {
        this.dialogVisible = false
      }
    },
    handleClick (row) {
      console.log(row);
    },
    pagChange (val) {
      console.log(val)
    },
    //显示数量
    handleCureentChange (val) {
      console.log(val)
      this.curPage = val;
      this.getList(0, val, this.start_date, this.end_date, this.uid_2)
    },
    //每页显示条数                 
    handleSizeChange (val) {
      console.log(val)
      this.pagesize = val;
    }
  },
}
</script>

<style lang="scss">
.pageIndex {
  padding-bottom: 44px;
  .userImg {
    object-fit: cover !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-size: cover !important;
  }
  .liner {
    display: block;
    width: 100%;
    height: 10px;
    position: absolute;
    top: 84px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  }
  .header {
    width: 1644px;
    margin: 0 auto;
    height: auto !important;
    padding: 0 !important;

    .logo {
      height: 64px;
      padding-top: 16px;
      background: #FFFFFF;
      //   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .userNick {
        font-size: 16px;
      }
      img {
        width: 158px;
        height: 48px;
      }
    }
    .adminTips {
      width: 768px;
      height: 60px;
      padding: 10px;
      background: #FBF8FF;
      border-radius: 4px;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      margin-top: 24px;
    }
    .setTime {
      display: flex;
      align-items: center;
      margin: 24px 0;
      .tm {
        display: flex;
        align-items: center;
        > i {
          display: inline-block;
          width: 10px;
          height: 2px;
          background: #DDD;
          border-radius: 2px;
          margin: 0 10px;
        }
      }

      .userId {
        display: flex;
        align-items: center;
        .selectUid {
          input {
            width: 196px;
            height: 40px;
            background: #FFFFFF;
            border: 1px solid #DDDDDD;
            display: flex;
            align-items: center;
            margin-left: 9px;
            border-radius: 4px;
            // border: none;
            padding: 0 12px;
            color: rgba(51, 51, 51, 1);
          }
          input::placeholder {
            color: rgba(221, 221, 221, 1);
            font-size: 14px;
          }
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
          input[type='number']:focus {
            border: 1px solid rgba(126, 54, 255, 1);
            border-radius: 4px;
          }
        }
        .check {
          cursor: default;
          user-select: none;
          width: 70px;
          height: 40px;
          background: #7E36FF;
          border-radius: 4px;
          text-align: center;
          line-height: 40px;
          color: #fff;
          font-size: 14px;
          margin-left: 20px;
        }
        .check:hover {
          background: #8D4DFF;
        }
        .check:active {
          background: #7E36FF;
        }
      }
    }
  }
  .main {
    width: 1644px;
    // margin-left: 138px;
    margin: 0 auto;
    padding: 0;
    .el-table_1_column_2 {
      .cell {
        // display: block !important;
        // text-align: left !important;
        justify-content: start;
      }
    }
    tr {
      max-height: 70px;
    }
    td {
      padding: 0;
    }
    .el-table {
      min-height: 700px;
    }
    .el-table_1_column_1,
    .el-table_1_column_2 {
      text-align: left !important;
    }
    .btn-prev {
      width: 89px;
      height: 40px;
      background: #F7F7F7;
      border-radius: 4px;
      color: #999;
      font-size: 14px;
    }
    .btn-next {
      width: 62px;
      height: 40px;
      background: #F7F7F7;
      border-radius: 4px;
      color: #999;
      font-size: 14px;
      margin-right: 0 !important;
    }
    .el-pagination {
      text-align: right;
      margin-top: 24px;
      padding: 0;
    }
    .el-pager {
      .number {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        font-size: 14px;
        color: #999;
        &.active {
          background-color: #7E36FF !important;
        }
      }
    }
    td {
      text-align: center !important;
    }
    .el-table__fixed {
      text-align: left !important;
      .cell {
        justify-content: start;
      }
    }
    .el-table__empty-block {
      height: 630px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      .empty {
        margin-left: -700px;
      }
    }
    .el-table__row {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: none !important;
      }
    }
  }
}
.el-input__icon {
  height: 1px !important;
}
.el-table__fixed {
  box-shadow: none !important;
}
.el-table td,
.el-table th,
.is-leaf {
  border-bottom: none !important;
}
// .el-table--striped,
thead,
.el-table__row--striped {
  background: #707070 !important;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: none;
}
.el-table__row {
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
.el-table::before,
.el-table__fixed::before {
  height: 0 !important;
  display: none;
  opacity: 0;
}
@media screen and (min-width: 1441px) and (max-width: 1600px) {
  .main,
  .header {
    width: 1164px !important;
  }
  .el-table__empty-block {
    .empty {
      margin-left: -1100px !important;
    }
  }
}

@media screen and (min-width: 1081px) and (max-width: 1440px) {
  .main,
  .header {
    width: 1164px !important;
  }
  .el-table__empty-block {
    .empty {
      margin-left: -1100px !important;
    }
  }
}

@media screen and (min-width: 751px) and (max-width: 1080px) {
  .header {
    width: 820px !important;
    // padding: 0 40px !important;
    .setTime {
      display: block !important;
      .userId {
        margin-top: 10px;
        .selectUid {
          input {
            margin-left: 0 !important;
          }
        }
      }
    }
    .check {
      margin-left: 28px !important;
    }
  }
  .main {
    width: 820px !important;
    margin: 0 auto !important;
    .el-pagination {
      text-align: left !important;
      .btn-prev {
        margin-left: 0 !important;
      }
    }
  }
  .el-table__empty-block {
    .empty {
      margin-left: -1450px !important;
    }
  }
}

@media screen and (max-width: 750px) {
  input {
    box-shadow: none !important;
    outline: none !important;
    -webkit-appearance: none !important;
    /*去除系统默认的样式*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  }
  .pageIndex {
    padding-bottom: 0.44rem;
    .liner {
      display: block;
      width: 100%;
      height: 0.1rem;
      position: absolute;
      top: 0.84rem;
      box-shadow: 0 0.04rem 0.1rem rgba(0, 0, 0, 0.04);
    }
    .header {
      width: 6.4rem !important;
      margin: 0 auto;
      height: auto !important;
      padding: 0 !important;

      .logo {
        height: 0.64rem !important;
        padding-top: 0.16rem;
        background: #FFFFFF;
        //   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .userNick {
          font-size: 0.16rem;
        }
        img {
          width: 1.58rem;
          height: 0.48rem;
        }
      }
      .adminTips {
        width: 6.4rem !important;
        height: 0.6rem;
        padding: 0.1rem;
        background: #FBF8FF;
        border-radius: 0.04rem;
        font-size: 0.14rem;
        line-height: 0.22rem;
        color: #666;
        margin-top: 0.24rem;
      }
      .setTime {
        display: flex;
        align-items: center;
        margin: 0.24rem 0;
        .tm {
          display: flex;
          align-items: center;
          > i {
            display: inline-block;
            width: 0.1rem;
            height: 0.02rem;
            background: #DDD;
            border-radius: 0.02rem;
            margin: 0 0.1rem;
          }
        }

        .userId {
          display: flex;
          align-items: center;
          .selectUid {
            input {
              width: 1.96rem;
              height: 0.4rem;
              background: #FFFFFF;
              border: 1px solid #DDDDDD;
              display: flex;
              align-items: center;
              margin-left: 0.09rem;
              border-radius: 0.04rem;
              // border: none;
              padding: 0 0.12rem;
              color: rgba(51, 51, 51, 1);
              font-size: 0.24rem;
            }
            input::placeholder {
              color: rgba(221, 221, 221, 1);
              font-size: 0.24rem;
            }
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
            input[type='number']:focus {
              border: 1px solid rgba(126, 54, 255, 1);
              border-radius: 0.04rem;
            }
          }
          .check {
            cursor: default;
            user-select: none;
            width: 0.7rem;
            height: 0.4rem;
            background: #7E36FF;
            border-radius: 0.4rem;
            text-align: center;
            line-height: 0.4rem;
            color: #fff;
            font-size: 0.2rem;
            margin-left: 0.2rem;
          }
          .check:hover {
            background: #8D4DFF;
          }
          .check:active {
            background: #7E36FF;
          }
        }
      }
      .el-date-editor {
        width: 4.4rem;
        input {
          padding-right: 0;
        }
      }
      .setTime {
        display: block !important;
        .userId {
          height: 0.8rem;
          margin-top: 10px;
          .selectUid {
            input {
              width: 2.8rem;
              height: 0.8rem;
              margin-left: 0 !important;
            }
          }
          .check {
            width: 1.4rem;
            height: 0.8rem;
            line-height: 0.8rem;
            background: #7E36FF;
            border-radius: 0.08rem;
            font-size: 0.26rem;
            margin-left: 0.27rem;
          }
        }
      }
    }
    .main {
      width: 6.4rem !important;
      // margin-left: 138px;
      margin: 0 auto;
      padding: 0;
      tr {
        max-height: 0.7rem;
      }
      td {
        padding: 0;
      }
      .el-table {
        min-height: 7rem;
      }
      .el-table_1_column_1,
      .el-table_1_column_2 {
        text-align: left !important;
      }
      .btn-prev {
        width: 0.89rem;
        height: 0.4rem;
        background: #F7F7F7;
        border-radius: 0.4rem;
        color: #999;
        font-size: 0.14rem;
      }
      .btn-next {
        width: 0.62rem;
        height: 0.4rem;
        background: #F7F7F7;
        border-radius: 0.04rem;
        color: #999;
        font-size: 0.14rem;
        margin-right: 0 !important;
      }
      .el-pagination {
        text-align: right;
        margin-top: 0.24rem;
        padding: 0;
        button {
          span {
            height: 100% !important;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.14rem !important;
          }
        }
      }
      .el-pager {
        .number {
          width: 0.4rem;
          height: 0.4rem;
          text-align: center;
          line-height: 0.4rem;
          border-radius: 0.04rem;
          font-size: 0.14rem;
          color: #999;
          &.active {
            background-color: #7E36FF !important;
          }
        }
      }
      td {
        text-align: center !important;
      }
      .el-table__fixed {
        text-align: left !important;
        .cell {
          justify-content: start;
        }
      }
      .el-table__empty-block {
        height: 6.3rem !important;
        display: flex;
        align-items: center;
        justify-content: center;
        .empty {
          margin-left: -7rem;
        }
      }
      .el-table__row {
        img {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: none !important;
        }
      }
    }
  }
  .el-input__icon {
    height: 0.3rem !important;
    font-size: 0.2rem !important;
  }
  .el-table__fixed {
    box-shadow: none !important;
  }
  .el-table td,
  .el-table th,
  .is-leaf {
    border-bottom: none !important;
  }
  // .el-table--striped,
  thead,
  .el-table__row--striped {
    background: #707070 !important;
  }
  thead {
    .cell {
      font-size: 0.14rem !important;
    }
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: none;
  }
  .el-table__row {
    .cell {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.7rem;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
}
body table .el-table_1_column_1,
body table .el-table_1_column_3 {
  width: 1.1rem !important;
}
// .el-table_1_column_2 {
//   width: 1.32rem !important;
// }
// .el-table_1_column_4,
// .el-table_1_column_5,
// .el-table_1_column_7,
// .el-table_1_column_9,
// .el-table_1_column_10 {
//   width: 1.64rem !important;
// }
// .el-table_1_column_6 {
//   width: 1.43rem !important;
// }
// .el-table_1_column_8,
// .el-table_1_column_11,
// .el-table_1_column_12,
// .el-table_1_column_13,
// .el-table_1_column_14,
// .el-table_1_column_15 {
//   width: 1.62rem !important;
// }
</style>
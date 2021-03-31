<template>
  <div class="page pageIndex">
    <el-container>
      <el-header class="header">
        <div class="logo">
          <img src="../img/logo.png" alt="">
        </div>
        <p class="adminTips">
          Hi, welcome to become the agent of VMeet. Here is the performance of anchor in your agent. We cannot show the anchor who do not input angent code correctly. The income of every anchorwill be
          counted once a day (UTC +4).If you have any questions, please contact VMeet.
        </p>
        <div class="setTime">
          <div class="tm">
            <el-date-picker v-model="time1" type="date" placeholder="选择日期">
            </el-date-picker>
            <i></i>
            <el-date-picker v-model="time2" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="userId">
            <div class="selectUid" :class="{focus:true}">
              <!-- <label for="userUid">Uid</label> -->
              <input type="number" placeholder="Uid" class="selectUid">
            </div>
            <div class="check">
              Check
            </div>
          </div>

        </div>
      </el-header>
      <el-main class="main">
        <el-table :data="tableData.slice((curPage -1)*pagesize,curPage*pagesize)" border style="width: 100%" stripe
          :header-cell-style="{color:'#121212',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900, textAlign: 'center'}">
          <el-table-column fixed prop="date" label="UID" width="110">
          </el-table-column>
          <el-table-column fixed prop="name" label="Nickname" width="132">
          </el-table-column>
          <el-table-column prop="province" label="Photo" width="110">
          </el-table-column>
          <el-table-column prop="city" label="Match Duration " width="164">
          </el-table-column>
          <el-table-column prop="address" label="Diamonds from Match" width="164">
          </el-table-column>
          <el-table-column prop="zip" label="Call Duration" width="143">
          </el-table-column>
          <el-table-column prop="zip" label="Diamonds from Call" width="164">
          </el-table-column>
          <el-table-column prop="zip" label="Total Diamonds" width="162">
          </el-table-column>
          <el-table-column prop="zip" label="Active Call Times" width="164">
          </el-table-column>
          <el-table-column prop="zip" label="Passive Call Times" width="164">
          </el-table-column>
          <el-table-column prop="zip" label="Answering Rate" width="162">
          </el-table-column>
          <div slot="empty" class="empty">
            <img src="../img/icon_empty.png" />
          </div>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :current-page.sync="curPage" :page-size="pagesize" prev-text="Previous" next-text="Next"
          @size-change="handleSizeChange" @current-change="handleCureentChange">
        </el-pagination>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time1: '',
      time2: '',
      pagesize: 10, //每页显示个数     默认
      curPage: 1,   //当前页数         默认
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-055555',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  },
  computed: {

  },
  methods: {
    handleClick (row) {
      console.log(row);
    },
    pagChange (val) {
      console.log(val)
    },
    //显示数量
    handleCureentChange (val) {
      this.curPage = val;
    },
    //每页显示条数                 
    handleSizeChange (val) {
      this.pagesize = val;
    }
  },
}
</script>

<style lang="scss">
.pageIndex {
  padding-bottom: 44px;
  .header {
    padding: 0 138px;
    height: auto !important;
    .logo {
      height: 64px;
      padding-top: 16px;
      background: #FFFFFF;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
      img {
        width: 158px;
        height: 48px;
      }
    }
    .adminTips {
      width: 768px;
      height: 50px;
      padding: 10px;
      background: #FBF8FF;
      border-radius: 4px;
      font-size: 14px;
      line-height: 22px;
      color: #666;
    }
    .setTime {
      display: flex;
      align-items: center;
      margin: 24px 0;
      i {
        width: 10px;
        height: 2px;
        background: #DDDDDD;
        border-radius: 2px;
        margin: 0 10px;
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
          width: 70px;
          height: 38px;
          background: #7E36FF;
          border-radius: 4px;
          text-align: center;
          line-height: 38px;
          color: #fff;
          font-size: 14px;
          margin-left: 20px;
        }
        .check:hover {
          background: #8D4DFF;
        }
      }
    }
  }
  .main {
    width: 1644px;
    margin-left: 138px;
    padding: 0;
    .el-table {
      min-height: 700px;
    }
    .el-table_1_column_1,
    .el-table_1_column_12 {
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
    }
    .el-table__empty-block {
      height: 630px !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
@media screen and (max-width: 1440px) {
  .main {
    width: 1164px !important;
  }
  .el-table__empty-block {
    .empty {
      margin-left: -500px;
    }
  }
}

/* 在 600 像素或更小的屏幕上，将背景色设置为橄榄色 */
@media screen and (max-width: 900px) {
  .header {
    padding: 0 40px !important;
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
  }
  .main {
    width: 820px !important;
    margin-left: 40px !important;
    .el-pagination {
      text-align: left !important;
      .btn-prev {
        margin-left: 0 !important;
      }
    }
  }
  .el-table__empty-block {
    .empty {
      margin-left: -800px;
    }
  }
}
</style>
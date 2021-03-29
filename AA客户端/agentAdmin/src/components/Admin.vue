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
          <el-date-picker v-model="time1" type="date" placeholder="选择日期">
          </el-date-picker>
          <i></i>
          <el-date-picker v-model="time2" type="date" placeholder="选择日期">
          </el-date-picker>
          <div class="selectUid" :class="{focus:true}">
            <!-- <label for="userUid">Uid</label> -->
            <input type="number" placeholder="Uid" class="selectUid">
          </div>
          <div class="check">
            Check
          </div>
        </div>
      </el-header>
      <el-main class="main">
        <el-table :data="tableData" border style="width: 100%" stripe="true" header-row-class-name="tabHeader">
          <el-table-column fixed prop="date" label="UID" width="110">
          </el-table-column>
          <el-table-column prop="name" label="Nickname" width="132">
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
        </el-table>

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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  computed: {

  },
  methods: {
    handleClick (row) {
      console.log(row);
    }
  },
}
</script>

<style lang="scss">
.pageIndex {
  // padding: $page-padding;
  .header {
    padding: 0 138px;
    height: auto !important;
    .logo {
      height: 64px;
      padding-top: 16px;
      background: #FFFFFF;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
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
    }
    .selectUid {
      input {
        width: 220px;
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
  .main {
    padding: 0 138px;
    width: 1644px;
    // .tabHeader {
    //   height: 70px;
    //   background: #F7F7F7;
    // }
  }
}
</style>
<template>
  <div class="mailbox">
    <MailDialog :visible.sync="showMail" v-if="showMail" />
  </div>
</template>

<script>
import MailDialog from "./MailDialog"
export default {
  components: { MailDialog },
  data () {
    return {
      showMail: false
    }
  }
}
</script>

<style lang="scss">
.mailbox {
  width: 6rem;
  height: 8.45rem;
  padding: 0.28rem 0.6rem;
  background: url(../img/inivitBg.png);
  background-size: 100% 100%;
  //   .title {
  //     height: 1.1rem;
  //     text-align: center;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     font-size: 0.34rem;
  //     color: rgba(188, 37, 104, 1);
  //   }
}
</style>
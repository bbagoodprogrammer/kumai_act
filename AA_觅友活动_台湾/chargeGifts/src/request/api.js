/**
 * api接口集合
 */
const API = {
  GoStore: '//pay.17sing.tw/mycard_activity/index.php?uid={uid}&token={token}',
  Init: '/index.php?action=chargeGifts.init&signture=innerserver&uid={uid}&token={token}',
  Get: '/index.php?action=chargeGifts.get&amount={amount}&signture=innerserver&uid={uid}&token={token}',
  History: '/index.php?action=chargeGifts.history&signture=innerserver&uid={uid}&token={token}',
  Test: '/index.php?action=chargeGifts.test&signture=innerserver&uid={uid}&amount={amount}',
}

export default API

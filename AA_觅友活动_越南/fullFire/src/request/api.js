/**
 * api接口集合
 */
const API = {
  init: '/index.php?action=fullFire.init&signture=innerserver&uid={uid}&token={token}',
  roomRank: '/index.php?action=fullFire.roomRank&from={from}&signture=innerserver&uid={uid}&token={token}',
  contributionRank: '/index.php?action=fullFire.contributionRank&signture=innerserver&from={from}&rid={rid}&uid={uid}&token={token}',
  attendParty: '/index.php?action=fullFire.attendParty&signture=innerserver&rid={rid}&uid={uid}&token={token}',
  // Test: '/index.php?action=fullFire.test&signture=innerserver&uid={uid}&amount={amount}',
}

export default API

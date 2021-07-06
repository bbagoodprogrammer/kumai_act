/**
 * api接口集合
 */
const API = {
  //初始化
  init: '/index.php?signture=innerserver&action=happyDuck.init&token={token}&uid={uid}',
  //榜单
  rank: '/index.php?signture=innerserver&action=happyDuck.rank&token={token}&uid={uid}&from={from}',
  //投喂
  feed: '/index.php?signture=innerserver&action=happyDuck.feed&token={token}&uid={uid}&price={price}',
  //投喂记录
  history: '/index.php?signture=innerserver&action=happyDuck.history&token={token}&uid={uid}&from={from}',
  //领取阶段礼物
  openStageGift: '/index.php?signture=innerserver&action=happyDuck.openStageGift&token={token}&uid={uid}&index={index}',
  //礼物广播
  notice: '/index.php?signture=innerserver&action=happyDuck.notice'
}

export default API

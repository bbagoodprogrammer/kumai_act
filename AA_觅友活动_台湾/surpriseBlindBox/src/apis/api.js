/**
 * api接口集合
 */
const API = {
  //初始化
  init: '/index.php?signture=innerserver&action=surpriseBlindBox.init&token={token}&uid={uid}',
  //榜单
  rank: '/index.php?signture=innerserver&action=surpriseBlindBox.rank&token={token}&uid={uid}&from={from}',
  //总榜单
  totalRank: '/index.php?signture=innerserver&action=surpriseBlindBox.totalRank&token={token}&uid={uid}&from={from}',
  //好友列表
  friends: '/index.php?signture=innerserver&action=surpriseBlindBox.friends&token={token}&uid={uid}&from={from}&type={type}',
  //邀请用户
  invite: '/index.php?signture=innerserver&action=surpriseBlindBox.invite&token={token}&uid={uid}&fuid={fuid}',
  //赠送盲盒
  giveBlindBox: '/index.php?signture=innerserver&action=surpriseBlindBox.giveBlindBox&token={token}&uid={uid}&count={count}&id={id}&fuid={fuid}',
  //自己购买盲盒
  purchaseBlindBox: '/index.php?signture=innerserver&action=surpriseBlindBox.giveBlindBox&token={token}&uid={uid}&count={count}&id={id}',
  //用户购买记录（购买，赠送）
  purchaseHistory: '/index.php?signture=innerserver&action=surpriseBlindBox.purchaseHistory&token={token}&uid={uid}&from={from}',
  //未打开的盲盒数据
  notOpenBlindBox: '/index.php?signture=innerserver&action=surpriseBlindBox.notOpenBlindBox&token={token}&uid={uid}',
  //用户已经打开的盲盒数据
  openBlindBoxHistory: '/index.php?signture=innerserver&action=surpriseBlindBox.openBlindBoxHistory&token={token}&uid={uid}&from={from}',
  //开盲盒 （开好友送的盲盒）
  openBlindBox: '/index.php?signture=innerserver&action=surpriseBlindBox.openBlindBox&token={token}&uid={uid}&fuid={fuid}',
  //查看好友收藏
  seeCollect: '/index.php?signture=innerserver&action=surpriseBlindBox.seeCollect&token={token}&uid={uid}&fuid={fuid}&series={series}',
  //查看自己收藏
  seeMyCollect: '/index.php?signture=innerserver&action=surpriseBlindBox.seeCollect&token={token}&uid={uid}&series={series}',
  //广播
  notice: '/index.php?signture=innerserver&action=surpriseBlindBox.notice'
}

export default API

/**
 * api接口集合
 */
const API = {
  //初始化
  init: '/index.php?signture=innerserver&action=ringMagicHouse.init&token={token}&uid={uid}',
  //进入活动
  subscribe: '/index.php?signture=innerserver&action=ringMagicHouse.subscribe&token={token}&uid={uid}',
  //弹出窗口的邀请列表
  acceptableInvita: '/index.php?signture=innerserver&action=ringMagicHouse.acceptableInvita&token={token}&uid={uid}',
  //好友列表
  friends: '/index.php?signture=innerserver&action=ringMagicHouse.friends&token={token}&uid={uid}',
  //灵魂默契点击
  cooperateClick: '/index.php?signture=innerserver&action=ringMagicHouse.cooperateClick&token={token}&uid={uid}',
  //打招呼
  sayHello: '/index.php?signture=innerserver&action=ringMagicHouse.sayHello&token={token}&uid={uid}',
  //榜单
  rank: '/index.php?signture=innerserver&action=ringMagicHouse.rank&token={token}&uid={uid}&from={from}',
  //邀请好友
  invite: '/index.php?signture=innerserver&action=ringMagicHouse.invite&token={token}&uid={uid}&to_uid={to_uid}',
  //拒绝邀请
  reject: '/index.php?signture=innerserver&action=ringMagicHouse.reject&token={token}&uid={uid}&mail_id={mail_id}',
  //接受邀请
  accept: '/index.php?signture=innerserver&action=ringMagicHouse.accept&token={token}&uid={uid}&mail_id={mail_id}',
  //解除关系
  relieve: '/index.php?signture=innerserver&action=ringMagicHouse.relieve&token={token}&uid={uid}',
  //拒绝解除关系
  rejectRelieve: '/index.php?signture=innerserver&action=ringMagicHouse.rejectRelieve&token={token}&uid={uid}&mail_id={mail_id}',
  //接受解除关系
  acceptRelieve: '/index.php?signture=innerserver&action=ringMagicHouse.acceptRelieve&token={token}&uid={uid}&mail_id={mail_id}',
  //日常动态
  history: '/index.php?signture=innerserver&action=ringMagicHouse.history&token={token}&uid={uid}&from={from}',
  //制作成功广播
  notice: '/index.php?signture=innerserver&action=ringMagicHouse.notice',
  //邀请信箱
  invitedMail: '/index.php?signture=innerserver&action=ringMagicHouse.invitedMail&token={token}&uid={uid}&from={from}',
  //其他信箱
  otherMail: '/index.php?signture=innerserver&action=ringMagicHouse.otherMail&token={token}&uid={uid}&from={from}',
  //领取完成任務
  finishTheTask: '/index.php?signture=innerserver&action=ringMagicHouse.finishTheTask&token={token}&uid={uid}&task_name={task_name}',
  //点击制作
  makingRings: '/index.php?signture=innerserver&action=ringMagicHouse.makingRings&token={token}&uid={uid}&rid={rid}',
}

export default API

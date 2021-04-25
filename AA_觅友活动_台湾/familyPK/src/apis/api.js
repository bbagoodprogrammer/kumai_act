/**
 * api接口集合
 */
const API = {
  //初始化
  init: '/index.php?signture=innerserver&action=familyPK.init&token={token}&uid={uid}',
  //家族列表
  familyList: '/index.php?signture=innerserver&action=familyPK.familyList&token={token}&uid={uid}&from={from}',
  //创建家族
  createFamily: '/index.php?signture=innerserver&action=familyPK.createFamily&token={token}&uid={uid}&title={title}&concept={concept}&team={team}',
  //申请加入家族
  joinFamily: '/index.php?signture=innerserver&action=familyPK.joinFamily&token={token}&uid={uid}&familyId={familyId}',
  //家族详情
  familyData: '/index.php?signture=innerserver&action=familyPK.familyData&token={token}&uid={uid}&familyId={familyId}',
  //好友列表
  friends: '/index.php?signture=innerserver&action=familyPK.friends&token={token}&uid={uid}',
  //邀请好友
  invite: '/index.php?signture=innerserver&action=familyPK.invite&token={token}&uid={uid}&fuids={fuids}',
  //接受加入申请
  accept: '/index.php?signture=innerserver&action=familyPK.accept&token={token}&uid={uid}&&mailId={mailId}',
  //拒绝加入申请
  reject: '/index.php?signture=innerserver&action=familyPK.reject&token={token}&uid={uid}&&mailId={mailId}',
  //退出家族
  quitFamily: '/index.php?signture=innerserver&action=familyPK.quitFamily&token={token}&uid={uid}',
  //守护动态
  history: '/index.php?signture=innerserver&action=familyPK.history&token={token}&uid={uid}&from={from}',
  //申请加入家族列表
  applyList: '/index.php?signture=innerserver&action=familyPK.applyList&token={token}&uid={uid}',
  //其他动态列表
  otherList: '/index.php?signture=innerserver&action=familyPK.otherList&token={token}&uid={uid}&from={from}',
  //守护榜
  rank: '/index.php?signture=innerserver&action=familyPK.rank&token={token}&uid={uid}&from={from}&type={type}',
  //贡献榜
  contributionRank: '/index.php?signture=innerserver&action=familyPK.contributionRank&token={token}&uid={uid}&familyId={familyId}&type={type}',

  notice: '/index.php?signture=innerserver&action=familyPK.notice'
}

export default API

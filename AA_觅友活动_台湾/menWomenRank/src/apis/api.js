/**
 * api接口集合
 */
const API = {
  //初始化
  init: '/index.php?signture=innerserver&action=menWomenRank.init&token={token}&uid={uid}',
  //榜单
  rank: '/index.php?signture=innerserver&action=menWomenRank.rank&token={token}&uid={uid}&from={from}&sex={sex}',
  //报名
  register: '/index.php?signture=innerserver&action=menWomenRank.register&token={token}&uid={uid}',
  //粉丝贡献榜单
  fansRank: '/index.php?signture=innerserver&action=menWomenRank.fansRank&token={token}&uid={uid}&rankUid={rankUid}',
  
  notice: '/index.php?signture=innerserver&action=menWomenRank.notice'
}

export default API

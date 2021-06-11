let test = false;
const host = location.host;

// 采用相对路径，不设置origin域名，方便多端部署
let folder = '';
let origin = '';

// token=WiILbSxUL5AhqlaRLRvXHSP3U8wrM-36bWXkzs5DNKWQhbbVTpSdVxSdH59LOq6G5xthp1wPMg-li9vuRMo6ZWTc2Z8TNYEuQaWuG8QeqkSzr7YfRA7i1c6OoE6dZfdV&uid=10012674
let api = {
    getPrizeList: '/index.php?action=Action/TreasureHunt.getPrizeList&token={token}&uid={uid}&rid={rid}&lang=' + _clang,
    getHuntRecord: '/index.php?action=Action/TreasureHunt.getHuntRecord&token={token}&uid={uid}&rid={rid}&lang=' + _clang,
    getSuperProgress: '/index.php?action=Action/TreasureHunt.getSuperProgress&token={token}&uid={uid}&rid={rid}&lang=' + _clang,
    gainMap: '/index.php?action=Action/TreasureHunt.gainMap&token={token}&uid={uid}&rid={rid}&num={num}&lang=' + _clang,
    startHunt: '/index.php?action=Action/TreasureHunt.startHunt&token={token}&uid={uid}&rid={rid}&num={num}&mode={mode}&lang=' + _clang,
    getMyHuntRecord: '/index.php?action=Action/TreasureHunt.getMyHuntRecord&token={token}&uid={uid}&rid={rid}&start={start}&num=20&lang=' + _clang,
    getAdventureList: '/index.php?action=Action/TreasureHunt.getAdventureList&token={token}&uid={uid}&rid={rid}&whichWeek={whichWeek}&lang=' + _clang,
    getExchangeList: '/index.php?action=Action/TreasureHunt.getExchangeList&token={token}&uid={uid}&rid={rid}&lang=' + _clang,
    exchangeProp: '/index.php?action=Action/TreasureHunt.exchangeProp&token={token}&uid={uid}&rid={rid}&id={id}&lang=' + _clang,
}

if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    test = true;
    folder = '';
    origin = '';
    for (const i in api) {
        api[i] = api[i] + '&signture=innerserver'
    }
}

const httpApiRoot = test ? folder : origin + folder;

export default {
    host,
    origin,
    httpApiRoot,
    ...api
}

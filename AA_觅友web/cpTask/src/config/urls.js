let test = false;
const host = location.host;

// 采用相对路径，不设置origin域名，方便多端部署
let folder = '';
let origin = '';
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    test = true;
    folder = '';
    origin = '';
}

const httpApiRoot = test ? folder : origin + folder;

export default {
    host,
    origin,
    httpApiRoot,
 
    init: httpApiRoot+'/index.php?lang=' + _clang + '&action=couple.cpTask&uid={uid}&token={token}&signture=innerserver',
    clockIn: httpApiRoot+'/index.php?lang=' + _clang + '&action=couple.clockInTask&token={token}&signture=innerserver',

    //svga: 'img/anim.svga',
}

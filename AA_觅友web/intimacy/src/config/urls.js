let test = false;
const host = location.host;

let folder = '';
let origin = '';
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    test = true;
    folder = '';
    origin = 'http://t.act.udateapp.com';
}

const httpApiRoot = test ? folder : origin + folder;

export default {
    host,
    origin,
    httpApiRoot,
 
    init: httpApiRoot+'/index.php?signture=innerserver&lang=' + _clang + '&action=couple.cpPrivilege&uid={uid}&token={token}&touid={touid}',

    svga: '',
}

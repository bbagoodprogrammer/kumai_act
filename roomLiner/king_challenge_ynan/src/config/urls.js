let test = false;
const host = location.host;

let folder = '/pet_manor';
let origin = 'http://activity.17sing.tw';
let socketUri = 'ws://activity.17sing.tw/websocket';
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    test = true;
    folder = '/pet_manor';
    origin = 'http://activity.17sing.tw';
    socketUri = 'ws://beatupload.17sing.tw/websocket';
}

const socketApiRoot = origin + folder;
const httpApiRoot = test ? folder : socketApiRoot;

export default {
    host,
    origin,
    socketApiRoot,
    httpApiRoot,

    socketUri,
    socketApp: 'hsing_activity',
    socketApi: socketApiRoot + '/index.php?action=activity.wsApi',

    init: httpApiRoot + '/userbannermsg.php?touid={touid}&rid={rid}&uid={uid}&token={token}',
}
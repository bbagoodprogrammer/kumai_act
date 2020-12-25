let test = false;
const host = location.host;

let folder = '';
let origin = '';
let socketUri = 'ws://xws.17sing.tw/websocketx';
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    test = true;
    folder = '';
    origin = '';
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
    socketApp: 'hsing_luck',
    socketApi: socketApiRoot + '/index.php?action=luck.wsApi',

    getInitInfo: httpApiRoot + '/index.php?action=luck.getInitInfo&uid={uid}&token={token}',
    getHistory: httpApiRoot + '/index.php?action=roomDraw.getHistory&last_id={from}&rid={rid}&uid={uid}&token={token}',
}

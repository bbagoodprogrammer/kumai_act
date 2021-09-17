const mainHost = _host;
// const mainHost = 'udateapp.com';

const host = location.host;
const protocol = location.protocol;

let origin = `${protocol}//act.${mainHost}`;
const localTest = /localhost/i.test(host) || /\d+\.\d+\.\d+\.\d+/.test(host);
if (_test) {
    origin = `${protocol}//t.act.${mainHost}`;
}

const httpApiRoot = localTest ? '' : origin;

export default {
    host,
    origin,
    httpApiRoot,
 
    init: httpApiRoot+'/index.php?action=gift.rebackGiftRank&touid={uid}&token={token}',

    svga: 'img/anim.svga',
}

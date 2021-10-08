import { getPlatform, getAppVer } from './';

const conf = {
    hsing: {
        ios: 515,
        android: 812
    },
    singnow: {
        ios: 462,
        android: 814
    },
    wekara: {
        ios: 0, // 没有iOS版本
        android: 828
    },
    gosing: {
        ios: 0,
        android: 828
    },
    singstar: { // 0表示已支持，因为印度直接同步最新版本已支持
        ios: 0,
        android: 0
    },
};

const pt = getPlatform();
const ver = getAppVer();
const { ios, android } = conf[APP] || {ios:0,android:0};

function getChatURI(uid) {
    let uri = 'uid:' + uid;
    if ((pt == 'ios' && ver >= ios) || (pt == 'android' && ver >= android)) {
        uri = 'chat:' + uid;
    }
    return uri;
}

function chat(uid) {
    location.href = getChatURI(uid);
}

export {
    getChatURI,
    chat,
}

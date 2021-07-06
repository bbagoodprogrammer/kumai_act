import { getPlatform, getUrlString, replaceUrl, getAppVer } from './index';

const isIOS = getPlatform() == 'ios';
const isShare = getUrlString('token') ? false : true;

function go(url) {
    if (!isShare && url) {
        location.href = url;
    } else {
        // openApp();
    }
}

export default {
    wallet() {
        try {
            if (isIOS) {
                sendJsData('app://walletpage');
            } else {
                javascript: JSInterface.sendJsData('app://walletpage');
            }
        } catch (error) {

        }
    },
    room(rid) {
        try {
            if (isIOS) {
                sendJsData('app://room?rid=' + rid);
            } else {
                javascript: JSInterface.sendJsData('app://room?rid=' + rid);
            }
        } catch (error) {
        }
    },
    userInfo(uid) {
        try {
            if (isIOS) {
                sendJsData('app://userInfo?uid=' + uid);
            } else {
                javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
            }
        } catch (error) {
        }
    },
    chat(uid) {
        try {
            if (isIOS) {
                sendJsData('app://chat=' + uid);
            } else {
                javascript: JSInterface.sendJsData(`app://gotoPage?data={"page":"com.utalk.hsing.activity.PrivateChatActivity","datas":[{"paramType": "int","paramName": "opposite_uid","paramValue": ${uid}}]}`);
            }
        } catch (error) {

        }
    },
    topic(tpid) {
        try {
            if (isIOS) {
                sendJsData('app://topicDetails?tpid=' + tpid);
            } else {
                javascript: JSInterface.sendJsData('app://topicDetails?tpid=' + tpid);
            }
        } catch (error) {

        }
    },

    cpHouse(uid) {
        try {
            const ver = getAppVer();
            if (isIOS && ver >= 164) {
                sendJsData('app://cpHouse?toUid=' + uid);
            } else if(isIOS && ver < 164) {
                userInfo(uid) // 跳轉到主頁
            } else {
                javascript: JSInterface.sendJsData('app://cpHouse?toUid=' + uid);
            }
        } catch (error) {

        }
    },

    voiceChatpage() {
        try {
            if(isIOS){
				sendJsData('app://voiceChatpage');
			}else{
				javascript:JSInterface.sendJsData('app://voiceChatpage');	
			}
        } catch (error) {
            
        }
    }
}

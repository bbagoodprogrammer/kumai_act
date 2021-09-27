import { getPlatform, getUrlString, replaceUrl } from './index';

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
            if(isIOS){
				sendJsData('app://userInfo?uid='+uid);
			}else{
				javascript:JSInterface.sendJsData('app://userInfo?uid='+uid);
			}
        } catch (error) {
        }
    }
}

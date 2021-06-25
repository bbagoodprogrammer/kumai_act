import { getPlatform, getUrlString , replaceUrl} from './index';

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
        if(isIOS){
            sendJsData('app://walletpage');
        }else{
            javascript:JSInterface.sendJsData('app://walletpage');
        }
    }
}

import { getPlatform, getUrlString } from './index';

const isIOS = getPlatform() == 'ios';
const isShare = getUrlString('token') ? false : true;

function go(url) {
    if (!isShare && url) {
        location.href = url;
    } else {
        openApp();
    }
}

export default {
    
    wallet() { // 钱包
      try {
        if(isIOS){
          sendJsData('app://walletpage');
        }else{
          javascript:JSInterface.sendJsData('app://walletpage');
        }
      } catch (error) {
        //console.log(error)
      }
    },

    profile (uid) { // 主页
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

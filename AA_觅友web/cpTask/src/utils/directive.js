// import Vue from 'vue';
// import DirectivePlugin from './utils/directive';
// Vue.use(DirectivePlugin);

export default {
    install(Vue) {
        //v-swipe="direction=>{}"
        Vue.directive('swipe', {
            bind(el, binding) {
                let startPageX = 0;
                let startPageY = 0;

                el.addEventListener('touchstart', function(e) {
                    startPageX = e.changedTouches[0].pageX;
                    startPageY = e.changedTouches[0].pageY;
                }, false);

                el.addEventListener('touchend', function(e) {
                    if (typeof binding.value == 'function') {
                        let disX = e.changedTouches[0].pageX - startPageX;
                        let disY = e.changedTouches[0].pageY - startPageY;

                        if (Math.abs(disX) > 10 || Math.abs(disY) > 10) {
                            let touchType = 'swipe';
                            if(Math.abs(disX) > Math.abs(disY)){
                                if(disX > 10){
                                    touchType = 'right';
                                } else if (disX < -10) {
                                    touchType = 'left';
                                }
                            } else {
                                if(disY > 10){
                                    touchType = 'down';
                                } else if (disX < -10) {
                                    touchType = 'up';
                                }
                            }
                            binding.value(touchType, e);
                        }
                    }
                }, false);
            }
        });
    }
}
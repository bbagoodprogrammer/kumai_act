
import store from "../store/stores"
let common = {
    vuexCommit: function vuexCommit(name, val) {
        store.commit(name, val)
    },
    ModalHelper: ((bodyCls) => {
        let scrollTop;
        return {
            afterOpen: function () {
                scrollTop = document.scrollingElement.scrollTop;
                document.body.classList.add(bodyCls);
                document.body.style.top = -scrollTop + 'px';
            },
            beforeClose: function () {
                document.body.classList.remove(bodyCls);
                // scrollTop lost after set position:fixed, restore it back.
                document.scrollingElement.scrollTop = scrollTop;
            }
        };
    })('dialog-open'),
    toast: function toast(message, time = 1000) {
        const cssTime = 1000;
        const div = document.createElement('div');
        div.style.cssText = 'position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none';
        div.innerHTML = '<span style="display:inline-block; padding:.1rem .2rem; max-width:80%; background:#212125; color:#fff; border-radius:.1rem; opacity:0; margin-top:' + Math.round(window.innerHeight / 2) + 'px; transition:opacity ' + (cssTime / 1000) + 's">' + message + '</span>';
        document.body.appendChild(div);
        const span = div.firstChild;
        setTimeout(() => {
            span.style.opacity = 1;
        }, 0);
        setTimeout(() => {
            span.style.opacity = 0;
            setTimeout(() => {
                document.body.removeChild(div);
            }, cssTime);
        }, cssTime + time);
    }
}
export default common
import { lang, urls } from '../config';
// import app from './callApp';
// import { time, date, rank, number } from './filters';
import { getPlatform, scrollToAnchor, showError, serverErrorAlert } from './index';
import openApp from './openApp';

export default {
    computed: {
        // lang: () => lang,
        urls: () => urls,
        app: () => app,
    },
    // filters: {
    //     time,
    //     date,
    //     rank,
    //     number,
    // },
    methods: {
        getPlatform,
        // scrollToAnchor,
        showError,
        serverErrorAlert,
        openApp,
    }
}

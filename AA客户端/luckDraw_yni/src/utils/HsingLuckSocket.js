// import { SocketEvents, SocketMethods, LuckEvents, LuckSendTypes, HsingLuckSocket } from './utils/HsingLuckSocket';
// const socket = new HsingLuckSocket('ws://beatupload.17sing.tw/websocket', { appname: 'hsing_luck' });
// socket.on(SocketEvents.ERROR, e => {
//     console.log(e);
// });
// socket.on(SocketEvents.CONNECT, options => {
//     socket.login(100, 888888, 'token');
//     // socket.sendData(LuckSendTypes.REGISTER, {rid, uid, token}, url, SocketMethods.POST);
// });
// socket.on(LuckEvents.TABLE, data => {
//     console.log(data);
// });

import { urls } from '../config';
import { defaultOpts, getEventData, SocketEvents, SocketMethods, HsingWebSocket } from './HsingSocket';

const LuckEvents = {
    NEW: 1,
    RESULT: 2,
    USER: 3,
};

const LuckEventNames = {
    1: 'NEW',
    2: 'RESULT',
    3: 'USER',
};

const LuckSendTypes = {
    REGISTER: 1,
    USER: 2,
};

class HsingLuckSocket extends HsingWebSocket {
    constructor(uri, options = defaultOpts) {
        super(uri, options);

        this.on(SocketEvents.MESSAGE, res => {
            let json = {};
            try {
                json = JSON.parse(res);
            } catch(e) {
                this.trigger(SocketEvents.ERROR, getEventData('Parse JSON error', res));
                return;
            }

            const {response_status, response_data} = json;
            if (response_status && response_status.error === '') {
                if (typeof response_data == 'object' && typeof response_data.notification_type != 'undefined' && typeof response_data.notification_data != 'undefined') {
                    const type = response_data.notification_type;
                    const data = response_data.notification_data;
                    const event = LuckEventNames[type];
                    if (LuckEvents[event]) {
                        this.trigger(LuckEvents[event], data);
                    }
                } else {
                    this.trigger(SocketEvents.ERROR, getEventData('Data format error', json));
                }
            } else if (response_status.error) {
                this.trigger(LuckEvents.FAIL, json);
            }
        });
    }

    sendData(msg_type, msg_data, url = urls.socketApi, method = SocketMethods.POST) {
        this.sendJSON({msg_type, msg_data}, url, method);
    }

    login(uid, token, room_id = 0) {
        this.sendData(LuckSendTypes.REGISTER, {uid, token, room_id});
    }
}

export {
    getEventData,
    SocketEvents,
    SocketMethods,
    LuckEvents,
    LuckSendTypes,
    HsingLuckSocket,
}
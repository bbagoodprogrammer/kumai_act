// import { SocketEvents, SocketMethods, RocketEvents, RocketSendTypes, HsingRocketSocket } from './utils/HsingRocketSocket';
// const socket = new HsingRocketSocket('ws://beatupload.17sing.tw/websocket', { appname: 'hsing:rocket' });
// socket.on(SocketEvents.ERROR, e => {
//     console.log(e);
// });
// socket.on(SocketEvents.CONNECT, options => {
//     socket.login(100, 888888, 'token');
//     // socket.sendData(RocketSendTypes.REGISTER, {rid, uid, token}, url, SocketMethods.POST);
// });
// socket.on(RocketEvents.PROGRESS, data => {
//     console.log(data);
// });
// socket.on(RocketEvents.PRIZE, data => {
//     console.log(data);
// });
// socket.on(RocketEvents.FIRE, data => {
//     console.log(data);
// });

import { urls } from '../config';
import { defaultOpts, getEventData, SocketEvents, SocketMethods, HsingWebSocket } from './HsingSocket';

const RocketEvents = {
    FAIL: 100,
    PROGRESS: 1,
    FIRE: 2,
    PRIZE: 3,
    PACKET: 4,
};

const RocketEventNames = {
    100: 'FAIL',
    1: 'PROGRESS',
    2: 'FIRE',
    3: 'PRIZE',
    4: 'PACKET',
};

const RocketSendTypes = {
    REGISTER: 1,
};

class HsingRocketSocket extends HsingWebSocket {
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
                    const event = RocketEventNames[type];
                    if (RocketEvents[event]) {
                        this.trigger(RocketEvents[event], data);
                    }
                } else {
                    this.trigger(SocketEvents.ERROR, getEventData('Data format error', json));
                }
            } else if (response_status.error) {
                this.trigger(RocketEvents.FAIL, json);
            }
        });
    }

    sendData(msg_type, msg_data, url, method = SocketMethods.GET) {
        this.sendJSON({msg_type, msg_data}, url, method);
    }

    login(room_id, uid, token, url = urls.socketApi) {
        this.sendData(RocketSendTypes.REGISTER, {room_id, uid, token}, url, SocketMethods.POST);
    }
}

export {
    getEventData,
    SocketEvents,
    SocketMethods,
    RocketEvents,
    RocketSendTypes,
    HsingRocketSocket,
}
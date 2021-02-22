const SocketEvents = {
    CONNECT: 'connect',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    RECONNECT: 'reconnect',
    MESSAGE: 'message',
    SEND: 'send',
};

const SocketState = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
};

const defaultOpts = {
    reconnectionAttempts: 5, //重试次数
    reconnectionDelay: 5000, //重试间隔
    pingTickTime: 30000, //心跳间隔
};

function getEventData(message, data = '') {
    return {message, data};
}

class HsingSocket {
    _listeners = {};
    _reconnectTimer;
    _uri = '';
    _opts = {};
    
    socket;
    connected = false;

    constructor(uri, options = defaultOpts) {
        this._uri = uri;
        this._opts = Object.assign({}, defaultOpts, options);
        if (this._opts.pingTickTime > 0) {
            setInterval(() => {
                if (this.socket && this.socket.readyState == SocketState.OPEN) {
                    const data = 'heartbeat=1';
                    this.connected = true;
                    this.socket.send(data);
                    this.trigger(SocketEvents.SEND, data);
                }
            }, this._opts.pingTickTime);
        }
        setTimeout(() => {
            this.connect();
        }, 0);
    }

    _reconnect() {
        if (this._opts.reconnectionAttempts > 0) {
            clearTimeout(this._reconnectTimer);
            this._reconnectTimer = setTimeout(() => {
                this.connect();
                this.trigger(SocketEvents.RECONNECT, this._opts.reconnectionAttempts--);
            }, this._opts.reconnectionDelay);
        }
    }

    connect() {
        if (!window.WebSocket) {
            this.trigger(SocketEvents.ERROR, getEventData('Not Supported WebSocket'));
            return;
        }
        
        this.socket = new WebSocket(this._uri);
        this.socket.onopen = () => {
            this.connected = true;
            this.trigger(SocketEvents.CONNECT, Object.assign({}, this._opts));
        };
        this.socket.onmessage = e => {
            this.connected = true;
            this.trigger(SocketEvents.MESSAGE, e.data);
        };
        this.socket.onerror = e => {
            this.connected = false;
            this._reconnect();
            this.trigger(SocketEvents.ERROR, e);
        };
        this.socket.onclose = e => {
            this.connected = false;
            this._reconnect();
            this.trigger(SocketEvents.DISCONNECT, e);
        };
    }

    send(data) {
        if (this.connected) {
            this.socket.send(data);
            this.trigger(SocketEvents.SEND, data);
        } else {
            this.trigger(SocketEvents.ERROR, getEventData('WebSocket not connected', data));
        }
    }

    close() {
        if (this.connected) {
            this.socket.close();
        }
    }

    // RocketEvents type是数值类型
    on(type, cb) {
        if (type && typeof cb == 'function') {
            if (this._listeners[type]) {
                this._listeners[type].push(cb);
            } else {
                this._listeners[type] = [cb];
            }
        }
    }

    // 提前定义好的回调函数（非匿名函数）支持单独移除，不传cb清空此类事件所有回调
    off(type, cb) {
        if (this._listeners[type]) {
            if (typeof cb == 'function') {
                const arr = [];
                const len = this._listeners[type].length;
                for (let i = 0; i < len; i++) {
                    if (this._listeners[type][i] != cb) {
                        arr.push(this._listeners[type][i]);
                    }
                }
                this._listeners[type] = arr;
            } else {
                delete this._listeners[type];
            }
        }
    }
    
    // 事件回调方法不使用箭头函数可获取类this上下文引用
    trigger(type, data) {
        const cbList = this._listeners[type];
        if (cbList) {
            const len = cbList.length;
            for (let i = 0; i < len; i++) {
                cbList[i].call(this, data);
            }
        }
    }
}

//============================== HsingWebSocket ==============================

const SocketMethods = {
    GET: 'get',
    POST: 'post',
};

class HsingWebSocket extends HsingSocket {
    _appname = '';
    
    constructor(uri, options = defaultOpts) {
        super(uri, options);
        if (options.appname) {
            this._appname = options.appname;
        } else {
            setTimeout(() => {
                this.trigger(SocketEvents.ERROR, getEventData('Options not set appname', options));
            }, 0);
        }
    }

    // 发送ctx为URL参数模式ctx=encodeURIComponent('a=1&b=2');
    send(ctx = '', url = '', method = SocketMethods.GET) {
        const params = [];
        params.push('appname=' + encodeURIComponent(this._appname));
        params.push('url=' + encodeURIComponent(url));
        params.push('method=' + (SocketMethods[method.toUpperCase()] ? method : SocketMethods.GET));
        if (Object.prototype.toString.call(ctx).toLowerCase().match(/\s(.+)\]/)[1] != 'object') {
            params.push('ctx=' + encodeURIComponent(ctx));
        } else {
            const arr = [];
            for(let key in ctx) {
                arr.push(`${key}=${encodeURIComponent(ctx[key])}`);
            }
            params.push('ctx=' + encodeURIComponent(arr.join('&')));
        }
        super.send(params.join('&'));
    }

    // 发送ctx为JSON字符串模式ctx=encodeURIComponent('{"a":1,"b":2}');
    sendJSON(ctx = '', url = '', method = SocketMethods.GET) {
        this.send(JSON.stringify(ctx), url, method);
    }
}

export {
    defaultOpts,
    getEventData,
    SocketEvents,
    SocketState,
    HsingSocket,
    SocketMethods,
    HsingWebSocket,
}
function getAppUaInfo(ua, key) {
    var obj = {};
    var groups = ua.split(';');
    for (var a = 0; a < groups.length; a++) {
        var infos = groups[a].split(',');
        for (var b = 0; b < infos.length; b++) {
            var arr = infos[b].split('=');
            var k = arr[0];
            var v = arr[1] || '';
            obj[k] = v;

            if (/version/i.test(k)) {
                obj['ver'] = parseInt(v.replace(/\(|\)/g, '').replace(/\.+/g, ''));
            }
        }
    }

    if (key) {
        return obj[key];
    }
    return obj;
}

export default getAppUaInfo
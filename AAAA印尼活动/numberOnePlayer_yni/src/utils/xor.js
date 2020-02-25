function _btoa(input) {
    //https://github.com/davidchambers/Base64.js/blob/master/base64.js
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var str = String(input);
    for (
        // initialize result and counter
        var block, charCode, idx = 0, map = chars, output = '';
        // if the next str index does not exist:
        //   change the mapping table to "="
        //   check if d has no fractional digits
        str.charAt(idx | 0) || (map = '=', idx % 1);
        // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
        output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
        charCode = str.charCodeAt(idx += 3 / 4);
        if (charCode > 0xFF) {
            throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        block = block << 8 | charCode;
    }
    return output;
}


function base64Encode(input) {
    let rv;
    rv = encodeURIComponent(input);
    rv = unescape(rv);
    rv = (window.btoa || _btoa)(rv);
    return rv;
}

function base64Decode(input) {
    //https://blog.csdn.net/abxn2002/article/details/50887594
    return decodeURIComponent(escape(window.atob(input)));
}

function xorEncode(str, key) {
    let txt = '';
    const strLen = str.length;
    const keyLen = key.length;
    for (let i = 0; i < strLen; i++) {
        const k = i % keyLen;
        txt += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(k));
    }
    return txt;
}

function encodeData(score, key) {
    return base64Encode(xorEncode(score + '', key));
}

function decodeData(str, key) {
    let data = {};
    try {
        data = xorEncode(base64Decode(str), key)
    } catch (e) { }
    return data;
}

export {
    encodeData,
    decodeData,
}
function getDate(datem, type) {
    var year = datem.getFullYear(),
        //< 10 ? '0' + (datem.getMonth() + 1) : datem.getMonth() + 1,
        //? '0' + datem.getDate() : datem.getDate()
        month = datem.getMonth() + 1,
        date = datem.getDate(),
        hours = datem.getHours() < 10 ? '0' + datem.getHours() : datem.getHours(),
        minute = datem.getMinutes() < 10 ? '0' + datem.getMinutes() : datem.getMinutes(),
        second = datem.getSeconds() < 10 ? '0' + datem.getSeconds() : datem.getSeconds();
    if (type == 1) {
        return `${month}月${date}日`
    }
    if (type == 2) {
        return `${month}月${date}日 ${hours}:${minute}`
    }
    if (type == 3) {
        return `${month}月${date}日 ${hours}:${minute}:${second}`
    }
    if (type == "pai") {
        if (minute < 10) {
            minute = "0" + minute
        }
        return `${hours}:${minute}   ${date}/${month}`
    }
}
export default getDate
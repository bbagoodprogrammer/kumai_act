function getDate(datem, type) {
    var year = datem.getFullYear(),
        month = datem.getMonth() + 1,
        date = datem.getDate(),
        hours = datem.getHours(),
        minute = datem.getMinutes(),
        second = datem.getSeconds();
    if (type == "~") {
        return `${month < 10 ? '0' + month : month}.${date < 10 ? '0' + date : date}  ${hours}:${minute < 10 ? '0' + minute : minute}`
    }
    if (type == "pai") {
        if (minute < 10) {
            minute = "0" + minute
        }
        return `${hours}:${minute}   ${date}/${month}`
    }
}
export default getDate
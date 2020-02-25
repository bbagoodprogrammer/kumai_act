function getDate(datem, type) {
    var year = datem.getFullYear(),
        month = datem.getMonth() + 1,
        date = datem.getDate(),
        hours = datem.getHours(),
        minute = datem.getMinutes(),
        second = datem.getSeconds();
    if (type == "~") {
        return `${hours}h  ${date}/${month}`
    }
    if (type == "pai") {
        minute = minute < 10 ? '0' + minute : minute
        hours = hours < 10 ? '0' + hours : hours
        second = second < 10 ? '0' + second : second
        date = date < 10 ? '0' + date : date
        month = month < 10 ? '0' + month : month
        return `${month}月${date}日  ${hours}:${minute}:${second}`
    }
}
export default getDate
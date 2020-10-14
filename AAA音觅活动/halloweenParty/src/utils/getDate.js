function getDate(datem, type) {
    var year = datem.getFullYear(),
        month = (datem.getMonth() + 1) < 10 ? '0' + (datem.getMonth() + 1) : datem.getMonth() + 1,
        date = datem.getDate() < 10 ? '0' + datem.getDate() : datem.getDate(),
        hours = datem.getHours() < 10 ? '0' + datem.getHours() : datem.getHours(),
        minute = datem.getMinutes() < 10 ? '0' + datem.getMinutes() : datem.getMinutes(),
        second = datem.getSeconds() < 10 ? '0' + datem.getSeconds() : datem.getSeconds();
    if (type == "~") {
        if (isToday(datem)) {
            return `今日`
        }
        return `${month}月${date}日`
    }
    if (type == 2) {
        return `${hours}:${minute}`
    }
    if (type == 3) {
        return `${month}月${date}日`
    }
}
function isToday(str) {
    return new Date().getTime() - new Date(str).getTime() < 86400000;
}
export default getDate
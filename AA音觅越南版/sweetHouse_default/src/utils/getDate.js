function getDate(datem, type) {
    var year = datem.getFullYear(),
        month = (datem.getMonth() + 1) < 10 ? '0' + (datem.getMonth() + 1) : datem.getMonth() + 1,
        date = datem.getDate() < 10 ? '0' + datem.getDate() : datem.getDate(),
        hours = datem.getHours() < 10 ? '0' + datem.getHours() : datem.getHours(),
        minute = datem.getMinutes() < 10 ? '0' + datem.getMinutes() : datem.getMinutes(),
        second = datem.getSeconds() < 10 ? '0' + datem.getSeconds() : datem.getSeconds();
    if (type == 1) {
        if (isToday(datem) == 0) {
            return `Hôm nay`
        }
        return `${month}/${date}`
    }
    if (type == 2) {
        return `${hours}:${minute}`
    }
    if (type == ":") {
        return `${hours}:${minute}`
    }
}
function isToday(str) {
    var td = new Date();
    td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
    var od = new Date(str);
    od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
    var xc = (od - td) / 1000 / 60 / 60 / 24;
    return xc
}
export default getDate
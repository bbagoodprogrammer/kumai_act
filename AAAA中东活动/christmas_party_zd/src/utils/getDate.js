function getDate(datem, type) {
    var year = datem.getFullYear(),
        month = datem.getMonth() + 1,
        date = datem.getDate(),
        hours = datem.getHours(),
        minute = datem.getMinutes(),
        second = datem.getSeconds();
    if (type == 1) {
        return `${month}.${date}`
    }
    if (type == 2) {
        return `${year}${month < 10 ? `0${month}` : month}${date < 10 ? `0${date}` : date}`
    }
}
export default getDate
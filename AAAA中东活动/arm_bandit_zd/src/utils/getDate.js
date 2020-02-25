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
    if (type == "rule") {
        return `${month}/${date} ${hours}h`
    }
}
export default getDate
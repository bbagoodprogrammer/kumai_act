function getDate(datem, type) {
    var year = datem.getFullYear(),
        month = (datem.getMonth() + 1) < 10 ? '0' + (datem.getMonth() + 1) : datem.getMonth() + 1,
        date = datem.getDate() < 10 ? '0' + datem.getDate() : datem.getDate(),
        hours = datem.getHours(),
        minute = datem.getMinutes() < 10 ? '0' + datem.getMinutes() : datem.getMinutes(),
        second = datem.getSeconds() < 10 ? '0' + datem.getSeconds() : datem.getSeconds();
    if (type == "~") {
        return `${hours}h  ${date}/${month}`
    }
    if (type == "pai") {
        if (minute < 10) {
            minute = "0" + minute
        }
        return `${hours}:${minute}   ${date}/${month}`
    }
    if (type == 1) {
        return `${date}/${month}`
    }
    if (type == 2) {
        return `${date}/${month} ${hours}h`
    }
    if (type == 3) {
        return `${hours}:${minute}:${second} ${date}/${month} `
    }
    if (type == 4) {
        return `${year}/${month}/${date}`
    }
}
export default getDate
function getDate(datem, type) {
    var year = datem.getFullYear() < 10 ? '0' + datem.getFullYear() : datem.getFullYear(),
        month = (datem.getMonth() + 1) < 10 ? '0' + (datem.getMonth() + 1) : datem.getMonth() + 1,
        date = datem.getDate() < 10 ? '0' + datem.getDate() : datem.getDate(),
        hours = datem.getHours() < 10 ? '0' + datem.getHours() : datem.getHours(),
        minute = datem.getMinutes() < 10 ? '0' + datem.getMinutes() : datem.getMinutes(),
        second = datem.getSeconds() < 10 ? '0' + datem.getSeconds() : datem.getSeconds();
    if (type == "~") {
        return `${hours}:${minute}:${second} ${date}/${month}/${year}  `
    }
    if (type == "pai") {
        if (minute < 10) {
            minute = "0" + minute
        }
        return `${hours}:${minute}   ${date}/${month}`
    }
}
export default getDate
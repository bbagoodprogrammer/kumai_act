function getDate(datem, type) {
    var year = datem.getFullYear(),
        month = datem.getMonth() + 1,
        date = datem.getDate() < 10 ? '0' + datem.getDate() : datem.getDate(),
        hours = datem.getHours() < 10 ? '0' + datem.getHours() : datem.getHours(),
        minute = datem.getMinutes() < 10 ? '0' + datem.getMinutes() : datem.getMinutes(),
        second = datem.getSeconds() < 10 ? '0' + datem.getSeconds() : datem.getSeconds();
    var monthEng = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "June",
        7: "July",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    }
    if (type == 1) {
        return `tgl ${date} ${monthEng[month]}`
    }
    if (type == 2) {
        return `(tgl ${date} ${monthEng[month]})`
    }
    if (type == 3) {
        return `tgl ${date} ${monthEng[month]} ${year} pukul ${hours}:${minute}:${second}`
    }
}
export default getDate
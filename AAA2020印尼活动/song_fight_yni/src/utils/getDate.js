function getDate(datem, type) {
    var year = datem.getFullYear(),
        month = datem.getMonth() + 1,
        date = datem.getDate(),
        hours = datem.getHours(),
        minute = datem.getMinutes(),
        second = datem.getSeconds();
    hours = hours < 10 ? '0' + hours : hours
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
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
    if (type == 2) {
        return `pukul ${hours}:${minute} tgl ${date} ${monthEng[month]}`
    }
    if (type == 1) {
        return `${month}.${date}`
    }
    if (type == 3) {
        return `pukul ${hours}:${minute}:${second} tgl ${date} ${monthEng[month]}`
    }
    if (type == "pai") {
        if (minute < 10) {
            minute = "0" + minute
        }
        return `${hours}:${minute}   ${date}/${month}`
    }
}
export default getDate


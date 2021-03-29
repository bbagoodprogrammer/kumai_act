function getDate(datem, type) {
    var year = datem.getFullYear(),
        month = datem.getMonth() + 1,
        date = datem.getDate(),
        hours =
            datem.getHours() < 10 ? "0" + datem.getHours() : datem.getHours(),
        minute =
            datem.getMinutes() < 10
                ? "0" + datem.getMinutes()
                : datem.getMinutes(),
        second =
            datem.getSeconds() < 10
                ? "0" + datem.getSeconds()
                : datem.getSeconds();
    if (type == 1) {
        return `${month}.${date} ${hours}:${minute}:${second}`;
    }
    if (type == 2) {
        return `${hours}:${minute}:${second} ${date}/${month} `;
    }
    if (type == "~") {
        return `${hours}h  ${date}/${month}`;
    }
    if (type == "rule") {
        return `${month}月${date}日${hours}:${minute}:${second}`;
    }
}
export default getDate;

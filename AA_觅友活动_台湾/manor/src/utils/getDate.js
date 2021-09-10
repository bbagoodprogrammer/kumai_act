function getDate(datem, type) {
    var year = datem.getFullYear(),
        month =
            datem.getMonth() + 1 < 10
                ? "0" + (datem.getMonth() + 1)
                : datem.getMonth() + 1,
        date = datem.getDate() < 10 ? "0" + datem.getDate() : datem.getDate(),
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
        return `${month}月${date}日 ${hours}:${minute}`;
    }
    if (type == 2) {
        return `${date}/${month} ${hours}:${minute}`;
    }
    if (type == 3) {
        return `${month}月${date}日`;
    }
    if (type == 4) {
        return `${date}/${month}`;
    }
    if (type == 5) {
        return `${year} ${month}/${date} ${hours}:${minute}`;
    }
    if (type == 6) {
        return `${month}月${date}日 ${hours}:${minute}:${second}`;
    }
    if (type == 7) {
        return `${date}/${month} ${hours}:${minute}:${second}`;
    }
}
export default getDate;

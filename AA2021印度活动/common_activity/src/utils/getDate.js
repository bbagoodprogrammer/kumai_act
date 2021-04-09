function getDate(datem, type) {
    var year = datem.getFullYear(),
        month =
            datem.getMonth() + 1 < 10
                ? "0" + (datem.getMonth() + 1)
                : datem.getMonth() + 1,
        date = datem.getDate() < 10 ? "0" + datem.getDate() : datem.getDate(),
        hours = datem.getHours(),
        minute =
            datem.getMinutes() < 10
                ? "0" + datem.getMinutes()
                : datem.getMinutes(),
        second =
            datem.getSeconds() < 10
                ? "0" + datem.getSeconds()
                : datem.getSeconds();
    if (type == "~") {
        return `${date}/${month}`;
    }
    if (type == "pai") {
        if (minute < 10) {
            minute = "0" + minute;
        }
        return `${year}/${month}/${date}  ${hours}:${minute}`;
    }
    if (type == 2) {
        return `${month}/${date} ${hours}:${minute}`;
    }
    if (type == 3) {
        return `${month}/${date} ${hours}:${minute}  `;
    }
}
export default getDate;

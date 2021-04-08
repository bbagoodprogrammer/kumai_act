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
    if (type == "~") {
        return `${month}/${date} ${hours}:${minute} `;
    }
    if (type == "rule") {
        return `${month}/${date} ${hours}:${minute}`;
    }
}
export default getDate;

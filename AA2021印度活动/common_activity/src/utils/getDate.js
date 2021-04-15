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

    console.log(minute);
    if (type == "~") {
        return `${date}/${month}`;
    }
    if (type == "pai") {
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

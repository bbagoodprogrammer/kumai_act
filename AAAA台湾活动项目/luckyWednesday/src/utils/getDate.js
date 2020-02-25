function getDate(datem,type){
    var year = datem.getFullYear(),
        month = datem.getMonth() + 1,
        date = datem.getDate(),
        hours = datem.getHours(),
        minute = datem.getMinutes(),
        second = datem.getSeconds();
        hours = hours<10?'0'+hours : hours
        minute = minute <10?'0'+minute : minute
        second = second<10? '0'+second : second
        return `${month}月${date}日  ${hours}:${minute}:${second}`
}
export default getDate
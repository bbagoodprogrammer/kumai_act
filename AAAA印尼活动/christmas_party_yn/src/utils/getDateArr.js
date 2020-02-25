export default function getDateArr(stime, etime) {
    let arr = []
    for (let i = stime; i <= etime; i += 86400) {
        // var month = new Date(i * 1000).getMonth() + 1
        // var date = new Date(i * 1000).getDate()
        // var dateSrt = `${month}.${date}`
        arr.push(i)
    }
    return arr
}
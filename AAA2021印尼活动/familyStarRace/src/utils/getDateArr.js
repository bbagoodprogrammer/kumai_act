export default function getDateArr(stime, etime) {
    let arr = []
    let nowDay = 0
    for (let i = stime * 1; i <= etime * 1; i += 86400) {
        arr.push(i)
    }
    return {
        arr: arr
    }
}
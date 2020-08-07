export default function getDateArr(time_data) {
    let arr = []
    let nowDay = 0
    for (let i = time_data.stime * 1; i <= time_data.etime * 1; i += 86400) {
        arr.push(i)
    }
    return {
        arr: arr
    }
}
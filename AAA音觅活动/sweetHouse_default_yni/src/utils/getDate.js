function getDate(datem, type) {
  var year = datem.getFullYear(),
    month = datem.getMonth() + 1,
    date = datem.getDate(),
    hours = datem.getHours(),
    minute = datem.getMinutes(),
    second = datem.getSeconds();
  hours = hours < 10 ? "0" + hours : hours;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  var monthEng = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "Mei",
    6: "Jun",
    7: "Jul",
    8: "Agu",
    9: "Sep",
    10: "Okt",
    11: "Nov",
    12: "Des"
  };

  if (type == 1) {
    if (isToday(datem) == 0) {
      return `today`;
    }
    return `${month}/${date}`;
  }
  if (type == 2) {
    return `${hours}:${minute}`;
  }

  if (type == "rule") {
    return `pkl ${hours}:${minute}(wib),${date} ${monthEng[month]}`;
  }
  if (type == "~") {
    return `${hours}:${minute} tgl ${date} ${monthEng[month]}`;
  }
  if (type == "pai") {
    if (minute < 10) {
      minute = "0" + minute;
    }
    return `${hours}:${minute}   ${date}/${month}`;
  }
}

function isToday(str) {
  var td = new Date();
  td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
  var od = new Date(str);
  od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
  var xc = (od - td) / 1000 / 60 / 60 / 24;
  return xc;
}
export default getDate;

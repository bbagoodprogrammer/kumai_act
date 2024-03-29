
const imgs = {
  0: require('../img/0.png'),
  1: require('../img/1.png'),
  2: require('../img/2.png'),
  3: require('../img/3.png'),
  4: require('../img/4.png'),
  5: require('../img/5.png'),
  6: require('../img/6.png'),
  7: require('../img/7.png'),
  8: require('../img/8.png'),
  9: require('../img/9.png'),
}

const widths = [28,19,29,30,31,29,29,28,30,29]

const size = 36

export default function calcNumImg (num, h = size) {
  if (!(typeof num == 'number' || typeof num == 'string')) {
    return ''
  }
  let html = ''
  let arr = String(num).split('')
  arr.forEach(i => {
    let w = widths[i]
    let rw = w / 100
    let rh = h / 100
    html += `<img src="${imgs[i]}" style="width: ${rw}rem; height: ${rh}rem" />`
  })
  html += `<img src="${require('../img/percent.png')}" style="width: 0.31rem; height: 0.26rem" />`
  return html
}
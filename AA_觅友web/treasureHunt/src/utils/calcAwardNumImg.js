
const imgs = {
  'x': require('../img/aX.png'),
  0: require('../img/a0.png'),
  1: require('../img/a1.png'),
  2: require('../img/a2.png'),
  3: require('../img/a3.png'),
  4: require('../img/a4.png'),
  5: require('../img/a5.png'),
  6: require('../img/a6.png'),
  7: require('../img/a7.png'),
  8: require('../img/a8.png'),
  9: require('../img/a9.png'),
}

const size = 30
const xWidth = 30
const widths = [22,18,22,22,22,22,22,22,22,22]

export default function calcAwardNumImg (num, h = size) {
  if (!(typeof num == 'number' || typeof num == 'string')) {
    return ''
  }
  let xh = h / 100
  let xw = xh * xWidth / size
  let html = `<img src="${imgs['x']}" style="width: ${xw}rem; height: ${xh}rem" />`
  let arr = String(num).split('')
  arr.forEach(i => {
    let w = widths[i] * h / size
    let rw = w / 100
    let rh = h / 100
    html += `<img src="${imgs[i]}" style="width: ${rw}rem; height: ${rh}rem" />`
  })
  return html
}
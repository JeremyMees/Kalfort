export const numberToString = number => {
  let s = ''
  while (number > 0) {
    let t = (number - 1) % 26
    s = String.fromCharCode(65 + t) + s
    number = ((number - t) / 26) | 0
  }
  return s || undefined
}

export function calcBlcokWeight (array) {
  return array.reduce((acc, item) => {
    acc += item.blockW * item.area
    return acc
  }, 0)
}

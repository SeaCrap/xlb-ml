// 格式化价格 分转元
export function priceFormat(num) {
  // 先转换为元，保留两位小数
  let yuan = (num / 100).toFixed(2)
  // 使用正则表达式去掉多余的0和小数点
  return yuan.replace(/(\.0+)$/, '').replace(/(\.[1-9])0$/, '$1')
}

// 输出折扣
export function discount(num1, num2) {
  return parseInt((num1 / num2) * 100)
}
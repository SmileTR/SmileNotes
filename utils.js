/*
 * 转换 url params参数为obj
 * @param str 传入url参数字符串
 * @returns {Object}
 */
const paramsToObj = str => {
  let obj = {};
  try {
    obj = JSON.parse(
      '{"' +
        decodeURI(str)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } catch (e) {
    /* eslint-disable */
    console.warn(e)
  }
  return obj
}

/**
 * 获取URL 参数
 * @param str Url
 * */
const getUrlQuery = str => {
  const URL = str
  let qs = URL.substring(URL.lastIndexOf('?') + 1)
  const index = qs.lastIndexOf('#')
  index !== -1 && (qs = qs.substring(0, qs.lastIndexOf('#')))
  return paramsToObj(qs)
}

/**
 * 时间格式化
 * @param time 时间字符串参数
 * @param fmt 时间返回格式 例如：Y/MM/dd hh:mm:ss => 2018/05/06 18:05:35
 */
const formatTime = (time, fmt) => {
  const date = new Date(time)

  const o = {
    'Y+': date.getFullYear(),
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    S: date.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    )

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      )
  }

  return fmt
}

export default {
  paramsToObj,
  getUrlQuery,
  formatTime
}

export  class Common {
  // 递归实现深拷贝
  static deepClone (target) {
    let result
    const baseArr = ['string', 'number', 'boolean', 'undefined']
    if (baseArr.includes(typeof target) || target === null) {
      result = target
    } else {
      result = Object.prototype.toString.call(target) === '[object Object]' ? {} : []
      for (let key in target) {
        if (baseArr.includes(typeof target[key]) || target === null) {
          result[key] = target[key]
        } else {
          result[key] = this.deepClone(target[key])
        }
      }
    }
    return result
  }
}
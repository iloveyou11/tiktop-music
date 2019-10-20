import originalJsonp from 'jsonp'

// 自定义jsonp函数（对原始方法的封装）
export default function jsonp(url, data, opt) {
    if (url.indexOf('?') < 0) url += '?'
    if (url.indexOf('?') > 0 && url[url.length - 1] !== '?') url += '&'
    url += _params(data)
    return new Promise((resolve, reject) => {
        // 原始jsonp库调用的方式
        originalJsonp(url, opt, (err, res) => {
            if (!err) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })
}

// 将键值对data以&符号拼接为字符串
function _params(data) {
    let url = ''
    for (let key in data) {
        let value = data[key] === undefined ? '' : data[key]
        url += `&${key}=${encodeURIComponent(value)}`
    }
    return url.slice(1)
}
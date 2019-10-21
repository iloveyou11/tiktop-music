export function addClass(el, className) {
    if (hasClass(el, className)) return
    let classArr = el.className.split(' ')
    classArr.push(className)
    el.className = classArr.join(' ')
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

export function getData(el, name, value) {
    let prefix = 'data-'
    name = prefix + name
    if (value) {
        return el.setAttribute(name, value)
    } else {
        return el.getAttribute(name)
    }
}

let elementStyle = document.createElement('div').style
    // 判断浏览器供应商
let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform', //IE
        standard: 'transform'
    }
    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }
    return false
})()

// 自动添加css前缀
export function getfixStyle(style) {
    if (vendor === false) return false
    if (vendor === 'standard') return style
    return vendor + style.charAt(0).toUpperCase() + style.slice(1)
}
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
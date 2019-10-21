// 洗牌函数
// export function shuffle(arr) {
//     return arr.sort((a, b) => Math.random() - 0.5)
// }

function getRandomInt(min, max) {
    const length = max - min + 1
    return Math.floor(Math.random() * length + min)
}

export function shuffle(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        let j = getRandomInt(0, i)
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr
}
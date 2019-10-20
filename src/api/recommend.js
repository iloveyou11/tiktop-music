import jsonp from '@/common/js/jsonp'
import {
    commonParams,
    options
} from './config'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const paramsData = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, paramsData, options)
}

// qq音乐请求头中有host和referer，从纯前端的角度是没有办法绕过的
// 可以使用后端代理来解决
export function getDiscList() {

}
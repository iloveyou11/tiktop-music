import axios from 'axios'
import jsonp from '@/common/js/jsonp'
import {
    commonParams,
    options
} from './config'
const baseUrl = 'http://localhost:9000'

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
    const url = `${baseUrl}/api/getDiscList`
        // 需要拼接的数据
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
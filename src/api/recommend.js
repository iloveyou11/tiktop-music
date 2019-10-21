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

// 获取歌单详情列表
// export function getSongList(disstid) {
//     const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
//     const data = Object.assign({}, commonParams, {
//         disstid,
//         type: 1,
//         json: 1,
//         utf8: 1,
//         onlysong: 0,
//         platform: 'yqq',
//         hostUin: 0,
//         needNewCode: 0
//     })
//     return jsonp(url, data, options)
// }

/**
 * jsonp 抓取推荐页歌单数据
 * 接口：https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg
 * 提供方：https://y.qq.com/n/yqq/playlist/1471714611.html#
 */
export function getSongList(disstid) {
    let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    let data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0
    })
    let opts = Object.assign({}, opts, {
        param: 'jsonpCallback',
        name: 'playlistinfoCallback'
    })
    return jsonp(url, data, opts)
}
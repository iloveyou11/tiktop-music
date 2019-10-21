import jsonp from './jsonp'
import {
    Base64
} from 'js-base64'
import {
    getLyric
} from '../../api/song'

export default class Song {
    constructor({
        id,
        mid,
        singer,
        name,
        album,
        duration,
        image,
        url
    }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }

    getLyrics() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === 0) {
                    // 使用Base64进行歌词解码
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                } else {
                    reject('no lyrics')
                }
            })
        })
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: gteVkey(musicData.songmid)
    })
}
// singer是数组，而我们要的是字符串
function filterSinger(singer) {
    let ret = []
    singer.forEach((item) => {
        ret.push(item.name)
    })
    return ret.join('/')
}

function gteVkey(mid) {
    // return `http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?fromtag=38&guid=5931742855&vkey=${getSongVkey(mid)}`
    return 'http://ws.stream.qqmusic.qq.com/C100' + mid + '.m4a?fromtag=0&guid=126548448'
}

// export function getSongVkey(songmid) {
//     const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
//     const data = Object.assign({}, {
//         callback: 'musicJsonCallback',
//         loginUin: 3051522991,
//         format: 'jsonp',
//         platform: 'yqq',
//         needNewCode: 0,
//         cid: 205361747,
//         uin: 3051522991,
//         guid: 5931742855,
//         songmid: songmid,
//         filename: `C400${songmid}.m4a`
//     })

//     return jsonp(url, data)
// }
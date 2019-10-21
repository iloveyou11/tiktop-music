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
    return 'http://ws.stream.qqmusic.qq.com/C100' + mid + '.m4a?fromtag=0&guid=126548448'
}
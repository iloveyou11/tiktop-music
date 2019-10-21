import {
    playMode
} from '../common/js/config'

const state = {
    singer: {},

    // 播放器
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,

    disc: {},

    topList: {}
}

export default state
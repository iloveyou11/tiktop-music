// actions
// 1、处理异步操作
// 2、对一系列的mutations做封装

import * as types from './types'

export const selectPlay = ({
    commit,
    state
}, {
    list,
    index
}) => {
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
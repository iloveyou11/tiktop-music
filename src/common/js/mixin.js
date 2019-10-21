import {
    mapGetters
} from 'vuex'

export const playlistMixin = {
    computed: {
        ...mapGetters(['playlist'])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newPlaylist) {
            this.handlePlaylist(this.newPlaylist)
        }
    },
    methods: {
        handlePlaylist(playlist) {
            throw new Error('组件必须要实现这个函数')
        }
    },
}
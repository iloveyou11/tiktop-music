import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './views/recommend'
import Singer from './views/singer'
import Rank from './views/rank'
import Search from './views/search'
import SingerDetail from './components/singer-detail'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/recommend'
        }, {
            path: '/recommend',
            name: 'recommend',
            component: Recommend
        }, {
            path: '/singer',
            name: 'singer',
            component: Singer,
            children: [{
                path: ':id',
                component: SingerDetail
            }]
        }, {
            path: '/rank',
            name: 'rank',
            component: Rank
        }, {
            path: '/search',
            name: 'search',
            component: Search
        }

    ]
})
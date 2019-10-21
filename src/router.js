import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './views/recommend/recommend.vue'
import Singer from './views/singer/singer.vue'
import Rank from './views/rank/rank.vue'
import Search from './views/search/search.vue'
import SingerDetail from './components/singer-detail/singer-detail.vue'

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
        },
        // {
        //   path: '/about',
        //   name: 'about',
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})
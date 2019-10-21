import 'babel-polyfill'
import fastclick from 'fastclick'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
import '@/common/stylus/index.styl'
fastclick.attach(document.body) //消除300ms延迟
Vue.use(VueLazyLoad, {
    loading: require('@/common/images/wangyi.png')
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
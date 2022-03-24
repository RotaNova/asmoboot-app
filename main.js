import App from './App'
import uView from '@/uni_modules/uview-ui'
import store from './store'
import request from './api/http.js'
import key from './units/key.js'
import './units'
// import './units/ezuikit.js'
// import {
// 	VueJsonp
// } from 'vue-jsonp/dist'

// Vue.use(VueJsonp)
Vue.use(uView)
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$Axios = request;
Vue.prototype.$store = store;
Vue.prototype.$key = key;
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

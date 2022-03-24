import Vue from 'vue'
// 路由返回上一级
Vue.prototype.$leftClick =
	Date.back ||
	function() {
		uni.navigateBack({
			delta: 1,
		})
	}
// 路由跳转方法封装  row为传入的路径  保留当前页跳转
Vue.prototype.$jumpPlatform = _debounce(
	Date.back ||
	function(row) {
		if (!row)
			return uni.showToast({
				title: '页面开发中',
				duration: 2000,
				icon: 'none',
			})
		uni.navigateTo({
			url: row,
		})
	},
	500
)
// 路由跳转方法封装  row为传入的路径  关闭当前页跳转
Vue.prototype.$redirectTo =
	Date.back ||
	function(row) {
		if (!row)
			return uni.showToast({
				title: '页面开发中',
				duration: 2000,
				icon: 'none',
			})
		uni.redirectTo({
			url: row,
		})
	}
// 错误提示
Vue.prototype.$showToast =
	Date.back ||
	function(type, text) {
		return uni.showToast({
			title: text,
			duration: 2000,
			icon: 'none',
		})
	}

Vue.prototype.$phoneTest =
	Date.back ||
	function(text) {
		var reg_tel =
			/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
		if (reg_tel.test(text)) {
			return true
		} else {
			return false
		}
	}

// 时间格式转时间搓
Vue.prototype.$timestamp = function(time) {
	var date = new Date(time)
	var date = new Date(time.replace(/-/g, '/'))
	let time1 = null
	time1 = date.getTime() //精确到毫秒:1398250549123
	return time1
}
//时间戳转格式 yyyy-MM-dd HH:mm:ss
Vue.prototype.$getdate = function(e, s) {
	var now = new Date(parseInt(e)),
		y = now.getFullYear(),
		m = now.getMonth() + 1,
		d = now.getDate()
	if (s == 1) {
		return (
			y +
			'-' +
			(m < 10 ? '0' + m : m) +
			'-' +
			(d < 10 ? '0' + d : d) +
			' ' +
			now.toTimeString().substr(0, 8) //substr() 的参数指定的是子串的开始位置和长度，因此它可以替代 substring() 和 slice() 来使用。
		)
	}
	return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
}
// 账号密码加密
Vue.prototype.$keyCode = function(code) {
	let data = this.$key.encrypt(code, 'COM.RN20@AIMAGEP')
	return data
}
let reset = false
// formdata格式传参
Vue.prototype.$formData = function(url, data) {
	for (let key in data) {
		if (!data[key] && data[key] != 0) {
			data[key] = ''
		}
	}
	return new Promise((resolve, reject) => {
		return uni.request({
			url: uni.getStorageSync('baseurl') + url,
			data: data,
			method: 'POST',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				token: uni.getStorageSync('token'),
			},
			success: res => {
				if (res.data.code == 200) {
					resolve(true)
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000,
					})
					reject(false)
				}
			},
		})
	})
}
// 手机号编号加密
Vue.prototype.dataEncryption = str => {
	if (str) {
		var enStr = str.slice(0, 3) + '****' + str.slice(str.length - 4)
		return enStr
	} else {
		return ''
	}
}
// 正则验证密码强度
Vue.prototype.$canonical = function(str, reg) {
	let num = null
	if (reg == 3) {
		num = RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g')
	} else if (reg == 2) {
		num = RegExp(
			'^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$',
			'g'
		)
	} else {
		num = RegExp('(?=.{6,}).*', 'g')
	}
	return num.test(str)
}
// 防抖
export function _debounce(fn, delay) {
	var delay = delay || 200
	var timer
	return function() {
		var th = this
		var args = arguments
		if (timer) return
		fn.apply(th, args)
		timer = setTimeout(function() {
			timer = null
			// fn.apply(th, args)
		}, delay)
		// if (timer) {
		// 	clearTimeout(timer)
		// }
		// timer = setTimeout(function() {
		// 	timer = null
		// 	fn.apply(th, args)
		// }, delay)
	}
}
// 节流
export function _throttle(fn, interval) {
	var last
	var timer
	var interval = interval || 200
	return function() {
		var th = this
		var args = arguments
		var now = +new Date()
		if (last && now - last < interval) {
			clearTimeout(timer)
			timer = setTimeout(function() {
				last = now
				fn.apply(th, args)
			}, interval)
		} else {
			last = now
			fn.apply(th, args)
		}
	}
}

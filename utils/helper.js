/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: LSC
 * @Date: 2022-03-24 14:46:08
 * @LastEditors: LSC
 * @LastEditTime: 2022-03-24 14:54:28
 */
const WebSocketURL = `${'填上你的ws地址'}`
const now =
    Date.now ||
    function () {
        return new Date().getTime()
    }
const isArray =
    Array.isArray ||
    function (obj) {
        return obj instanceof Array
    }

export default {
    WebSocketURL,
    now,
    isArray
}

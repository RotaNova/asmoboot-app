/*
 * @Descripttion: 本地sqlite,只在app环境下发生
 * @version: 1.0.0
 * @Author: LSC
 * @Date: 2022-03-09 15:58:00
 * @LastEditors: LSC
 * @LastEditTime: 2022-03-09 16:51:13
 */
// 打开
export function openDatabase() {
    return new Promise((resolve, reject) => {
        plus.sqlite.openDatabase({
            name: 'demo',
            path: '_doc/demo.db',
            success: () => {
                resolve('ok.')
            },
            fail: () => {
                reject('fail.')
            }
        })
    })
}

export function createUsers() {
    return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
            name: 'demo',
            sql: `
          create table if not exists users (
              "baseurl" varchar(50) NOT NULL COMMENT "服务器地址",
              "serveAdress"  varchar(50) NOT NULL COMMENT "base地址"
          )
          `,
            success: () => {
                resolve('建库ok.')
            },
            fail: () => {
                reject('建库fail.')
            }
        })
    })
}

export function executeSQL(value) {
    return new Promise((resolve, reject) => {
        plus.sqlite.executeql({
            name: 'demo',
            sql: `insert into users (baseurl,serveAdress) values ("121212","2112")`,
            success: () => {
                plus.sqlite.selectSql({
                    name: 'demo',
                    sql: 'SELECT baseurl, serveAdress FROM users',
                    success: (data) => {
                        // 获取插入后的主键id
                        // console.log(data.baseurl)
                        resolve(data)
                    }
                })
            },
            fail: () => {
                reject('fail.')
            }
        })
    })
}

export function isOpenSql() {
    const isOpen = plus.sqlite.isOpenDatabase({
        name: 'demo',
        path: '_doc/demo.db'
    })
    return isOpen
}

export function findData() {
    return new Promise((resolve, reject) => {
        plus.sqlite.selectSql({
            name: 'demo',
            sql: 'select * from database',
            success: (data) => {
                console.log(data, '先看看有什么')
                resolve(data)
            },
            fail: () => {
                reject('fail.')
            }
        })
    })
}

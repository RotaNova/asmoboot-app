# asmoboot-app

> 采用 uni-app，支持 H5+APP ，安卓，ios

[![](https://camo.githubusercontent.com/d6deb5fc41d9ac3b6957f5fa6701dd35388ea6b42c40d2ee33074e39f19a2662/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4170616368652532304c6963656e7365253230322e302d626c75652e737667#crop=0&crop=0&crop=1&crop=1&from=url&id=b2zhe&margin=%5Bobject%20Object%5D&originHeight=20&originWidth=164&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)](https://github.com/RotaNova/rotanova-boot/blob/master/LICENSE)[![](https://img.shields.io/badge/Author-%E5%85%B4%E8%88%AA%E7%A7%91%E6%8A%80-orange#crop=0&crop=0&crop=1&crop=1&id=Mxgec&originHeight=20&originWidth=102&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)](https://www.asmoboot.com/)[![](https://img.shields.io/badge/uni--app-3.3.11.20220210-green#crop=0&crop=0&crop=1&crop=1&id=HS6u3&originHeight=20&originWidth=158&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)](https://uniapp.dcloud.io/release.html)
<a name="ALgP5"></a>

# 项目运行

1、前往 Github 下载页面([https://github.com/RotaNova/asmoboot-app](https://github.com/RotaNova/asmoboot-app)),选择 web 端下载解压到工作目录<br />2、导入到 HBuilderx，菜单 File -> Import，然后打开控制台，输入 yarn 或者 npm，更推荐使用 yarn 来安装依赖，等候安装成功，初次加载会比较慢（根据自身网络情况而定）,推荐使用国内镜像源来安装。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/21403834/1647312572999-8c563f8d-1a9a-4518-b533-09ce31ce907f.png#clientId=u40410821-6dfe-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u9ea6cfe9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=46&originWidth=393&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4078&status=done&style=none&taskId=u5227499c-82b7-4d67-9113-e59ce1992d5&title=)

```
yarn config set registry https://registry.npm.taobao.org --global // 国内

npm config set registry https://registry.npm.taobao.org --global  // 国内
```

3、进入目录,点击编译即可打开项目，出现如下图表示启动成功<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/21403834/1647312719657-8bc52dd0-161d-4fea-becc-e93eb9a17599.png#clientId=u40410821-6dfe-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=uf7f4b388&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=223245&status=done&style=none&taskId=u014b661f-0698-4405-913b-88b718e2181&title=&width=1920)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/21403834/1647312662835-029105b5-6d72-4615-8a80-d6b94d54d12c.png#clientId=u40410821-6dfe-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=176&id=u0cfb2588&margin=%5Bobject%20Object%5D&name=image.png&originHeight=176&originWidth=1046&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27864&status=done&style=none&taskId=u0f452d25-94c2-47cc-8a42-b6c409fc448&title=&width=1046)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/21403834/1647312854687-819f2e72-98c4-4f3a-bab1-1488a233845f.png#clientId=u40410821-6dfe-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=139&id=ue0586720&margin=%5Bobject%20Object%5D&name=image.png&originHeight=139&originWidth=755&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21156&status=done&style=none&taskId=u9cbb35c8-24af-445b-aa1a-1a82010be4d&title=&width=755)<br />4、系统初始化效果<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/21403834/1647312744668-7dc36caa-69d0-4887-b766-b9216b224355.png#clientId=u40410821-6dfe-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=844&id=u86738fd2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=844&originWidth=390&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21130&status=done&style=none&taskId=u6da37164-43b5-4809-a198-c7018d93292&title=&width=390)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21403834/1647312768645-ca4f2452-5bc6-418f-9920-3fb0a2b06a64.png#clientId=u40410821-6dfe-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=844&id=u4920a26c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=844&originWidth=390&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15751&status=done&style=none&taskId=ubb07e472-13db-4f01-99e7-4b4d3ac988e&title=&width=390)
<a name="scGb1"></a>

# 项目结构

```
.
├── api
├── components // 组件
│   ├── message-item
│   ├── message-modal
│   ├── message-popup
│   ├── mi-map
│   ├── pick-regions
│   ├── rattenking-dtpicker
│   ├── seconds-datetime-picker
│   ├── xt-seach
│   └── yy-video-player
├── iconfont 文字
├── pages 页面
│   ├── componentPage
│   ├── device
│   ├── homePage
│   ├── index
│   ├── login
│   └── monitorPreview
├── static 静态资源
│   ├── images
│   └── yy-video-player
├── store // vuex
├── uni_modules // 组件
│   ├── map-plugin
│   │   ├── components
│   │   │   ├── map-plugin
│   │   │   └── map-search
│   │   └── static
│   │       └── image
│   └── uview-ui
│       ├── components
│       │   ├── u--form
│       │   ├── u--image
│       │   ├── u--input
│       │   ├── u--text
│       │   ├── u--textarea
│       │   ├── u-action-sheet
│       │   ├── u-album
│       │   ├── u-alert
│       │   ├── u-avatar
│       │   ├── u-avatar-group
│       │   ├── u-back-top
│       │   ├── u-badge
│       │   ├── u-button
│       │   ├── u-calendar
│       │   ├── u-car-keyboard
│       │   ├── u-cell
│       │   ├── u-cell-group
│       │   ├── u-checkbox
│       │   ├── u-checkbox-group
│       │   ├── u-circle-progress
│       │   ├── u-code
│       │   ├── u-code-input
│       │   ├── u-col
│       │   ├── u-collapse
│       │   ├── u-collapse-item
│       │   ├── u-column-notice
│       │   ├── u-count-down
│       │   ├── u-count-to
│       │   ├── u-datetime-picker
│       │   ├── u-divider
│       │   ├── u-dropdown
│       │   ├── u-dropdown-item
│       │   ├── u-empty
│       │   ├── u-form
│       │   ├── u-form-item
│       │   ├── u-gap
│       │   ├── u-grid
│       │   ├── u-grid-item
│       │   ├── u-icon
│       │   ├── u-image
│       │   ├── u-index-anchor
│       │   ├── u-index-item
│       │   ├── u-index-list
│       │   ├── u-input
│       │   ├── u-keyboard
│       │   ├── u-line
│       │   ├── u-line-progress
│       │   ├── u-link
│       │   ├── u-list
│       │   ├── u-list-item
│       │   ├── u-loading-icon
│       │   ├── u-loading-page
│       │   ├── u-loadmore
│       │   ├── u-modal
│       │   ├── u-navbar
│       │   ├── u-no-network
│       │   ├── u-notice-bar
│       │   ├── u-notify
│       │   ├── u-number-box
│       │   ├── u-number-keyboard
│       │   ├── u-overlay
│       │   ├── u-parse
│       │   │   └── node
│       │   ├── u-picker
│       │   ├── u-picker-column
│       │   ├── u-popup
│       │   ├── u-radio
│       │   ├── u-radio-group
│       │   ├── u-rate
│       │   ├── u-read-more
│       │   ├── u-row
│       │   ├── u-row-notice
│       │   ├── u-safe-bottom
│       │   ├── u-scroll-list
│       │   ├── u-search
│       │   ├── u-skeleton
│       │   ├── u-slider
│       │   ├── u-status-bar
│       │   ├── u-steps
│       │   ├── u-steps-item
│       │   ├── u-sticky
│       │   ├── u-subsection
│       │   ├── u-swipe-action
│       │   ├── u-swipe-action-item
│       │   ├── u-swiper
│       │   ├── u-swiper-indicator
│       │   ├── u-switch
│       │   ├── u-tabbar
│       │   ├── u-tabbar-item
│       │   ├── u-table
│       │   ├── u-tabs
│       │   ├── u-tabs-item
│       │   ├── u-tag
│       │   ├── u-td
│       │   ├── u-text
│       │   ├── u-textarea
│       │   ├── u-toast
│       │   ├── u-toolbar
│       │   ├── u-tooltip
│       │   ├── u-tr
│       │   ├── u-transition
│       │   ├── u-upload
│       │   └── uview-ui
│       └── libs
│           ├── config
│           │   └── props
│           ├── css
│           ├── function
│           ├── luch-request
│           │   ├── adapters
│           │   ├── core
│           │   ├── helpers
│           │   └── utils
│           ├── mixin
│           └── util
├── units
├── unpackage
│   └── dist
│       └── dev
│           ├── app-plus
│           │   └── static
│           │       └── yy-video-player
│           └── mp-weixin
│               ├── pages
│               │   ├── homePage
│               │   └── login
│               ├── static
│               └── uni_modules
│                   └── uview-ui
│                       └── components
│                           ├── u-badge
│                           ├── u-checkbox
│                           ├── u-checkbox-group
│                           ├── u-icon
│                           ├── u-line
│                           ├── u-loading-icon
│                           ├── u-modal
│                           ├── u-navbar
│                           ├── u-overlay
│                           ├── u-popup
│                           ├── u-safe-bottom
│                           ├── u-status-bar
│                           ├── u-tabbar
│                           ├── u-tabbar-item
│                           └── u-transition
└── utils

```

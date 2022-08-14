## 1.0.1 (2022-08-13)


### Bug Fixes

* 拆分了日志详情接口 ([186772a](https://gitee.com/du-hao-111/monitoring-system/commits/186772a9e4a740a7bbeb08378c72b451dbb3206f))
* 处理eslint语法错误 ([a6f599c](https://gitee.com/du-hao-111/monitoring-system/commits/a6f599c09ba326dd0d17c4766fda9b1532cec759))
* 调整了概览页的图表样式 ([25b2ca0](https://gitee.com/du-hao-111/monitoring-system/commits/25b2ca07788c54de48b27cc3fff03841a3b314ff))
* 调整了一下首页 ([cdd2590](https://gitee.com/du-hao-111/monitoring-system/commits/cdd2590fd9809fd2cfda2742e9890bd0445c3d6f))
* 关闭虚拟服务器，注释所有控制台输出，针对列表中过长数据进行省略处理 ([16fa12f](https://gitee.com/du-hao-111/monitoring-system/commits/16fa12fa748058e6a6f6c5d835ade7836436baa7))
* 合并logs分支，处理冲突 ([4d82093](https://gitee.com/du-hao-111/monitoring-system/commits/4d820934fa6cfa356de56bb0c04b9f07604810ae))
* 禁止页面报错 ([76291e6](https://gitee.com/du-hao-111/monitoring-system/commits/76291e64f24ac4119410ae326f9ee5bf6fb220c3))
* 完善概览页所有功能，更新了mock数据 ([5e671e2](https://gitee.com/du-hao-111/monitoring-system/commits/5e671e2feae9440dc3287c8b1f75c8bd3493ed56))
* 修复切换路由重新请求网站列表的问题 ([fd3fa2d](https://gitee.com/du-hao-111/monitoring-system/commits/fd3fa2d3e10d6dd2085294cfacc0a9d0da66208a))
* 修复完善4个列表页功能 ([e80120c](https://gitee.com/du-hao-111/monitoring-system/commits/e80120c90f789ee75bf560b6742498bbfa556446))
* 修复无法过滤性能日志参数的bug ([c74bbae](https://gitee.com/du-hao-111/monitoring-system/commits/c74bbae821320bbe950a829de48145e33f78f18e))
* 修复用户菜单被表格遮挡的问题 ([c9a578e](https://gitee.com/du-hao-111/monitoring-system/commits/c9a578e7d278ebc9d580945f8567f62df8d13874))
* 修改了首页的静态数据 ([31b2905](https://gitee.com/du-hao-111/monitoring-system/commits/31b29051f4a69fa2429c6283906886bd03ffc08a))
* 折线图不再以总量显示 ([c426726](https://gitee.com/du-hao-111/monitoring-system/commits/c426726984b3e9740a2dbd193eff3322c557774b))
* **custom:** 添加全局reset ([1fbbfd4](https://gitee.com/du-hao-111/monitoring-system/commits/1fbbfd42721fd559cb6c0e4cf2830b88894964bb))


### Features

* 安装pinia ([af4d3f8](https://gitee.com/du-hao-111/monitoring-system/commits/af4d3f887843ad4caf3f59bf4bdeacaaf09487d5))
* 合并了登录功能，完成了路由守卫 ([65ad00d](https://gitee.com/du-hao-111/monitoring-system/commits/65ad00dbb74c48c9d4aeec514082409d99a00bd1))
* 实现切换用户功能 ([28ef8f6](https://gitee.com/du-hao-111/monitoring-system/commits/28ef8f675ed810fa85148843d7bb2cdbc96f0856))
* 实现首页标题路由跳转 ([f27b7e1](https://gitee.com/du-hao-111/monitoring-system/commits/f27b7e15c90278cc65ca428ca36608d0982216d9))
* 实现首页修改网站功能 ([0853b37](https://gitee.com/du-hao-111/monitoring-system/commits/0853b37f5222bc9f86d20add4a60e40d8584815f))
* 实现Mock虚拟服务器功能 ([fcc44c2](https://gitee.com/du-hao-111/monitoring-system/commits/fcc44c204435ab6e55ac739e186e1b74fe1baaa7))
* 添加的顶部网站选择器 ([73d77a3](https://gitee.com/du-hao-111/monitoring-system/commits/73d77a3cb6d8e7b49d89505738fa740641abb155))
* 完成了请求函数 ([cb14596](https://gitee.com/du-hao-111/monitoring-system/commits/cb145965192f845b44ed51b552f943419e53106e))
* 完成图表切换时间区间的功能 ([c032840](https://gitee.com/du-hao-111/monitoring-system/commits/c032840a7c2115a21059c515849f0735262cc10c))
* 项目路由框架搭建 ([14b5502](https://gitee.com/du-hao-111/monitoring-system/commits/14b550233e51a7da1a3ec6d1e938685d0471c908))
* 引入监控脚本，改用真实的接口 ([ce31b6e](https://gitee.com/du-hao-111/monitoring-system/commits/ce31b6ee80e6842df5416e480d975d072ef05eb7))
* 在首页卡片中显示网站id ([c14c7f8](https://gitee.com/du-hao-111/monitoring-system/commits/c14c7f85f712cb756659ea2efec76c981a25f9fa))
* 增加脚本下载功能 ([453358e](https://gitee.com/du-hao-111/monitoring-system/commits/453358e5a5e05710541fc4ce673c6f45de228255))
* **custom): feat(custom:** 登录+注册+首页展示/创建/删除网站 ([579715e](https://gitee.com/du-hao-111/monitoring-system/commits/579715ea1b1a0110ae337be7f6b3f0ed99f97775))
* **custom:** 概述页面 ([8333266](https://gitee.com/du-hao-111/monitoring-system/commits/8333266a508b300d00d999f6e3ea841f8216c7d1))
* **custom:** 添加静态资源 ([9c157fe](https://gitee.com/du-hao-111/monitoring-system/commits/9c157fec62514657e7c8d93626811d0dd087558c))
* **custom:** 添加全局scss修改格式化配置 ([886008b](https://gitee.com/du-hao-111/monitoring-system/commits/886008b074b05daf2f397086a6bdc1eaf0d00331))
* **custom:** map组件 ([3bd6b06](https://gitee.com/du-hao-111/monitoring-system/commits/3bd6b06e0336b85cd3537b899d588f1f8323dfd8))


### Performance Improvements

* 按序导入 Element Plus 组件，china.json地图数据通过请求异步加载 ([d9bba89](https://gitee.com/du-hao-111/monitoring-system/commits/d9bba89a68be49ce38e00df9e0956ae683dbe79f))
* 抽离图表为异步组件，优化概览页性能 ([bd80256](https://gitee.com/du-hao-111/monitoring-system/commits/bd80256d361a7e5367614d22d4e01e681d3e8dcc))
* 生产环境下异步加载element-plus，首屏渲染从4秒降至1.5秒 ([7cd873b](https://gitee.com/du-hao-111/monitoring-system/commits/7cd873bb1fae36f0a130628a16f176b1ce82a513))




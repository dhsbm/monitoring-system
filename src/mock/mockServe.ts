import Mock from 'mockjs'
import { errLogs, perLogs, behLogs, httpLogs } from './logs'
interface Option {
  url: string
  type: string
  body: string
}

// 登录
Mock.mock('/mock/user/login', 'post', {
  code: 0,
  message: '登录成功',
  data: {
    name: '管理员',
    user_id: 1,
    token: 'tokentokentokentokentokentoken',
  },
})
// 注册
Mock.mock('/mock/user/register', 'post', {
  code: 0,
  message: '注册成功',
  data: {
    name: '管理员',
    user_id: 1,
    token: 'tokentokentokentokentokentoken',
  },
})

// 注册
Mock.mock('/mock/user/info', 'get', {
  code: 0,
  message: '获取用户信息成功',
  data: {
    name: '管理员',
    user_id: 1,
    token: 'tokentokentokentokentokentoken',
  },
})

const web_list = [
  {
    web_id: 1,
    url: 'localhost',
    title: '测试网站1',
    warn_list: [],
  },
  {
    web_id: 2,
    url: 'localhost',
    title: '测试网站2',
    warn_list: [],
  },
  {
    web_id: 3,
    url: 'www.baidu.com',
    title: '百度',
    warn_list: [],
  },
  {
    web_id: 4,
    url: 'www.taobao.com',
    title: '淘宝',
    warn_list: [],
  },
  {
    web_id: 5,
    url: 'www.jd.com',
    title: '京东',
    warn_list: [],
  },
]

// 获取网站列表
Mock.mock('/mock/web/list', 'get', {
  code: 0,
  message: '',
  data: {
    web_list,
  },
})

// 添加网站
Mock.mock('/mock/web/add', 'post', () => {
  web_list.push({
    web_id: web_list.length + 1,
    url: 'www.com',
    title: '新增网站',
    warn_list: [],
  })
  return {
    code: 0,
    message: '',
    data: {
      web_id: 2,
    },
  }
})

// 修改网站信息
Mock.mock('/mock/web/edit', 'put', () => {
  web_list[0].title = '我被修改了'
  return {
    code: 0,
    message: '',
  }
})

// 修改网站信息
Mock.mock('/mock/web/delete', 'delete', () => {
  web_list.pop()
  return {
    code: 0,
    message: '',
  }
})

const area = []
for (let i = 0; i < 35; i++) {
  area.push((Math.random() * 100) | 0)
}
const browser = []
for (let i = 0; i < 16; i++) {
  browser.push((Math.random() * 100) | 0)
}
const err: any = []
for (let i = 0; i < 16; i++) {
  const arr = []
  for (let j = 0; j < 4; j++) {
    arr.push((Math.random() * 100) | 0)
  }
  err.push(arr)
}
const per: any = []
for (let i = 0; i < 16; i++) {
  const arr = []
  for (let j = 0; j < 6; j++) {
    arr.push((Math.random() * 100) | 0)
  }
  per.push(arr)
}
const user1: any = []
for (let i = 0; i < 16; i++) {
  const arr = []
  for (let j = 0; j < 2; j++) {
    arr.push((Math.random() * 100) | 0)
  }
  user1.push(arr)
}
const user2: any = []
for (let i = 0; i < 16; i++) {
  const arr = []
  for (let j = 0; j < 1; j++) {
    arr.push((Math.random() * 100) | 0)
  }
  user2.push(arr)
}
const http1: any = []
for (let i = 0; i < 16; i++) {
  const arr = []
  for (let j = 0; j < 1; j++) {
    arr.push((Math.random() * 100) | 0)
  }
  http1.push(arr)
}
const http2: any = []
for (let i = 0; i < 16; i++) {
  const arr = []
  for (let j = 0; j < 2; j++) {
    arr.push((Math.random() * 100) | 0)
  }
  http2.push(arr)
}
// 查询用户地区分布
Mock.mock('/mock/logs/all', 'post', {
  code: 0,
  message: '',
  data: {
    err,
    per,
    user1,
    user2,
    http1,
    http2,
    browser,
    area,
  },
})

// 查询日志统计信息 只提供错误查询
Mock.mock('/mock/logs/stat', 'post', (option: Option) => {
  const { kind, index } = JSON.parse(option.body)
  let data: any
  switch (kind) {
    case 0:
      data = err
      break
    case 1:
      data = per
      break
    case 2:
      if (index == 0) {
        data = user1
      } else {
        data = user2
      }
      break
    case 3:
      if (index == 0) {
        data = http1
      } else {
        data = http2
      }
  }
  return {
    code: 0,
    message: '',
    data,
  }
})

// 查询日志完整信息
Mock.mock('/mock/logs/err', 'post', (option: Option) => {
  const { page } = JSON.parse(option.body)
  return {
    code: 0,
    message: '',
    data: {
      total: 25,
      size: 10,
      page: 1,
      logs: errLogs.slice((page - 1) * 10, page * 10),
    },
  }
})

Mock.mock('/mock/logs/per', 'post', (option: Option) => {
  const { page } = JSON.parse(option.body)
  return {
    code: 0,
    message: '',
    data: {
      total: 25,
      size: 10,
      page: 1,
      logs: perLogs.slice((page - 1) * 10, page * 10),
    },
  }
})

Mock.mock('/mock/logs/beh', 'post', (option: Option) => {
  const { page } = JSON.parse(option.body)
  return {
    code: 0,
    message: '',
    data: {
      total: 25,
      size: 10,
      page: 1,
      logs: behLogs.slice((page - 1) * 10, page * 10),
    },
  }
})
Mock.mock('/mock/logs/http', 'post', (option: Option) => {
  const { page } = JSON.parse(option.body)
  return {
    code: 0,
    message: '',
    data: {
      total: 25,
      size: 10,
      page: 1,
      logs: httpLogs.slice((page - 1) * 10, page * 10),
    },
  }
})

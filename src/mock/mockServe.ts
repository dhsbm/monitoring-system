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
    name: '测试用户',
    user_id: 1,
    token: 'tokentokentokentokentokentoken',
  },
})
// 注册
Mock.mock('/mock/user/register', 'post', {
  code: 0,
  message: '注册成功',
  data: {
    name: '测试用户',
    user_id: 1,
    token: 'tokentokentokentokentokentoken',
  },
})

// 注册
Mock.mock('/mock/user/info', 'get', {
  code: 0,
  message: '获取用户信息成功',
  data: {
    name: '测试用户',
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

// 查询日志完整信息
Mock.mock('/mock/logs/detail', 'post', (option: Option) => {
  const { kind, page } = JSON.parse(option.body)
  let logs
  switch (kind) {
    case 0:
      logs = errLogs.slice((page - 1) * 10, page * 10)
      break
    case 1:
      logs = perLogs.slice((page - 1) * 10, page * 10)
      break
    case 2:
      logs = behLogs.slice((page - 1) * 10, page * 10)
      break
    case 3:
      logs = httpLogs.slice((page - 1) * 10, page * 10)
      break
  }
  return {
    total: 25,
    size: 10,
    page: 1,
    logs,
  }
})

// 查询用户地区分布
Mock.mock('/mock/logs/all', 'post', {
  code: 0,
  message: '',
  data: {
    err: [
      [100, 1, 2, 3],
      [100, 1, 2, 3],
      [100, 1, 2, 3],
      [100, 1, 2, 3],
      [100, 1, 2, 3],
      [100, 1, 2, 3],
      [100, 1, 2, 3],
    ],
    per: [
      [38, 73, 79, 38, 11, 23],
      [38, 73, 79, 38, 11, 23],
      [38, 73, 79, 38, 11, 23],
      [38, 73, 79, 38, 11, 23],
      [38, 73, 79, 38, 11, 23],
      [38, 73, 79, 38, 11, 23],
      [38, 73, 79, 38, 11, 23],
    ],
    user1: [
      [98, 20],
      [20, 43],
      [98, 20],
      [98, 20],
      [98, 20],
      [98, 20],
      [98, 20],
    ],
    user2: [[83], [82], [34], [100], [53], [13], [203]],
    http1: [
      [25, 75],
      [25, 75],
      [25, 75],
      [25, 75],
      [25, 75],
      [25, 75],
      [25, 75],
    ],
    http2: [[87], [87], [87], [87], [87], [87], [87]],
    browser: [49, 120, 20, 0, 0, 0, 0],
    area: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1,
      2, 3, 4, 5,
    ],
  },
})

// 查询日志统计信息 只提供错误查询
Mock.mock('/mock/logs/stat', 'post', {
  code: 0,
  message: '',
  data: [
    [38, 56, 68, 34],
    [9, 32, 5, 3],
    [66, 53, 93, 39],
    [27, 44, 27, 44],
    [66, 53, 93, 39],
    [38, 56, 68, 34],
    [38, 56, 68, 34],
  ],
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
    data: {
      total: 25,
      size: 10,
      page: 1,
      logs: httpLogs.slice((page - 1) * 10, page * 10),
    },
  }
})

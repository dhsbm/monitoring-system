export const errLogs: any = []

export const perLogs: any = []
export const behLogs: any = []
export const httpLogs: any = []

let id = 0
const time = Date.now()
for (let i = 0; i < 25; i++) {
  errLogs.push({
    log_id: id++,
    kind: 0,
    time: time + id,
    url: 'www.baidu.com',
    type: (Math.random() * 4) | 0,
    message: 'XXX异常信息',
    stack: '触发异常的行为',
  })
  let second = (Math.random() * 10) | 0
  perLogs.push({
    log_id: id++,
    kind: 1,
    time: time + id,
    url: 'www.baidu.com',
    dns: second,
    fp: (second += (Math.random() * 50) | 0),
    fcp: (second += (Math.random() * 5) | 0),
    lcp: (second += (Math.random() * 50) | 0),
    l: (second += (Math.random() * 100) | 0),
  })
  behLogs.push({
    log_id: id++,
    kind: 2,
    time: time + id,
    url: 'www.baidu.com',
    duration: (Math.random() * 1000000) | 0,
    ip: '127.30.224.4',
    area: (Math.random() * 35) | 0, // 未知
  })
  httpLogs.push({
    log_id: id++,
    kind: 3,
    time: time + id,
    url: 'www.baidu.com',
    res_time: (Math.random() * 100) | 0,
    send_url: 'www.baidu.com',
    way: 'GET',
    success: 0,
    status: 200,
    // req_header: '长字符串',
    // req_params: '长字符串',
    // res_header: '长字符串',
    res_body: '长字符串',
  })
}

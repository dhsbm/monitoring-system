export const errLogs: any = []

export const preLogs: any = []
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
    selector: 'window',
  })
  preLogs.push({
    log_id: id++,
    kind: 1,
    time: time + id,
    url: 'www.baidu.com',
    dns: 100,
    fp: 100,
    fcp: 200,
    lcp: 300,
    l: 1000,
  })
  behLogs.push({
    log_id: id++,
    kind: 2,
    time: time + id,
    url: 'www.baidu.com',
    duration: 300000,
    ip: '127.30.224.4',
    area: 0, // 未知
  })
  httpLogs.push({
    log_id: id++,
    kind: 3,
    time: time + id,
    url: 'www.baidu.com',
    res_time: 100,
    send_url: 'www.baidu.com',
    way: 'get',
    success: true,
    status: 200,
    // req_header: '长字符串',
    // req_params: '长字符串',
    // res_header: '长字符串',
    res_body: '长字符串',
  })
}

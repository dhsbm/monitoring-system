import mockAjax from './mockAjax'
import { reqLogin, reqRegister, reqGetInfo, LoginParams, RegisterParams } from './user'
import { reqWebList, reqAddWeb, reqEditWeb, reqDeleteWeb, AddParams, EditParams } from './web'
import { reqAll, reqStat, reqErr, reqBeh, reqPer, reqHttp } from './logs'

export {
  mockAjax as ajax,
  reqLogin,
  reqRegister,
  reqGetInfo,
  reqWebList,
  reqAddWeb,
  reqEditWeb,
  reqDeleteWeb,
  reqAll,
  reqErr,
  reqBeh,
  reqPer,
  reqHttp,
  reqStat,
}

export type { LoginParams, RegisterParams, AddParams, EditParams }

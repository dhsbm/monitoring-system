import mockAjax from './mockAjax'
import ajax from './ajax'
import { reqLogin, reqRegister, reqGetInfo, LoginParams, RegisterParams } from './user'
import { reqWebList, reqAddWeb, reqEditWeb, reqDeleteWeb, AddParams, EditParams } from './web'
import { reqAll, reqStat, reqErr, reqBeh, reqPer, reqHttp } from './logs'
import { reqMap, reqCSS } from './static'

export {
  ajax,
  mockAjax,
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
  reqMap,
  reqCSS,
}

export type { LoginParams, RegisterParams, AddParams, EditParams }

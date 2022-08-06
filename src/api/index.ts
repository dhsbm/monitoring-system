import mockAjax from './mockAjax'
import { reqLogin, reqRegister } from './user'
import { reqWebList, reqAddWeb, reqEditWeb, reqDeleteWeb } from './web'
import { reqErr,reqPer,reqBeh, reqHttp,reqAll, reqArea, reqBrowser, reqStat } from './logs'

export {
  mockAjax as ajax,
  reqLogin,
  reqRegister,
  reqWebList,
  reqAddWeb,
  reqEditWeb,
  reqDeleteWeb,
  reqErr,
  reqPer,
  reqBeh, 
  reqHttp,
  reqAll,
  reqArea,
  reqBrowser,
  reqStat,
}

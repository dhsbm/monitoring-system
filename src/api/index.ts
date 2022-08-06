import mockAjax from './mockAjax'
import { reqLogin, reqRegister, reqGetInfo } from './user'
import { reqWebList, reqAddWeb, reqEditWeb, reqDeleteWeb } from './web'
import { reqDetail, reqAll, reqArea, reqBrowser, reqStat } from './logs'

export {
  mockAjax as ajax,
  reqLogin,
  reqRegister,
  reqGetInfo,
  reqWebList,
  reqAddWeb,
  reqEditWeb,
  reqDeleteWeb,
  reqDetail,
  reqAll,
  reqArea,
  reqBrowser,
  reqStat,
}

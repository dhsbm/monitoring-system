import { ajax } from '.'
import { CommonResponse } from '@/interface'

// 获取网站列表
export function reqWebList(): Promise<ListResponse> {
  return ajax.get('/web/list')
}
interface ListResponse extends CommonResponse {
  data: {
    web_list: {
      web_id: number
      url: string
      title: string
      warn_list: string[] // 目前还是空数组
    }[]
  }
}

// 添加网站
export function reqAddWeb(params: AddParams): Promise<AddResponse> {
  return ajax.post('/web/add', params)
}
interface AddParams {
  url: string
  title: string
}
interface AddResponse extends CommonResponse {
  data: {
    web_list: {
      web_id: number
      url: string
      title: string
    }
  }
}

// 修改网站信息
export function reqEditWeb(params: EditParams): Promise<EditResponse> {
  return ajax.put('/web/edit', params)
}
interface EditParams {
  web_id: number
  url?: string
  title?: string
  warn_list?: string[]
}
type EditResponse = CommonResponse

// 删除网站
export function reqDeleteWeb(params: DeleteParams): Promise<DeleteResponse> {
  return ajax.delete('/web/delete', {
    data: params,
  })
}
interface DeleteParams {
  web_id: number
}
type DeleteResponse = CommonResponse

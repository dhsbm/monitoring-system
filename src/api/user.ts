import { ajax } from '.'
import { CommonResponse } from '@/interface'

// 登录
export function reqLogin(params: LoginParams): Promise<LoginResponse> {
  return ajax.post('/user/login', params)
}
interface LoginParams {
  email: string
  password: string
}
interface LoginResponse extends CommonResponse {
  data: {
    user_id: number
    name: string
    token: string
  }
}

// 注册
export function reqRegister(params: RegisterParams): Promise<RegisterResponse> {
  return ajax.post('/user/register', params)
}
interface RegisterParams {
  email: string
  password: string
  name: string
}
interface RegisterResponse extends CommonResponse {
  data: {
    user_id: number
    name: string
    token: string
  }
}

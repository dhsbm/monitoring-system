import { ajax } from '.'
import { CommonResponse } from '@/interface'

interface UserResponse extends CommonResponse {
  data: {
    userId: number
    name: string
    token: string
  }
}

// 登录
export function reqLogin(params: LoginParams): Promise<UserResponse> {
  return ajax.post('/user/login', params)
}
interface LoginParams {
  email: string
  password: string
}

// 注册
export function reqRegister(params: RegisterParams): Promise<UserResponse> {
  return ajax.post('/user/register', params)
}
interface RegisterParams {
  email: string
  password: string
  name: string
}

// 获取用户信息
export function reqGetInfo(): Promise<UserResponse> {
  return ajax.get('/user/info')
}

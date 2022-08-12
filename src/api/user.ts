import { ajax } from '.'
import { CommonResponse } from '@/interface'

interface UserResponse extends CommonResponse {
  data: {
    userId: number
    name: string
    token: string
  }
}

// 用户登录
export function reqLogin(params: LoginParams): Promise<UserResponse> {
  return ajax.post('/user/login', params)
}
export interface LoginParams {
  email: string
  password: string
}

// 用户注册
export function reqRegister(params: RegisterParams): Promise<UserResponse> {
  return ajax.post('/user/register', params)
}
export interface RegisterParams {
  email: string
  password: string
  name: string
}

// 根据token获取用户信息
export function reqGetInfo(): Promise<UserResponse> {
  return ajax.get('/user/info')
}

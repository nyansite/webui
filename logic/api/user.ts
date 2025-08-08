import { post } from '../request'
import { emailRegex, validateRegex } from '../validate/regex'

/**
 * 用户模块相关接口，包含注册，登录等
 */

// 验证是否已注册
export async function verifyAccount(account: string) {
  // 校验是邮箱还是用户名
  const isEmail: boolean = validateRegex(emailRegex, account)
  const result = await post('/user/verify-account', {
    username: isEmail ? '' : account,
    email: isEmail ? account : '',
  })

  return result
}

// 发送验证码
export async function getVerifyCode(email: string) {
  return await post('/user/request-email-code', { email })
}


// 注册用户
export interface RegisterUserParams {
  username?: string
  password: string
  mail?: string
  code?: string
}

export async function registerUser(params: RegisterUserParams) {
  const { username, password, mail, code } = params

  const result = await post('/user/signup', {
    username,
    password,
    mail,
    code
  })

  return result
}

// 用户登录
export interface LoginParams {
  username?: string
  password: string
  email?: string
}

export async function userLogin(params: LoginParams) {
  const { username, password, email } = params

  const result = await post('/user/login', {
    username,
    password,
    email
  })

  return result
}

// 获取已登录用户自身的信息
export async function getOwnInfo() {
  return await post('/user/get-own-info')
}

// 用户登出
export async function userLogout() {
  return await post('/user/logout')
}

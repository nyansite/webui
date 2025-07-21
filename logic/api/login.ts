import { post } from '../request'
import { emailRegex, validateRegex } from '../validate/regex'

/**
 * 用户登录模块相关接口
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
  // 校验邮箱格式
  if (!validateRegex(emailRegex, email)) {
    throw new Error('Invalid email format')
  }

  const result = await post('/user/request-email-code', { email })
  return result
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
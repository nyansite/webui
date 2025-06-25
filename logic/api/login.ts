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
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  return result
}

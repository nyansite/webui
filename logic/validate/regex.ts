/**
 * 正则表达式
 */
// 校验账号：可用字符包括大小写字母，下划线（_），数字
export const accountRegex = /^\w*$/

// 校验Email格式
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i

// 校验密码：可用字符包括大小写字母，下划线（_），数字；要求必须包含大写字母和小写字母，数字
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\w+$/

// 正则校验函数
export function validateRegex(reg: RegExp, content: string): boolean {
  return reg.test(content)
}

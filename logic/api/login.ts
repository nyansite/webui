import { post } from "../request";

/**
 * 用户登录模块相关接口
 */

// 验证是否已注册
export async function verifyAccount() {
    const result = await post("/user/verify-account")
}
// 用于PrimeVue表单组件 <Form/> 校验
import { accountRegex, emailRegex, passwordRegex, validateRegex } from "./regex"

// 登录用户名校验，不使用账号正则
export function loginUsernameValidate(username: string, keyName: string) {
    const errors: Record<string, any> = {}

    if (!username) {
        errors[keyName] = [{
            type: "required",
            message: "用户名不能为空！"
        }]
    } else if (username.length < 6) {
        errors[keyName] = [{
            type: "minimal",
            message: "用户名不能少于6位！"
        }]
    } else if (username.length > 30) {
        errors[keyName] = [{
            type: "maximal",
            message: "用户名不能大于30位！"
        }]
    }

    return errors
}

// 注册用户名校验
export function registerUsernameValidate(username: string, keyName: string) {
    const errors: Record<string, any> = {}

    if (!username) {
        errors[keyName] = [{
            type: "required",
            message: "用户名不能为空！"
        }]
    } else if (username.length < 6) {
        errors[keyName] = [{
            type: "minimal",
            message: "用户名不能少于6位！"
        }]
    } else if (username.length > 30) {
        errors[keyName] = [{
            type: "maximal",
            message: "用户名不能大于30位！"
        }]
    } else if (!validateRegex(accountRegex, username)) {
        // 用户名正则校验不通过
        errors[keyName] = [{
            type: "error",
            message: "用户名只能包含大写字母，小写字母，数字，下划线！"
        }]
    }

    return errors
}

// 密码校验
export function passwordValidate(password: string, keyName: string) {
    const errors: Record<string, any> = {}

    if (!password) {
        errors[keyName] = [{
            type: "required",
            message: "密码不能为空！"
        }]
    } else if (password.length < 6) {
        errors[keyName] = [{
            type: "minimal",
            message: "密码不能少于6位！"
        }]
    } else if (password.length > 30) {
        errors[keyName] = [{
            type: "maximal",
            message: "密码不能大于20位！"
        }]
    } else if (!validateRegex(passwordRegex, password)) {
        // 密码正则校验不通过
        errors[keyName] = [{
            type: "error",
            message: "密码必须包含大写字母，小写字母，数字，且特殊字符只能有下划线"
        }]
    }

    return errors
}

// 邮箱校验
export function emailValidate(email: string, keyName: string) {
    const errors: Record<string, any> = {}

    if (!email) {
        errors[keyName] = [{
            type: "required",
            message: "邮箱不能为空！"
        }]
    } else if (!validateRegex(emailRegex, email)) {
        errors[keyName] = [{
            type: "error",
            message: "邮箱格式不正确！"
        }]
    }



    return errors
}
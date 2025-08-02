import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userid: -1,  // 用户id, -1表示未登录
    username: '', // 用户账户
    name: '',  // 用户昵称
    gender: '', // 用户性别
    mail: '',  // 用户邮箱
    level: -1, // 用户等级
    avatar: '', // 用户头像文件
    birthday: '', // 用户生日
    follows: [], // 关注列表
    fans: [],  // 粉丝列表（粉丝id）
    error: -1, // 错误代码
  })
})
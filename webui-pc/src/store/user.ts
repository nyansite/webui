import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',  // 用户id, 空表示未登录
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
  }),
  
  actions: {
    setUserData(data: Record<string, any>) {
      this.id = data.id
      this.username = data.username
      this.name = data.name
      this.gender = data.gender
      this.mail = data.mail
      this.level = data.level
      this.avatar = data.avatar
      this.birthday = data.birthday
      this.follows = data.follows
      this.fans = data.fans
      this.error = data.error
    },
    clearUserData() {
      this.id = ''
      this.username = ''
      this.name = ''
      this.gender = ''
      this.mail = ''
      this.level = -1
      this.avatar = ''
      this.birthday = ''
      this.follows = []
      this.fans = []
      this.error = -1
    }
  }
})
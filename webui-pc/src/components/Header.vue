<script setup lang="ts">
import { userLogout } from 'logic'
import { useToast } from 'primevue'

const router = useRouter()
const userStore = useUserStore()
const toast = useToast()

// Header左边的菜单
const menuItems = ref<Record<string, any>[]>([
  {
    label: '主页',
    icon: 'i-carbon-home',
    command: () => {
      router.push('/')
    },
  },
])


// 登录按钮弹出菜单
const loginMenu = ref<any>(null)
const loginPopupMenu = ref<Record<string, any>[]>([
  {
    label: '个人中心',
    icon: 'i-carbon-user',
    command: () => {
      router.push('/profile')
    },
  },
  {
    label: '设置',
    icon: 'i-carbon-settings',
    command: () => {
      router.push('/settings')
    },
  },
  {
    separator: true
  },
  {
    label: '登出',
    icon: 'i-carbon-logout',
    command: async () => {
      const { data, status } = await userLogout()
      if(status === 200) {
        if(data.error !== 0) {
          showToast(toast, 'error', '错误', `登出失败，用户未登录！`)
          return
        } else {
          showToast(toast, 'success', '成功', '登出成功')
          userStore.clearUserData()
          router.push('/')
        }
      } else {
        showToast(toast, 'error', '错误', `登出请求失败，错误码: ${status}`)
      }
    },
  },
])

const toggle = (event: Event) => {
  loginMenu.value!.toggle(event)
}

const isLogin = ref<boolean>(userStore.id !== '')

// 监听登录状态的变化
watch(() => userStore.id, (newId) => {
  isLogin.value = newId !== ''
})
</script>

<template>
  <header>
    <Toast position="top-right" />
    <Menubar class="menubar" :model="menuItems">
      <template #start>
        <img src="../assets/logo.png" alt="logo" mr-2>
        <h1>Nyansite</h1>
      </template>

      <template #end>
        <div flex="~ items-center justify-center">
          <InputText placeholder="搜索..." type="text" h-8 w-32 sm:w-auto />
          <div ml-3 mr-2>
            <div v-if="!isDark" i-carbon-sun class="theme" @click="() => toggleDark()" />
            <div v-else i-carbon-moon class="theme" @click="() => toggleDark()" />
          </div>
          <Avatar v-if="!isLogin" cursor-pointer label="登录" aria-haspopup="false"
                 @click="$router.push('/login')" />
          <Avatar v-else cursor-pointer :image="userStore.avatar" aria-haspopup="true" aria-controls="logged-in"
                  @click="toggle"/>
          <Menu ref="loginMenu" id="overlay_menu" :model="loginPopupMenu" :popup="true">
            <template #end>
                <button v-ripple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
                    <Avatar :image="userStore.avatar" class="mr-2" shape="circle" />
                    <span class="inline-flex flex-col items-start">
                        <span class="font-bold">{{ userStore.username }}</span>
                        <span class="text-sm">Level: {{ userStore.level }}</span>
                    </span>
                </button>
            </template>
          </Menu>
        </div>
      </template>
    </Menubar>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-items: center;
  width: 100vw;
  height: 3rem;
  background-color: rgb(246, 246, 246);
  border-bottom: 1px solid rgb(202, 202, 202);
  gap: 1rem;
  z-index: 5;

  img {
    $size: 1.8rem;
    width: $size;
    height: $size;
  }
}

.dark header {
  background-color: rgb(26, 26, 26);
  border-bottom: 1px solid rgb(75, 74, 74);
}

.menubar {
  position: relative;
  width: 100%;
  height: 100%;
}

.theme {
  font-size: 1.3rem;
  cursor: pointer;
  margin: 0;
  padding: 0;

  &:hover {
    color: deeppink;
  }
}
</style>

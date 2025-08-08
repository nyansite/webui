<script lang="ts" setup>
import { getOwnInfo } from 'logic'
const userStore = useUserStore()

// 加载用户信息
onBeforeMount(async () => {
  const { data, status } = await getOwnInfo()
  if(status === 200) {
    // 已登录
    if(data.error === 0) {
      userStore.setUserData(data)
    }
  }
})
</script>

<template>
  <Header />
  <RouterView />
</template>

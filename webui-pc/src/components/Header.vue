<script setup lang="ts">
const router = useRouter()
const menuItems = ref<Record<string, any>[]>([
  {
    label: '主页',
    icon: 'i-carbon-home',
    command: () => {
      router.push('/')
    },
  },
])
</script>

<template>
  <header>
    <Menubar class="menubar" :model="menuItems">
      <template #start>
        <img src="../assets/logo.png" alt="logo">
        <h1>Nyansite</h1>
      </template>

      <template #end>
        <div flex="~ items-center justify-center">
          <InputText placeholder="搜索..." type="text" h-8 w-32 sm:w-auto />
          <div ml-3>
            <div v-if="!isDark" i-carbon-sun class="theme" @click="() => toggleDark()" />
            <div v-else i-carbon-moon class="theme" @click="() => toggleDark()" />
          </div>
          <Avatar ml-3 cursor-pointer label="登录" @click="$router.push('/login')" />
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

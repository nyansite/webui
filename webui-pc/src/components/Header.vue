<script setup lang="ts">

</script>

<template>
  <header>
    <div w-33.3vw h-full flex="~ row items-center">
      <img src="../assets/logo.png" alt="logo" w-8 ml-2>
      <h1 font-size-5 w-fit ml-1>
        Nyansite
      </h1>
    </div>
    <div w-33.3vw h-full />
    <div w-33.3vw h-full>
      <div v-if="!isDark" i-carbon-sun class="theme" @click="toggleDark" />
      <div v-else i-carbon-moon class="theme" @click="toggleDark" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 3rem;
  background-color: rgb(246, 246, 246);
  border-bottom: 1px solid rgb(202, 202, 202);
  gap: 1rem;
}

.dark header {
  background-color: rgb(26, 26, 26);
  border-bottom: 1px solid rgb(75, 74, 74);
}

.theme {
  font-size: 1.3rem;
  position: absolute;
  right: 7px;
  top: 10px;
  cursor: pointer;
  &:hover {
    color: deeppink;
  }
}
</style>

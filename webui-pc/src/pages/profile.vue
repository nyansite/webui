<template>
    <div absolute w-full h-full top-12>
        <div class="profile">
            <div class="left">
                <div flex="~ col" gap-4>
                    <Avatar class="avatar" :image="userStore.avatar" title="修改头像" />
                    <Button label="修改个人信息" w-fit m="0 auto" severity="contrast" raised />
                </div>

            </div>
            <div class="right">
                <h1 font="bold size-7" mb-4>个人信息</h1>
                <div style="width: 80%; margin: 8px auto;">
                    <InputGroup>
                        <div mr-2 flex="~ items-center">用户名:</div>
                        <InputGroupAddon>
                            <i class="i-carbon-user"></i>
                        </InputGroupAddon>
                        <InputText disabled v-model="userStore.username" placeholder="用户名" v-tooltip.top="userStore.username"/>
                    </InputGroup>
                </div>
                <div style="width: 80%; margin: 8px auto;">
                    <InputGroup>
                        <div mr-2 flex="~ items-center">昵称:</div>
                        <InputGroupAddon>
                            <i class="i-icon-park-outline-edit-name"></i>
                        </InputGroupAddon>
                        <InputText disabled v-model="userStore.name" placeholder="昵称" v-tooltip.top="userStore.name"/>
                    </InputGroup>
                </div>
                <div style="width: 80%; margin: 8px auto;">
                    <InputGroup>
                        <div mr-2 flex="~ items-center">性别:</div>
                        <InputGroupAddon>
                            <i class="i-icon-park-outline-edit-name"></i>
                        </InputGroupAddon>
                        <InputText disabled v-model="userStore.gender" placeholder="性别" v-tooltip.top="userStore.gender"/>
                    </InputGroup>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
:deep(.p-avatar) {
    width: 180px;
    height: 180px;

    img {
        border-radius: 50%;
    }
}

.avatar {
    cursor: pointer;
    margin: 0 auto;
}

.profile {
    width: 80vw;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: row;

    .left {
        width: 30%;
        margin-top: 20px;
    }

    .right {
        width: 70%;
        margin-top: 20px;
    }
}
</style>
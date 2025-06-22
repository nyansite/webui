<template>
    <div class="login">
        <div class="login-form">
            <h1>登录</h1>
            <div p-inline-6>
                <Form v-slot="$form" flex justify-center flex-col gap-4 relative p-5>
                    <div flex flex-col gap-1>
                        <InputText name="username" type="text" placeholder="用户名" />
                        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
                            $form.username.error?.message }}</Message>
                    </div>
                    <div flex flex-col gap-1>
                        <InputText name="password" type="password" placeholder="密码" />
                        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
                            $form.password.error?.message }}</Message>
                    </div>
                    <Button type="submit" severity="success" label="登录" />
                </Form>
                <span>忘记密码？</span>
                <span float-end>注册账号</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.login {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/mayu.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.login-form {
    width: 30rem;
    height: 20rem;
    background-color: rgba(50, 50, 50, 0.8);
    border-radius: 10px;
}

h1 {
    font-size: 30px;
    width: fit-content;
    margin-top: 18px;
    margin-inline: auto;
}

span {
    cursor: pointer;
    &:hover {
        color: deeppink;
    }
}
</style>
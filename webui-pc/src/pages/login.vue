<script setup lang="ts">
import { loginUsernameValidate, passwordValidate, verifyAccount } from 'logic'
import { useToast } from 'primevue'

const toast = useToast()

function showToast(severity: string, summary: string, detail: string) {
  toast.add({
    severity,
    summary,
    detail,
    life: 3000,
  })
}

// 登录逻辑
const initialValue = reactive<Record<string, any>>({
  username: '',
  password: '',
})
function resolver({ values }: any) {
  let errors: Record<string, any> = {}

  // 用户名校验
  const usernameErrors = loginUsernameValidate(values.username, 'username')
  // 密码校验
  const passwordErrors = passwordValidate(values.password, 'password')

  errors = {
    ...usernameErrors,
    ...passwordErrors,
  }

  return { values, errors }
}

// 登录表单提交
async function onFormSubmit({ valid, states }: any) {
  const { username, password }: any = states
  if (valid) {
    // 校验用户是否已注册
    // 这个error是返回值的key，有点那啥，但是不是错误的意思
    const { data, status } = await verifyAccount(username.value)
    if (status !== 200) {
      showToast('error', '错误', `请求错误，错误码: ${status}`)
      return
    }

    if (data.error === undefined) {
      showToast('error', '错误', '请求错误，未获取到账号状态')
      return
    }
    else {
      switch (data.error) {
        case 0:
          // 用户未注册
          showToast('error', '错误', '用户尚未注册！')
          return
        case 1:
          showToast('error', '错误', '用户名和邮箱字段均不为空！')
          return
        case 2:
          // 用户已注册，继续登录流程
          break
        default:
          break
      }
    }

    // 登录流程
    console.log('登录')
  }
}
</script>

<template>
  <Toast position="top-right" />
  <div class="login">
    <div class="login-form">
      <h1>登录</h1>
      <div p-inline-6>
        <Form
          v-slot="$form" :initial-value :resolver flex justify-center flex-col gap-4 relative
          p-5 @submit="onFormSubmit"
        >
          <div flex flex-col gap-1>
            <span>用户名：</span>
            <InputText name="username" type="text" placeholder="用户名" />
            <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.username.error?.message }}
            </Message>
          </div>
          <div flex flex-col gap-1>
            <span>密码：</span>
            <InputText name="password" type="password" placeholder="密码" />
            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.password.error?.message }}
            </Message>
          </div>
          <Button w-30 m="0 auto" type="submit" severity="success" label="登录" />
        </Form>
        <span>忘记密码？</span>
        <span float-end @click="$router.push('/register')">注册账号</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/mayu.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.login-form {
  width: 30rem;
  height: fit-content;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding-bottom: 18px;
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

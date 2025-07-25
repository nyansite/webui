<script setup lang="ts">
import { emailValidate, loginUsernameValidate, passwordValidate, userLogin, verifyAccount } from 'logic'
import { useToast } from 'primevue'

const toast = useToast()
const loginMode = ref<string>('用户名登录') // 登录模式，默认为用户名登录
const loading = ref<boolean>(false)

watch(() => loginMode.value, (newMode) => {
  if(!['用户名登录', '邮箱登录'].includes(newMode)) {
    loginMode.value = '用户名登录' // 如果模式不在预设范围内，重置为默认
  }
})

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
  email: '',
  password: '',
})
function resolver({ values }: any) {
  let errors: Record<string, any> = {}

  // 用户名校验
  const usernameErrors = loginUsernameValidate(values.username, 'username')
  // 邮箱校验
  const emailErrors = emailValidate(values.email, 'email')
  // 密码校验
  const passwordErrors = passwordValidate(values.password, 'password')

  errors = {
    ...usernameErrors,
    ...emailErrors,
    ...passwordErrors,
  }

  return { values, errors }
}

// 登录表单提交
async function onFormSubmit({ valid, states }: any) {
  loading.value = true
  const { username, password, email }: any = states
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
    const { data: loginData, status: loginStatus } = await userLogin({
      username: username ? username.value : '',
      password: password.value,
      email: email ? email.value : '',
    })

    if (loginStatus !== 200) {
      showToast('error', '错误', `请求错误，错误码: ${loginStatus}`)
      return
    }

    switch(loginData.error) {
      case 0:
        // 登录成功
        showToast('success', '成功', '登录成功！')
        break
      case 1:
        showToast('error', '错误', '用户已登录！')
        break
      case 2:
        showToast('error', '错误', '用户名或email中有超过1个非空键')
        break
      case 3:
        showToast('error', '错误', '密码不正确！')
        break
      case 4:
        showToast('error', '错误', '用户名或邮箱未注册！')
        break
      default:
        showToast('error', '错误', '未知错误！')
    }

    loading.value = false
  }
}
</script>

<template>
  <Toast position="top-right" />
  <div class="login">
    <div class="login-form">
      <h1>登录</h1>

       <div m="0 auto" w-fit>
        <SelectButton size="small" :options="['用户名登录', '邮箱登录']" v-model="loginMode" />
      </div>

      <div p-inline-6>
        <Form
          v-slot="$form" :initial-value :resolver flex justify-center flex-col gap-4 relative
          p-5 @submit="onFormSubmit"
        >
          <div flex flex-col gap-1 v-if="loginMode === '用户名登录'">
            <span>用户名：</span>
            <InputText name="username" type="text" placeholder="用户名" />
            <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.username.error?.message }}
            </Message>
          </div>
           <div flex flex-col gap-1 v-else-if="loginMode === '邮箱登录'">
            <span>邮箱：</span>
            <InputText name="email" type="text" placeholder="邮箱" />
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.email.error?.message }}
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
          <Button w-30 m="0 auto" type="submit" severity="success" :loading="loading" label="登录" />
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

.dark .login-form {
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
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

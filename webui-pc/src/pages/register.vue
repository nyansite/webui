<script setup lang="ts">
import { emailValidate, passwordValidate, registerUsernameValidate, verifyAccount } from 'logic'
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

// 注册逻辑
const initialValue = reactive<Record<string, any>>({
  username: '',
  mail: '',
  passwd: '',
  code: '',
})
function resolver({ values }: any) {
  let errors: Record<string, any> = {}

  // 用户名校验
  const usernameErrors = registerUsernameValidate(values.username, 'username')
  // 邮箱校验
  const emailErrors = emailValidate(values.mail, 'mail')
  // 密码校验
  const passwordErrors = passwordValidate(values.passwd, 'passwd')

  errors = {
    ...usernameErrors,
    ...emailErrors,
    ...passwordErrors,
  }

  return { values, errors }
}

// 注册表单提交
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
          // 用户未注册，继续注册流程
          break
        case 1:
          showToast('error', '错误', '用户名和邮箱字段均不为空！')
          return
        case 2:
          // 用户已注册，阻止注册流程
          showToast('error', '错误', '该用户已经注册过啦！请直接去登录！')
          return
        default:
          break
      }
    }

    // 注册流程
    console.log('注册')
  }
}
</script>

<template>
  <Toast position="top-right" />
  <div class="register">
    <div class="register-form">
      <h1>注册</h1>
      <div p-inline-6>
        <Form
          v-slot="$form" :initial-value :resolver flex justify-center flex-col gap-4 relative
          p-5 @submit="onFormSubmit"
        >
          <div flex flex-col gap-1>
            <InputText name="username" type="text" placeholder="用户名" />
            <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.username.error?.message }}
            </Message>
          </div>
          <div flex flex-col gap-1>
            <InputText name="mail" type="text" placeholder="邮箱" />
            <Message v-if="$form.mail?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.mail.error?.message }}
            </Message>
          </div>
          <div flex flex-col gap-1>
            <InputText name="passwd" type="password" placeholder="密码" />
            <Message v-if="$form.passwd?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.passwd.error?.message }}
            </Message>
          </div>

          <Button w-30 m="0 auto" type="submit" severity="success" label="注册" />
        </Form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register {
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

.register-form {
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

<script setup lang="ts">
import { emailValidate, passwordValidate, registerUsernameValidate, verifyAccount } from 'logic'
import { useToast } from 'primevue'

const toast = useToast()

// 切换用户名注册还是邮箱注册
const registerMode = ref<string>("用户名注册")

function showToast(severity: string, summary: string, detail: string) {
  toast.add({
    severity,
    summary,
    detail,
    life: 3000,
  })
}

// 用户名注册 表单初始化
const usernameModeInitialValue = reactive<Record<string, any>>({
  username: '',
  passwd: '',
})

// 邮箱注册 表单初始化
const emailModeInitialValue = reactive<Record<string, any>>({
  mail: '',
  passwd: '',
  code: ''
})

// 用户名注册 表单校验
function usernameModeResolver({ values }: any) {
  let errors: Record<string, any> = {}

  // 用户名校验
  const usernameErrors = registerUsernameValidate(values.username, 'username')
  // 密码校验
  const passwordErrors = passwordValidate(values.passwd, 'passwd')

  errors = {
    ...usernameErrors,
    ...passwordErrors,
  }

  return { values, errors }
}

// 邮箱注册 表单校验
function emailModeResolver({ values }: any) {
  let errors: Record<string, any> = {}

  // 邮箱校验
  const emailErrors = emailValidate(values.mail, 'mail')
  // 密码校验
  const passwordErrors = passwordValidate(values.passwd, 'passwd')

  errors = {
    ...emailErrors,
    ...passwordErrors,
  }

  return { values, errors }
}

// 用户名注册 表单提交
async function usernameModeFormSubmit({ valid, states }: any) {
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



// 邮箱注册 表单提交
async function emailModeFormSubmit({ valid, states }: any) {
  const { mail, passwd }: any = states
  if (valid) {
    // 校验用户是否已注册
    // 这个error是返回值的key，有点那啥，但是不是错误的意思
    const { data, status } = await verifyAccount(mail.value)
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

      <div pb-2 />

      <div m="0 auto" w-fit>
        <SelectButton size="small" :options="['用户名注册', '邮箱注册']" v-model="registerMode" />
      </div>

      <!-- 用户名注册，表单 -->
      <div p-inline-6 v-if="registerMode === '用户名注册'">
        <Form v-slot="$form" :initial-value="usernameModeInitialValue" :resolver="usernameModeResolver" flex
          justify-center flex-col gap-4 relative p-5 @submit="usernameModeFormSubmit">
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
            <InputText name="passwd" type="password" placeholder="密码" />
            <Message v-if="$form.passwd?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.passwd.error?.message }}
            </Message>
          </div>

          <Button w-30 m="0 auto" type="submit" severity="success" label="注册" />
        </Form>
      </div>

      <!-- 邮箱注册，表单 -->
      <div p-inline-6 v-else-if="registerMode === '邮箱注册'">
        <Form v-slot="$form" :initial-value="emailModeInitialValue" :resolver="emailModeResolver" flex justify-center
          flex-col gap-4 relative p-5 @submit="emailModeFormSubmit">
          <div flex flex-col gap-1>
            <span>邮箱：</span>
            <InputText name="mail" type="text" placeholder="邮箱" />
            <Message v-if="$form.mail?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.mail.error?.message }}
            </Message>
          </div>
          <div flex flex-col gap-1>
            <span>密码：</span>
            <InputText name="passwd" type="password" placeholder="密码" />
            <Message v-if="$form.passwd?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.passwd.error?.message }}
            </Message>
          </div>
          <div flex flex-col gap-1>
            <span>验证码：</span>
            <InputText name="code" type="text" placeholder="验证码" />
            <Message v-if="$form.code?.invalid" severity="error" size="small" variant="simple">
              {{
                $form.code.error?.message }}
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

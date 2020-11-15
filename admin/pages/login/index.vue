<template>
  <div class="login w-screen flex justify-center items-center">
    <div v-if="isSignin">
      <p>{{ $t('login.title') }}</p>
      <InputText v-model="loginModel.email" class="my-2" :placeholder="$t('login.email')" />
      <InputText v-model="loginModel.password" type="password" class="my-2" :placeholder="$t('login.password')" />
      <div class="flex justify-end">
        <Btn icon-btn :label="$t('general.send')" @click="handleLogin" />
      </div>
      <div>
        <p>{{ $t('login.forgotten-password') }}</p>
        <Btn icon-btn :label="$t('login-go-to-reset')" @click="goToResetPassword" />
      </div>
    </div>

    <div v-if="isResetPasswordRequest">
      <p>{{ $t('reset_password.title') }}</p>
      <InputText v-model="resetPasswordRequestModel.email" class="my-2" :placeholder="$t('login.email')" />
      <InputText v-model="resetPasswordRequestModel.password" class="my-2" :placeholder="$t('login.password')" />
      <div class="flex justify-end">
        <Btn icon-btn :label="$t('general.send')" @click="handleResetPasswordRequest" />
      </div>
      <div>
        <p>{{ $t('login.back-to-login') }}</p>
        <Btn icon-btn :label="$t('login.back-to-login')" @click="goToLogin" />
      </div>
    </div>

    <div v-if="isResetPasswordChange">
      <p>{{ $t('reset_password.title') }}</p>
      <InputText v-model="resetPasswordChangeModel.email" class="my-2" :placeholder="$t('login.email')" />
      <InputText
        v-model="resetPasswordChangeModel.passsword"
        type="password"
        class="my-2"
        :placeholder="$t('login.password')"
      />
      <InputText
        v-model="resetPasswordChangeModel.confirmPassword"
        type="password"
        class="my-2"
        :placeholder="$t('login.confirmPassword')"
      />
      <div class="flex justify-end">
        <Btn icon-btn :label="$t('general.send')" @click="handleResetPasswordChange" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      isSignin: true,
      isResetPasswordRequest: false,
      isResetPasswordChange: false,
      loginModel: {
        email: '',
        password: ''
      },
      resetPasswordRequestModel: {
        email: '',
        password: ''
      },
      resetPasswordChangeModel: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    ...mapMutations('auth', ['setUser', 'setIsLogged', 'setToken']),
    goToResetPassword() {
      this.isSignin = false
      this.isResetPasswordRequest = true
    },
    goToLogin() {
      this.isSignin = true
      this.isResetPasswordRequest = false
    },
    saveToken(token) {
      this.setToken(token)
      const { email, role } = JSON.parse(atob(token.split('.')[1]))
      const userInfo = {
        email,
        role,
        token
      }
      if (window.localStorage.getItem('user')) {
        window.localStorage.removeItem('user')
      }
      window.localStorage.setItem('user', JSON.stringify(userInfo))
    },
    async handleLogin() {
      try {
        const res = await this.$axios.post('/api/users/signin', {
          ...this.loginModel
        })
        if (res.status === 200 && res.data.status === 200) {
          this.saveToken(res.data.token)
          this.$toast.success('You are correctly logged in!')
          this.$router.push('/')
        } else {
          this.$toast.error('Your credentials are wrong, try again!')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error)
        this.$toast.error('Ops! There is a problem!')
      } finally {
        this.loginModel = {
          email: '',
          password: ''
        }
      }
    },
    generateToken() {
      const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
      let token = ''
      for (let i = 0; i <= 12; i++) {
        const randomNumber = Math.floor(Math.random() * 62)
        token += characters[randomNumber]
      }
      return token
    },
    async handleResetPasswordRequest() {
      try {
        await this.$axios.post(`/api/users/reset-password`, {
          ...this.resetPasswordRequestModel,
          token: this.generateToken()
        })
        this.$toast.success('login.password-request.success')
      } catch (error) {
        this.$toast.error('login.password-request.error')
        console.warn(error)
      }
    },
    async handleResetPasswordhange() {}
  }
}
</script>

<style lang="scss">
.login {
  height: calc(100vh - 72px);
}
</style>

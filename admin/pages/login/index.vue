<template>
  <div class="login w-screen flex justify-center items-center">
    <div>
      <p>{{ $t('login.title') }}</p>
      <InputText v-model="loginModel.email" class="my-2" :placeholder="$t('login.email')" />
      <InputText v-model="loginModel.password" type="password" class="my-2" :placeholder="$t('login.password')" />
      <div class="flex justify-end">
        <Btn icon-btn @click="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      loginModel: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations('auth', ['setUser', 'setIsLogged', 'setToken']),
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
    }
  }
}
</script>

<style lang="scss">
.login {
  height: calc(100vh - 72px);
}
</style>

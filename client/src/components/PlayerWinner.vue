<template>
  <div class="container">
    <h1>
      {{ getUserName }} is the Winner
    </h1>
    <button @click="goToLogin" class="btn btn-primary btn-block">
      Back to Login
    </button>
  </div>
</template>

<script>
export default {
  name: 'PlayerWinner',
  computed: {
    getUserName() {
      return this.$route.params.username
    }
  },
  methods: {
    goToLogin() {
      localStorage.removeItem('username')
      this.$router.push({ name: 'Login' })
      this.$socket.emit('resetUser')
    }
  },
}
</script>

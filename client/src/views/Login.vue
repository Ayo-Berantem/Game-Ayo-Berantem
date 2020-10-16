<template>
  <div class="loginContainer rounded">
    <div id="loginPlayer">
      <img src="../assets/berantem.png" alt="" />
      <h1>Hit Your Enemy</h1>
      <p>Login Here</p>
      <form @submit.prevent="submitUsername">
        <input
          v-model="username"
          type="text"
          placeholder="Insert Username"
        /><br />
        <button class="btn btn-warning" type="submit">Login Player</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    submitUsername () {
      const payload = {
        username: this.username,
        health: 100
      }
      this.$socket.emit('userConnect', payload)
      localStorage.setItem('username', this.username)
      this.$router.push({ name: "Board" })
    }
  }
}
</script>

<style>
.loginContainer {
  width: 45%;
  background-color: brown;
  font-family: cursive;
  margin: auto;
  color: antiquewhite;
  padding-bottom: 20px;
}

#loginPlayer img {
  margin-bottom: -30px;
}

#loginPlayer h1 {
  margin-bottom: 20px;
  font-family: fantasy;
  font-size: 48px;
}

#loginPlayer p {
  margin-bottom: 5px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 30px;
}

#loginPlayer input {
  width: 35%;
  margin-bottom: 5px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 24px;
}

#loginPlayer button {
  width: 25%;
  margin-bottom: 5px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 24px;
}
</style>

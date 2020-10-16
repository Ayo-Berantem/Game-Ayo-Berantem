<template v-on:keyup.space="damage">
  <div class="container-fluid">
    <div class="row">
      <div class="col-1">

        <h3 class="text-center pt-3">{{ users[0].health }} %</h3>
        <div class="health-bar" style="left: -200px;">
          <div class="progress">
            <div
              :class="`progress-bar bg-${getStatus(users[0].health)} rounded`"
              role="progressbar"
              :style="`width: ${users[0].health}%;`"
              :aria-valuenow="users[0].health"
              aria-valuemin="0"
              aria-valuemax="100"

            ></div>
          </div>
        </div>

      </div>

      <div class="col-10">
        <div class="container-fluid">
          <div class="row">

            <div class="col-4 text-center">
              <h1>
                {{ users[0].username }}
              </h1>

              <img src="../assets/logo.png" alt="profile" class="rounded img-thumbnail my-5">

              <button
                class="btn btn-outline-info btn-lg btn-block"
              >
                Space
              </button>
            </div>
            <div class="col-4 text-center">
              <h1>
                <strong>
                  VS
                </strong>
              </h1>
            </div>
            <div class="col-4 text-center">
              <h1 v-if="users[1]">
                {{ users[1].username }}
              </h1>

              <img src="../assets/logo.png" alt="profile" class="rounded img-thumbnail my-5">

              <button
                :class="`btn btn-outline-info btn-lg btn-block ${isPressed && 'active'}`"
              >
                Space
              </button>
            </div>

          </div>
        </div>
      </div>

      <div v-if="users[1]" class="col-1">

        <h3 class="text-center pt-3">{{ users[1].health }} %</h3>
        <div class="health-bar" style="right: -200px;">
          <div class="progress">
            <div
              :class="`progress-bar bg-${getStatus(users[1].health)} rounded`"
              role="progressbar"
              :style="`width: ${users[1].health}%;`"
              :aria-valuenow="users[1].health"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data () {
    return {
      isPressed: false,
      username: '',
      users: [{username: '', health: 100}, {username: '', health: 100}]
    }
  },
  created () {
    this.username = localStorage.getItem('username')
    const payload = {
        username: this.username,
        health: 100
      }
    this.$socket.emit('userConnect', payload)
    window.addEventListener('keydown', e => {
      e.preventDefault()

      if (!this.isPressed) {
        console.log(e.keyCode)
        if (e.keyCode === 32) {
          this.hit()
        }
      }
    })

    window.addEventListener('keyup', e => {
      e.preventDefault()
      if (e.keyCode === 32) {
        this.isPressed = false
      }
    })
  },
  methods: {
    getStatus (number) {
      if (number > 40) {
        return 'success'
      }

      if (number > 15) {
        return 'warning'
      }

      return 'danger'
    },
    hit (payload) {
      this.isPressed = true
      console.log(this.username)
      console.log(this.users)
      let temp = this.users.filter(el => {
        return el.username == this.username
      })
      this.$socket.emit('sendHealth', temp[0])
    }
  },
  sockets: {
    userConnect (data) {
      this.users = data
    },
    sendHealth (data) {
      console.log(data, '<<<<<MASUK DARI SENDHEALTH BOARDVUEEEEEEEEEEEE>>>>>')
      this.users = data
    }
  }
}
</script>

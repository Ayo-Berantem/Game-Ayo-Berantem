<template v-on:keyup.space="damage">
  <div class="container-fluid">
    <div class="row">
      <div class="col-1">

        <h3 class="text-center pt-3">{{ players.playerA.health }} %</h3>
        <div class="health-bar" style="left: -200px;">
          <div class="progress">
            <div
              :class="`progress-bar bg-${getStatus(players.playerA.health)} rounded`"
              role="progressbar"
              :style="`width: ${players.playerA.health}%;`"
              :aria-valuenow="players.playerA.health"
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
                {{ playerA.name }}
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
              <h1>
                {{ playerB.name }}
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

      <div class="col-1">

        <h3 class="text-center pt-3">{{ health }} %</h3>
        <div class="health-bar" style="right: -200px;">
          <div class="progress">
            <div
              :class="`progress-bar bg-${getStatus(health)} rounded`"
              role="progressbar"
              :style="`width: ${health}%;`"
              :aria-valuenow="health"
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
      health: null,
      playerA: null,
      playerB: null
    }
  },
  computed: {
    status () {
      const { playerA } = this.players
      return {
        playerA: this.getStatus(playerA.health),
        playerB: this.getStatus(this.health)
      }
    },
    players () {
      return {
        playerA: {
          name: 'Arnold',
          health: 70
        },
        playerB: {
          name: 'Rian',
          health: 100
        }
      }
    }
  },
  created () {
    window.addEventListener('keydown', e => {
      e.preventDefault()

      if (!this.isPressed) {
        this.isPressed = true

        if (e.keyCode === 32) {
          this.hit()
        }
      }
    })

    window.addEventListener('keyup', e => {
      e.preventDefault()

      this.isPressed = false
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
    hit () {
      this.isPressed = true
      setTimeout(() => {
        this.isPressed = false
      }, 500)
      this.$socket.emit('sendHealth')
    }
  },
  sockets: {
    userConnect (data) {
      this.playerA = {
        name: data.users[0].name,
        health: data.health
      },
      this.playerB = {
        name: data.users[1].name,
        health: data.health
      }
    },
    sendHealth (data) {
      this.health = data
    }
  }
}
</script>

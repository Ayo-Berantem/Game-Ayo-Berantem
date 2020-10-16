<template>
  <div class="w-100 h-100">
    <PlayersBoard v-if="!isRoomFull"></PlayersBoard>
    <RoomFull v-else></RoomFull>
  </div>
</template>

<script>
import PlayersBoard from '@/components/PlayersBoard'
import RoomFull from '@/components/RoomFull'

export default {
  components: {
    PlayersBoard,
    RoomFull
  },
  computed: {
    isRoomFull () {
      return this.$store.state.isRoomFull
    }
  }
}
</script>

<style>

</style>

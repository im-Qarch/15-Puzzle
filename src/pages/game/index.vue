<script setup lang="ts">
const router = useRouter()
const puzzles = ref([Math.random()])
//
const newBoard = () => {
  puzzles.value.push(Math.random() as never)
}
const removePuzzle = (uuid: never) => {
  puzzles.value = puzzles.value.filter(p => p !== uuid)
}
</script>

<template>
  <Puzzle v-for="(puzzle) in puzzles" :key="puzzle" :uuid="puzzle" @close="removePuzzle" />
  <!-- Actions -->
  <div mt-8 flex justify-center gap-3 flex-wrap items-center>
    <button
      btn btn-primary
      @click="newBoard"
    >
      Add New Board
    </button>
    <button
      btn btn-danger
      @click="router.push('/')"
    >
      Close The Game
    </button>
  </div>
</template>

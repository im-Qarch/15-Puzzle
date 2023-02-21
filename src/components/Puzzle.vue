<script setup lang="ts">
// Props
const props = defineProps({
  uuid: {
    type: Number,
  },
})
// Emits
const emit = defineEmits<{
  (e: 'close', uuid: never): void
}>()
// Data
const m_grid = ref(4)
const n_grid = ref(4)
const tile_size = ref(2)
const tiles = ref([])
//
const PUZZLE = ref(usePuzzle(m_grid.value * n_grid.value, n_grid.value))
const start = () => tiles.value = PUZZLE.value.initial()
//
const getSize = () => {
  if (tile_size.value === 1)
    return '!w-10 !h-10'
  if (tile_size.value === 2)
    return '!w-16 !h-16'
  if (tile_size.value === 3)
    return '!w-24 !h-24'
  if (tile_size.value === 4)
    return '!w-32 !h-32'
}
// Hooks
watch(
  () => [m_grid.value, n_grid.value],
  () => {
    // Can not create puzzle more than 30x30
    if (m_grid.value && n_grid.value) {
      if (m_grid.value > 30)
        m_grid.value = 30
      if (n_grid.value > 30)
        n_grid.value = 30
      //
      PUZZLE.value = usePuzzle(m_grid.value * n_grid.value, n_grid.value)
      start()
    }
  },
  { deep: true },
)
onBeforeMount(() => {
  start()
})
</script>

<template>
  <div flex flex-col justify-center items-center mt-8 border p-6 shadow-lg :class="{ 'bg-purple-200': PUZZLE.solved() }">
    <!-- Win Message -->
    <div v-if="PUZZLE.solved()" font-bold text-xl p-4 bg-purple-500 rounded text-white mb-4 class="shake">
      You WIN Buddy, and You are going to be Crazy about this alert
    </div>

    <!-- PUZZLE -->
    <TransitionGroup tag="div" grid w-max max-w-full gap-0.5 class="tiles_grid" name="tile">
      <div
        v-for="(tile, i) in tiles" :key="tile"
        flex items-center justify-center border dark:border-gray-700
        class="tile"
        :class="[getSize(), { 'cursor-pointer': tile && !PUZZLE.solved() }, { 'bg-gray-100 dark:bg-gray-800': !tile }, { 'bg-sky-100 dark:bg-sky-900 border-sky-500': PUZZLE.currectTile(tile, i) }]"
        @click="tile && !PUZZLE.solved() ? PUZZLE.swapTile(i) : ''"
      >
        <span
          v-if="tile"
          text-3xl font-bold text-gray-500 dark:text-gray-400 select-none
        >
          {{ tile }}
        </span>
      </div>
    </TransitionGroup>

    <!-- Actions -->
    <div mt-4 flex justify-center gap-3 flex-wrap items-center>
      <!-- Size -->
      <div flex items-center gap-2 w-36>
        <input v-model="m_grid" input-n type="number" placeholder="X">
        x
        <input v-model="n_grid" input-n type="number" placeholder="Y">
      </div>
      <!-- Reset -->
      <button
        btn btn-primary
        i-carbon:reset
        @click="start"
      />
      <!-- Delete -->
      <button
        btn-icon btn-danger
        i-carbon:trash-can
        @click="emit('close', props.uuid as never)"
      />
      <!-- Tile Size -->
      <select id="tile" v-model="tile_size" select-n w-max>
        <option :value="1">
          Small
        </option>
        <option :value="2">
          Medium
        </option>
        <option :value="3">
          large
        </option>
        <option :value="4">
          XLarge
        </option>
      </select>
    </div>
  </div>
</template>

<style>
/* Tiles Grid  */
.tiles_grid {
  grid-template-columns: repeat(v-bind(n_grid), minmax(0, 1fr));
  grid-template-rows: repeat(v-bind(m_grid), minmax(0, 1fr));
}
</style>

<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div flex flex-col justify-center items-center>
    <div i-carbon:game-console text-6xl inline-block />
    <p pb-8>
      <em text-sm op75>15 Puzzle Game</em>
    </p>
    <button btn btn-primary @click="$router.push(`/game`)">
      Start
    </button>
  </div>
</template>

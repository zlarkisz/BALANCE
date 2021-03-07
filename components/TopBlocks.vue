<template>
  <section class="top-blocks">
    <FallingBlocks
      v-for="(b, i) in fallingBlocks"
      :key="b.id"
      :block="b"
      :startTime="startTime"
      :index="i"
      @endFall="endFall"
    />
  </section>
</template>

<script>
  import FallingBlock from './FallingBlock'

  export default {
    name: 'TopBlocks'
  }
</script>

<style>

</style>

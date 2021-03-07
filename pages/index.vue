<template>
  <section class="teeter-totter">
    <div class="teeter-totter__wrap container">
      <BaseTitle
        :title="title"
        class="teeter-totter__title"
      />

      <div class="teeter-totter__actions">
        <FallingBlocks
          v-for="(block, index) in fallingBlocks"
          :key="block.id"
          :block="block"
          :index="index"
          :startTime="startTime"
          @end-falling="endFall"
        />

        <RockerArm />

        <BaseButton
          class="teeter-totter__action-btn"
          @click.native="changeGameStatus"
        />
      </div>
    </div>

    <GameOver />
  </section>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import BaseTitle from '~/components/base/BaseTitle'
  import BaseButton from '~/components/base/BaseButton'
  import RockerArm from '~/components/RockerArm'
  import FallingBlocks from '~/components/FallingBlocks'
  import GameOver from '~/components/GameOver'


  export default {
    name: 'TeeterTotter',

    components: {
      BaseTitle,
      BaseButton,
      RockerArm,
      FallingBlocks,
      GameOver
    },

    data () {
      return {
        title: 'teeter-totter',
        isPlay: true,
        startTime: 300,
        counterIndex: 0,
        counterRise: 5,
        counterReduction: 50
      }
    },

    computed: {
      ...mapState({
        gameStatus: state => state.gameStatus,
        fallingBlocks: state => state.fallingBlocks
      })
    },

    mounted () {
      this.CREATE_FALLING_BLOCK()
      window.addEventListener('keydown', this.onKeyDown)
    },

    beforeDestroy () {
      window.removeEventListener('keydown', this.onKeyDown)
    },

    methods: {
      ...mapMutations([
        'SET_GAME_STATUS',
        'CREATE_FALLING_BLOCK',
        'MOVE_LEFT',
        'MOVE_RIGHT'
      ]),

      changeGameStatus () {
        this.isPlay = !this.isPlay
        this.SET_GAME_STATUS(this.isPlay)
      },

      onKeyDown (ev) {
        if (ev.keyCode === 37) this.MOVE_LEFT()
        if (ev.keyCode === 39) this.MOVE_RIGHT()
      },

      endFall () {
        this.counterIndex++

        if (this.counterIndex === this.counterRise) {
          this.startTime -= this.counterReduction
          this.counterIndex = 0
        }
      }
    }
  }
</script>

<style lang="scss">
.teeter-totter {
  position: relative;
  overflow: hidden;

  .container {
    display: flex;
    flex-flow: column;
    width: 1000px;
    height: 100vh;
    margin: 0 auto;
    text-align: center;
  }

  &__title {
    display: block;
    margin: 0 auto;
    font-family:
      'Quicksand',
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    font-size: 100px;
    font-weight: 700;
    color: #35495e;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__actions {
    position: relative;
    display: flex;
    flex-flow: column;
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    text-align: center;
  }

  &__action-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 160px;
    height: 160px;
  }
}
</style>

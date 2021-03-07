<template>
  <section class="falling-blocks">
    <div class="falling-blocks__play">
      {{ isPlay }}
    </div>

    <RandomBlock
      ref="randomBlock"
      :block="block"
      :top="blockTopPosition"
    />
  </section>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  import RandomBlock from './RandomBlock.vue'

  export default {
    name: 'FallingBlocks',

    components: {
      RandomBlock
    },

    props: {
      block: {
        type: Object,
        required: true
      },

      index: Number,
      startTime: Number
    },

    data () {
      return {
        topHeight: this.block.blockH,
        blockBottomPosition: 0,
        defaultStep: 20,
        newState: 0,
        timer: 0
      }
    },

    computed: {
      ...mapGetters(['shoulderRot']),

      blockTopPosition: {
        get () {
          return this.topHeight
        },

        set (newTopPos) {
          this.topHeight = newTopPos
        }
      },

      blockFinalPosition () {
        const { top, bottom } = this.getShoulderPosition()
        const percentageShift = (1 - this.block.area / 5) * ((bottom - top) / 2)

        return this.shoulderRot >= 0
          ? top + percentageShift
          : bottom - percentageShift
      },

      ...mapState({
        isPlay: state => state.gameStatus
      })
    },

    async mounted () {
      await this.$nextTick()
      this.showBlock()
    },

    updated () {
      // react to changing game status

      if (this.isPlay) return clearTimeout(this.timer)
      if (this.index !== 0) return

      this.blockBottomPosition = this.$refs.randomBlock.calcBlockPosition()

      this.timer = setTimeout(() => {
        if (this.blockBottomPosition >= this.blockFinalPosition - this.defaultStep) {
          this.blockTopPosition = 0
          this.$emit('end-falling')
          clearTimeout(this.timer)
          this.finish()
        }

        this.riseBlockTopPosition()
      }, this.startTime)
    },

    methods: {
      showBlock () {
        const tl = gsap.timeline()

        tl.fromTo(document.querySelector('.falling-blocks'),
                  {
                    opacity: 0
                  },
                  {
                    opacity: 1,
                    duration: 0.5,
                    delay: 4.5
                  }
        )
      },

      ...mapActions({ finish: 'FINISH_FALLING' }),

      getShoulderPosition () {
        const { top, bottom } = document.querySelector('.shoulder-force').getBoundingClientRect()

        return {
          top, bottom
        }
      },

      riseBlockTopPosition () {
        this.blockTopPosition += this.defaultStep
      }
    }
  }
</script>

<style lang="scss" scoped>
.falling-blocks {
  &__play {
    opacity: 0;
  }
}
</style>

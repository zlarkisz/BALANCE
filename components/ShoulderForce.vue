<template>
  <div
    ref="shoulder"
    class="shoulder-force"
  >
    <RandomBlock
      v-for="b in fallenBlocks"
      :key="b.id"
      :block="b"
    />

    <RandomBlock
      v-for="b in emergingBlocks"
      :key="b.id"
      :block="b"
      diraction
    />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'

  import RandomBlock from './RandomBlock.vue'

  export default {
    name: 'ShouderForce',

    components: { RandomBlock },

    data () {
      return {
        isFirstRotate: false
      }
    },

    computed: {
      ...mapState({
        fallenBlocks: state => state.fallenBlocks,
        emergingBlocks: state => state.emergingBlocks
      }),

      ...mapGetters(['shoulderRot']),

      rotateShoulder () {
        return {
          transform: `rotate(${this.shoulderRot / 2}deg)`
        }
      }
    },

    watch: {
      shoulderRot (v) {
        if (v && this.isFirstRotate) {
          this.rotateShoulred()
        }
      }
    },

    mounted () {
      this.GENERATE_BLOCK()
      this.showShoulder()
    },

    methods: {
      ...mapMutations(['GENERATE_BLOCK']),

      showShoulder () {
        gsap.timeline()
          .fromTo(this.$refs.shoulder,
                  {
                    x: '-100%',
                    opacity: 0
                  },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    delay: 3,
                    onComplete: () => { this.rotateShoulred(); this.isFirstRotate = true }
                  }
          )
      },

      rotateShoulred () {
        gsap.timeline()
          .to(this.$refs.shoulder,
              {
                rotate: this.shoulderRot / 2,
                delay: 0.3
              })
      }
    }
  }
</script>

<style lang="scss">
    .shoulder-force {
      position: relative;
      width: 100%;
      height: 8px;
      background-color: rgb(53, 73, 94);
    }
</style>

<template>
  <div
    ref="gameOver"
    class="game-over"
  >
    <div
      ref="title"
      class="game-over__title"
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import SplitText from '~/assets/js/vendors/gsap/plugins/SplitText'

  export default {
    name: 'GameOver',

    data: () => ({
      title: 'Game Over'
    }),

    computed: {
      ...mapState({
        isGameOver: state => state.gameOver
      })
    },

    watch: {
      isGameOver: {
        handler (v) {
          if (v === true) { this.showGameOver() }
        },
        immediate: true
      }
    },

    methods: {
      showGameOver () {
        const tl = gsap.timeline()
        const text = this.$refs.title
        const split = new SplitText(text, { type: 'chars', position: 'absolute' })

        tl.set(text, { autoAlpha: 1 })
        tl.set(this.$refs.gameOver, { zIndex: 1 })

        tl.fromTo(this.$refs.gameOver,
                  {
                    opacity: 0
                  },
                  {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power1'
                  }
        )

        for (let i = 0; i < split.chars.length; i++) {
          tl.fromTo(split.chars[i], 2.4,
                    {
                      transformOrigin: 'center -160px',
                      z: 0.1,
                      rotation: ((Math.random() < 0.5) ? 90 : -90)
                    },
                    {
                      rotation: 0,
                      ease: 'elastic.out(1, 0.3)'
                    }, 0.3 + i * 0.06)
          tl.to(split.chars[i], 0.6,
                {
                  y: 96,
                  ease: 'bounce.out'
                }, 3.4 + Math.random() * 0.6)
          tl.to(split.chars[i], 0.6,
                {
                  autoAlpha: 0,
                  ease: 'power1.inOut',
                  onComplete: () => { this.$router.go() }
                }, 4.5 + Math.random())
        }
      }
    }
  }
</script>

<style lang="scss">
.game-over {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-size: 52px;
  font-weight: 700;
  background-color: black;
  opacity: 0;

  &__title {
    width: 100%;
    color: crimson;
    text-align: center;
  }
}
</style>

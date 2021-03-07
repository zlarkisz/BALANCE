<template>
  <div
    ref="btn"
    class="base-button"
  >
    <div class="base-button__background-placeholder">
      <button
        :class="[
          'base-button__play-pause',
          { 'base-button__play-pause_play': !gameStatus}
        ]"
      />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'BaseButton',

    computed: {
      ...mapState({
        gameStatus: state => state.gameStatus
      })
    },

    mounted () {
      this.showBtn()
    },

    methods: {
      showBtn () {
        const tl = gsap.timeline()

        tl.fromTo(this.$refs.btn, {
                    scale: 0
                  },
                  {
                    scale: 1,
                    delay: 3,
                    duration: 2.7,
                    ease: 'bounce.in'
                  })
      }
    }
  }
</script>

<style lang="scss">
.base-button {
  &__background-placeholder {
    width: 100%;
    height: 100%;
    background-color: white;
  }

  &__play-pause {
    position: relative;
    width: 5em;
    height: 5em;
    font-size: 2em;
    cursor: pointer;
    background: rgb(53, 73, 94);
    border: none;
    -moz-border-radius: 5em;
    -webkit-border-radius: 5em;
    border-radius: 5em;
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

    &:focus {
      outline: none;
    }

    &::before {
      position: absolute;
      top: 1.5em;
      left: 1.67em;
      height: 0;
      content: "";
      border-color: transparent transparent transparent #e52d27;
      border-style: solid;
      border-width: 1em 0 1em 2em;
      transition: 0.218s ease;
    }

    &::after {
      position: absolute;
      top: 1.5em;
      left: 2.42em;
      width: 0;
      height: 2em;
      content: "";
      background: inherit;
      transition: 0.218s ease;
    }

    &_play {
      &::before {
        height: 2em;
        border-width: 0 0 0 2em;
      }

      &::after {
        width: 0.5em;
      }
    }
  }
}
</style>

<template>
  <div class="rocker-arm">
    <div class="rocker-arm__wrap">
      <ShoulderForce />

      <div
        ref="triangle"
        class="rocker-arm__triangle"
      />
    </div>
  </div>
</template>

<script>
  import ShoulderForce from './ShoulderForce'

  export default {
    name: 'RockerArm',

    components: {
      ShoulderForce
    },

    mounted () {
      this.showHeart()
    },

    methods: {
      showHeart () {
        const tl = gsap.timeline()

        tl.fromTo(this.$refs.triangle, {
                    opacity: 0,
                    y: 100
                  },
                  {
                    opacity: 1,
                    y: 0,
                    delay: 2,
                    duration: 0.5,
                    ease: 'sine.inOut'
                  }
        )
      }
    }
  }
</script>

<style lang="scss">
.rocker-arm {
  position: relative;
  margin-top: auto;
  margin-bottom: 60px;

  &__wrap {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  &__triangle {
    position: relative;
    width: 100px;
    height: 90px;
    margin-top: -10px;
    transform: rotate(180deg);
  }

  &__triangle::before,
  &__triangle::after {
    position: absolute;
    top: 0;
    left: 50px;
    width: 50px;
    height: 80px;
    content: "";
    background: rgb(229, 45, 39);
    border-radius: 50px 50px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
  }

  &__triangle::after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }
}
</style>

<template>
  <h1 ref="title">
    {{ title }}
  </h1>
</template>

<script>
  import SplitText from '~/assets/js/vendors/gsap/plugins/SplitText'

  export default {
    name: 'BaseTitle',

    props: {
      title: {
        type: String,
        default: ''
      }
    },

    mounted () {
      this.showTitle()
    },

    methods: {
      showTitle () {
        const tl = gsap.timeline()
        const mySplitText = new SplitText(this.$refs.title, { type: 'chars' })
        const chars = mySplitText.chars

        gsap.set(this.$refs.title, { perspective: 400 })

        tl.from(chars,
                {
                  duration: 0.8,
                  delay: 1,
                  opacity: 0,
                  scale: 0,
                  y: 80,
                  rotationX: 180,
                  transformOrigin: '0% 50% -50',
                  ease: 'back',
                  stagger: 0.01
                }, '+=0')
      }
    }
  }
</script>

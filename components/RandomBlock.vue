<template>
  <div
    ref="randomBlock"
    :class="[
      'random-block',
      `random-block__${blockType}`
    ]"
    :style="styles"
  >
    {{ block.blockW }}
  </div>
</template>

<script>
  import blockStylesMixin from '../mixins/block-styles'

  export default {
    name: 'RandomBlock',

    mixins: [blockStylesMixin],

    data () {
      return {
        blocksFigures: ['circle', 'rectangle', 'triangle']
      }
    },

    computed: {
      blockType () {
        let blockName

        this.blocksFigures.forEach(b => {
          if (this.blocksFigures.indexOf(b) === this.block.blockType) {
            blockName = b
          }
        })

        return blockName
      }
    },

    methods: {
      calcBlockPosition () {
        return this.$refs.randomBlock.getBoundingClientRect().bottom
      }
    }
  }
</script>

<style lang="scss">
.random-block {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font:
    700 16px/16px
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  color: white;
  text-align: center;
  transform: translate(-50%, -100%);

  &__circle {
    background-color: rgb(138, 43, 226);
    border-radius: 50%;
  }

  &__triangle {
    width: 0;
    height: 0;
    line-height: 4rem;
    color: darkblue;
    border-color: transparent transparent rgb(255, 20, 147)  transparent;
    border-style: solid;
  }

  &__rectangle {
    background-color: crimson;
  }
}
</style>

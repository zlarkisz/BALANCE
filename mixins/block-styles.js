export default {
  props: {
    block: {
      type: Object,
      default: () => ({})
    },

    top: {
      type: Number,
      default: 0
    },

    diraction: Boolean
  },

  computed: {
    styles () {
      const { area, blockType, blockH } = this.block
      const { diraction, roundValue, top } = this

      const leftShift = diraction
        ? 50 + area * 10
        : 50 - area * 10
      const topShift = top
      const computedBlockH = blockType !== 2
        ? {
          width: `${roundValue(blockH)}px`,
          height: `${roundValue(blockH)}px`
        }
        : {
          borderWidth: `0 ${roundValue(blockH)}px ${roundValue(blockH)}px ${roundValue(blockH / 2)}px`
        }

      return {
        left: `${leftShift}%`,
        top: `${topShift}px`,
        ...computedBlockH
      }
    }
  },

  methods: {
    roundValue (v) {
      return Math.round(v * 100) / 100
    }
  }
}

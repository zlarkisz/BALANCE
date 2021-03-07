import { createBlock } from '../assets/js/helpers/block-gen'
import { calcBlcokWeight } from '../assets/js/helpers/block-weight'

export const state = () => ({
  randomBlocksArray: [1, 2, 3],
  currentBlockName: '',
  currentBlockWeight: 0,
  gameStatus: true, // is game play or puase
  shoulderForcePosition: 0,
  fallingBlocks: [],
  emergingBlocks: [],
  fallenBlocks: [],
  gameOver: false
})

export const getters = {
  shoulderRot (state, getters) {
    const { weightL, weightR } = getters

    if (!weightL) {
      return 30
    }

    if (weightL === weightR) {
      return 0
    }

    return weightL > weightR
      ? (weightL - weightR) / weightL * -100
      : (weightR - weightL) / weightR * 100
  },

  weightL (state) {
    return calcBlcokWeight(state.fallenBlocks)
  },

  weightR (state) {
    return calcBlcokWeight(state.emergingBlocks)
  },

  gameEnd (state, getters) {
    const { weightL, weightR, shoulderRot } = getters

    return shoulderRot > 30 ||
    shoulderRot < -30 ||
    Math.abs(weightL - weightR) > 20
  }
}
export const actions = {
  START_GAME ({ commit }) {
    commit('CLEAR_GAME')
    commit('ADD_RIGHT_BLOCK')
    commit('ADD_FALLING_BLOCK')
  },

  FINISH_FALLING ({ commit, state, getters, dispatch }) {
    commit('ADD_FALLING_BLOCK')
    commit('ADD_LEFT_BLOCK')

    if (
      state.fallenBlocks.length &&
      state.fallenBlocks.length !== state.emergingBlocks.length
    ) { commit('ADD_RIGHT_BLOCK') }

    if (getters.gameEnd) {
      setTimeout(() => {
        commit('SET_GAME_OVER', true)
        dispatch('START_GAME')
      }, 0)
    }
  }
}

export const mutations = {
  SET_BLOCK_NAME (state, name) {
    state.currentBlockName = name
  },

  SET_BLOCK_WEIGHT (state, weight) {
    state.currentBlockWeight = weight
  },

  GENERATE_BLOCK (state) {
    const randomBlock = createBlock()

    state.emergingBlocks.push(randomBlock)
  },

  SET_GAME_STATUS (state, status) {
    state.gameStatus = status
  },

  SET_SHOULDER_FORCE_POSITION (state, pos) {
    state.shoulderForcePosition = pos
  },

  CREATE_FALLING_BLOCK (state) {
    state.fallingBlocks = []

    for (let i = 0; i < 1; i++) {
      const randomBlock = createBlock()

      state.fallingBlocks.push(randomBlock)
    }
  },

  MOVE_LEFT (state) {
    if (state.fallingBlocks[0].area + 1 > 5 || state.gameStatus) return

    state.fallingBlocks[0].area += 1
  },

  MOVE_RIGHT (state) {
    if (state.fallingBlocks[0].area - 1 <= 0 || state.gameStatus) return

    state.fallingBlocks[0].area -= 1
  },

  ADD_LEFT_BLOCK (state) {
    const block = state.fallingBlocks.shift()

    state.fallenBlocks.push(block)
  },

  ADD_RIGHT_BLOCK (state) {
    const randomBlock = createBlock()

    state.emergingBlocks.push(randomBlock)
  },

  ADD_FALLING_BLOCK (state) {
    const randomBlock = createBlock()

    state.fallingBlocks.push(randomBlock)
  },

  CLEAR_GAME (state) {
    state.shoulderForcePosition = 0
    state.emergingBlocks = []
    state.fallingBlocks = []
    state.fallenBlocks = []
    state.gameStatus = true
  },

  SET_GAME_OVER (state, over) {
    state.gameOver = over
  }
}

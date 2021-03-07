import { v4 as uuidv4 } from 'uuid'

export function createBlock () {
  const lineWidth = 10
  const blockId = uuidv4()
  const blockW = Math.floor(Math.random() * 10) + 1
  const blockH = blockW * 8
  const blockType = Math.floor(Math.random() * 3)
  const area = Math.floor(Math.random() * lineWidth / 2) + 1

  return { blockId, blockW, blockH, blockType, area }
}

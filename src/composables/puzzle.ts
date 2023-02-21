/**
 * @description for puzzle main logic rules which used by core componet
 * @returns all methods
 */

// by convention, composable function names start with "use"
export function usePuzzle(size = 16, trace = 4) {
  const numbers = ref([])
  const answers = ref([])

  /**
   * init random numbers based on puzzle size
   * @returns shuffled numbers
   */
  const initial = () => {
    // generate correct numbers
    for (let i = 0; i < size; i++)
      answers.value[i] = i as never
    // shuffe them
    numbers.value = [...answers.value].sort(() => Math.random() - 0.5)
    return numbers.value
  }

  /**
   * change index of selected tile with empty tile
   */
  const swapTile = (index: number) => {
    const empty_tile = numbers.value.indexOf(0 as never)
    // tile based on this condition allow to swap
    const left_right = empty_tile + 1 === index || empty_tile - 1 === index
    const up_down = empty_tile + trace === index || empty_tile - trace === index
    const right_edge = (index % trace) === 0 && ((empty_tile + 1) % trace === 0)
    const left_edge = (((index + 1) % trace) === 0) && ((empty_tile) % trace === 0)
    //
    if ((left_right || up_down) && !(right_edge || left_edge))
      numbers.value[index] = numbers.value.splice(empty_tile, 1, numbers.value[index])[0]
  }

  /**
   * check tile in the currect position
   */
  const currectTile = (tile: number, index: number) => index + 1 === tile

  /**
   * check puzzle solved
   */
  const solved = () => {
    return Array.isArray(numbers.value)
    && Array.isArray(answers.value)
    && numbers.value.length === answers.value.length
    && numbers.value.every((val, index) => {
      if (numbers.value.length - 1 !== index)
        return val === answers.value[index + 1]
      else return true
    })
  }

  // expose managed states as return value
  return { initial, swapTile, currectTile, solved }
}

const evaluateCells = (arr) => {
  let newState = createEmptyBoard(HEIGHT, WIDTH)

  const countCells = (arr, row, col) => {
    let cells = 0
    for (let y = row - 1; y <= row + 1; y++) {
      for (let x = col - 1; x <= col + 1; x++) {
        if (x >= 0 && x < arr[row].length && y >= 0 && y < arr.length) {
          arr[y][x] && cells++
        }
      }
    }
    return cells
  }

  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      let cells = countCells(arr, row, col)

      if (cells === 3) {
        newState[row][col] = 1
      } else if (cells === 4) {
        newState[row][col] = arr[row][col]
      }
    }
  }
  return newState
}

/*const evaluateCellsSingle = (arr, width) => {
    let newArr = []
    let index = 0
    let cell = arr[index]

    const getResult = (array) => {
      let result = 0
      for (let num of array) {
        num && result++
      }
      if (result === 3) return 1
      if (result === 4) return array[0]
      return 0
    }

    //FIRST ROW
    //First col
    newArr.push(
      getResult([
        arr[index],
        arr[index + width + 1],
        arr[index + width],
        arr[index + 1],
      ])
    )

    index++
    //Middle cols
    while (index < width - 1) {
      newArr.push(
        getResult([
          arr[index],
          arr[index - 1],
          arr[index + 1],
          arr[index + width - 1],
          arr[index + width],
          arr[index + width + 1],
        ])
      )

      index++
    }
    //Last col
    newArr.push(
      getResult([
        arr[index],
        arr[index + width - 1],
        arr[index + width],
        arr[index - 1],
      ])
    )

    index++
    //MIDDLE ROWS
    for (let i = width; i < arr.length - width; i += width) {
      //First col
      newArr.push(
        getResult([
          arr[index],
          arr[index - width],
          arr[index - width + 1],
          arr[index + 1],
          arr[index + width],
          arr[index + width + 1],
        ])
      )
      index++
      //Middle cols
      for (let j = 1; j < width - 1; j++) {
        const cell = getResult([
          arr[index],
          arr[index - width - 1],
          arr[index - width],
          arr[index - width + 1],
          arr[index - 1],
          arr[index + 1],
          arr[index + width - 1],
          arr[index + width],
          arr[index + width + 1],
        ])
        newArr.push(cell)
        index++
      }
      //Last col
      newArr.push(
        getResult([
          arr[index],
          arr[index - width - 1],
          arr[index - width],
          arr[index - 1],
          arr[index + width - 1],
          arr[index + width],
        ])
      )
      index++
    }
    //LAST ROW
    //First col
    newArr.push(
      getResult([
        arr[index],
        arr[index - width + 1],
        arr[index - width],
        arr[index + 1],
      ])
    )
    index++
    //Middle cols
    for (let i = arr.length - width + 1; i < arr.length - 1; i++) {
      newArr.push(
        getResult([
          arr[index],
          arr[index - width - 1],
          arr[index - width],
          arr[index - width + 1],
          arr[index - 1],
          arr[index + 1],
        ])
      )
      index++
    }
    //Last col
    newArr.push(
      getResult([
        arr[index],
        arr[index - width - 1],
        arr[index - width],
        arr[index - 1],
      ])
    )

    return newArr
  }*/
export const createEmptyBoardSingle = (height, width) => {
  const emptyBoard = Array(height * width).fill(0)
  return emptyBoard
}

export const createRandomizedBoardSingle = (height, width) => {
  const size = height * width
  const emptyBoard = []
  for (let i = 0; i < size; i++) {
    emptyBoard.push(Math.floor(Math.random() * 2))
  }
}

const evaluateCellsSingle2 = (arr, width) => {
  let newArr = []
  const getResult = (arr) => {
    let result = 0
    for (let num of arr) num && result++

    return result
  }
  const createCellsArr = (cell, index) => {
    const NW = arr[index - width - 1]
    const N = arr[index - width]
    const NE = arr[index - width + 1]
    const W = arr[index - 1]
    const E = arr[index + 1]
    const SW = arr[index + width - 1]
    const S = arr[index + width]
    const SE = arr[index + width + 1]

    const NSWE = [NW, N, NE, W, E, SW, S, SE, cell]
    const NSW = [NW, N, W, SW, S, cell]
    const NSE = [N, NE, E, S, SE, cell]
    const NWE = [NW, N, NE, W, E, cell]
    const SWE = [W, E, SW, S, SE, cell]
    const NoWe = [NW, N, W, cell]
    const NoEa = [NE, N, E, cell]
    const SoWe = [SW, S, W, cell]
    const SoEa = [SE, S, E, cell]

    const hasSouth = index < arr.length - width
    const hasWest = index % width !== 0
    const hasEast = index % width !== index - 1
    const hasNorth = index > width
    if (hasNorth) {
      if (hasSouth) {
        if (hasWest) {
          if (hasEast) {
            return NSWE
            //No East, but S and N, so internal East col
          } else {
            return NSW
          }
          //No West, but S and N, so internal West col
        } else {
          return NSE
        }

        //No South, so South Row
      } else if (hasWest) {
        if (hasEast) {
          return NWE
        } else return { NoWe }
      } else {
        return NoEa
      }
      //No North, so North row
    } else if (hasWest) {
      if (hasEast) {
        return SWE
      } else {
        return SoWe
      }
    } else {
      return SoEa
    }
  }
  let index = 0
  for (let cell of arr) {
    let cells = getResult(createCellsArr(cell, index))

    if (cells === 3) {
      newArr.push(1)
    } else if (cells === 4) {
      newArr.push(cell)
    } else {
      newArr.push(0)
    }
    index++
  }
  return newArr
}

const evaluateCellsSingle3 = (arr, width) => {
  let newArr = []
  let index = 0
  let cell = arr[index]
  const NW = arr[index - width - 1]
  const N = arr[index - width]
  const NE = arr[index - width + 1]
  const W = arr[index - 1]
  const E = arr[index + 1]
  const SW = arr[index + width - 1]
  const S = arr[index + width]
  const SE = arr[index + width + 1]

  const NSWE = [NW, N, NE, W, E, SW, S, SE, cell]
  const NSW = [NW, N, W, SW, S, cell]
  const NSE = [N, NE, E, S, SE, cell]
  const NWE = [NW, N, NE, W, E, cell]
  const SWE = [W, E, SW, S, SE, cell]
  const NoWe = [NW, N, W, cell]
  const NoEa = [NE, N, E, cell]
  const SoWe = [SW, S, W, cell]
  const SoEa = [SE, S, E, cell]

  const getResult = (arr) => {
    let result = 0
    for (let num of arr) {
      result += num
    }
    return result === 3 ? 1 : result === 4 ? cell : 0
  }

  //FIRST ROW
  //First col
  newArr.push(getResult(SoEa))
  index++
  //Middle cols
  while (index < width - 1) {
    newArr.push(getResult(SWE))
    index++
  }
  //Last col
  newArr.push(getResult(SoWe))
  index++
  //MIDDLE ROWS
  for (let i = width; i < arr.length - width; i += width) {
    //First col
    newArr.push(getResult(NSE))
    index++
    //Middle cols
    for (let j = 1; j < width - 1; j++) {
      newArr.push(getResult(NSWE))
      index++
    }
    //Last col
    newArr.push(getResult(NSW))
    index++
  }
  //LAST ROW
  //First col
  newArr.push(getResult(NoEa))
  index++
  //Middle cols
  for (let i = arr.length - width; i < arr.length; i++) {
    newArr.push(getResult(NWE))
    index++
  }
  //Last col
  newArr.push(getResult(NoWe))
  index++

  return newArr
}

const evaluateCellsSingle = (arr, width) => {
  let newArr = []
  const countNeighhbors = (cell, index) => {
    const getNeighbors = (arr) => {
      let total = 0
      for (let num of arr) num && total++
      return total
    }
    const NW =
      index > width && index % width !== 0 ? arr[index - width - 1] : undefined
    const N = index > width ? arr[index - width] : undefined
    const NE =
      index > width && index % width !== index - 1
        ? arr[index - width + 1]
        : undefined
    const W = index % width !== 0 ? arr[index - 1] : undefined
    const E = index % width !== index - 1 ? arr[index + 1] : undefined
    const SW =
      index < arr.length - width && index % width !== 0
        ? arr[index + width - 1]
        : undefined
    const S = index < arr.length - width ? arr[index + width] : undefined
    const SE =
      index < arr.length - width && index % width !== index - 1
        ? arr[index + width + 1]
        : undefined

    return getNeighbors([NW, N, NE, W, E, SW, S, SE, cell])
  }
  let index = 0
  while (index < arr.length) {
    let cell = arr[index]
    let cells = countNeighhbors(cell, index)
    if (cells === 3) {
      newArr.push(1)
    } else if (cells === 4) {
      newArr.push(cell)
    } else {
      newArr.push(0)
    }
    index++
  }
  return newArr
}

const evaluateCellsTwoValues = (arr) => {
  let newArr = []
  const getNeighbors = (index) => {
    const NW =
      index > width && index % width !== 0 ? arr[index - width - 1] : undefined
    const N = index > width ? arr[index - width] : undefined
    const NE =
      index > width && index % width !== index - 1
        ? arr[index - width + 1]
        : undefined
    const W = index % width !== 0 ? arr[index - 1] : undefined
    const E = index % width !== index - 1 ? arr[index + 1] : undefined
    const SW =
      index < arr.length - width && index % width !== 0
        ? arr[index + width - 1]
        : undefined
    const S = index < arr.length - width ? arr[index + width] : undefined
    const SE =
      index < arr.length - width && index % width !== index - 1
        ? arr[index + width + 1]
        : undefined

    return [NW, N, NE, W, E, SW, S, SE]
  }

  for (let i = 0; i < arr.length; i++) {
    if (cell.value) {
      const neighbors = getNeighbors(i)
      for (let neighbor of neighbors) {
        neighbor !== undefined && neighbor.neighbors++
      }
    }
  }
  for (let cell of arr) {
    if (!cell.value) {
      cell.neighbors === 3 ? newArr.push(1) : newArr.push(0)
    } else if (cell.neighbors === 2 || cell.neighbors === 3) {
      newArr.push(1)
    } else {
      newArr.push(0)
    }
  }
}

export const createEmptyBoardTwoValues = (height, width) => {
  const emptyBoard = Array(height * width).fill({ value: 0, neighbors: 0 })
  return emptyBoard
}

export const createRandomizedBoardTwoValues = (height, width) => {
  const size = height * width
  const emptyBoard = []
  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * 2)
    emptyBoard.push({ value, neighbors: 0 })
  }
  return emptyBoard
}

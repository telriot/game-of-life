export const nestedCopy = (array) => {
  return JSON.parse(JSON.stringify(array))
}

export const getNeighbors = (index, arr, width) => {
  const neighbors = []
  index > width && index % width !== 0 && neighbors.push(arr[index - width - 1])
  index > width && neighbors.push(arr[index - width])
  index > width &&
    index % width !== width - 1 &&
    neighbors.push(arr[index - width + 1])
  index % width !== 0 && neighbors.push(arr[index - 1])
  index % width !== width - 1 && neighbors.push(arr[index + 1])
  index < arr.length - width &&
    index % width !== 0 &&
    neighbors.push(arr[index + width - 1])
  index < arr.length - width && neighbors.push(arr[index + width])
  index < arr.length - width &&
    index % width !== width - 1 &&
    neighbors.push(arr[index + width + 1])

  return neighbors
}

export const populateNeighbors = (arr, width, newArr) => {
  if (!newArr) newArr = nestedCopy(arr)
  for (let i = 0; i < arr.length; i++) {
    let cell = arr[i]
    if (cell.value) {
      const neighbors = getNeighbors(i, arr, width)
      for (let neighbor of neighbors) {
        newArr[neighbor.index].neighbors++
      }
    }
  }
  return newArr
}

export const createEmptyBoardTwoValues = (height, width) => {
  let arr = []
  const length = height * width
  for (let index = 0; index < length; index++)
    arr.push({
      index,
      value: 0,
      neighbors: 0,
    })
  return arr
}

export const createRandomizedBoardTwoValues = (height, width) => {
  const size = height * width
  let emptyBoard = []
  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * 2)
    emptyBoard.push({ index: i, value, neighbors: 0 })
  }
  emptyBoard = populateNeighbors(emptyBoard, width)
  return emptyBoard
}
export const updateCellNeigbors = (neighbors, array) => {
  for (let neighbor of neighbors) {
    array[neighbor.index].neighbors++
  }
}

export const evaluateCellsTwoValues = (arr, height, width) => {
  let newArr = createEmptyBoardTwoValues(height, width)

  for (let cell of arr) {
    let index = cell.index
    if (cell.value === 0) {
      if (cell.neighbors !== 3) {
        newArr[index].value = 0
      } else {
        newArr[index].value = 1
        let neighbors = getNeighbors(index, newArr, width)
        updateCellNeigbors(neighbors, newArr)
      }
    } else if (cell.neighbors === 2 || cell.neighbors === 3) {
      newArr[index].value = 1
      let neighbors = getNeighbors(index, newArr, width)
      updateCellNeigbors(neighbors, newArr)
    } else {
      newArr[index].value = 0
    }
  }
  return newArr
}

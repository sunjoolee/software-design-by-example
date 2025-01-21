// {
//   label0: [ 'row0 label0', 'row1 label0', 'row2 label0' ],
//   label1: [ 'row0 label1', 'row1 label1', 'row2 label1' ],
//   label2: [ 'row0 label2', 'row1 label2', 'row2 label2' ]
// }

/**
 * 열 우선 저장 테이블 생성
 */
export const buildColMajorTable = (nRows, labels) => {
  const result = {}
  labels.forEach(label => {
    const col = []
    for (var r = 0; r < nRows; ++r){
      col.push(`row${r} ${label}`)
    }
    result[label] = col
  })
  return result
}

export const filterRow = (table, rowFilterFunc) => {
  const result = {}
  Object.keys(table).forEach(label => {
    const newCol = []
    for (var r = 0; r < nRows; ++r){
      if(rowFilterFunc(table, r)) newCol.push(table[label][r])
    }
    result[label] = col
  })
  return result
}

export const selectLabel = (table, labels) => {
  const result = {}
  Object.keys(table)
    .filter(label => labels.contain(label))
    .forEach(label => result[label] = table[label])
  return result
}

console.log(buildColMajorTable(3, ["label0", "label1", "label2"]))

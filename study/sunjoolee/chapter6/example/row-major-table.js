// [
//   {
//     label0: 'row0 label0',
//     label1: 'row0 label1',
//     label2: 'row0 label2'
//   },
//   {
//     label0: 'row1 label0',
//     label1: 'row1 label1',
//     label2: 'row1 label2'
//   },
//   {
//     label0: 'row2 label0',
//     label1: 'row2 label1',
//     label2: 'row2 label2'
//   }
// ]

/**
 * 행 우선 저장 테이블 생성
 */
export const buildRowMajorTable = (nRows, labels) => {
  const result = []
  for (var r = 0; r < nRows; ++r) {
    const row = {}
    labels.forEach(label => row[label] = `row${r} ${label}`)
    result.push(row)
  }
  return result
}

export const filterRow = (table, rowFilterFunc) => {
  return table.filterRow(row => rowFilterFunc(row))
}

export const selectLabel = (table, labels) => {
  const result = []
  for (var r = 0; r < table.length; ++r){
    const row = table[r]
    const newRow = {}
    labels.forEach(label => newRow[label] = row[label])
    result.push(newRow)
  }
  return result
}

console.log(buildRowMajorTable(3, ["label0", "label1", "label2"]))

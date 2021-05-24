export default (size, subdivisions) => {
  let row = []
  let col = []

  if(subdivisions < 1)
    subdivisions = 1
    subdivisions = 4
  const step = size / subdivisions
  let val = 0
  for (let i = 0; i <= subdivisions; i++) {
    row.push(val)
    col.push(val)
    val += step
  }


  let vertices = []
  for (let i = 0; i < row.length; i++) {
    let str = ''
    for (let j = 0; j < col.length; j++) {
      vertices.push(col[j])
      vertices.push(row[i])
      vertices.push(0.0)
      str += `[${col[j]}]`
      str += `[${row[i]}]`
    }
    console.log(str)
  }

  console.log(row)
  console.log(col)

  console.log(vertices)

  //  const vertices = [
  //    -size / 2, -size / 2, 0,
  //    -size / 2, size / 2, 0,
  //    size / 2, size / 2, 0,
  //    size / 2, -size / 2, 0
  // ]

  const uvs = [
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0
  ]

  const indices = [
    0, 1, 2,
    0, 3, 2
  ]

  const normals = [
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,
  ]


  return {
    vertices,
    uvs,
    indices,
    normals
  }
}

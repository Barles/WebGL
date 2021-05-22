export default {
   createCube(position, dimensions) {
     let p = position
     let d = dimensions
     if (position == null)
       p = { x: 0, y: 0, z: 0 }
     if (dimensions == null)
       d = { x: 2, y: 2, z: 2 }

     const cube = [
      // Face avant
      p.x - d.x / 2, p.y - d.y / 2, p.z + d.z / 2,
      p.x + d.x / 2, p.y - d.y / 2, p.z + d.z / 2,
      p.x + d.x / 2, p.y + d.y / 2, p.z + d.z / 2,
      p.x - d.x / 2, p.y + d.y / 2, p.z + d.z / 2,

      // Face arrière
      p.x - d.x / 2, p.y - d.y / 2, p.z - d.z / 2,
      p.x - d.x / 2, p.y + d.y / 2, p.z - d.z / 2,
      p.x + d.x / 2, p.y + d.y / 2, p.z - d.z / 2,
      p.x + d.x / 2, p.y - d.y / 2, p.z - d.z / 2,

      // Face supérieure
      p.x - d.x / 2, p.y + d.y / 2, p.z - d.z / 2,
      p.x - d.x / 2, p.y + d.y / 2, p.z + d.z / 2,
      p.x + d.x / 2, p.y + d.y / 2, p.z + d.z / 2,
      p.x + d.x / 2, p.y + d.y / 2, p.z - d.z / 2,

      // Face inférieure
      p.x - d.x / 2, p.y - d.y / 2, p.z - d.z / 2,
      p.x + d.x / 2, p.y - d.y / 2, p.z - d.z / 2,
      p.x + d.x / 2, p.y - d.y / 2, p.z + d.z / 2,
      p.x - d.x / 2, p.y - d.y / 2, p.z + d.z / 2,

      // Face droite
      p.x + d.x / 2, p.y - d.y / 2, p.z - d.z / 2,
      p.x + d.x / 2, p.y + d.y / 2, p.z - d.z / 2,
      p.x + d.x / 2, p.y + d.y / 2, p.z + d.z / 2,
      p.x + d.x / 2, p.y - d.y / 2, p.z + d.z / 2,

      // Face gauche
      p.x - d.x / 2, p.y - d.y / 2, p.z - d.z / 2,
      p.x - d.x / 2, p.y - d.y / 2, p.z + d.z / 2,
      p.x - d.x / 2, p.y + d.y / 2, p.z + d.z / 2,
      p.x - d.x / 2, p.y + d.y / 2, p.z - d.z / 2,
    ]
    return cube
   }
}

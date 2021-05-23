import Primitives from './Primitives'

class GLObject {
  constructor(renderer) {
    this.renderer = renderer
    this.verticesBuffer = null
    this.colorsBuffer = null
    this.indicesBuffer = null
    this.translation = { x: 0, y: 0, z: -5 }
    this.rotation = { x: 0, y: 0, z: 0 }

    this.fillVertices()
    this.fillColors()
    this.fillIndices()
  }

  fillVertices() {
    const positions = Primitives.createCube({
      x: 0, y: 0, z: 0
    }, {
      x: 1, y: 1, z: 1
    })
    this.verticesBuffer = this.renderer.getGL().createBuffer()
    this.renderer.getGL().bindBuffer(this.renderer.getGL().ARRAY_BUFFER, this.verticesBuffer)
    this.renderer.getGL().bufferData(this.renderer.getGL().ARRAY_BUFFER, new Float32Array(positions), this.renderer.getGL().STATIC_DRAW)
  }

  fillColors() {
    const faceColors = [
      [1.0,  1.0,  1.0,  1.0],    // Face avant : blanc
      [1.0,  0.0,  0.0,  1.0],    // Face arrière : rouge
      [0.0,  1.0,  0.0,  1.0],    // Face supérieure : vert
      [0.0,  0.0,  1.0,  1.0],    // Face infiérieure : bleu
      [1.0,  1.0,  0.0,  1.0],    // Face droite : jaune
      [1.0,  0.0,  1.0,  1.0]     // Face gauche : violet
    ]
    let colors = []
    for (let j = 0; j < faceColors.length; j++) {
      const c = faceColors[j]
      colors = colors.concat(c, c, c, c)
    }
    this.colorsBuffer = this.renderer.getGL().createBuffer()
    this.renderer.getGL().bindBuffer(this.renderer.getGL().ARRAY_BUFFER, this.colorsBuffer)
    this.renderer.getGL().bufferData(this.renderer.getGL().ARRAY_BUFFER, new Float32Array(colors), this.renderer.getGL().STATIC_DRAW)
  }

  fillIndices() {
    const indices = [
      0,  1,  2,      0,  2,  3,    // avant
      4,  5,  6,      4,  6,  7,    // arrière
      8,  9,  10,     8,  10, 11,   // haut
      12, 13, 14,     12, 14, 15,   // bas
      16, 17, 18,     16, 18, 19,   // droite
      20, 21, 22,     20, 22, 23,   // gauche
    ]
    this.indicesBuffer = this.renderer.getGL().createBuffer()
    this.renderer.getGL().bindBuffer(this.renderer.getGL().ELEMENT_ARRAY_BUFFER, this.indicesBuffer)
    this.renderer.getGL().bufferData(this.renderer.getGL().ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.renderer.getGL().STATIC_DRAW)
  }

  getObject() {
    return {
      verticesBuffer: this.verticesBuffer,
      colorsBuffer: this.colorsBuffer,
      indicesBuffer: this.indicesBuffer,
      translation: this.translation,
      rotation: this.rotation
    }
  }
}

export default GLObject

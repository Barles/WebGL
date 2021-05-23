import Primitives from './Primitives'

class GLObject {
  constructor(renderer, texturePath) {
    this.renderer = renderer
    this.verticesBuffer = null
    this.uvsBuffer = null
    this.indicesBuffer = null
    this.texture = null
    this.translation = { x: 0, y: 0, z: -5 }
    this.rotation = { x: 0, y: 0, z: 0 }

    this.addTexture(texturePath)
    this.fillVertices()
    this.fillUVS()
    this.fillIndices()
  }

  addTexture(url) {
    const texture = this.renderer.getGL().createTexture()
    this.renderer.getGL().bindTexture(this.renderer.getGL().TEXTURE_2D, texture)
    this.renderer.getGL().texImage2D(this.renderer.getGL().TEXTURE_2D, 0, this.renderer.getGL().RGBA, 1, 1, 0, this.renderer.getGL().RGBA, this.renderer.getGL().UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]))
    const image = new Image()
    const r = this.renderer
    image.onload = function() {
      r.getGL().bindTexture(r.getGL().TEXTURE_2D, texture);
      r.getGL().texImage2D(r.getGL().TEXTURE_2D, 0, r.getGL().RGBA, r.getGL().RGBA, r.getGL().UNSIGNED_BYTE, image)
      if (((image.width & (image.width - 1)) == 0) && ((image.height & (image.height - 1)) == 0)) {
         r.getGL().generateMipmap(r.getGL().TEXTURE_2D)
      } else {
         r.getGL().texParameteri(r.getGL().TEXTURE_2D, r.getGL().TEXTURE_WRAP_S, r.getGL().CLAMP_TO_EDGE)
         r.getGL().texParameteri(r.getGL().TEXTURE_2D, r.getGL().TEXTURE_WRAP_T, r.getGL().CLAMP_TO_EDGE)
         r.getGL().texParameteri(r.getGL().TEXTURE_2D, r.getGL().TEXTURE_MIN_FILTER, r.getGL().LINEAR)
      }
    }
    image.src = url;
    this.texture = texture;
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

  fillUVS() {
    const textureCoordinates = [
      // Front
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Back
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Top
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Bottom
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Right
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Left
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
    ];
    this.uvsBuffer = this.renderer.getGL().createBuffer()
    this.renderer.getGL().bindBuffer(this.renderer.getGL().ARRAY_BUFFER, this.uvsBuffer)
    this.renderer.getGL().bufferData(this.renderer.getGL().ARRAY_BUFFER, new Float32Array(textureCoordinates), this.renderer.getGL().STATIC_DRAW)
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
      uvsBuffer: this.uvsBuffer,
      indicesBuffer: this.indicesBuffer,
      texture: this.texture,
      translation: this.translation,
      rotation: this.rotation
    }
  }
}

export default GLObject

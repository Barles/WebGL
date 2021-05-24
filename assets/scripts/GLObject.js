import Cube from './Primitives/Cube'
import Plane from './Primitives/Plane'

class GLObject {
  constructor(renderer, texturePath, type) {
    this.renderer = renderer
    this.verticesBuffer = null
    this.uvsBuffer = null
    this.indicesBuffer = null
    this.normalsBuffer = null
    this.texture = null
    this.translation = { x: 0, y: 0, z: -3 }
    this.rotation = { x: 0, y: 0, z: 0 }
    this.type = this.renderer.getGL().TRIANGLES

    if (type == 'cube') {
      this.object = Cube({
        x: 0, y: 0, z: 0
      }, {
        x: 1, y: 1, z: 1
      })
    }

    if (type == 'plane') {
      this.type = this.renderer.getGL().LINE_STRIP
      this.object = Plane(10, 1)
      this.translation.z = -10
    }

    this.addTexture(texturePath)
    this.fillVertices()
    this.fillUVS()
    this.fillIndices()
    this.fillNormals()
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
    this.verticesBuffer = this.renderer.getGL().createBuffer()
    this.renderer.getGL().bindBuffer(this.renderer.getGL().ARRAY_BUFFER, this.verticesBuffer)
    this.renderer.getGL().bufferData(this.renderer.getGL().ARRAY_BUFFER, new Float32Array(this.object.vertices), this.renderer.getGL().STATIC_DRAW)
  }

  fillUVS() {
    this.uvsBuffer = this.renderer.getGL().createBuffer()
    this.renderer.getGL().bindBuffer(this.renderer.getGL().ARRAY_BUFFER, this.uvsBuffer)
    this.renderer.getGL().bufferData(this.renderer.getGL().ARRAY_BUFFER, new Float32Array(this.object.uvs), this.renderer.getGL().STATIC_DRAW)
  }

  fillIndices() {
    this.indicesBuffer = this.renderer.getGL().createBuffer()
    this.renderer.getGL().bindBuffer(this.renderer.getGL().ELEMENT_ARRAY_BUFFER, this.indicesBuffer)
    this.renderer.getGL().bufferData(this.renderer.getGL().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.object.indices), this.renderer.getGL().STATIC_DRAW)
  }

  fillNormals() {
    this.normalsBuffer = this.renderer.getGL().createBuffer();
    this.renderer.getGL().bindBuffer(this.renderer.getGL().ARRAY_BUFFER, this.normalsBuffer);
    this.renderer.getGL().bufferData(this.renderer.getGL().ARRAY_BUFFER, new Float32Array(this.object.normals), this.renderer.getGL().STATIC_DRAW);
  }

  getObject() {
    return {
      verticesBuffer: this.verticesBuffer,
      uvsBuffer: this.uvsBuffer,
      indicesBuffer: this.indicesBuffer,
      normalsBuffer: this.normalsBuffer,
      texture: this.texture,
      translation: this.translation,
      rotation: this.rotation,
      datas: this.object,
      type: this.type
    }
  }
}

export default GLObject

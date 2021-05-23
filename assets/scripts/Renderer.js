import { mat4 } from 'gl-matrix'
import Utils from './Utils'
import fragmentShader from '../shaders/fragment.glsl.js'
import vertexShader from '../shaders/vertex.glsl.js'

class Renderer {
  constructor() {
    this.gl = this.initContext()
    this.programInfo = this.initShaders()
    this.projectionMatrix = this.initProjectionMatrix()
  }

  render(objects) {
    // clear and set the viewport and other global state (enable depth testing, turn on culling, etc..)
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
    this.gl.clearDepth(1.0)
    this.gl.enable(this.gl.DEPTH_TEST)
    this.gl.depthFunc(this.gl.LEQUAL)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)

    // console.log(objects)

    for (const object of objects) {
      // call gl.useProgram for the program needed to draw.
      this.gl.useProgram(this.programInfo.program)
      this.projectionMatrix = this.initProjectionMatrix()

      // Compute ModelViewMatrix
      const modelViewMatrix = mat4.create()
      mat4.translate(modelViewMatrix, modelViewMatrix, [
        object.translation.x,
        object.translation.y,
        object.translation.z
      ])
      mat4.rotate(modelViewMatrix, modelViewMatrix, object.rotation.x, [1, 0, 0])
      mat4.rotate(modelViewMatrix, modelViewMatrix, object.rotation.y, [0, 1, 0])
      mat4.rotate(modelViewMatrix, modelViewMatrix, object.rotation.z, [0, 0, 1])

      this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix, false, this.projectionMatrix)
      this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.verticesBuffer)
      this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 3, this.gl.FLOAT, false, 0, 0)
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition)

      // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.colorsBuffer)
      // this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexColor, 4, this.gl.FLOAT, false, 0, 0)
      // this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor)

      if(object.texture != null) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.uvsBuffer)
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.textureCoord, 2, this.gl.FLOAT, false, 0, 0)
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord)

        this.gl.activeTexture(this.gl.TEXTURE0)
        this.gl.bindTexture(this.gl.TEXTURE_2D, object.texture)
        this.gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0)
      }

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.normalsBuffer)
      this.gl.vertexAttribPointer(this.programInfo.attribLocations.verticesNormals, 3, this.gl.FLOAT, false, 0, 0)
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.verticesNormals)

      let normalMatrix = mat4.create()
      mat4.invert(normalMatrix, modelViewMatrix)
      mat4.transpose(normalMatrix, normalMatrix)

      this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.normalMatrix, false, normalMatrix)

      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, object.indicesBuffer)
      this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0)
    }
  }

  initContext() {
    const canvas = document.getElementById('gl-canvas')
    const gl = canvas.getContext('webgl')

    if (!gl) {
      console.error('Error while creating WebGL context')
      return
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    return gl
  }

  initShaders() {
    const shaderProgram = Utils.initShaderProgram(this.gl, vertexShader, fragmentShader)
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        textureCoord: this.gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
        verticesNormals: this.gl.getAttribLocation(shaderProgram, 'aVertexNormal')
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        normalMatrix: this.gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
        modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        uSampler: this.gl.getUniformLocation(shaderProgram, 'uSampler')
      }
    }
    return programInfo
  }

  initProjectionMatrix() {
    const fov = 45 * Math.PI / 80
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight
    const zNear = 0.1
    const zFar = 1000.0
    const projectionMatrix = mat4.create()
    mat4.perspective(projectionMatrix, fov, aspect, zNear, zFar)
    return projectionMatrix
  }

  destroy() {
    this.gl = null
    return null
  }

  getGL() { return this.gl }
}

export default Renderer

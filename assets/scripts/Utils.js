export default {
  loadShader(gl, shaderType, source) {
    console.log(source)
    const shader = gl.createShader(shaderType)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`Unable to compile shader -> ${gl.getShaderInfoLog(shader)}`)
      return null
    }
    return shader
  },
  initShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(`Unable to link shaders -> ${gl.getProgramInfoLog(shaderProgram)}`)
      return null
    }
    return shaderProgram
  }
}

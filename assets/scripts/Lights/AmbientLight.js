import { vec3 } from 'gl-matrix'

class AmbientLight {
  constructor(color) {
    this.color = vec3.create()
    vec3.set(this.color, color[0], color[1], color[2])
    this.type = 'ambientLight'
  }

  getType() { return this.type }

  getColor() {
    return this.color
  }
}

export default AmbientLight

import { vec3 } from 'gl-matrix'

class DirectionalLight {
  constructor(color, direction) {
    this.color = vec3.create()
    this.direction = vec3.create()
    vec3.set(this.color, color[0], color[1], color[2])
    vec3.set(this.direction, direction[0], direction[1], direction[2])
    this.type = 'directionalLight'
  }

  setRotationX(value) { this.direction[0] = value }
  setRotationY(value) { this.direction[1] = value }
  setRotationZ(value) { this.direction[2] = value }

  getRotationX() { return this.direction[0] }
  getRotationY() { return this.direction[1] }
  getRotationZ() { return this.direction[2] }

  setColorR(value) { this.color[0] = value }
  setColorG(value) { this.color[1] = value }
  setColorB(value) { this.color[2] = value }

  getType() { return this.type }
  getColor() { return this.color }
  getDirection() { return this.direction }
}

export default DirectionalLight

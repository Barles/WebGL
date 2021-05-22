import Renderer from './Renderer'
import GLObject from './GLObject'

class App {
  constructor() {
    this.renderer = new Renderer()

    const object = new GLObject(this.renderer, 'cube')
    const object2 = new GLObject(this.renderer, 'cube')
    object2.translation.x = -3
    const object3 = new GLObject(this.renderer, 'cube')
    object3.translation.x = 3

    this.time = 0

    const render = (now) => {
      now /= 1000
      const deltaTime = now - this.time
      this.time = now
      object.rotation.x += deltaTime
      object2.rotation.z += deltaTime
      object3.rotation.y += deltaTime
      console.log(60 / deltaTime)
      this.renderer.render([
        object.getObject(),
        object2.getObject(),
        object3.getObject()
      ])
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }
}

export default App

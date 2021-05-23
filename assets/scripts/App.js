import Renderer from './Renderer'
import GLObject from './GLObject'
import events from 'events'

class App extends events.EventEmitter {
  constructor() {
    super()
    this.renderer = new Renderer()

    const object = new GLObject(this.renderer, 'cube')
    const object2 = new GLObject(this.renderer, 'cube')
    object2.translation.x = -3
    const object3 = new GLObject(this.renderer, 'cube')
    object3.translation.x = 3

    this.time = 0

    const render = (now) => {
      if (!this.renderer)
        return
      else {
        now /= 1000
        const deltaTime = now - this.time
        this.time = now
        object.rotation.x += deltaTime
        object2.rotation.z += deltaTime
        object3.rotation.y += deltaTime
        this.renderer.render([
          object.getObject(),
          object2.getObject(),
          object3.getObject()
        ])

        this.emit('update', {
          fps: 60 / deltaTime
        })

        requestAnimationFrame(render)
      }

    }
    requestAnimationFrame(render)
  }

  destroy() {
    this.renderer = this.renderer.destroy()
    return null
  }
}

export default App

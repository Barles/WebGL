import Renderer from './Renderer'
import GLObject from './GLObject'
import AmbientLight from './Lights/AmbientLight'
import DirectionalLight from './Lights/DirectionalLight'
import events from 'events'

class App extends events.EventEmitter {
  constructor() {
    super()
    this.renderer = new Renderer()

    const object = new GLObject(this.renderer, require('~/assets/textures/Bricks/Bricks059_1K_Color.png'))
    const object2 = new GLObject(this.renderer, require('~/assets/textures/Bricks/Bricks059_1K_Color.png'))
    object2.translation.x = -3
    const object3 = new GLObject(this.renderer, require('~/assets/textures/Bricks/Bricks059_1K_Color.png'))
    object3.translation.x = 3

    const ambientLight = new AmbientLight([.1, .1, .1])
    this.dirLight = new DirectionalLight([1, 1, 1], [0.85, 0.8, 0.75])

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
        ], [
          ambientLight,
          this.dirLight
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

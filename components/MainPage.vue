<template>
  <b-container>
    <b-row>
      <b-col>
        <canvas @click="toggleFS" :class="fs ? 'canvas-fs' : 'canvas-nofs'" id="gl-canvas" width="1920" height="1080" />
        <!-- <canvas class="mx-auto d-block" id="gl-canvas" width="640" height="480" /> -->
      </b-col>
    </b-row>
    <b-row>
      <b-col class="bg-white">
        FPS: {{ fps }}
        <b-form-input v-model="dirLight.rotateX" type="range" min="0" max="360" step="0.5" @update="updateDirLight" />
        <b-form-input v-model="dirLight.rotateY" type="range" min="0" max="360" step="0.5" @update="updateDirLight" />
        <b-form-input v-model="dirLight.rotateZ" type="range" min="0" max="360" step="0.5" @update="updateDirLight" />
        <!-- <b-form-input v-model="dirLight.colorR" type="range" min="0" max="5" step="0.01" @update="updateDirLight" />
        <b-form-input v-model="dirLight.colorG" type="range" min="0" max="5" step="0.01" @update="updateDirLight" />
        <b-form-input v-model="dirLight.colorB" type="range" min="0" max="5" step="0.01" @update="updateDirLight" /> -->
        <b-form-input v-model="dirLight.color" type="color" @update="updateDirLight" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import App from '~/assets/scripts/App'

export default {
  data() {
    return {
      app: null,
      fps: 0,
      fs: false,
      dirLight: {
        rotateX: 1,
        rotateY: 1,
        rotateZ: 1,
        colorR: .5,
        colorG: .5,
        colorB: .5,
        color: '#ffffff'
      }
    }
  },
  mounted() {
    this.app = new App()
    this.app.on('update', (update) => {
      this.fps = update.fps
    })
    this.fps = this.app.time
  },
  beforeDestroy() {
    this.app = this.app.destroy()
  },
  methods: {
    hexToRgb(h){return['0x'+h[1]+h[2]|0,'0x'+h[3]+h[4]|0,'0x'+h[5]+h[6]|0]},
    updateDirLight() {
      this.app.dirLight.setRotationX(this.dirLight.rotateX * (Math.PI / 180))
      this.app.dirLight.setRotationY(this.dirLight.rotateY * (Math.PI / 180))
      this.app.dirLight.setRotationZ(this.dirLight.rotateZ * (Math.PI / 180))

      const color = this.hexToRgb(this.dirLight.color)
      console.log(color[0] / 255)
      console.log(color[1] / 255)
      console.log(color[2] / 255)

      this.app.dirLight.setColorR(color[0] / 255)
      this.app.dirLight.setColorG(color[1] / 255)
      this.app.dirLight.setColorB(color[2] / 255)
    },
    toggleFS() {
      const elem = document.documentElement
      if (!this.fs) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
      }
      this.fs = !this.fs
    }
  }
}
</script>

<style>
.canvas-fs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.canvas-nofs {
  position: relative;
  width: 100%;
}
</style>

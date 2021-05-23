<template>
  <b-container>
    <b-row>
      <b-col>
        <canvas @click="toggleFS" :class="fs ? 'canvas-fs' : 'canvas-nofs'" id="gl-canvas" width="1920" height="1080" />
        <!-- <canvas class="mx-auto d-block" id="gl-canvas" width="640" height="480" /> -->
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        {{ fps }}
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
      fs: false
    }
  },
  mounted() {
    this.app = new App()
    this.fps = this.app.time
  },
  methods: {
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
  // TODO Destroy app when unmounted (kill and free all things that have to)
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

<template>
  <b-container>
    <b-row>
      <b-col>
        <canvas class="mx-auto d-block" id="gl-canvas" width="640" height="480" />
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
      fps: 0
    }
  },
  mounted() {
    this.app = new App()
    this.fps = this.app.time
  }
  // TODO Destroy app when unmounted (kill and free all things that have to)
}
</script>

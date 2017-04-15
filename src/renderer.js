const fs = require('fs')
const { dialog } = require('electron').remote

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8')
}

document.getElementById('app').innerHTML = require('./app/views/main.html')

const App = new Vue({
  el: '#app',
  data() {
    return {
      name: null
    }
  },
  methods: {
    load() {
      const file = dialog.showOpenDialog({
        properties: ['openFile']
      })

      const audio = document.getElementById('test')

      audio.src = file[0]
      this.name = file[0]
      audio.volume = 0.2
      audio.autoplay = true
    }
  }
})
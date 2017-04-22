const fs = require('fs')
const { dialog } = require('electron').remote
const id3 = require('id3js')

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8')
}

document.getElementById('app').innerHTML = require('./app/views/main.html')

const App = new Vue({
  el: '#app',
  data() {
    return {
      name: null,
      radio_info: null,
      loading: true,
      metadata: null
    }
  },
  methods: {
    load() {
      const file = dialog.showOpenDialog({
        properties: ['openFile']
      })

      const audio = document.getElementById('test')

      id3({
        file: file[0],
        type: id3.OPEN_LOCAL
      }, (err, tags) => {
        if(err) console.error(err)
        else {
          this.metadata = tags
        }
      })

      audio.src = file[0]
      this.name = file[0]
      audio.volume = 0.2
      audio.autoplay = true
    }
  },
  mounted() {
    fetch('http://www.nts.live/schedule/nowPlaying?timezone=Europe%2FLondon')
    .then(res => res.json())
    .then(res => {
      this.radio_info = res
      const radio = document.getElementById('radio')
      radio.src = 'http://stream-relay-geo.ntslive.net/stream?t=1492871913945'
      radio.volume = 0.2
      radio.autoplay = false
      this.loading = false
    })
    .catch(err => console.error(err))
  }
})
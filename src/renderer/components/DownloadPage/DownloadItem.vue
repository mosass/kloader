<template>
  <div>
    <div class="items">
      <div class="item">
        <div class="name">Path:</div>
        <div class="value">{{ savesrc }}</div>
      </div>
      <div class="item">
        <div class="name">filename:</div>
        <div class="value">{{ filename }}</div>
      </div>
      <div class="item">
        <div class="name">Link:</div>
        <div class="value" @click="goToLink">{{ link }}</div>
      </div>
      <div class="item-link">
        <div class="name">Video-Link:</div>
        <ul v-for="(videoUrl, index) in videoUrls">
          <li class="value">
            <div @click="goToVLink(index)">{{ videoUrl }}</div>
          </li>
        </ul>
      </div>
      <div class="item">
        <button @click="reloadLink">reload link</button>
      </div>
    </div>
  </div>
</template>

<script>
  import jsdom from 'jsdom'
  const { JSDOM } = jsdom
  let createIframeUrl = function (vid, n) {
    let currentdate = new Date()
    let h = currentdate.getUTCHours()
    let d = currentdate.getUTCDate()
    let dh
    let dh2
    let m
    if (h === 0) {
      dh = d + '-' + h
      dh2 = d + '-' + '24'
    } else {
      m = h - 1
      dh = d + '-' + h
      dh2 = d + '-' + m
    }
    return 'http://www.kseries.co/clip/play.php?id=' + vid + '&width=1005&height=540&dh=' + dh + '&dh2=' + dh2 + '&os=&n=' + n
  }

  export default {
    props: ['savesrc', 'link', 'filename'],
    data: function () {
      let vid = this.$options.propsData.link.match('[0-9]+')[0]
      let vuthis = this
      for (let n = 0; n < 4; n++) {
        let url = createIframeUrl(vid, n)
        this.$request(url, function (error, response, body) {
          console.log('error:', error)
          console.log('statusCode:', response && response.statusCode)
          let dom = new JSDOM(body)
          let lstVideo = dom.window.document.getElementsByTagName('source')
          for (let idx in lstVideo) {
            if (!lstVideo[idx].src.match('www.kseries.co')) {
              vuthis.$data.videoUrls.push(lstVideo[idx].src)
            }
            break
          }
        })
      }
      return {
        videoUrls: []
      }
    },
    methods: {
      reloadLink: function () {
        let vid = this.$options.propsData.link.match('[0-9]+')[0]
        let vuthis = this
        vuthis.$data.videoUrls = []
        for (let n = 0; n < 4; n++) {
          let url = createIframeUrl(vid, n)
          this.$request(url, function (error, response, body) {
            console.log('error:', error)
            console.log('statusCode:', response && response.statusCode)
            let dom = new JSDOM(body)
            let lstVideo = dom.window.document.getElementsByTagName('source')
            for (let idx in lstVideo) {
              if (!lstVideo[idx].src.match('www.kseries.co')) {
                vuthis.$data.videoUrls.push(lstVideo[idx].src)
              }
              break
            }
          })
        }
      },
      goToLink: function () {
        this.$electron.shellopenExternal(this.$options.propsData.link)
      },
      goToVLink: function (index) {
        console.log(index)
        this.$electron.shell.openExternal(this.$data.videoUrls[index])
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 28px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item-link {
    margin-bottom: 6px;
  }

  .item-link .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item-link .value {
    color: #35495e;
    font-weight: bold;
    margin-left: 50px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }

  .item p.value {
    color: #35495e;
    font-weight: bold;
    display: block;
  }
</style>

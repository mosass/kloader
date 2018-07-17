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
        <div class="value">{{ link }}</div>
      </div>
      <div class="item">
        <div class="name">Video-Link:</div>
        <div class="value">{{ videoUrl }}</div>
      </div>
      <div class="item">
        <button @click="reloadLink">reload</button>
      </div>
    </div>
  </div>
</template>

<script>
  import jsdom from 'jsdom'
  const { JSDOM } = jsdom

  export default {
    props: ['savesrc', 'link', 'filename'],
    data () {
      let ifurl = this.$options.propsData.link
      console.log(ifurl)
      // let url = ''
      this.$request(ifurl, function (error, response, body) {
        console.log('error:', error) // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
        // console.log(body)
        let domIframe = new JSDOM(body)
        let iframe = domIframe.window.document.getElementById('playlist')
        console.log(iframe.src)
      })

      // let vid = this.$options.propsData.link.match('[0-9]+')[0]
      // let url = 'http://www.kseries.co/clip/play.php?id=' + vid + '&os=&n=0'
      // console.log(url)
      let vurl = ''
      // this.$request(url, function (error, response, body) {
      //   console.log('error:', error)
      //   console.log('statusCode:', response && response.statusCode)
      //   let dom = new JSDOM(body)
      //   let lstVideo = dom.window.document.getElementsByTagName('source')
      //   for (let idx in lstVideo) {
      //     vurl = lstVideo[idx].src
      //   }
      // })

      return {
        videoUrl: vurl
      }
    },
    methods: {
      reloadLink: function () {
        let vid = this.$options.propsData.link.match('[0-9]+')[0]
        let url = 'http://www.kseries.co/clip/play.php?id=' + vid + '&os=&n=0'
        this.$request(url, function (error, response, body) {
          console.log('error:', error) // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
          let dom = new JSDOM(body)
          let lstVideo = dom.window.document.getElementsByTagName('source')
          for (let idx in lstVideo) {
            console.log(lstVideo[idx].src)
          }
        })
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

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>

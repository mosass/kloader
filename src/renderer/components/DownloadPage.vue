<template>
  <div id="wrapper">
    <h1 class="header-title">Download</h1>
    <main>
      <div class="left-side">
        <div>
          Save to path : {{ savepath }}
        </div>
        <div class="download-list">
          <div v-for="item in items">
            <download-item 
              :link="item.link" 
              :savesrc="savepath"
              :filename="item.filename"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import DownloadItem from './DownloadPage/DownloadItem'
  import jsdom from 'jsdom'
  const { JSDOM } = jsdom

  export default {
    name: 'download-page',
    components: { DownloadItem },
    data: function () {
      let itemsLink = []
      this.$request(this.$route.query.link, function (error, response, body) {
        console.log('error:', error) // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
        let dom = new JSDOM(body)
        let lstA = dom.window.document.querySelectorAll('a')
        for (let idx in lstA) {
          if (lstA[idx].href !== undefined && lstA[idx].href.match('^http://www.kseries.co/clip/.+') != null) {
            let link = lstA[idx].href
            let fname = lstA[idx].textContent
            itemsLink.push({
              link: link,
              filename: fname
            })
          }
        }
      })
      return {
        link: this.$route.query.link,
        savepath: this.$route.query.savepath,
        items: itemsLink
      }
    },
    methods: { }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 10px 20px;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 100%; }

  .header-title {
    color: #555;
    font-size: 45px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

</style>

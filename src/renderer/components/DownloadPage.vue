<template>
  <div id="wrapper" @loaded="init()">
    <h1 class="header-title">Download</h1>
    <main>
      <div class="left-side">
        <div>
          Save to path : {{ savepath }}
        </div>
        <div class="download-list">
          <div v-for="item in items">
            <download-item :link="item.link" :savesrc="item.dsrc"/>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import DownloadItem from './DownloadPage/DownloadItem'

  export default {
    name: 'download-page',
    components: { DownloadItem },
    data: function () {
      return {
        link: this.$route.query.link,
        savepath: this.$route.query.savepath,
        items: [
          { link: 'aaa', dsrc: 'ddd' },
          { link: 'aa2', dsrc: 'dd2' },
          { link: 'aa3', dsrc: 'dd3' },
          { link: 'aa4', dsrc: 'dd4' }
        ]
      }
    },
    methods: {
      init () {
        console.log('init')
      }
    }
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

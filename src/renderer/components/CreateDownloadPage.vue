<template>
  <div id="wrapper">
    <h1 class="header-title">Kseries Video Downloader</h1>
    <main>
      <div class="left-side">
        <span class="title">
          Create Video Downloading
        </span>
        <div>
          <form>
            <fieldset>
              <label>Link :</label>
              <input type="text" class="input-text" name="video-link" id="video-link" v-model="param.link">
            </fieldset>
            <fieldset>
              <label>Destination Path :</label>
              <input type="text" class="input-path" name="save-path" id="save-path" v-model="param.savepath">
              <button id="btn-browse" class="btn-browse" @click="selectSaveDir">browse</button>
            </fieldset>
            <fieldset>
              <button id="btn-create" class="btn-create" @click="createNewDownload">Start...</button>
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  const {dialog, BrowserWindow} = require('electron').remote

  export default {
    name: 'create-download-page',
    data: function () {
      return {
        param: {
          link: '',
          savepath: ''
        }
      }
    },
    methods: {
      selectSaveDir: function () {
        let src = dialog.showOpenDialog({properties: ['openDirectory']})
        this.param.savepath = src
      },
      createNewDownload: function () {
        let link = document.getElementById('video-link').value
        let savepath = document.getElementById('save-path').value
        const winURL = process.env.NODE_ENV === 'development'
          ? `http://localhost:9080#/download?link=${link}&savepath=${savepath}`
          : `file://${__dirname}/index.html#/download?link=${link}&savepath=${savepath}`

        var win = new BrowserWindow({width: 400, height: 600})
        win.loadURL(winURL)
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
    padding: 60px 80px;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 100%; }

  fieldset {
    margin: 5px 5px;
  }

  fieldset > label {
    margin: 5px 5px;
    display: flex;
  }

  fieldset > .input-text {
    margin: 5px 5px;
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #42b983;
    background-color: transparent;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
    width: 100%;
    display: flex;
  }

  fieldset > .input-text {
    margin: 5px 5px;
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #42b983;
    background-color: transparent;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
    width: 100%;
    display: flex;
  }

  fieldset > .input-path {
    margin: 5px 5px;
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #42b983;
    background-color: transparent;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
    width: 85%;
  }

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

  fieldset > .btn-browse {
    font-size: 1.0em;
    cursor: pointer;
    outline: none;
    padding: 0.35em 1em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  fieldset > .btn-create {
    font-size: 2em;
    cursor: pointer;
    outline: none;
    padding: 0.05em 1em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

</style>

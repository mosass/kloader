const http = require('http')
const https = require('https')
const fs = require('fs')
const ProgressBar = require('progress')
const argv = require('yargs')

let arg_jsonin = argv.input
console.log('json input -> ' + arg_jsonin)

let arg_ep = argv.ep
console.log('ep -> ' + arg_ep)

let arg_dir = '.'
if (argv.dir != undefined){
    arg_dir = argv.dir
}
console.log('save to path -> ' + arg_dir)

let downloadFile = function (link, path) {
    let file = fs.createWriteStream(path)
    let url = new URL(link)
    let h = http
    if (url.protocol == "https:") {
        h = https
    }
    console.log('start download file : ' + path)

    let req = h.request(url)

    req.on("response", function (response) {
        response.pipe(file)

        let len = parseInt(response.headers['content-length'], 10)
        let bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: len
        });
        let curr = 1
        let len90 = null
        if (isNaN(len)) {
            len = 1024 * 1024 * 150
            len90 = 1024 * 1024 * 120
        }
        response.on('data', function (chunk) {
            curr += chunk.length
            if (len90 != null && len90 > curr) {
                bar.update(0.9)
            } else {
                bar.tick(chunk.length)
            }
        })

        response.on('end', function () {
            console.log('\n');
        })

        file.on('finish', function () {
            file.close()
            bar.update(1)
        })
    });
    req.end()
}

fs.readFile(arg_jsonin, function (err, content) {
    if (err) throw err;
    let epLinkList = JSON.parse(content);
    console.log('Max ep -> ' + epLinkList.length)

    downloadFile(epLinkList[arg_ep - 1].videoLink, arg_dir + '/' + epLinkList[arg_ep - 1].filename + '.mp4')
})
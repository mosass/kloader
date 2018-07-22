const request = require('sync-request')
const {
    JSDOM
} = require('jsdom')

const fs = require('fs')

var arg_url=process.argv[2] 
console.log("url -> " + arg_url)
var arg_out=process.argv[3]
console.log("output -> " + arg_out)

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

let res = request('GET', arg_url)
let body = res.getBody().toString()

let dom = new JSDOM(body)
let lstA = dom.window.document.querySelectorAll('a')
let epLinkList = []
for (let idx in lstA) {
    if (lstA[idx].href !== undefined && lstA[idx].href.match('^http://www.kseries.co/clip/.+') != null) {
        let link = lstA[idx].href
        let fname = lstA[idx].textContent
        let videoLink = ''

        let vid = link.match('[0-9]+')[0]
        for (let n = 0; n < 4; n++) {
            let urlIframe = createIframeUrl(vid, n)
            let resIframe = request('GET', urlIframe)
            let bodyIframe = resIframe.getBody().toString()
            let domIframe = new JSDOM(bodyIframe)
            let lstVideo = domIframe.window.document.getElementsByTagName('source')
            for (let idx in lstVideo) {
                if (lstVideo[idx].src != undefined && !lstVideo[idx].src.match('www.kseries.co')) {
                    videoLink = lstVideo[idx].src
                    n = 5
                    break
                }
            }
        }
        epLinkList.push({
            filename: fname,
            videoLink: videoLink
        })
    }
}

console.log(epLinkList)
var json = JSON.stringify(epLinkList);
fs.writeFile(arg_out, json, 'utf8', function (){ });

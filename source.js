// ==UserScript==
// @name         SJTU_class_survey
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Forsworn
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @match        <$URL$>
// @run-at document-idle
// @include http://pingjiao.sjtu.edu.cn/*
// ==/UserScript==

(function() {
    let evaluationWords = ["非常认同","难度适当","基本都在听课","非常有兴趣","提升很多"]
    function sleep(numberMillis) {
        var now = new Date()
        var exitTime = now.getTime() + numberMillis
        while (true) {
            now = new Date()
            if (now.getTime() > exitTime) return
        }
    }
    function fill(){
        let promise = new Promise((resolve,reject)=>{
            $(document).ready(function(){
                let options = $(".option-container")
                for(let item of options){
                    if($.inArray(item.innerText,evaluationWords) !== -1){
                        $(item).siblings("td").children("div").children("span").click()
                    }
                }
                sleep(5000)
                $(".paper-submit").click()
                sleep(500)
                $(".btn-back")[0].click()
                setTimeout(resolve,1000)
            })
        })
        promise.then(() => {
            window.onload = survey()
        })
    }
    function survey(){
        $(document).ready(function(){
            let boxes = $(".course-state.active")
            if(boxes.length){
                boxes[0].click()
                window.location.reload()
            }else{
                alert("done!")
            }
        })
    }
    if(window.location.href.indexOf("my-events") !== -1) window.onload = survey()
    else if(window.location.href.indexOf("answer-paper") !== -1) window.onload = fill()
})();

/*
let url = window.location.href
let reg = /(\/[0-9]+){3}$/
url = url.match(reg)[0]
url = url.slice(url.lastIndexOf("/"),url.length) + url.slice(0,url.lastIndexOf("/"))
console.log(url)
$.get(`http://pingjiao.sjtu.edu.cn/api/question-paper${url}`).done(()=>{});
改进：利用这个get直接整理出反馈然后直接post?*/
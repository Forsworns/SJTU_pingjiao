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



(function () {

    let evaluationWords = ["非常认同", "难度适当", "基本都在听课", "非常有兴趣", "提升很多"]

    function sleep(numberMillis) {

        var now = new Date()

        var exitTime = now.getTime() + numberMillis

        while (true) {

            now = new Date()

            if (now.getTime() > exitTime) return

        }

    }

    function fill() {
        console.log("fill")
        let promise = new Promise((resolve, reject) => {

            $(document).ready(function () {
                let options = $(".option-container")

                for (let item of options) {

                    if ($.inArray(item.innerText, evaluationWords) !== -1) {

                        $(item).siblings("td").children("div").children("span").click()

                    }

                }

                setTimeout(() => {
                    let textarea = document.getElementsByClassName("q-answer").item(0)
                    textarea.value = "非常好没有什么意见"
                    textarea._value = "非常好没有什么意见"
                    textarea.dispatchEvent(new Event("input"))
                }, 100)
                setTimeout(() => {
                    $(".paper-submit").click()
                }, 5000)

                setTimeout(() => {
                    $(".btn-back")[0].click()
                }, 6000)

                setTimeout(resolve, 7000)
            })

        })
        promise.then(() => {
            topage()
        })

    }
    function selectSurvey() {
        $(document).ready(function () {

            let boxes = $(".course-state.active")

            if (boxes.length) {
                setTimeout(fill, 3000)
                boxes[0].click()

            } else {
                alert("done!")
            }
        })
    }
    function survey() {
        $(document).ready(function () {
            let button = $(".box-item1").children("a.color-purple")
            let href = button.attr("href")
            console.log(href)
            window.location.replace(href)
            setTimeout(selectSurvey, 1000)
        })
    }


    function topage() {
        $(document).ready(function () {
            window.location.replace("http://pingjiao.sjtu.edu.cn/#/my-events")
            setTimeout(survey, 1000)
        })
    }
    window.onload = topage()

})();

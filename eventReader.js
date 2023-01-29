
let today = new Date();
let dayOfWeek = today.getDay();
let daysUntilTuesday = 2 - dayOfWeek;

if (daysUntilTuesday < 0) {
  daysUntilTuesday += 7;
} 

let daySetter = {
  0: [],
  1: [],
  2: [],
  3: []
}

var ActivityList = []

const NextThreeDateFull = Object.keys(daySetter).map(function (x) {
  let date = new Date(today.getTime() + ((daysUntilTuesday + x * 7) * 24 * 60 * 60 * 1000))
  return [date.getFullYear(), date.getMonth() + 1 ,date.getDate()]
});

const NextThreeDateMonth = NextThreeDateFull.map(x => x[1]+"/"+x[2])
// console.log(NextThreeDateFull);
// console.log(NextThreeDateMonth);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAVU1k_ZoFh6YKcG8iFIpm1WSFtDX9Nrw",
  authDomain: "steam-aria-296003.firebaseapp.com",
  databaseURL: "https://steam-aria-296003.firebaseio.com",
  projectId: "steam-aria-296003",
  storageBucket: "steam-aria-296003.appspot.com",
  messagingSenderId: "103205224740",
  appId: "1:103205224740:web:bf737b070093958fdc33b1",
  measurementId: "G-BZ9JKH1S4X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var myData = firebase.database().ref('/');


myData.on('value', function (snapshot) {

  let yearContent = snapshot.val()[new Date().getFullYear()];

  for (let i = 0; i < Object.keys(yearContent).length; i++) {
    // console.log(yearContent[i].lessons.length)

    for (let j = 0; j < yearContent[i].lessons.length; j++) {


      if (NextThreeDateMonth.indexOf(yearContent[i].lessons[j].host_date) !== -1) {

        let title = yearContent[i].title;
        let chapter_title = yearContent[i].lessons[j].chapter_title;
        let buttonContent = '';


        if (yearContent[i].lessons[j].video !== undefined) {
          for (var k = 0; k < yearContent[i].lessons[j].video.length; k++) {
            buttonContent = buttonContent + '<a target="_blank" href="' + yearContent[i].lessons[j].video[k] + '">' +
              '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="錄影回放" style="margin: 3px 3px;padding:4px 9px;background-color: #FF0000; border-color: #FF0000;">' +
              '<i class="fa fa-step-backward" aria-hidden="true"></i>' +
              '</button>' +
              '</a>'
          }

        }

        if (yearContent[i].lessons[j].sildes !== undefined) {
          for (var k = 0; k < yearContent[i].lessons[j].sildes.length; k++) {
            buttonContent = buttonContent + '<a target="_blank" href="' + yearContent[i].lessons[j].sildes[k] + '">' +
              '<button type="button" rel="tooltip" class="btn btn-default btn-icon btn-sm" data-original-title="" title="投影片" style="margin: 3px 3px;background-color: #212832; border-color: #212832;">' +
              '<i class="fa fa-play" aria-hidden="true"></i>' +
              '</button>' +
              '</a>'
          }
        }
        if (yearContent[i].lessons[j].codes !== undefined) {
          for (var k = 0; k < yearContent[i].lessons[j].codes.length; k++) {
            buttonContent = buttonContent + '<a target="_blank" href="' + yearContent[i].lessons[j].codes[k] + '">' +
              '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="Colab" style="margin: 3px 3px;padding:4px 6px;background-color: #ff6f00; border-color: #ff6f00;">' +
              '<i class="fa fa-code" aria-hidden="true"></i>' +
              '</button>' +
              '</a>'
          }
        }

        if (yearContent[i].lessons[j].url !== undefined) {
          for (var k = 0; k < yearContent[i].lessons[j].url.length; k++) {
            buttonContent = buttonContent + '<a target="_blank" href="' + yearContent[i].lessons[j].url[k] + '">' +
              '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="相關網頁" style="margin: 3px 3px;padding:4px 7px;background-color: #0051ff; border-color: #0051ff;">' +
              '<i class="fa fa-external-link" aria-hidden="true"></i>' +
              '</button>' +
              '</a>'
          }

        }

        daySetter[NextThreeDateMonth.indexOf(yearContent[i].lessons[j].host_date)].push(
          {
            "title": title,
            "chapter_title": chapter_title,
            "buttonContent": buttonContent
          }
        )
      }
    }
  }


  function HolidayChecker(inputDate){
    let holidayContent = snapshot.val()["calender"];
    // console.log("inputDate",inputDate)
    for (let i=0;i<holidayContent.length;i++){

      let startDate = new Date(holidayContent[i].start);
      startDate =  `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
      if (startDate=== inputDate) {
        // console.log("startDate",startDate)
        return holidayContent[i].name
      }
    }
    return "休息日"
  }


  function MeetLinkFinder(inputDate){
    let meetLinkContent = snapshot.val()["meet"][new Date().getFullYear()];

    console.log(meetLinkContent)

    for (let i=0;i<meetLinkContent.length;i++){
      if ( meetLinkContent[i].date === inputDate) {
        return meetLinkContent[i].url
      }
    }
  }

  // console.log("daySetter", daySetter)

  let eachDateContent = ''

  for(let i=0;i<NextThreeDateMonth.length;i++){

    let tableRowSource = daySetter[i]

    if (tableRowSource.length > 0 ) {

      let tableRowDisplay = ""
      let googleCardContent = ""
      let googleCardLink = ""

      if (daysUntilTuesday===0 && NextThreeDateMonth[0]===NextThreeDateMonth[i]){
        tableRowDisplay+= `<tr>
        <button class="btn btn-youtube btn-sm mb-2" type="button">
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          LIVE
        </button>
        </tr>`
      }else{
        tableRowDisplay+= `
        <tr>
          <button type="button" class="btn btn-outline-default btn-round btn-sm mb-2 disabled">${tableRowSource.length} 個主題</button>
        </tr>`
      }
    

        for(let j = 0 ; j <tableRowSource.length;j++){

          tableRowDisplay+=`
            <tr>
              <!--td class="text-center" style="width:10px; padding:16px 16px;">${j+1}</td-->
              <td class="text-left" style="color: #ff3600; width:170px; padding:16px 0px;">${tableRowSource[j].title}</td>
              <td class="text-left" style="padding:16px 0px;">${tableRowSource[j].chapter_title}</td>
              <!--td class="td-actions text-right" style="padding:16px 0px;">
              ${tableRowSource[j].buttonContent}
              </td-->
            </tr>
          `
          googleCardContent+= `* ${tableRowSource[j].title.split('</span>  ')[1]} : ${tableRowSource[j].chapter_title}\\n`
        }

        if (daysUntilTuesday===0 && NextThreeDateMonth[0]===NextThreeDateMonth[i]){
          tableRowDisplay+= `
          <tr>
            <td colspan="4" style="padding-bottom: 0px;">
              <div class="col-md-12 mx-auto text-right">
                <a target="_blank" href="${MeetLinkFinder(`${NextThreeDateFull[0][1]}/${NextThreeDateFull[0][2]}`)}">
                    <button type="button" class="btn-icon btn btn-meet shadow">
                        <span class="btn-inner--icon"><span class='iconify' data-icon='logos:google-meet' data-inline='false'></span> </span>
                        <span class="btn-inner--text">使用 Google Meet 加入讀書會</span>
                    </button>
                </a>
              </div>
            </td>
          </tr>`
        }

        googleCardLink = MeetLinkFinder(`${NextThreeDateFull[i][1]}/${NextThreeDateFull[i][2]}`)

        var cardBodyContent = `
          <div class="card shadow">
            <div class="card-body">
                <table class="table">
                    ${tableRowDisplay}
                </table>
              </div>
          </div>
        `

        var ActivityContnet = `{
          "@context": "https://schema.org",
          "@type": "Event",
          "name":"${googleCardContent}",
          "url":"https://bookclubtensorflow.github.io",
          "description":"「**從Python到TensorFlow線上讀書會**」是一個致力於幫助學習者更好地了解
              TensorFlow 和深度學習技術的線上讀書會。在本讀書會中，我們將會邀請專家講者，導讀有關 Python 和 TensorFlow 的知識，並解答參與者的問題。\n我們歡迎所有興趣參與&quot;從Python到TensorFlow線上讀書會&quot;的講者和導讀者，協助我們在本讀書會中傳授這些知識和技能。\n\n**甚麼是Hugging
              Face?**\n&quot;Hugging face&quot;是一家專注於提供自然語言處理（NLP）工具的公司。他們提供了許多用於訓練和使用自然語言模型的工具，包括一個叫做Transformers 的庫，可以讓開發人員輕鬆地訓練和使用頂尖的 NLP 模型。你也可以參考這裡：[變形金剛與抱臉怪---NLP 應用開發之實戰
              ＠IT邦幫忙](https: //ithelp.ithome.com.tw/articles/10291739)",
          "startDate":"${NextThreeDateFull[i][0]}-${NextThreeDateFull[i][1]}-${NextThreeDateFull[i][2]}T20:30+08:00",
          "endDate":"${NextThreeDateFull[i][0]}-${NextThreeDateFull[i][1]}-${NextThreeDateFull[i][2]}T22:30+08:00",
          "eventStatus":"https://schema.org/EventScheduled",
          "eventAttendanceMode":"https://schema.org/OnlineEventAttendanceMode",
          "location":{"@type":"VirtualLocation","url":"${MeetLinkFinder(`${NextThreeDateFull[i][1]}/${NextThreeDateFull[i][2]}`)}"},
          "offers":{"@type":"Offer","price":"0","priceCurrency":"USD","validFrom":"2020-03-24","availability":"https://schema.org/InStock"},
          "organizer":{"@type":"Organization","name":"TensorFlow User Group Taipei","url":"https://www.meetup.com/tensorflow-user-group-taipei/"},
          "image":["https://bookclubtensorflow.github.io/assets/img/tf-bg-new-design-2023.png"]
        }`


        // var ActivityContnet = `{
        //   "@type": "ListItem",
        //   "position": ${i+1},
        //   "item": {
        //     "@type": "Course",
        //     "url":"${googleCardLink}",
        //     "name": "${NextThreeDateMonth[i]} 線上讀書會",
        //     "description": "${googleCardContent}",
        //     "provider": {
        //       "@type": "Organization",
        //       "name": "TensorFlow User Group Taipei",
        //       "sameAs": "https://www.meetup.com/en-AU/TensorFlow-User-Group-Taipei/"
        //     }
        //   }
        // }`

    }
    else{

    let Holiday = HolidayChecker(`${NextThreeDateFull[i][0]}-${NextThreeDateFull[i][1]}-${NextThreeDateFull[i][2]}`);

    let backgroundColor = "#000000"

    if (Holiday!=="休息日"){
      backgroundColor = "#cd201f"
    }

    var cardBodyContent = `
      <div class="card shadow text-center" style="padding:5px; background-color: ${backgroundColor};opacity: 0.4;">
        <p class="h1 card-title mb-3 text-white" style="margin:0 !important; ">${Holiday}</p>
      </div>
    `

    var ActivityContnet =  `{
      "@context": "https://schema.org",
      "@type": "Event",
      "eventStatus": "https://schema.org/EventPostponed",
      "name": "讀書會暫停一次 - ${Holiday}",
      "description":"本日無讀書會活動",
      "offers":{"@type":"Offer","price":"0","priceCurrency":"USD","validFrom":"2020-03-24","availability":"https://schema.org/InStock"},
      "eventAttendanceMode":"https://schema.org/OnlineEventAttendanceMode",
      "location": {
        "@type": "VirtualLocation",
        "url": "https://bookclubtensorflow.github.io/google_meet_redirect/"
        },
      "startDate":"${NextThreeDateFull[i][0]}-${NextThreeDateFull[i][1]}-${NextThreeDateFull[i][2]}T20:30+08:00",
      "endDate":"${NextThreeDateFull[i][0]}-${NextThreeDateFull[i][1]}-${NextThreeDateFull[i][2]}T22:30+08:00",
      "organizer":{"@type":"Organization","name":"TensorFlow User Group Taipei","url":"https://www.meetup.com/tensorflow-user-group-taipei/"},
      "image":["https://bookclubtensorflow.github.io/assets/img/tf-bg-new-design-2023.png"]
      }`

    }
    

    eachDateContent += `
      <div class="row col-md-12" style = "margin-top: 0rem !important; margin-bottom: 0rem !important;padding-right: 0px;">
          <div class="col-lg-2 mr-auto text-left mt-4" style = "margin-top: 0rem !important;">
              <p class="h1 card-title mb-3" style="word-break:break-all; color: #ff3600; margin-bottom: 0rem !important;">${NextThreeDateMonth[i]}</p>
          </div>
          <div class="col-lg-10 mr-auto text-left mt-4" style = "margin-top: 0rem !important; margin-bottom: 1.5rem !important;padding-right: 0px;">
                ${cardBodyContent}
          </div>
      </div>`

      ActivityList.push(ActivityContnet);

  }

  document.getElementById("recentContentList").innerHTML = `<div class="row col-md-12" style="margin-top: 1.5em; margin-right: 0em; padding-right: 0px;">${eachDateContent}</div>`
  
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = `[${ActivityList}]`
  // ` {
  //   "@context": "https://schema.org",
  //   "@type": "ItemList",
  //   "itemListElement": [${ActivityList}]
  // }`;
  document.head.appendChild(script);
  
});


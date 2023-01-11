
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


  // console.log("daySetter", daySetter)

  let eachDateContent = ''

  for(let i=0;i<NextThreeDateMonth.length;i++){

    let tableRowSource = daySetter[i]

    if (tableRowSource.length > 0 ) {

      let tableRowDisplay = ""

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
    

        for(let j = 0 ;j <tableRowSource.length;j++){

          tableRowDisplay+=`
            <tr>
              <td class="text-center" style="width:10px">${j+1}</td>
              <td class="text-left" style="color: #ff3600; width:170px;">${tableRowSource[j].title}</td>
              <td class="text-left">${tableRowSource[j].chapter_title}</td>
              <td class="td-actions text-right">
              ${tableRowSource[j].buttonContent}
              </td>
            </tr>
          `
        }
        var cardBodyContent = `
          <div class="card shadow">
            <div class="card-body">
                <table class="table">
                    ${tableRowDisplay}
                </table>
              </div>
          </div>
        `
    }
    else{

    let inputDate = HolidayChecker(`${NextThreeDateFull[i][0]}-${NextThreeDateFull[i][1]}-${NextThreeDateFull[i][2]}`);

    let backgroundColor = "#000000"

    if (inputDate!=="休息日"){
      backgroundColor = "#cd201f"
    }

    var cardBodyContent = `
      <div class="card shadow text-center" style="padding:5px; background-color: ${backgroundColor};opacity: 0.4;">
        <p class="h1 card-title mb-3 text-white" style="margin:0 !important; ">${inputDate}</p>
      </div>
    `
    }
    


    eachDateContent += `
      <div class="row col-md-12">
          <div class="col-lg-2 mr-auto text-left mt-4">
              <p class="h1 card-title mb-3 " style="word-break:break-all; color: #ff3600; animation-delay: 0ms;">${NextThreeDateMonth[i]}</p>
          </div>
          <div class="col-lg-10 mr-auto text-left mt-4">
                ${cardBodyContent}
          </div>
      </div>`

  }

  document.getElementById("recentContentList").innerHTML = eachDateContent

});



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
countDown()

var today = new Date('2023-2-19');

function LatestNextDateEvent(){
  
  let dayOfWeek = today.getDay();
  let daysUntilTuesday = 2 - dayOfWeek;
  
    if (daysUntilTuesday < 0) {
    daysUntilTuesday += 7;
    } 
  
  let date = new Date(today.getTime() + ((daysUntilTuesday) * 24 * 60 * 60 * 1000))
  return `${date.getMonth() + 1}/${date.getDate()}`
}

function LatestNextDateEventFull(){
  // let today = new Date();
  let dayOfWeek = today.getDay();
  let daysUntilTuesday = 2 - dayOfWeek;
  
    if (daysUntilTuesday < 0) {
    daysUntilTuesday += 7;
    } 
  let date = new Date(today.getTime() + ((daysUntilTuesday) * 24 * 60 * 60 * 1000))
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}


myData.on('value', function (snapshot) {

  function HolidayChecker(inputDate){
    let holidayContent = snapshot.val()["calender"];
    console.log("inputDate",inputDate)
    for (let i=0;i<holidayContent.length;i++){

      let startDate = new Date(holidayContent[i].start);
      startDate =  `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
      if (startDate === inputDate) {
        console.log("startDate",startDate)
        return holidayContent[i].name
      }
    }
    return "休息日"
  }

  function MeetLinkFinder(inputDate){
    let meetLinkContent = snapshot.val()["meet"][new Date().getFullYear()];

    for (let i=0;i<meetLinkContent.length;i++){
      if ( meetLinkContent[i].date === inputDate) {
        return meetLinkContent[i].link
      }
    }
  }

  let lastEventDate = LatestNextDateEvent();
  var MeetLink = MeetLinkFinder(lastEventDate)
  
  console.log(`${lastEventDate}:${MeetLink}`)

  
  if(MeetLink.length > 0){
    var countDown = setInterval(goToMeet, 5000);
    document.getElementById("infoCOntent").innerHTML = `將會自動帶你去本周二 (${lastEventDate}) 的讀書會連結`
    document.getElementById("redirectedButton").innerHTML =`
      <a href="${MeetLink}" target="" class="btn btn-outline-white">
        <span class="btn-inner--text" style="font-size: 1.33333333em;">手動前往Google Meet</span>
      </a>
      `
  }
  else{
    var countDown = setInterval(failInfo, 5000);
  }

  function goToMeet() {
    document.location.href = MeetLink;
    clearInterval(countDown);
  }
  
  function failInfo(){
    document.getElementById("title").innerHTML = "重新導向失敗"
    document.getElementById("infoCOntent").innerHTML = `本周二 (${lastEventDate}) 是「${HolidayChecker(LatestNextDateEventFull())}」沒有舉行活動`
    document.getElementById("redirectedButton").innerHTML =`
    <a href="../lesson_info" target="" class="btn btn-outline-white">
      <span class="btn-inner--text" style="font-size: 1.33333333em;">查看完整活動清單</span>
    </a>
    `
    clearInterval(countDown);
  }

});

var timer = 6
function countDown(){
 
  timer -= 1;
  if (timer > 0){
    document.getElementById("title").innerHTML = `${timer}秒後自動導向...`
  }
  setTimeout(`countDown()`,1000);
}
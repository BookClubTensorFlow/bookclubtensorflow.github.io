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

var myData = firebase.database().ref('/'+new Date().getFullYear());

myData.on('value', function(snapshot) {

  let returnCards = ""

  let year = new Date().getFullYear();
  let yearContent = snapshot.val();

  for(let i = 0 ; i< Object.keys(yearContent).length;i++)
  { 
    console.log(yearContent[i].lessons.length)

    for(let j = 0; j < yearContent[i].lessons.length;j++){

      console.log("Now", Date.now())
      console.log("Event "+j, Date.parse(year+'/'+(yearContent[i].lessons[j].host_date)))
      console.log("Event "+j, Date.parse(year+'/'+(yearContent[i].lessons[j].host_date)))

      let eventDate = (year+'/'+(yearContent[i].lessons[j].host_date)).replace('/','-');

      if ( Date.now() <= Date.parse(eventDate) || yearContent[i].lessons[j].host_date.length===0){

        let title = yearContent[i].title;
        let chapter_title = yearContent[i].lessons[j].chapter_title;
        let date = yearContent[i].lessons[j].host_date || "??/??";
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

        if (yearContent[i].lessons[j].sildes!== undefined) {
            for (var k = 0; k < yearContent[i].lessons[j].sildes.length; k++) {
                buttonContent = buttonContent + '<a target="_blank" href="' + yearContent[i].lessons[j].sildes[k] + '">' +
                    '<button type="button" rel="tooltip" class="btn btn-default btn-icon btn-sm" data-original-title="" title="投影片" style="margin: 3px 3px;background-color: #212832; border-color: #212832;">' +
                    '<i class="fa fa-play" aria-hidden="true"></i>' +
                    '</button>' +
                    '</a>'
            }
        }
        if (yearContent[i].lessons[j].codes!== undefined) {
            for (var k = 0; k < yearContent[i].lessons[j].codes.length; k++) {
                buttonContent = buttonContent + '<a target="_blank" href="' + yearContent[i].lessons[j].codes[k] + '">' +
                    '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="Colab" style="margin: 3px 3px;padding:4px 6px;background-color: #ff6f00; border-color: #ff6f00;">' +
                    '<i class="fa fa-code" aria-hidden="true"></i>' +
                    '</button>' +
                    '</a>'
            }
        }
        
        if (yearContent[i].lessons[j].url!== undefined) {
            for (var k = 0; k < yearContent[i].lessons[j].url.length; k++) {
                buttonContent = buttonContent + '<a target="_blank" href="' + yearContent[i].lessons[j].url[k] + '">' +
                    '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="相關網頁" style="margin: 3px 3px;padding:4px 7px;background-color: #0051ff; border-color: #0051ff;">' +
                    '<i class="fa fa-external-link" aria-hidden="true"></i>' +
                    '</button>' +
                    '</a>'
            }

        }

        let card_template = `<div class="col-lg-6 mr-auto text-left mt-4">
                        <div class="card text-black card-background shadow border-0">
                          <img class="card-img" src="./assets/img/main_page_activity/tf-bg-new-design.png" alt="Card image" style="border-color: aliceblue;">
                            <div class="card-img-overlay d-flex align-items-center" style="padding:40px";>
                              <div class="content" >
                                <p class="h3 card-title text-black mb-2" style="color: #ff3600;">${title}</p>
                                  <p class="card-description h5">${chapter_title}</p>
                                  <p class="card-text text-md font-weight-bold">${year}/${date}</p>
                                  <div class="card_footer">
                                  ${buttonContent}
                                </div>
                              </div>
                            
                            </div>
                          
                          </div>
                        </div>`

        returnCards += card_template
        break
      }
    }
  }

  console.log("returnCards",returnCards)

  document.getElementById("recentContentList").innerHTML = returnCards

});


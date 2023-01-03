let year_dict={
  "2020":lesson_2020, 
  "2022":lesson_2022,
  "2023":lesson_2023
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

                        
const NextEvent = (year) => {
  let returnCards = ""
  yearContent = year_dict[year];

  for(let i = 0 ; i< yearContent.length;i++)
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

          if (yearContent[i].lessons[j].video.length > 0) {
            for (var k = 0; k < yearContent[i].lessons[j].video.length; k++) {
              buttonContent = buttonContent + '<a target="_blank" href="' + yearContent[i].lessons[j].video[k] + '">' +
                '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="錄影回放" style="margin: 3px 3px;padding:4px 9px;background-color: #FF0000; border-color: #FF0000;">' +
                '<i class="fa fa-step-backward" aria-hidden="true"></i>' +
                    '</button>' +
                    '</a>'
            }

        }

        if (yearContent[i].lessons[j].sildes.length > 0) {
            for (var k = 0; k < yearContent[i].lessons[j].sildes.length; k++) {
                buttonContent = buttonContent + '<a target="_blank" href="' + yearContent[i].lessons[j].sildes[k] + '">' +
                    '<button type="button" rel="tooltip" class="btn btn-default btn-icon btn-sm" data-original-title="" title="投影片" style="margin: 3px 3px;background-color: #212832; border-color: #212832;">' +
                    '<i class="fa fa-play" aria-hidden="true"></i>' +
                    '</button>' +
                    '</a>'
            }
        }
        if (yearContent[i].lessons[j].codes.length > 0) {
            for (var k = 0; k < yearContent[i].lessons[j].codes.length; k++) {
                buttonContent = buttonContent + '<a target="_blank" href="' + yearContent[i].lessons[j].codes[k] + '">' +
                    '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="Colab" style="margin: 3px 3px;padding:4px 6px;background-color: #ff6f00; border-color: #ff6f00;">' +
                    '<i class="fa fa-code" aria-hidden="true"></i>' +
                    '</button>' +
                    '</a>'
            }
        }
        
        if (yearContent[i].lessons[j].url.length > 0) {
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

};


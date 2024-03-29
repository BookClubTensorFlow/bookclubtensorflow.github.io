/*
 結構：[課程清單,要預設顯示的課程位置]
*/

var activateYear={
    "2020":0, 
    "2022":2,
    "2023":0
}

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

function display_generator(year){

    var option_list = ""
    let yearData =  firebase.database().ref('/'+year);
    var content = ""
    let active_index = activateYear[String(year)]

    yearData.on('value', function(snapshot) {
    
    var lesson_info_dict=snapshot.val();
    
    for (var i = 0; i < lesson_info_dict.length; i++) {
        var origin_data = lesson_info_dict[i]

        option_list += "<li class='nav-item'>"+
                        "<a class='nav-link mb-sm-3 mb-md-0"
        if (i === active_index ){
            option_list += " active"
        }
                        
        option_list +=  "' data-toggle='tab' href='#"+lesson_info_dict[i].tag+"' role='tab' aria-controls='"+lesson_info_dict[i].tag+ "' aria-selected="
        
        if (i === 0 ){
            option_list += "'true'"
        }
        else{
            option_list += "'false'"
        }
    
        option_list +=" style='margin:10px'>"+lesson_info_dict[i].title+"</a>"+
                        "</li>"
        content +="<div class='tab-pane fade show"
        if (i === active_index ){
            content += " active"
        }
        content +="' id='"+lesson_info_dict[i].tag+"' role='tabpanel' aria-labelledby='"+lesson_info_dict[i].tag+"-tab'>"
        
        content += '<div class="card-profile-actions py-4 mt-lg-0" style="margin-top: 0rem !important;">' +
            '<h3 style="margin-bottom: 0rem !important;" class=" text-center"><small><b>' + lesson_info_dict[i].chapter_title + '</b></small></h3>' +
            '<h4 style="margin-bottom: 0rem !important;color: #97999b;" class="text-center"><small><b>' + lesson_info_dict[i].date + '</b></small></h4>' +
            '</div>'

        content = content + '<table class="table">' +
            '<thead>' +
            '<tr>' +
            '<th class="text-center" style="width:5vw;">堂數</th>' +
            '<th style="width:15vw;">時間</th>' +
            '<th style="width:60vw;">導讀內容</th>' +
            '<th style="width:20vw;">相關資料</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>'
        var chapter_list = origin_data.lessons
        var host_date_list=[]

        for(var j=0; j < chapter_list.length; j++)
            {   var date=chapter_list[j].host_date;
                if( ["尚未開始規劃","自行閱讀"].indexOf(date)===-1){
                    if(host_date_list.indexOf(date)===-1){
                        host_date_list.push(date)
                    }
                }
            }

        for (var j = 0; j < chapter_list.length; j++) {
            var chapter_relevent = chapter_list[j]

            if (chapter_relevent.host_date === "尚未開始規劃") {
                content = content + '<tr>' +
                    '<td class="text-center">─</td>' +
                    '<td></td>' +
                    '<td>' + chapter_relevent.chapter_title + '</td>' +
                    '<td>尚未開始規劃</td>' +
                    '</tr>'
            }
            else if (chapter_relevent.host_date === "自行閱讀") {
                content = content + '<tr style="background-color: #dee2e6;">' +
                    '<td class="text-center">─</td>' +
                    '<td></td>' +
                    '<td>' + chapter_relevent.chapter_title + '</td>' +
                    '<td>自行閱讀</td>' +
                    '</tr>'
            }
            else {
                content = content + '<tr>' +
                    '<td class="text-center">'+String(host_date_list.indexOf(chapter_relevent.host_date)+1)+'</td>' +
                    '<td>' + chapter_relevent.host_date + '</td>' +
                    '<td style="word-break: break-all;">' + chapter_relevent.chapter_title + '</td>' +
                    '<td class="td-actions">'
                
                if (chapter_relevent.video!== undefined) {
                    for (var k = 0; k < chapter_relevent.video.length; k++) {
                        content = content + '<a target="_blank" href="' + chapter_relevent.video[k] + '">' +
                        '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="錄影回放" style="margin: 3px 3px;padding:4px 9px;background-color: #FF0000; border-color: #FF0000;">' +
                        '<i class="fa fa-step-backward" aria-hidden="true"></i>' +
                            '</button>' +
                            '</a>'
                    }
        
                }

                if (chapter_relevent.sildes!== undefined) {
                    for (var k = 0; k < chapter_relevent.sildes.length; k++) {
                        content = content + '<a target="_blank" href="' + chapter_relevent.sildes[k] + '">' +
                            '<button type="button" rel="tooltip" class="btn btn-default btn-icon btn-sm" data-original-title="" title="投影片" style="margin: 3px 3px;background-color: #212832; border-color: #212832;">' +
                            '<i class="fa fa-play" aria-hidden="true"></i>' +
                            '</button>' +
                            '</a>'
                    }
                }
                if (chapter_relevent.codes!== undefined) {
                    for (var k = 0; k < chapter_relevent.codes.length; k++) {
                        content = content + '<a target="_blank" href="' + chapter_relevent.codes[k] + '">' +
                            '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="Colab" style="margin: 3px 3px;padding:4px 6px;background-color: #ff6f00; border-color: #ff6f00;">' +
                            '<i class="fa fa-code" aria-hidden="true"></i>' +
                            '</button>' +
                            '</a>'
                    }
                }
                
                if (chapter_relevent.url!== undefined) {
                    for (var k = 0; k < chapter_relevent.url.length; k++) {
                        content = content + '<a target="_blank" href="' + chapter_relevent.url[k] + '">' +
                            '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="相關網頁" style="margin: 3px 3px;padding:4px 7px;background-color: #0051ff; border-color: #0051ff;">' +
                            '<i class="fa fa-external-link" aria-hidden="true"></i>' +
                            '</button>' +
                            '</a>'
                    }
        
                }

                content = content + '</td>' + '</tr>'
            }

        }
        content = content + '</table></div>'
        document.getElementById('year_selection').innerHTML = year
        
    }
    document.getElementById("tabs-icons-text").innerHTML = option_list
    document.getElementById("myTabContent").innerHTML = content
    });
    var year_list=Object.keys(activateYear)
    for(var i=0;i<year_list.length;i++){
        document.getElementById(year_list[i]).classList.remove('active');

        if(year_list[i]===String(year)){
            document.getElementById(year_list[i]).classList.add('active');
        }
    }
}

//自動生成下拉選單選項
var year_array=Object.keys(activateYear)
var year_options=""

for(var i=0;i<year_array.length;i++){
    year_options=year_options+'<a class="dropdown-item" href="javascript:void(0)" onclick="display_generator('+year_array[i]+');"id="'+year_array[i]+'">'+year_array[i]+'</a>'
}

document.getElementById('dropdown_list').innerHTML = year_options

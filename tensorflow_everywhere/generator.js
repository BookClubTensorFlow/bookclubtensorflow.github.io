
function generator(date) {

    console.log(typeof(date))

    var origin_data = lesson_info_dict[date]

    var content = '<table class="table" style="width=100%>' +
            '<thead>' +
                '<tr style="color:#ff3600">' +
                    '<th>議程</th>' +
                    '<th>主講人</th>' +
                    '<th>演講主題</th>' +
                    '<th>相關資料</th>' +
                '</tr>' +
            '</thead>' +
        '<tbody>';

    var chapter_list = origin_data.lessons;

    for (var j = 0; j < chapter_list.length; j++) {
        var chapter_relevent = chapter_list[j]

        content = content+ '<tr'
        if(chapter_relevent.sildes.length===0 && chapter_relevent.codes.length===0&& chapter_relevent.video.length===0){
            content = content+ ' style="background-color: #dee2e6;"'
        }
        content = content +'>'  +
            '<td class="text-center" style="color:#212832" >' + String(j + 1) + '</td>' +
            '<td style="padding:5px 5px">' + '<h5>' + chapter_relevent.speaker + '</h5>' +
            '<h5><small>' + chapter_relevent.title + '</small></h5>' + '</td>' +
            '<td style="padding:5px 5px">' + chapter_relevent.topic + '</td>' +
            '<td class="td-actions align-items-center" style="padding:5px 5px">'

        if (chapter_relevent.video.length > 0) {
            for (var k = 0; k < chapter_relevent.video.length; k++) {
                content = content + '<a target="_blank" href="' + chapter_relevent.video[k] + '">' +
                    '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="錄影回放" style="margin: 3px 3px;padding:4px 9px;background-color: #FF0000; border-color: #FF0000;">' +
                    '<i class="fa fa-step-backward" aria-hidden="true"></i>' +
                    '</button>' +
                    '</a>'
            }

        }

        if (chapter_relevent.sildes.length > 0) {
            for (var k = 0; k < chapter_relevent.sildes.length; k++) {
                content = content + '<a target="_blank" href="' + chapter_relevent.sildes[k] + '">' +
                    '<button type="button" rel="tooltip" class="btn btn-default btn-icon btn-sm" data-original-title="" title="投影片" style="margin: 3px 3px;background-color: #212832; border-color: #212832;">' +
                    '<i class="fa fa-play" aria-hidden="true"></i>' +
                    '</button>' +
                    '</a>'
            }
        }

        if (chapter_relevent.codes.length > 0) {
            for (var k = 0; k < chapter_relevent.codes.length; k++) {
                content = content + '<a target="_blank" href="' + chapter_relevent.codes[k] + '">' +
                    '<button type="button" rel="tooltip" class="btn btn-warning btn-icon btn-sm" data-original-title="" title="Colab" style="margin: 3px 3px;padding:4px 6px;background-color: #ff6f00; border-color: #ff6f00;">' +
                    '<i class="fa fa-code" aria-hidden="true"></i>' +
                    '</button>' +
                    '</a>'
            }

        }
        
        if (chapter_relevent.url.length > 0) {
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

    content = content + '</tbody>' + '</table>'


    document.getElementById('cohort_list').innerHTML = content
    document.getElementById('year_selection').innerHTML = date
    document.getElementById('event_title').innerHTML = lesson_info_dict[date].event_title

    var event_array=Object.keys(lesson_info_dict)

    for(var i=0;i<event_array.length;i++){
        document.getElementById(String(i)).classList.remove('active');
        if(event_array[i]===String(date)){
            document.getElementById(String(i)).classList.add('active');
        }
    }
        
}

function ValidTime() {
    var today = new Date();
    var oMoth = (today.getMonth() + 1).toString();
    if (oMoth.length <= 1) oMoth = '0' + oMoth;
    var oDay = today.getDate().toString();
    var oHour = today.getHours();

    if (oMoth>=7&&oDay>=10&&oHour>=23){
        return true
    }
    else{
        return false
    }
}

//自動生成下拉選單選項
var event_array=Object.keys(lesson_info_dict)
var event_options=""

for(var i=0;i<event_array.length;i++){
    event_options=event_options+'<a class="dropdown-item" href="javascript:void(0)" onclick="generator('+event_array[i]+');"id="'+i+'">'+event_array[i]+'</a>'
   /* if(ValidTime()===false&&i===0){
        break
    }*/
}


document.getElementById('dropdown_list').innerHTML = event_options

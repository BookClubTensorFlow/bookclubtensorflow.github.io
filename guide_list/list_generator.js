
var year_dict={
    "2020":guide_dict_2020,
    "2022":guide_dict_2022,
    "2023":guide_dict_2023
}

function display_generator(year) {
    var content = '';
    for (var i = 0; i < year_dict[String(year)].length; i++) {
        content = content + '<div class="card card-profile shadow mt--300"'
        if (i > 0) { content = content + ' style="margin-top: 16px !important;"' }
        content = content + `<div class="px-1" > 
            <div class="mt-5 py-1 border-bottom text-center" style="margin-top: 0rem !important;padding:0px 20px"> 
                <div class="row col-lg-12 justify-content-center" style="padding: 0px 0px;margin: 0px"> 
                    <div class="col-lg-9 order-lg-1 text-lg-left align-self-lg-center"> 
                        <div class="card-profile-actions py-4 mt-lg-0" style="margin-top: 0rem !important;"> 
                            <h3 style="margin-bottom: 0rem !important;"><b style="color:#ff6f00">   ${year_dict[String(year)][i].banner}   </b><br><small><b>  ${year_dict[String(year)][i].chapter_title}  </b></small></h3> 
                        </div> 
                        </div> 
                            <div class="col-lg-3 order-lg-1 justify-content-center"> 
                            <div class="card-profile-stats d-flex justify-content-center" style="margin: 0rem !important; align-items: center;padding:24px 0px"> 
                        <div> 
                            <span class="heading"> ${year_dict[String(year)][i].chapters}  </span> 
                            <span class="description"><b>章節</b></span> 
                        </div> 
                        <div> 
                            <span class="heading">  ${year_dict[String(year)][i].guider_list.length}  </span> 
                            <span class="description"><b>導讀者</b></span> 
                        </div> 
                    </div> 
                </div> 
            </div> 
         </div>`
            
        //生成導讀者圖片區域
        content = content + '<div class="text-center mt-2" style="margin-top: 14px !important">'
        var guider_array = year_dict[String(year)][i].guider_list;

        if (guider_array.length > 0) {

            for (var j = 0; j < guider_array.length; j++) {
                if (j % 3 === 0) {
                    content = content + '<div class="row">'
                }
                if (guider_array[j].pic === undefined) {
                    guider_array[j].pic = '../assets/img/default.png'
                }
                content = content + '<div class="col-md-4">' +
                    '<img src="' + guider_array[j].pic + '" alt="Circle image" class="img-fluid rounded-circle shadow" style="width: 150px;">' +
                    '<h4>' + guider_array[j].name + '<br>'
                if (guider_array[j].details !== undefined) { content = content + '<small>' + guider_array[j].details + '</small>' }
                content = content + '</h4></div>'
                if (j % 3 === 2) {
                    content = content + '</div>'
                }
            }
        }
        else{
            content = content + '<h1>導讀者徵集中!!</h1>' 
        }
        content = content + '</div></div></div>'

    }
    document.getElementById('guide_list').innerHTML = content
    document.getElementById('year_selection').innerHTML =  year 
    
    var year_list=Object.keys(year_dict)
    for(var i=0;i<year_list.length;i++){
        document.getElementById(year_list[i]).classList.remove('active');

        if(year_list[i]===String(year)){
            document.getElementById(year_list[i]).classList.add('active');
        }
    }
}

//自動生成下拉選單選項
var year_array=Object.keys(year_dict)
var year_options=""

for(var i=0;i<year_array.length;i++){
    year_options=year_options+'<a class="dropdown-item" href="javascript:void(0)" onclick="display_generator('+year_array[i]+');"id="'+year_array[i]+'">'+year_array[i]+'</a>'
}

document.getElementById('dropdown_list').innerHTML = year_options

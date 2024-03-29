

async function runSample() {

    var youtubeData = firebase.database().ref('/youtube');

    // console.log("youtubeData",youtubeData)

    youtubeData.on('value', function(snapshot) {

        const videoTemplate = `
            <iframe src="https://www.youtube.com/embed/${snapshot.val().videoId}?rel=0"  class="rounded col-lg-12 mr-auto mt-4 shadow" style=" background-color: #000000; padding:0px; width: 100%;
            aspect-ratio: 16 / 9;
                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" 
                allowfullscreen>
            </iframe>`;

        let publishDate = new Date(snapshot.val().publishTime);

        const videoDetailsTemplate = `
            <p class="h4 card-title mb-3" style="color: #ff3600;">${snapshot.val().title}</p>
            <p class="card-description h6">${snapshot.val().description}</p>
            <p class="card-text text-md font-weight-bold">發布日期：${publishDate.getFullYear()}年${publishDate.getMonth()+1}月${publishDate.getDate()}日</p>
            
            `;

        document.getElementById("recentVideo").innerHTML = videoTemplate
        document.getElementById("recentVideoContent").innerHTML = videoDetailsTemplate

    })
}

runSample().catch(err => console.error(err));

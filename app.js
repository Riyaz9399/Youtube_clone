const videoCardContainer = document.querySelector(".video-container");


let api_key = "AIzaSyD4csAGVN-K7sII7Gs_TeiTIMvgvLPW8eE";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"



fetch(video_http + new URLSearchParams({
    key :api_key,
    part :"snippet",
    chart : "mostPopular",
    maxResult :70,
    regionCode :"IN"
}))
.then(res => res.json())
.then(data =>{
    // console.log(data);
    data.items.forEach(item =>{
        getChannelIcon(item);
    })
})
.catch(err =>{
    console.log(err);
})

const getChannelIcon = (video_data) => {
 fetch(channel_http + new URLSearchParams({
    key :api_key,
    part :"snippet",
    id : video_data.snippet.channelId
 }))
 .then(res => res.json())
 .then(data =>{
    // console.log(data);
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    // console.log(video_data);
    makeVideoCard(video_data);
 })
}

const makeVideoCard = (data) =>{
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href= 'https://youtube.com/watch?v=${data.id}'">
      <img src="${data.snippet.thumbnails.high.url}" class="thumbnail"/>
      <div class="content">
          <img src="${data.channelThumbnail}" class="channel-icon"/>
          <div class="info">
              <h4 class="title"> ${data.snippet.title}</h4>
              <p class="channel-name">${data.snippet.channelTitle}</p>
          </div>
      </div>
    </div>`;
}


// search bar
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click",() =>{
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})
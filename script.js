let allsongs = {
  1: {
    id:1,
    name: "Chill Day",
    artist: "LAKEY INSPIRED",
    src: "songs/chill-days.mp3",
    cover: "songs/cover-img/chill-days.jpg"
  },
  2: {
    id:2,
    name: "Whistles",
    artist: "alex",
    src: "songs/whistles-alex.mp3",
    cover: "songs/cover-img/whistles-alex.avif"
  },
  3: {
    id:3,
    name: "Fun Dayy",
    artist: "LAKEY INSPIRED",
    src: "songs/fundayy.mp3",
    cover: "songs/cover-img/fundayy.avif"
  }
};
let totalSongs = Object.keys(allsongs).length;







//load all the songs in albums
let album_container = document.querySelector(".album-card-container");

for (const key in allsongs) {

   let song = allsongs[key];

   let div = document.createElement('div');
   div.className = "album-card";
   div.setAttribute("data-id",song.id);
 
   div.innerHTML = `
     <img src="${song.cover}" alt="" class="album-img">
     <h4 class="album-name">${song.name}</h4>
   `
   div.addEventListener(('click'),()=>{
    currentSong = song.id;
    loadSongDetails(currentSong);
    audio.play();
    playbtnimg.src = "assests/pause.svg";
   })

   album_container.appendChild(div)
}



//big-song-card-details
let crntImg_b = document.querySelector(".crnt-card-big");
let crntSongName_b = document.querySelector(".crnt-song-big");
let crntArtist_b = document.querySelector(".crnt-artist-big");
let playbtn = document.querySelector(".play-big");
let playbtnimg = document.querySelector(".play-big-img");
let prevsong = document.querySelector(".next-big");
let nextsong = document.querySelector(".prev-big");
let audio = document.getElementById("audio");
//times
let totalTime = document.querySelectorAll(".total-time-big")
let remainTime = document.querySelectorAll(".remain-time-big")
//bottom-card
let crntImg_sm = document.querySelector(".bottom-img");
let crntSongName_sm = document.querySelector(".songname");
let crntArtist_sm = document.querySelector(".songartist");
//seekbar div
let seekbar = document.querySelectorAll(".fill-seekbar-big");
let seekbarContainer = document.querySelectorAll(".seekbar-big");




//by default the first song is current song
let currentSong = 1;

function loadSongDetails(index) {

crntImg_b.src = allsongs[index].cover;
crntArtist_b.innerText = allsongs[index].artist;
crntSongName_b.innerText = allsongs[index].name;
crntImg_sm.src = allsongs[index].cover;
crntSongName_sm.innerText = allsongs[index].name;
crntArtist_sm.innerText = allsongs[index].artist;
audio.src = allsongs[index].src;

}
loadSongDetails(currentSong);




//PrevSongBtn
let songMsg = document.getElementById("song-msg")
console.log(songMsg);

prevsong.addEventListener(('click'),()=>{
if(currentSong > 1){
   currentSong = currentSong-1;
   loadSongDetails(currentSong);
   audio.play()
   playbtnimg.src = "assests/pause.svg";
   songMsg.innerHTML = '';
}else{
  songMsg.innerHTML = 'No previous song available';
}
})

//nextSongBtn
nextsong.addEventListener(('click'),()=>{
if(currentSong < totalSongs){
   currentSong = currentSong+1;
   loadSongDetails(currentSong);
   audio.play()
   playbtnimg.src = "assests/pause.svg";
   songMsg.innerHTML = '';
}else{
  songMsg.innerHTML = 'No next song available';
}
})
 


// Click to toggle play/pause
playbtn.addEventListener('click',()=>{
 if (audio.paused) {
    audio.play(); //plays audio
    playbtnimg.src = "assests/pause.svg";
 }else{
    audio.pause();
    playbtnimg.src = "assests/play.svg"
 } 
})





//songTiming
audio.addEventListener('loadedmetadata',()=>{
     let totalsec = audio.duration; 
     totalmin = Math.floor(totalsec/60);
     totalsec = Math.floor(totalsec % 60);
     if(totalmin<10){totalmin = "0"+totalmin}
     if(totalsec<10){totalsec = "0"+totalsec}
    totalTime.forEach(element => {
      element.innerText = `${totalmin}:${totalsec}`
    });
})


audio.addEventListener('timeupdate',()=>{
  let TotalSec = Math.floor(audio.currentTime)
  let crntMin = Math.floor(TotalSec/60)
  let crntSec = TotalSec%60;
  if(crntMin<10){ crntMin = "0"+ crntMin}
  if(crntSec<10){ crntSec = "0"+ crntSec}
  remainTime.forEach(element => {
    element.innerText = `${crntMin}:${crntSec}`
  });
  
})



//seekbar
audio.addEventListener('timeupdate',()=>{
  let totalsec = audio.duration;
  let remainSec = audio.currentTime;
  let percentage = Math.floor((remainSec/totalsec) * 100);
  seekbar.forEach((element)=>{
    element.style.width = `${percentage}%`
  })
  
})



seekbarContainer.forEach((element)=>{
  element.addEventListener("click",(e)=>{
  let barWidth = element.clientWidth; 
  let clickX = e.offsetX;
  let ClickPercentage = clickX/barWidth;
  
  audio.currentTime = ClickPercentage * audio.duration;

  })
})
// clientWidth = the width of the bar in pixels




//VolumeBtn
let VolumeBtn = document.querySelector(".vol-range");
let VolImg = document.querySelector(".vol-img");
VolumeBtn.addEventListener('click',()=>{
 let value = VolumeBtn.value;
 console.log(value/100);
 audio.volume = value/100;
 
 if(audio.volume == 0){
   VolImg.src = 'assests/mute.svg'
 }else{
   VolImg.src = 'assests/volume.svg'
 }
})


//volumeBtn-Mobile
let VolumeBtnMobile = document.querySelector(".vol-input-mobile");
let VolImgMobile = document.querySelector(".vol-img-mobile");
VolumeBtnMobile.addEventListener('click',()=>{
 let value = VolumeBtnMobile.value;
 console.log(value/100);
 audio.volume = value/100;
 
 if(audio.volume == 0){
   VolImgMobile.src = 'assests/mute.svg'
 }else{
   VolImgMobile.src = 'assests/volume.svg'
 }
})




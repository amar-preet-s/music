
let songs = [{"name":"Fade away",
              "time":"03:32",
              "last-date-added":"29-08-2021",
              "playing":true ,
              "Genre":"sad" ,
              "src":"Songs/alan-walker-faded.mp3"},
              {"name":"Closer",
              "time":"04:07",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"happy" ,
              "src":"Songs/Closer - The Chainsmokers.mp3"},
              {"name":"Despacito",
              "time":"03:48",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"party" ,
              "src":"Songs/despacito-ft-daddy-yankee.mp3"},
              {"name":"Dusk Till Dawn",
              "time":"04:27",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"sad" ,
              "src":"Songs/Dusk Till Dawn.mp3"},
              {"name":"I Hate You",
              "time":"04:29",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"sad" ,
              "src":"Songs/gnash - i hate u, i love u (ft. olivia o brien).mp3"},
              {"name":"Let me love you",
              "time":"04:30",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"Love" ,
              "src":"Songs/let-me-love-you.mp3"},
              {"name":"Girls like you",
              "time":"04:30",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"party" ,
              "src":"Songs/maroon-5-girls-like-you.mp3"},
              {"name":"Right now",
              "time":"03:21",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"party" ,
              "src":"Songs/Nick_Jonas_Robin_Schulz_Right_Now.mp3"},
              {"name":"perfect",
              "time":"04:20",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"love" ,
              "src":"Songs/Perfect.mp3"},
              {"name":"See you again",
              "time":"03:49",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"happy" ,
              "src":"Songs/see-you-again-ft-charlie-puth.mp3"},
              {"name":"Senorita",
              "time":"03:17",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"party" ,
              "src":"Songs/senorita (mp3cut.net) (1).mp3"},
              {"name":"Taki Taki",
              "time":"03:32",
              "last-date-added":"29-08-2021",
              "playing":false ,
              "Genre":"party" ,
              "src":"Songs/taki-taki-mp3-free-download.mp3"},
]; 

let rewind = document.querySelector(".rewind");
let playpausebtn = document.querySelector(".play-pause");
let forward = document.querySelector(".forward");
let timer = document.querySelector(".timer");
let volume = document.querySelector(".volume");

let startmin = document.querySelector(".minute");
let startsec = document.querySelector(".second");
let endmin = document.querySelector(".end-minute");
let endsec = document.querySelector(".end-second");

let volumeBtn = document.querySelector(".volume");
let volumeSliderContainer = document.querySelector(".volumeSliderContainer");
let volumeSlider = document.getElementById("volumeSlider");

let trackindex = 0;
let current;
let songplaying = false;

let source = document.querySelector("#source");
let player = document.querySelector("#player");

forward.addEventListener("click", function () {
  songplaying = false;
  playpausebtn.innerText = "play_circle_filled";
  player.load();
  setTimeout(() => {
    playpausebtn.click();
  }, 300);
  document.querySelector(".playing").classList.remove("playing");
  nextTrack();
});

rewind.addEventListener("click", function () {
  console.log("you must have clicked the rewind");
 
  songplaying = false;
  playpausebtn.innerText = "play_circle_filled";
  player.load();
  setTimeout(() => {
    playpausebtn.click();
  }, 300);
  document.querySelector(".playing").classList.remove("playing");
  prevTrack();
});
function nextTrack() {
  songs[trackindex]["playing"] = false;
  if (trackindex < songs.length - 1) {
    trackindex += 1;
  } else trackindex = 0;
  source.src = songs[trackindex]["src"];
  var nexttarget = document.getElementsByClassName(`song-no-${trackindex}`);
  console.log(nexttarget);
  songs[trackindex]["playing"] = true;
  nexttarget[0].classList.add("playing");
}

function prevTrack() {
  console.log("prevtrack " + typeof trackindex);
  if (trackindex > 0) trackindex -= 1;
  else trackindex = songs.length - 1;
  source.src = songs[trackindex]["src"];
  console.log(trackindex);
  var nexttarget = document.getElementsByClassName(`song-no-${trackindex}`);
  nexttarget[0].classList.add("playing");
}


volumeSlider.addEventListener("change", function (e) {
  const volume = e.target.value;
  volumeSlider.value = volume;
  player.volume = volume;
});


playpausebtn.addEventListener("click", function () {
  if (!songplaying) {
    songplaying = true;
    playpausebtn.innerText = "pause_circle_outline";
    player.play();
    console.log("play in playpausebtn");
  } else {
    songplaying = false;
    playpausebtn.innerText = "play_circle_filled";
    player.pause();
    console.log("pause in playpausebtn");
  }
});

let timerInterval;
let second = 0;
let minute = 0;

let progbar = document.querySelector(".progress-bar-container");

progbar.addEventListener("click", function (e) {
  player.currentTime = (e.offsetX / progbar.offsetWidth) * player.duration;
});

function updateProgressBar(e) {
  //updating progress bar

  let { currentTime, duration } = e.srcElement;
  timer.style.width = Math.floor((currentTime / duration) * 100) + "%";

  // Calculate display for duration
  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  // Delay switching duration Element to avoid NaN
  if (durationSeconds) {
    if (durationMinutes < 10) {
      durationMinutes = `0${durationMinutes}`;
    }
    endmin.innerText = durationMinutes;
    endsec.innerText = durationSeconds;
  }

  // Calculate display for currentTime
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  startmin.innerText = currentMinutes;
  startsec.innerText = currentSeconds;
}
player.addEventListener("timeupdate", updateProgressBar);

function addactive(e) {
  current = document.querySelector(".playing");
  console.log(current);
  if (current) {current.classList.remove("playing");
    songs[trackindex]["playing"] = false;}

  e.currentTarget.classList.add("playing");
}

// ----
$(".search-bar").focus(function(){
    $(this).text("");
    $(this).css({"border":"1px solid silver","border-radius":"4px"});
})

$(".search-bar").blur(function(){
    if($(this).text()== ""){
        $(this).text("Search....");
    }
    $(this).css({"border":"","border-radius":""});
})

$(".song-player-container").scroll(function () {

 let scroll_top = $(".song-player-container").scrollTop();
  if (scroll_top > 400) {
    $('.song-head-bar').addClass('headbar-stick');
  }
  if (scroll_top < 401) {
    $('.song-head-bar').removeClass('headbar-stick');
  }

});

// adding songs in web we get ["language","artist"] in data
function addSongs(song_data){

    for(let i = 0;i<song_data.length;i++){
      let song_row = `  <div class="songs song-no-${i} ${song_data[i]["playing"]?"playing":""}">
                          <div class="song-number-col">${i+1}</div>
                          <div class="song-title-col song-title">${song_data[i]["name"]}</div>
                          <div class="last-date-added-col song-date">${song_data[i]["last-date-added"]}</div>
                          <div class="time-col song-schedule">${song_data[i]["time"]}</div>
                          <div class="gen-col song-play">${song_data[i]["Genre"]}</div>
                          
                        </div>`;
      $(".songs-list").append(song_row);
    }
  addEventListenerSongs();

}



function addEventListenerSongs(){
  document.querySelectorAll(".songs").forEach((item) => {
    item.addEventListener("click", function (e) {
      console.log("select songs");
      addactive(e);
      let i = e.currentTarget.classList[1].split("-")[2]; //getting id of current song to get its url
      trackindex = parseInt(i);
      songs[trackindex]["playing"] = true;
      source.src = songs[i]["src"];
      songplaying = false;
      playpausebtn.innerText = "play_circle_filled";
      player.load();
      setTimeout(() => {
        playpausebtn.click();
      }, 100);
      updateProgressBar(e);
    });
  });
}
function addPlaylist(){
  $(".player-container").append(`<div class="playlist-queues">
                                    <div class="playlist-heading">Playlists</div>
                                    <div class="playlists-section">
                                  </div>`);
  $(".playlists-section").html("");
  for(let i of Object.keys(playlist)){
    let pList = `<div class="playlist-container ${i}">
                      <div class="playlist-img"><img class="picture" src="${playlist[`${i}`]["pic"]}"/></div>
                      <div class="playlist-play-icon-container"><div class="material-icons playlist-play-icon">play_arrow</div></div>
                      <div class="playlist-content">${playlist[`${i}`]["name"]}</div>
                  </div>`;
    $(".playlists-section").append(pList);
  }

}


addSongs(songs);
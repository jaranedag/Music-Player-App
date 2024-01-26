let progress = document.getElementById("progress");
let song = document.getElementById("audio");
let ctrlIcon = document.getElementById("ctrlIcon");
let currentTimeSpan = document.getElementById("current-time");
let totalTimeSpan = document.getElementById("total-time");

const songs = ["img/lost-in-city-lights.mp3", "img/forest-lullaby-110624.mp3"];
const songTitles = ["Lost in the City Lights", "Forest Lullaby"];
const images = ["img/cover-1.png", "img/cover-2.png"];

let currentSongIndex = 0;



song.addEventListener('loadedmetadata', function () {
    progress.max = song.duration;
});

function loadAndPlayCurrentSong() {
    if (currentSongIndex >= 0 && currentSongIndex < songs.length) {
        song.src = songs[currentSongIndex];
        song.load();

        song.addEventListener('loadedmetadata', function () {
            progress.max = song.duration;
        });

        song.addEventListener('loadeddata', function () {
            song.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
            updateTimeSpans(song.currentTime, song.duration);
        });

        song.addEventListener('error', function (error) {
            console.error('Error loading audio:', error);
        });
    } else {
        console.error('Invalid song index:', currentSongIndex);
    }
}



function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");

    }else{
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");

    }
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadAndPlayCurrentSong();
    updateSongInfo();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadAndPlayCurrentSong();
    updateSongInfo();
}

function updateSongInfo() {
    document.getElementById("appImage").src = images[currentSongIndex];
    document.getElementById("songTitle").textContent = songTitles[currentSongIndex];
}


setInterval(() =>{
    progress.value = song.currentTime;
    let percentage = (song.currentTime / song.duration * 100);
    let gradientColor = `linear-gradient(to right, #C93B76 0%, #C93B76 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
    progress.style.background = gradientColor;
    updateTimeSpans(song.currentTime, song.duration);

},500)
//E5E7EB  C93B76

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime
        let percentage = (song.currentTime / song.duration * 100);
        let gradientColor = `linear-gradient(to right, #C93B76 0%, #C93B76 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
        progress.style.background = gradientColor;
    },500)
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    updateTimeSpans(song.currentTime, song.duration);
}

function updateTimeSpans(currentTime, duration) {
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    let totalMinutes = Math.floor(duration / 60);
    let totalSeconds = Math.floor(duration % 60);

    currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    totalTimeSpan.textContent = `${totalMinutes}:${totalSeconds}`;
}


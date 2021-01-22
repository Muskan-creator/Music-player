
const music = document.querySelector("audio");
const img = document.querySelector("img.bgImage");
const play = document.getElementById("play");
const artist = document.getElementById("playlist_artist");
const title = document.getElementById("playlist_title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let progress =document.getElementById("progress");
const progress_div =document.getElementById("progress_div");
let tot_duration =document.getElementById("duration");
let tot_curr_time =document.getElementById("curr_time");
let volume=document.getElementById("volumeslider");
let like= document.getElementById("heart");


const songs=[{
	image:"ncs2",
	name:"Elektronomia",
	title:"Elektronomia",
	artist:"Elektronomia-Sky High [NCS Release]",


},
{
	image:"ncs1",
	name:"Cartoon-On-&-On",
	title:"Cartoon - On & On",
	artist:"(feat. Daniel Levi)`[NCS Release]",


},
{
	image:"ncs3",
	name:"Johnning",
	title:"Janji-Heroes ",
	artist:"(feat. Johnning)[NCS Release]",


},
{
	image:"ncs4",
	name:"Popsicle",
	title:"Popsicle",
	artist:"popsicle LFZ -[NCS Release]",


},
{ image:"ncs5",
	name:"Fearless",
	title:"Lost Sky-Fearless",
	artist:"(feat. Chris Linton) [NCS Release]",


},

];

let isPlaying = false;
const playMusic = () => {
	isPlaying = true;
	music.play();
	play.classList.replace("fa-play",  "fa-pause");
	img.classList.add("anime");
	};
	  
// for pause functionality 
const pauseMusic = () => {
	isPlaying = false;
	music.pause();
	play.classList.replace("fa-pause",  "fa-play");
	img.classList.remove("anime");
};

play.addEventListener("click", () => {

	isPlaying ? pauseMusic() : playMusic();
});

 let count = 0;
    const setcolor=()=> {
		
        if (count == 0) {
            like.style="color:red";
            count = 1;        
        }
        else {
            like.style.color="white";
            count = 0;
        }
	};




const loadSong=(songs)=>{

	title.textContent = songs.title;
	artist.textContent =songs.artist;
	music.src ="music/"+songs.name+".mp3";
	img.src="images/"+songs.image+".jpg";
};

songIndex=0;


const nextSong =()=>{
	songIndex=(songIndex + 1)  % songs.length;
	loadSong(songs[songIndex]);
	playMusic();

}
const prevSong =() =>{
	songIndex =(songIndex-1+ songs.length) % songs.length;
	loadSong(songs[songIndex]);
	playMusic();
};

const setvolume =()=>{
	music.volume = volumeslider.value / 100;
}



// progress jswork
music.addEventListener('timeupdate',(event) =>{
	
const {currentTime,duration} = event.srcElement;



let progress_time=(currentTime /duration) *100;
progress.style.width =`${progress_time}%`;



let min_duration =Math.floor(duration / 60);
let sec_duration =Math.floor(duration % 60);
let total_duration =`${min_duration}:${sec_duration}`;
if(duration){
tot_duration.textContent= `${total_duration}`;
}

let min_currentTime =Math.floor(currentTime/ 60);
let sec_currentTime =Math.floor(currentTime% 60);

if(sec_currentTime<10){
	sec_currentTime=`0${sec_currentTime}`;}
	let total_currentTime =`${min_currentTime}:${sec_currentTime}`;
tot_curr_time.textContent= `${total_currentTime}`;



});
progress_div.addEventListener('click',(event)=>{
console.log(event);
const{duration } =music;

let move_progress= ( event.offsetX/event.srcElement.clientWidth)*duration;

music.currentTime = move_progress;
	

});

//music end then next song
music.addEventListener('ended',nextSong);

volume.addEventListener('mousemove',setvolume);
like.addEventListener('click',setcolor);
next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);



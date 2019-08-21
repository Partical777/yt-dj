import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(public sanitizer: DomSanitizer){}

  player1;
  subscription: Subscription;

  playing1 = true;
  playing2 = false;
  loop = true;
  shuffle = false;

  volumn = 50;
  time = 0;



  Playlist = 'https://www.youtube.com/playlist?list=PLxySa8Rx-er9SUSOEbDh1KwguS2y9BL_D';
  PlaylistID = "PLxySa8Rx-er9SUSOEbDh1KwguS2y9BL_D";
  GenerateURL(){
    this.PlaylistID = this.Playlist.slice(38);
    this.player1.loadPlaylist({list : this.PlaylistID, index : 0});
  }



  ngAfterViewInit() {
    const doc = (<any>window).document;
    let playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }

  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player1 = new (<any>window).YT.Player('player1', {
        border: '5px solid red',
        height: '390',
        width: '640',
        playerVars: {
          'autoplay': 1, 
          'controls': 2,
          'cc_load_policy': 0,
          },
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      });
    };

    const source = interval(2000);
    this.subscription = source.subscribe(val => this.getTimeTimely());
  }

  onPlayerReady(event) {
    event.target.loadPlaylist({list : "PLxySa8Rx-er9SUSOEbDh1KwguS2y9BL_D", index : 0});
    document.getElementById('player1').style.width = "80vh";
    document.getElementById('player1').style.height = "46vh";
    document.getElementById('player1').style.position = "fixed";
    document.getElementById('player1').style.clipPath = "circle(30% at 50% 50%)";
    document.getElementById('player1').style.animation = "rotation 10s infinite linear";
  }

  
  onPlayerStateChange(event) {
    if (event.data == -1) {
      
    }
  }
  



  
  playVideo() {
    this.player1.playVideo();
    this.playing1 = true;
    document.getElementById('player1').style.animationPlayState = "running";
    document.getElementById('arm-image').style.animationPlayState = "running";
  }

  pauseVideo() {
    this.playing1 = false;
    this.player1.pauseVideo();
    document.getElementById('player1').style.animationPlayState = "paused";
    document.getElementById('arm-image').style.animationPlayState = "paused";
  }

  nextVideo() {
    this.player1.nextVideo();
    document.getElementById('nextIcon').style.animation = "shine 1.0s 3 ease-in";
    document.getElementById('nextIcon').addEventListener('webkitAnimationEnd', function(){
        this.style.webkitAnimationName = '';
    }, false)

    if(!this.playing){
      this.playVideo();
    }
  }

  previousVideo() {
    this.player1.previousVideo();
    document.getElementById('lastIcon').style.animation = "shine 1.0s 3 ease-in";
    document.getElementById('nextIcon').addEventListener('webkitAnimationEnd', function(){
        this.style.webkitAnimationName = '';
    }, false)

    if(!this.playing){
      this.playVideo();
    }
  }

  loopSet() {
    this.loop = !this.loop;
    this.player1.setLoop(this.loop);
  }

  shuffleSet() {
    this.shuffle = !this.shuffle;
    this.player1.setShuffle(this.shuffle);
  }

  changeVolumn() {
    this.player1.setVolume(this.volumn);
  }

  getTimeTimely() {
    this.time = this.player1.getCurrentTime()/this.player1.getDuration()*100;
  }
  
  changeCurrentTime(time){
    this.player1.seekTo(time / 100 * this.player1.getDuration());
    this.time = this.player1.getCurrentTime()/this.player1.getDuration()*100;
    console.log(this.player1.getCurrentTime()/this.player1.getDuration()*100);

    document.getElementById('arm-image').style.animationDelay = "-" + this.player1.getCurrentTime() + "s";
  }
  
}

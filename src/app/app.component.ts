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
  player2;

  subscription: Subscription;

  playing1 = true;
  playing2 = true;
  loop1 = true;
  shuffle1 = false;
  loop2 = true;
  shuffle2 = false;

  volumn1 = 50;
  time1 = 0;
  volumn2 = 50;
  time2 = 0;



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

      this.player2 = new (<any>window).YT.Player('player2', {
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

    const source1 = interval(2000);
    this.subscription = source1.subscribe(val => this.getTimeTimely1());
    const source2 = interval(2000);
    this.subscription = source2.subscribe(val => this.getTimeTimely2());
  }

  onPlayerReady(event) {
    event.target.loadPlaylist({list : "PLxySa8Rx-er9SUSOEbDh1KwguS2y9BL_D", index : 0});
    document.getElementById('player1').style.width = "80vh";
    document.getElementById('player1').style.height = "46vh";
    document.getElementById('player1').style.position = "fixed";
    document.getElementById('player1').style.clipPath = "circle(30% at 50% 50%)";
    document.getElementById('player1').style.animation = "rotation 10s infinite linear";

    document.getElementById('player2').style.width = "80vh";
    document.getElementById('player2').style.height = "46vh";
    document.getElementById('player2').style.position = "fixed";
    document.getElementById('player2').style.clipPath = "circle(30% at 50% 50%)";
    document.getElementById('player2').style.animation = "rotation 10s infinite linear";
  }

  
  onPlayerStateChange(event) {
    if (event.data == -1) {
      
    }
  }
  



//===============1===================
  playVideo1() {
    this.player1.playVideo();
    this.playing1 = true;
    document.getElementById('player1').style.animationPlayState = "running";
    document.getElementById('arm-image').style.animationPlayState = "running";
  }

  pauseVideo1() {
    this.playing1 = false;
    this.player1.pauseVideo();
    document.getElementById('player1').style.animationPlayState = "paused";
    document.getElementById('arm-image').style.animationPlayState = "paused";
  }

  nextVideo1() {
    this.player1.nextVideo();
    document.getElementById('nextIcon').style.animation = "shine 1.0s 3 ease-in";
    document.getElementById('nextIcon').addEventListener('webkitAnimationEnd', function(){
        this.style.webkitAnimationName = '';
    }, false)

    if(!this.playing1){
      this.playVideo1();
    }
  }

  previousVideo1() {
    this.player1.previousVideo();
    document.getElementById('lastIcon1').style.animation = "shine 1.0s 3 ease-in";
    document.getElementById('nextIcon1').addEventListener('webkitAnimationEnd', function(){
        this.style.webkitAnimationName = '';
    }, false)

    if(!this.playing1){
      this.playVideo1();
    }
  }

  loopSet1() {
    this.loop1 = !this.loop1;
    this.player1.setLoop(this.loop1);
  }

  shuffleSet1() {
    this.shuffle1 = !this.shuffle1;
    this.player1.setShuffle(this.shuffle1);
  }

  changeVolumn1() {
    this.player1.setVolume(this.volumn1);
    //same time
    this.volumn2 = 100 - this.volumn;
    this.player2.setVolume(this.volumn2);
  }

  getTimeTimely1() {
    this.time1 = this.player1.getCurrentTime()/this.player1.getDuration()*100;
  }
  
  changeCurrentTime1(time){
    this.player1.seekTo(time / 100 * this.player1.getDuration());
    this.time1 = this.player1.getCurrentTime()/this.player1.getDuration()*100;
    console.log(this.player1.getCurrentTime()/this.player1.getDuration()*100);

    document.getElementById('arm-image').style.animationDelay = "-" + this.player1.getCurrentTime() + "s";
  }





  //===============2===================
  playVideo2() {
    this.player2.playVideo();
    this.playing2 = true;
    document.getElementById('player2').style.animationPlayState = "running";
    document.getElementById('arm-image').style.animationPlayState = "running";
  }

  pauseVideo2() {
    this.playing2 = false;
    this.player2.pauseVideo();
    document.getElementById('player2').style.animationPlayState = "paused";
    document.getElementById('arm-image').style.animationPlayState = "paused";
  }

  nextVideo2() {
    this.player2.nextVideo();
    document.getElementById('nextIcon2').style.animation = "shine 1.0s 3 ease-in";
    document.getElementById('nextIcon2').addEventListener('webkitAnimationEnd', function(){
        this.style.webkitAnimationName = '';
    }, false)

    if(!this.playing1){
      this.playVideo2();
    }
  }

  previousVideo2() {
    this.player2.previousVideo();
    document.getElementById('lastIcon').style.animation = "shine 1.0s 3 ease-in";
    document.getElementById('nextIcon').addEventListener('webkitAnimationEnd', function(){
        this.style.webkitAnimationName = '';
    }, false)

    if(!this.playing1){
      this.playVideo2();
    }
  }

  loopSet2() {
    this.loop2 = !this.loop2;
    this.player2.setLoop(this.loop2);
  }

  shuffleSet2() {
    this.shuffle2 = !this.shuffle2;
    this.player2.setShuffle(this.shuffle2);
  }

  changeVolumn2() {
    this.player2.setVolume(this.volumn2);
    //same time
    this.volumn1 = 100 - this.volumn2;
    this.player1.setVolume(this.volumn1);
  }

  getTimeTimely2() {
    this.time2 = this.player2.getCurrentTime()/this.player2.getDuration()*100;
  }
  
  changeCurrentTime2(time){
    this.player2.seekTo(time / 100 * this.player1.getDuration());
    this.time2 = this.player2.getCurrentTime()/this.player2.getDuration()*100;
    console.log(this.player2.getCurrentTime()/this.player2.getDuration()*100);

    document.getElementById('arm-image').style.animationDelay = "-" + this.player2.getCurrentTime() + "s";
  }
  
}

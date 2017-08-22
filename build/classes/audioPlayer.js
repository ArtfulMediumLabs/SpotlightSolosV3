/**
 * audioPlayer.js
 * --------------
 * A class to create and autio player and control set
 */

class AudioPlayer {
	constructor(options) {
		this.containerID = options.containerID;
		this.playBtnID = options.playBtnID;
		this.pauseBtnID = options.pauseBtnID;
		this.songSrc = options.songSrc;
		this.player = new Tone.Sampler(this.songSrc, function(){}).toMaster();
		// this.player - new Audio();
		// this.loadSong();
		this.toggleLoop();
		this.enableControls();
	}

	// loadSong() {
	// 	this.player.src = this.songSrc;
	// }

	toggleLoop() {
		this.player.loop = !this.player.loop;
	}

	enableControls() {
		var playBtn = document.querySelector(this.playBtnID);
		var pauseBtn = document.querySelector(this.pauseBtnID);

		var _this = this;

		playBtn.addEventListener('click', function() {
			_this.player.triggerAttack();
			this.style.display = 'none';
			pauseBtn.style.display = 'block';
		}, false);

		pauseBtn.addEventListener('click', function() {
			_this.player.triggerRelease();
			this.style.display = 'none';
			playBtn.style.display = 'block';
		}, false);
	}
}
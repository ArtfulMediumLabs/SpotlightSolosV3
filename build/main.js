/**
 * main.js
 * -------
 * The main functions that run the application. Contains functions that will * call upon custom classes and make decisions in the application.
 */

mixpanel.track("Page Loaded");

/**
 * Build a song
 * ------------
 * Build an audio player and fretboard blocks for a single song. Used on 
 * single page songs.
 */
function buildSong(songSrc, blockArray) {
	// Create a new audio player for this song
	var audioPlayer = new AudioPlayer({
		songSrc: songSrc,
		containerID: '#audio-controls',
		playBtnID: '#play-btn',
		pauseBtnID: '#pause-btn',
	});
	
	if(blockArray) 
	var fretBoard = new FretBoard({
		bodyID: '#fret-board',
		blocks: blockArray
	});
}

/**
 * Song List Controls
 * ------------------
 * Build audio player and controls for front page song list
 */
function enableSonglistControls(songlistID) {
	// Get a reference to this song list adn its' songs
	var songList = document.querySelector(songlistID);
	var songs = songList.children;

	// Initialize an empty object to store key:value pairs for each
	// song's title and source file. Later will be passed to a Tone.js
	// Multiplayer sampler
	var songSources = {};

	// Wait for DOM to load and begin building multitrack audio sampler
	window.addEventListener('DOMContentLoaded', function(e) {
		// Loop through all songs in this playlist
		for(var i = 0; i < songs.length; i++) {
			// Build a key:value pair for this song and add to songSources
			var songTitle = songs[i].children[2].innerHTML;
			var songSrc = songs[i].children[0].getAttribute('data-src');
			songSources[songTitle] = songSrc;
		}

		// Build a multisampler with Tone.js - pass songSources object
		var multiPlayer = new Tone.MultiPlayer(songSources, function(){}).toMaster();

		// Add Event Listeners to each song's audio buttons
		for(var i = 0; i < songs.length; i++) {
			// Get song's play and stop buttons
			var playBtn = songs[i].children[0];
			var stopBtn = songs[i].children[1];

			// Play button listener
			playBtn.addEventListener('click', function(e) {
				// Stop redirect to song's single page
				e.stopImmediatePropagation();
				// Hide all stop buttons
				hideAllStopButtons(songs);
				// Show all of the play buttons
				showAllPlayButtons(songs);
				// Get this play buttons's song title and stop button
				var songTitle = this.parentElement.children[2].innerHTML;
				var thisStopBtn = this.parentElement.children[1];
				// Hide play button and show stop button for this song
				this.style.display = 'none';
				thisStopBtn.style.display = 'block';
				// Stop all samples
				multiPlayer.stopAll();
				// Play Multiplayer loop sample that matches song's title
				multiPlayer.start(songTitle);
			}, false);

			// Stop button listener
			stopBtn.addEventListener('click', function(e) {
				// Stop redirect to song's single page
				e.stopImmediatePropagation();
				// Get this stop button's sibling play button
				var thisPlayBtn = this.parentElement.children[0];
				// Hide stop button and show play button for this song
				this.style.display = 'none';
				thisPlayBtn.style.display = 'block';
				// Stop all samples
				multiPlayer.stopAll();
			});
		}

		// Add Event Listeners to each song list item
		// Redirects user to song's url
		for(var i = 0; i < songs.length; i++) {
			songs[i].addEventListener('click', function() {
				var url = this.getAttribute('data-url');
				window.location = url;
			}, false);
		}
	}, false);
}

function hideAllStopButtons(songs) {
	for(var i = 0; i < songs.length; i++) {
		var stopBtn = songs[i].children[1];
		stopBtn.style.display = 'none';
	}
}

function showAllPlayButtons(songs) {
	for(var i = 0; i < songs.length; i++) {
		var playBtn = songs[i].children[0];
		playBtn.style.display = 'block';
	}
}

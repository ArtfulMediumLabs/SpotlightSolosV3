/**
 * main.js
 * -------
 * The main functions that run the application. Contains functions that will * call upon custom classes and make decisions in the application.
 */

mixpanel.track("Practice Loaded");

var audioPlayer = new AudioPlayer({
	songSrc: 'audio/Wayfarer - Amaj - 88bpm.mp3',
	containerID: '#audio-controls',
	playBtnID: '#play-btn',
	pauseBtnID: '#pause-btn',
});

var fretBoard = new FretBoard({
	bodyID: '#fret-board',
	blocks: [
		{
			imgSrc: 'img/A Major Pentatonic - Block 1.png',
		},
		{
			imgSrc: 'img/A Major Pentatonic - Block 2.png',
		},
		{
			imgSrc: 'img/A Major Pentatonic - Block 3.png',
		},
		{
			imgSrc: 'img/A Major Pentatonic - Block 4.png',
		},
		{
			imgSrc: 'img/A Major Pentatonic - Block 5.png',
		},
	],
});
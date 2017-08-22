/**
 * block.js
 * --------
 * A class to create block buttons with associated images
 */

class FretBoard {
	constructor(options) {
		this.bodyID = options.bodyID;
		this.blocks = options.blocks;
		this.enableBlocks();
		this.activateBlock(this, null);	// Active 1st button and related image

	}

	/**
	 * Create and append button blocks to this fretboard. Add a click listener
	 * to each
	 */
	enableBlocks() {
		// Get a reference to this fretboard's pattern area
		var patterns = document.querySelector(this.bodyID + ' .patterns');
		/**
		 * Loop through all of the block buttons associated with this board.
		 * Add each block's image to this freboards' patterns area and add a 
		 * click listener that allows each block button to active its' 
		 * associated image.
		 */
		for(var i = 0; i < this.blocks.length; i++) {
			// Add each image to the fretboard patterns
			var scalePattern = document.createElement('img');
			scalePattern.src = this.blocks[i].imgSrc;
			patterns.appendChild(scalePattern);
			scalePattern.style.display = 'none';

			// Create a button and add to the controls area
			var btn = document.createElement('button');
			btn.id = 'block' + (i + 1);
			btn.setAttribute('class', 'btn block');
			btn.innerHTML = 'block ' + (i + 1);
			var controls = document.querySelector(this.bodyID + ' .controls');
			controls.appendChild(btn);

			// Add click listener to set image per block clicked
			var blockBtn = document.querySelector(this.blocks[i].bodyID);
			var _this = this;
			btn.addEventListener('click', function(e) {
				_this.activateBlock(_this, e);
			}, false);
		}
	}

	/**
	 * Add the active class to a specified button block and show its' related
	 * image.
	 */
	activateBlock(fretBoard, el) {
		console.log(fretBoard);
		var index = 1;
		if(el) {
			index = parseInt(el.currentTarget.innerHTML.replace('block', '') );

			// Remove active class from all blocks
			var blockEls = document.querySelectorAll('.block');
			for(var i = 0; i < blockEls.length; i++) {
				blockEls[i].classList.remove('active');
			}
			// Add the active class to this button
			el.currentTarget.classList.add('active');

			// Hide all pattern images
			var allPatterns = document.querySelectorAll(fretBoard.bodyID + ' img');
			for(var i = 0; i < allPatterns.length; i++) {
				allPatterns[i].style.display= 'none';
			}
		} else {
			// Add the active class to the first button
			var firstBtn = document.querySelector(fretBoard.bodyID + ' button:nth-child(' + index + ')');
			firstBtn.classList.add('active');
		}
		// Get and show image related to this button
		var img = document.querySelector(fretBoard.bodyID + ' img:nth-child(' + index + ')');
		img.style.display = 'block';
	}
}
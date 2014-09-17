/**
* App start component
* @authors: ibarbieri
* @description: start the app and manage all the components and instances
*/
(function (win, getHomeData, getNewsData, getVideosData, getFixtureData) {


	var on = (win.addEventListener !== undefined) ? 'addEventListener' : 'attachEvent',
		iconMenu = document.getElementsByClassName('icon-menu'),
		navSection = document.getElementById('navSection'),
		clickedButton,
		loadHomeSection = new Event('loadHomeSection'),
		loadNewsSection = new Event('loadNewsSection'),
		loadVideosSection = new Event('loadVideosSection'),
		loadFixtureSection = new Event('loadFixtureSection'),
		loadAlertsSection = new Event('loadAlertsSection'),
		sections = document.getElementsByTagName('section'),
		sectionsLength = sections.length,
		i;


	// Load home news the first time
	win.getHomeData();


	// Get clicked button and call the dispatch event function
	function getClickedButton () {
		clickedButton = event.target.getAttribute('data-button');
		dispatchEvents(clickedButton);
	}


	// Load sections content
	function dispatchEvents (clickedButton) {
		if (clickedButton == 'home') {
			this.dispatchEvent(loadHomeSection);

		} else if (clickedButton == 'news') {
			this.dispatchEvent(loadNewsSection);

		} else if (clickedButton == 'videos') {
			this.dispatchEvent(loadVideosSection);

		} else if (clickedButton == 'fixture') {
			this.dispatchEvent(loadFixtureSection);

		} else if (clickedButton == 'alerts') {
			this.dispatchEvent(loadAlertsSection);
		}
	}


	// Listen the click button in the nav-section
	navSection[on]('touchstart', getClickedButton, false);


	// Listes the loadHomeSection event
	win.addEventListener('loadHomeSection', function () {

		// Show only the current section
		showCurrentSection('home');
		console.log(this);

		// Load the home data
		win.getHomeData();

	}, false);


	// Listes the loadNewsSection event
	win.addEventListener('loadNewsSection', function () {

		// Show only the current section
		showCurrentSection('news');

		// Load the news data
		win.getNewsData();

	}, false);


	// Listes the loadVideosSection event
	win.addEventListener('loadVideosSection', function () {

		// Show only the current section
		showCurrentSection('videos');

		// Load the Videos data
		win.getVideosData();

	}, false);


	// Listes the loadFixtureSection event
	win.addEventListener('loadFixtureSection', function () {

		// Show only the current section
		showCurrentSection('fixture');

		// Load the Fixture data
		win.getFixtureData();

	}, false);


	// Listes the loadAlertsSection event
	win.addEventListener('loadAlertsSection', function () {

		// Show only the current section
		showCurrentSection('alerts');

		// Load the Alerts data
		win.getAlertsData();

	}, false);


	// Check if the actual section is hidden and hide the others sections
	var showCurrentSection = function (currentSection) {

		// Add hidden to all sections
		for (i = 0; i < sectionsLength; i++) {
			sections[i].setAttribute('data-visible', 'hidden');
		}

		// Add visible atribute to current section
		document.getElementById(currentSection).setAttribute('data-visible', 'visible');
	};


}(this));
/**
* App start component
* @authors: ibarbieri
* @description: start the app and manage all the components and instances
*/
(function (win, getHomeData, getNewsData, getVideosData, getFixtureData) {


	var on = (win.addEventListener !== undefined) ? 'addEventListener' : 'attachEvent',
		iconMenu = document.getElementsByClassName('icon-menu'),
		navSection = document.getElementById('navSection'),
		navSectionLinks = navSection.getElementsByTagName('a'),
		clickedButton,
		loadHomeSection = new Event('loadHomeSection'),
		loadNewsSection = new Event('loadNewsSection'),
		loadVideosSection = new Event('loadVideosSection'),
		loadFixtureSection = new Event('loadFixtureSection'),
		loadAlertsSection = new Event('loadAlertsSection'),
		sectionUpdate = new Event('sectionUpdate'),
		sections = document.getElementsByTagName('section'),
		sectionsLength = sections.length,
		homeContext = $('#home ul'),
		newsContext = $('#news ul'),
		fixtureContext = $('#fixture ul'),
		videosContext = $('#videos ul'),
		alertsContext = $('#alerts ul'),
		currentSectionShowed = 'home',
		i;


	// Load home news the first time
	win.getHomeData();


	// Get clicked button and call the dispatch event function
	function getClickedButton (event) {
		clickedButton = event.target.getAttribute('data-button');
		dispatchEvents(clickedButton);
	}


	// Load sections content
	function dispatchEvents (clickedButton) {
		// reeplazar por case
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


	// Listes the loadHomeSection event
	win[on]('loadHomeSection', function () {

		currentSectionShowed = 'home';

		showCurrentSection(currentSectionShowed);
		setSectionSelected(currentSectionShowed);

		win.getHomeData();

	}, false);



	// Listes the loadNewsSection event
	win[on]('loadNewsSection', function () {

		currentSectionShowed = 'news';

		showCurrentSection(currentSectionShowed);
		setSectionSelected(currentSectionShowed);

		win.getNewsData();

	}, false);



	// Listes the loadVideosSection event
	win[on]('loadVideosSection', function () {

		currentSectionShowed = 'videos';

		showCurrentSection(currentSectionShowed);
		setSectionSelected(currentSectionShowed);

		win.getVideosData();

	}, false);


	// Listes the loadFixtureSection event
	win[on]('loadFixtureSection', function () {

		currentSectionShowed = 'fixture';

		showCurrentSection(currentSectionShowed);
		setSectionSelected(currentSectionShowed);

		win.getFixtureData();

	}, false);


	// Listes the loadAlertsSection event
	win[on]('loadAlertsSection', function () {

		currentSectionShowed = 'alerts';

		showCurrentSection(currentSectionShowed);
		setSectionSelected(currentSectionShowed);

	}, false);


	// Hide all the sections and show only the current section
	var showCurrentSection = function (currentSectionShowed) {

		// Add hidden to all sections
		for (i = 0; i < sectionsLength; i++) {
			sections[i].setAttribute('data-visible', 'hidden');
		}

		// Add visible atribute to current section
		document.getElementById(currentSectionShowed).setAttribute('data-visible', 'visible');
	};


	// Select the current section and deselect others
	var setSectionSelected = function (currentSectionShowed) {

		// Remove active class for all icons
		for (i = 0; i < navSectionLinks.length; i++) {
			navSectionLinks[i].className = ' tab-item';
		}

		// Add active class to the clicked icon
		document.getElementById('btn-'+currentSectionShowed).className = ' tab-item active';
	};


	// Get section data Update
	var getSectionDataUpdate = function (currentSectionShowed) {
		console.log('¿hay actualización en?', currentSectionShowed);

		if (currentSectionShowed == 'home') {
			win.getHomeData();
		} else if (currentSectionShowed == 'news') {
			win.getNewsData();
		} else if (currentSectionShowed == 'videos') {
			win.getVideosData();
		} else if (currentSectionShowed == 'fixture') {
			win.getFixtureData();
		} else if (currentSectionShowed == 'alerts') {
			//
		}
	};


	// Run the sectionUpdate event each minute (60")
	// Falta saber cuando se elimina una noticia o se da de baja, para bajarla.
	// Hay que saber en que posicion esta y hacer un split del array.
	// setInterval( function () {
	// 	//console.log('despatch event');
	// 	//win.dispatchEvent(sectionUpdate);
	// 	getSectionDataUpdate(currentSectionShowed);
	// }, 60000);


	// setInterval( function () {
	// 	getSectionDataUpdate(currentSectionShowed);
	// }, 60000);


	// Listen events
	navSection[on]('touchstart', getClickedButton, false);
	//win[on]('sectionUpdate', getSectionDataUpdate(currentSectionShowed));


}(this));
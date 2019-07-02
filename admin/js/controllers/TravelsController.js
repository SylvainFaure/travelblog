class TravelsController {
	constructor(
		$scope, 
		$rootScope, 
		$window, 
		$compile, 
		$state, 
		Travels, 
		Assets, 
		ApiService
	) {
	this.$state = $state;
	this.$scope = $scope;
	this.$compile = $compile;
	this.$window = $window;

	this.travels = Travels; 
	this.travels.map(travel => {
		travel.travel_countries_fr = JSON.parse(travel.travel_countries_fr)
		travel.travel_countries_it = JSON.parse(travel.travel_countries_it)
		return travel
	})
	console.log(this.travels)
	this.assets = Assets
	this.ApiService = ApiService;
	this.fr = $rootScope.rvm.fr;
	this.it = $rootScope.rvm.it;

	$rootScope.$on('changeLang', () => {
		this.fr = $rootScope.rvm.fr;
		this.it = $rootScope.rvm.it;
	})
		
	$rootScope.$on('changeAsset', (e, from, asset) => {
		if (from == "travels") {
			this.travel.travel_cover = asset.asset_name
		}
	});

	
	this.getTravelSteps = this.getTravelSteps();
	this.appendCalendar = this.appendCalendar();
}

	openModal(travel, travelId) {
		const id = travelId ? `#${travelId}` : ''
		if (travel == 'travel') {
			setTimeout(() => {
				$(`.ui.modal.travel${id}`).modal('show');
				this.initCalendar();
			})
		}
	}
	closeModal() {
    $('.ui.modal.travel').modal('hide')
  }


	appendCalendar() {
		$('head').append(`<link href="https://cdn.rawgit.com/mdehoog/Semantic-UI-Calendar/76959c6f7d33a527b49be76789e984a0a407350b/dist/calendar.min.css" rel="stylesheet" type="text/css" />
		<script src="https://cdn.rawgit.com/mdehoog/Semantic-UI-Calendar/76959c6f7d33a527b49be76789e984a0a407350b/dist/calendar.min.js"></script>`)
	}

	initCalendar() {
		$('#rangestart').calendar({
			type: 'date',
			endCalendar: $('#rangeend'),
			onChange: (date) => {

				this.parseDate(date, "start") 
			}
		});
		$('#rangeend').calendar({
			type: 'date',
			startCalendar: $('#rangestart'),
			onChange: (date) => { 
				this.parseDate(date, "end") 
			}
		});
	}

	parseDate(date, range) {
		let dateObj = new Date(date).toLocaleDateString('fr-FR');
		console.log(dateObj)
		if (range == "start") {
			this.travel.travel_start_date = dateObj;
		}
		if (range == "end") {
			this.travel.travel_end_date = dateObj;
		}
		if (!range) {
			return dateObj
		}
	}

	getTravelSteps() {
		let self = this;
		this.travels.forEach((travel) =>{
			self.ApiService.travelArticles(travel.travel_id)
			.then(function(r){
				var steps = ''
				r.data.forEach(function(a){
					steps += '<a ui-sref="logged.article({articleId: ' + a.article_id + '})"><span ng-if="vm.fr">' + a.article_place_fr + '</span><span ng-if="vm.it">' + a.article_place_it + '</span></a>, '
				})
				steps = steps.slice(0, steps.lastIndexOf(','))
				var elem = $('#travel_' + travel.travel_id)
				elem.html(steps)
				self.$compile(elem.contents())(self.$scope)
			})	
		})	
	}
	

	saveTravel(travel) {
		let formattedTravel = this.formatTravel(travel)

		this.ApiService.travelCreate(formattedTravel)
			.then(resp => {
				console.log(resp)
				/**IF PUBLISHED -> HANDLE PUBLISHED */
				this.closeModal()
				this.$state.reload('logged')
				this.travels = Travels
			}).catch(err => {
				console.log(err)
			})
	}

	handleBoolean(value) {
		let val
		if (typeof value == 'string') {
			val = value == 'true' ? true : false
		} else {
			val = value
		}
		return val
	}

	formatTravel(travel) {
		let formattedTravel = travel;
		delete formattedTravel.travel_editing_country;
		formattedTravel.travel_countries_fr = formattedTravel.travel_countries_fr ? JSON.stringify(formattedTravel.travel_countries_fr) : JSON.stringify([])
		formattedTravel.travel_countries_it = formattedTravel.travel_countries_it ? JSON.stringify(formattedTravel.travel_countries_it) : JSON.stringify([])
		formattedTravel.travel_long_desc_fr = formattedTravel.travel_long_desc_fr ? formattedTravel.travel_long_desc_fr : ''
		formattedTravel.travel_long_desc_it = formattedTravel.travel_long_desc_it ? formattedTravel.travel_long_desc_it : ''
		const publishedFr = this.handleBoolean(formattedTravel.travel_published_fr)
		const publishedIt = this.handleBoolean(formattedTravel.travel_published_it)

		if (publishedFr) {
			formattedTravel.travel_published_date_fr = formattedTravel.travel_published_date_fr ? formattedTravel.travel_published_date_fr : this.parseDate(new Date)
		}	else {
			formattedTravel.travel_published_date_fr = ''
		}
		if (publishedIt) {
			formattedTravel.travel_published_date_it = this.parseDate(new Date)
		} else {
			formattedTravel.travel_published_date_it = ''
		}

		formattedTravel.travel_published_fr = publishedFr ? 'true' : 'false'
		formattedTravel.travel_published_it = publishedIt ? 'true' : 'false'

		//formattedTravel.travel_start_date = Date(formattedTravel.travel_start_date);
		//formattedTravel.travel_end_date = Date(formattedTravel.travel_end_date);
		return formattedTravel;
	}

	addTravel() {
		this.edit = false
		this.travel = {};
		this.openModal('travel')
		this.initMap()
	}

	initMap() {
		var map = new google.maps.Map(document.getElementById('map-travel-search'), {
			center: {lat: 45.0151165, lng: 7.6500735},
			zoom: 5,
			mapTypeId: 'roadmap'
			});
		var input = document.getElementById('map-search');
		var searchBox = new google.maps.places.Autocomplete(input, {
			types: '(country)'
		});

		const places = new google.maps.places.PlacesService(map);
		searchBox.addListener('place_changed', onPlaceChanged);

		function onPlaceChanged() {
			var place = searchBox.getPlace();
			if (place.geometry) {
				map.panTo(place.geometry.location);
				map.setZoom(5);
			} 
		}
	}


	editTravel(travel) {
		this.openModal('travel', travel.travel_id)
		this.travel = travel
		this.edit = true		
	}

	updateTravel(travel, id) {
		let formattedTravel = this.formatTravel(travel)
		this.ApiService.travelUpdate(formattedTravel, id)
			.then(resp => {
				console.log(resp)
				this.closeModal()
				this.$state.reload('logged')
			})
			.catch(err => {
				console.log(err)
			})
	}

	removeTravel(id) {
		this.ApiService.travelDelete(id)
			.then(resp => {
				console.log(resp)
				this.$state.reload('logged')
				this.travels = Travels
			})
			.catch(err => {
				console.log(err)
			})
	}

	handleTravelCountries(ev) {
		if (ev.key === "Enter") {
			if (this.fr) {
				if (!this.travel.travel_countries_fr) this.travel.travel_countries_fr = []
				this.travel.travel_countries_fr.push(this.travel.travel_editing_country);
			}
			if (this.it) {
				if (!this.travel.travel_countries_it) this.travel.travel_countries_it = []				
				this.travel.travel_countries_it.push(this.travel.travel_editing_country);
			}
			this.travel.travel_editing_country = ""; 
		}
		if (ev.key === "Escape") {
			this.travel.travel_editing_country = ""; 
		}
	}
	deleteCountry(travel) {
		if (this.fr) {
			this.travel.travel_countries_fr.splice(this.travel.travel_countries_fr.indexOf(travel), 1)
		}
		if (this.it) {
			this.travel.travel_countries_it.splice(this.travel.travel_countries_it.indexOf(travel), 1)
		}
	}
}

export default TravelsController;
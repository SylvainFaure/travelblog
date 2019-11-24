import { format } from 'date-fns'
class TravelsController {
	constructor(
		$scope, 
		$rootScope, 
		$window, 
		$compile, 
		$state,
		toastr,
		Travels, 
		Assets, 
		Categories,
		ApiService
	) {
	this.format = format
	this.$state = $state;
	this.$scope = $scope;
	this.$compile = $compile;
	this.$window = $window;
	this.toastr = toastr
	this.travels = Travels

	this.assets = Assets
	this.categories = Categories
	this.ApiService = ApiService;
	this.fr = $rootScope.rvm.fr;
	this.it = $rootScope.rvm.it;

	this.categories = this.categories.map(category => {
		category.isEditing = false
		return category
	})

	$rootScope.$on('changeLang', () => {
		this.fr = $rootScope.rvm.fr;
		this.it = $rootScope.rvm.it;
	})
	
	this.getTravelSteps = this.getTravelSteps();
	this.mapTravels()
}

	mapTravels() {
		this.travels.map(travel => {
			travel.travel_countries_fr = JSON.parse(travel.travel_countries_fr)
			travel.travel_countries_it = JSON.parse(travel.travel_countries_it)
			travel.travel_hashtags = [] //JSON.parse(travel.travel_hashtags) add entry in db
			travel.travel_published_fr = this.handleBoolean(travel.travel_published_fr)
			travel.travel_published_it = this.handleBoolean(travel.travel_published_it)
			travel.dates_raw = {
				start_date: travel.travel_start_date,
				end_date: travel.travel_end_date,
				published_fr: travel.travel_published_date_fr,
				published_it: travel.travel_published_date_it
			}
			travel.travel_start_date = travel.travel_start_date ? this.format(new Date(travel.travel_start_date), 'dd/M/yyyy') : ''
			travel.travel_end_date = travel.travel_end_date ? this.format(new Date(travel.travel_end_date), 'dd/M/yyyy') : ''
			travel.travel_published_date_fr = travel.travel_published_date_fr ? this.format(new Date(travel.travel_published_date_fr), 'dd/M/yyyy') : ''
			travel.travel_published_date_it = travel.travel_published_date_it ? this.format(new Date(travel.travel_published_date_it), 'dd/M/yyyy') : ''
			return travel
		})
	}

	parseDate(date, range) {
		let dateObj = this.format(date, 'dd/MM/yyyy');
		if (range == "start") {
			this.travel.travel_start_date = dateObj;
			this.travel.dates_raw.start_date = Date.parse(new Date(date))
		}
		if (range == "end") {
			this.travel.travel_end_date = dateObj;
			this.travel.dates_raw.end_date = Date.parse(new Date(date))
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
		formattedTravel.travel_hashtags = formattedTravel.travel_hashtags ? JSON.stringify(formattedTravel.travel_hashtags) : JSON.stringify([])
		formattedTravel.travel_long_desc_fr = formattedTravel.travel_long_desc_fr ? formattedTravel.travel_long_desc_fr : ''
		formattedTravel.travel_long_desc_it = formattedTravel.travel_long_desc_it ? formattedTravel.travel_long_desc_it : ''
		const publishedFr = this.handleBoolean(formattedTravel.travel_published_fr)
		const publishedIt = this.handleBoolean(formattedTravel.travel_published_it)

		formattedTravel.travel_published_fr = publishedFr
		formattedTravel.travel_published_it = publishedIt
		formattedTravel.travel_start_date = formattedTravel.dates_raw.start_date
		formattedTravel.travel_end_date = formattedTravel.dates_raw.end_date
		delete formattedTravel.dates_raw
		return formattedTravel;
	}

	handleTravelCountries(ev) {
		if (ev.key === "Enter") {
			this.addTravelCountry()
		}
		if (ev.key === "Escape") {
			this.travel.travel_editing_country = ""; 
		}
	}
	addTravelCountry() {
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
	deleteTravelCountry(travel) {
		if (this.fr) {
			this.travel.travel_countries_fr.splice(this.travel.travel_countries_fr.indexOf(travel), 1)
		}
		if (this.it) {
			this.travel.travel_countries_it.splice(this.travel.travel_countries_it.indexOf(travel), 1)
		}
	}

	addCategory() {
		this.categories.push({
			category_label_fr: '',
			category_label_it: '',
			category_name: '',
			isEditing: true,
			isNew: true
		})
	}
	saveCategory(category) {
		delete category.isEditing
		delete category.isNew
		this.ApiService
			.categoryCreate(category)
			.then(res => {
				this.toastr.success("The category has been created with success", "Hurray!")
				this.refreshCategories()
			})
			.catch(err => {
				console.warn(err)
				this.toastr.error("There was an unexpected error...try again!", "Ops!")
			})
	}
	updateCategory(category) {
		delete category.isEditing
		this.ApiService
			.categoryUpdate(category, category.category_id)
			.then(res => {
				this.toastr.success("The category has been updated with success", "Hurray!")
				// this.refreshCategories()
			})
			.catch(err => {
				console.warn(err)
				this.toastr.error("There was an unexpected error...try again!", "Ops!")
			})
	}

	removeCategory(id) {
		this.ApiService
			.categoryDelete(id)
			.then(res => {
				this.toastr.success("The category has been removed with success", "Hurray!")
				this.refreshCategories()
			})
			.catch(err => {
				console.warn(err)
				this.toastr.error("There was an unexpected error...try again!", "Ops!")

			})
	}
	refreshCategories() {
		this.ApiService
			.categoriesList()
			.then(r => {
				this.categories = r.data
			})
			.catch(err => {
				console.warn('Could not get updated categories')
			})
	}

	handleTravelHashtags(ev) {
		if (ev.key === "Enter") {
			this.addTravelHashtag()
		}
		if (ev.key === "Escape") {
			this.travel.travel_editing_hashtag = ""; 
		}
	}
	addTravelHashtag() {
		if (!this.travel.travel_hashtags) this.travel.travel_hashtags = []
		this.travel.travel_hashtags.push(this.travel.travel_editing_hashtag);
		this.travel.travel_editing_hashtag = ""; 
	}
	deleteTravelHashtag(hash) {
		this.travel.travel_hashtags.splice(this.travel.travel_hashtags.indexOf(hash), 1)
	}

	saveTravel(travel) {
		let formattedTravel = this.formatTravel(travel)
		this.ApiService.travelCreate(formattedTravel)
			.then(resp => {
				console.log(resp)
				this.toastr.success("Your travel has been successfully registered")
				/**IF PUBLISHED -> HANDLE PUBLISHED */
				this.closeModal()
				this.$state.reload('logged')
			}).catch(err => {
				this.toastr.error("There was an unexpected error" + err)
				console.log(err)
			})
	}

	saveAndPublishTravel(travel, travelId) {
		/**SAVE AND PUBLISH NEW TRAVEL ? */
		if (this.fr) {
			this.travel.travel_published_fr = true
			this.travel.travel_published_date_fr = Date.parse(new Date())
			if (this.travel.travel_published_date_it) {
				this.travel.travel_published_date_it = this.travel.dates_raw.published_it
			}
		}
		if (this.it) {
			this.travel.travel_published_it = true
			this.travel.travel_published_date_it = Date.parse(new Date())
			if (this.travel.travel_published_date_fr) {
				this.travel.travel_published_date_fr = this.travel.dates_raw.published_fr
			}
		}
		if (travelId) {
			this.updateTravel(travel, travelId)
			this.ApiService.travelPublish(travel, travelId)
				.then(resp => {
					this.toastr.success("The travel has been successfully published")
					console.log(resp)
				})
				.catch(err => {
					console.log(err)
					this.toastr.error("There was an unexpected error" + err)

				})
		}
	}

	updateTravel(travel, id) {
		let formattedTravel = this.formatTravel(travel)
		console.log(formattedTravel)
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
			})
			.catch(err => {
				console.log(err)
			})
	}


}

export default TravelsController;
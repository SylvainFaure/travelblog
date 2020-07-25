import { format } from 'date-fns'
import EditorJS from'@editorjs/editorjs';
import AddMapPoint from '../custom-editor-actions/addmappoint';
import { jsonToHTML } from '../custom-editor-actions/editor-utils';

class TravelController {
	constructor(
		$scope, 
		$state, 
		$rootScope, 
		Travel,
		TravelArticles, 
		Assets,
		Categories,
		ApiService,
		$window, 
		$compile, 
		toastr
	) {
		this.$state = $state;
		this.$scope = $scope;

		this.travel = Travel;
		this.travelArticles = TravelArticles; 
		this.assets = Assets
		this.categories = Categories
		this.ApiService = ApiService;
		this.format = format
		this.$compile = $compile;
		this.$window = $window;
		this.toastr = toastr
		this.AWS_BUCKET_PATH = process.env.AWS_BUCKET_PATH 

		this.fr = $rootScope.rvm.fr;
		this.it = $rootScope.rvm.it;
		$rootScope.$on('changeLang', function(){
			this.fr = $rootScope.rvm.fr;
			this.it = $rootScope.rvm.it;
		})
		this.isPublished = false;
		this.editingCover = '';
		this.editingImage = '';

		$rootScope.$on('changeCover', (e, from, asset) => {
			if (from == "travel") {
				this.travel.travel_cover = asset.asset_name
			}
		})

		$rootScope.$on('changeAsset', (e, from, asset) => {
			if (from == "travel" && this.travel) {
				this.editingCover = asset.asset_name
			}
			if (from == "travel-image" && this.travel) {
				this.editingImage = asset.asset_name
			}
		});

		this.appendCalendar = this.appendCalendar();
		this.mapTravel()
		this.selectedCategory = this.categories.find(c => c.category_id === this.travel.travel_category)

		setTimeout(() => {
			this.initCalendar();
			this.initEditor();
			this.initMapEditor();
			this.initEditorDescription();
		})

	}

	openCoverModal() {
		this.randomId = Math.floor(Math.random() * 1000)
		setTimeout(() => {
			$(`.ui.modal.travelcover#cover-${this.randomId}`).modal('show')
		})
	}

	closeCoverModal() {
		$('.ui.modal.travelcover').modal('hide')
	}

	openImageModal() {
		this.randomId = Math.floor(Math.random() * 1000)
		setTimeout(() => {
			$(`.ui.modal.travelimage#image-${this.randomId}`).modal('show')
		})
	}

	closeImageModal() {
		$('.ui.modal.travelimage').modal('hide')
	}

	saveCover() {
		const lang = this.fr ? 'fr' : 'it'
		this.travel[`travel_cover_${lang}`] = this.editingCover;
	}
	saveImage() {
		const lang = this.fr ? 'fr' : 'it'
		this.travel[`travel_desc_image_${lang}`] = this.editingImage;
	}


	mapTravel() {
		if (!this.travel.newtravel) {
			this.travel.travel_countries_fr = JSON.parse(this.travel.travel_countries_fr)
			this.travel.travel_countries_it = JSON.parse(this.travel.travel_countries_it)
			this.travel.travel_hashtags = JSON.parse(this.travel.travel_hashtags)
			this.travel.travel_long_desc_fr = this.travel.travel_long_desc_fr ? JSON.parse(this.travel.travel_long_desc_fr) : null
			this.travel.travel_long_desc_it = this.travel.travel_long_desc_it ? JSON.parse(this.travel.travel_long_desc_it) : null
			this.travel.travel_long_desc_bis_fr = this.travel.travel_long_desc_bis_fr ? JSON.parse(this.travel.travel_long_desc_bis_fr) : null
			this.travel.travel_long_desc_bis_it = this.travel.travel_long_desc_bis_it ? JSON.parse(this.travel.travel_long_desc_bis_it) : null
			this.travel.travel_desc_map_fr = this.travel.travel_desc_map_fr ? JSON.parse(this.travel.travel_desc_map_fr) : null
			this.travel.travel_desc_map_it = this.travel.travel_desc_map_it ? JSON.parse(this.travel.travel_desc_map_it) : null
			this.travel.travel_published_fr = this.handleBoolean(this.travel.travel_published_fr)
			this.travel.travel_published_it = this.handleBoolean(this.travel.travel_published_it)
			this.travel.travel_same_start_end = this.handleBoolean(this.travel.travel_same_start_end)
			this.travel.travel_category = this.travel.travel_category ? this.travel.travel_category : this.categories[0].category_id
	
			this.travel.dates_raw = {
				start_date: this.travel.travel_start_date,
				end_date: this.travel.travel_end_date,
				published_fr: this.travel.travel_published_date_fr,
				published_it: this.travel.travel_published_date_it
			}
			this.travel.travel_start_date = this.travel.travel_start_date ? this.format(new Date(this.travel.travel_start_date), 'dd/M/yyyy') : ''
			this.travel.travel_end_date = this.travel.travel_end_date ? this.format(new Date(this.travel.travel_end_date), 'dd/M/yyyy') : ''
			this.travel.travel_published_date_fr = this.travel.travel_published_date_fr ? this.format(new Date(this.travel.travel_published_date_fr), 'dd/M/yyyy') : ''
			this.travel.travel_published_date_it = this.travel.travel_published_date_it ? this.format(new Date(this.travel.travel_published_date_it), 'dd/M/yyyy') : ''
			
			if ((this.fr && this.travel.travel_published_fr) || (this.it && this.travel.travel_published_it)) {
				this.isPublished = true
			}
			if (this.fr) {
				const d = this.travel.travel_long_desc_fr
				const m = this.travel.travel_desc_map_fr
				const b = this.travel.travel_long_desc_bis_fr
				this.descEditorContent = d && d[0] && d[0].rawContent ? d[0].rawContent : {} 
				this.mapEditorContent = m && m[0] && m[0].rawContent ? m[0].rawContent : {} 
				this.descBisEditorContent = b && b[0] && b[0].rawContent ? b[0].rawContent : {} 
			}
			if (this.it) {
				const d = this.travel.travel_long_desc_it
				const m = this.travel.travel_desc_map_it
				const b = this.travel.travel_long_desc_bis_it
				this.descEditorContent = d && d[0] && d[0].rawContent ? d[0].rawContent : {} 
				this.mapEditorContent = m && m[0] && m[0].rawContent ? m[0].rawContent : {} 
				this.descBisEditorContent = b && b[0] && b[0].rawContent ? b[0].rawContent : {} 
			}
		} else {
			this.travel = {
				newtravel: true,
				travel_countries_fr: [],
				travel_countries_it: [],
				travel_long_desc_fr: null,
				travel_long_desc_it: null,
				travel_long_desc_bis_fr: null,
				travel_long_desc_bis_it: null,
				travel_desc_map_fr: null,
				travel_desc_map_it: null,
				travel_desc_image_fr: "",
				travel_desc_image_it: "",
				travel_playlist_fr: "",
				travel_playlist_it: "",
				travel_cover_fr: "",
				travel_cover_it: "",
				travel_slug_fr: "",
				travel_slug_it: "",
				travel_title_fr: "",
				travel_title_it: "",
				travel_desc_fr: "",
				travel_desc_it: "",
				travel_published_it: false,
				travel_published_fr: false,
				travel_published_date_fr: null,
				travel_published_date_it: null,
				travel_start_date: '',
				travel_end_date: '',
				travel_hashtags: [],
				travel_same_start_end: true,
				travel_category: this.categories[0].category_id,
				dates_raw: {
					start_date: '',
					end_date: '',
					published_fr: null,
					published_it: null
				},
			}
			this.descEditorContent = {} 
			this.mapEditorContent = {} 
			this.descBisEditorContent = {}
		}
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
	
	handleBoolean(value) {
		let val
		if (typeof value === 'string') {
			val = value == 'true' ? true : false
		} else {
			val = !!value
		}
		return val
	}

	formatTravel(travel, publish) {
		let formattedTravel = travel;
		formattedTravel.travel_countries_fr = formattedTravel.travel_countries_fr ? JSON.stringify(formattedTravel.travel_countries_fr) : JSON.stringify([])
		formattedTravel.travel_countries_it = formattedTravel.travel_countries_it ? JSON.stringify(formattedTravel.travel_countries_it) : JSON.stringify([])
		formattedTravel.travel_hashtags = formattedTravel.travel_hashtags ? JSON.stringify(formattedTravel.travel_hashtags) : JSON.stringify([])
		formattedTravel.travel_long_desc_fr = formattedTravel.travel_long_desc_fr ? JSON.stringify(formattedTravel.travel_long_desc_fr) : '[]'
		formattedTravel.travel_long_desc_it = formattedTravel.travel_long_desc_it ? JSON.stringify(formattedTravel.travel_long_desc_it) : '[]'
		formattedTravel.travel_long_desc_bis_fr = formattedTravel.travel_long_desc_bis_fr ? JSON.stringify(formattedTravel.travel_long_desc_bis_fr) : '[]'
		formattedTravel.travel_long_desc_bis_it = formattedTravel.travel_long_desc_bis_it ? JSON.stringify(formattedTravel.travel_long_desc_bis_it) : '[]'
		formattedTravel.travel_desc_map_fr = formattedTravel.travel_desc_map_fr ? JSON.stringify(formattedTravel.travel_desc_map_fr) : '[]'
		formattedTravel.travel_desc_map_it = formattedTravel.travel_desc_map_it ? JSON.stringify(formattedTravel.travel_desc_map_it) : '[]'
		const publishedFr = this.handleBoolean(formattedTravel.travel_published_fr)
		const publishedIt = this.handleBoolean(formattedTravel.travel_published_it)
		
		formattedTravel.travel_published_fr = publishedFr
		formattedTravel.travel_published_it = publishedIt
		formattedTravel.travel_start_date = formattedTravel.dates_raw.start_date
		formattedTravel.travel_end_date = formattedTravel.dates_raw.end_date
		if (!publish) {
			formattedTravel.travel_published_date_fr = formattedTravel.dates_raw.published_fr
			formattedTravel.travel_published_date_it = formattedTravel.dates_raw.published_it
		}
		if (formattedTravel.newtravel) {
			delete formattedTravel.newtravel
		}
		delete formattedTravel.dates_raw
		delete formattedTravel.travel_editing_country
		delete formattedTravel.travel_editing_hashtag
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

	initEditor () {
		console.log('init description editor')
		this.descEditor = new EditorJS({
			holderId: 'editor-description',
			onReady: () => {
				// console.log('Editor.js is ready to work!')
		  },
		 	onChange: () => {
			 // console.log('Now I know that Editor\'s content changed!')
			},
			data: this.descEditorContent
		})
	}

	initMapEditor () {
		console.log('init map editor')
		this.mapEditor = new EditorJS({
			holderId: 'editor-map',
			onReady: () => {
				// console.log('Editor.js is ready to work!')
		  },
		 	onChange: () => {
			 // console.log('Now I know that Editor\'s content changed!')
			},
			tools: {
				map: {
					class: AddMapPoint,
					inlineToolbar : true,
					config: {}
				}
			},
			data: this.mapEditorContent
		})
	}

	initEditorDescription () {
		this.complementaryEditor = new EditorJS({
			holderId: 'editor-description-bis',
			onReady: () => {
				// console.log('Editor.js is ready to work!')
		  },
		 	onChange: () => {
			 // console.log('Now I know that Editor\'s content changed!')
			},
			data: this.descBisEditorContent
		})
	}

	async handleEditorsContent () {
		return new Promise(async (resolve, reject) => {
			const descRawContent = await this.descEditor.save()
			const mapRawContent = await this.mapEditor.save()
			const descBisRawContent = await this.complementaryEditor.save()
			const descContent = jsonToHTML(descRawContent)
			const mapContent = jsonToHTML(mapRawContent)
			const descBisContent = jsonToHTML(descBisRawContent)

			const lang = this.fr ? 'fr' : 'it'
			this.travel[`travel_long_desc_${lang}`] = [{ rawContent: descRawContent, content: descContent }]
			this.travel[`travel_desc_map_${lang}`] = [{ rawContent: mapRawContent, content: mapContent }]
			this.travel[`travel_long_desc_bis_${lang}`] = [{ rawContent: descBisRawContent, content: descBisContent }]

			resolve()
		})
	}

	setSelectedCategory() {
		this.travel.travel_category = this.selectedCategory.category_id
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
	async saveTravel(publish) {
		await this.handleEditorsContent()
		console.log(this.travel)
		if (this.travel.newtravel && !this.travel.travel_id) {
			this.createTravel(publish)
		} else {
			this.updateTravel(this.travel, this.travel.travel_id, publish)
		}
	}
	createTravel(publish) {
		let formattedTravel = this.formatTravel(this.travel, publish)
		this.ApiService.travelCreate(formattedTravel)
			.then(resp => {
				this.toastr.success("Your travel has been successfully registered")
				/**IF PUBLISHED -> HANDLE PUBLISHED */
				if (publish) {
					this.publishTravel()
				} else {
					this.$state.go('logged.travels', {success: true})
				}
			}).catch(err => {
				this.toastr.error("There was an unexpected error" + err)
				console.log(err)
			})
	}

	updateTravel(travel, id, publish) {
		let formattedTravel = this.formatTravel(travel, publish)
		this.ApiService.travelUpdate(formattedTravel, id)
			.then(resp => {
				if (publish) {
					this.publishTravel()
				} else {
					this.$state.reload('logged')
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	saveAndPublishTravel() {
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
		this.saveTravel(true)		
	}
	publishTravel() {
		this.ApiService.travelPublish(this.travel, this.travel.travel_id)
			.then(resp => {
				this.toastr.success("The travel has been successfully published")
				this.$state.reload()
			})
			.catch(err => {
				console.log(err)
				this.toastr.error("There was an unexpected error" + err)
			})
	}

	unpublishTravel() {
		if (this.fr) {
			this.travel.travel_published_fr = 0
			this.travel.travel_published_date_fr = null
		}
		if (this.it) {
			this.travel.travel_published_it = 0
			this.travel.travel_published_date_it = null
		}
		this.ApiService.travelUnpublish(this.travel.travel_id)
		.then(resp => {
			this.toastr.success("The travel has been successfully unpublished")
			this.saveTravel(false)
			setTimeout(() => {
				this.$state.reload()
			})
		})
		.catch(err => {
			console.log(err)
			this.toastr.error("There was an unexpected error" + err)
		})
	}

	removeTravel() {
		this.ApiService.travelDelete(this.travel.travel_id)
			.then(resp => {
				this.$state.reload('logged')
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export default TravelController;

export default class AddMapPoint {

  static get isInline() {
    return true;
  }

  static get sanitize() {
    return {
      span: true
    };
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  constructor({api, config}) {
    // can pass custom value in config
    // console.log('Add anecdote constructor', api, config)
    this.api = api;
    this.button = null;
    this._state = false;
    this.address = undefined
    this.input = null
    this.mapInitialized = false

    this.tag = 'SPAN';
    this.class = 'map-point';
  }

  render() {
    // render button for inline toolbar
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = '<i class="icon map marker alternate"></i>'
    // this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range) {
    // execute the action on selection
    if (this.state) {
      this.unwrap(range);
      return;
    }

    this.wrap(range);
  }

  wrap(range) {
    const selectedText = range.extractContents();
    const mapPoint = document.createElement(this.tag);

    const randomId = Math.floor(Math.random() * 10000)
    mapPoint.classList.add(this.class);
    mapPoint.setAttribute('id', randomId)
    mapPoint.appendChild(selectedText);
    range.insertNode(mapPoint);

    this.api.selection.expandToTag(mapPoint);
  }

  unwrap(range) {
    const mapPoint = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();

    mapPoint.remove();

    range.insertNode(text);
  }


  checkState() {
    // called for every inline tool when text selection is made
    const mapPoint = this.api.selection.findParentTag(this.tag);
    // console.log('check state', mapPoint)

    this.state = $(mapPoint).hasClass('map-point');
    this.mapPointId = $(mapPoint).attr('id')

    if (this.state) {
      this.showActions();
    } else {
      this.hideActions();
    }
  }

  renderActions() {
    this.anecdotePicker = document.createElement('input');
    this.anecdotePicker.type = 'text';
    this.anecdotePicker.value = '';
    this.anecdotePicker.hidden = true;

    return this.anecdotePicker;
  }

  showActions() {
    // console.log('show action', this.mapPointId)
    const modal = `.ui.modal.choose-map-point`
    $(modal).modal('show');
    if (!this.mapInitialized) {
      this.initMap()
    }
    
    $('.confirm-map-point').click(elt => {
      if (this.address) {
        const { address, lat, lng } = this.address
        // console.log($(`#${this.mapPointId}`))
        if ( !$(`#${this.mapPointId}`).attr('data-address') ) {
          $(`#${this.mapPointId}`).attr({'data-address': address, 'data-lat': lat, 'data-lng': lng})
        }
        this.address = null
        this.input.value = ''
      }
    })
  }

  initMap () {
		const map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -33.8688, lng: 151.2195},
			zoom: 13
    });
    this.mapInitialized = true
		this.input = document.getElementById('pac-input');
		const autocomplete = new google.maps.places.Autocomplete(this.input);

		// Bind the map's bounds (viewport) property to the autocomplete object,
		// so that the autocomplete requests use the current map bounds for the
		// bounds option in the request.
		autocomplete.bindTo('bounds', map);

		// Set the data fields to return when the user selects a place.
		autocomplete.setFields(
			['address_components', 'geometry', 'icon', 'name']);

		const infowindow = new google.maps.InfoWindow();
		const infowindowContent = document.getElementById('infowindow-content');
		infowindow.setContent(infowindowContent);
		const marker = new google.maps.Marker({
			map,
			anchorPoint: new google.maps.Point(0, -29)
		});

		autocomplete.addListener('place_changed', () => {
			infowindow.close();
			marker.setVisible(false);
			const place = autocomplete.getPlace();
			if (!place.geometry) {
				// User entered the name of a Place that was not suggested and
				// pressed the Enter key, or the Place Details request failed.
				window.alert("No details available for input: '" + place.name + "'");
				return;
			}

			// If the place has a geometry, then present it on a map.
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(17);  // Why 17? Because it looks good.
			}
			marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()

			let address = '';
			if (place.address_components) {
				address = [
					(place.address_components[0] && place.address_components[0].short_name || ''),
					(place.address_components[1] && place.address_components[1].short_name || ''),
					(place.address_components[2] && place.address_components[2].short_name || '')
				].join(' ');
			}
      if (infowindowContent) {
        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
      }
      infowindow.open(map, marker);
      this.address = {address, lat, lng}
		});
	}

  hideActions() {
    // console.log('HIDE ACTION')
  }
}
class AnecdoteController {
	constructor(
		$scope, 
		$state, 
		$rootScope, 
		TextEditor,
		Assets, 
		Anecdote,
		ApiService,
		toastr
	) {
		this.$state = $state;
		this.$scope = $scope;
		this.toastr = toastr;
		this.anecdote = Anecdote;
		this.anecdoteAssets = Assets
		this.ApiService = ApiService;
		this.TextEditor = TextEditor;
		this.TextEditor.context = 'anecdote';
		this.fr = $rootScope.rvm.fr;
		this.it = $rootScope.rvm.it;
		$rootScope.$on('changeLang', function(){
			this.fr = $rootScope.rvm.fr;
			this.it = $rootScope.rvm.it;
		})
		this.isEditing = false;
		this.actions = [
			{
				label: this.fr ? "Paragraphe" : "Paragrafo",
				key: 'paragraph',
				icon:  "font"
			},
			{
				label: this.fr ? "Image" : "Immagine",
				key: "image",
				icon:  "image outline"
			},
			{
				label: this.fr ? "Musique" : "Musica",
				key: "music",
				icon: "music"
			}
		]

		let parsedComponents = this.anecdote.anecdote_content ? JSON.parse(this.anecdote.anecdote_content) : [];
		this.anecdoteComponents = typeof parsedComponents == "object" && parsedComponents !== null ? parsedComponents : [];
		this.TextEditor.components = this.anecdoteComponents;

		$rootScope.$on("componentsChange", (e, context, comps) => {
      if (context === 'anecdote') {
        this.anecdoteComponents = comps;
      }
    })
	}

	cleanComponents(components) {
    return components.map(comp => {
      if (comp.$$hashKey) {
        delete comp.$$hashKey
      }
      if (typeof comp.content == 'string') {
        comp.content.replace(/<!--[^>]*-->?/gm, '');
      }
      if (typeof comp.content == 'object') {
        Object.keys(comp.content).forEach(key => {
          if (comp.content[key]['$$hashKey']) {
            delete comp.content[key]['$$hashKey']
          }
        })
      }
      return comp
    })
  }

	formatAnecdote(anecdote) {
		if (this.anecdoteComponents) {
			const components = this.cleanComponents(this.anecdoteComponents)
			anecdote.anecdote_content = JSON.stringify(components);
		}
		if (!anecdote.anecdote_content) {
			anecdote.anecdote_content = '[]'; 
		}
	}
	
	saveAnecdote() {
		const formattedAnecdote = this.formatAnecdote(this.anecdote)
		if (this.anecdote.anecdote_id) {
			this.ApiService.anecdoteUpdate(this.anecdote, this.anecdote.anecdote_id)
				.then(resp => {
					console.log(resp)
					this.toastr.success("Your anecdote has been updated!", "Success !")
				})
				.catch(err => {
					console.log(err)
					this.toastr.error("There was an error, try again!", "Ops !")
				})
		} else {
			this.ApiService.anecdoteCreate(this.anecdote)
				.then(resp => {
					console.log(resp)
					this.toastr.success("Your anecdote has been saved!", "Success !")
				})
				.catch(err => {
					console.log(err)
					this.toastr.error("There was an error, try again!", "Ops !")
				})
		}
	}

	removeAnecdote() {
		this.ApiService.anecdoteDelete(this.anecdote.anecdote_id)
			.then(resp => {
				console.log(resp)
				this.toastr.success("Your anecdote has been deleted!", "Success !")
			})
			.catch(err => {
				console.log(err)
				this.toastr.error("There was an error, try again!", "Ops !")
			})
	}
}

export default AnecdoteController;

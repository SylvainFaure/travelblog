class AnecdotesController {
  constructor (
    $rootScope, 
    $state, 
    Anecdotes
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.anecdotes = Anecdotes;
    this.fr = $rootScope.rvm.fr;
    this.it = $rootScope.rvm.it;
    this.$rootScope.$on('changeLang', () => {
        this.fr = $rootScope.rvm.fr;
        this.it = $rootScope.rvm.it;
        this.$state.reload();
    })
    
  }
}

export default AnecdotesController;
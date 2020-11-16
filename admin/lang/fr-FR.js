export default {
  title: 'Carte de voyages',
  general: {
    send: 'Envoyer',
    add: 'Ajouter',
    save: 'Sauvegarder',
    edit: 'Modifier',
    delete: 'Supprimer',
    remove: 'Supprimer',
    publish: 'Publier',
    unpublish: 'Dépublier',
    sure: 'Etes-vous sur ?',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    desktop: 'Photo desktop',
    mobile: 'Photo mobile',
    welcome: {
      title: "Bienvenu/e dans l'espace admin de Carte de voyages",
      text: `D'ici vous pouvez charger les photos, éditer les voyages et écrire les articles qui seront ensuite présents sur <a href="http://www.cartedevoyages.com" target="_blank" class="text-blue-700">www.cartedevoyages.com</a>.
      Pour publier vos modifications sur le site principal, il faudra appuyer sur ce bouton ! La publication peut prendre quelques minutes a etre effective.`
    }
  },
  site: {
    publish: {
      success: 'Le site a été publié avec succés !',
      error: 'Ops ! Il y a eu un petit problème, reessaye plus tard'
    }
  },
  menu: {
    travels: 'Voyages',
    articles: 'Articles',
    assets: 'Images',
    anecdotes: 'Anecdotes',
    homepage: 'Homepage'
  },
  travels: {
    title: 'Voyages',
    desc: 'Description',
    countries: 'Pays',
    steps: 'Etapes',
    dates: 'Dates',
    published: 'Publié',
    actions: 'Modifier/Suppr.'
  },
  travel: {
    title: 'Titre',
    category: 'Catégorie',
    cover_desktop: 'Photo de couverture (desktop)',
    cover_mobile: 'Photo de couverture (mobile)',
    countries: 'Pays traversés',
    dates: 'Dates du voyage',
    start: 'Début',
    end: 'Fin',
    hashtags: 'Hashtags',
    playlist: 'Playlist Spotify',
    slug: 'Slug',
    short_desc: 'Description courte',
    long_desc: 'Description longue',
    save: {
      success: 'Le voyage a été correctement créé !',
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    update: {
      success: 'Le voyage a été correctement mis à jour !',
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    published: {
      success: 'Le voyage a été correctement publié !',
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    unpublished: {
      success: 'Le voyage a été correctement dépublié !',
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    remove: {
      success: 'Le voyage a été correctement supprimé !',
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    }
  },
  articles: {
    place: 'Lieu',
    title: 'Titre',
    travel: 'Voyage',
    country: 'Pays',
    published: 'Publié',
    actions: 'Modifier/Suppr'
  },
  article: {
    title: 'Titre',
    cover_desktop: 'Photo de couverture (desktop)',
    cover_mobile: 'Photo de couverture (mobile)',
    travel: 'Voyage',
    country: 'Pays',
    place: 'Lieu',
    dates: "Dates de l'étape",
    start: 'Début',
    end: 'Fin',
    slug: 'Slug',
    gallery: 'Gallerie photo',
    short_desc: 'Description courte',
    long_desc: 'Description longue',
    size: {
      title: "Importance e l'article",
      subtitle: "De la taille de l'article dépend sa visualisation. Le petit n'aura par exemple pas de page dédiée.",
      small: 'Petit',
      normal: 'Normal',
      large: 'Grand'
    },
    save: {
      success: "L'article a été correctement créé !",
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    update: {
      success: "L'article a été correctement mis à jour !",
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    published: {
      success: "L'article a été correctement publié !",
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    unpublished: {
      success: "L'article a été correctement dépublié !",
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    remove: {
      success: "L'article a été correctement supprimé !",
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    }
  },
  assets: {
    library: 'Librairie',
    travel_assets: 'Photos par voyages',
    article_assets: 'Photos par articles',
    filter_by_travel: 'Filtrer par voyage',
    filter_by_place: 'Filtrer par lieu',
    filtered_empty:
      "Il n'y a pas de photos pour ces filtres. Associez les photos aux voyages et articles pour les voir apparaitre correctement.",
    upload: 'Télécharger une image',
    do_upload: 'Go !',
    uploaded: 'Téléchargé le: ',
    description: 'Description: ',
    upload_success: 'Parfait !',
    upload_error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois",
    removed_success: 'Parfait !',
    removed_error: 'Oups ! Il y a eu un petit problème',
    updated_success: 'Parfait !',
    updated_error: 'Oups ! Il y a eu un petit problème',
    form: {
      title: 'Titre',
      place: 'Lieu',
      travel: 'Travel',
      country: 'Pays',
      description: 'Description'
    },
    edit: {
      name: 'Nom',
      title: 'Titre',
      description: 'Description',
      articles: 'Articles associés',
      travel: 'Voyage associé'
    },
    non_associated: 'Photos non associées',
    non_associated_empty: 'Toutes les photos ont été associées.',
    travel_empty: "Il n'y a pas de photos associées à ce voyage. Glisse et dépose les photos que tu désires associer."
  },
  anecdotes: {
    title: 'Titre',
    actions: 'Modifier/Suppr.',
    content: "Contenu de l'anecdote",
    save: {
      success: "L'anecdote a été correctement créé !",
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    update: {
      success: "L'anecdote a été correctement mis à jour !",
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    published: {
      success: "L'anecdote a été correctement publié !",
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    remove: {
      success: "L'anecdote a été correctement supprimé !",
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    }
  },
  categories: {
    name: 'Nom',
    label: 'Catégorie',
    actions: 'Modifier/Suppr.',
    save: {
      success: 'La catégorie a été correctement créé !',
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    update: {
      success: 'La catégorie a été correctement mis à jour !',
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    published: {
      success: 'La catégorie a été correctement publié !',
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    },
    remove: {
      success: 'La catégorie a été correctement supprimé !',
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    }
  },
  settings: {
    save: {
      success: "Les paramètres de la page d'accueil a été correctement créé !",
      error: "Oups ! Il y a eu un petit problème. Vérifie qu'il ne manque rien et essaie une nouvelle fois"
    }
  },
  login: {
    title: 'Login',
    email: 'Email',
    password: 'Mot de passe',
    send: 'Envoyer',
    forgotten_password: 'Vous avez oublié votre mot de passe ou vous voulez le changer ?',
    reset_password: 'Réinitialisez votre mot de passe',
    go_to_reset: 'Réinitialisez votre mot de passe',
    back_to_login: 'Retour au login',
    password_request: {
      success:
        'Votre demande a été envoyée avec succés. Vous recevrez un email avec les instructions pour changer votre mot de passe.',
      error: "Il y a eu un problème et votre demande n'a pas été envoyée.",
      changed: 'Votre mot de passe a été modifié avec succés',
      not_changed: "Il y a eu un problème et votre demande n'a pas été envoyée."
    }
  },
  highlights: {
    slider_title: 'Slider de homepage',
    travel_title: 'Voyages en évidence',
    article_title: 'Articles en évidence',
    travel: {
      select: "Choisis les voyages publiés que tu veux voir en évidence sur la page d'accueil du site",
      selected: 'Voyages en évidence',
      selected_empty: "Il n'y a pas de voyages sélectionnés en évidence",
      unpublished_title: 'Ces voyages ne sont pas encore publiés.',
      unpublished_subtitle: 'Publie-les pour pouvoir les mettre en évidence'
    },
    article: {
      select: "Choisis les articles publiés que tu veux voir en évidence sur la page d'accueil du site",
      selected: 'Articles en évidence',
      selected_empty: "Il n'y a pas d'articles sélectionnés en évidence",
      unpublished_title: 'Ces articles ne sont pas encore publiés.',
      unpublished_subtitle: 'Publie-les pour pouvoir les mettre en évidence'
    }
  },
  homepage: {
    description: 'Description générale du site'
  }
}

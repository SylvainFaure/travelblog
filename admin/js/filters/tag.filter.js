export default function byTag ($rootScope) {
  "ngInject";
  return (assets, tag, category) => {
    return assets.filter((asset) => {
      if ($rootScope.rvm.fr) {
        if (category) {
          return category == 'place' ? asset.asset_place_fr == tag : asset.asset_country_fr == tag 
        }
        return asset
      }
      if ($rootScope.rvm.it) {
        if (category) {
          return category == 'place' ? asset.asset_place_it == tag : asset.asset_country_it == tag 
        }
        return asset
      }
    })
  }
}
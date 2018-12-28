export default function byTag ($rootScope) {
    "ngInject";
    return (assets, tag, category) => {
        return assets.filter((asset) => {
            if ($rootScope.rvm.fr) {
                return category == 'place' ? asset.asset_place_fr == tag : asset.asset_country_fr == tag 
            }
            if ($rootScope.rvm.it) {
                return category == 'place' ? asset.asset_place_it == tag : asset.asset_country_it == tag 
            }
        })
    }
}
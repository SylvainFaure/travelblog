export default function trustedUrl ($sce) {
  "ngInject";
  return (val) => {
    return $sce.trustAsResourceUrl(val);
  }
}
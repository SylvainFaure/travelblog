export default function AuthInterceptor($injector, $q) {
  "ngInject";
  return {
    request: (config) => {
      var token;
      $injector.invoke(['AuthService', (AuthService) => {
        token = AuthService.getToken()
      }]);
      if (token !== 'token.token.token') {
        config.headers['x-access-token'] = token;
      }
      return config
    },
    responseError: (res) => {
      console.warn(res)
      return $q.reject(res);
    }
  }
}
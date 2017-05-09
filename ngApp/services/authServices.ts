namespace myapp.Services {
  export class AuthService {
    public login;
    public isLoggedIn;
    public getUser;
    public logout;

    constructor(AuthToken, $http, $q) {
      //Auth.login(loginData);
      this.login = function(loginData) {
        return $http.post("/api/users/authenticate", loginData).then((data) => {
          AuthToken.setToken(data.data.token);
          return data;
        }).catch((err) => {
          console.error(err);
        });
      };
      //Auth.isLoggedIn();
      this.isLoggedIn = function() {
        if(AuthToken.getToken()) {
          return true;
        } else {
          return false;
        }
      };

      //Auth.logout();
      this.logout = function() {
        AuthToken.setToken();
      };

      //Auth.getUser();
      this.getUser = function() {
        if(AuthToken.getToken()) {
          return $http.post("/api/users/current");
        } else {
          $q.reject({message: "User has no token"});
        }
      };

    }
  }
  angular.module("myapp")
  .service("Auth", AuthService);


  export class AuthToken {
    public setToken;
    public getToken;

    constructor($window) {
      //AuthToken.setToken(token);
      this.setToken = function(token) {
        if(token) {
          $window.localStorage.setItem("token", token)
        } else {
          $window.localStorage.removeItem("token");
        }
      };
      //AuthToken.getToken()
      this.getToken = function() {
        return $window.localStorage.getItem("token");
      }
    }
  }
  angular.module("myapp")
  .service("AuthToken", AuthToken);

  export class AuthInterceptors {
    public request;

    constructor(AuthToken) {
      //AuthInterceptors.request();
      this.request = function(config) {
        let token = AuthToken.getToken();
        if(token) config.headers["x-access-token"] = token;
        return config;
      }
    }
  }
  angular.module("myapp")
  .service("AuthInterceptors", AuthInterceptors);
}

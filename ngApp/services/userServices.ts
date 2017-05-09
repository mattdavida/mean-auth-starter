namespace myapp.Services {
  export class UserService {
    public create;

    constructor($http) {
      //User.create(regData);
      this.create = function(regData) {
        console.log(regData)
        return $http.post("/api/users", regData);
      }
    }
  }
  angular.module("myapp")
  .service("User", UserService);
}

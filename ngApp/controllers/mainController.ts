namespace myapp {
  export class MainController {
    private doLogin;
    private logout;
    public username;
    public email;
    public isLoggedIn;
    public successMessage;
    public errorMessage;
    public loading;


    constructor(Auth, AuthToken, $log, $state, $timeout, $rootScope) {
      //Watch for changes on url state change
      $rootScope.$on('$stateChangeStart',() => {
        if(Auth.isLoggedIn()) {
          this.isLoggedIn = true;
          Auth.getUser().then((data) => {
            this.username = data.data.username;
            this.email = data.data.email;
          })
        } else {
          this.isLoggedIn = false;
          this.username = null;
        }
      });

      //login user
      this.doLogin = function(loginData) {
        this.errorMessage = false;
        this.loading = true;
        Auth.login(this.loginData).then((data) => {
          if(data.data.success) {
            //Create success message
            this.loading = false;
            this.successMessage = `${data.data.message} redirecting...`;
            $timeout(() => {
              //Redirect user to home page
              $state.go("profile");
              this.loginData = null;
              this.successMessage = false;
            }, 2000);
          } else {
            //Create error message
            this.errorMessage = data.data.message;
            this.loading = false;
          }
        });
      }

      this.logout = function() {
        Auth.logout();
        $state.go("logout");
        $timeout(() => {
          $state.go("home");
        }, 2000);
      }
    };
  }
  angular.module("myapp")
  .controller("mainController", MainController);
}

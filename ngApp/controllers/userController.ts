namespace myapp.Controllers {
  export class RegController {
    private regUser;
    public successMessage;
    public errorMessage;
    public loading;


    constructor(User, $log, $state, $timeout) {
      //Register user
      this.regUser = function(regData) {
        this.errorMessage = false;
        this.loading = true;
        $log.log("Form submitted");
        User.create(this.regData).then((data) => {
          if(data.data.success) {
            //Create success message
            this.loading = false;
            this.successMessage = `${data.data.message} redirecting...`;
            $timeout(() => {
              //Redirect user to home page
              $state.go("home")
            }, 2000);
          } else {
            //Create error message
            this.errorMessage = data.data.message;
            this.loading = false;
          }
        });
      }

    } //End constructor
  } //End class
} //End namespace

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");


let UserSchema = new Schema({
  username: {type: String, lowercase: true, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, lowercase: true, unique: true},
});


UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if(err) return next(err);
    this.password = hash;
    next();
  })
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}


export default mongoose.model("User", UserSchema);

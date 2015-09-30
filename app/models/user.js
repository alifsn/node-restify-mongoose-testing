var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String, required: true},
    password: String,
    world: String
});

UserSchema.statics.findBosses = function(fn) {
  this.find({ world: 'Bossland'}, function (err, bosses) {
  	if(err) {
  		return fn(err);
  	}

  	return fn(null, bosses);
  });
};

var User = mongoose.model('User', UserSchema);

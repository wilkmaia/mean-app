var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Database schema
var UsersSchema = new Schema({
	name: {
        type: String,
        required: true
    },
	age: {
        type: Number,
        required: true
    }
});

// Exports model based on set schema
var model = mongoose.model('Users', UsersSchema);
module.exports = model;

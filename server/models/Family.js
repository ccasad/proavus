var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var extend = require('mongoose-validator').extend;

var ObjectId = mongoose.Schema.Types.ObjectId;

var familySchema = new mongoose.Schema({
	name: { type: String, trim: true },
	created_by: ObjectId,
	date_created: { type: Date, default: Date.now },
	date_updated: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Families', familySchema);
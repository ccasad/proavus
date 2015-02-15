var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var extend = require('mongoose-validator').extend;

mongoose.connect('mongodb://localhost/famtree');

var ObjectId = mongoose.Schema.Types.ObjectId;

var twoCharsValidator = [
  validate({
    validator: 'isLength',
    arguments: [2],
    message: 'Value should be 2 characters',
  }),
  validate({
    validator: 'isAlpha',
    passIfEmpty: true,
    message: 'Value should contain alpha characters only'
  })
];

var zipValidator = [
  validate({
    validator: 'isLength',
    arguments: [5],
    message: 'Value should be 5 numbers long',
  })
];

var emailValidator = [
	validate({
    validator: 'isEmail',
    message: 'Value should be an email',
  })
];

extend('isSocialAccount', function (value) {
	value = value.toUpperCase();
  return value == 'FACEBOOK' | value == 'INSTAGRAM' | value == 'LINKEDIN' | value == 'TWITTER' | value == 'AOLIM';
}, 'Not an allowed social account');

var socialAccountValidator = [
	validate({
		validator: 'isSocialAccount'
	})
];

var familySchema = new mongoose.Schema({
	name: { type: String, trim: true },
	created_by: ObjectId,
	date_created: { type: Date, default: Date.now },
	date_updated: { type: Date, default: Date.now } 
});

// http://www.worldatlas.com/aatlas/ctycodes.htm
var addressSchema = new mongoose.Schema({
	address: { type: String, trim: true },
	city: { type: String, trim: true },
	state_abbrev: { type: String, uppercase: true, trim: true, validate: twoCharsValidator },
	zip: { type: Number, validate: zipValidator },
	country_abbrev: { type: String, uppercase: true, trim: true, validate: twoCharsValidator },
	note: { type: String, trim: true }
});

var phoneSchema = new mongoose.Schema({
	type: { type: String, trim: true, },
	number: { type: String, trim: true }
});

var relationSchema = new mongoose.Schema({
	id: { type: ObjectId, required: true }, 
	is_blood_related: { type: Boolean, required: true, default: true }
});

var personSchema = new mongoose.Schema({
	name_first: { type: String, required: true, trim: true },
	name_middle:  { type: String, trim: true },
	name_last: { type: String, required: true, trim: true },
	name_suffix:  { type: String, trim: true },
	is_gender_male: { type: Boolean, required: true, default: true },
	birth_date: Date,
	birth_location: [addressSchema],
	death_date: Date,
	death_cause: { type: String, trim: true },
	burial_location: [addressSchema],
	residences: [addressSchema],
	phones: [phoneSchema],
	email: [{ type: String, validate: emailValidator }],
	social_accounts: [{
		user_name: { type: String, required: true, trim: true },
		social_name: { type: String, required: true, trim: true, validate: socialAccountValidator }
	}],
	parent_id: ObjectId,
	mothers: [relationSchema],
	fathers: [relationSchema],
	spouses: [{ 
		id: { type: ObjectId, required: true },
		married_date_from: { type: Date, required: true },
		married_date_to: { type: Date }
	}],
	children: [relationSchema],
	siblings: [relationSchema],
	families: [{ type: ObjectId, required: true }],
	comment: { type: String, trim: true },
	date_created: { type: Date, default: Date.now },
	date_updated: { type: Date, default: Date.now }
});
/*
var personSchema = new mongoose.Schema({
	name_first: { type: String, required: true, trim: true },
	name_middle:  { type: String, trim: true },
	name_last: { type: String, required: true, trim: true },
	name_suffix:  { type: String, trim: true },
	is_gender_male: { type: Boolean, required: true, default: true },
	birth_date: Date,
	comment: { type: String, trim: true },
	date_created: { type: Date, default: Date.now },
	date_updated: { type: Date, default: Date.now }
});
*/
var familyModel = mongoose.model('families', familySchema);

var family = {
	name: 'Casad'
};

familyModel.create(family, function(err, family){
  if (err) { 
  	console.log(err);
  } else {
  	console.log('Person added: ', family);

		var personModel = mongoose.model('persons', personSchema);

		var person = {
			name_first: 'Chris',
			name_last: family.name,
			is_gender_male: true,
			birth_date: new Date(1974, 1, 8).toISOString(),
			families: [family._id]
		};

		personModel.create(person, function(err, person){
		  if (err) { 
		  	console.log(err);
		  } else {
		  	console.log('Person added: ', person);
		  }
		});

  }
});

/*
var TodoSchema = new mongoose.Schema({
	name: String,
	completed: Boolean,
	note: String,
	updated_at: {
		type: Date,
		default: Date.now
	}
});

var todoModel = mongoose.model('todos', TodoSchema);

var todo = {
	name: 'Chris',
	completed: false,
	note: 'hello',
	updated_at: new Date(1974, 1, 8).toISOString(),
};

todoModel.create(todo, function(err, todo){
  if (err) { 
  	console.log(err);
  } else {
  	console.log('todo added: ', todo);
  }
});
*/

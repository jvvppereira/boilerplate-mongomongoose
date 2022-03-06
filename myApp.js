require('dotenv').config();

const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true }, 
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const defaultProcess = function (done, err, data) {
  if (err) return done(err); // error
  done(null , data); // success
};

const createAndSavePerson = (done) => {
  const document = new Person({ name: 'Joao', age: 24, favoriteFoods: ['pizza', 'chocolate'] });
  document.save(function (err, data) { defaultProcess(done, err, data) });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) { defaultProcess(done, err, data) });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) { defaultProcess(done, err, data) });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) { defaultProcess(done, err, data) });
};

const findPersonById = (personId, done) => {
  Person.findById(personId , function (err, data) { defaultProcess(done, err, data) });
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId , function (err, data) { 
    if (err) return done(err); // error
    
    const foodToAdd = "hamburger";
    data.favoriteFoods.push(foodToAdd);
        
    data.save(function (err, data) { defaultProcess(done, err, data) });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet },  { new: true }, function (err, data) { defaultProcess(done, err, data) })
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

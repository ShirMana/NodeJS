const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');
const { array } = require("joi");


//creating the User Schema by fields
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },

  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },

  biz: {
    type: Boolean,
    required: true,
  },
  favorites: {
    type: Array,
    required: true,
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }, 
  cards: { type: Array

  }

});

//creating the User token with id and biz
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, biz: this.biz }, config.get('jwtKey'));
  return token;
}

const User = mongoose.model("User", userSchema); //creating the model by the User schema


//validation of User schema by joi
function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(70).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    biz: Joi.boolean().required(),
  });

  return schema.validate(data);
}


//validation of favorite cards (array) by joi  
function validateCards(data) {
 
  const schema = Joi.object({
    cards: Joi.array().min(1).required()
  });
 
  return schema.validate(data);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateCards = validateCards;
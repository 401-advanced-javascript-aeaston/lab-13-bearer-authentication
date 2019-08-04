'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usedTokens = new Set();

const roles = require('./roles-model.js');

const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  email: {type: String},
  role: {type: String, default:'user', enum: ['admin','editor','user']},
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}});

users.virtual('acl', {
  ref: 'roles',
  localField: 'role',
  foreignField:'role',
  justOne: true,
});

// const capabilities = {
//   admin: ['create', 'read', 'update', 'delete'],
//   editor: ['create', 'read', 'update'],
//   user: ['read']
// }

users.pre('findOne', function() {
  try {
    this.populate('acl');
  }
  catch(e) {
    throw new Error(e.message);
  }
});

users.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(console.error);
});

users.statics.authenticateToken = function(token) {
  if(usedTokens.has(token)) {
    return Promise.reject('Token has already been used.');
  }
  usedTokens.add(token);
  let parsedToken = jwt.verify(token,process.env.SECRET);
  let query = {_id:parsedToken.id};
  return this.findOne(query);
};

users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};

users.methods.comparePassword = function(password) {
  console.log('password', password);
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null)
    .catch(console.error);
};

// users.methods.can = function(capability) {
//   return capabilities[this.role].includes(capability);
// };



users.methods.generateToken = function() {
  console.log('WE ARE IN');
  let token = {
    id: this._id,
    role: this.role,
    // capabilities: this.acl.capabilities
  };
  
  return jwt.sign(token, process.env.SECRET, {expiresIn: '15m'});
};

module.exports = mongoose.model('users', users);

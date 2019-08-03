'use strict';

const User = require('./users-model.js');

module.exports = (capability) => {

  return (req, res, next) => {
  
    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);
      
      switch( authType.toLowerCase() ) {
        case 'basic': 
          return _authBasic(authString);
        case 'bearer':
          return _authBearer(authString);
        default: 
          return _authError();
      }
    }
    catch(e) {
      return _authError();
    }
    
    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then(user => _authenticate(user) )
        .catch(next);
    }

    function _authBasic(str) {
      let base64Buffer = Buffer.from(str, 'base64'); // <Buffer 01 02 ...>
      let bufferString = base64Buffer.toString();    // john:mysecret
      let [username, password] = bufferString.split(':'); // john='john'; mysecret='mysecret']
      let auth = {username,password}; // { username:'john', password:'mysecret' }
      
      return User.authenticateBasic(auth)
      console.log('????????????')
        .then(user => _authenticate(user) )
        .catch();
    } 

    function _authenticate(user) {
      console.log('_AUTHENTICATE_')
      if(user && (!capability || user.can(capability))) {
        req.user = user;
        req.token = user.generateToken();
        console.log('_IN THE IF STATEMENT_');
        next();
      }
      else {
        _authError();
      }
    }
    
    function _authError() {
      next('Invalid User ID/Password');
    }
  }
};
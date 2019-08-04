# lab-13

# Bearer Authorization
### Author: Adrienne Easton and Liz Kavalski

### Links and Resources
* [submission PR](https://github.com/401-advanced-javascript-aeaston/lab-13-bearer-authentication/pull/6)
* [travis][![Build Status](https://travis-ci.com/401-advanced-javascript-aeaston/lab-13-bearer-authentication.svg?branch=master)](https://travis-ci.com/401-advanced-javascript-aeaston/lab-13-bearer-authentication)

#### Documentation


### Modules
#### `middleware.js`
Runs authentication 
#### `router.js`
Paths to `/signup` and to `/signin`
#### `users-models.js`
Form the schema, which is used to match user name,and password if already in the database, of not create one. It also generate and authenticate tokens
#### `404.js`
If their an error on the finding the paths
#### `500.js`


### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb://localhost:27017/lab-13
* `SECRET`- make your own
#### Seting up on personal device.
* In a terminal run a `git clone` to clone this repo onto a personal device.
* Run a `npm i` to download the dependices.
#### Set up server
* In a terminal run `nodemon` 
* In another open up mongodbd to check 

#### Running the app
* in the terminal(not the one running `nodemon` or `mongodb`)run a commond `echo '{"username":"USERNAME","password":"PASSWORD"}' | http post :3000/signup`
  * this sign the person up in in the app.
  * for the username and password the person can pick their own username and password in the place that are in all capitals.
* Sign-in: `http post :3000/signin -a USERNAME:PASSWORD`
  * The username and password should be the same as the one to picked to sign-up.
  * Returns a JWT token.
* Sign-in with token: `http post :3000/signin "authorization: bearer TOKENHERE"`
  * In the TOKENHERE it should be the token that was return in the 'sign-in'.
  * Return the token or error if the the token has expires.

signing up users:
`echo '{"username":"<name>", "password":"<password>", "role":"editor"}'| http post :3000/signup`

adding roles to db:
`echo '{"role":"<role title>", "capabilities":["<capability","<capability","<capability"]}'| http post :3000/roles`

basic sign-in:
`http post :3000/signin -a <name>:<password>`

authenticated sign-in:
`http post :3000/signin "authorization:bearer header.payload.signature"`
  
#### Tests
* `npm test`
* In the `middleware.test.js` it testing different credentials, while the `router.test.js` is testing for signing up and signing in with basic authication.
* There need to be a test for signing-in with a token and signing-in with a expire token. Otherwise the testes are passing.

#### UML
_Image Coming Soon!_



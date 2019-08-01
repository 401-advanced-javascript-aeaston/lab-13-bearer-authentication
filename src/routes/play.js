'use strict';

const express = require('express');
const auth = require('../auth/middleware.js');

const router = express.Router();

// router.get('/dangerous', auth, (req, res) => {
//   res.status(200).send('Welcome to the danger zone');
// });

router.get('/profile', auth(), (req, res) => {
  res.status(200).send('Welcome to your home');
});

router.get('/document', auth('read'), (req, res) => {
  res.status(200).send('Welcome to your home');
});

router.get('/delete-doc', auth('delete'), (req, res) => {
  res.status(200).send('Welcome to your home');
});

router.get('/add', auth('create'), (req, res) => {
  res.status(200).send('Welcome to your home');
});

router.get('/openarea', (req, res) => {
  res.status(200).send('Welcome to the danger zone');
});

module.exports = router;
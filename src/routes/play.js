'use strict';

const express = require('express');
const auth = require('../auth/middleware.js');

const router = express.Router();

// router.get('/dangerous', auth, (req, res) => {
//   res.status(200).send('Welcome to the danger zone');
// });

router.get('/hidden-stuff', auth(), (req, res) => {
  res.status(200).send('Welcome hidden-stuff');
});

router.get('/something-to-read', auth('read'), (req, res) => {
  res.status(200).send('Welcome to something-to-read');
});

router.get('/bye-bye', auth('delete'), (req, res) => {
  res.status(200).send('Welcome to bye-bye');
});

router.post('/create-a-thing', auth('create'), (req, res) => {
  res.status(200).send('Welcome to create-a-thing');
});

router.get('/public-stuff', (req, res) => {
  res.status(200).send('Welcome to public-stuff');
});

router.put('/update', auth('update'), (req, res) => {
  res.status(200).send('Welcome to update');
});

router.patch('/jp', auth('update'), (req, res) => {
  res.status(200).send('Welcome to jp');
});

router.get('/everything', auth('superuser'), (req, res) => {
  res.status(200).send('Welcome to everything');
});

module.exports = router;
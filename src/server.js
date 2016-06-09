#! /usr/bin/node

// register babel hooks
require('babel-core/register');
require('babel-polyfill');

// register application
require('../src/app.js');

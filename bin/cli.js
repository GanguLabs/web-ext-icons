#!/usr/bin/env node

// require = require('esm')(module /*, options*/); // uninstalled esm
const resize = require('../src/index');

const [, , ...args] = process.argv;
const [sourceFile, destinationPath] = args;
const sizes = [16, 19, 32, 38, 48, 64, 96, 128, 256, 512];

resize(sourceFile, destinationPath, sizes)

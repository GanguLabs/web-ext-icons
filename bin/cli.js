#!/usr/bin/env node

require = require('esm')(module /*, options*/);
const index = require('../src/index');

const [, , ...args] = process.argv;
const [sourceFile, destinationPath] = args;
const sizes = [16, 32, 48, 128];

index.resize(sourceFile, destinationPath, sizes)
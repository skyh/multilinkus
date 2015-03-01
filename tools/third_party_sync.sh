#!/usr/bin/env bash

npm_path=`which npm`

if [ -z '$npm_path' ]; then
	echo 'Node.js and NPM are required.'
	echo 'See https://github.com/joyent/node/wiki/installing-node.js-via-package-manager'
	exit 1
fi

if [ ! -f 'package.json' ]; then
	echo 'File "package.json" was not found.'
	echo 'Please, run this from project root folder.'
fi

npm prune && npm install

# Build prerequisites

1. Node.js and NPM (Node Package Manager) are required. Node.js can be installed from http://nodejs.org/ or via package manager for your OS. NPM is part of Node.js installation.
2. Install dependencies for Multilinkus. Run `npm install` in root project folder (it is where `package.json` located).
3. <i>(Optional)</i> Install Gulp as console tool. Gulp is a building system for Node.js. Run `npm install -g gulp`.
4. If you omit #3, replace any future `gulp` command with `./node_modules/bin/gulp`.

For building Multilinkus
Run `gulp build` for debug version and `gulp release` for release. Output folder is `out`.

## Chrome, Opera, Yandex.Browser, etc.
Use `gulp release` and Load extension from Developer mode in extensions settings.

## Safari
Use `gulp release` and Safari Extensions Builder to load, install or pack.

## Firefox
Multilinkus for Firefox required Mozilla Addons SDK. Mac users can install SDK via Homebrew `brew install mozilla-addon-sdk`. Use `cfx run` or `cfx xpi` in `out/multilinkus.firefox-extension` forlder.

# Build prerequisites

1. Node.js and NPM (Node Package Manager) are required. Node.js can be installed from http://nodejs.org/ or via package manager for your OS. NPM is part of Node.js installation.
2. Install dependencies for Multilinkus. Run `npm install` in root project folder (it is where `package.json` located).
3. <i>(Optional)</i> Install Gulp as console tool. Gulp is a building system for Node.js. Run `npm install -g gulp`.
4. If you omit #3, replace any future `gulp` command with `./node_modules/bin/gulp`.

# Building
Run `gulp build` for debug version and `gulp release` for release. Output folder is `out`.

# Packaging
Differs for different browsers.

## Chrome, Opera, Yandex.Browser, etc.
Load `out/multilinkus.chrome-extension` folder in Developer mode.

## Safari
Open Safari Extensions Builder, choose "Add extension", select `out/multilinkus.safariextension` folder.

## Firefox
Multilinkus for Firefox required Mozilla Addons SDK. Mac users can install SDK via Homebrew `brew install mozilla-addon-sdk`. Use `cfx run` or `cfx xpi` in `out/multilinkus.firefox-extension` folder.

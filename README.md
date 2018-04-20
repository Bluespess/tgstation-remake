# SS13 remake

Welcome! This is my attempt at creating an SS13 remake using node.js.

## Installing

1. Install node.js 8 or later
2. Clone both `http://github.com/bluespess/bluespess.git` and `http://github.com/bluespess/tgstation-remake.git`
3. Open a cmd line window in the bluespess repo
4. Run `npm install -g gulp-cli`
5. Type in `npm link`, followed by `cd client`, then `npm link` again.
6. Open another cmd line window in the tgstation-remake repo, and type in `npm install` then `npm link bluespess` then `cd client_src` then `npm install` then `npm link bluespess-client` then `gulp`

## Running

Run `launch.bat`. To join the server connect to `localhost:8080` using a web browser.

## Licenses

All code is licensed under [GNU AGPL v3](https://www.gnu.org/licenses/agpl-3.0.html).

All assets including icons and sound are under a [Creative Commons 3.0 BY-SA license](https://creativecommons.org/licenses/by-sa/3.0/) unless otherwise indicated.

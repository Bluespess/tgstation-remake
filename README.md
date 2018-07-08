# SS13 remake

Welcome! This is my attempt at creating an SS13 remake using node.js.

## Installing

1. Install node.js 8 or later
2. Clone both `http://github.com/bluespess/bluespess.git` and `http://github.com/bluespess/tgstation-remake.git`
3. Run `setup.bat` in the bluespess repo.
4. Run `setup.bat` in the tgstation-remake repo.

Whenever you update to the latest code, run `setup.bat` again afterwards for the simplest and easiest experience.

## Running

Run `launch.bat` in the tgstation-remake repo. To join the server connect to `localhost:8080` using a web browser.

## Contributing

Make sure to base your code off of /tg/station commit [910be9f4e29270e3a0a36ed8042310ed4bee1845](https://github.com/tgstation/tgstation/tree/910be9f4e29270e3a0a36ed8042310ed4bee1845)

If you add new items, and they are items that are part of the map, do not edit the map files directly - instead, add your new item to one of the rules files in `tools/map-converter` run the map converter on the above-mentioned tgstation commit

## Licenses

All code is licensed under [GNU AGPL v3](https://www.gnu.org/licenses/agpl-3.0.html).

All assets including icons and sound are under a [Creative Commons 3.0 BY-SA license](https://creativecommons.org/licenses/by-sa/3.0/) unless otherwise indicated.

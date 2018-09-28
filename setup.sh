#!/bin/bash
function print {
	echo "$@"
	echo
}

print Installing packages...
npm install
print Packages installed.

print Linking Bluespess...
npm link bluespess
print Bluespess linked.

print Installing client packges...
cd client_src
npm install
print Client packages installed.

print Linking the client...
npm link bluespess-client
print Client linked.

print Running gulp...
gulp
print Done.

print Installing the map converter...
cd ../tools/map-converter
npm install
print Map converter installed.

print Everything is done. Wasn\'t that so much easier than doing it manually?

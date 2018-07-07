@echo off

title Bluespess Installation

echo Installing packages...

echo.
call npm install

echo.
echo Packages installed...

echo.
echo Linking Bluespess...

echo.
call npm link bluespess

echo.
echo Bluespess linked...

echo.
echo Installing client packages...

echo.
cd client_src
call npm install

echo.
echo Client packages installed...

echo.
echo Linking the client...

echo.
call npm link bluespess-client

echo.
echo Client linked...

echo.
echo Running gulp...

echo.
call gulp

echo.
echo Done...

echo.
echo Installing the map converter...

echo.
cd ..
cd tools/map-converter
call npm install

echo.
echo Map converter installed...

echo.
echo Everything is done. Wasn't that so much easier than doing it manually?

echo.
pause
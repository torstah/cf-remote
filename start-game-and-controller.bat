@echo off
echo Starting Connected Futures and Controller...

:: Start the game with required parameters
start "" "C:\Users\Plan8-PC\Desktop\ProdBuild\Windows\CF_2025.exe" -RCWebControlEnable -RCWebInterfaceEnable

:: Wait for game to initialize
echo Waiting for game to initialize...
timeout /t 10

:: Start the controller in background
start /min cmd /c "npm run preview"
timeout /t 5
start http://cf-controller.local:3000 
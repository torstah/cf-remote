@echo off
echo Starting Connected Futures and Controller...

:: Start the game with required parameters
start "" "C:\Users\Plan8-PC\Desktop\ProdBuild\Windows\CF_2025.exe" -RCWebControlEnable -RCWebInterfaceEnable

:: Brief wait for game to start initializing
timeout /t 3 /nobreak

:: Start the controller in background
start /min cmd /c "node .output/server/index.mjs"
timeout /t 2 /nobreak
start http://cf-controller.local:3000 
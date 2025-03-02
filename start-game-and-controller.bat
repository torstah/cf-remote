@echo off
echo Starting Connected Futures and Controller...

:: Load config
call config.bat

:: Check if game path exists
if not exist "%GAME_PATH%" (
    echo Error: Game not found at %GAME_PATH%
    echo Please update the path in config.bat
    pause
    exit /b 1
)

:: Start the game with required parameters
start /min "" "%GAME_PATH%" -RCWebControlEnable -RCWebInterfaceEnable "%GAME_WINDOW_POS%"

:: Brief wait for game to start initializing
timeout /t 3 /nobreak

:: Start the controller in background
set PORT=%WEB_PORT%
set NUXT_UE_SERVER=%UE_SERVER_URL%
start /min cmd /c "node .output/server/index.mjs > nul 2>&1 & echo %ERRORLEVEL% > server.pid"
timeout /t 2 /nobreak
start http://localhost:%WEB_PORT% 
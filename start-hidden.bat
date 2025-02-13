@echo off

:: Load config
call config.bat

:: Set environment variables
set PORT=%WEB_PORT%
set NUXT_UE_SERVER=%UE_SERVER_URL%

start /min cmd /c "node .output/server/index.mjs > nul 2>&1 & echo %ERRORLEVEL% > server.pid"
timeout /t 2 /nobreak
start http://cf-controller.local:%WEB_PORT%
exit 
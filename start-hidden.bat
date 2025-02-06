@echo off
start /min cmd /c "node .output/server/index.mjs > nul 2>&1 & echo %ERRORLEVEL% > server.pid"
timeout /t 2 /nobreak
start http://cf-controller.local:3000
exit 
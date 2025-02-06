@echo off
start /min cmd /c "node .output/server/index.mjs"
timeout /t 2 /nobreak > nul
start http://cf-controller.local:3000
exit 
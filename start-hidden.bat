@echo off
echo Starting CF Controller in background...
start /min cmd /c "npm run preview"
timeout /t 5
start http://cf-controller.local:3000 
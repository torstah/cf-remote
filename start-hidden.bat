@echo off
echo Starting UE5 Controller in background...
start /min cmd /c "npm run preview"
timeout /t 5
start http://ue5-controller.local:3000 
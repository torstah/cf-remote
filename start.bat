@echo off
echo Building and starting UE5 Controller...
npm run build
start http://ue5-controller.local:3000
npm run preview 
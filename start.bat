@echo off
echo Building and starting CF Controller...

:: Load config
call config.bat

:: Set environment variables
set PORT=%WEB_PORT%
set NUXT_UE_SERVER=%UE_SERVER_URL%

npm run build
start http://cf-controller.local:%WEB_PORT%
node .output/server/index.mjs 
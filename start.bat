@echo off
echo Building and starting CF Controller...
npm run build
start http://cf-controller.local:3000
node .output/server/index.mjs 
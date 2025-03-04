@echo off
echo Fetching IP addresses...

:: Load config
call config.bat

:: Set environment variables
set PORT=%WEB_PORT%
set NUXT_UE_SERVER=%UE_SERVER_URL%

:: Use curl to fetch IP from our API endpoint
curl -s http://localhost:%PORT%/api/ip | findstr /C:"addresses"

echo.
echo Press any key to close...
pause >nul 
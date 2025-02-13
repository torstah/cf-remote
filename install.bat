@echo off
echo Installing CF Controller dependencies...
npm install

echo.
echo Adding hosts file entry (requires admin privileges)...
powershell -Command "Start-Process cmd -ArgumentList '/c echo 127.0.0.1 cf-controller.local >> %WINDIR%\System32\drivers\etc\hosts' -Verb RunAs"

:: Create config.bat if it doesn't exist
if not exist config.bat (
    echo Creating default config.bat...
    echo @echo off > config.bat
    echo :: Set the path to your game executable >> config.bat
    echo set GAME_PATH=C:\Path\To\Your\CF_2025.exe >> config.bat
    echo. >> config.bat
    echo :: Set the UE server URL >> config.bat
    echo set UE_SERVER_URL=http://localhost:30010 >> config.bat
    echo. >> config.bat
    echo :: Set web interface port >> config.bat
    echo set WEB_PORT=3000 >> config.bat
    
    echo Please edit config.bat with your game path and settings
)

echo.
echo Setup complete! Please:
echo 1. Edit config.bat with your game path and settings
echo 2. Run one of the following:
echo    - start.bat to start only the controller
echo    - start-game-and-controller.bat to start both game and controller
exit 
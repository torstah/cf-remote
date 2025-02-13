@echo off
echo Installing CF Controller dependencies...
npm install

echo.
echo Adding hosts file entry (requires admin privileges)...
powershell -Command "Start-Process cmd -ArgumentList '/c echo 127.0.0.1 cf-controller.local >> %WINDIR%\System32\drivers\etc\hosts' -Verb RunAs"

:: Create config.bat if it doesn't exist
if not exist config.bat (
    echo Creating default config.bat...
    copy config.example.bat config.bat
    
    echo Please edit config.bat with your game path and settings
)

echo.
echo Setup complete! Please:
echo 1. Edit config.bat with your game path and settings
echo 2. Run one of the following:
echo    - start.bat to start only the controller
echo    - start-game-and-controller.bat to start both game and controller
exit 
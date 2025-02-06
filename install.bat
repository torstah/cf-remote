@echo off
echo Installing CF Controller dependencies...
npm install

echo.
echo Adding hosts file entry (requires admin privileges)...
powershell -Command "Start-Process cmd -ArgumentList '/c echo 127.0.0.1 cf-controller.local >> %WINDIR%\System32\drivers\etc\hosts' -Verb RunAs"

echo.
echo Setup complete! You can now run:
echo - start.bat to start only the controller
echo - start-game-and-controller.bat to start both game and controller
pause 
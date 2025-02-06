@echo off
echo Installing UE5 Controller dependencies...
npm install

echo.
echo Adding hosts file entry (requires admin privileges)...
powershell -Command "Start-Process cmd -ArgumentList '/c echo 127.0.0.1 ue5-controller.local >> %WINDIR%\System32\drivers\etc\hosts' -Verb RunAs"

echo.
echo Setup complete! You can now run start.bat to start the application
pause 
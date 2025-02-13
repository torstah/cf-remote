@echo off
echo Starting Connected Futures

:: Load config
call config.bat

:: Start the game with required parameters
start "" "%GAME_PATH%" -RCWebControlEnable -RCWebInterfaceEnable


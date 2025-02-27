@echo off
echo Starting Connected Futures

:: Load config
call config.bat

:: Start the game with required parameters
start /min "" "%GAME_PATH%" -RCWebControlEnable -RCWebInterfaceEnable %GAME_WINDOW_POS%


@echo off
cd /d %~dp0

:: Check if server is already running
if exist server.pid (
    set /p PID=<server.pid
    tasklist /FI "PID eq %PID%" 2>NUL | find /I "%PID%" >NUL
    if not errorlevel 1 (
        echo Server is already running with PID: %PID%
        echo Use stop-controller.bat to stop it first
        exit /b 1
    ) else (
        :: PID file exists but process doesn't - clean up
        del server.pid
    )
)

:: Start server and save PID
node .output/server/index.mjs 
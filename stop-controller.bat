@echo off
echo Stopping CF Controller...

if not exist server.pid (
    echo No server PID file found.
    exit /b 0
)

set /p PID=<server.pid

:: Check if process exists before trying to kill it
tasklist /FI "PID eq %PID%" 2>NUL | find /I "%PID%" >NUL
if errorlevel 1 (
    echo Process %PID% not found
    del server.pid
    exit /b 0
)

taskkill /PID %PID% /F
if errorlevel 1 (
    echo Failed to kill process %PID%
    exit /b 1
)

del server.pid
echo Server stopped successfully 
@echo off
if exist server.pid (
    set /p PID=<server.pid
    taskkill /F /PID %PID%
    del server.pid
    echo CF Controller stopped
) else (
    echo CF Controller is not running or PID file not found
)
exit 
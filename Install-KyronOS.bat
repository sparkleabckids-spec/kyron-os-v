@echo off
setlocal enabledelayedexpansion
title KYRON OS Installer

echo ===============================================================================
echo                     KYRON OS -- WINDOWS INSTALLER (v1.0.0)
echo         Unified Automotive Content Automation ^& Editorial Runtime
echo ===============================================================================
echo.

:: 1. Check PowerShell availability
where powershell >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] PowerShell is required for installation but was not found.
    pause
    exit /b 1
)

:: 2. Execute PowerShell installation engine
echo Starting automated installation...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0installer\kyron_installer.ps1" "%~dp0"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===============================================================================
    echo                     INSTALLATION COMPLETED SUCCESSFULLY!
    echo ===============================================================================
    echo.
    echo You can now start KYRON OS anytime from:
    echo   - Desktop shortcut: 'KYRON OS'
    echo   - Start Menu: 'KYRON OS'
    echo   - Or by running 'Launch-KyronOS.bat' in the project folder.
    echo.
    set /p LAUNCH_NOW="Would you like to launch KYRON OS now? (Y/N) [default: Y]: "
    if /i "!LAUNCH_NOW!"=="" set LAUNCH_NOW=Y
    if /i "!LAUNCH_NOW!"=="Y" (
        echo Launching KYRON OS...
        call "%~dp0Launch-KyronOS.bat"
    )
) else (
    echo.
    echo [INSTALLATION FAILED] Please check the messages above.
    pause
)

exit /b %ERRORLEVEL%

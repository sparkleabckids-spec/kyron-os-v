@echo off
setlocal enabledelayedexpansion
title KYRON OS Installer Builder (Windows)

echo ===============================================================================
echo                KYRON OS -- INNO SETUP COMPILER (WINDOWS x64)
echo ===============================================================================
echo.

set "ISCC_PATH=C:\Program Files (x86)\Inno Setup 6\ISCC.exe"
if not exist "%ISCC_PATH%" (
    set "ISCC_PATH=C:\Program Files\Inno Setup 6\ISCC.exe"
)

if not exist "%ISCC_PATH%" (
    echo [ERROR] Inno Setup 6 compiler (ISCC.exe) was not found in standard directories.
    echo.
    echo Please download and install Inno Setup 6 from:
    echo https://jrsoftware.org/isdl.php
    echo.
    echo After installing Inno Setup 6, run this script again or right-click:
    echo   installer\kyron_setup.iss -^> Compile
    echo.
    pause
    exit /b 1
)

echo [1/2] Compiling production build...
call npm run build

echo.
echo [2/2] Compiling Windows Installer (x64) with Inno Setup 6...
"%ISCC_PATH%" "%~dp0installer\kyron_setup.iss"

if %ERRORLEVEL% equ 0 (
    echo.
    echo ===============================================================================
    echo [SUCCESS] Windows installer compiled successfully!
    echo Output Executable: %~dp0KYRON-OS-Installer-Build\KYRON-OS-Setup.exe
    echo ===============================================================================
) else (
    echo.
    echo [ERROR] Inno Setup compilation failed with code %ERRORLEVEL%.
)

echo.
pause
exit /b %ERRORLEVEL%

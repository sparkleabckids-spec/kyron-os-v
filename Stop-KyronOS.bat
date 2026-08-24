@echo off
setlocal enabledelayedexpansion
title KYRON OS Shutdown Utility

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0installer\kyron_stopper.ps1" "%~dp0"
exit /b %ERRORLEVEL%

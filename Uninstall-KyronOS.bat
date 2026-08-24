@echo off
setlocal enabledelayedexpansion
title KYRON OS Uninstaller

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0installer\kyron_uninstaller.ps1" "%~dp0"
exit /b %ERRORLEVEL%

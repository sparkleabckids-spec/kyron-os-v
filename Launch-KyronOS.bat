@echo off
setlocal enabledelayedexpansion
title KYRON OS Launcher

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0installer\kyron_launcher.ps1" "%~dp0"
exit /b %ERRORLEVEL%
